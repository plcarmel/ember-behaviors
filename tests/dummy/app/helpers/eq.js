import Helper from '@ember/component/helper';

export default Helper.extend({

  compute([a,b]) {
    return a === b;
  }

});
