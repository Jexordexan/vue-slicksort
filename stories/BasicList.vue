<template>
  <SlickList v-model="list" class="list">
    <SlickItem v-for="(item, i) in list" class="list-item" :key="item.id" :index="i">
      {{ item.value }}
    </SlickItem>
  </SlickList>
</template>

<script>
import { SlickItem, SlickList } from '../';
import { createList } from './utils';
export default {
  components: {
    SlickItem,
    SlickList,
  },
  data() {
    return {
      list: createList(10),
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
