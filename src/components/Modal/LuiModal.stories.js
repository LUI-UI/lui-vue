import LuiModal from './LuiModal.vue'
import { ref } from 'vue'
import { size } from '../../../.storybook/global-story-argtypes'
import LuiButton from '../Button/LuiButton.vue'
import LuiInput from '../Input/LuiInput.vue'
export default {
  title: 'LUI/Modal',
  components: { LuiModal },
  argTypes: {
    size
  }
}

export const TestTemplate = (args) => ({
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
        <form>
          <div class="mb-4 flex flex-col">
            <label for="name" class="text-xs">
              Label
            </label>
            <LuiInput
              name="name"
              type="text"
              size="md"
              block
              rounded
              state-icon
            />
          </div>
          <div class="mb-4 flex flex-col">
            <label for="email" class="text-xs">
              LAbel
            </label>
            <LuiInput
              name="email"
              type="email"
              size="md"
              block
              rounded
              state-icon
            />
          </div>
          <div class="mb-4 flex flex-col">
            <label for="password" class="text-xs">
              Label
            </label>
            <LuiInput
              name="password"
              type="password"
              size="md"
              block
              rounded
              state-icon
            />
          </div>
          <div class="mb-8 flex flex-col">
            <label for="comfirm-password" class="text-xs">
              Label
            </label>
            <LuiInput
              name="comfirm-password"
              type="password"
              size="md"          
              block
              rounded
              state-icon
            />
          </div>
          <div class="mb-4">
            <div class="pb-2">
              <label class="text-sm text-danger mb-2" for="sign-up">
                Label
              </label>
            </div>
            <LuiButton
              name="sign-up"
              rounded
              block
              @click="signUp"
            >
              ButtonS
            </LuiButton>
          </div>
        </form>
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

const DefaultTemplate = (args) => ({
  components: { LuiModal, LuiButton },
  setup() {
    let showModal = ref(true)
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
  `
})
export const Default = DefaultTemplate.bind({})
Default.args = { size: 'sm' }
