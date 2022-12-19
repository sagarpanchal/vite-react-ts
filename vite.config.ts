import { defineConfig } from "vite"

import react from "@vitejs/plugin-react"
import lint from "vite-plugin-checker"
import { VitePWA as pwa, ManifestOptions } from "vite-plugin-pwa"
import styleLint from "vite-plugin-stylelint"
import reactSvg from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

import { default as manifest } from "./manifest.json"

// https://vitejs.dev/config/
export default defineConfig(() => ({
  test: {
    environment: "jsdom",
  },
  css: {
    preprocessorOptions: {
      scss: { quietDeps: true },
    },
  },
  plugins: [
    tsconfigPaths(),
    lint({
      eslint: { lintCommand: 'eslint "src/**/*.{ts,tsx,js,jsx}"' },
      typescript: true,
    }),
    styleLint({
      fix: true,
      customSyntax: "postcss-scss",
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
    reactSvg(),
  ],
}))
