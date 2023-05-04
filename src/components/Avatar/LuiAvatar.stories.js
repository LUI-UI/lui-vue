import LuiAvatar from './LuiAvatar.vue'
import {
  color,
  size,
  filter,
  border,
  icon,
  rounded
} from '../../../.storybook/global-story-argtypes'
// const sizeList = size.options;
// const colorList = color.options;
// const filterList = filter.options;
export default {
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
  }
}
const DefaultTemplate = (args) => ({
  components: { LuiAvatar },
  setup() {
    return { args }
  },
  template: `<lui-avatar v-bind="args" />`
})
export const Default = DefaultTemplate.bind({})
Default.args = { size: 'md' }

// export const VariantTemplate = (args) => ({
//   components: { LuiAvatar },
//   setup() {
//     const variants = ["solid", "outline"];
//     return { args, variants };
//   },
//   template: `
//   <div v-for="variant in variants" key="variant" class="flex items-center space-x-4 mb-4">
//   <lui-avatar v-bind="args" :variant="variant"/>
//     <lui-avatar v-bind="args" :variant="variant" text="AB"/>
//     <lui-avatar v-bind="args" :variant="variant">
//       <template #icon>
//       <i class="ri-user-line"></i>
//       </template>
//     </lui-avatar>
//     <pre>{{variant}}</pre>
//   </div>
//   `,
// });
// export const Variants = VariantTemplate.bind({});

// const ColorTemplate = (args) => ({
//   components: { LuiAvatar },
//   setup() {
//     const colors = colorList;
//     const filters = filterList;
//     return { args, colors, filters };
//   },
//   template: `
// <div v-for="filter in filters" :key="filter">
// <pre>{{filter}}</pre>

//     <div class="space-x-4 mb-4">
//     <lui-avatar v-bind="args" v-for="color in colors" key="color" :color="color" :filter="filter"/>
//     </div>
//     <div class="space-x-4 mb-4">
//     <lui-avatar v-bind="args" v-for="color in colors" key="color" :color="color" text="AB" :filter="filter"/>
//     </div>
//     <div class="space-x-4 mb-4">
//     <lui-avatar v-bind="args" v-for="color in colors" key="color" :color="color" :filter="filter">
//       <template #icon>
//       <i class="ri-user-line"></i>
//       </template>
//     </lui-avatar>
//     </div>

// </div>

//   `,
// });
// export const Colors = ColorTemplate.bind({});

// const SizeTemplate = (args) => ({
//   components: { LuiAvatar },
//   setup() {
//     const sizes = sizeList;
//     return { args, sizes };
//   },
//   template: `
//   <div class="space-x-4 mb-4">
//   <lui-avatar v-bind="args" v-for="size in sizes" key="size" :size="size"/>
//   </div>
//   <div class="space-x-4 mb-4">
//   <lui-avatar v-bind="args" v-for="size in sizes" key="size" :size="size" text="AB"/>
//   </div>
//   <div class="space-x-4 mb-4">
//   <lui-avatar v-bind="args" v-for="size in sizes" key="size" :size="size">
//     <template #icon>
//     <i class="ri-user-line"></i>
//     </template>
//   </lui-avatar>
//   </div>

//   `,
// });
// export const Sizes = SizeTemplate.bind({});
// const PositionTemplate = (args) => ({
//   components: { LuiAvatar },
//   setup() {
//     const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
//     return { args, positions };
//   },
//   template: `
//     <div
//       v-for="position in positions"
//       :key="position"
//       class="p-6 flex space-x-12"
//     >
//       <div class="space-x-4 mb-4">
//         <lui-avatar v-bind="args" color="success" :position="position">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//         </lui-avatar>
//       </div>
//       <div class="space-x-4 mb-4">
//         <lui-avatar v-bind="args" color="warning" :position="position" text="9">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//         </lui-avatar>
//       </div>
//       <div class="space-x-4 mb-4">
//         <lui-avatar v-bind="args" color="danger" :position="position">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//           <template #icon>
//             <i class="ri-wifi-off-fill"></i>
//           </template>
//         </lui-avatar>
//       </div>
//     </div>
//   `,
// });
// export const Positions = PositionTemplate.bind({});

// const BorderTemplate = (args) => ({
//   components: { LuiAvatar },
//   setup() {
//     const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
//     return { args, positions };
//   },
//   template: `
//     <div
//       v-for="position in positions"
//       :key="position"
//       class="p-6 flex space-x-12"
//     >
//       <div class="space-x-4 mb-4">
//         <lui-avatar v-bind="args" color="success" :position="position" :border="true">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//         </lui-avatar>
//       </div>
//       <div class="space-x-4 mb-4">
//         <lui-avatar v-bind="args" color="warning" :position="position" :border="true" text="9">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//         </lui-avatar>
//       </div>
//       <div class="space-x-4 mb-4">
//         <lui-avatar v-bind="args" color="danger" :position="position" :border="true">
//           <div
//             class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//           >
//             <i class="ri-user-line"></i>
//           </div>
//           <template #icon>
//             <i class="ri-wifi-off-fill"></i>
//           </template>
//         </lui-avatar>
//       </div>
//     </div>
//   `,
// });
// export const Border = BorderTemplate.bind({});
