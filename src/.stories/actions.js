import { action } from '@storybook/addon-actions';

export default {
  sortStart: action('@sortStart'),
  sortEnd: action('@sortEnd'),
  sortMove: action('@sortMove'),
  input: action('@input')
};
