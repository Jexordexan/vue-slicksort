
# Drag and drop

New in V2, you can now drag items between lists!

In order to enabled drag-and-drop, you need to install the Slicksort plugin. Instructions are on the [Getting started](/getting-started.html#using-the-plugin) page.

Every list that you want to drag between then needs the `group` prop to be set. If all lists have the same "group", they will allow dragging between all lists. If using different groups, you can use the `accept` prop to allow a set of other groups that can be dragged into the list.

```html
<SlickList v-model:list="fruits" group="produce">
  <!-- ... -->
</SlickList>

<SlickList v-model:list="veggies" group="produce">
  <!-- ... -->
</SlickList>

<SlickList v-model:list="shoppingList" group="groceries" :accept="['produce']">
  <!-- ... -->
</SlickList>
```

## Between the same group

<ClientOnly>
  <SimpleGroupExample />
</ClientOnly>

## Between different groups

In the example below, three lists have different groups and `accept` props.

<ClientOnly>
  <GroupExample />
</ClientOnly>
