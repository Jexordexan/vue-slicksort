<template>
  <div class="root">
    <GroupExample />
  </div>
</template>

<script>
import { range, random } from 'lodash-es';

import SortableItem from './components/SortableItem.vue';
import SortableList from './components/SortableList.vue';
import InnerList from './components/InnerList.vue';
import GroupExample from './components/GroupExample.vue';

let id = 100;

export default {
  name: 'Example',
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
      lists: range(3).map((val) => {
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
</script>

<style lang="scss" scoped></style>
