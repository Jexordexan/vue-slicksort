import { createApp } from 'vue';
import range from 'lodash/range';
import random from 'lodash/random';
import { ContainerMixin, ElementMixin } from './src';

import { GroupExample } from './src/group-example';

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
      <GroupExample />
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
    InnerList,
    GroupExample,
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

const app = createApp(ExampleVue);

app.mount('#root')
