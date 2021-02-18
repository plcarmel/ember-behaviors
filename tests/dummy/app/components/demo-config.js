import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  tag: null,

  version: 0,

  mod2: computed('version', function() {
    return this.version % 2;
  }),

  genCode(innerCode) {
    return '<Board'
      + '\n    @model = {{boardView}}'
      + innerCode
      + '\n/>';
  }

});

