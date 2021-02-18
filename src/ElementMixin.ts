import { defineComponent, inject } from 'vue';
import Manager, { ItemRef } from './Manager';

interface ComponentData {
  manager: Manager;
  ref: ItemRef;
}

// Export Sortable Element Component Mixin
export const ElementMixin = defineComponent({
  inject: ['manager'],
  props: {
    index: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return ({} as unknown) as ComponentData;
  },

  mounted() {
    const { disabled, index } = this.$props;

    if (!disabled) {
      this.setDraggable(index);
    }
  },

  watch: {
    index(newIndex) {
      if (this.$el && this.$el.sortableInfo) {
        this.$el.sortableInfo.index = newIndex;
      }
    },
    disabled(isDisabled) {
      if (isDisabled) {
        this.removeDraggable();
      } else {
        this.setDraggable(this.index);
      }
    },
  },

  beforeUnmount() {
    if (!this.disabled) this.removeDraggable();
  },

  methods: {
    setDraggable(index: number) {
      const node = this.$el;

      node.sortableInfo = {
        index,
        manager: this.manager,
      };

      this.ref = { node };
      this.manager.add(this.ref);
    },

    removeDraggable() {
      this.manager.remove(this.ref);
    },
  },
});
