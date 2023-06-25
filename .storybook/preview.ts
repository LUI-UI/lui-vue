import './index.css'
import 'remixicon/fonts/remixicon.css'
import colors from 'tailwindcss/colors'
import { addons } from '@storybook/preview-api'
import type { Preview } from '@storybook/vue3'
import DocumentationTemplate from './documentationTemplate.mdx'
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'light',
      dark: 'dark',
      values: [
        {
          name: 'white',
          value: '#FFFFFF'
        },
        {
          name: 'black',
          value: '#000000'
        },
        {
          name: 'dark',
          value: colors.gray[800]
        },
        {
          name: 'light',
          value: colors.gray[100]
        },
        {
          name: 'warning',
          value: colors.yellow[500]
        },
        {
          name: 'danger',
          value: colors.red[500]
        },
        {
          name: 'primary',
          value: colors.blue[500]
        },
        {
          name: 'success',
          value: colors.green[500]
        },
        {
          name: 'info',
          value: colors.cyan[500]
        },
        {
          name: 'secondary',
          value: colors.gray[500]
        }
      ]
    },
    docs: {
      page: DocumentationTemplate
    }
  }
}

export default preview

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel()
// const channel = addons.getChanel();

// switch body class for story along with interface theme
channel.on('STORYBOOK_DARK_MODE_VUE', (isDark) => {
  if (isDark) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
})
