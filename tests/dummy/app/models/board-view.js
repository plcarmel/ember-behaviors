import NoteView from '../models/note-view';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import InitPropertyMixin from '../mixins/init-property';

const BoardView = EmberObject.extend(InitPropertyMixin, {

  notes: null,

  init() {
    this.initProperty('notes', A([NoteView.create({})]));
  }

});

export default BoardView;
