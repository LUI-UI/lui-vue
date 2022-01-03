import LuiText from './LuiText.vue'

export default {
  title: 'LuiText',
  component: LuiText,
  args: {
    label: 'lui text',
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
    },
    tag: {
      control: { type: 'select' },
      options: [
        'p',
        'span',
        'br',
        'strong',
        'em',
        'quotes',
        'blockquote',
        'code',
        'pre',
        'mark',
        'ins',
        'del',
        'sup',
        'sub',
        'small',
        'i',
        'b',
        'abbr',
        'address',
        'bdi',
        'bdo',
        'cite',
        'dfn',
        'kbs',
        'meter',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'time',
        'u',
        'var',
        'wbr',
      ],
    },
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiText },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-text v-bind="args"> {{ args.label }} </lui-text>`,
})

export const Small = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Small.args = {
  size: 'sm',
  variant: 'secondary',
  tag: 'p',
}
export const Large = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Large.args = {
  size: 'lg',
  variant: 'secondary',
  tag: 'p',
}
