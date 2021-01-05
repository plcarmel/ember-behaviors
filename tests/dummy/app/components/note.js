import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import NoteView from '../models/note-view';
import InitPropertyMixin from '../mixins/init-property';
import layout from '../templates/note';

export default Component.extend(InitPropertyMixin, {

  layout,
  classNames: ['note'],

  model: null,
  windowBehaviors: null,

  init() {
    this._super(...arguments);
    this.initProperty('model', NoteView.create({}));
    this.initProperty('windowBehaviors', A([]));
  },

  actions: {
    dragStart(w, e) {
      w.startDrag(e);
    }
  }
});

