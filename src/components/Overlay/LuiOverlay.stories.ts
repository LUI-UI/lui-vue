import LuiOverlay from './LuiOverlay.vue'
import LuiSelect from '../Select/LuiSelect.vue'
import LuiInput from '../Input/LuiInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const meta: Meta<typeof LuiOverlay> = {
  title: 'LUI/Overlay',
  component: LuiOverlay
}
export default meta
type Story = StoryObj<typeof LuiOverlay>

export const Default: Story = {
  render: (args) => ({
    components: { LuiOverlay, LuiSelect, LuiInput },
    setup() {
      const showOverlay = ref(false)
      return { args, showOverlay }
    },
    template: `
      <div class="text-4xl font-bold">test</div>
      <lui-overlay :show="showOverlay" wrap-page overlay-style="opacity" color="primary" opacity="xl" @close="showOverlay = false">
        <LuiSelect :options="['Bayhan','Serkan','Rahmi','Can','Feyzan']" @click="showOverlay = true" />
      </lui-overlay>
   `
  })
}
export const WrapPage: Story = {
  render: (args) => ({
    components: { LuiOverlay, LuiSelect, LuiInput },
    setup() {
      const showOverlay = ref(false)
      return { args, showOverlay }
    },
    template: `
    <lui-overlay :show="showOverlay" @close="showOverlay = false">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <button @click="showOverlay = true" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
      <template #overlay>
      <button @click="showOverlay = true" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Close overlay
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
      </template>
    </lui-overlay>

   `
  })
}
