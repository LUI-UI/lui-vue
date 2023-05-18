import LuiBadge from './LuiBadge.vue'
import { color, size, filter, border } from '../../../.storybook/global-story-argtypes'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const sizeList = size.options
const colorList = color.options
const filterList = filter.options

const meta: Meta<typeof LuiBadge> = {
  title: 'LUI/Badge',
  component: LuiBadge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'My badge variant'
    },
    color,
    size,
    filter,
    border,
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'bottom-right'
    },
    text: {
      control: 'text'
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiBadge>

export const Default: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const activeColor = ref('secondary')
      return { args, activeColor }
    },
    template: ` <button @click="activeColor = 'primary'">change color!</button> {{activeColor}} <lui-badge v-bind="args" :color="activeColor" />`
  })
}
export const VariantTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const variants = ['solid', 'outline']
      return { args, variants }
    },
    template: `
    <div v-for="variant in variants" key="variant" class="flex items-center space-x-4 mb-4">
    <lui-badge v-bind="args" :variant="variant"/>
      <lui-badge v-bind="args" :variant="variant" text="Badge"/>
      <lui-badge v-bind="args" :variant="variant">
        <template #icon>
        <i class="ri-user-line"></i>
        </template>
      </lui-badge>
      <pre>{{variant}}</pre>
    </div>
    `
  })
}

export const ColorTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const colors = colorList
      const filters = filterList
      return { args, colors, filters }
    },
    template: `
  <div v-for="filter in filters" :key="filter">
  <pre>{{filter}}</pre>
  
      <div class="space-x-4 mb-4">
      <lui-badge v-bind="args" v-for="color in colors" key="color" :color="color" :filter="filter"/>
      </div>
      <div class="space-x-4 mb-4">
      <lui-badge v-bind="args" v-for="color in colors" key="color" :color="color" text="Badge" :filter="filter"/>
      </div>
      <div class="space-x-4 mb-4">
      <lui-badge v-bind="args" v-for="color in colors" key="color" :color="color" :filter="filter">
        <template #icon>
        <i class="ri-user-line"></i>
        </template>
      </lui-badge>
      </div>
  
  </div>
    
    `
  })
}
export const SizeTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const sizes = sizeList
      return { args, sizes }
    },
    template: `
    <div class="space-x-4 mb-4">
    <lui-badge v-bind="args" v-for="size in sizes" key="size" :size="size"/>
    </div>
    <div class="space-x-4 mb-4">
    <lui-badge v-bind="args" v-for="size in sizes" key="size" :size="size" text="Badge"/>
    </div>
    <div class="space-x-4 mb-4">
    <lui-badge v-bind="args" v-for="size in sizes" key="size" :size="size">
      <template #icon>
      <i class="ri-user-line"></i>
      </template>
    </lui-badge>
    </div>
    
    `
  })
}

export const PositionTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      return { args, positions }
    },
    template: `
      <div
        v-for="position in positions"
        :key="position"
        class="p-6 flex space-x-12"
      >
        <div class="space-x-4 mb-4">
          <lui-badge v-bind="args" color="success" :position="position">
            <div
              class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
            >
              <i class="ri-user-line"></i>
            </div>
          </lui-badge>
        </div>
        <div class="space-x-4 mb-4">
          <lui-badge v-bind="args" color="warning" :position="position" text="9">
            <div
              class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
            >
              <i class="ri-user-line"></i>
            </div>
          </lui-badge>
        </div>
        <div class="space-x-4 mb-4">
          <lui-badge v-bind="args" color="danger" :position="position">
            <div
              class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
            >
              <i class="ri-user-line"></i>
            </div>
            <template #icon>
              <i class="ri-wifi-off-fill"></i>
            </template>
          </lui-badge>
        </div>
      </div>
    `
  })
}
export const BorderTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      return { args, positions }
    },
    template: `
    <div
      v-for="position in positions"
      :key="position"
      class="p-6 flex space-x-12"
    >
      <div class="space-x-4 mb-4">
        <lui-badge v-bind="args" color="success" :position="position" :border="true">
          <div
            class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
          >
            <i class="ri-user-line"></i>
          </div>
        </lui-badge>
      </div>
      <div class="space-x-4 mb-4">
        <lui-badge v-bind="args" color="warning" :position="position" :border="true" text="9">
          <div
            class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
          >
            <i class="ri-user-line"></i>
          </div>
        </lui-badge>
      </div>
      <div class="space-x-4 mb-4">
        <lui-badge v-bind="args" color="danger" :position="position" :border="true">
          <div
            class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
          >
            <i class="ri-user-line"></i>
          </div>
          <template #icon>
            <i class="ri-wifi-off-fill"></i>
          </template>
        </lui-badge>
      </div>
    </div>
  `
  })
}
