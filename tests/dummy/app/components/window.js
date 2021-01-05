import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import layout from '../templates/window';
import InitPropertyMixin from '../mixins/init-property';
import { HasBehaviorsMixin } from 'ember-behaviors'
import { htmlSafe } from '@ember/template';

export default Component.extend(InitPropertyMixin, HasBehaviorsMixin, {

  layout,
  classNames: ['window'],
  attributeBindings: ['style'],

  rectangle: null,

  init() {
    this._super(...arguments);
  },

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

