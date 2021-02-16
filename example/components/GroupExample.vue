<template>
  <div class="root">
    <div v-for="list in lists" :key="list.id" class="list">
      <h1>{{ list.name }}</h1>
      <strong>Accepts: {{ list.accept }}</strong>
      <SortableList axis="y" :group="list.group" :accept="list.accept" :block="list.block" v-model:list="list.items">
        <SortableItem v-for="(item, index) in list.items" :key="index" :index="index" :item="item" />
      </SortableList>
    </div>
  </div>
</template>

<script>
import { range } from 'lodash-es';
import { random } from 'lodash-es';

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
      lists: [
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
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
