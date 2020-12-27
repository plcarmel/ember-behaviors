import EmberObject from '@ember/object';

class DragInfo {

  mStartPosX = null;
  mStartPosY = null;
  wStartPosX = null;
  wStartPosY = null;

  constructor(windowComponent, e) {
    this.mStartPosX = e.clientX;
    this.mStartPosY = e.clientY;
    const r = windowComponent.rectangle;
    this.wStartPosX = r.x;
    this.wStartPosY = r.y;
  }

  updateWindowPos(windowComponent, e) {
    const offsetX = e.clientX - this.mStartPosX;
    const offsetY = e.clientY - this.mStartPosY;
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
    function onMouseMove(e) {
      that.onMouseMove(windowComponent, e);
    }
    function onMouseUp() {
      thing.removeEventListener('mousemove', onMouseMove, true);
      thing.removeEventListener('mouseup', onMouseUp, true);
      this.dragInfo = null;
    }
    thing.addEventListener('mousemove', onMouseMove, true);
    thing.addEventListener('mouseup', onMouseUp, true);
  }

  onMouseMove(windowComponent, e) {
    this.dragInfo.updateWindowPos(windowComponent, e);
  }

};
