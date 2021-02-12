<template>
  <li class="list-item">
    <h3>{{ list.name }}</h3>
    <SortableList v-model="list.items" class="shortList">
      <SortableItem v-for="(item, index) in list.items" :key="item.id" :index="index" :item="item" />
    </SortableList>
  </li>
</template>

<script>
import { ElementMixin } from '../../src';
import SortableList from './SortableList.vue';
import SortableItem from './SortableItem.vue';

export default {
  mixins: [ElementMixin],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      items: this.list.items.slice(0),
    };
  },
};
</script>

<style lang="scss" scoped></style>
