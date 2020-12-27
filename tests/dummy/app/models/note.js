import InitPropertyMixin from '../mixins/init-property';
import EmberObject from '@ember/object';

const Note = EmberObject.extend(InitPropertyMixin, {

  title: null,
  content: null,

  init() {
    this.initProperty('title', 'Title goes here');
    this.initProperty('content', 'Content goes here');
  }

});

export default Note;
