import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import InitPropertyMixin from '../mixins/init-property';
import { cssSide, cssOtherSide, cssDimension, cssOtherDimension } from '../utils/cardinal-to-css';

export default Component.extend(InitPropertyMixin, {

  classNameBindings: [':window-handle', ':window-side', 'sideClass'],
  attributeBindings: ['style'],

  side: null, // N, E, S, W
  thicknessPx: 16,
  dragStart: null,

  init() {
    this._super(...arguments);
    this.initProperty('dragStart', function() {});
  },

  @computed('side')
  get sideClass() {
    return `window-side-${this.side.toLowerCase()}`;
  },

  @computed('thicknessPx')
  get offsetPx() {
    return -this.thicknessPx / 2;
  },

  @computed('side')
  get cssSide() { return cssSide(this.side); },

  @computed('side')
  get cssOtherSide() { return cssOtherSide(this.side); },

  @computed('side')
  get cssDimension() { return cssDimension(this.side); },

  @computed('side')
  get cssOtherDimension() { return cssOtherDimension(this.side); },

  @computed('side')
  get cssCursor() {
    switch(this.side) {
      case 'N': return 'ns-resize';
      case 'W': return 'ew-resize';
      case 'S': return 'ns-resize';
      case 'E': return 'ew-resize';
    }
  },

  @computed(
    'thicknessPx',
    'offsetPx',
    'cssSide',
    'cssOtherSide',
    'cssDimension',
    'cssOtherDimension',
    'cssCursor'
  )
  get style() {
    return htmlSafe(`${this.cssOtherDimension}: 100%;` +
      ` ${this.cssDimension}: ${this.thicknessPx}px;` +
      ` ${this.cssSide}: ${this.offsetPx}px;` +
      ` ${this.cssOtherSide}: 0px;` +
      ` cursor: ${this.cssCursor};` +
      ` touch-action: none;`);
  },

  mouseDown(e) {
    this.dragStart(e);
  },

  touchStart(e) {
    this.dragStart(e);
  }

});
