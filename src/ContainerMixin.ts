/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, PropType } from 'vue';
import Manager, { ItemRef, SortableNode } from './Manager';
import SlicksortHub, { AcceptProp, ContainerRef } from './SlicksortHub';
import {
  arrayMove,
  arrayRemove,
  arrayInsert,
  cloneNode,
  closest,
  commonOffsetParent,
  events,
  getEdgeOffset,
  getElementMargin,
  getLockPixelOffsets,
  getPointerOffset,
  limit,
  resetTransform,
  XY,
  TopLeft,
  WidthHeight,
  PointEvent,
  BottomRight,
  isTouch,
  setTransform,
  hasOwnProperty,
} from './utils';

type PointEventListener = (e: PointEvent) => unknown;
// eslint-disable-next-line @typescript-eslint/ban-types
const timeout: (cb: Function, dur?: number) => number = setTimeout;
type Timer = number | null;

interface ComponentProps {
  list: unknown[];
  axis: 'x' | 'y' | 'xy' | 'yx'; // 'x', 'y', 'xy'
  distance: number;
  pressDelay: number;
  pressThreshold: number;
  useDragHandle: boolean;
  useWindowAsScrollContainer: boolean;
  hideSortableGhost: boolean;
  lockToContainerEdges: boolean;
  lockOffset: string | number | string[];
  transitionDuration: number;
  appendTo: string | HTMLElement;
  draggedSettlingDuration: number;
  group: string;
  accept: boolean | string[] | ((ctx: { source: ContainerRef; dest: ContainerRef; payload: unknown }) => boolean);
  cancelKey: string;
  block: string[];
  lockAxis: string;
  helperClass: string;
  contentWindow: Window;
  shouldCancelStart: (e: PointEvent) => boolean;
  getHelperDimensions: (ref: ItemRef) => { width: number; height: number };
}

interface ComponentData extends ComponentProps {
  id: string;

  // usually thi.$el
  container: HTMLElement;

  // ref to document
  document: Document;

  // Provided for sortable elements to register
  manager: Manager;

  // ref to window
  _window: Window;

  // window or container
  // TODO make this a prop
  scrollContainer: { scrollTop: number; scrollLeft: number };

  // Injected and used for drag and drop between lists
  hub?: SlicksortHub;

  // Normalized events for mouse and touch devices
  events: Record<string, PointEventListener>;

  // MOusedown or touchstart occurred
  _touched: boolean;

  // initial point of contact
  _pos: XY;

  // distance from _pos to current pointer position
  // Used for drag threshold, aka `distance`
  _delta: XY;

  // Data structure for `axis` prop
  _axis: { x: boolean; y: boolean };

  // timer for press threshold
  pressTimer: Timer;

  // used to wait until next tick to cancel
  cancelTimer: Timer;

  // dragout transition timer
  dragendTimer: Timer;

  // Used for repeating autoscroll
  autoscrollInterval: Timer;

  // The translation applied to the helper
  translate: XY;

  // The minmax values of translate before starting autoscroll
  minTranslate: Partial<XY>;
  maxTranslate: Partial<XY>;

  // Is the user currently sorting
  sorting: boolean;

  // The user has initiated a cancel action
  canceling: boolean;

  // The active node that was originally clicked
  node: SortableNode;

  // The measurements of the node that have to be calculated separately
  margin: TopLeft & BottomRight;
  width: number;
  height: number;

  // space added around the active node
  marginOffset: XY;

  // Initial offset of the cursor
  initialOffset: XY;

  // Initial scroll position of the container and window
  initialScroll: TopLeft;
  initialWindowScroll: TopLeft;

  // The top-left offset of the node from the offsetParent of the *container*
  // Its important to use the container as a source for the offsetParent so all nodes have the same reference point
  offsetEdge: TopLeft;

  // client rect for the node and container
  boundingClientRect: ClientRect;
  containerBoundingRect: ClientRect;

  // Starting index (use last index for drag in operations)
  index: number | null;

  // Target index for dropping
  newIndex: number | null;

