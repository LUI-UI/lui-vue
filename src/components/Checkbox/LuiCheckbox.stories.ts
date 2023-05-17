import LuiCheckbox from './LuiCheckbox.vue'
import { size, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiCheckbox> = {
  title: 'LUI/Checkbox',
  component: LuiCheckbox,
  argTypes: {
    size,
    description,
    state,
    rounded: {
      control: 'select',
      options: [true, false, 'full']
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiCheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { LuiCheckbox },
    setup() {
      return { args }
    },
    template: `<lui-checkbox v-bind="args" />`
  })
}
export const Rounded: Story = {
  render: (args) => ({
    components: { LuiCheckbox },
    setup() {
      const roundedes = [false, true, 'full']
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, roundedes, sizes }
    },
    template: `
    <div class="space-y-6">
      <div v-bind="args" v-for="rounded in roundedes" :key="rounded" class="flex items-center space-x-6">
        <lui-checkbox v-for="size in sizes" :key="size" :rounded="rounded" :checked="true" :size="size" />
      </div>
    </div>
  `
  })
}
export const Description: Story = {
  render: (args) => ({
    components: { LuiCheckbox },
    setup() {
      const states = [true, false, 'warning', 'null']
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, states, sizes }
    },
    template: `
    <div class="flex flex-col space-y-10">
      <div v-for="state in states" :key="state" class="flex items-center space-x-8">
        <lui-checkbox v-bind="args" v-for="size in sizes" :key="size" :size="size" :state="state" :checked="true" description="This is description text" />
      </div>
    </div>
  `
  })
}
export const Indeterminate: Story = {
  render: (args) => ({
    components: { LuiCheckbox },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, sizes }
    },
    template: `
    <div class="flex items-center space-x-4">
      <lui-checkbox v-bind="args" v-for="size in sizes" :key="size" :size="size" :indeterminate="true" :checked="true" />
    </div>
  `
  })
}
