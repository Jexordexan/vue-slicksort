import Vue from 'vue';
import range from 'lodash/range';
import random from 'lodash/random';
import { ContainerMixin, ElementMixin } from './src';

const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `,
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item" :style="{height: item.height + 'px'}" >{{item.value}}</li>
  `,
};

let id = 100;

const InnerList = {
  mixins: [ElementMixin],
  props: ['list'],
  template: `
    <li class="list-item">
      <h3>{{list.name}}</h3>
      <SortableList v-model="list.items" class="shortList">
        <SortableItem v-for="(item, index) in list.items" :key="item.id" :collection="list.name" :index="index" :item="item" />
      </SortableList>
    </li>
  `,
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

const ExampleVue = {
  name: 'Example',
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :key="index" :index="index" collection="items" :item="item" />
      </SortableList>
      <SortableList lockAxis="y" v-model="lists">
        <InnerList v-for="(list, index) in lists" :key="list.name" :index="index" collection="lists" :list="list" ></InnerList>
      </SortableList>
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
    InnerList,
  },
  data() {
    return {
      items: range(100).map((value) => {
        return {
          value: 'Item ' + (value + 1),
          height: random(49, 120),
          id: id++,
        };
      }),
      lists: range(3).map(val => {
        return {
          id: id++,
          name: 'List ' + (val + 1),
          items: range(3).map((value) => {
            return {
              value: 'Item ' + (value + 1),
              id: id++,
            };
          }),
        };
      }),
    };
  },
};

new Vue({
  el: '#root',
  render: (h) => h(ExampleVue),
});
