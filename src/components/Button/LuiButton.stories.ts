import LuiButton from './LuiButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import {
  variant,
  color,
  block,
  rounded,
  size,
  filter,
  disabled
} from '../../../.storybook/global-story-argtypes'
import { ButtonSize } from './button-types'

const meta: Meta<typeof LuiButton> = {
  title: 'LUI/Button',
  component: LuiButton,
  argTypes: {
    variant,
    color,
    block,
    rounded,
    size,
    filter,
    disabled,
    tag: {
      control: { type: 'select' },
      options: ['button', 'div', 'a']
    },
    onClick: {
      action: 'just clicked'
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiButton>

export const Default: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      return { args }
    },
    template: `<lui-button v-bind="args">My Button</lui-button>`
  })
}

export const Rounded: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const roundedValues = [false, true, 'full']
      return { args, roundedValues }
    },
    template: `
  <div class="flex space-x-4">
      <div class="flex flex-col" v-for="(value,index) in roundedValues" :key="index">
      <lui-button v-bind="args" :rounded="roundedValues[index]">
      <span>My Button</span>
    </lui-button>
      </div>
  </div>`
  })
}
export const Variants: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      return { args }
    },
    template: `
  <div class="space-x-2">
    <lui-button v-bind="args" variant="solid">Solid</lui-button>
    <lui-button v-bind="args" variant="outline">Outline</lui-button>
    <lui-button v-bind="args" variant="link">Link</lui-button>
    <lui-button v-bind="args" variant="text">Text</lui-button>
  </div>`
  })
}
export const Colors: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
      return { args, colors }
    },
    template: `
  <div class="space-x-2">
    <lui-button v-for="color in colors" :key="color" v-bind="args" :color="color">
      {{color}}
    </lui-button>
  </div>
  <div class="space-x-2 space-y-2">
    <lui-button v-for="color in colors" :key="color" v-bind="args" filter="darken" :color="color">
      Darken
    </lui-button>
  </div>
  <div class="space-x-2 space-y-2">
    <lui-button v-for="color in colors" :key="color" v-bind="args" filter="lighten" :color="color">
      Lighten
    </lui-button>
  </div>
  
  `
  })
}
export const Sizes: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      function iconSize(size: ButtonSize) {
        return size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'xl' ? '24' : '20'
      }
      return { args, sizes, iconSize }
    },
    template: `<div class="flex items-center space-x-4">
    <div v-for="size in sizes" :key="size">
      <lui-button v-bind="args" :size="size">
        <span>LuiButton</span>
        <template #append>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="iconSize(size)" :height="iconSize(size)" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>
        </template>
      </lui-button>
    </div>
  </div>`
  })
}
export const IconButton: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      const roundedValues = [false, true, 'full']
      function iconSize(size: ButtonSize) {
        return size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'xl' ? '24' : '20'
      }
      return { args, sizes, roundedValues, iconSize }
    },
    template: `
  <div class="space-y-6">
    <div v-bind="args" class="flex items-center space-x-6" v-for="value in roundedValues" :key="value">
      <div class="flex" v-for="size in sizes" :key="size">
        <lui-button :size="size" :rounded="value">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="iconSize(size)" :height="iconSize(size)" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>
          </template>
        </lui-button>
      </div>
    </div>
  </div>`
  })
}
