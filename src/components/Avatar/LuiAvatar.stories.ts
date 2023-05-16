import LuiAvatar from './LuiAvatar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import {
  color,
  size,
  filter,
  border,
  icon,
  rounded
} from '../../../.storybook/global-story-argtypes'

const meta: Meta<typeof LuiAvatar> = {
  title: 'LUI/Avatar',
  component: LuiAvatar,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'My avatar variant'
    },
    color,
    size,
    filter,
    icon,
    border,
    rounded,
    text: {
      control: 'text'
    },
    src: {
      control: 'text'
    },
    alt: {
      control: 'text'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'This is a super avatar description!'
      }
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
