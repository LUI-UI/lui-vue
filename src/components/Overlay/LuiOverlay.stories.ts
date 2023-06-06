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
      <div class="relative top-10 left-24 flex w-max" @click.stop="showOverlay = true">
        <LuiInput value="Bayhan" />
      </div>    
      <lui-overlay :show="showOverlay" blur @close="showOverlay = false">
        <div class="relative top-10 left-24">
          <LuiSelect :options="['Bayhan','Serkan','Rahmi','Can','Feyzan']" />
        </div>
      </lui-overlay>

   `
  })
}
