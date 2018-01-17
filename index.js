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
    <li class="list-item" :style="{height: item.height + 'px'}" >Vue {{item.value}}</li>
  `,
};

const ExampleVue = {
  name: 'Example',
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" />
      </SortableList>
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      items: range(100).map((value) => {
        return {
          value: 'Item ' + value,
          height: random(49, 120),
        };
      }),
    };
  },
};

new Vue({
  el: '#root',
  render: (h) => h(ExampleVue),
});
