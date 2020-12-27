import Helper from '@ember/component/helper';
import WindowMoveBehavior from '../behaviors/window/move';

export default Helper.extend({

  compute() {
    return WindowMoveBehavior.create({});
  }

});
