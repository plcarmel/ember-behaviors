import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  tagName: '',

  templateString: '',

  layout: computed('templateString', function() {
    return Ember.HTMLBars.compile(this.templateString);
  }),

});
