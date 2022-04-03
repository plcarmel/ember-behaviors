import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import withBackingField from 'ember-behaviors/utils/with-backing-field';
import listenerName from 'ember-behaviors/utils/listener-name';

/*
 * from ember-keyboard
 */
function gatherKeys(event) {
  return A(
    ['alt', 'ctrl', 'meta', 'shift']
      .reduce(
        (keys, keyName) => {
          if (event[`${keyName}Key`]) {
            keys.push(keyName);
          }
          return keys;
        },
        []
      )
  );
}

/**
 * Returns a computed property that is the first behavior of a given type if one is present.
 *
 * @function
 * @param {string} behaviorClass - The class of the behavior to be returned.
 */
export function behaviorInstanceOf(behaviorClass) {
  return computed('behaviorsOn.[]', 'behaviorsOff.[]', {
    get() {
      return this.allBehaviors.find((b) => b instanceof behaviorClass);
    }
  });
}

/**
 * Use this mixin to be able to add behaviors to your class. Behaviors are
 * small plugins that declare the javascript events they want to listen for.
 * They are instances of subclasses of `behaviors/behavior`.
 *
 * @mixin
 */
export default Mixin.create({

  /**
   * Property to set / change behaviors
   * Behaviors are in descending order of priority
   */
  behaviors: withBackingField('_behaviors', () => A()),

  /**
   * Behaviors that are turned on, in descending order of priority.
   */
  behaviorsOn: withBackingField('_behaviorsOn', () => A()),

  /**
   * Behaviors that are turned off, in descending order of priority. They are
   * backup behaviors that can replace a behavior of the same group
   * when the later is turned off.
   */
  behaviorsOff: withBackingField('_behaviorsOff', () => A()),

  activeBehaviorChanged: withBackingField('_onBehaviorChanged', () => function() {}),

  allBehaviors: computed('behaviorsOn.[]', 'behaviorsOff.[]', function() {
    let result = A();
    result.pushObjects(this.behaviorsOn);
    result.pushObjects(this.behaviorsOff);
    return result;
  }),

  onBehaviorChange: on('init', observer('behaviors.{[],exclusionGroup}', function() {
    this.behaviorsOff.clear();
    this.behaviorsOn.clear();
    A(this.behaviors).toArray().reverse().forEach(b => this.activateBehavior(b));
  })),

  /**
   * Moves a behavior in front of other behaviors.
   *
   * @function
   * @param {Behavior} behavior - Instance of the behavior to prioritize.
   */
  prioritizeBehavior(behavior) {
    if (behavior) {
      let { behaviorsOn, behaviorsOff } = this;
      if (behaviorsOn.includes(behavior)) {
        behaviorsOn.removeObject(behavior);
        behaviorsOn.insertAt(0, behavior);
      } else if (behaviorsOff.includes(behavior)) {
        behaviorsOff.removeObject(behavior);
        behaviorsOff.insertAt(0, behavior);
      }
    }
  },

  /**
   * Turns off a behavior.
   *
   * @function
   * @param {Behavior} behavior - Instance of the behavior to inactivate.
   */
  inactivateBehavior(behavior) {
    if (behavior) {
      let { behaviorsOn, behaviorsOff } = this;
      behaviorsOn.removeObject(behavior);
      behaviorsOff.removeObject(behavior);
      behaviorsOff.insertAt(0, behavior);
    }
  },

  /**
   * Turns on or off a behavior.
   *
   * @function
   * @param {Behavior} behavior - Behavior instance to activate/inactivate.
   * @param {boolean} [value=true] - Whether the behavior is activated (true) or inactivated (false).
   */
  activateBehavior(behavior, value) {
    if (value === undefined || value)  {
      this.inactivateAllBehaviorsOf(behavior.get('exclusionGroup'));
      let { behaviorsOn, behaviorsOff } = this;
      behaviorsOff.removeObject(behavior);
      behaviorsOn.insertAt(0, behavior);
    } else {
      this.inactivateBehavior(behavior);
    }
  },

  /**
   * Returns the active behavior of a multually exclusive group.
   *
   * @function
   * @param {string} exclusionGroup
   * @returns {Behavior} - The active behavior's instance or `undefined` otherwise.
   */
  getActiveBehaviorOf(exclusionGroup) {
    return A(this.behaviorsOn).findBy('exclusionGroup', exclusionGroup);
  },

  /**
   * Returns the inactive behavior of a multually exclusive group having the highest priority.
   *
   * @function
   * @param {string} exclusionGroup
   * @param {boolean} [value=true] - Whether the behavior is activated (true) or inactivated (false).
   * @returns {Behavior} - The inactive behavior's instance or `undefined` otherwise.
   */
  getInactiveBehaviorOf(exclusionGroup) {
    return A(this.behaviorsOff).findBy('exclusionGroup', exclusionGroup);
  },

  /**
   * Returns the behavior of a multually exclusive having the highest priority.
   *
   * @function
   * @param {string} exclusionGroup
   * @returns {Behavior} - The behavior's instance or `undefined` otherwise.
   */
  getFirstBehaviorOf(exclusionGroup) {
    const a = A(this.allBehaviors.filterBy('exclusionGroup', exclusionGroup));
    return a.length === 0 ? null : a.objectAt(0);
  },

  /**
   * Turns off the active behavior of a mutually exclusive group of behaviors.
   *
   * @function
   * @param {string} exclusionGroup
   */
  inactivateAllBehaviorsOf(exclusionGroup) {
    let active = this.getActiveBehaviorOf(exclusionGroup);
    while (active) {
      this.inactivateBehavior(active);
      active = this.getActiveBehaviorOf(exclusionGroup);
    }
  },

  _oldEvents: null,

  _turnOffOldEvents() {
    let oldEvents = this._oldEvents;
    if (oldEvents) {
      oldEvents.forEach((turnOff) => turnOff());
    }
    this._oldEvents = A();
  },

  /**
   * An array containing the set of exclusion groups shared by the behaviors that are on
   */
  exclusionGroups: computed('behaviorsOn.{[],exclusionGroup}', function() {
    return A(this.behaviorsOn.mapBy('exclusionGroup').filter((g) => g)).uniq();
  }),

  /**
   * Behaviors that are active. A behavior is active if it's on and if it has the greatest
   * priority among the behaviors of its exclusion group.
   */
  activeBehaviors: computed('behaviorsOn', 'exclusionGroups', function() {
    let groups = this.exclusionGroups;
    return this.behaviorsOn
      .filter((b) => {
        let group = b.get('exclusionGroup');
        if (group) {
          if (groups.includes(group)) {
            groups.removeObject(b);
            return true;
          }
          return false;
        }
        return true;
      });
  }),

  triggerBehaviorEvent(type) {
    let args = Array.prototype.slice.call(arguments, 1);
    this.trigger(listenerName(type, gatherKeys(args[args.length - 1])), ...args);
    this.trigger(listenerName(type), ...args);
  },

  /**
   * This function attach or detach event listeners based on the behaviors present in
   * `behaviors`
   *
   * @function
   */
  _updateEvents() {
    this._turnOffOldEvents();
    let getCallback
      = (b, f) => {
        let that = this;
        return function() {
          return b[f].call(b, that, ...arguments);
        };
      };
    let getTurnOffFunc = (name, f, g) => () => this.off(name, f, g);
    let getInnerLoop = (b, f) => (name) => {
      let g = this.on(name, getCallback(b, f));
      this._oldEvents.pushObject(getTurnOffFunc(name, b, g));
    };
    this.activeBehaviors
      .forEach((b) => {
        for (let f in b.events) {
          b.events[f].forEach(getInnerLoop(b, f));
        }
      });
  },

  _onActiveBehaviorsChanged: observer(
    'behaviorsOn.[]',
    'behaviorsOn.@each.events',
    function() {
      run.once(this, '_updateEvents');
      this.activeBehaviorsChanged(this.behaviorsOn, this.behaviorsOff);
    }
  ),

  _setClasses: on('didRender', observer(
    'activeBehaviors.[]',
    'behaviorsOff.[]',
    function() {
      let { element } = this;
      if (element) {
        let classesOn = A([]);
        let classesOff = A([]);
        let bOff = A(this.behaviorsOff);
        let bOn = A(this.behaviorsOn);
        bOff.map((b) => b.get('classNames')).filter((l) => l).forEach((l) => classesOff.addObjects(l));
        bOn.map((b) => b.get('classNames')).filter((l) => l).forEach((l) => classesOn.addObjects(l));
        classesOff.addObjects(bOff.mapBy('exclusionGroup').filter((g) => g));
        classesOn.addObjects(bOn.mapBy('exclusionGroup').filter((g) => g));
        classesOff.forEach((c) => element.classList.remove(c));
        classesOn.forEach((c) => element.classList.add(c));
      }
    }
  ))

});
