import Helper from '@ember/component/helper';
import WindowKeyboardMoveBehavior from '../behaviors/window/keyboard-move';

export default Helper.extend({

  compute() {
    return WindowKeyboardMoveBehavior.create({});
  }

});
