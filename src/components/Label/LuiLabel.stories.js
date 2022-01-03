import LuiLabel from './LuiLabel.vue'

export default {
  title: 'LuiLabel',
  component: LuiLabel,
  args: {
    label: "label",
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
    },
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiLabel },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-label v-bind="args"> {{ args.label }} </lui-label>`,
})


export const Small = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Small.args = {
  size: 'sm',
}
export const Large = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Large.args = {
  size: 'lg',
}