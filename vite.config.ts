import { defineConfig, PluginOption } from "vite"

import path from "path"

import react from "@vitejs/plugin-react-swc"
import visualizer from "rollup-plugin-visualizer"
import { checker } from "vite-plugin-checker"
import { VitePWA as pwa, ManifestOptions } from "vite-plugin-pwa"
import styleLint from "vite-plugin-stylelint"
import reactSVG from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

import { default as manifest } from "./manifest.json"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      ["styles"]: path.resolve(__dirname, "src", "styles"),
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "html"],
    },
  },
  server: {
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: { quietDeps: true },
    },
  },
  plugins: [
    tsconfigPaths(),
    checker({
      eslint: !process.env.VITEST && { lintCommand: 'eslint "src/**/*.{ts,tsx,js,jsx}"' },
      typescript: true,
    }),
    styleLint({
      fix: !process.env.VITEST,
      cache: false,
    }),
    pwa({
      devOptions: { enabled: false },
      includeAssets: ["vite.svg"],
      manifestFilename: "manifest.json",
      manifest: manifest as Partial<ManifestOptions>,
      registerType: "autoUpdate",
      workbox: { globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"] },
    }),
    react(),
    reactSVG(),
    visualizer({ open: true }) as PluginOption,
  ],
})
