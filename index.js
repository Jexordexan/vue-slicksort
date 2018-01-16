import Vue from 'vue';
import range from 'lodash/range';
import random from 'lodash/random';
import { ContainerMixin, ElementMixin } from './src';

const defaultProps = () => ({
  axis: 'y',
  transitionDuration: 300,
  pressDelay: 0,
  pressThreshold: 5,
  distance: 0,
  useWindowAsScrollContainer: false,
  hideSortableGhost: true,
  shouldCancelStart: function(e) {
    // Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
    const disabledElements = ['input', 'textarea', 'select', 'option', 'button'];

    if (disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1) {
      return true; // Return true to cancel sorting
    }
  },
  lockToContainerEdges: false,
  lockOffset: '50%',
  getHelperDimensions: ({node}) => ({
    width: node.offsetWidth,
    height: node.offsetHeight,
  }),
});

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
  template: `
    <li class="list-item" :style="{height: item.height + 'px'}" >Vue {{item.value}}</li>
  `,
  props: ['item'],
};

const ExampleVue = {
  name: 'Example',
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" :style="{height: item.height + 'px'}" />
      </SortableList>
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      sortableProps: defaultProps(),
      items: range(100).map((value) => {
        return {
          value: 'Item ' + value,
          height: random(49, 120),
        };
      }),
    };
  },
};

const app = new Vue({
  render: (h) => h(ExampleVue),
});

app.$mount('#root');
