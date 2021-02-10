<template>
  <SlickList v-model="list" class="list" :class="{ horizontal: axis == 'x' }" group="items" :axis="axis">
    <SlickItem
      v-for="(item, i) in list"
      class="list-item"
      :key="item.id"
      :index="i"
      :style="{ height: item.height + 'px' }"
    >
      {{ item.value }}
    </SlickItem>
  </SlickList>
</template>

<script>
import { SlickItem, SlickList } from '../src';
import { createList } from './utils';
export default {
  components: {
    SlickItem,
    SlickList,
  },
  props: {
    name: {
      type: String,
      default: 'A',
    },
    axis: {
      type: String,
      default: 'y',
    },
  },
  data() {
    return {
      list: createList(5, true, `List ${this.name}`),
    };
  },
};
</script>

<style scoped>
.list {
  width: 80%;
  max-height: 80vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 0;
  overflow: auto;
  background-color: #f3f3f3;
  border: 1px solid #efefef;
  border-radius: 3;
}

.horizontal {
  display: flex;
}

.list-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  user-select: none;

  color: #333;
  font-weight: 400;
}
</style>
