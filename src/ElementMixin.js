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
    selected: {
      type: Boolean,
      default: false
    }
  },
  
  mounted() {
    const {collection, disabled, index} = this.$props;

    if (!disabled) {
      this.setDraggable(collection, index);
    }
  },

  watch: {
    index(newIndex) {
      if (this.$el && this.$el.sortableInfo) {
        this.$el.sortableInfo.index = newIndex;
      }
    },
    selected(newSelected)
    {
      if (this.$el && this.$el.sortableInfo) {
        this.$el.sortableInfo.selected = newSelected;
      }
    },
    disabled(isDisabled) {
      if (isDisabled) {
        this.removeDraggable(this.collection);
      } else {
        this.setDraggable(this.collection, this.index);
      }
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
        selected: false,
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
