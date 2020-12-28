import EmberObject, { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Note from '../models/note';
import Rectangle from '../models/rectangle';
import InitPropertyMixin from '../mixins/init-property';

export default EmberObject.extend(InitPropertyMixin, {

  note: null,
  rectangle: null,

  right: reads('rectangle.right'),
  bottom: reads('rectangle.bottom'),

  init() {
    this.initProperty('note', Note.create({}));
    this.initProperty('rectangle', Rectangle.create({}));

  }

});
