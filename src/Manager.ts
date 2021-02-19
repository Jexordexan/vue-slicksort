import { TopLeft } from './utils';

export interface SortableNode extends HTMLElement {
  sortableInfo: {
    index: number;
    manager: Manager;
  };
  sortableHandle?: boolean;
}

export interface ItemRef {
  node: SortableNode;
  index?: number;
  edgeOffset?: TopLeft | null;
}

export default class Manager {
  private refs: ItemRef[] = [];
  public active: { index: number } | null = null;

  add(ref: ItemRef): void {
    if (!this.refs) {
      this.refs = [];
    }

    this.refs.push(ref);
  }

  remove(ref: ItemRef): void {
    const index = this.getIndex(ref);

    if (index !== -1) {
      this.refs.splice(index, 1);
    }
  }

  isActive(): boolean {
    return !!this.active;
  }

  getActive(): ItemRef | null {
    return this.refs.find(({ node }) => node?.sortableInfo?.index == this?.active?.index) || null;
  }

  getIndex(ref: ItemRef): number {
    return this.refs.indexOf(ref);
  }

  getRefs(): ItemRef[] {
    return this.refs;
  }

  getOrderedRefs(): ItemRef[] {
    return this.refs.sort((a, b) => {
      return a.node.sortableInfo.index - b.node.sortableInfo.index;
    });
  }
}
