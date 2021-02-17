import { h } from 'vue';

export const DragHandle = {
  props: {
    tag: {
      type: String,
      default: 'span',
    },
  },
  mounted() {
    this.$el.sortableHandle = true;
  },
  render() {
    return h(this.tag, this.$slots.default());
  },
};
