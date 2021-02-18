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
      this.list.removeObject(this.behavior);
      this.list.insertAt(0, this.behavior);
    },
    remove() {
      this.list.removeObject(this.behavior);
    }
  }

});
