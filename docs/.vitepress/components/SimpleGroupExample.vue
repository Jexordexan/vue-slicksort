<template>
  <div class="groups-example">
    <div class="list-wrapper">
      <h4>{{ shelf.name }}</h4>
      <code>group: 'groceries'</code>
      <SortableList axis="y" group="groceries" :accept="shelf.accept" :block="shelf.block" v-model:list="shelf.items">
        <SortableItem v-for="(item, index) in shelf.items" :key="index" :index="index" :item="item" />
      </SortableList>
    </div>
    <div class="list-wrapper">
      <h4>{{ cart.name }}</h4>
      <code>group: 'groceries'</code>
      <SortableList axis="y" group="groceries" :accept="cart.accept" :block="cart.block" v-model:list="cart.items">
        <SortableItem v-for="(item, index) in cart.items" :key="index" :index="index" :item="item" />
      </SortableList>
    </div>
  </div>
  <details>
    <summary>v-models</summary>
    <div class="groups-example">
      <div class="list-wrapper">
        <div class="language-js">
          <pre class="lang-js"><code>shelf: {{ shelf }}</code></pre>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="language-js">
          <pre class="lang-js"><code>cart: {{ cart }}</code></pre>
        </div>
      </div>
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

export default {
  name: 'SimpleGroupExample',
  components: {
    SortableItem,
    SortableList,
  },
  setup() {
    const shelf = ref({
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
    });

    const cart = ref({
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
    });

    return {
      shelf,
      cart,
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
