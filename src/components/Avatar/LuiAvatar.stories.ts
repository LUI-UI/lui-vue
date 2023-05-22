import LuiAvatar from './LuiAvatar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import { variant, color, size, rounded } from '../../../.storybook/global-story-argtypes'

const meta: Meta<typeof LuiAvatar> = {
  title: 'LUI/Avatar',
  component: LuiAvatar,
  argTypes: {
    variant,
    color,
    size,
    rounded,
    filter: {},
    border: {},
    text: {
      control: 'text'
    },
    src: {
      control: 'text'
    },
    alt: {
      control: 'text'
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiAvatar>

export const Default: Story = {
  render: (args) => ({
    components: { LuiAvatar },
    setup() {
      return { args }
    },
    template: `<lui-avatar v-bind="args" />`
  }),
  args: {
    size: 'md'
  }
}
