// import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //     // "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/main.ts'),
      name: 'LuiVue',
      fileName: (format) => `lui-vue.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
