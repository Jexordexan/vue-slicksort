import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const input =  './src/index.js';

export default [
  {
    input,
    output: {
      file: './dist/commonjs/index.js',
      format: 'cjs',
    },
    plugins: [ 
      babel(),
    ],
  }, {
    input,
    output: {
      file: './dist/es6/index.js',
      format: 'es',
    },
  }, {
    input,
    output: {
      file: './dist/umd/vue-sortable.js',
      name: 'VueSortable',
      format: 'umd',
    },
    plugins: [ 
      babel(),
    ],
  }, {
    input,
    output: {
      file: './dist/umd/vue-sortable.min.js',
      name: 'VueSortable',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      babel(),
      uglify(),
    ],
  },
];