import Vue from 'vue';
import range from 'lodash/range';
import random from 'lodash/random';
import { ContainerMixin, ElementMixin } from './index';
import SlickSortPlugin from './plugin';

Vue.use(SlickSortPlugin);

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

export const GroupExample = {
  name: 'GroupExample',
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-for="list in lists" v-model="list">
        <SortableItem v-for="(item, index) in list" :key="index" :index="index" :item="item" />
      </SortableList>
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      lists: range(3).map(val => {
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
