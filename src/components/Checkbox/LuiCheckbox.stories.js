import LuiCheckbox from './LuiCheckbox.vue'
import { size, disabled, state, description } from '../../../.storybook/global-story-argtypes'
export default {
  title: 'LUI/Checkbox',
  component: LuiCheckbox,
  argTypes: {
    size,
    disabled,
    description,
    state,
    rounded: {
      control: 'select',
      options: [true, false, 'full']
    },
    onChange: {
      action: 'checked change'
    }
  }
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // args: {}, set default args for all components
}

// const Template = (args) => ({
//   components: { LuiCheckbox },
//   data() {
//     return {
//       e: false,
//       b: null,
//       checkedNames: ["Mike"],
//       nativeNames: ["b"],
//     };
//   },
//   setup() {
//     return { args };
//   },
//   template: `
//   <div class="p-3">{{checkedNames}} - {{e}}</div>
//     <button class="bg-primary-500 text-white p-1 rounded" @click="checkedNames.push('John')">add new</button>
//     <div class="p-2 space-x-4">
//       <lui-checkbox v-bind="args" id="jack" value="Jack" v-model="checkedNames" />
//       <lui-checkbox v-bind="args" id="john" value="John" v-model="checkedNames" />
//       <lui-checkbox v-bind="args" id="mike" value="Mike" v-model="checkedNames" />
//     </div>
//     <div class="p-2">
//       <lui-checkbox v-bind="args" v-model="e" />
//     </div>`,
// });

// Default - Rounded - Description - Indeterminate

// export const Medium = Template.bind({});
// Medium.args = { rounded: true, size: "md" };
export const Default = (args) => ({
  components: { LuiCheckbox },
  setup() {
    return { args }
  },
  template: `<lui-checkbox v-bind="args" />`
})
export const Rounded = (args) => ({
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
// export const Indeterminate = (args) => ({
//   components: { LuiCheckbox },
//   setup() {
//     return { args };
//   },
//   template: ``,
// });
// export const Disabled = Template.bind({});
// Disabled.args = { rounded: true, disabled: true };
// export const RoundedFull = Template.bind({});
// RoundedFull.args = { rounded: "full" };
// export const Description = Template.bind({});
// Description.args = { description: "checkbox description" };
export const Description = (args) => ({
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
export const Indeterminate = (args) => ({
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
