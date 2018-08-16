import { action } from '@storybook/addon-actions';

export default {
  sortStart: action('@sort-start'),
  sortEnd: action('@sort-end'),
  sortMove: action('@sort-move'),
  input: action('@input')
};
