<template>
  <SortableList
    :axis="axis"
    v-model:list="fruits"
    class="example-list"
    :class="{ horizontal: axis === 'x' }"
    :use-drag-handle="showHandle"
  >
    <SortableItem
      v-for="(fruit, i) in fruits"
      :key="fruit"
      :index="i"
      :item="{ value: fruit }"
      :show-handle="showHandle"
      class="example-list-item"
    />
  </SortableList>
  <details>
    <summary>v-model</summary>
    <div class="language-js">
      <pre class="lang-js"><code>fruits: {{ fruits }}</code></pre>
    </div>
  </details>
</template>

<script>
import SortableList from './SortableList.vue';
import SortableItem from './SortableItem.vue';

export default {
  components: {
    SortableList,
    SortableItem,
  },
  props: {
    axis: {
      type: String,
      default: 'y',
    },
    showHandle: Boolean,
  },
  data() {
    return {
      fruits: ['Apples', 'Bananas', 'Cherries', 'Dragon Fruit', 'Elderberries'],
    };
  },
};
</script>
