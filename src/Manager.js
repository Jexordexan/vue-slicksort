export default class Manager {
  constructor() {
    this.refs = {};
  }

  add(collection, ref) {
    if (!this.refs[collection]) {
      this.refs[collection] = [];
    }

    this.refs[collection].push(ref);
  }

  remove(collection, ref) {
    const index = this.getIndex(collection, ref);

    if (index !== -1) {
      this.refs[collection].splice(index, 1);
    }
  }

  isActive() {
    return this.active;
  }

  getActive() {
    return this.refs[this.active.collection].find(({node}) => node.sortableInfo.index == this.active.index);
  }

  getIndex(collection, ref) {
    return this.refs[collection].indexOf(ref);
  }

  getOrderedRefs(collection = this.active.collection) {
    return this.refs[collection].sort((a, b) => {
      return a.node.sortableInfo.index - b.node.sortableInfo.index;
    });
  }
}
