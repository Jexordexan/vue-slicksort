
# `SlickItem` Component

## Props

### `index` _(required)_

type: `number`

**Required**

This is the element's sortableIndex within it's collection. This prop is required.

### `collection`

**REMOVED IN v2.0.0**
Use `group` and multiple scroll containers instead.

See [Migration docs](/migrating-1x.html#collection-removed)

### `disabled`

type: `boolean`

default: `false`

Whether the element should be sortable or not

### `tag`

type: `string`

default: `div`

The HTML tag that will render in the DOM.

## Slots

### `default`

The item content
