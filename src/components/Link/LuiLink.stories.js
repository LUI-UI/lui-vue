import LuiLink from './LuiLink.vue'

export default {
  title: 'LuiLink',
  component: LuiLink,
  args: {
    label: 'link',
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    size: {
      control: { type: 'select' },
      options: ['xxsm', 'xsm', 'sm', 'lg', 'xlg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
    },
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiLink },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-link v-bind="args" href="https://contentrain.io/"> {{ args.label }} </lui-link>`,
})
const VueLinkTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiLink },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-link v-bind="args" to="https://contentrain.io/"> {{ args.label }} </lui-link>`,
})

export const Small = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Small.args = {
  size: 'sm',
  variant: 'primary',
}
export const Large = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Large.args = {
  size: 'lg',
  variant: 'success',
}

export const FrameworkLink = VueLinkTemplate.bind({})

FrameworkLink.args = {
  size: 'lg',
  variant: 'success',
}