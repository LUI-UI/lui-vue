/* eslint-disable antfu/top-level-function */
import plugin from 'tailwindcss/plugin.js'
import colors from 'tailwindcss/colors.js'

// import colors from 'tailwindcss/colors.js'

const luiPlugin = () => {
  return plugin(
    ({ config }) => {
      const _config = config()

      const states = [
        '',
        'hover',
        'focus',
        // "active",
        // "disabled",
        'focus-visible',
      ]
      const properties = ['bg', 'text', 'border']
      const rootColors = [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
      ]
      // Leveller azaltılabilinir.. ??
      const levels = [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ]

      const luiSafeList: string[] = []

      states.forEach((state) => {
        if (state !== 'focus-visible' && state !== '') {
          properties.forEach((property) => {
            rootColors.forEach((color) => {
              levels.forEach((level) => {
                luiSafeList.push(`${state}:${property}-${color}-${level}`)
              })
            })
          })
        }
        if (state === '') {
          properties.forEach((property) => {
            rootColors.forEach((color) => {
              levels.forEach((level) => {
                luiSafeList.push(`${property}-${color}-${level}`)
              })
            })
          })
        }

        if (state === 'focus-visible') {
          rootColors.forEach((color) => {
            luiSafeList.push(`focus-visible:ring-${color}-500/40`)
          })
        }
        if (state === 'hover' || state === 'focus') {
          rootColors.forEach((color) => {
            luiSafeList.push(`${state}:bg-${color}-600/20`)
          })
          rootColors.forEach((color) => {
            luiSafeList.push(`${state}:hover:bg-${color}-400/20`)
          })
        }
      })

      const luiContent = [
        './components/**/*.{vue,js,jsx,mjs,ts,tsx,vue}',
        'node_modules/**/@lui-ui/lui-vue/dist/**/*.{vue,js,jsx,mjs,ts,tsx,vue}',
      ]

      const contentArray = Array.isArray(_config.content) ? _config.content : _config.content.files
      const uniqueContentList = [...new Set([...contentArray, ...luiContent])]

      if (Array.isArray(_config.content))
        _config.content = uniqueContentList

      else
        _config.content.files = uniqueContentList

      const safelistArray: string[] | any[] = Array.isArray(_config.safelist) ? _config.safelist : []
      const uniqueSafeList = [...new Set([...safelistArray, ...luiSafeList])]

      _config.safelist = uniqueSafeList
    },
    {
      theme: {
        extend: {
          colors: {
            primary: colors.blue,
            secondary: colors.gray,
            success: colors.green,
            warning: colors.amber,
            danger: colors.red,
            info: colors.sky,
            white: '#ffffff',
            black: '#000000',
            light: colors.gray[50],
            dark: colors.gray[900],
          },
        },
      },
    },
  )
}

export {
  luiPlugin,
}
