<template>
  <div class="root">
    <h1><a href="https://github.com/Jexordexan/vue-slicksort" target="_blank" title="Go to Github">Vue Slicksort</a></h1>
    <h3>{{pageTitle}}</h3>
    <pre v-show="propsText">{{ propsText }}</pre>
    <SortableList v-model="items" :class="classes" v-bind="sortableProps" @sort-start="sortStart" @sort-end="sortEnd" @sort-move="sortMove" @input="onInput">
      <SortableItem v-for="(item, index) in items" :showHandle="showHandle" :index="index" :key="index" :item="item" />
    </SortableList>
  </div>
</template>

<script>
import SortableItem from './SortableItem.vue';
import SortableList from './SortableList.vue';
import createList from './createList'
import actions from './actions'

let movesCounter = 0;

export default {
  props: {
    pageTitle: String,
    count: Number,
    variableHeight: Boolean,
    sortableProps: Object
  },
  components: {
    SortableItem,
    SortableList
  },
  data() {
    const classes = [];
    const showHandle = this.sortableProps.useDragHandle;
    if (this.sortableProps.axis === "x") {
      classes.push("horizontalList");
    }

    return {
      items: createList(this.count, this.variableHeight),
      showHandle,
      classes
    };
  },
  computed: {
    propsText() {
      const props = this.sortableProps;
      let text = "";
      Object.keys(props).forEach(key => {
        text += `${key}="${props[key]}"\n`;
      });
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
      actions.sortMove(movesCounter + " sort-move events fired");
      actions.sortEnd({ oldIndex, newIndex });
      movesCounter = 0;
    },
    onInput(newList) {
      actions.input(newList);
    }
  }
};
</script>
