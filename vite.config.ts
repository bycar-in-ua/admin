import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcss from "./postcss.config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@common": fileURLToPath(new URL("./common", import.meta.url)),
    },
    extensions: [".vue", ".js", ".ts"],
  },
  server: {
    port: 3010,
  },
});
