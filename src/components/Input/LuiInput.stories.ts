import LuiInput from './LuiInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import {
  block,
  rounded,
  size,
  prepend,
  disabled,
  description,
  state,
  stateIcon
} from '../../../.storybook/global-story-argtypes'
import { IconSize } from './input-types'

const meta: Meta<typeof LuiInput> = {
  title: 'LUI/Input',
  component: LuiInput,
  argTypes: {
    block,
    rounded,
    size,
    prepend,
    disabled,
    description,
    state,
    stateIcon,
    clear: {
      control: { type: 'boolean' }
    },
    onInput: {
      action: 'typing'
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiInput>

export const Default: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      return { args }
    },
    template: '<lui-input v-bind="args" placeholder="type something" />'
  })
}
export const Medium: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      return { args }
    },
    template: '<lui-input v-bind="args" placeholder="type something" />',
    args: {
      rounded: true,
      size: 'md'
    }
  })
}
export const Description: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      return { args }
    },
    template: '<lui-input v-bind="args" placeholder="type something" />',
    args: {
      description: 'Input description text'
    }
  })
}
export const StateIcon: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      return { args }
    },
    template: '<lui-input v-bind="args" placeholder="type something" />',
    args: {
      stateIcon: true
    }
  })
}
export const Clear: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, sizes }
    },
    template: `
    <div class="flex items-center space-x-8">
      <lui-input v-bind="args"
        v-for="size in sizes"
        :key="size"   
        :size="size" 
        placeholder="Type something"
        clear 
      />
    </div>
  `
  })
}
export const States: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      const states = ['warning', true, false]
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, states, sizes }
    },
    template: `
    <div class="flex space-x-8 mb-8" v-for="size in sizes" :key="size">
      <lui-input v-bind="args"
        v-for="state in states"
        :key="state"   
        :size="size" 
        :state="state" 
        placeholder="Type something" 
        state-icon 
      />
    </div>
  `
  })
}

export const PrependIcon: Story = {
  render: (args) => ({
    components: { LuiInput },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      function iconSizes(size: IconSize) {
        return size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'xl' ? '24' : '20'
      }
      return { args, sizes, iconSizes }
    },
    template: `
    <div class="flex items-center space-x-8">
      <lui-input 
        v-for="size in sizes" :key="size"
        v-bind="args"
        :size="size" 
        placeholder="Type something" 
      >
        <template #prepend>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="iconSizes(size)" :height="iconSizes(size)" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg>
        </template>
      </lui-input>
    </div>
  `
  })
}
