import InitPropertyMixin from '../mixins/init-property';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

const Rectangle = EmberObject.extend(InitPropertyMixin, {

  x: null,
  y: null,
  width: null,
  height: null,

  @computed('x', 'width')
  get right() {
    return this.x + this.width;
  },

  @computed('y', 'height')
  get bottom() {
    return this.y + this.height;
  },

  init() {
    this.initProperty('x', 100);
    this.initProperty('y', 100);
    this.initProperty('width', 200);
    this.initProperty('height', 150);
  },

  @computed('x', 'y', 'width','height')
  get style() {
    return `left: ${this.x}px; top: ${this.y}px; width: ${this.width}px; height: ${this.height}px;`;
  }

});

export default Rectangle;
