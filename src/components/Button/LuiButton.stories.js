import LButton from './LuiButton.vue'
import { variant, block, filter, rounded, roundedFull, icon, prepend } from '../../utils/storyProps'
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'LuiButton',
  component: LButton,
  args: {
    label: 'test',
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    onClick: {},
    variant,
    block,
    filter,
    rounded,
    roundedFull,
    icon, 
    prepend,
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'text', 'outline', 'link', 'link-underline'],
    },
    disableStyles:{
      control: { type: 'multi-select' },
      options: ['hover', 'focus', 'disable', 'underline',true,false],
    },
    uppercase: {
      control: { type: 'boolean' }
    }
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<l-button v-bind="args" :disabled="args.disable"> {{args.label}} </l-button>`,
})
const IconTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<l-button v-bind="args" :disabled="args.disable"></l-button>`,
})

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  type: 'default',
}
export const Outline = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Outline.args = {
  type: 'outline',
}
export const Text = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Text.args = {
  type: 'text',
}
export const IconButton = IconTemplate.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
IconButton.args = {
  icon: 'home',
}