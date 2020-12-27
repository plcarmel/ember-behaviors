import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/window';
import InitPropertyMixin from '../mixins/init-property';
import { HasBehaviorsMixin } from 'ember-behaviors'
import { htmlSafe } from '@ember/template';

const WindowComponent = Component.extend(InitPropertyMixin, HasBehaviorsMixin, {

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

  actions: {

    sideDragStart(side, e) {
      this.triggerBehaviorEvent('sideDragStart', side, e);
    },

    cornerDragStart(corner, e) {
      this.triggerBehaviorEvent('cornerDragStart', corner, e);
    }

  }

});

export default WindowComponent;
