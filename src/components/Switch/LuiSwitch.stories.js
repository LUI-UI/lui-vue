import LuiSwitch from './LuiSwitch.vue'
import {
  rounded,
  size,
  disabled,
  state,
  description
} from '../../../.storybook/global-story-argtypes'

export default {
  title: 'LUI/Switch',
  component: LuiSwitch,
  argTypes: {
    rounded,
    size,
    disabled,
    description,
    state,
    onChange: {
      action: 'switch change'
    }
  }
}
const Template = (args) => ({
  components: { LuiSwitch },
  data() {
    return {
      test: false,
      names: []
    }
  },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div class="p-2">{{names}}</div>
    <div class="p-2 space-x-4">
      <lui-switch v-bind="args" id="burak" value="burak" v-model="names" />
      <lui-switch v-bind="args" id="eser" value="eser" v-model="names" />
      <lui-switch v-bind="args" id="fatih" value="fatih" v-model="names" />
    </div>
  `
})
export const Medium = Template.bind({})
Medium.args = { size: 'md' }
export const Rounded = Template.bind({})
Rounded.args = { rounded: true }
export const Disabled = Template.bind({})
Disabled.args = { disabled: true, checked: true }
export const Sizes = (args) => ({
  components: { LuiSwitch },
  setup() {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    return { args, sizes }
  },
  template: `
    <div class="flex items-center space-x-8">
      <lui-switch v-bind="args" v-for="size in sizes" :key="size" :size="size" />
    </div>
  `
})
export const Description = (args) => ({
  components: { LuiSwitch },
  setup() {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    const states = [true, false, null, 'warning']
    return { args, sizes, states }
  },
  template: `
    <div class="flex flex-col space-y-8">
      <div v-for="state in states" :key="state" class="flex items-center space-x-6">
        <lui-switch v-bind="args" v-for="size in sizes" :key="size" :size="size" :state="state" description="Switch description" />
      </div>
    </div>
  `
})
