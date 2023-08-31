import type { Meta, StoryObj } from '@storybook/vue3'
import LuiPopover from './LuiPopover.vue'

// const sizeList = size.options
// const colorList = color.options
// const filterList = filter.options

const meta: Meta<typeof LuiPopover> = {
  title: 'LUI/Popover',
  component: LuiPopover,
  argTypes: {
    dialogPosition: {
      control: 'select',
      options: ['bottomLeft',
        'bottomRight',
        'topLeft',
        'topRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom'],
    },
    text: {
      control: 'text',
    },
    block: {
      control: 'boolean',
    },
  },
}
export default meta

type Story = StoryObj<typeof LuiPopover>

const defaultTemplate = `
<lui-popover v-bind="args">
  <button>Test</button>
  <div>
  <button>test</button>
  <p>test text</p>
  <p>test text</p>
  <a href="/">some link</a>
  </div>
</lui-popover>
`
export const Default: Story = {
  render: args => ({
    components: { LuiPopover },
    template: defaultTemplate,
    setup() {
      return {
        args,
      }
    },
  }),
}
const BlockPropTemplate = `
<div class="w-[600px]">
  <lui-popover v-bind="args" text="test" block>
    <div class="bg-white p-3">
      <button>Test</button>
      <div>
      <button>test</button>
      <p>test text</p>
      <p>test text</p>
      <a href="/">some link</a>
      </div>
    </div>
  </lui-popover>
</div>
`
export const BlockProp: Story = {
  render: args => ({
    components: { LuiPopover },
    template: BlockPropTemplate,
    setup() {
      return {
        args,
      }
    },
  }),
}
// const cusomTrigger = `
// <div class="h-[2000px] pt-[900px]">
//   <lui-popover>
//     <template #trigger={click,...slotProps}>
//       <button v-bind="slotProps" @click="click" class="px-4 py-3 bg-slate-200 rounded-sm">custom tgr</button>
//     </template>
//     <button>test</button>
//     <p>test text</p>
//     <p>test text</p>
//     <a href="/">some link</a>
//   </lui-popover>
// </div>
// <button>focus-trap-tset</button>
// `
// export const CusomTrigger: Story = {
//   render: () => ({
//     components: { LuiPopover },
//     template: cusomTrigger,
//   }),
// }
