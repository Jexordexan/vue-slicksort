// eslint-disable-next-line @typescript-eslint/no-var-requires
const { startDevServer } = require('@cypress/vite-dev-server');
const vue = require('@vitejs/plugin-vue');

module.exports = (on, config) => {
  const viteConfig = {
    plugins: [vue()],
  };

  viteConfig.esbuild = viteConfig.esbuild || {};
  viteConfig.esbuild.jsxFactory = 'h';
  viteConfig.esbuild.jsxFragment = 'Fragment';
  viteConfig.logLevel = 'error';
  viteConfig.resolve = {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  };

  on('dev-server:start', (options) => {
    return startDevServer({ options, viteConfig });
  });
  return config;
};
