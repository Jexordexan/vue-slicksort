import { ElementMixin } from './ElementMixin';
import { ContainerMixin } from './ContainerMixin';

export const SlickList = {
  name: 'slick-list',
  mixins: [ ContainerMixin ],
  props: {
    tag: {
      type: String,
      default: 'div',
    }
  },
  render (h) {
    return h(this.$props.tag || 'div', this.$slots.default);
  },
};

export const SlickItem = {
  name: 'slick-item',
  mixins: [ ElementMixin ],
  props: [ 'tag' ],
  render (h) {
    return h(this.$props.tag, this.$slots.default);
  },
};
