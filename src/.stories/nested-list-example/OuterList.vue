<template>
  <div class="root">
    <SortableList lockAxis="y" v-model="lists">
      <InnerList v-for="(list, index) in lists" :key="list.id" :index="index" collection="lists" :list="list" ></InnerList>
    </SortableList>
  </div>
</template>


<script>
import createList from '../createList'

import SortableList from '../SortableList.vue'
import InnerList from './InnerList.vue'

export default {
  components: {
    SortableList,
    InnerList,
  },
  data() {
    return {
      lists: createList(3, false, 'List')
        .map(li => {
          return Object.assign(li, { 
            items: createList(3, false) 
          });
        }),
    };
  },
}
</script>
