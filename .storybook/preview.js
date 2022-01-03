import '../src/index.css'
import 'remixicon/fonts/remixicon.css'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'dark',
        value: '#292524',
      },
      {
        name: 'light',
        value: '#f5f5f4',
      },
      {
        name: 'warning',
        value: '#FFB31A',
      },
      {
        name: 'danger',
        value: '#E35B5B',
      },
      {
        name: 'primary',
        value: '#2376D7',
      },
      {
        name: 'success',
        value: '#33BA98',
      },
      {
        name: 'info',
        value: '#27A8B9',
      },
      {
        name: 'secondary',
        value: '#78716c',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
