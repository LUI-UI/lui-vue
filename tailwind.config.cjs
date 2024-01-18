import { luiPlugin } from './packages/tailwindcss/src'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/vue/src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [luiPlugin()],
}
