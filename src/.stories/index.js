import './Storybook.scss';

import Vue from 'vue';
import range from 'lodash/range';
import random from 'lodash/random';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import { ContainerMixin, ElementMixin, HandleDirective } from '../index';

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
  props: ['item', 'showHandle'],
  directives: { handle: HandleDirective },
  template: `
    <li class="list-item" :style="{height: item.height + 'px'}" >
      <span v-handle class="handle" v-if="showHandle"></span>
      {{item.value}}
    </li>
  `,
};

const actions = {
  sortStart: action('@sortStart'),
  sortEnd: action('@sortEnd'),
  sortMove: action('@sortMove'),
  input: action('@input')
}

let movesCounter = 0;

function generateComponent(pageTitle, count, variableHeight = false, props = {}) {
  return () => ({
    template: `
    <div class="root">
      <h1><a href="https://github.com/Jexordexan/vue-slicksort" target="_blank" title="Go to Github">Vue Slicksort</a></h1>
      <h3>${pageTitle}</h3>
      <pre v-show="propsText">{{ propsText }}</pre>
      <SortableList v-model="items" :class="classes" v-bind="sortableProps" @sortStart="sortStart" @sortEnd="sortEnd" @sortMove="sortMove" @input="onInput">
        <ListItem v-for="(item, index) in items" :showHandle="showHandle" :index="index" :key="index" :item="item" />
      </SortableList>
    </div>
    `,
    components: {
      ListItem,
      SortableList,
    },
    data() {
      const classes = [];
      const showHandle = props.useDragHandle;
      if (props.axis === 'x') {
        classes.push('horizontalList')
      }

      return {
        items: createList(count, variableHeight),
        sortableProps: props,
        showHandle,
        classes
      };
    },
    computed: {
      propsText() {
        const props = this.sortableProps;
        let text = '';
        Object.keys(props).forEach(key => {
          text += `:${key}="${props[key]}"\n`
        })
        return text;
      }
    },
    methods: {
      sortStart({ index }) {
        // Only pass the index because the action logger has a hard time serializing event and HTMLElement objects
        actions.sortStart({ index });
      },
      sortMove() {
        movesCounter++;
      },
      sortEnd({ oldIndex, newIndex }) {
        actions.sortMove(movesCounter + ' sortMove events fired');
        actions.sortEnd({ oldIndex, newIndex });
        movesCounter = 0;
      },
      onInput(newList) {
        actions.input(newList);
      }
    }
  });
}




storiesOf('Vertical sorting', module)
  .add('Simple list', generateComponent('Simple list', 10))
  .add('Variable height', generateComponent('Variable height', 10, true))
  .add('Autoscroll', generateComponent('Autoscroll', 100, true))

storiesOf('Optional props', module)
  .add('useDragHandle', generateComponent('Use drag handle', 10, false, { useDragHandle: true}))
  .add('lockAxis', generateComponent('Lock axis', 100, true, { lockAxis: 'y' }))
  .add('helperClass', generateComponent('Stylized helper', 100, true, { helperClass: 'stylizedHelper' }))

storiesOf('Horizontal sorting', module)
  .add('Simple horizontal list', generateComponent('Simple horizontal list', 10, false, { axis: 'x' }))

let id = 100;

const InnerList = {
  mixins: [ElementMixin],
  props: ['list'],
  template: `
    <li class="list-item">
      <h3>{{list.name}}</h3>
      <SortableList v-model="list.items" class="shortList">
        <ListItem v-for="(item, index) in list.items" :key="item.id" :collection="list.name" :index="index" :item="item" />
      </SortableList>
    </li>
  `,
  components: {
    ListItem,
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
      <SortableList lockAxis="y" v-model="lists">
        <InnerList v-for="(list, index) in lists" :key="list.name" :index="index" collection="lists" :list="list" ></InnerList>
      </SortableList>
    </div>
  `,
  components: {
    SortableList,
    InnerList,
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
              id: id++,
            };
          }),
        };
      }),
    };
  },
};
  

storiesOf('Advanced use', module)
  .add('Nested list', () => ExampleVue)