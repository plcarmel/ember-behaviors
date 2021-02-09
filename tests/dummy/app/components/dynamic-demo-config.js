import { A } from '@ember/array';
import { computed, observer } from '@ember/object';

import DemoConfig from '../components/demo-config';
import layout from '../templates/dynamic-demo-config';
import InitPropertyMixin from '../mixins/init-property';

export default DemoConfig.extend(InitPropertyMixin, {

  layout,

  windowBehaviors: null,

  init() {
    this._super(...arguments);
    this.initProperty('windowBehaviors', A([]));
  },

  code: computed(function() {
    return this.genCode('\n    @windowBehaviors = {{demoConfig.windowBehaviors}}');
  }),

  _onChange: observer('windowBehaviors.[]', function() {
    this.set('version', this.version + 1);
  })


});
