import { ElementMixin } from './ElementMixin';
import { ContainerMixin } from './ContainerMixin';

export const SortableList = {
  mixins: [ ContainerMixin ],
  render (h) {
    return h('div', this.$slots.default);
  },
};

export const SortableItem = {
  mixins: [ ElementMixin ],
  render (h) {
    return h('div', this.$slots.default);
  },
};