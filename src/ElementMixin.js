// Export Sortable Element Component Mixin
export const ElementMixin = {
  inject: ['manager'],
  props: {
    index: {
      type: Number,
      required: true,
    },
    collection: {
      type: [String, Number],
      default: 'default',
    },
    disabled: { 
      type: Boolean, 
      default: false,
    },
  },

  mounted() {
    const {collection, disabled, index} = this.$props;

    this.setDraggable(collection, index);
    this.$el.sortableInfo.disabled = disabled;
  },

  watch: {
    index(newIndex) {
      if (this.$el && this.$el.sortableInfo) {
        this.$el.sortableInfo.index = newIndex;
      }
    },
    disabled(isDisabled) {
      this.$el.sortableInfo.disabled = isDisabled;
    },
    collection(newCollection, oldCollection) {
      this.removeDraggable(oldCollection);
      this.setDraggable(newCollection, this.index);
    },
  },

  beforeDestroy() {
    const {collection, disabled} = this;

    if (!disabled) this.removeDraggable(collection);
  },
  methods: {
    setDraggable(collection, index) {
      const node = this.$el;
  
      node.sortableInfo = {
        index,
        collection,
        manager: this.manager,
      };
  
      this.ref = {node};
      this.manager.add(collection, this.ref);
    },
  
    removeDraggable(collection) {
      this.manager.remove(collection, this.ref);
    },
  },
};