  // The node that follows the mouse
  helper: HTMLElement | null;

  // The node that stays in the list and is hidden
  sortableGhost: HTMLElement | null;

  // The element that we listen to for events
  listenerNode: GlobalEventHandlers;
}

// Export Sortable Container Component Mixin
export const ContainerMixin = defineComponent({
  inject: { 
    SlicksortHub: {
      from: 'SlicksortHub',
      default: null,
    },
  },

  provide() {
    return {
      manager: this.manager,
    };
  },

  props: {
    list: { type: Array as PropType<unknown[]>, required: true },
    axis: { type: String, default: 'y' }, // 'x', 'y', 'xy'
    distance: { type: Number, default: 0 },
    pressDelay: { type: Number, default: 0 },
    pressThreshold: { type: Number, default: 5 },
    useDragHandle: { type: Boolean, default: false },
    useWindowAsScrollContainer: { type: Boolean, default: false },
    hideSortableGhost: { type: Boolean, default: true },
    lockToContainerEdges: { type: Boolean, default: false },
    lockOffset: { type: [String, Number, Array] as PropType<string | number | number[]>, default: '50%' },
    transitionDuration: { type: Number, default: 300 },
    appendTo: { type: [String, Object] as PropType<string | HTMLElement>, default: 'body' },
    draggedSettlingDuration: { type: Number, default: null },
    group: { type: String, default: '' },
    accept: { type: [Boolean, Array, Function] as PropType<AcceptProp>, default: null },
    cancelKey: { type: String, default: 'Escape' },
    block: { type: Array as PropType<string[]>, default: () => [] },
    lockAxis: { type: String, default: '' },
    helperClass: { type: String, default: '' },
    contentWindow: { type: Object as PropType<Window>, default: null },
    shouldCancelStart: {
      type: Function as PropType<PointEventListener>,
      default: (e: PointEvent) => {
        // Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
        const disabledElements = ['input', 'textarea', 'select', 'option', 'button'];
        return disabledElements.indexOf((e.target as HTMLElement).tagName.toLowerCase()) !== -1;
      },
    },
    getHelperDimensions: {
      type: Function as PropType<(arg: ItemRef) => WidthHeight>,
      default: ({ node }: ItemRef) => ({
        width: node.offsetWidth,
        height: node.offsetHeight,
      }),
    },
  },

  emits: ['sort-start', 'sort-move', 'sort-end', 'sort-cancel', 'sort-insert', 'sort-remove', 'update:list'],

  data() {
    let useHub = false;
    if (this.group) {
      // If the group option is set, it is assumed the user intends
      // to drag between containers and the required plugin has been installed
      if (this.SlicksortHub) {
        useHub = true;
      } else if (process.env.NODE_ENV !== 'production') {
        throw new Error('Slicksort plugin required to use "group" prop');
      }
    }

    return ({
      sorting: false,
      hub: useHub ? this.SlicksortHub : null,
      manager: new Manager(),
    } as unknown) as ComponentData;
  },

  mounted() {
    if (this.hub) {
      this.id = this.hub.getId();
    }
    this.container = this.$el;
    this.document = this.container.ownerDocument || document;
    this._window = this.contentWindow || window;
    this.scrollContainer = this.useWindowAsScrollContainer ? { scrollLeft: 0, scrollTop: 0 } : this.container;
    this.events = {
      start: this.handleStart,
      move: this.handleMove,
      end: this.handleEnd,
    };

    for (const key in this.events) {
      if (hasOwnProperty(this.events, key)) {
        // @ts-ignore
        events[key].forEach((eventName) => this.container.addEventListener(eventName, this.events[key]));
      }
    }

    if (this.hub) {
      this.hub.addContainer(this as ContainerRef);
    }
  },

  beforeUnmount() {
    for (const key in this.events) {
      if (hasOwnProperty(this.events, key)) {
        // @ts-ignore
        events[key].forEach((eventName) => this.container.removeEventListener(eventName, this.events[key]));
      }
    }

    if (this.hub) {
      this.hub.removeContainer(this as ContainerRef);
    }

    if (this.dragendTimer) clearTimeout(this.dragendTimer);
    if (this.cancelTimer) clearTimeout(this.cancelTimer);
    if (this.pressTimer) clearTimeout(this.pressTimer);
    if (this.autoscrollInterval) clearInterval(this.autoscrollInterval);
  },

  methods: {
    handleStart(e: PointEvent) {
      const { distance, shouldCancelStart } = this.$props;

      if ((!isTouch(e) && e.button === 2) || shouldCancelStart(e)) {
        return false;
      }

      this._touched = true;
      this._pos = getPointerOffset(e);
      const target = e.target as HTMLElement;

      const node = closest(target, (el) => (el as SortableNode).sortableInfo != null) as SortableNode;

      if (node && node.sortableInfo && this.nodeIsChild(node) && !this.sorting) {
        const { useDragHandle } = this.$props;
        const { index } = node.sortableInfo;

        if (useDragHandle && !closest(target, (el) => (el as SortableNode).sortableHandle != null)) return;

        this.manager.active = { index };

        /*
         * Fixes a bug in Firefox where the :active state of anchor tags
         * prevent subsequent 'mousemove' events from being fired
         * (see https://github.com/clauderic/react-sortable-hoc/issues/118)
         */
        if (target.tagName.toLowerCase() === 'a') {
          e.preventDefault();
        }

        if (!distance) {
          if (this.pressDelay === 0) {
            this.handlePress(e);
          } else {
            this.pressTimer = timeout(() => this.handlePress(e), this.pressDelay) as Timer;
          }
        }
      }
    },

    nodeIsChild(node: SortableNode) {
      return node.sortableInfo.manager === this.manager;
    },

    handleMove(e: PointEvent) {
      const { distance, pressThreshold } = this.$props;

      if (!this.sorting && this._touched) {
        const offset = getPointerOffset(e);
        this._delta = {
          x: this._pos.x - offset.x,
          y: this._pos.y - offset.y,
        };
        const delta = Math.abs(this._delta.x) + Math.abs(this._delta.y);

        if (!distance && (!pressThreshold || (pressThreshold && delta >= pressThreshold))) {
          if (this.cancelTimer) clearTimeout(this.cancelTimer);
          this.cancelTimer = timeout(this.cancel, 0);
        } else if (distance && delta >= distance && this.manager.isActive()) {
          this.handlePress(e);
        }
      }
    },

    handleEnd() {
      if (!this._touched) return;

      const { distance } = this.$props;

      this._touched = false;

      if (!distance) {
        this.cancel();
      }
    },

    cancel() {
      if (!this.sorting) {
        if (this.pressTimer) clearTimeout(this.pressTimer);
        this.manager.active = null;
        if (this.hub) this.hub.cancel();
      }
    },

    handleSortCancel(e: KeyboardEvent | TouchEvent) {
      if (isTouch(e) || e.key === this.cancelKey) {
        this.newIndex = this.index;
        this.canceling = true;
        this.translate = { x: 0, y: 0 };
        this.animateNodes();
        this.handleSortEnd(e);
      }
    },

    handlePress(e: PointEvent) {
      e.stopPropagation();
      const active = this.manager.getActive();

      if (active) {
        const { getHelperDimensions, helperClass, hideSortableGhost, appendTo } = this.$props;
        const { node } = active;
        const { index } = node.sortableInfo;
        const margin = getElementMargin(node);

        const containerBoundingRect = this.container.getBoundingClientRect();
        const dimensions = getHelperDimensions({ index, node });

        this.node = node;
        this.margin = margin;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.marginOffset = {
          x: this.margin.left + this.margin.right,
          y: Math.max(this.margin.top, this.margin.bottom),
        };
        this.boundingClientRect = node.getBoundingClientRect();
        this.containerBoundingRect = containerBoundingRect;
        this.index = index;
        this.newIndex = index;

        const clonedNode = cloneNode(node);
        const helperContainer = appendTo instanceof HTMLElement ? appendTo : this.document.querySelector(appendTo as string);

        this.helper = helperContainer!.appendChild(clonedNode);

        this.helper.style.position = 'fixed';
        this.helper.style.top = `${this.boundingClientRect.top - margin.top}px`;
        this.helper.style.left = `${this.boundingClientRect.left - margin.left}px`;
        this.helper.style.width = `${this.width}px`;
        this.helper.style.height = `${this.height}px`;
        this.helper.style.boxSizing = 'border-box';
        this.helper.style.pointerEvents = 'none';

        if (hideSortableGhost) {
          this.sortableGhost = node;
          node.style.visibility = 'hidden';
          node.style.opacity = '0';
        }

        if (this.hub) {
          this.hub.sortStart(this as ContainerRef);
          this.hub.helper = this.helper;
          this.hub.ghost = this.sortableGhost;
        }

        this.intializeOffsets(e, this.boundingClientRect);
        this.offsetEdge = getEdgeOffset(node, this.container);

        if (helperClass) {
          this.helper.classList.add(...helperClass.split(' '));
        }

        this.listenerNode = isTouch(e) ? node : this._window;
        // @ts-ignore
        events.move.forEach((eventName) => this.listenerNode.addEventListener(eventName, this.handleSortMove));
        // @ts-ignore
        events.end.forEach((eventName) => this.listenerNode.addEventListener(eventName, this.handleSortEnd));
        // @ts-ignore
        events.cancel.forEach((eventName) => this.listenerNode.addEventListener(eventName, this.handleSortCancel));

        this.sorting = true;

        this.$emit('sort-start', { event: e, node, index });
      }
    },

    handleSortMove(e: PointEvent) {
      e.preventDefault(); // Prevent scrolling on mobile

      this.updatePosition(e);

      if (this.hub) {
        const payload = this.list[this.index!];
        this.hub.handleSortMove(e, payload);
      }

      if (!this.hub || this.hub.isDest(this as ContainerRef)) {
        this.animateNodes();
        this.autoscroll();
      }

      this.$emit('sort-move', { event: e });
    },

    handleDropOut() {
      const removed = this.list[this.index!];
      const newValue = arrayRemove(this.list, this.index!);
      this.$emit('sort-remove', {
        oldIndex: this.index,
      });
      this.$emit('update:list', newValue);
      return removed;
    },

    handleDropIn(payload: unknown) {
      const newValue = arrayInsert(this.list, this.newIndex!, payload);
      this.$emit('sort-insert', {
        newIndex: this.newIndex,
        value: payload,
      });
      this.$emit('update:list', newValue);
      this.handleDragEnd();
    },

    handleDragOut() {
      if (this.autoscrollInterval) {
        clearInterval(this.autoscrollInterval);
        this.autoscrollInterval = null;
      }
      if (this.hub!.isSource(this as ContainerRef)) {
        // Trick to animate all nodes up
        this.translate = {
          x: 10000,
          y: 10000,
        };
        this.animateNodes();
      } else {
        this.manager.getRefs().forEach((ref) => {
          ref.node.style['transform'] = '';
        });
        this.dragendTimer = timeout(this.handleDragEnd, this.transitionDuration || 0);
      }
    },

    handleDragEnd() {
      if (this.autoscrollInterval) {
        clearInterval(this.autoscrollInterval);
        this.autoscrollInterval = null;
      }

      resetTransform(this.manager.getRefs());
      if (this.sortableGhost) {
        this.sortableGhost.remove();
        this.sortableGhost = null;
      }

      if (this.dragendTimer) {
        clearTimeout(this.dragendTimer);
        this.dragendTimer = null;
      }
      this.manager.active = null;
      this._touched = false;
      this.sorting = false;
    },

    intializeOffsets(e: PointEvent, clientRect: ClientRect) {
      const { useWindowAsScrollContainer, containerBoundingRect, _window } = this;

      this.marginOffset = {
        x: this.margin.left + this.margin.right,
        y: Math.max(this.margin.top, this.margin.bottom),
      };

      this._axis = {
        x: this.axis.indexOf('x') >= 0,
        y: this.axis.indexOf('y') >= 0,
      };

      this.initialOffset = getPointerOffset(e);

      // initialScroll;
      this.initialScroll = {
        top: this.scrollContainer.scrollTop,
        left: this.scrollContainer.scrollLeft,
      };

      // initialWindowScroll;
      this.initialWindowScroll = {
        top: window.pageYOffset,
        left: window.pageXOffset,
      };

      this.translate = { x: 0, y: 0 };
      this.minTranslate = {};
      this.maxTranslate = {};

      if (this._axis.x) {
        this.minTranslate.x =
          (useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - clientRect.left - this.width / 2;
        this.maxTranslate.x =
          (useWindowAsScrollContainer ? _window.innerWidth : containerBoundingRect.left + containerBoundingRect.width) -
          clientRect.left -
          this.width / 2;
      }
      if (this._axis.y) {
        this.minTranslate.y =
          (useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - clientRect.top - this.height / 2;
        this.maxTranslate.y =
          (useWindowAsScrollContainer
            ? _window.innerHeight
            : containerBoundingRect.top + containerBoundingRect.height) -
          clientRect.top -
          this.height / 2;
      }
    },

    handleDragIn(e: PointEvent, sortableGhost: SortableNode, helper: SortableNode) {
      if (this.hub!.isSource(this as ContainerRef)) {
        return;
      }

      if (this.dragendTimer) {
        this.handleDragEnd();
        clearTimeout(this.dragendTimer);
        this.dragendTimer = null;
      }

      const nodes = this.manager.getRefs();
      this.index = nodes.length;
      this.manager.active = { index: this.index };

      const containerBoundingRect = this.container.getBoundingClientRect();
      const helperBoundingRect = helper.getBoundingClientRect();
      this.containerBoundingRect = containerBoundingRect;

      this.sortableGhost = cloneNode(sortableGhost);
      this.container.appendChild(this.sortableGhost);
      const ghostRect = this.sortableGhost.getBoundingClientRect();
      this.boundingClientRect = ghostRect;
      this.margin = getElementMargin(this.sortableGhost);
      this.width = ghostRect.width;
      this.height = ghostRect.height;

      // XY coords of the inserted node, relative to the top-left corner of the container
      this.offsetEdge = getEdgeOffset(this.sortableGhost, this.container);

      this.intializeOffsets(e, ghostRect);

      // Move the initialOffset back to the insertion point of the
      // sortableGhost (end of the list), as if we had started the drag there.
      this.initialOffset.x += ghostRect.x - helperBoundingRect.x;
      this.initialOffset.y += ghostRect.y - helperBoundingRect.y;

      // Turn on dragging
      this.sorting = true;
    },

    handleSortEnd(e: PointEvent | KeyboardEvent) {
      // Remove the event listeners if the node is still in the DOM
      if (this.listenerNode) {
        events.move.forEach((eventName) =>
          // @ts-ignore
          this.listenerNode.removeEventListener(eventName, this.handleSortMove),
        );
        events.end.forEach((eventName) =>
          // @ts-ignore
          this.listenerNode.removeEventListener(eventName, this.handleSortEnd),
        );
        events.cancel.forEach((eventName) =>
          // @ts-ignore
          this.listenerNode.removeEventListener(eventName, this.handleSortCancel),
        );
      }

      const nodes = this.manager.getRefs();

      // Remove the helper class(es) early to give it a chance to transition back
      if (this.helper && this.helperClass) {
        this.helper.classList.remove(...this.helperClass.split(' '));
      }

      // Stop autoscroll
      if (this.autoscrollInterval) clearInterval(this.autoscrollInterval);
      this.autoscrollInterval = null;

      const onEnd = () => {
        // Remove the helper from the DOM
        if (this.helper) {
          this.helper.remove();
          this.helper = null;
        }

        if (this.hideSortableGhost && this.sortableGhost) {
          this.sortableGhost.style.visibility = '';
          this.sortableGhost.style.opacity = '';
        }

        resetTransform(nodes);

        // Update state
        if (this.hub && !this.hub.isDest(this as ContainerRef)) {
          this.canceling ? this.hub.cancel() : this.hub.handleSortEnd();
        } else if (this.canceling) {
          this.$emit('sort-cancel', { event: e });
        } else {
          this.$emit('sort-end', {
            event: e,
            oldIndex: this.index,
            newIndex: this.newIndex,
          });
          this.$emit('update:list', arrayMove(this.list, this.index!, this.newIndex!));
        }

        this.manager.active = null;
        this._touched = false;
        this.canceling = false;
        this.sorting = false;
      };

      if (this.transitionDuration || this.draggedSettlingDuration) {
        this.transitionHelperIntoPlace(nodes, onEnd);
      } else {
        onEnd();
      }
    },

    transitionHelperIntoPlace(nodes: ItemRef[], cb: () => void) {
      if (this.draggedSettlingDuration === 0 || nodes.length === 0 || !this.helper) {
        return Promise.resolve();
      }

      const indexNode = nodes[this.index!].node;
      let targetX = 0;
      let targetY = 0;

      const scrollDifference = {
        top: window.pageYOffset - this.initialWindowScroll.top,
        left: window.pageXOffset - this.initialWindowScroll.left,
      };

      if (this.hub && !this.hub.isDest(this as ContainerRef) && !this.canceling) {
        const dest = this.hub.getDest();
        if (!dest) return;
        const destIndex = dest.newIndex;
        const destRefs = dest.manager.getOrderedRefs();
        const destNode = destIndex < destRefs.length ? destRefs[destIndex].node : dest.sortableGhost!;
        const ancestor = commonOffsetParent(indexNode, destNode)!;

        const sourceOffset = getEdgeOffset(indexNode, ancestor);
        const targetOffset = getEdgeOffset(destNode, ancestor);

        targetX = targetOffset.left - sourceOffset.left - scrollDifference.left;
        targetY = targetOffset.top - sourceOffset.top - scrollDifference.top;
      } else {
        const newIndexNode = nodes[this.newIndex!].node;
        const deltaScroll = {
          left: this.scrollContainer.scrollLeft - this.initialScroll.left + scrollDifference.left,
          top: this.scrollContainer.scrollTop - this.initialScroll.top + scrollDifference.top,
        };
        targetX = -deltaScroll.left;
        if (this.translate && this.translate.x > 0) {
          // Diff against right edge when moving to the right
          targetX +=
            newIndexNode.offsetLeft + newIndexNode.offsetWidth - (indexNode.offsetLeft + indexNode.offsetWidth);
        } else {
          targetX += newIndexNode.offsetLeft - indexNode.offsetLeft;
        }

        targetY = -deltaScroll.top;
        if (this.translate && this.translate.y > 0) {
          // Diff against the bottom edge when moving down
          targetY +=
            newIndexNode.offsetTop + newIndexNode.offsetHeight - (indexNode.offsetTop + indexNode.offsetHeight);
        } else {
          targetY += newIndexNode.offsetTop - indexNode.offsetTop;
        }
      }

      const duration = this.draggedSettlingDuration !== null ? this.draggedSettlingDuration : this.transitionDuration;

      setTransform(this.helper, `translate3d(${targetX}px,${targetY}px, 0)`, `${duration}ms`);

      // Register an event handler to clean up styles when the transition
      // finishes.
      const cleanup = (event: TransitionEvent) => {
        if (!event || event.propertyName === 'transform') {
          clearTimeout(cleanupTimer);
          setTransform(this.helper);
          cb();
        }
      };
      // Force cleanup in case 'transitionend' never fires
      const cleanupTimer = setTimeout(cleanup, duration + 10);
      this.helper.addEventListener('transitionend', cleanup);
    },

    updatePosition(e: PointEvent) {
      const { lockAxis, lockToContainerEdges } = this.$props;

      const offset = getPointerOffset(e);
      const translate = {
        x: offset.x - this.initialOffset.x,
        y: offset.y - this.initialOffset.y,
      };
      // Adjust for window scroll
      translate.y -= window.pageYOffset - this.initialWindowScroll.top;
      translate.x -= window.pageXOffset - this.initialWindowScroll.left;

      this.translate = translate;

      if (lockToContainerEdges) {
        const [minLockOffset, maxLockOffset] = getLockPixelOffsets(this.lockOffset, this.height, this.width);
        const minOffset = {
          x: this.width / 2 - minLockOffset.x,
          y: this.height / 2 - minLockOffset.y,
        };
        const maxOffset = {
          x: this.width / 2 - maxLockOffset.x,
          y: this.height / 2 - maxLockOffset.y,
        };

        if (this.minTranslate.x && this.maxTranslate.x)
          translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
        if (this.minTranslate.y && this.maxTranslate.y)
          translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
      }

      if (lockAxis === 'x') {
        translate.y = 0;
      } else if (lockAxis === 'y') {
        translate.x = 0;
      }

      if (this.helper) {
        this.helper.style['transform'] = `translate3d(${translate.x}px,${translate.y}px, 0)`;
      }
    },

    animateNodes() {
      const { transitionDuration, hideSortableGhost } = this.$props;
      const nodes = this.manager.getOrderedRefs();
      const deltaScroll = {
        left: this.scrollContainer.scrollLeft - this.initialScroll.left,
        top: this.scrollContainer.scrollTop - this.initialScroll.top,
      };
      const sortingOffset = {
        left: this.offsetEdge.left + this.translate.x + deltaScroll.left,
        top: this.offsetEdge.top + this.translate.y + deltaScroll.top,
      };
      const scrollDifference = {
        top: window.pageYOffset - this.initialWindowScroll.top,
        left: window.pageXOffset - this.initialWindowScroll.left,
      };
      this.newIndex = null;

      for (let i = 0, len = nodes.length; i < len; i++) {
        const { node } = nodes[i];
        const index = node.sortableInfo.index;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const offset = {
          width: this.width > width ? width / 2 : this.width / 2,
          height: this.height > height ? height / 2 : this.height / 2,
        };

        const translate = {
          x: 0,
          y: 0,
        };
        let { edgeOffset } = nodes[i];

        // If we haven't cached the node's offsetTop / offsetLeft value
        if (!edgeOffset) {
          nodes[i].edgeOffset = edgeOffset = getEdgeOffset(node, this.container);
        }

        // Get a reference to the next and previous node
        const nextNode = i < nodes.length - 1 && nodes[i + 1];
        const prevNode = i > 0 && nodes[i - 1];

        // Also cache the next node's edge offset if needed.
        // We need this for calculating the animation in a grid setup
        if (nextNode && !nextNode.edgeOffset) {
          nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);
        }

        // If the node is the one we're currently animating, skip it
        if (index === this.index) {
          /*
           * With windowing libraries such as `react-virtualized`, the sortableGhost
           * node may change while scrolling down and then back up (or vice-versa),
           * so we need to update the reference to the new node just to be safe.
           */
          if (hideSortableGhost) {
            this.sortableGhost = node;
            node.style.visibility = 'hidden';
            node.style.opacity = '0';
          }

          continue;
        }

        if (transitionDuration) {
          node.style['transitionDuration'] = `${transitionDuration}ms`;
        }

        if (this._axis.x) {
          if (this._axis.y) {
            // Calculations for a grid setup
            if (
              index < this.index! &&
              ((sortingOffset.left + scrollDifference.left - offset.width <= edgeOffset.left &&
                sortingOffset.top + scrollDifference.top <= edgeOffset.top + offset.height) ||
                sortingOffset.top + scrollDifference.top + offset.height <= edgeOffset.top)
            ) {
              // If the current node is to the left on the same row, or above the node that's being dragged
              // then move it to the right
              translate.x = this.width + this.marginOffset.x;
              if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width && nextNode) {
                // If it moves passed the right bounds, then animate it to the first position of the next row.
                // We just use the offset of the next node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = nextNode.edgeOffset!.left - edgeOffset.left;
                translate.y = nextNode.edgeOffset!.top - edgeOffset.top;
              }
              if (this.newIndex === null) {
                this.newIndex = index;
              }
            } else if (
              index > this.index! &&
              ((sortingOffset.left + scrollDifference.left + offset.width >= edgeOffset.left &&
                sortingOffset.top + scrollDifference.top + offset.height >= edgeOffset.top) ||
                sortingOffset.top + scrollDifference.top + offset.height >= edgeOffset.top + height)
            ) {
              // If the current node is to the right on the same row, or below the node that's being dragged
              // then move it to the left
              translate.x = -(this.width + this.marginOffset.x);
              if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width && prevNode) {
                // If it moves passed the left bounds, then animate it to the last position of the previous row.
                // We just use the offset of the previous node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = prevNode.edgeOffset!.left - edgeOffset.left;
                translate.y = prevNode.edgeOffset!.top - edgeOffset.top;
              }
              this.newIndex = index;
            }
          } else {
            if (index > this.index! && sortingOffset.left + scrollDifference.left + offset.width >= edgeOffset.left) {
              translate.x = -(this.width + this.marginOffset.x);
              this.newIndex = index;
            } else if (
              index < this.index! &&
              sortingOffset.left + scrollDifference.left <= edgeOffset.left + offset.width
            ) {
              translate.x = this.width + this.marginOffset.x;
              if (this.newIndex == null) {
                this.newIndex = index;
              }
            }
          }
        } else if (this._axis.y) {
          if (index > this.index! && sortingOffset.top + scrollDifference.top + offset.height >= edgeOffset.top) {
            translate.y = -(this.height + this.marginOffset.y);
            this.newIndex = index;
          } else if (
            index < this.index! &&
            sortingOffset.top + scrollDifference.top <= edgeOffset.top + offset.height
          ) {
            translate.y = this.height + this.marginOffset.y;
            if (this.newIndex == null) {
              this.newIndex = index;
            }
          }
        }
        node.style['transform'] = `translate3d(${translate.x}px,${translate.y}px,0)`;
      }

      if (this.newIndex == null) {
        this.newIndex = this.index;
      }
    },

    autoscroll() {
      const translate = this.translate;
      const direction = {
        x: 0,
        y: 0,
      };
      const speed = {
        x: 1,
        y: 1,
      };
      const acceleration = {
        x: 10,
        y: 10,
      };

      if (translate.y >= this.maxTranslate.y! - this.height / 2) {
        direction.y = 1; // Scroll Down
        speed.y = acceleration.y * Math.abs((this.maxTranslate.y! - this.height / 2 - translate.y) / this.height);
      } else if (translate.x >= this.maxTranslate.x! - this.width / 2) {
        direction.x = 1; // Scroll Right
        speed.x = acceleration.x * Math.abs((this.maxTranslate.x! - this.width / 2 - translate.x) / this.width);
      } else if (translate.y <= this.minTranslate.y! + this.height / 2) {
        direction.y = -1; // Scroll Up
        speed.y = acceleration.y * Math.abs((translate.y - this.height / 2 - this.minTranslate.y!) / this.height);
      } else if (translate.x <= this.minTranslate.x! + this.width / 2) {
        direction.x = -1; // Scroll Left
        speed.x = acceleration.x * Math.abs((translate.x - this.width / 2 - this.minTranslate.x!) / this.width);
      }

      if (this.autoscrollInterval) {
        clearInterval(this.autoscrollInterval);
        this.autoscrollInterval = null;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        this.autoscrollInterval = window.setInterval(() => {
          const offset = {
            left: 1 * speed.x * direction.x,
            top: 1 * speed.y * direction.y,
          };

          if (this.useWindowAsScrollContainer) {
            this._window.scrollBy(offset.left, offset.top);
          } else {
            this.scrollContainer.scrollTop += offset.top;
            this.scrollContainer.scrollLeft += offset.left;
          }

          this.translate.x += offset.left;
          this.translate.y += offset.top;
          this.animateNodes();
        }, 5);
      }
    },
  },
});
