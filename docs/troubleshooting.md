# Troubleshooting

## FAQ

### Items re-render after sort

You need to use the `:key` attribute on every list item, and it needs to be unique to the object you are displaying, like an `id`. Using `index` can lead to re-rendered lists because the index changes when sorting

✅ **GOOD**

```html
<SlickItem v-for="(item, i) in list" :key="item.id" :index="i"></SlickItem>
```

❌ **BAD**

```html
<SlickItem v-for="(item, i) in list" :key="i" :index="i"></SlickItem>
```

### Use with `transition-group`

Slicksort is not compatible with `transition-group` because they both try to animate the positions of the nodes. Once the drag is done and the `list` is updated, `transition-group` then tries to animate everything again.

### Drag helper is unstyled

Since the drag helper is appended to the `body`, any scoped styles will not apply. This could be the situation if your css relies on:

- `<style scoped>`
- `<style module>`
- nested selectors

To fix it, either make the CSS for the list items global, or set the `appendTo` prop to the closest container where the styles are applied.

### Click events being swallowed

By default, `vue-slicksort` is triggered immediately on `mousedown`. If you'd like to prevent this behaviour, there are a number of strategies readily available. You can use the `distance` prop to set a minimum distance (in pixels) to be dragged before sorting is enabled. You can also use the `pressDelay` prop to add a delay before sorting is enabled. Alternatively, you can also use the [HandleDirective](https://github.com/Jexordexan/vue-slicksort/blob/master/src/HandleDirective.js).

### `v-model` is not working

First, make sure your "model" is bound to `v-model:list`. SlickSort never modifies the `list` prop, it will just emit a new copy of the array with the changes applied. `v-model` will then replace the old reference with the new one. Your list must be a `ref` or be set in `data()`. Using `reactive()` is not advised because it is not reactive when being overridden.

`v-model` bound to a property of a `reactive` object is fine, it just cant be bound the the object itself.

✅ **GOOD**

```vue
<template>
  <SlickList v-model:list="list">
</template>

<script>
export default {
  setup() {
    const list = ref([/* ... */])

    return  {
      list
    }
  }
}
</script>
```

❌ **BAD**

```vue
<template>
  <SlickList v-model:list="list">
</template>

<script>
export default {
  setup() {
    const list = reactive([/* ... */]) // entire object will be replaced with v-model

    return  {
      list
    }
  }
}
</script>
```

## Reporting Issues

If believe you've found an issue, please [report it](https://github.com/Jexordexan/vue-slicksort/issues) along with any relevant details to reproduce it. The easiest way to do so is to fork this [jsfiddle](https://jsfiddle.net/Jexordexan/1puv2L6c/).
