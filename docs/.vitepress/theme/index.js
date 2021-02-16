import DefaultTheme from 'vitepress/theme';
import GroupExample from '../components/GroupExample.vue';
import FruitExample from '../components/FruitExample.vue';
import LongListExample from '../components/LongListExample.vue';
import ShorthandExample from '../components/ShorthandExample.vue';
import SimpleGroupExample from '../components/SimpleGroupExample.vue';
import { plugin } from '../../../src';
import '../style.styl';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(plugin);
    app.component('GroupExample', GroupExample);
    app.component('FruitExample', FruitExample);
    app.component('LongListExample', LongListExample);
    app.component('ShorthandExample', ShorthandExample);
    app.component('SimpleGroupExample', SimpleGroupExample);
  },
};
