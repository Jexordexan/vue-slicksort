import './Storybook.scss';

import Vue from 'vue';
import range from 'lodash/range';
import random from 'lodash/random';
import { storiesOf } from '@storybook/vue';

import { ContainerMixin, ElementMixin } from '../index';

function createList(count, variableHeight = false) {
  return range(count).map((value) => {
    return {
      value: 'Item ' + (value + 1),
      height: variableHeight ? random(49, 120) : null,
    };
  })
}

const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `,
};

const ListItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item" :style="{height: item.height + 'px'}" >{{item.value}}</li>
  `,
};

function generateComponent(count, variableHeight = false, props = {}) {
  return () => ({
    template: `
    <div class="root">
      <SortableList v-model="items" v-bind="sortableProps" @sortStart="{ }">
        <ListItem v-for="(item, index) in items" :index="index" :key="index" :item="item" />
      </SortableList>
    </div>
    `,
    components: {
      ListItem,
      SortableList,
    },
    data() {
      return {
        items: createList(count, variableHeight),
        sortableProps: props,
      };
    },
  });
}



storiesOf('Basic usage', module)
  .add('Simple list', generateComponent(10))
  .add('Variable height', generateComponent(10, true))
  .add('Autoscroll', generateComponent(100, true))
  .add('Lock axis', generateComponent(100, true, { lockAxis: 'y' }))