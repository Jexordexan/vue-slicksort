import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

function loadStories() {
  // You can require as many stories as you need.
  require('../src/.stories');
}

configure(loadStories, module);

setOptions({
  name: 'vue-slicksort'
});