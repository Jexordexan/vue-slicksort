import { h, defineComponent, PropType } from 'vue';
import { ContainerMixin } from '../ContainerMixin';
import { hasOwnProperty } from '../utils';
import { SlickItem } from './SlickItem';

export const SlickList = defineComponent({
  name: 'SlickList',
  mixins: [ContainerMixin],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    itemKey: {
      type: [String, Function] as PropType<((item: unknown) => string) | string>,
      default: 'id',
    },
  },
  render() {
    if (this.$slots.item) {
      return h(
        this.tag,
        this.list.map((item, index) => {
          let key: string;
          if (item == null) {
            return;
          } else if (typeof this.itemKey === 'function') {
            key = this.itemKey(item);
          } else if (
            typeof item === 'object' &&
            hasOwnProperty(item, this.itemKey) &&
            typeof item[this.itemKey] == 'string'
          ) {
            key = item[this.itemKey] as string;
          } else if (typeof item === 'string') {
            key = item;
          } else {
            throw new Error('Cannot find key for item, use the item-key prop and pass a function or string');
          }
          return h(
            SlickItem,
            {
              key,
              index,
            },
            {
              default: () => this.$slots.item?.({ item, index }),
            },
          );
        }),
      );
    }
    return h(this.tag, this.$slots.default?.());
  },
});
