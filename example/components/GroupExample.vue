<template>
  <div class="root">
    <SortableList axis="y" v-for="list in lists" group="a" v-model="list.items">
      <SortableItem v-for="(item, index) in list.items" :key="index" :index="index" :item="item" />
    </SortableList>
  </div>
</template>

<script>
import range from 'lodash/range';
import random from 'lodash/random';

import SortableItem from './SortableItem.vue';
import SortableList from './SortableList.vue';

let id = 100;

export default {
  name: 'GroupExample',
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      lists: range(3).map((val) => {
        return {
          id: id++,
          name: 'List ' + (val + 1),
          items: range(3).map((value) => {
            return {
              value: 'Item ' + (value + 1),
              height: random(49, 120),
              id: id++,
            };
          }),
        };
      }),
    };
  },
};
</script>

<style lang="scss" scoped></style>
