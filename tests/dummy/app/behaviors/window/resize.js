import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { extractPosInfo } from '../../utils/touch';

function extractPosition(side, e) {
  const posInfo = extractPosInfo(e);
  switch(side) {
    case 'E':
    case 'W':
      return posInfo.clientX;
    case 'N':
    case 'S':
      return posInfo.clientY;
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
  minWidth = null;
  minHeight = null;

  constructor(windowComponent, side, minWidth, minHeight, e) {
    this.side = side;
    this.mStartPos = extractPosition(this.side, e);
    const r = windowComponent.rectangle;
    this.wStartDim = r.get(getWindowDimensionName(this.side));
    this.wStartPos = r.get(getWindowPositionName(this.side));
    this.minWidth = minWidth;
    this.minHeight = minHeight;
  }

  getConstraintValue(side) {
    switch(side) {
      case 'E':
      case 'W':
        return this.minWidth;
      case 'N':
      case 'S':
        return this.minHeight;
    }
    throw `Unexpected side "${side}"`;
  }

  updateWindowSize(windowComponent, e) {
    const offset = extractPosition(this.side, e) - this.mStartPos;
    const dimName = getWindowDimensionName(this.side);
    const minValue = this.getConstraintValue(this.side);
    const r = windowComponent.rectangle;
    switch(this.side) {
      case 'E':
      case 'S':
          r.set(dimName, Math.max(minValue, this.wStartDim + offset));
          break;
      case 'W':
      case 'N':
        const posName = getWindowPositionName(this.side);
        const dim = Math.max(minValue, this.wStartDim - offset);
        r.set(dimName, dim);
        r.set(posName, this.wStartPos + this.wStartDim - dim);
    }
  }

}

export default class ResizeBehavior extends EmberObject {

  name = 'standard-resize-behavior';
  exclusionGroup = 'resize';

  minWidth = 50;
  minHeight = 50;

  events = null;
  dragInfos = null;

  constructor() {
    super(...arguments);
    this.events = {};
    this.events.onSideDragStart = ['sideDragStart:_all'];
    this.events.onCornerDragStart = ['cornerDragStart:_all'];
  }

  onSideDragStart(windowComponent, side, e) {
    this.dragInfos = A([new DragInfo(windowComponent, side, this.minWidth, this.minHeight, e)]);
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
    }
    thing.addEventListener('mousemove', onMove, true);
    thing.addEventListener('touchmove', onMove, true);
    thing.addEventListener('mouseup', onMoveEnd, true);
    thing.addEventListener('touchend', onMoveEnd, true);
    thing.addEventListener('touchcancel', onMoveEnd, true);
  }

  onCornerDragStart(windowComponent, corner, e) {
    this.dragInfos =
      A([
        new DragInfo(windowComponent, corner[0], this.minWidth, this.minHeight, e),
        new DragInfo(windowComponent, corner[1], this.minWidth, this.minHeight, e)
      ]);
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
      this.dragInfos = null;
    }
    thing.addEventListener('mousemove', onMove, true);
    thing.addEventListener('touchmove', onMove, true);
    thing.addEventListener('mouseup', onMoveEnd, true);
    thing.addEventListener('touchend', onMoveEnd, true);
    thing.addEventListener('touchcancel', onMoveEnd, true);
  }

  onMove(windowComponent, e) {
    this.dragInfos.forEach(di => di.updateWindowSize(windowComponent, e));
  }

}
