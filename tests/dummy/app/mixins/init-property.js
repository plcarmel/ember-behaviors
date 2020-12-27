import { isNone } from '@ember/utils';
import Mixin from '@ember/object/mixin';

const InitPropertyMixin = Mixin.create({

  initProperty(propertyName, defaultValue) {
    if (isNone(this.get(propertyName))) {
      this.set(propertyName, defaultValue);
    }
  }

});

export default InitPropertyMixin;
