module.exports = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react-vite",
  core: {
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ["../public"],
}
