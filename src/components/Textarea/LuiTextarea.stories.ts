import LuiTextarea from './LuiTextarea.vue'
import {
  rounded,
  size,
  state,
  description,
  stateIcon,
  block
} from '../../../.storybook/global-story-argtypes'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiTextarea> = {
  title: 'LUI/Textarea',
  component: LuiTextarea,
  argTypes: {
    rounded,
    size,
    description,
    state,
    stateIcon,
    block,
    resize: {
      control: { type: 'select' },
      options: [true, false, 'x', 'y']
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiTextarea>

export const TestTemplate: Story = {
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LuiTextarea },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const message = ref('okey google!')
      return { args, message }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
    {{message}}
    <lui-textarea v-bind="args" placeholder="text placeholder" v-model="message" />
  `
  })
}
export const Medium: Story = {
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LuiTextarea },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const message = ref('okey google!')
      return { args, message }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
    {{message}}
    <lui-textarea v-bind="args" placeholder="text placeholder" v-model="message" />
  `,
    args: {
      size: 'md'
    }
  })
}
