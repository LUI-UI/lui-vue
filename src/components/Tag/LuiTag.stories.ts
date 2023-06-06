import LuiTag from './LuiTag.vue'
import { color, size, filter, border } from '../../../.storybook/global-story-argtypes'
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
    filter,
    border,
    text: {
      control: 'text'
    }
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
    template: `<lui-tag v-bind="args" text="tag"/>`
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
    <lui-tag v-bind="args" text="tag"/>
    <lui-tag v-bind="args" text="tag" :show-append="false"/>
    <lui-tag v-bind="args" text="tag">
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
    </lui-tag>
    <lui-tag v-bind="args" text="tag" :show-append="false">
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
    </lui-tag>
    </div>
    `
  })
}

// export const ColorTemplate: Story = {
//   render: (args) => ({
//     components: { Luitag },
//     setup() {
//       const colors = colorList
//       const filters = filterList
//       return { args, colors, filters }
//     },
//     template: `
//   <div v-for="filter in filters" :key="filter">
//   <pre>{{filter}}</pre>

//       <div class="space-x-4 mb-4">
//       <lui-tag v-bind="args" v-for="color in colors" key="color" :color="color" :filter="filter"/>
//       </div>
//       <div class="space-x-4 mb-4">
//       <lui-tag v-bind="args" v-for="color in colors" key="color" :color="color" text="tag" :filter="filter"/>
//       </div>
//       <div class="space-x-4 mb-4">
//       <lui-tag v-bind="args" v-for="color in colors" key="color" :color="color" :filter="filter">
//         <template #icon>
//         <i class="ri-user-line"></i>
//         </template>
//       </lui-tag>
//       </div>

//   </div>

//     `
//   })
// }
// export const SizeTemplate: Story = {
//   render: (args) => ({
//     components: { Luitag },
//     setup() {
//       const sizes = sizeList
//       return { args, sizes }
//     },
//     template: `
//     <div class="space-x-4 mb-4">
//     <lui-tag v-bind="args" v-for="size in sizes" key="size" :size="size"/>
//     </div>
//     <div class="space-x-4 mb-4">
//     <lui-tag v-bind="args" v-for="size in sizes" key="size" :size="size" text="tag"/>
//     </div>
//     <div class="space-x-4 mb-4">
//     <lui-tag v-bind="args" v-for="size in sizes" key="size" :size="size">
//       <template #icon>
//       <i class="ri-user-line"></i>
//       </template>
//     </lui-tag>
//     </div>

//     `
//   })
// }

// export const BorderTemplate: Story = {
//   render: (args) => ({
//     components: { Luitag },
//     setup() {
//       const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
//       return { args, positions }
//     },
//     template: `
//     <div
//       v-for="position in positions"
//       :key="position"
//       class="p-6 flex space-x-12"
//     >
//       <div class="space-x-4 mb-4">
//         <lui-tag v-bind="args" color="success" :position="position" :border="true">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//         </lui-tag>
//       </div>
//       <div class="space-x-4 mb-4">
//         <lui-tag v-bind="args" color="warning" :position="position" :border="true" text="9">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//         </lui-tag>
//       </div>
//       <div class="space-x-4 mb-4">
//         <lui-tag v-bind="args" color="danger" :position="position" :border="true">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//           <template #icon>
//             <i class="ri-wifi-off-fill"></i>
//           </template>
//         </lui-tag>
//       </div>
//     </div>
//   `
//   })
// }
