import { watchEffect } from 'vue';
import DefaultTheme from 'vitepress/theme';
import GroupExample from '../components/GroupExample.vue';
import FruitExample from '../components/FruitExample.vue';
import LongListExample from '../components/LongListExample.vue';
import PageListExample from '../components/PageListExample.vue';
import ShorthandExample from '../components/ShorthandExample.vue';
import SimpleGroupExample from '../components/SimpleGroupExample.vue';
import KanbanExample from '../components/KanbanExample.vue';
import { track } from '../components/utils';
import { plugin } from '../../../src';
import '../style.styl';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    watchEffect(() => {
      track('set', 'page', router.route.path);
      track('send', 'pageview');
    });

    app.use(plugin);
    app.component('GroupExample', GroupExample);
    app.component('FruitExample', FruitExample);
    app.component('ShorthandExample', ShorthandExample);
    app.component('LongListExample', LongListExample);
    app.component('PageListExample', PageListExample);
    app.component('SimpleGroupExample', SimpleGroupExample);
    app.component('KanbanExample', KanbanExample);
  },
};
