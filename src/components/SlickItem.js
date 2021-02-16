import { h } from 'vue';
import { ElementMixin } from '../ElementMixin';

export const SlickItem = {
  name: 'slick-item',
  mixins: [ElementMixin],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  render() {
    return h(this.tag, this.$slots.default());
  },
};
