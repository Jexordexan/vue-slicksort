export function arrayMove(arr, previousIndex, newIndex, piggyBackIndexes) {

  const array = arr.slice(0);

  if (piggyBackIndexes && piggyBackIndexes.length > 1)
  {    
    //Remove All Selected Items From Array
    var finalIndex = newIndex;
    var moveItems = [];
    for (var i= piggyBackIndexes.length-1; i>=0; i--)
    {
        var index = piggyBackIndexes[i];
        moveItems.push(array[index]);
        array.splice(index, 1);
        if (index < newIndex-1)
        {
          finalIndex--;
        }
    }

    // Insert them back in
    array.splice(finalIndex, 0, ...moveItems.reverse());
  }
  else{
    
      if (newIndex >= array.length) {
        let k = newIndex - array.length;
        while (k-- + 1) {
          array.push(undefined);
        }
      }
      array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
}

return array;

}

export const events = {
  touch: ['touchstart', 'mousedown'],  
  move: ['touchmove', 'mousemove'],
  release: ['touchend', 'touchcancel', 'mouseup']  
};

export const vendorPrefix = (function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return ''; // server environment
  // fix for:
  //    https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  //    window.getComputedStyle() returns null inside an iframe with display: none
  // in this case return an array with a fake mozilla style in it.
  const styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
  const pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

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

export function findChildTagByClass(el, className) {
    
    if (el.className && el.className.indexOf(className) != -1)
    {
      return el;
    }
    else{     
      for (var i = 0; i < el.childNodes.length; i++)
      {
        var childElement = el.childNodes[i];
        var match = findChildTagByClass(childElement, className);
        if (match) { return match;}
      }      
      return null;
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
