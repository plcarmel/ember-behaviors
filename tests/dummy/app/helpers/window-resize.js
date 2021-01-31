import Helper from '@ember/component/helper';
import WindowResizeBehavior from '../behaviors/window/resize';

export default Helper.extend({

  compute(pA, nA) {
    return WindowResizeBehavior.create(nA);
  }

});
