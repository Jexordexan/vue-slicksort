## `SlickList` Component

### Props

- #### `list`

  type: `any[]`

  **Required**

  The `list` can be inherited from `v-model:list` but has to be set to the same list that is rendered with `v-for` inside the `SlickList`.

- #### `group`

  type: `string`

  The group that this list belongs to. By default, the group is not set and items cannot be dragged in or out of the list. When the group is set, all lists in that group can drag between each other.

  ::: warning
  Setting the `group` prop requires the `Slicksort` vue plugin to be installed in your app.
  :::

- #### `accept`

  type: `true | string[] | ({ source, dest, payload }) => boolean`

  default: `[]`

  The groups that can be dragged into this container. If `true`, the list will accept items from all other lists. If `string[]`, the list will accept groups listed. If a function is passed, it should return a boolean, where `true` means the item is acceptable. The function will be called with a context object with the following properties:

  - `source`: The drag source component, with properties like `group`, `list`, and others
  - `dest`: The drag destination component, with the same properties as the `source`
  - `payload`: the data value of the item that is being dragged

- #### `block`

  type: `string[]`

  default: `[]`

  Allows you to block specific groups. This will override `accept: true`, to allow all but a few groups.

- #### `axis`

  type: `string`

  default: `y`

  Items can be sorted horizontally, vertically or in a grid. Possible values: `x`, `y` or `xy`

- #### `lockAxis`

  type: `string`

  If you'd like, you can lock movement to an axis while sorting. This is not something that is possible with HTML5 Drag & Drop

- #### `helperClass`

  type: `string`

  You can provide a class you'd like to add to the sortable helper to add some styles to it

- #### `appendTo`

  type: `string` (Query selector)

  default: `body`

  This is the element that the sortable helper is added to when sorting begins. You would change this if you would like to encapsulate the drag helper within a positioned or scrolled container.

- #### `transitionDuration`

  type: `number`

  default: `300`

  The duration of the transition when elements shift positions. Set this to `0` if you'd like to disable transitions

- #### `draggedSettlingDuration`

  type: `number`

  default: `transitionDuration`

  Override the settling duration for the drag helper. If not set, `transitionDuration` will be used.

- #### `pressDelay`

  type: `number`

  default: `0`

  If you'd like elements to only become sortable after being pressed for a certain time, change this property. A good sensible default value for mobile is `200`. Cannot be used in conjunction with the `distance` prop.

- #### `pressThreshold`

  type: `number`

  default: `5`

  Number of pixels of movement to tolerate before ignoring a press event.

- #### `distance`

  type: `number`

  default: `0`

  If you'd like elements to only become sortable after being dragged a certain number of pixels. Cannot be used in conjunction with the `pressDelay` prop.

- #### `useDragHandle`

  type: `boolean`

  default: `false`

  If you're using the `HandleDirective`, set this to `true`

- #### `useWindowAsScrollContainer`

  type: `boolean`

  default: `false`

  If you want, you can set the `window` as the scrolling container

- #### `hideSortableGhost`

  type: `boolean`

  default: `true`

  Whether to auto-hide the ghost element. By default, as a convenience, Vue Slicksort List will automatically hide the element that is currently being sorted. Set this to false if you would like to apply your own styling.

- #### `lockToContainerEdges`

  type: `boolean`

  default: `false`

  You can lock movement of the sortable element to it's parent `Container`

- #### `lockOffset`

  type: _`OffsetValue` or [ `OffsetValue`, `OffsetValue` ]_\*

  default: `"50%"`

  When `lockToContainerEdges` is set to `true`, this controls the offset distance between the sortable helper and the top/bottom edges of it's parent `Container`. Percentage values are relative to the height of the item currently being sorted. If you wish to specify different behaviours for locking to the _top_ of the container vs the _bottom_, you may also pass in an `array` (For example: `["0%", "100%"]`).

  \* `OffsetValue` can either be a finite `Number` or a `String` made up of a number and a unit (`px` or `%`).
  Examples: `10` (which is the same as `"10px"`), `"50%"`

- #### `shouldCancelStart`

  type: _Function_

  default: [Function](https://github.com/Jexordexan/vue-slicksort/blob/master/src/ContainerMixin.js#L41)

  This function is invoked before sorting begins, and can be used to programatically cancel sorting before it begins. By default, it will cancel sorting if the event target is either an `input`, `textarea`, `select` or `option`.

- #### `getHelperDimensions`

  type: _Function_

  default: [Function](https://github.com/Jexordexan/vue-slicksort/blob/master/src/ContainerMixin.js#L49)

  Optional `function({node, index})` that should return the computed dimensions of the SortableHelper. See [default implementation](https://github.com/Jexordexan/vue-slicksort/blob/master/src/ContainerMixin.js#L49) for more details

### Events

Events are emitted from the Container element, and can be bound to using `v-bind` or `@` directives

- #### `@sort-start`

  emits: `{ event: MouseEvent, node: HTMLElement, index: number }`

  Fired when sorting begins.

- #### `@sort-move`

  emits: `{ event }`

  Fired when the mouse is moved during sorting.

- #### `@sort-end`

  emits: `{ event, newIndex, oldIndex }`

  Fired when sorting has ended.

- #### `@sort-insert`

  emits: `{ newIndex, value }`

  Fired when an item is dragged from another list into this one

- #### `@sort-remove`

  emits: `{ oldIndex }`

  Fired when an item is dragged from this list and dropped in another

- #### `@update:list`

  emits: `Array`

  Fired after sorting has ended with the newly sorted list. This is compatible with `v-model:list`.

### Slots

- #### `default`

  scope: `none`

  The Your list of `SlickItems` goes here

- #### `item` (scoped)

  scope: `{ item }`

  This is a scoped slot that will repeat for every item in `list`. This should be used in place of the `default` slot for making easier sortable list.

## `SlickItem` Component

### Props

- #### `index` _(required)_

  type: `number`

  **Required**

  This is the element's sortableIndex within it's collection. This prop is required.

- #### `collection`

  **REMOVED IN v2.0.0**
  Use `group` and multiple scroll containers instead.

  See [Migration docs](/migrating.html#collection-removed)

- #### `disabled`

  type: `boolean`

  default: `false`

  Whether the element should be sortable or not

### Slots

- #### `default`

  The item content
