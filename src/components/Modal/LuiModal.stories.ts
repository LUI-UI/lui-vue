import LuiModal from './LuiModal.vue'
import { ref } from 'vue'
import { size } from '../../../.storybook/global-story-argtypes'
import LuiButton from '../Button/LuiButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiModal presents content on top of the main application or webpage, typically in a separate overlay. It is used to capture user attention, display additional information, or prompt for user interaction while temporarily blocking interaction with the underlying content.'
  },
  argTypes: {
    default: 'Used as default to add a text in the component',
    show: 'Controls the visibility of the modal',
    showIcon:
      'Controls the visibility of the cross icon in the modal that triggers the close event',
    close: 'Event used to control the action when the cross icon in the modal is clicked'
  }
}

const meta: Meta<typeof LuiModal> = {
  title: 'LUI/Modal',
  component: LuiModal,
  argTypes: {
    size,
    show: {
      control: 'boolean',
      options: [true, false],
      description: descriptions.argTypes.show,
      default: false
    },
    showIcon: {
      control: 'boolean',
      options: [true, false],
      description: descriptions.argTypes.showIcon,
      default: true
    },
    close: { description: descriptions.argTypes.close },
    default: { description: descriptions.argTypes.default }
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}

export default meta
type Story = StoryObj<typeof LuiModal>

const modalTemplate = `
<div class="w-full">
    <h2 class="text-xl font-bold mb-4">Information message</h2>
    <p class="mb-6">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
    </p>
  </div>
`
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
    args: { size },
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'When you click on the button, a default LuiModal is shown. Its visibility is controlled by the <b>show</b> props.'
      }
    }
  }
}
const showIconTemplate = `
<lui-button @click="showModal=true" rounded>Open Modal</lui-button>
<lui-modal :show-icon="false" :show="showModal" @close="showModal=false">
  ${modalTemplate}
  <div class="flex space-x-3 ml-auto">
  <lui-button rounded>Confirm</lui-button>
  <lui-button @click="showModal=false" rounded color="secondary">Cancel</lui-button>
</div>
</lui-modal>
`
export const ShowIcon: Story = {
  render: () => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
    template: showIconTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: showIconTemplate
      },
      description: {
        story:
          "The <b>show-icon</b> props controls the visibility of the cross icon on the highest right part of the LuiModal. It's used to close the modal and shown by default but you can make it invisible."
      }
    }
  }
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
    template: sizeTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story:
          'The <b>size</b> props is used to control the width of the LuiModal and note that the height changes responsively so that the modal content can fit.'
      }
    }
  }
}
