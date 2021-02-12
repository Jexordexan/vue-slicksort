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

  findClosestDest({ x, y }, refs) {
    let closest = null;
    let minDistance = Infinity;
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      const center = getRectCenter(ref.container.getBoundingClientRect());
      const distance = getDistance(x, y, center.x, center.y);
      if (distance < minDistance) {
        closest = ref;
        minDistance = distance;
      }
    }
    return closest;
  }

  handleSortMove(e) {
    const dest = this.dest;
    const group = this.refs[this.source.group];
    const pointer = getPointerOffset(e, 'client');
    const newDest = this.findClosestDest(pointer, group);
    if (dest.id !== newDest.id) {
      this.dest = { group, id: newDest.id, ref: newDest };
      dest.ref.handleDragOut(e);
      newDest.handleDragIn(e, this.ghost, this.helper);
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
    this.source.ref.handleSortEnd(e);
  }
}

export default {
  install(app, options) {
    app.config.globalProperties.$_slicksort_hub = new SlicksortHub(options);
  },
};
