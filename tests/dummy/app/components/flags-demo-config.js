import { computed } from '@ember/object';

import DemoConfig from '../components/demo-config';
import layout from '../templates/flags-demo-config';

export default DemoConfig.extend({

  layout,

  code: computed(function() {
    return this.genCode('');
  })
});
