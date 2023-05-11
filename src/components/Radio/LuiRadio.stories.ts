import LuiRadio from './LuiRadio.vue'
import { ref } from 'vue'
import { size, disabled, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiRadio> = {
  title: 'LUI/Radio',
  component: LuiRadio,
  argTypes: {
    size,
    disabled,
    description,
    state,
    onChange: {
      action: 'checked change'
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiRadio>
export const Template: Story = {
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LuiRadio },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const checkedName = ref('Jack')
      return { args, checkedName }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    // <lui-checkbox v-bind="args" v-model="test" />
    template: `
  <div class="p-3">{{checkedName}}</div>
    <div class="p-2 space-x-4">
      <lui-radio v-bind="args" id="jack" name="cnames" value="Jack" v-model="checkedName" />
      <lui-radio v-bind="args" id="john" name="cnames" value="John" v-model="checkedName" />
      <lui-radio v-bind="args" id="mike" name="cnames" value="Mike" v-model="checkedName" />
    </div>`
  })
}
export const Medium: Story = {
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LuiRadio },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const checkedName = ref('Jack')
      return { args, checkedName }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    // <lui-checkbox v-bind="args" v-model="test" />
    template: `
  <div class="p-3">{{checkedName}}</div>
    <div class="p-2 space-x-4">
      <lui-radio v-bind="args" id="jack" name="cnames" value="Jack" v-model="checkedName" />
      <lui-radio v-bind="args" id="john" name="cnames" value="John" v-model="checkedName" />
      <lui-radio v-bind="args" id="mike" name="cnames" value="Mike" v-model="checkedName" />
    </div>`,
    args: {
      size: 'md'
    }
  })
}
export const Disabled: Story = {
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LuiRadio },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const checkedName = ref('Jack')
      return { args, checkedName }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    // <lui-checkbox v-bind="args" v-model="test" />
    template: `
  <div class="p-3">{{checkedName}}</div>
    <div class="p-2 space-x-4">
      <lui-radio v-bind="args" id="jack" name="cnames" value="Jack" v-model="checkedName" />
      <lui-radio v-bind="args" id="john" name="cnames" value="John" v-model="checkedName" />
      <lui-radio v-bind="args" id="mike" name="cnames" value="Mike" v-model="checkedName" />
    </div>`,
    args: {
      disabled: true
    }
  })
}
export const Description: Story = {
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LuiRadio },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const checkedName = ref('Jack')
      return { args, checkedName }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    // <lui-checkbox v-bind="args" v-model="test" />
    template: `
  <div class="p-3">{{checkedName}}</div>
    <div class="p-2 space-x-4">
      <lui-radio v-bind="args" id="jack" name="cnames" value="Jack" v-model="checkedName" />
      <lui-radio v-bind="args" id="john" name="cnames" value="John" v-model="checkedName" />
      <lui-radio v-bind="args" id="mike" name="cnames" value="Mike" v-model="checkedName" />
    </div>`,
    args: {
      description: 'Radio description'
    }
  })
}

export const Sizes: Story = {
  render: (args) => ({
    components: { LuiRadio },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, sizes }
    },
    template: `
    <div class="flex items-center space-x-4">
      <lui-radio v-bind="args" v-for="size in sizes" :key="size" :size="size" :checked="true" />
    </div>
  `
  })
}
