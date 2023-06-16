import LuiTag from './LuiTag.vue'
import { color, size, filter } from '../../../.storybook/global-story-argtypes'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

// const sizeList = size.options
// const colorList = color.options
// const filterList = filter.options

const meta: Meta<typeof LuiTag> = {
  title: 'LUI/Tag',
  component: LuiTag,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'My tag variant'
    },
    color,
    size,
    filter
  }
}
export default meta

type Story = StoryObj<typeof LuiTag>

export const Default: Story = {
  render: (args) => ({
    components: { LuiTag },
    setup() {
      const activeColor = ref('secondary')
      return { args, activeColor }
    },
    template: `<lui-tag v-bind="args">Tag</lui-tag>`
  })
}
export const VariantTemplate: Story = {
  render: (args) => ({
    components: { LuiTag },
    setup() {
      const variants = ['solid', 'outline']
      return { args, variants }
    },
    template: `
    <div class="flex items-center space-x-4 mb-4">
    <lui-tag v-bind="args">Tag</lui-tag>
    <lui-tag v-bind="args" :close-icon="false">Tag</lui-tag>
    <lui-tag v-bind="args">
    <template #prepend>
      <i class="ri-close-line" />
    </template>
      Tag
    </lui-tag>
    <lui-tag v-bind="args" :close-icon="false">
      <template #prepend>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        height="12px"
        width="12px"
        >
          <path
            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
          ></path>
        </svg>
      </template>
      Tag
    </lui-tag>
    </div>
    `
  })
}
