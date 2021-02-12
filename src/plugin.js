import SlicksortHub from './SlicksortHub';

export default {
  install(app, options) {
    app.provide('SlicksortHub', new SlicksortHub(options));
  },
};
