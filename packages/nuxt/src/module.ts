import { addComponent, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
}

const luiComponents = [
  'LuiAvatar',
  'LuiBadge',
  'LuiButton',
  'LuiCheckbox',
  'LuiMenuDropdown',
  'LuiMenuItem',
  'LuiInput',
  'LuiRadio',
  'LuiSelect',
  'LuiMultiSelect',
  'LuiOption',
  'LuiSwitch',
  'LuiTextarea',
  'LuiModal',
  'LuiTabGroup',
  'LuiTabButtons',
  'LuiTabButton',
  'LuiTabPanels',
  'LuiTabPanel',
  'LuiTag',
  'LuiPopover',
  'LuiSidebar',
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'lui-ui',
    configKey: 'luiUI',
  },
  // Default configuration options of the Nuxt module
  defaults: {
  },
  setup(_options, nuxt) {
    // const resolver = createResolver(import.meta.url)

    luiComponents.forEach((component) => {
      addComponent({
        name: component,
        export: component,
        filePath: '@lui-ui/lui-vue',
      })
    })

    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push('@lui-ui/lui-vue')

    nuxt.options.build.transpile = nuxt.options.build.transpile || []
    nuxt.options.build.transpile.push('@lui-ui/lui-vue')

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
