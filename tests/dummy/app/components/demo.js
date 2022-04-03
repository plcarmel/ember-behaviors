import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import InitPropertyMixin from '../mixins/init-property';
import BoardView from '../models/board-view';
import layout from '../templates/demo';

export default Component.extend(InitPropertyMixin, {

  layout,
  classNames: ['demo'],

  boardView: null,

  tab: 'static',
  version: 0,

  init() {
    this._super(...arguments);
    this.initProperty('boardView', BoardView.create({}));
  },

  dynamicCode: computed(function() {
    return this.genCode('');
  }),

  code: computed('tab', 'staticCode', 'dynamicCode', function() {
    switch(this.tab) {
      case 'static':
        return this.staticCode;
      case 'dynamic':
        return this.dynamicCode;
    }
    
  }),

  actions: {

    goStatic() {
      this.set('tab', 'static');
    },

    goDynamic() {
      this.set('tab', 'dynamic');
    }

  }

});

