import LuiMultiSelect from './LuiMultiSelect.vue'

// import { ref } from 'vue'
// import {
//   block,
//   rounded,
//   size,
//   description,
//   state,
//   stateIcon
// } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiMultiSelect> = {
  title: 'LUI/LuiMultiSelect',
  component: LuiMultiSelect
}
export default meta

type Story = StoryObj<typeof LuiMultiSelect>

export const Default: Story = {
  render: () => ({
    components: { LuiMultiSelect },
    setup() {
      return {}
    },
    template: `<LuiMultiSelect />`
  })
}
