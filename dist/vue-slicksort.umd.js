(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueSlicksort = {})));
}(this, (function (exports) { 'use strict';

// Export Sortable Element Component Mixin
var ElementMixin = {
  inject: ['manager'],
  props: {
    index: {
      type: Number,
      required: true
    },
    collection: {
      type: [String, Number],
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  mounted: function mounted() {
    var _$props = this.$props,
        collection = _$props.collection,
        disabled = _$props.disabled,
        index = _$props.index;


    if (!disabled) {
      this.setDraggable(collection, index);
    }
  },


  watch: {
    index: function index(newIndex) {
      if (this.$el && this.$el.sortableInfo) {
        this.$el.sortableInfo.index = newIndex;
      }
    },
    disabled: function disabled(isDisabled) {
      if (isDisabled) {
        this.removeDraggable(this.collection);
      } else {
        this.setDraggable(this.collection, this.index);
      }
    },
    collection: function collection(newCollection, oldCollection) {
      this.removeDraggable(oldCollection);
      this.setDraggable(newCollection, this.index);
    }
  },

  beforeDestroy: function beforeDestroy() {
    var collection = this.collection,
        disabled = this.disabled;


    if (!disabled) this.removeDraggable(collection);
  },

  methods: {
    setDraggable: function setDraggable(collection, index) {
      var node = this.$el;

      node.sortableInfo = {
        index: index,
        collection: collection,
        manager: this.manager
      };

      this.ref = { node: node };
      this.manager.add(collection, this.ref);
    },
    removeDraggable: function removeDraggable(collection) {
      this.manager.remove(collection, this.ref);
    }
  }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Manager = function () {
  function Manager() {
    classCallCheck(this, Manager);

    this.refs = {};
  }

  createClass(Manager, [{
    key: "add",
    value: function add(collection, ref) {
      if (!this.refs[collection]) {
        this.refs[collection] = [];
      }

      this.refs[collection].push(ref);
    }
  }, {
    key: "remove",
    value: function remove(collection, ref) {
      var index = this.getIndex(collection, ref);

      if (index !== -1) {
        this.refs[collection].splice(index, 1);
      }
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "getActive",
    value: function getActive() {
      var _this = this;

      return this.refs[this.active.collection].find(function (_ref) {
        var node = _ref.node;
        return node.sortableInfo.index == _this.active.index;
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex(collection, ref) {
      return this.refs[collection].indexOf(ref);
    }
  }, {
    key: "getOrderedRefs",
    value: function getOrderedRefs() {
      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.active.collection;

      return this.refs[collection].sort(function (a, b) {
        return a.node.sortableInfo.index - b.node.sortableInfo.index;
      });
    }
  }]);
  return Manager;
}();

function arrayMove(arr, previousIndex, newIndex) {
  var array = arr.slice(0);
  if (newIndex >= array.length) {
    var k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}

var events = {
  start: ['touchstart', 'mousedown'],
  move: ['touchmove', 'mousemove'],
  end: ['touchend', 'touchcancel', 'mouseup']
};

var vendorPrefix = function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return ''; // server environment
  // fix for:
  //    https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  //    window.getComputedStyle() returns null inside an iframe with display: none
  // in this case return an array with a fake mozilla style in it.
  var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

  switch (pre) {
    case 'ms':
      return 'ms';
    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
  }
}();

function closest(el, fn) {
  while (el) {
    if (fn(el)) return el;
    el = el.parentNode;
  }
}

function limit(min, max, value) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function getCSSPixelValue(stringValue) {
  if (stringValue.substr(-2) === 'px') {
    return parseFloat(stringValue);
  }
  return 0;
}

function getElementMargin(element) {
  var style = window.getComputedStyle(element);

  return {
    top: getCSSPixelValue(style.marginTop),
    right: getCSSPixelValue(style.marginRight),
    bottom: getCSSPixelValue(style.marginBottom),
    left: getCSSPixelValue(style.marginLeft)
  };
}

// Export Sortable Container Component Mixin
var ContainerMixin = {
  data: function data() {
    return {
      sorting: false,
      sortingIndex: null,
      manager: new Manager(),
      events: {
        start: this.handleStart,
        move: this.handleMove,
        end: this.handleEnd
      }
    };
  },


  props: {
    value: { type: Array, required: true },
    axis: { type: String, default: 'y' }, // 'x', 'y', 'xy'
    distance: { type: Number, default: 0 },
    pressDelay: { type: Number, default: 0 },
    pressThreshold: { type: Number, default: 5 },
    useDragHandle: { type: Boolean, default: false },
    useWindowAsScrollContainer: { type: Boolean, default: false },
    hideSortableGhost: { type: Boolean, default: true },
    appendHelperToContainer: { type: Boolean, default: false },
    lockToContainerEdges: { type: Boolean, default: false },
    lockOffset: { type: [String, Number, Array], default: '50%' },
    transitionDuration: { type: Number, default: 300 },
    lockAxis: String,
    helperClass: String,
    contentWindow: Object,
    shouldCancelStart: {
      type: Function,
      default: function _default(e) {
        // Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
        var disabledElements = ['input', 'textarea', 'select', 'option', 'button'];
        return disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1;
      }
    },
    getHelperDimensions: {
      type: Function,
      default: function _default(_ref) {
        var node = _ref.node;
        return {
          width: node.offsetWidth,
          height: node.offsetHeight
        };
      }
    }
  },

  provide: function provide() {
    return {
      manager: this.manager
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.container = this.$el;
    this.document = this.container.ownerDocument || document;
    this._window = this.contentWindow || window;
    this.scrollContainer = this.useWindowAsScrollContainer ? this.document.body : this.container;

    var _loop = function _loop(key) {
      if (_this.events.hasOwnProperty(key)) {
        events[key].forEach(function (eventName) {
          return _this.container.addEventListener(eventName, _this.events[key], false);
        });
      }
    };

    for (var key in this.events) {
      _loop(key);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var _this2 = this;

    var _loop2 = function _loop2(key) {
      if (_this2.events.hasOwnProperty(key)) {
        events[key].forEach(function (eventName) {
          return _this2.container.removeEventListener(eventName, _this2.events[key]);
        });
      }
    };

    for (var key in this.events) {
      _loop2(key);
    }
  },


  methods: {
    handleStart: function handleStart(e) {
      var _this3 = this;

      var _$props = this.$props,
          distance = _$props.distance,
          shouldCancelStart = _$props.shouldCancelStart;


      if (e.button === 2 || shouldCancelStart(e)) {
        return false;
      }

      this._touched = true;
      this._pos = {
        x: e.pageX,
        y: e.pageY
      };

      var node = closest(e.target, function (el) {
        return el.sortableInfo != null;
      });

      if (node && node.sortableInfo && this.nodeIsChild(node) && !this.sorting) {
        var useDragHandle = this.$props.useDragHandle;
        var _node$sortableInfo = node.sortableInfo,
            index = _node$sortableInfo.index,
            collection = _node$sortableInfo.collection;


        if (useDragHandle && !closest(e.target, function (el) {
          return el.sortableHandle != null;
        })) return;

        this.manager.active = { index: index, collection: collection };

        /*
        * Fixes a bug in Firefox where the :active state of anchor tags
        * prevent subsequent 'mousemove' events from being fired
        * (see https://github.com/clauderic/react-sortable-hoc/issues/118)
        */
        if (e.target.tagName.toLowerCase() === 'a') {
          e.preventDefault();
        }

        if (!distance) {
          if (this.$props.pressDelay === 0) {
            this.handlePress(e);
          } else {
            this.pressTimer = setTimeout(function () {
              return _this3.handlePress(e);
            }, this.$props.pressDelay);
          }
        }
      }
    },
    nodeIsChild: function nodeIsChild(node) {
      return node.sortableInfo.manager === this.manager;
    },
    handleMove: function handleMove(e) {
      var _$props2 = this.$props,
          distance = _$props2.distance,
          pressThreshold = _$props2.pressThreshold;


      if (!this.sorting && this._touched) {
        this._delta = {
          x: this._pos.x - e.pageX,
          y: this._pos.y - e.pageY
        };
        var delta = Math.abs(this._delta.x) + Math.abs(this._delta.y);

        if (!distance && (!pressThreshold || pressThreshold && delta >= pressThreshold)) {
          clearTimeout(this.cancelTimer);
          this.cancelTimer = setTimeout(this.cancel, 0);
        } else if (distance && delta >= distance && this.manager.isActive()) {
          this.handlePress(e);
        }
      }
    },
    handleEnd: function handleEnd() {
      var distance = this.$props.distance;


      this._touched = false;

      if (!distance) {
        this.cancel();
      }
    },
    cancel: function cancel() {
      if (!this.sorting) {
        clearTimeout(this.pressTimer);
        this.manager.active = null;
      }
    },
    handlePress: function handlePress(e) {
      var _this4 = this;

      var active = this.manager.getActive();

      if (active) {
        var _$props3 = this.$props,
            axis = _$props3.axis,
            getHelperDimensions = _$props3.getHelperDimensions,
            helperClass = _$props3.helperClass,
            hideSortableGhost = _$props3.hideSortableGhost,
            useWindowAsScrollContainer = _$props3.useWindowAsScrollContainer;
        var node = active.node,
            collection = active.collection;
        var index = node.sortableInfo.index;

        var margin = getElementMargin(node);

        var containerBoundingRect = this.container.getBoundingClientRect();
        var dimensions = getHelperDimensions({ index: index, node: node, collection: collection });

        this.node = node;
        this.margin = margin;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.marginOffset = {
          x: this.margin.left + this.margin.right,
          y: Math.max(this.margin.top, this.margin.bottom)
        };
        this.boundingClientRect = node.getBoundingClientRect();
        this.containerBoundingRect = containerBoundingRect;
        this.index = index;
        this.newIndex = index;

        this._axis = {
          x: axis.indexOf('x') >= 0,
          y: axis.indexOf('y') >= 0
        };
        this.offsetEdge = this.getEdgeOffset(node);
        this.initialOffset = this.getOffset(e);
        this.initialScroll = {
          top: this.scrollContainer.scrollTop,
          left: this.scrollContainer.scrollLeft
        };

        this.initialWindowScroll = {
          top: window.pageYOffset,
          left: window.pageXOffset
        };

        var fields = node.querySelectorAll('input, textarea, select');
        var clonedNode = node.cloneNode(true);
        var clonedFields = [].concat(toConsumableArray(clonedNode.querySelectorAll('input, textarea, select'))); // Convert NodeList to Array

        clonedFields.forEach(function (field, index) {
          if (field.type !== 'file' && fields[index]) {
            field.value = fields[index].value;
          }
        });

        if (this.appendHelperToContainer) {
          this.helper = this.container.appendChild(clonedNode);
        } else {
          this.helper = this.document.body.appendChild(clonedNode);
        }

        this.helper.style.position = 'fixed';
        this.helper.style.top = this.boundingClientRect.top - margin.top + 'px';
        this.helper.style.left = this.boundingClientRect.left - margin.left + 'px';
        this.helper.style.width = this.width + 'px';
        this.helper.style.height = this.height + 'px';
        this.helper.style.boxSizing = 'border-box';
        this.helper.style.pointerEvents = 'none';

        if (hideSortableGhost) {
          this.sortableGhost = node;
          node.style.visibility = 'hidden';
          node.style.opacity = 0;
        }

        this.minTranslate = {};
        this.maxTranslate = {};
        if (this._axis.x) {
          this.minTranslate.x = (useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - this.boundingClientRect.left - this.width / 2;
          this.maxTranslate.x = (useWindowAsScrollContainer ? this._window.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - this.boundingClientRect.left - this.width / 2;
        }
        if (this._axis.y) {
          this.minTranslate.y = (useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - this.boundingClientRect.top - this.height / 2;
          this.maxTranslate.y = (useWindowAsScrollContainer ? this._window.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - this.boundingClientRect.top - this.height / 2;
        }

        if (helperClass) {
          var _helper$classList;

          (_helper$classList = this.helper.classList).add.apply(_helper$classList, toConsumableArray(helperClass.split(' ')));
        }

        this.listenerNode = e.touches ? node : this._window;
        events.move.forEach(function (eventName) {
          return _this4.listenerNode.addEventListener(eventName, _this4.handleSortMove, false);
        });
        events.end.forEach(function (eventName) {
          return _this4.listenerNode.addEventListener(eventName, _this4.handleSortEnd, false);
        });

        this.sorting = true;
        this.sortingIndex = index;

        this.$emit('sort-start', { event: e, node: node, index: index, collection: collection });
      }
    },
    handleSortMove: function handleSortMove(e) {
      e.preventDefault(); // Prevent scrolling on mobile

      this.updatePosition(e);
      this.animateNodes();
      this.autoscroll();

      this.$emit('sort-move', { event: e });
    },
    handleSortEnd: function handleSortEnd(e) {
      var _this5 = this;

      var collection = this.manager.active.collection;

      // Remove the event listeners if the node is still in the DOM

      if (this.listenerNode) {
        events.move.forEach(function (eventName) {
          return _this5.listenerNode.removeEventListener(eventName, _this5.handleSortMove);
        });
        events.end.forEach(function (eventName) {
          return _this5.listenerNode.removeEventListener(eventName, _this5.handleSortEnd);
        });
      }

      // Remove the helper from the DOM
      this.helper.parentNode.removeChild(this.helper);

      if (this.hideSortableGhost && this.sortableGhost) {
        this.sortableGhost.style.visibility = '';
        this.sortableGhost.style.opacity = '';
      }

      var nodes = this.manager.refs[collection];
      for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i];
        var el = node.node;

        // Clear the cached offsetTop / offsetLeft value
        node.edgeOffset = null;

        // Remove the transforms / transitions
        el.style[vendorPrefix + 'Transform'] = '';
        el.style[vendorPrefix + 'TransitionDuration'] = '';
      }

      // Stop autoscroll
      clearInterval(this.autoscrollInterval);
      this.autoscrollInterval = null;

      // Update state
      this.manager.active = null;

      this.sorting = false;
      this.sortingIndex = null;

      this.$emit('sort-end', {
        event: e,
        oldIndex: this.index,
        newIndex: this.newIndex,
        collection: collection
      });
      this.$emit('input', arrayMove(this.value, this.index, this.newIndex));

      this._touched = false;
    },
    getEdgeOffset: function getEdgeOffset(node) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { top: 0, left: 0 };

      // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
      if (node) {
        var nodeOffset = {
          top: offset.top + node.offsetTop,
          left: offset.left + node.offsetLeft
        };
        if (node.parentNode !== this.container) {
          return this.getEdgeOffset(node.parentNode, nodeOffset);
        } else {
          return nodeOffset;
        }
      }
    },
    getOffset: function getOffset(e) {
      return {
        x: e.touches ? e.touches[0].pageX : e.pageX,
        y: e.touches ? e.touches[0].pageY : e.pageY
      };
    },
    getLockPixelOffsets: function getLockPixelOffsets() {
      var lockOffset = this.$props.lockOffset;


      if (!Array.isArray(this.lockOffset)) {
        lockOffset = [lockOffset, lockOffset];
      }

      if (lockOffset.length !== 2) {
        throw new Error('lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given ' + lockOffset);
      }

      var _lockOffset = lockOffset,
          _lockOffset2 = slicedToArray(_lockOffset, 2),
          minLockOffset = _lockOffset2[0],
          maxLockOffset = _lockOffset2[1];

      return [this.getLockPixelOffset(minLockOffset), this.getLockPixelOffset(maxLockOffset)];
    },
    getLockPixelOffset: function getLockPixelOffset(lockOffset) {
      var offsetX = lockOffset;
      var offsetY = lockOffset;
      var unit = 'px';

      if (typeof lockOffset === 'string') {
        var match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);

        if (match === null) {
          throw new Error('lockOffset value should be a number or a string of a number followed by "px" or "%". Given ' + lockOffset);
        }

        offsetX = offsetY = parseFloat(lockOffset);
        unit = match[1];
      }

      if (!isFinite(offsetX) || !isFinite(offsetY)) {
        throw new Error('lockOffset value should be a finite. Given ' + lockOffset);
      }

      if (unit === '%') {
        offsetX = offsetX * this.width / 100;
        offsetY = offsetY * this.height / 100;
      }

      return {
        x: offsetX,
        y: offsetY
      };
    },
    updatePosition: function updatePosition(e) {
      var _$props4 = this.$props,
          lockAxis = _$props4.lockAxis,
          lockToContainerEdges = _$props4.lockToContainerEdges;


      var offset = this.getOffset(e);
      var translate = {
        x: offset.x - this.initialOffset.x,
        y: offset.y - this.initialOffset.y
      };
      // Adjust for window scroll
      translate.y -= window.pageYOffset - this.initialWindowScroll.top;
      translate.x -= window.pageXOffset - this.initialWindowScroll.left;

      this.translate = translate;

      if (lockToContainerEdges) {
        var _getLockPixelOffsets = this.getLockPixelOffsets(),
            _getLockPixelOffsets2 = slicedToArray(_getLockPixelOffsets, 2),
            minLockOffset = _getLockPixelOffsets2[0],
            maxLockOffset = _getLockPixelOffsets2[1];

        var minOffset = {
          x: this.width / 2 - minLockOffset.x,
          y: this.height / 2 - minLockOffset.y
        };
        var maxOffset = {
          x: this.width / 2 - maxLockOffset.x,
          y: this.height / 2 - maxLockOffset.y
        };

        translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
        translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
      }

      if (lockAxis === 'x') {
        translate.y = 0;
      } else if (lockAxis === 'y') {
        translate.x = 0;
      }

      this.helper.style[vendorPrefix + 'Transform'] = 'translate3d(' + translate.x + 'px,' + translate.y + 'px, 0)';
    },
    animateNodes: function animateNodes() {
      var _$props5 = this.$props,
          transitionDuration = _$props5.transitionDuration,
          hideSortableGhost = _$props5.hideSortableGhost;

      var nodes = this.manager.getOrderedRefs();
      var deltaScroll = {
        left: this.scrollContainer.scrollLeft - this.initialScroll.left,
        top: this.scrollContainer.scrollTop - this.initialScroll.top
      };
      var sortingOffset = {
        left: this.offsetEdge.left + this.translate.x + deltaScroll.left,
        top: this.offsetEdge.top + this.translate.y + deltaScroll.top
      };
      var scrollDifference = {
        top: window.pageYOffset - this.initialWindowScroll.top,
        left: window.pageXOffset - this.initialWindowScroll.left
      };
      this.newIndex = null;

      for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i].node;

        var index = node.sortableInfo.index;
        var width = node.offsetWidth;
        var height = node.offsetHeight;
        var offset = {
          width: this.width > width ? width / 2 : this.width / 2,
          height: this.height > height ? height / 2 : this.height / 2
        };

        var translate = {
          x: 0,
          y: 0
        };
        var edgeOffset = nodes[i].edgeOffset;

        // If we haven't cached the node's offsetTop / offsetLeft value

        if (!edgeOffset) {
          nodes[i].edgeOffset = edgeOffset = this.getEdgeOffset(node);
        }

        // Get a reference to the next and previous node
        var nextNode = i < nodes.length - 1 && nodes[i + 1];
        var prevNode = i > 0 && nodes[i - 1];

        // Also cache the next node's edge offset if needed.
        // We need this for calculating the animation in a grid setup
        if (nextNode && !nextNode.edgeOffset) {
          nextNode.edgeOffset = this.getEdgeOffset(nextNode.node);
        }

        // If the node is the one we're currently animating, skip it
        if (index === this.index) {
          if (hideSortableGhost) {
            /*
            * With windowing libraries such as `react-virtualized`, the sortableGhost
            * node may change while scrolling down and then back up (or vice-versa),
            * so we need to update the reference to the new node just to be safe.
            */
            this.sortableGhost = node;
            node.style.visibility = 'hidden';
            node.style.opacity = 0;
          }
          continue;
        }

        if (transitionDuration) {
          node.style[vendorPrefix + 'TransitionDuration'] = transitionDuration + 'ms';
        }

        if (this._axis.x) {
          if (this._axis.y) {
            // Calculations for a grid setup
            if (index < this.index && (sortingOffset.left + scrollDifference.left - offset.width <= edgeOffset.left && sortingOffset.top + scrollDifference.top <= edgeOffset.top + offset.height || sortingOffset.top + scrollDifference.top + offset.height <= edgeOffset.top)) {
              // If the current node is to the left on the same row, or above the node that's being dragged
              // then move it to the right
              translate.x = this.width + this.marginOffset.x;
              if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width) {
                // If it moves passed the right bounds, then animate it to the first position of the next row.
                // We just use the offset of the next node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                translate.y = nextNode.edgeOffset.top - edgeOffset.top;
              }
              if (this.newIndex === null) {
                this.newIndex = index;
              }
            } else if (index > this.index && (sortingOffset.left + scrollDifference.left + offset.width >= edgeOffset.left && sortingOffset.top + scrollDifference.top + offset.height >= edgeOffset.top || sortingOffset.top + scrollDifference.top + offset.height >= edgeOffset.top + height)) {
              // If the current node is to the right on the same row, or below the node that's being dragged
              // then move it to the left
              translate.x = -(this.width + this.marginOffset.x);
              if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width) {
                // If it moves passed the left bounds, then animate it to the last position of the previous row.
                // We just use the offset of the previous node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                translate.y = prevNode.edgeOffset.top - edgeOffset.top;
              }
              this.newIndex = index;
            }
          } else {
            if (index > this.index && sortingOffset.left + scrollDifference.left + offset.width >= edgeOffset.left) {
              translate.x = -(this.width + this.marginOffset.x);
              this.newIndex = index;
            } else if (index < this.index && sortingOffset.left + scrollDifference.left <= edgeOffset.left + offset.width) {
              translate.x = this.width + this.marginOffset.x;
              if (this.newIndex == null) {
                this.newIndex = index;
              }
            }
          }
        } else if (this._axis.y) {
          if (index > this.index && sortingOffset.top + scrollDifference.top + offset.height >= edgeOffset.top) {
            translate.y = -(this.height + this.marginOffset.y);
            this.newIndex = index;
          } else if (index < this.index && sortingOffset.top + scrollDifference.top <= edgeOffset.top + offset.height) {
            translate.y = this.height + this.marginOffset.y;
            if (this.newIndex == null) {
              this.newIndex = index;
            }
          }
        }
        node.style[vendorPrefix + 'Transform'] = 'translate3d(' + translate.x + 'px,' + translate.y + 'px,0)';
      }

      if (this.newIndex == null) {
        this.newIndex = this.index;
      }
    },
    autoscroll: function autoscroll() {
      var _this6 = this;

      var translate = this.translate;
      var direction = {
        x: 0,
        y: 0
      };
      var speed = {
        x: 1,
        y: 1
      };
      var acceleration = {
        x: 10,
        y: 10
      };

      if (translate.y >= this.maxTranslate.y - this.height / 2) {
        direction.y = 1; // Scroll Down
        speed.y = acceleration.y * Math.abs((this.maxTranslate.y - this.height / 2 - translate.y) / this.height);
      } else if (translate.x >= this.maxTranslate.x - this.width / 2) {
        direction.x = 1; // Scroll Right
        speed.x = acceleration.x * Math.abs((this.maxTranslate.x - this.width / 2 - translate.x) / this.width);
      } else if (translate.y <= this.minTranslate.y + this.height / 2) {
        direction.y = -1; // Scroll Up
        speed.y = acceleration.y * Math.abs((translate.y - this.height / 2 - this.minTranslate.y) / this.height);
      } else if (translate.x <= this.minTranslate.x + this.width / 2) {
        direction.x = -1; // Scroll Left
        speed.x = acceleration.x * Math.abs((translate.x - this.width / 2 - this.minTranslate.x) / this.width);
      }

      if (this.autoscrollInterval) {
        clearInterval(this.autoscrollInterval);
        this.autoscrollInterval = null;
        this.isAutoScrolling = false;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        this.autoscrollInterval = setInterval(function () {
          _this6.isAutoScrolling = true;
          var offset = {
            left: 1 * speed.x * direction.x,
            top: 1 * speed.y * direction.y
          };
          _this6.scrollContainer.scrollTop += offset.top;
          _this6.scrollContainer.scrollLeft += offset.left;
          _this6.translate.x += offset.left;
          _this6.translate.y += offset.top;
          _this6.animateNodes();
        }, 5);
      }
    }
  }
};

// Export Sortable Element Handle Directive
var HandleDirective = {
  bind: function bind(el) {
    el.sortableHandle = true;
  }
};

var SlickList = {
  name: 'slick-list',
  mixins: [ContainerMixin],
  render: function render(h) {
    return h('div', this.$slots.default);
  }
};

var SlickItem = {
  name: 'slick-item',
  mixins: [ElementMixin],
  render: function render(h) {
    return h('div', this.$slots.default);
  }
};

exports.ElementMixin = ElementMixin;
exports.ContainerMixin = ContainerMixin;
exports.HandleDirective = HandleDirective;
exports.SlickList = SlickList;
exports.SlickItem = SlickItem;
exports.arrayMove = arrayMove;

Object.defineProperty(exports, '__esModule', { value: true });

})));
