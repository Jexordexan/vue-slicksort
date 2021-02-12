<template>
  <div class="root">
    <div v-for="list in lists" :key="list.id" class="list">
      <h1>{{ list.name }}</h1>
      <strong>Accepts: {{ list.accept }}</strong>
      <SortableList axis="y" :group="list.group" :accept="list.accept" :block="list.block" v-model="list.items">
        <SortableItem v-for="(item, index) in list.items" :key="index" :index="index" :item="item" />
      </SortableList>
    </div>
  </div>
</template>

<script>
import range from 'lodash/range';
import random from 'lodash/random';

import SortableItem from './SortableItem.vue';
import SortableList from './SortableList.vue';
import { reactive } from 'vue';

let id = 100;

export default {
  name: 'GroupExample',
  components: {
    SortableItem,
    SortableList,
  },
  setup() {
    console.log('setup');
    const lists = reactive([
      {
        id: id++,
        name: 'List A',
        group: 'a',
        accept: ({ source }) => source.group == 'b',
        items: range(3).map((value) => {
          return {
            value: 'Item ' + (value + 1),
            height: random(49, 120),
            id: id++,
          };
        }),
      },
      {
        id: id++,
        name: 'List B',
        group: 'b',
        accept: ['a', 'c'],
        items: range(3).map((value) => {
          return {
            value: 'Item ' + (value + 1),
            height: random(49, 120),
            id: id++,
          };
        }),
      },
      {
        id: id++,
        name: 'List C',
        group: 'c',
        accept: true,
        block: ['a'],
        items: range(3).map((value) => {
          return {
            value: 'Item ' + (value + 1),
            height: random(49, 120),
            id: id++,
          };
        }),
      },
    ]);

    return {
      lists,
    };
  },
  data() {
    console.log('data');
  },
};
</script>

<style lang="scss" scoped></style>
