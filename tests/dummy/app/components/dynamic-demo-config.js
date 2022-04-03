import { A } from '@ember/array';
import { computed, observer } from '@ember/object';

import WindowResizeBehavior from '../behaviors/window/resize';
import WindowMoveBehavior from '../behaviors/window/move';
import DemoConfig from '../components/demo-config';
import InitPropertyMixin from '../mixins/init-property';
import layout from '../templates/dynamic-demo-config';

export default DemoConfig.extend(InitPropertyMixin, {

  layout,

  windowBehaviors: null,

  localWindowResize: WindowResizeBehavior.create({minWidth: 200, minHeight: 200}),
  localWindowMove: WindowMoveBehavior.create(),

  init() {
    this._super(...arguments);
    this.initProperty('windowBehaviors', A([this.localWindowResize, this.localWindowMove]));
  },

  code: computed(function() {
    return this.genCode('\n    @windowBehaviors = {{demoConfig.windowBehaviors}}');
  }),

  _onChange: observer('windowBehaviors.[]', function() {
    this.set('version', this.version + 1);
  })


});
