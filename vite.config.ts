// import { fileURLToPath, URL } from "node:url";

import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ insertTypesEntry: true })],
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
      formats: ['es', 'cjs', 'umd'],
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
})
