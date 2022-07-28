const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@/styles": path.resolve(__dirname, "../src/styles"),
          "@/components": path.resolve(__dirname, "../src/components"),
          "@/lib": path.resolve(__dirname, "../lib"),
          "@/types": path.resolve(__dirname, "../types"),
        },
      },
    };
  },
};
