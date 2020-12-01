import { h } from 'vue';
import { ElementMixin } from './ElementMixin';
import { ContainerMixin } from './ContainerMixin';

export const SlickList = {
  name: 'slick-list',
  mixins: [ContainerMixin],
  render() {
    return h('div', this.$slots.default());
  },
};

export const SlickItem = {
  name: 'slick-item',
  mixins: [ElementMixin],
  render() {
    return h('div', this.$slots.default());
  },
};
