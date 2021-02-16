<template>
  <div class="groups-example">
    <div v-for="list in lists" :key="list.id" class="list-wrapper">
      <h4>{{ list.name }}</h4>
      <code>accept: {{ list.accept }}</code>
      <SortableList axis="y" :group="list.group" :accept="list.accept" :block="list.block" v-model:list="list.items">
        <SortableItem v-for="(item, index) in list.items" :key="index" :index="index" :item="item" />
      </SortableList>
    </div>
  </div>
  <details>
    <summary>v-models</summary>
    <div class="language-js">
      <pre class="lang-js"><code>lists: {{ lists }}</code></pre>
    </div>
  </details>
</template>

<script>
import { reactive } from 'vue';
import { random, range } from './utils';

import SortableItem from './SortableItem.vue';
import SortableList from './SortableList.vue';

let id = 100;

const colors = ['#eb5757', '#9b51e1', '#58cbf2'];

const randomColor = () => colors[random(0, colors.length - 1)];

export default {
  name: 'GroupExample',
  components: {
    SortableItem,
    SortableList,
  },
  setup() {
    const lists = reactive([
      {
        id: id++,
        name: 'List A',
        group: 'a',
        accept: ['b'],
        items: range(3).map((value) => {
          return {
            value: 'Item ' + (value + 1),
            height: random(49, 100),
            background: colors[value],
            id: id++,
          };
        }),
      },
      {
        id: id++,
        name: 'List B',
        group: 'b',
        accept: true,
        items: range(3).map((value) => {
          return {
            value: 'Item ' + (value + 1),
            height: random(49, 120),
            background: colors[value],
            id: id++,
          };
        }),
      },
      {
        id: id++,
        name: 'List C',
        group: 'c',
        accept: ['b'],
        items: range(3).map((value) => {
          return {
            value: 'Item ' + (value + 1),
            height: random(49, 120),
            background: colors[value],
            id: id++,
          };
        }),
      },
    ]);

    return {
      lists,
    };
  },
};
</script>

<style scoped>
.groups-example {
  display: flex;
}

.list-wrapper {
  width: 33%;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.example-list-item {
  mix-blend-mode: multiply;
  list-style-type: none;
}
</style>
