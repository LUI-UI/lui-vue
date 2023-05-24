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

export const Test: Story = {
  render: () => ({
    components: { LuiTextarea },
    setup() {
      const message = ref('okey google!')
      return { message }
    },
    template: `
    {{message}}
    <lui-textarea placeholder="text placeholder" v-model="message" />
  `
  })
}
export const Medium: Story = {
  render: () => ({
    components: { LuiTextarea },
    setup() {
      const message = ref('okey google!')
      return { message }
    },
    template: `
    {{message}}
    <lui-textarea placeholder="text placeholder" v-model="message" />
  `,
    args: { size }
  })
}
