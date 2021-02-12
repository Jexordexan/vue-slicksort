import babel from 'rollup-plugin-babel';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

const input = './src/index.js';
const moduleName = 'VueSlicksort';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
      { file: pkg.browser, format: 'umd', name: moduleName },
    ],
    plugins: [esbuild(), babel()],
  },
  {
    input,
    output: {
      file: pkg.unpkg,
      name: moduleName,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [esbuild({ minify: true }), babel()],
  },
];
