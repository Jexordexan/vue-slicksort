import { TopLeft } from './utils';

export interface SortableNode extends HTMLElement {
  sortableInfo: {
    index: number;
    manager: Manager;
  };
}

export interface ItemRef {
  node: SortableNode;
  index?: number;
  edgeOffset?: TopLeft | null;
}

export default class Manager {
  private refs: ItemRef[] = [];
  public active: { index: number } | null = null;
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

  getRefs() {
    return this.refs;
  }

  getOrderedRefs() {
    return this.refs.sort((a, b) => {
      return a.node.sortableInfo.index - b.node.sortableInfo.index;
    });
  }
}
