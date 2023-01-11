const path = require("path")
const { mergeConfig, loadConfigFromFile } = require("vite")
const tsconfigPaths = require("vite-tsconfig-paths")

module.exports = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    const { config: userConfig } = await loadConfigFromFile(path.resolve(__dirname, "../vite.config.ts"))

    return mergeConfig(config, {
      ...userConfig,
      plugins: [tsconfigPaths.default()],
    })
  },
}
