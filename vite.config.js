import vue from '@vitejs/plugin-vue'
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  plugins:[vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/main.js'),
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
})