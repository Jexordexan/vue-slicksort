import Manager from './Manager';
import { getRectCenter, getDistance, getPointerOffset } from './utils';

let _id = 1;

class SlicksortHub extends Manager {
  constructor() {
    super();
    this.groups = {};
    this.boxes = [];
    this.sorting = false;
    this.helper = null;
    this.ghost = null;
  }

  getId() {
    return '' + _id++;
  }

  isSource({ id }) {
    return this.source.id === id;
  }

  isDest({ id }) {
    return this.dest.id === id;
  }

  addContainer(group, ref) {
    this.add(group, ref);
  }

  removeContainer(group, ref) {
    this.remove(group, ref);
  }

  sortStart({ group, ref }) {
    this.sorting = true;
    this.source = { group, id: ref.id, ref };
    this.dest = { group, id: ref.id, ref };
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
    const group = this.refs[this.source.group];
    const pointer = getPointerOffset(e);
    const newDest = this.findClosestDest(pointer, group);
    if (dest.id !== newDest.id) {
      this.dest = { group, id: newDest.id, ref: newDest };
      dest.ref.handleDragOut(e);
      newDest.handleDragIn(e, this.ghost);
    }
    if (dest.id !== this.source.id) {
      this.dest.ref.updatePosition(e);
      this.dest.ref.animateNodes();
      this.dest.ref.autoscroll();
    }
  }

  handleSortEnd() {
    if (this.source.id === this.dest.id) return;
    const payload = this.source.ref.handleDropOut();
    this.dest.ref.handleDropIn(payload);
    this.source = null;
    this.dest = null;
    this.active = null;
    this.helper = null;
    this.ghost = null;
    this.sorting = false;
  }

  reset() {
    this.source = null;
    this.dest = null;
    this.active = null;
    this.helper = null;
    this.ghost = null;
    this.sorting = false;
  }

  cancel(e) {
    this.dest.ref.handleDragOut(e);
    this.source.handleSortEnd(e);
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$_slicksort_hub = new SlicksortHub(options);
  },
};
