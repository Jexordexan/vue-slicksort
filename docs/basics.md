# Basic Use

This is a basic example of a sortable list. `v-model:list` allows data-binding between the list of fruits.

```vue
<template>
  <SlickList axis="y" v-model:list="fruits">
    <SlickItem v-for="(fruit, i) in fruits" :key="fruit" :index="i">
      {{ fruit }}
    </SlickItem>
  </SlickList>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';

export default {
  components: {
    SlickList,
    SlickItem,
  },
  data() {
    return {
      fruits: ['Apples', 'Bananas' /* etc. */],
    };
  },
};
</script>
```

**Try it out!**
<ClientOnly>
<FruitExample />
</ClientOnly>

::: tip
`:key` should refer to unique data, like an ID attribute, that can be used to track the item as it moves. Using the index (`i`) as the key is not advised and may cause unwanted rendering effects.
:::

## Slot Shorthand

If you want build sortable lists quickly, use the `item` scoped slot in the `SlickList` component.
This slot will repeat for each item in the `list` prop. This has to be used with `v-model:list` or the `:list` prop on the container.

```vue
<template>
  <SlickList axis="y" v-model:list="list">
    <!-- Repeated for everything in 'list' -->
    <template #item="{ item }">
      {{ item }}
    </template>
  </SlickList>
</template>
```

<ClientOnly>
  <ShorthandExample />
</ClientOnly>

## Horizontal List

If your lists are layed out along the X axis, pass in the `axis="x"` prop and it will just work!
You will have to handle the actual CSS of making them horizontal, `display: flex` should do the trick.

```html
<SlickList axis="x" v-model:list="fruits">
  <!-- ... -->
</SlickList>
```

<ClientOnly>
	<FruitExample axis="x" />
</ClientOnly>

## Using a drag handle

By default the entire list item is the handle for the drag events. This might be a problem if you have inputs or buttons or other interactive elements within the items. You can use the drag handle mixin to make any element a handle.

```html
<SlickList axis="y" v-model:list="fruits" useDragHandle>
  <SlickItem v-for="(fruit, i) in fruits" :key="fruit" :index="i">
    <DragHandle>
      <Icon name="hamburger" />
    </DragHandle>
    {{ fruit }}
  </SlickItem>
</SlickList>
```

<ClientOnly>
	<FruitExample show-handle />
</ClientOnly>

## Autoscroll

Slicksort will automatically autoscroll within the container if it overflows.

```vue
<template>
  <div>
    <SlickList v-model:list="items" axis="y" class="long-list">
      <SlickItem v-for="(item, index) in items" :key="item" :index="index" :item="item">
        {{ item }}
      </SlickItem>
    </SlickList>
  </div>
</template>

<script>
import { range, random } from 'lodash-es';
import { SlickList, SlickItem } from 'vue-slicksort';

export default {
  components: {
    SlickItem,
    SlickList,
  },
  data() {
    return {
      items: range(100).map((i) => `Item ${i}`),
    };
  },
};
</script>

<style scoped>
.long-list {
  max-height: 300px;
  overflow: auto;
}
</style>
```

<ClientOnly>
  <LongListExample />
</ClientOnly>
