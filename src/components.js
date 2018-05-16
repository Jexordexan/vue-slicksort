import { ElementMixin } from './ElementMixin';
import { ContainerMixin } from './ContainerMixin';

export const SlickList = {
  name: 'slick-list',
  mixins: [ ContainerMixin ],
  render (h) {
    return h('div', this.$slots.default);
  },
};

export const SlickItem = {
  name: 'slick-item',
  mixins: [ ElementMixin ],
  render (h) {
    return h('div', this.$slots.default);
  },
};
