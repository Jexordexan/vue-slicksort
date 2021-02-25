import { watchEffect } from 'vue';
import DefaultTheme from 'vitepress/theme';
import GroupExample from '../components/GroupExample.vue';
import FruitExample from '../components/FruitExample.vue';
import LongListExample from '../components/LongListExample.vue';
import PageListExample from '../components/PageListExample.vue';
import ShorthandExample from '../components/ShorthandExample.vue';
import SimpleGroupExample from '../components/SimpleGroupExample.vue';
import KanbanExample from '../components/KanbanExample.vue';
import { plugin } from '../../../src';
import '../style.styl';

const GOOGLE_APP_ID = 'G-6JF11BVDSJ';

function installGoogleAnalytics(router) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', GOOGLE_APP_ID);

  gtag('create', GOOGLE_APP_ID, 'auto');
  gtag('set', 'anonymizeIp', true);

  watchEffect(() => {
    gtag('set', 'page', router.route.path);
    gtag('send', 'pageview');
  });
}

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    if (GOOGLE_APP_ID && process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      installGoogleAnalytics(router);
    }

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
