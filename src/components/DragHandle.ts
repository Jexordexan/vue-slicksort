import { h, defineComponent } from 'vue';

export const DragHandle = defineComponent({
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
    return h(this.tag, this.$slots.default?.());
  },
});
