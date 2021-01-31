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

  includeWindowResize: true,
  includeWindowMove: true,

  boardView: null,

  tab: 'static',

  init() {
    this._super(...arguments);
    this.initProperty('boardView', BoardView.create({}));
  },

  flags: computed('includeWindowResize', 'includeWindowMove', function() {
    return 2*(this.includeWindowResize?1:0) + 1*(this.includeWindowMove?1:0);
  }),

  code: computed('includeWindowResize', 'includeWindowMove', function() {
    const a = this.includeWindowResize;
    const b = this.includeWindowMove;
    return '<Board'
      + '\n    @model = {{boardView}}'
      + (a || b ? '\n    @windowBehaviors = {{array' : '')
      + (a ? '\n        (window-resize minWidth=200 minHeight=100)' : '')
      + (b ? '\n        (window-move)' : '')
      + (a || b ? '\n    }}' : '')
      + '\n/>';
  }),

  actions: {

    goStatic() {
      this.set('tab', 'static');
    },

    goDynamic() {
      this.set('tab', 'dynamic');
    },

    goFlags() {
      this.set('tab', 'flags');
    }

  }

});

