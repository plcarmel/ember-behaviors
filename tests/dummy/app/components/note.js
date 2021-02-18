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
  windowBehaviorsChanged: null,

  edit: false,
  newTitle: null,
  newContent: null,

  init() {
    this._super(...arguments);
    this.initProperty('model', NoteView.create({}));
    this.initProperty('windowBehaviors', A([]));
    this.initProperty('windowBehaviorsChanged', function() {});
  },

  actions: {

    dragStart(w, e) {
      w.startDrag(e);
    },

    onEdit() {
      const note = this.model.note;
      this.set('newTitle', note.title);
      this.set('newContent', note.content);
      this.set('edit', true);
    },

    onSave() {
      const note = this.model.note;
      note.set('title', this.newTitle);
      note.set('content', this.newContent);
      this.set('edit', false);
    },

    onCancel() {
      this.set('edit', false);
    },

    stopPropagation(e) {
      if (this.edit) {
        e.stopPropagation();
      }
    }

  }
});

