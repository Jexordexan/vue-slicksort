import BasicList from './BasicList.vue';

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
    <div style="display:flex">
      <BasicList />
      <BasicList />
      <BasicList />
    </div>
  `,
});
