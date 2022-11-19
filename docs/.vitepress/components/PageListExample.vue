<template>
  <div>
    <SortableList v-model:list="items" axis="y" use-window-as-scroll-container>
      <SortableItem v-for="(item, index) in items" :key="item.id" :index="index" :item="item" />
    </SortableList>
  </div>
</template>

<script>
import { random, range } from './utils';
import SortableList from './SortableList.vue';
import SortableItem from './SortableItem.vue';

export default {
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      items: range(100).map((i) => {
        return {
          value: `Item ${i}`,
          id: i,
          height: random(50, 100),
        };
      }),
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
