import BoardView from '../models/board-view';
import Component from '@ember/component';
import InitPropertyMixin from '../mixins/init-property';
import layout from '../templates/board';

const BoardComponent = Component.extend(InitPropertyMixin, {

  layout,
  classNames: ['board'],

  model: null,

  init() {
    this._super(...arguments);
    this.initProperty('model', BoardView.create({}));
  }

});

export default BoardComponent;
