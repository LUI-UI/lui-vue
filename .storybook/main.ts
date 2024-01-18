import type { StorybookConfig } from '@storybook/vue3-vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../packages/vue/src/components/**/*.stories.@(js|ts)'],
  staticDirs: ['../packages/vue/src'],
  addons: [
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
  docs: {
    autodocs: true
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
}

export default config
