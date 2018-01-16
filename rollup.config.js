import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const input =  './src/index.js';
const fileName = 'vue-slicksort';
const moduleName = 'VueSlicksort';

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
      file: './dist/umd/' + fileName + '.js',
      name: moduleName,
      format: 'umd',
    },
    plugins: [ 
      babel(),
    ],
  }, {
    input,
    output: {
      file: './dist/umd/' + fileName + '.min.js',
      name: moduleName,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      babel(),
      uglify(),
    ],
  },
];