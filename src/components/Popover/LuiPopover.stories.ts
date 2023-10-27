import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import LuiPopover from './LuiPopover.vue'

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
<lui-popover v-bind="args" text="popover">
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
const teleportTemplate = `
<lui-popover v-bind="args" text="popover" teleport>
  <button>Test</button>
  <div>
  <button>test</button>
  <p>test text</p>
  <p>test text</p>
  <a href="/">some link</a>
  </div>
</lui-popover>
`
export const Teleport: Story = {
  render: args => ({
    components: { LuiPopover },
    template: teleportTemplate,
    setup() {
      return {
        args,
      }
    },
  }),
}
const controlShowTemplate = `
<div>{{isShow}}</div>
<lui-popover v-model:open="isShow" text="popover">
  <div class="p-4 bg-white rounded-lg">
    <button>test1</button>
    <button>test2</button>
    <a href="/">some link</a>
  </div>
</lui-popover>
<button @click.stop="isShow = true">other button</button>
`
export const ControlShow: Story = {
  render: () => ({
    components: { LuiPopover },
    template: controlShowTemplate,
    setup() {
      const isShow = ref(true)
      return {
        isShow,
      }
    },
  }),
}
