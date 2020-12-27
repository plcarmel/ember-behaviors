import Note from '../models/note';
import Rectangle from '../models/rectangle';
import InitPropertyMixin from '../mixins/init-property';
import EmberObject from '@ember/object';

const NoteView = EmberObject.extend(InitPropertyMixin, {

  note: null,
  rectangle: null,

  init() {
    this.initProperty('note', Note.create({}));
    this.initProperty('rectangle', Rectangle.create({}));

  }

});

export default NoteView;
