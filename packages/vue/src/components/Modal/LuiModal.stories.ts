import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { rounded, size } from '../../../../../.storybook/global-story-argtypes'
import LuiButton from '../Button/LuiButton.vue'
import LuiModal from './LuiModal.vue'

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

const meta: Meta<typeof LuiModal> = {
  title: 'LUI/Modal',
  component: LuiModal,
  argTypes: {
    size,
    rounded,
    fullScreen: {
      control: 'boolean',
      options: [true, false],
      default: false,
      description: descriptions.argTypes.fullScreen,
    },
    padding: {
      control: 'boolean',
      options: [true, false],
      default: true,
      description: descriptions.argTypes.padding,
    },
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
type Story = StoryObj<typeof LuiModal>

const modalTemplate = `<div class="w-full">
    <h2 class="text-xl font-bold mb-4">Information message</h2>
    <p class="mb-6">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    </p>
  </div>`
const defaultTemplate = `
<lui-button @click="showModal=true" rounded>Open Modal</lui-button>
<lui-modal :show="showModal" @close="showModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
    <lui-button rounded>Confirm</lui-button>
    <lui-button @click="showModal=false" rounded color="secondary">Cancel</lui-button>
  </div>
</lui-modal>
`
export const Default: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
    template: defaultTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate,
      },
      description: {
        story:
          'When you click the button, a default LuiModal is shown. Note that the <b>show</b> prop is used to control the visibility of the LuiModal and the <b>close</b> event is used to control the action when the cross icon in the LuiModal is clicked.',
      },
    },
  },
}

export const Show: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
    template: defaultTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate,
      },
      description: {
        story:
          'The <b>show</b> prop in the LuiModal is responsible for controlling the visibility of the modal. By binding it to a Boolean variable, such as "showModal," you can determine whether the modal should be displayed or hidden.',
      },
    },
  },
}

export const Close: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
    template: defaultTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate,
      },
      description: {
        story:
          'The <b>close</b> event in the LuiModal is triggered when the user clicks on the cross icon or performs any action that closes the modal window. By attaching the @close event handler, such as @close=\'showModal=false\', users can define a function or action that should be performed when the modal is closed. This event provides a way to control and respond to the modal\'s closure, allowing users to handle any necessary cleanup, update data, or execute specific logic when the user dismisses the modal window.',
      },
    },
  },
}

const roundedTemplate = `
<lui-button @click="showModalOne=true" rounded>Rounded</lui-button>
<lui-modal :rounded="true" :show="showModalOne" @close="showModalOne=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="showModalOne=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
<lui-button @click="showModalTwo=true" rounded>Not Rounded</lui-button>
<lui-modal :rounded="false" :show="showModalTwo" @close="showModalTwo=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="showModalTwo=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    args: { rounded },
    setup() {
      const showModalOne = ref(false)
      const showModalTwo = ref(false)
      return { showModalOne, showModalTwo }
    },
    template: roundedTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate,
      },
      description: {
        story: 'The <b>rounded</b> prop is used to round the corners of a LuiModal.',
      },
    },
  },
}
const paddingTemplate = `
<lui-button @click="showModalOne=true" rounded>Padding</lui-button>
<lui-modal :padding="true" :show="showModalOne" @close="showModalOne=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
    <lui-button rounded>Confirm</lui-button>
    <lui-button @click="showModalOne=false" rounded color="secondary">Cancel</lui-button>
  </div>
</lui-modal>
<lui-button @click="showModalTwo=true" rounded>No Padding</lui-button>
<lui-modal :padding="false" :show="showModalTwo" @close="showModalTwo=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
    <lui-button rounded>Confirm</lui-button>
    <lui-button @click="showModalTwo=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>`
export const Padding: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModalOne = ref(false)
      const showModalTwo = ref(false)
      return { showModalOne, showModalTwo }
    },
    template: paddingTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: paddingTemplate,
      },
      description: {
        story:
          'The <b>padding</b> prop is used to customize the spacing around the LuiModal\'s content.',
      },
    },
  },
}
const showIconTemplate = `
<lui-button @click="showModalOne=true" rounded>Show Icon</lui-button>
<lui-modal :show-icon="true" :show="showModalOne" @close="showModalOne=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="showModalOne=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
<lui-button @click="showModalTwo=true" rounded>No Icon</lui-button>
<lui-modal :show-icon="false" :show="showModalTwo" @close="showModalTwo=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="showModalTwo=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
`
export const ShowIcon: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModalOne = ref(false)
      const showModalTwo = ref(false)
      return { showModalOne, showModalTwo }
    },
    template: showIconTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: showIconTemplate,
      },
      description: {
        story:
          'The <b>show-icon</b> prop controls the visibility of the cross icon located at the top right corner of the LuiModal. By default, the cross icon is shown, allowing users to close the modal. However, you can set this props to \'false\' to disable the cross icon and prevent users from closing the modal using this feature.',
      },
    },
  },
}
const sizeTemplate = `
<lui-button @click="xsModal=true" rounded>xSmall Modal</lui-button>
<lui-modal size="xs" :show="xsModal" @close="xsModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="xsModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
<lui-button @click="smModal=true" rounded>Small Modal</lui-button>
<lui-modal size="sm" :show="smModal" @close="smModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="smModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
<lui-button @click="mdModal=true" rounded>Medium Modal</lui-button>
<lui-modal size="md" :show="mdModal" @close="mdModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="mdModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
<lui-button @click="lgModal=true" rounded>Large Modal</lui-button>
<lui-modal size="lg" :show="lgModal" @close="lgModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="lgModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
<lui-button @click="xlModal=true" rounded>xLarge Modal</lui-button>
<lui-modal size="xl" :show="xlModal" @close="xlModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="xlModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
`
export const Size: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const xsModal = ref(false)
      const smModal = ref(false)
      const mdModal = ref(false)
      const lgModal = ref(false)
      const xlModal = ref(false)
      return { xsModal, smModal, mdModal, lgModal, xlModal }
    },
    template: sizeTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate,
      },
      description: {
        story:
          'The <b>size</b> prop in the LuiModal allows you to control the width of the modal. The available options for the <b>size</b> prop are \'xs\', \'sm\', \'md\', \'lg\' and \'xl\', each representing different predefined widths for the modal. As the width changes, the height of the modal adjusts responsively to accommodate the content, ensuring that the modal\'s content can fit comfortably within the specified width.',
      },
    },
  },
}
const fullScreenTemplate = `
<lui-button @click="showModal=true" rounded>Full Screen</lui-button>
<lui-modal :full-screen="true" :show="showModal" @close="showModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="showModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
`
export const FullScreen: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
    template: fullScreenTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: fullScreenTemplate,
      },
      description: {
        story:
          'The <b>full-screen</b> prop in the LuiModal enables the rendering of a modal that occupies the entire screen. By setting it to "true", the modal will expand to fill the entire viewport, providing a fullscreen immersive experience for the user.',
      },
    },
  },
}
