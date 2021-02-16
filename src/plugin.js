import SlicksortHub from './SlicksortHub';
import { HandleDirective } from './HandleDirective';

export default {
  install(app, options) {
    app.directive('drag-handle', HandleDirective);
    app.provide('SlicksortHub', new SlicksortHub(options));
  },
};
