import { getRectCenter, getDistance, getPointerOffset, isPointWithinRect } from './utils';

let containerIDCounter = 1;

/**
 * Always allow when dest === source
 * Defer to 'dest.accept()' if it is a function
 * Allow any group in the accept lists
 * Deny any group in the block list
 * Allow the same group by default, this can be overridden with the block prop
 */
function canAcceptElement(dest, source, payload) {
  if (source.id === dest.id) return true;
  if (dest.block && dest.block.includes(source.group)) return false;
  if (typeof dest.accept === 'function') {
    return dest.accept({ dest, source, payload });
  }
  if (typeof dest.accept === 'boolean') {
    return dest.accept;
  }
  if (dest.accept && dest.accept.includes(source.group)) return true;
  if (dest.group === source.group) return true;
  return false;
}

function findClosestDest({ x, y }, refs, currentDest) {
  // Quickly check if we are within the bounds of the current destination
  if (isPointWithinRect({ x, y }, currentDest.container.getBoundingClientRect())) {
    return currentDest;
  }

  let closest = null;
  let minDistance = Infinity;
  for (let i = 0; i < refs.length; i++) {
    const ref = refs[i];
    const rect = ref.container.getBoundingClientRect();
    const isWithin = isPointWithinRect({ x, y }, rect);

    if (isWithin) {
      // If we are within another destination, stop here
      return ref;
    }

    const center = getRectCenter(rect);
    const distance = getDistance(x, y, center.x, center.y);
    if (distance < minDistance) {
      closest = ref;
      minDistance = distance;
    }
  }

  // Try to guess the closest destination
  return closest;
}

export default class SlicksortHub {
  constructor() {
    this.refs = [];
    this.sorting = false;
    this.helper = null;
    this.ghost = null;
  }

  getId() {
    return '' + containerIDCounter++;
  }

  isSource({ id }) {
    return this.source.id === id;
  }

  getSource() {
    return this.source;
  }

  isDest({ id }) {
    return this.dest.id === id;
  }

  getDest() {
    return this.dest;
  }

  addContainer(ref) {
    this.refs.push(ref);
  }

  removeContainer(ref) {
    this.refs = this.refs.filter((c) => c.id !== ref.id);
  }

  sortStart({ ref }) {
    this.sorting = true;
    this.source = ref;
    this.dest = ref;
  }

  handleSortMove(e, payload) {
    const dest = this.dest;
    const source = this.source;
    const refs = this.refs;
    const pointer = getPointerOffset(e, 'client');
    const newDest = findClosestDest(pointer, refs, dest);
    if (dest.id !== newDest.id && canAcceptElement(newDest, source, payload)) {
      this.dest = newDest;
      dest.handleDragOut(e);
      newDest.handleDragIn(e, this.ghost, this.helper);
    }
    if (dest.id !== this.source.id) {
      this.dest.updatePosition(e);
      this.dest.animateNodes();
      this.dest.autoscroll();
    }
  }

  handleSortEnd() {
    if (this.source.id === this.dest.id) return;
    const payload = this.source.handleDropOut();
    this.dest.handleDropIn(payload);
    this.reset();
  }

  reset() {
    this.source = null;
    this.dest = null;
    this.helper = null;
    this.ghost = null;
    this.sorting = false;
  }

  cancel(e) {
    this.dest.handleDragOut(e);
    this.source.handleSortEnd(e);
    this.reset();
  }
}
