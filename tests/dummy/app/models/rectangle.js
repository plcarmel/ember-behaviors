import InitPropertyMixin from '../mixins/init-property';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

const Rectangle = EmberObject.extend(InitPropertyMixin, {

  x: null,
  y: null,
  width: null,
  height: null,

  init() {
    this.initProperty('x', 50);
    this.initProperty('y', 50);
    this.initProperty('width', 100);
    this.initProperty('height', 100);
  },

  @computed('x', 'y', 'width','height')
  get style() {
    return `left: ${this.x}px; top: ${this.y}px; width: ${this.width}px; height: ${this.height}px;`;
  }

});

export default Rectangle;
