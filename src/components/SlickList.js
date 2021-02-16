import { h } from 'vue';
import { ContainerMixin } from '../ContainerMixin';
import { SlickItem } from './SlickItem';

export const SlickList = {
  name: 'slick-list',
  mixins: [ContainerMixin],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    itemKey: {
      type: String,
      default: 'id',
    },
  },
  render() {
    if (this.$slots.item) {
      return h(
        this.tag,
        this.list.map((item, index) => {
          const key = typeof item === 'object' ? item[this.itemKey] : item;
          return h(
            SlickItem,
            {
              key,
              index,
            },
            {
              default: () => this.$slots.item({ item, index }),
            }
          );
        })
      );
    }
    return h(this.tag, this.$slots.default());
  },
};
