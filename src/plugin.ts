import SlicksortHub from './SlicksortHub';
import { HandleDirective } from './HandleDirective';
import { Plugin } from 'vue';

const plugin: Plugin = {
  install(app) {
    app.directive('drag-handle', HandleDirective);
    app.provide('SlicksortHub', new SlicksortHub());
  },
};

export default plugin;
