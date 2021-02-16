<template>
  <div class="groups-example">
    <div v-for="list in lists" :key="list.id" class="list-wrapper">
      <h4>{{ list.name }}</h4>
      <code>group: 'groceries'</code>
      <SortableList axis="y" group="groceries" :accept="list.accept" :block="list.block" v-model:list="list.items">
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
import { reactive, ref, watch } from 'vue';
import { random, range } from './utils';

import SortableItem from './SortableItem.vue';
import SortableList from './SortableList.vue';

let id = 100;

const colors = ['#eb5757', '#9b51e1', '#58cbf2'];
const fruits = ['Apples', 'Bananas', 'Cherries', 'Dragon Fruit'];
const veggies = ['Potatoes', 'Broccoli'];

const makeList = () => {
  return [
    {
      id: id++,
      name: 'Shelf',
      items: fruits.map((value) => {
        return {
          value,
          height: random(49, 100),
          background: colors[0],
          id: id++,
        };
      }),
    },
    {
      id: id++,
      name: 'Cart',
      items: veggies.map((value) => {
        return {
          value,
          height: random(49, 120),
          background: colors[1],
          id: id++,
        };
      }),
    },
  ];
};

export default {
  name: 'GroupExample',
  props: {
    winScreen: Boolean,
  },
  components: {
    SortableItem,
    SortableList,
  },
  setup(props) {
    const lists = ref(makeList());

    const showWinScreen = ref(false);

    const resetList = () => {
      lists.value = makeList();
      showWinScreen.value = false;
    };

    watch(
      () => lists.value,
      (newValue) => {
        if (!props.winScreen) return;
        const mapped = newValue.map((l) => l.items.map((i) => i.value));

        const winning = [
          ['Item 1', 'Item 1', 'Item 1'],
          ['Item 2', 'Item 2', 'Item 2'],
          ['Item 3', 'Item 3', 'Item 3'],
        ];

        if (JSON.stringify(mapped) === JSON.stringify(winning)) {
          showWinScreen.value = true;
          confetti.start();

          setTimeout(() => {
            confetti.stop();
          }, 5000);
        }
      },
      {
        deep: true,
      }
    );

    return {
      lists,
      showWinScreen,
      resetList,
    };
  },
};
</script>

<style scoped>
.groups-example {
  display: flex;
  position: relative;
}

.list-wrapper {
  width: 50%;
}
</style>
