import Vue from 'vue';
import Slicksort from '../src/plugin';
import BasicList from './BasicList.vue';

Vue.use(Slicksort);

export default {
  title: 'BasicList',
  component: BasicList,
};

export const Default = () => BasicList;

export const MultipleLists = () => ({
  components: {
    BasicList,
  },
  template: `
  <div>
    <div style="display:flex">
      <BasicList name="A" />
      <BasicList name="B" />
      <BasicList name="C" />
    </div>
    <BasicList axis="x" name="D" />
  </div>
  `,
});
