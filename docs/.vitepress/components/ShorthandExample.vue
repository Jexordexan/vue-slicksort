<template>
  <SlickList axis="y" v-model:list="fruits" class="example-list">
    <template #item="{ item }">
      <div class="example-list-item">
        {{ item }}
      </div>
    </template>
  </SlickList>
  <details>
    <summary>v-model</summary>
    <div class="language-js">
      <pre class="lang-js"><code>fruits: {{ fruits }}</code></pre>
    </div>
  </details>
</template>

<script>
import { SlickList } from '../../../src';

export default {
  components: {
    SlickList,
  },
  data() {
    return {
      fruits: ['Apples', 'Bananas', 'Cherries', 'Dragon Fruit', 'Elderberries'],
    };
  },
};
</script>
