import Component from '@ember/component';

import layout from '../templates/add-remove-behavior';

export default Component.extend({

  layout,

  list: null,
  behavior: null,

  init() {
    this._super(...arguments);
  },

  actions: {
    add() {
      this.list.addObject(this.behavior);
    },
    remove() {
      this.list.removeObject(this.behavior);
    }
  }

});
