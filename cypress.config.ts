import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*cy.*",
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
