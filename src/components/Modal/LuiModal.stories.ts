import LuiModal from './LuiModal.vue'
import { ref } from 'vue'
import { size } from '../../../.storybook/global-story-argtypes'
import LuiButton from '../Button/LuiButton.vue'
import LuiInput from '../Input/LuiInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiModal> = {
  title: 'LUI/Modal',
  component: LuiModal,
  argTypes: {
    size
  }
}
export default meta
type Story = StoryObj<typeof LuiModal>

export const TestTemplate: Story = {
  render: (args) => ({
    components: { LuiModal, LuiButton, LuiInput },
    setup() {
      const showModal = ref(false)
      return { args, showModal }
    },
    template: `
    <div class="h-[4200px]">
      <button @click="showModal = true">open modal</button>
      <lui-modal :show="showModal" v-bind="args" size="xl" @close="showModal = false">
        <div class="login-content w-full px-2">
        <div class="modal-title text-center">
          <h1 class="text-3xl font-bold mb-8 basic-text">
            Title and some
          </h1>
        </div>
        <p v-for="i in 15" :key="i" class="text-2xl text-gray-500 mb-20">
        Your payment has been successfully submitted. We’ve sent you an email
        with all of the details of your order.
        </p> 
        <div class="flex flex-row justify-center items-center">
          <span class="pr-1">OKEY</span>
          <LuiButton
            variant="link"
            color="primary"
            class="underline"
          >
            Some btn label
          </LuiButton>
        </div>
        </div>
      </lui-modal>
    </div>

  `
  })
}

export const Default: Story = {
  render: (args) => ({
    components: { LuiModal, LuiButton },
    setup() {
      const showModal = ref(true)
      return { args, showModal }
    },
    template: `
    <button @click="showModal = true">open modal</button>
    <lui-modal :show="showModal" v-bind="args" @close="showModal = false">
      <div class="w-full">
        <h2 class="text-xl font-bold mb-4">Information message</h2>
        <p class="mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        </p>
        <div class="flex space-x-3 ml-auto">
          <lui-button rounded color="primary">Confirm</lui-button>
          <lui-button rounded color="secondary">Cancel</lui-button>
        </div>
      </div>
    </lui-modal>
  `,
    args: {
      size: 'md'
    }
  })
}
