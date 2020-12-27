import EmberObject from '@ember/object';
import { A } from '@ember/array';

const minSize = 50;

function extractMousePosition(side, e) {
  switch(side) {
    case 'E':
    case 'W':
      return e.clientX;
    case 'N':
    case 'S':
      return e.clientY;
  }
  throw `Unexpected side "${side}"`;
}

function getWindowDimensionName(side) {
  switch(side) {
    case 'E':
    case 'W':
      return 'width';
    case 'N':
    case 'S':
      return 'height';
  }
  throw `Unexpected side "${side}"`;
}

function getWindowPositionName(side) {
  switch(side) {
    case 'E':
    case 'W':
      return 'x';
    case 'N':
    case 'S':
      return 'y';
  }
  throw `Unexpected side "${side}"`;
}

class DragInfo {

  side = null;
  mStartPos = null;
  wStartDim = null;
  wStartPos = null;

  constructor(windowComponent, side, e) {
    this.side = side;
    this.mStartPos = extractMousePosition(this.side, e);
    const r = windowComponent.rectangle;
    this.wStartDim = r.get(getWindowDimensionName(this.side));
    this.wStartPos = r.get(getWindowPositionName(this.side));
  }

  isCompatible(sideComponent) {
    return sideComponent.note == this.note && sideComponent.side == this.side;
  }

  computeOffset(e) {
    return extractMousePosition(this.side, e) - this.mStartPos;
  }

  updateWindowSize(windowComponent, e) {
    const offset = this.computeOffset(e);
    const dimName = getWindowDimensionName(this.side);
    const constrained = x => Math.max(minSize, x);
    const r = windowComponent.rectangle;
    switch(this.side) {
      case 'E':
      case 'S':
          r.set(dimName, constrained(this.wStartDim + offset));
          break;
      case 'W':
      case 'N':
        const posName = getWindowPositionName(this.side);
        const dim = constrained(this.wStartDim - offset);
        r.set(dimName, dim);
        r.set(posName, this.wStartPos + this.wStartDim - dim);
    }
  }

}

export default class ResizeBehavior extends EmberObject {

  exclusionGroup = 'resize';
  events = null;

  dragInfos = null;

  constructor() {
    super(...arguments);
    this.events = {};
    this.events.onSideDragStart = ['sideDragStart:_all'];
    this.events.onCornerDragStart = ['cornerDragStart:_all'];
  }

  onSideDragStart(windowComponent, side, e) {
    this.dragInfos = A([new DragInfo(windowComponent, side, e)]);
    const that = this;
    const thing = window;
    function onMouseMove(e) {
      that.onMouseMove(windowComponent, e);
    }
    function onMouseUp() {
      thing.removeEventListener('mousemove', onMouseMove, true);
      thing.removeEventListener('mouseup', onMouseUp, true);
    }
    thing.addEventListener('mousemove', onMouseMove, true);
    thing.addEventListener('mouseup', onMouseUp, true);
  }

  onCornerDragStart(windowComponent, corner, e) {
    this.dragInfos =
      A([
        new DragInfo(windowComponent, corner[0], e),
        new DragInfo(windowComponent, corner[1], e)
      ]);
    const that = this;
    const thing = window;
    function onMouseMove(e) {
      that.onMouseMove(windowComponent, e);
    }
    function onMouseUp() {
      thing.removeEventListener('mousemove', onMouseMove, true);
      thing.removeEventListener('mouseup', onMouseUp, true);
      this.dragInfos = null;
    }
    thing.addEventListener('mousemove', onMouseMove, true);
    thing.addEventListener('mouseup', onMouseUp, true);
  }

  onMouseMove(windowComponent, e) {
    this.dragInfos.forEach(di => di.updateWindowSize(windowComponent, e));
  }

}
