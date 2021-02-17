interface SortableNode extends HTMLElement {
  sortableInfo: {
    index: number;
  };
}

interface ItemRef {
  node: SortableNode;
  index: number;
}

export default class Manager {
  private refs: ItemRef[] = [];
  private active: ItemRef | null = null;
  constructor() {}

  add(ref: ItemRef) {
    if (!this.refs) {
      this.refs = [];
    }

    this.refs.push(ref);
  }

  remove(ref: ItemRef) {
    const index = this.getIndex(ref);

    if (index !== -1) {
      this.refs.splice(index, 1);
    }
  }

  isActive() {
    return !!this.active;
  }

  getActive() {
    return this.refs.find(({ node }) => node?.sortableInfo?.index == this?.active?.index);
  }

  getIndex(ref: ItemRef) {
    return this.refs.indexOf(ref);
  }

  getOrderedRefs() {
    return this.refs.sort((a, b) => {
      return a.node.sortableInfo.index - b.node.sortableInfo.index;
    });
  }
}
