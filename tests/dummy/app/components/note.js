import Component from '@ember/component';
import { computed } from '@ember/object';
import NoteView from '../models/note-view';
import InitPropertyMixin from '../mixins/init-property';
import layout from '../templates/note';

const NoteComponent = Component.extend(InitPropertyMixin, {

  layout,
  classNames: ['note'],

  model: null,

  init() {
    this._super(...arguments);
    this.initProperty('model', NoteView.create({}));
  }
});

export default NoteComponent;
