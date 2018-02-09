import range from 'lodash/range';
import random from 'lodash/random';
let id = 0;

export default function createList(count, variableHeight = false, itemName = 'Item') {
  return range(count).map((value) => {
    return {
      value: itemName + ' ' + (value + 1),
      height: variableHeight ? random(49, 120) : null,
      id: id++
    };
  })
}
