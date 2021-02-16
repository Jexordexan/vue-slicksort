import DefaultTheme from 'vitepress/theme';
import GroupExample from '../components/GroupExample.vue';
import FruitExample from '../components/FruitExample.vue';
import LongListExample from '../components/LongListExample.vue';
import { plugin } from '../../../src';
import '../style.styl';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(plugin);
    app.component('GroupExample', GroupExample);
    app.component('FruitExample', FruitExample);
    app.component('LongListExample', LongListExample);
  },
};
