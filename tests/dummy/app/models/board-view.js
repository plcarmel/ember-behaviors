import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import NoteView from '../models/note-view';
import InitPropertyMixin from '../mixins/init-property';

export default EmberObject.extend(InitPropertyMixin, {

  notes: null,

  init() {
    this.initProperty('notes', A([NoteView.create({})]));
  },

  @computed('notes.length', 'notes.@each.right')
  get requiredWidth() {
    return this.notes.length == 0 ?
      0 :
      this.notes.mapBy('right').reduce((a,b) => Math.max(a,b));
  },

  @computed('notes.length', 'notes.@each.bottom')
  get requiredHeight() {
    return this.notes.length == 0 ?
      0 :
      this.notes.mapBy('bottom').reduce((a,b) => Math.max(a,b));
  },

  addNote() {
    this.notes.pushObject(NoteView.create({}));
  }
});

