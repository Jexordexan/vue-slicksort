import { SlicksortHub } from './SlicksortHub';

export default {
  install(app, options) {
    app.config.globalProperties.$_slicksort_hub = new SlicksortHub(options);
  },
};
