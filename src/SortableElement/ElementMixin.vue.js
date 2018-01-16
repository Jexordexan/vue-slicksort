// Export Sortable Element Component Mixin
export const ElementMixin = {
  name: 'sortableElement',
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
    disabled: Boolean,
  },

  mounted() {
    const {collection, disabled, index} = this.$props;

    if (!disabled) {
      this.setDraggable(collection, index);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.index !== nextProps.index && this.node) {
      this.node.sortableInfo.index = nextProps.index;
    }
    if (this.disabled !== nextProps.disabled) {
      const {collection, disabled, index} = nextProps;
      if (disabled) {
        this.removeDraggable(collection);
      } else {
        this.setDraggable(collection, index);
      }
    } else if (this.collection !== nextProps.collection) {
      this.removeDraggable(this.collection);
      this.setDraggable(nextProps.collection, nextProps.index);
    }
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
