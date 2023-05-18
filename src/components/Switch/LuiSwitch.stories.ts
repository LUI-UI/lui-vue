import LuiSwitch from './LuiSwitch.vue'
import { rounded, size, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiSwitch> = {
  title: 'LUI/Switch',
  component: LuiSwitch,
  argTypes: {
    rounded,
    size,
    description,
    state
  }
}
export default meta
type Story = StoryObj<typeof LuiSwitch>

export const Template: Story = {
  render: (args) => ({
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
    template: `
  <div class="p-2">{{names}}</div>
    <div class="p-2 space-x-4">
      <lui-switch v-bind="args" id="burak" value="burak" v-model="names" />
      <lui-switch v-bind="args" id="eser" value="eser" v-model="names" />
      <lui-switch v-bind="args" id="fatih" value="fatih" v-model="names" />
    </div>
  `
  })
}
export const Medium: Story = {
  render: (args) => ({
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
    template: `
  <div class="p-2">{{names}}</div>
    <div class="p-2 space-x-4">
      <lui-switch v-bind="args" id="burak" value="burak" v-model="names" />
      <lui-switch v-bind="args" id="eser" value="eser" v-model="names" />
      <lui-switch v-bind="args" id="fatih" value="fatih" v-model="names" />
    </div>
  `,
    args: {
      size: 'md'
    }
  })
}
export const Rounded: Story = {
  render: (args) => ({
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
    template: `
  <div class="p-2">{{names}}</div>
    <div class="p-2 space-x-4">
      <lui-switch v-bind="args" id="burak" value="burak" v-model="names" />
      <lui-switch v-bind="args" id="eser" value="eser" v-model="names" />
      <lui-switch v-bind="args" id="fatih" value="fatih" v-model="names" />
    </div>
  `,
    args: {
      rounded: true
    }
  })
}
export const Disabled: Story = {
  render: (args) => ({
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
    template: `
  <div class="p-2">{{names}}</div>
    <div class="p-2 space-x-4">
      <lui-switch v-bind="args" id="burak" value="burak" v-model="names" />
      <lui-switch v-bind="args" id="eser" value="eser" v-model="names" />
      <lui-switch v-bind="args" id="fatih" value="fatih" v-model="names" />
    </div>
  `,
    args: {
      disabled: true,
      checked: true
    }
  })
}
export const Sizes: Story = {
  render: (args) => ({
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
}
export const Description: Story = {
  render: (args) => ({
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
}
