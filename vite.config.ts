import path, { resolve } from 'node:path'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://github.com/qmhc/vite-plugin-dts
import dtsPlugin from 'vite-plugin-dts'

// https://github.com/sxzz/unplugin-vue-macros
import VueMacros from 'unplugin-vue-macros/vite'

import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.peerDependencies || {}),
]
export default defineConfig({
  plugins: [
    dtsPlugin({
      exclude: ['**/*.stories.ts', '**/*.test.ts', '**/*.spec.ts', '.storybook/**/*'],
    }),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
        }),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'lui-vue',
      fileName: 'index',
    },
    rollupOptions: {
      external: externals,
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css')
            return 'index.css'
          return chunkInfo.name as string
        },
      },
    },
  },
})

// import { fileURLToPath, URL } from "node:url";
/// <reference types="vitest" />

// import path from 'node:path'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import dts from 'vite-plugin-dts'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), dts({ insertTypesEntry: true })],
//   // resolve: {
//   //   alias: {
//   //     "@": path.resolve(__dirname, "./src"),
//   //     // "@": fileURLToPath(new URL("./src", import.meta.url)),
//   //   },
//   // },
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, './src/components/main.ts'),
//       name: 'LuiVue',
//       formats: ['es', 'cjs', 'umd'],
//       fileName: format => `lui-vue.${format}.js`,
//     },
//     rollupOptions: {
//       // make sure to externalize deps that shouldn't be bundled
//       // into your library
//       external: ['vue'],
//       output: {
//         // Provide global variables to use in the UMD build
//         // for externalized deps
//         globals: {
//           vue: 'Vue',
//         },
//       },
//     },
//   },
//   test: {
//     environment: 'happy-dom',
//     root: 'src/',
//   },
// })
