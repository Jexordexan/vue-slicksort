export default class Manager {
  constructor() {
    this.refs = [];
    this.active = null;
  }

  add(ref) {
    if (!this.refs) {
      this.refs = [];
    }

    this.refs.push(ref);
  }

  remove(ref) {
    const index = this.getIndex(ref);

    if (index !== -1) {
      this.refs.splice(index, 1);
    }
  }

  isActive() {
    return !!this.active;
  }

  getActive() {
    return this.refs.find(({ node }) => node.sortableInfo.index == this.active.index);
  }

  getIndex(ref) {
    return this.refs.indexOf(ref);
  }

  getOrderedRefs() {
    return this.refs.sort((a, b) => {
      return a.node.sortableInfo.index - b.node.sortableInfo.index;
    });
  }
}
