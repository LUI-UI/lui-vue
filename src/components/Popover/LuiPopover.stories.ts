import type { Meta, StoryObj } from '@storybook/vue3'
import LuiPopover from './LuiPopover.vue'

// const sizeList = size.options
// const colorList = color.options
// const filterList = filter.options

const meta: Meta<typeof LuiPopover> = {
  title: 'LUI/LuiPopover',
  component: LuiPopover,
}
export default meta

type Story = StoryObj<typeof LuiPopover>

const defaultTemplate = `
<div class="h-[2000px] pt-[900px]">
  <lui-popover text="popover trigger">
    <div>
      <span>
        <button>test</button>
        <p>test text</p>
        <p>test text</p>
        <a href="/">some link</a>
      </span>
    </div>

  </lui-popover>
</div>
<button>focus-trap-tset</button>
`
export const Default: Story = {
  render: () => ({
    components: { LuiPopover },
    template: defaultTemplate,
  }),
}
const cusomTrigger = `
<div class="h-[2000px] pt-[900px]">
  <lui-popover>
    <template #trigger={click,...slotProps}>
      <button v-bind="slotProps" @click="click" class="px-4 py-3 bg-slate-200 rounded-sm">custom tgr</button>
    </template>
    <button>test</button>
    <p>test text</p>
    <p>test text</p>
    <a href="/">some link</a>
  </lui-popover>
</div>
<button>focus-trap-tset</button>
`
export const CusomTrigger: Story = {
  render: () => ({
    components: { LuiPopover },
    template: cusomTrigger,
  }),
}
