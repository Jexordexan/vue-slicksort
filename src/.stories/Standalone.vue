<template>
  <div class="root">
    <SlickList class="list" lockAxis="y" v-model="items">
      <SlickItem class="list-item" v-for="(item, index) in items" :index="index" :key="index">
        {{ item }}
      </SlickItem>
    </SlickList>
  </div>
</template>

<script>
import { SlickItem, SlickList } from '../index';


export default {
  name: 'Example',
  components: {
    SlickItem,
    SlickList,
  },
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
    };
  }
}
</script>
