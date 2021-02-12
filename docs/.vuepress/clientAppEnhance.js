import GroupExample from './components/GroupExample.vue';

// async function is also supported, too
export default ({ app }) => {
  app.component('GroupExample', GroupExample);
};
