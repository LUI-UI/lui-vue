import LIcon from './LuiIcon.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'LuiIcon',
  component: LIcon,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    name: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: [
        'lg',
        'xl',
        'xxs',
        'xs',
        'sm',
        'md',
        '1x',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x',
        'fw',
      ],
    },
    fill: {
      control: { type: 'boolean' },
    },
    line: {
      control: { type: 'boolean' },
    },
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<l-icon v-bind="args" />`,
})

export const Home = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Home.args = {
  size: 'xl',
  fill: true, 
  name: 'home'
}

export const Mail = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Mail.args = {
  size: 'xl',
  fill: true, 
  name: 'mail'
}