import Manager from './Manager';
import { getRectCenter, getDistance, getPointerOffset, isPointWithinRect, PointEvent } from './utils';

let containerIDCounter = 1;

export interface ContainerRef {
  id: string;
  group: string;
  accept: AcceptProp | null;
  block: string[];
  container: HTMLElement;
  newIndex: number;
  manager: Manager;
  sortableGhost: HTMLElement | null;

  handleDragIn(e: PointEvent, ghost: HTMLElement | null, helper: HTMLElement | null): void;
  handleDragOut(): void;
  handleDragEnd(): void;
  handleSortEnd(e: PointEvent): void;
  handleDropIn(payload: unknown): void;
  handleDropOut(): unknown;

  updatePosition(e: PointEvent): void;
  animateNodes(): void;
  autoscroll(): void;
}

type AcceptPropArgs = { source: ContainerRef; dest: ContainerRef; payload: unknown };
export type AcceptProp = boolean | string[] | ((args: AcceptPropArgs) => boolean);

/**
 * Always allow when dest === source
 * Defer to 'dest.accept()' if it is a function
 * Allow any group in the accept lists
 * Deny any group in the block list
 * Allow the same group by default, this can be overridden with the block prop
 */
function canAcceptElement(dest: ContainerRef, source: ContainerRef, payload: unknown): boolean {
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

function findClosestDest(
  { x, y }: { x: number; y: number },
  refs: ContainerRef[],
  currentDest: ContainerRef,
): ContainerRef | null {
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
  public helper: HTMLElement | null = null;
  public ghost: HTMLElement | null = null;

  private refs: ContainerRef[] = [];
  private source: ContainerRef | null = null;
  private dest: ContainerRef | null = null;

  getId(): string {
    return '' + containerIDCounter++;
  }

  isSource({ id }: ContainerRef): boolean {
    return this.source?.id === id;
  }

  getSource(): ContainerRef | null {
    return this.source;
  }

  isDest({ id }: ContainerRef): boolean {
    return this.dest?.id === id;
  }

  getDest(): ContainerRef | null {
    return this.dest;
  }

  addContainer(ref: ContainerRef): void {
    this.refs.push(ref);
  }

  removeContainer(ref: ContainerRef): void {
    this.refs = this.refs.filter((c) => c.id !== ref.id);
  }

  sortStart(ref: ContainerRef): void {
    this.source = ref;
    this.dest = ref;
  }

  handleSortMove(e: PointEvent, payload: unknown): void {
    const dest = this.dest;
    const source = this.source;

    if (!dest || !source) return;

    const refs = this.refs;
    const pointer = getPointerOffset(e, 'client');
    const newDest = findClosestDest(pointer, refs, dest) || dest;

    if (dest.id !== newDest.id && canAcceptElement(newDest, source, payload)) {
      this.dest = newDest;
      dest.handleDragOut();
      newDest.handleDragIn(e, this.ghost, this.helper);
    }
    if (dest.id !== this.source?.id) {
      this.dest?.updatePosition(e);
      this.dest?.animateNodes();
      this.dest?.autoscroll();
    }
  }

  handleSortEnd(): void {
    if (this.source?.id === this.dest?.id) return;
    const payload = this.source?.handleDropOut();
    this.dest?.handleDropIn(payload);
    this.reset();
  }

  reset(): void {
    this.source = null;
    this.dest = null;
    this.helper = null;
    this.ghost = null;
  }

  cancel(e: PointEvent): void {
    this.dest?.handleDragEnd();
    this.source?.handleSortEnd(e);
    this.reset();
  }
}
