import LInput from './LuiInput.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'LuiInput',
  component: LInput,
  args: {
    disable: false,
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: { type: 'select' },
      options: [null, 'warning', true, false],
    },
    clear: {
      control: { type: 'boolean' },
    },
    description: {
      control: { type: 'text' },
    },
    prepend: {
      control: { type: 'select' },
      options: ['search', 'search-2', 'search-eye','none'],
    }
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<l-input v-bind="args" :disabled="args.disable"> {{ args.label }} </l-input>`,
})

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  size: 'sm',
  state: null
}
export const Warning = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Warning.args = {
  size: 'sm',
  state: 'warning'
}
export const Danger = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Danger.args = {
  size: 'sm',
  state: false
}
export const Success = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Success.args = {
  size: 'sm',
  state: true
}