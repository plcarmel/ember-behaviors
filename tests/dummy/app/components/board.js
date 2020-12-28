import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';
import BoardView from '../models/board-view';
import InitPropertyMixin from '../mixins/init-property';
import layout from '../templates/board';

export default Component.extend(InitPropertyMixin, {

  layout,
  classNames: ['board'],
  attributeBindings: ['style'],

  model: null,

  init() {
    this._super(...arguments);
    this.initProperty('model', BoardView.create({}));
  },

  @computed('model.requiredWidth', 'model.requiredHeight')
  get style() {
    return htmlSafe(
      `width: ${this.model.requiredWidth}px;` +
      ` height: ${this.model.requiredHeight}px;`
    );
  },

  actions: {
    addNote() {
      this.model.addNote();
    }
  }

});

