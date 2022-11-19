import { createApp } from 'vue';
import { plugin as Slicksort } from '../src';
import Example from './Example.vue';

const app = createApp(Example);

app.use(Slicksort);

app.mount('#root');
