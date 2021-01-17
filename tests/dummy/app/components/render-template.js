import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  templateString: '',

  layout: computed('templateString', function() {
    return Ember.HTMLBars.compile(this.templateString);
  }),

});
