import LuiChip from './LuiChip.vue'
// import { variant, filter, rounded, roundedFull, icon, prepend,sizetest } from '../../utils/storyProps'
import * as prop from '../../utils/storyProps'
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'LuiChip',
  component: LuiChip,
  args: {
    label: 'chip',
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    variant: prop.variant,
    filter: prop.filter,
    rounded: prop.rounded,
    roundedFull: prop.roundedFull,
    icon: prop.icon,
    prepend: prop.prepend,
    size: prop.sizeTriple,
    type: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
    iconLine: {
      control: { type: 'boolean' },
    },
    clickAble: {
      control: { type: 'boolean' },
    },
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiChip },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-chip v-bind="args"> {{args.label}} </lui-chip>`,
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
