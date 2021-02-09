import Component from '@ember/component';
import { computed, observer } from '@ember/object';

export default Component.extend({

  tag: null,

  version: 0,

  mod2: computed('version', function() {
    return this.version % 2;
  }),

  onChange: observer('includeWindowResize', 'includeWindowMove', function() {
    this.set('version', this.version + 1);
  }),

  genCode(innerCode) {
    return '<Board'
      + '\n    @model = {{boardView}}'
      + innerCode
      + '\n/>';
  }

});

