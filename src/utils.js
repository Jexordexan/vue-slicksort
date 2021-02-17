export function arrayMove(arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}

export function arrayRemove(arr, previousIndex) {
  const array = arr.slice(0);
  if (previousIndex >= array.length) return array;
  array.splice(previousIndex, 1);
  return array;
}

export function arrayInsert(arr, newIndex, value) {
  const array = arr.slice(0);
  if (newIndex === array.length) {
    array.push(value);
  } else {
    array.splice(newIndex, 0, value);
  }
  return array;
}

export const events = {
  start: ['touchstart', 'mousedown'],
  move: ['touchmove', 'mousemove'],
  end: ['touchend', 'touchcancel', 'mouseup'],
};

export const vendorPrefix = (function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return ''; // server environment
  // fix for:
  //    https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  //    window.getComputedStyle() returns null inside an iframe with display: none
  // in this case return an array with a fake mozilla style in it.
  const styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
  const pre = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) ||
    (styles.OLink === '' && ['', 'o']))[1];

  switch (pre) {
    case 'ms':
      return 'ms';
    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
  }
})();

export function closest(el, fn) {
  while (el) {
    if (fn(el)) return el;
    el = el.parentNode;
  }
}

export function limit(min, max, value) {
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

export function getElementMargin(element) {
  const style = window.getComputedStyle(element);

  return {
    top: getCSSPixelValue(style.marginTop),
    right: getCSSPixelValue(style.marginRight),
    bottom: getCSSPixelValue(style.marginBottom),
    left: getCSSPixelValue(style.marginLeft),
  };
}

export function getPointerOffset(e, reference = 'page') {
  const x = `${reference}X`;
  const y = `${reference}Y`;
  return {
    x: e.touches ? e.touches[0][x] : e[x],
    y: e.touches ? e.touches[0][y] : e[y],
  };
}

function offsetParents(node) {
  var nodes = [node];
  for (; node; node = node.offsetParent) {
    nodes.unshift(node);
  }
  return nodes;
}

export function commonOffsetParent(node1, node2) {
  var parents1 = offsetParents(node1);
  var parents2 = offsetParents(node2);

  if (parents1[0] != parents2[0]) throw 'No common ancestor!';

  for (var i = 0; i < parents1.length; i++) {
    if (parents1[i] != parents2[i]) return parents1[i - 1];
  }
}

export function getEdgeOffset(node, container, offset = { top: 0, left: 0 }) {
  // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
  if (node) {
    const nodeOffset = {
      top: offset.top + node.offsetTop,
      left: offset.left + node.offsetLeft,
    };
    if (node.offsetParent !== container.offsetParent) {
      return getEdgeOffset(node.offsetParent, container, nodeOffset);
    } else {
      return nodeOffset;
    }
  }
}

export function cloneNode(node) {
  const fields = node.querySelectorAll('input, textarea, select');
  const clonedNode = node.cloneNode(true);
  const clonedFields = [...clonedNode.querySelectorAll('input, textarea, select')]; // Convert NodeList to Array

  clonedFields.forEach((field, index) => {
    if (field.type !== 'file' && fields[index]) {
      field.value = fields[index].value;
    }
  });

  return clonedNode;
}

export function getLockPixelOffsets(lockOffset, width, height) {
  if (!Array.isArray(lockOffset)) {
    lockOffset = [lockOffset, lockOffset];
  }

  if (lockOffset.length !== 2) {
    throw new Error(
      `lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given ${lockOffset}`
    );
  }

  const [minLockOffset, maxLockOffset] = lockOffset;

  return [getLockPixelOffset(minLockOffset, width, height), getLockPixelOffset(maxLockOffset, width, height)];
}

export function getLockPixelOffset(lockOffset, width, height) {
  let offsetX = lockOffset;
  let offsetY = lockOffset;
  let unit = 'px';

  if (typeof lockOffset === 'string') {
    const match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);

    if (match === null) {
      throw new Error(
        `lockOffset value should be a number or a string of a number followed by "px" or "%". Given ${lockOffset}`
      );
    }

    offsetX = offsetY = parseFloat(lockOffset);
    unit = match[1];
  }

  if (!isFinite(offsetX) || !isFinite(offsetY)) {
    throw new Error(`lockOffset value should be a finite. Given ${lockOffset}`);
  }

  if (unit === '%') {
    offsetX = (offsetX * width) / 100;
    offsetY = (offsetY * height) / 100;
  }

  return {
    x: offsetX,
    y: offsetY,
  };
}

export function getDistance(x1, y1, x2, y2) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt(x * x + y * y);
}

export function getRectCenter(clientRect) {
  return {
    x: clientRect.left + clientRect.width / 2,
    y: clientRect.top + clientRect.height / 2,
  };
}

export function resetTransform(nodes = []) {
  for (let i = 0, len = nodes.length; i < len; i++) {
    const node = nodes[i];
    const el = node.node;

    if (!el) return;

    // Clear the cached offsetTop / offsetLeft value
    node.edgeOffset = null;

    // Remove the transforms / transitions
    el.style[`${vendorPrefix}Transform`] = '';
    el.style[`${vendorPrefix}TransitionDuration`] = '';
  }
}

function withinBounds(pos, top, bottom) {
  const upper = Math.max(top, bottom);
  const lower = Math.min(top, bottom);
  return lower <= pos && pos <= upper;
}

export function isPointWithinRect({ x, y }, { top, left, width, height }) {
  const withinX = withinBounds(x, left, left + width);
  const withinY = withinBounds(y, top, top + height);
  return withinX && withinY;
}
