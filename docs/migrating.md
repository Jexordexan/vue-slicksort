# Migrating from V1

Slicksort Version 2 is an overhaul of Version 1 with many awaited features, including sorting between lists! It also comes with some breaking changes.

## Breaking changes

### Vue 3 only

Vue 2 support has been removed for now. We may revisit this later with the [vue-demi](https://github.com/vueuse/vue-demi) library. In order to use v2 of `vue-slicksort` you must upgrade to Vue 3. Apologies for the inconvenience!

### `collection` Removed

The `collection` prop has been removed from the `Element`. This props purpose has been replaced by the `group` prop on the `Container`, which can allow/prevent dragging between lists. This means that any list with elements of different `collections` should be refactored to be a set of lists with different groups. This is a simple example of the transition.

**Before**

```html
<template>
  <SortableList>
    <SortableItem v-for="(item, i) in listA" collection="list-A" />
    <SortableItem v-for="(item, i) in listB" collection="list-B" />
    <SortableItem v-for="(item, i) in listC" collection="list-C" />
  </SortableList>
</template>
```

**After**

```html
<template>
  <SortableList group="list-A">
    <SortableItem v-for="(item, i) in listA" />
  </SortableList>
  <SortableList group="list-B">
    <SortableItem v-for="(item, i) in listB" />
  </SortableList>
  <SortableList group="list-C">
    <SortableItem v-for="(item, i) in listC" />
  </SortableList>
</template>
```

<!--
### `SlickList` and `SlickItem` default tags

We've added the ability to set the `tag` for a SlickList in `v1.2.0`, but the default was still `div`.

Starting in `v2.x.x`, the default HTML tags for `SlickList` and `SlickItem` components are now `ul` & `li`, respectively.

To migrate to v2, do one of the following:

1. Change your styles to expect `ul` and `li`:

```scss
/* Whatever class you have applied to your SlickList components */
ul.list {
  list-style-type: none;
  padding-left: 0;
}

li.list-item {
  list-style-type: none;
}
```

2. Set the `tag` to `div` on the components

```html
<template>
  <SlickList tag="div">
    <SlickItem tag="div" />
  </SlickList>
</template>
``` -->
