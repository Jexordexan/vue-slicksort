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
 
  getTouched() {    
    if (this.touched)
    {
    return this.refs[this.touched.collection].find(({node}) => node.sortableInfo.index == this.touched.index);
    }
    else{
      return null;
    }
  }

  getSelected() {
    return this.refs[this.touched.collection].filter(({node}) => node.sortableInfo.selected == true || node.sortableInfo.index == this.touched.index);    
  }

  getIndex(collection, ref) {
    return this.refs[collection].indexOf(ref);
  }

  getOrderedRefs(collection = this.touched.collection) {
    return this.refs[collection].sort((a, b) => {
      return a.node.sortableInfo.index - b.node.sortableInfo.index;
    });
  }
}
