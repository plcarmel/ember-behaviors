import { computed } from '@ember/object';

import DemoConfig from '../components/demo-config';
import layout from '../templates/static-demo-config';

export default DemoConfig.extend({

  layout,

  includeWindowResize: true,
  includeWindowMove: true,

  code: computed('includeWindowResize', 'includeWindowMove', function() {
    const a = this.includeWindowResize;
    const b = this.includeWindowMove;
    return this.genCode(
      (a || b ? '\n    @windowBehaviors = {{array' : '')
      + (a ? '\n        (window-resize minWidth=200 minHeight=100)' : '')
      + (b ? '\n        (window-move)' : '')
      + (a || b ? '\n    }}' : '')
    );
  })

});
