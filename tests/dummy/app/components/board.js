import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';
import BoardView from '../models/board-view';
import InitPropertyMixin from '../mixins/init-property';
import layout from '../templates/board';

export default Component.extend(InitPropertyMixin, {

  layout,
  tagName: '',
  windowBehaviors: null,

  model: null,

  report: null,

  init() {
    this._super(...arguments);
    this.initProperty('model', BoardView.create({}));
    this.initProperty('windowBehaviors', A([]));
  },

  @computed('model.requiredWidth', 'model.requiredHeight')
  get boardStyle() {
    return htmlSafe(
      `width: ${this.model.requiredWidth}px;` +
      ` height: ${this.model.requiredHeight}px;`
    );
  },

  actions: {
    addNote() {
      this.model.addNote();
    },
    windowBehaviorsChanged(windowBehaviorsOn, windowBehaviorsOff) {
      this.set('report', { windowBehaviorsOn, windowBehaviorsOff });
    }
  }

});

