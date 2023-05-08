// module.exports = {
//   "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
//   "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-darkmode-vue/register", "@storybook/addon-mdx-gfm"],
//   "framework": {
//     name: "@storybook/vue3-vite",
//     options: {}
//   },
//   "features": {
//     "storyStoreV7": true
//   },
//   docs: {
//     autodocs: true
//   }
// };

// .storybook/main.ts

import remarkGfm from 'remark-gfm'

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-webpack5)
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: [
    // Other addons go here
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-darkmode-vue/register'
  ],
  framework: {
    // The name of the framework you want to use goes here
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
}

export default config
