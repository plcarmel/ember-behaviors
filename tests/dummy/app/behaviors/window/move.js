import EmberObject from '@ember/object';
import { extractPosInfo } from '../../utils/touch';

class DragInfo {

  mStartPosX = null;
  mStartPosY = null;
  wStartPosX = null;
  wStartPosY = null;

  constructor(windowComponent, e) {
    const posInfo = extractPosInfo(e);
    this.mStartPosX = posInfo.clientX;
    this.mStartPosY = posInfo.clientY;
    const r = windowComponent.rectangle;
    this.wStartPosX = r.x;
    this.wStartPosY = r.y;
  }

  updateWindowPos(windowComponent, e) {
    const posInfo = extractPosInfo(e);
    const offsetX = posInfo.clientX - this.mStartPosX;
    const offsetY = posInfo.clientY - this.mStartPosY;
    const r = windowComponent.rectangle;
    r.set('x', this.wStartPosX + offsetX);
    r.set('y', this.wStartPosY + offsetY);
  }
}

export default class ResizeBehavior extends EmberObject {

  exclusionGroup = 'move';
  events = null;
  dragInfo = null;

  constructor() {
    super(...arguments);
    this.events = {};
    this.events.onDragStart = ['dragStart:_all'];
  }

  onDragStart(windowComponent, e) {
    this.dragInfo = new DragInfo(windowComponent, e);
    const that = this;
    const thing = window;
    function onMove(e) {
      that.onMove(windowComponent, e);
    }
    function onMoveEnd() {
      thing.removeEventListener('mousemove', onMove, true);
      thing.removeEventListener('touchmove', onMove, true);
      thing.removeEventListener('mouseup', onMoveEnd, true);
      thing.removeEventListener('touchend', onMoveEnd, true);
      thing.removeEventListener('touchcancel', onMoveEnd, true);
      this.dragInfo = null;
    }
    thing.addEventListener('mousemove', onMove, true);
    thing.addEventListener('touchmove', onMove, true);
    thing.addEventListener('mouseup', onMoveEnd, true);
    thing.addEventListener('touchend', onMoveEnd, true);
    thing.addEventListener('touchcancel', onMoveEnd, true);
  }

  onMove(windowComponent, e) {
    this.dragInfo.updateWindowPos(windowComponent, e);
  }

};
