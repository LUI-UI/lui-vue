import type { Meta, StoryObj } from '@storybook/vue3'
import { color, filter, rounded, size, variant } from '../../../.storybook/global-story-argtypes'
import LuiPopover from './LuiPopover.vue'

// const sizeList = size.options
// const colorList = color.options
// const filterList = filter.options

const descriptions = {
  docs: {
    component:
      'The LuiTag allows users to navigate between different sections or views within a container. It provides a visually appealing and intuitive interface for organizing and accessing content, supporting both horizontal and vertical layouts with customizable styling and event handling.',
  },
  argTypes: {
    prepend: 'Used to place an icon to the left side of the component',
    default: 'Used as default to add a text in the component',
    closeIcon: 'Specifies whether the tag should display a close icon.',
  },
}

const meta: Meta<typeof LuiPopover> = {
  title: 'LUI/LuiPopover',
  component: LuiPopover,
  argTypes: {
    variant,
    color,
    size,
    filter,
    rounded,
    closeIcon: {
      control: 'boolean',
      options: [true, false],
      default: true,
      description: descriptions.argTypes.closeIcon,
    },
    prepend: { description: descriptions.argTypes.prepend },
    default: { description: descriptions.argTypes.default },
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component },
    },
  },
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
