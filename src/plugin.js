import Manager from './Manager';
import { getRectCenter, getDistance, getPointerOffset } from './utils';

let _id = 1;

class SlicksortHub extends Manager {
  constructor() {
    super();
    this.groups = {};
    this.boxes = [];
    this.sorting = false;
  }

  getId() {
    return '' + _id++;
  }

  addContainer(group, id, ref) {
    if (!this.groups[group]) {
      this.groups[group] = [];
    }

    console.log('container added to group', group);
    
    this.groups[group].push(ref);
  }

  removeContainer(collection, ref) {
    const index = this.getIndex(collection, ref);

    if (index !== -1) {
      this.groups[collection].splice(index, 1);
    }
  }

  setActive({ group, id }) {
    console.log('setActive', { group, id });
    this.sorting = true;
    this.source = { group, id };
    this.dest = { group, id };
  }

  isDest(container) {
    return this.sorting &&
            container.group === this.dest.group &&
            container.id === this.dest.id;
  }

  sortStart() {
    const group = this.groups[this.source.group];
  }

  findClosestDest({ x, y }, containers) {
    let closest = null;
    let minDistance = Infinity;
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      const center = getRectCenter(container.container.getBoundingClientRect());
      const distance = getDistance(x, y, center.x, center.y);
      if (distance < minDistance) {
        closest = container;
        minDistance = distance;
      }
    }
    return closest;
  }

  handleSortMove(e) {
    const dest = this.dest;
    const group = this.groups[this.source.group];
    const pointer = getPointerOffset(e);
    const newDest = this.findClosestDest(pointer, group);
    if (dest.id !== newDest.id) {
      this.dest = newDest;
      console.log('new destination', newDest.id);
    }
  }

  handleSortEnd(e) {
    this.cancel()
  }

  cancel() {
    if (this.sorting) {
      console.log('cancel');
      this.sorting = false;
      this.active = null;
    }
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$_slicksort_hub = new SlicksortHub(options);
  },
};
