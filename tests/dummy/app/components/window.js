import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import layout from '../templates/window';
import InitPropertyMixin from '../mixins/init-property';
import { HasBehaviorsMixin } from 'ember-behaviors'
import { htmlSafe } from '@ember/template';
import { EKMixin } from 'ember-keyboard';
import ActivateKeyboardOnFocusMixin from 'ember-keyboard/mixins/activate-keyboard-on-focus';

export default Component.extend(InitPropertyMixin, EKMixin, ActivateKeyboardOnFocusMixin, HasBehaviorsMixin, {

  layout,
  classNames: ['window'],
  attributeBindings: ['style', 'tabindex'],
  tabindex: 0,

  rectangle: null,


  @computed('rectangle.style')
  get style() {
    return htmlSafe(this.rectangle.style);
  },

  startDrag(e) {
    this.triggerBehaviorEvent('dragStart', e);
  },

  _enforcePositionConstraints: observer('rectangle.x', 'rectangle.y', function() {
    if (this.rectangle.x < 0) {
      this.rectangle.set('x', 0);
    }
    if (this.rectangle.y < 0) {
      this.rectangle.set('y', 0);
    }
  }),

  actions: {
    sideDragStart(side, e) {
      this.triggerBehaviorEvent('sideDragStart', side, e);
    },

    cornerDragStart(corner, e) {
      this.triggerBehaviorEvent('cornerDragStart', corner, e);
    }
  }

});

