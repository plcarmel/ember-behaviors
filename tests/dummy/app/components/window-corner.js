import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import InitPropertyMixin from '../mixins/init-property';
import { cssSide } from '../utils/cardinal-to-css';

export default Component.extend(InitPropertyMixin, {

  classNameBindings: [':window-handle', ':window-corner', 'cornerClass'],
  attributeBindings: ['style'],

  corner: null, // NW, SE, SW, NE
  thicknessPx: 6,
  dragStart: null,

  init() {
    this._super(...arguments);
    this.initProperty('dragStart', function() {});
  },

  @computed('corner')
  get cornerClass() {
    return `window-corner-${this.corner.toLowerCase()}`;
  },

  @computed('thicknessPx')
  get offsetPx() {
    return -this.thicknessPx / 2;
  },

  @computed('corner')
  get cssSide1() {
    return cssSide(this.corner[0]);
  },

  @computed('corner')
  get cssSide2() {
    return cssSide(this.corner[1]);
  },

  @computed('corner')
  get cssCursor() {
    switch(this.corner) {
      case 'NW': return 'nwse-resize';
      case 'SW': return 'nesw-resize';
      case 'SE': return 'nwse-resize';
      case 'NE': return 'nesw-resize';
    }
  },

  @computed(
    'thicknessPx',
    'offsetPx',
    'cssCornerSide1',
    'cssCornerSide2',
    'cssCursor'
  )
  get style() {
    const thickness = this.thicknessPx;
    const offset = this.offsetPx;
    return htmlSafe(`width: ${thickness}px;` +
      ` height: ${thickness}px;` +
      ` ${this.cssSide1}: ${offset}px;` +
      ` ${this.cssSide2}: ${offset}px;` +
      ` cursor: ${this.cssCursor}`);
  },

  mouseDown(e) {
    this.dragStart(e);
  },

  touchStart(e) {
    this.dragStart(e);
  }

});
