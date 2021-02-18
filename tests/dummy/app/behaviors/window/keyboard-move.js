import { keyDown } from 'ember-keyboard';
import MoveBehavior, { DragInfo } from './move';

export default class KeyboardMoveBehavior extends MoveBehavior {

  name = 'kb-ext-move-behavior';

  step = 10;

  constructor() {
    super(...arguments);
    this.events.onArrowLeft = [keyDown('ArrowLeft')];
    this.events.onArrowRight = [keyDown('ArrowRight')];
    this.events.onArrowUp = [keyDown('ArrowUp')];
    this.events.onArrowDown = [keyDown('ArrowDown')];
  }

  onArrowLeft(windowComponent, e) {
    const r = windowComponent.rectangle;
    r.set('x', r.x - this.step);
    e.preventDefault();
  }

  onArrowRight(windowComponent, e) {
    const r = windowComponent.rectangle;
    r.set('x', r.x + this.step);
    e.preventDefault();
  }

  onArrowUp(windowComponent, e) {
    const r = windowComponent.rectangle;
    r.set('y', r.y - this.step);
    e.preventDefault();
  }

  onArrowDown(windowComponent, e) {
    const r = windowComponent.rectangle;
    r.set('y', r.y + this.step);
    e.preventDefault();
  }

};
