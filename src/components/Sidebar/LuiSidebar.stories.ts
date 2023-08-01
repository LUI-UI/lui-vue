import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

// import LuiButton from '../Button/LuiButton.vue'
import LuiSidebar from './LuiSidebar.vue'

const descriptions = {
  docs: {
    component:
      'LuiModal presents content on top of the main application or webpage, typically in a separate overlay. It is used to capture user attention, display additional information, or prompt for user interaction while temporarily blocking interaction with the underlying content.',
  },
  argTypes: {
    default: 'Used as default to add a text in the component',
    padding: 'Used to customize the spacing around the LuiModal\'s content',
    fullScreen: 'Used to render a full screen LuiModal',
    show: 'Controls the visibility of the modal',
    showIcon: 'Controls the visibility of the cross icon in the modal that triggers the close event',
    // close: 'Event used to control the action when the cross icon in the modal is clicked'
  },
}

const meta: Meta<typeof LuiSidebar> = {
  title: 'LUI/Sidebar',
  component: LuiSidebar,
  argTypes: {
    show: {
      control: 'boolean',
      options: [true, false],
      description: descriptions.argTypes.show,
      default: false,
    },
    showIcon: {
      control: 'boolean',
      options: [true, false],
      description: descriptions.argTypes.showIcon,
      default: true,
    },
    padding: {
      control: 'boolean',
      options: [true, false],
      description: descriptions.argTypes.padding,
      default: true,
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'bottom', 'top'],
    },
    // close: { description: descriptions.argTypes.close },
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
type Story = StoryObj<typeof LuiSidebar>

const defaultTemplate = `<div class="w-full">
    <h2 class="text-xl font-bold mb-4">Information message</h2>
    <p class="mb-6">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    </p>
    <button @click="showModal = !showModal">OPEN</button>
    <LuiSidebar :show="showModal" @close="showModal = false" position="top" v-bind="args">
    <div>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
    </LuiSidebar>
  </div>`

export const Default: Story = {
  render: args => ({
    components: { LuiSidebar },
    setup() {
      const showModal = ref(true)
      return { showModal, args }
    },
    template: defaultTemplate,
  }),
}
