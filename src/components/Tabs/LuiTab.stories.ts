// import LuiTabs from "./LuiTabs.vue";
import LuiTabGroup from './LuiTabGroup.vue'
import LuiTabButtons from './LuiTabButtons.vue'
import LuiTabButton from './LuiTabButton.vue'
import LuiTabPanels from './LuiTabPanels.vue'
import LuiTabPanel from './LuiTabPanel.vue'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiTabGroup> = {
  title: 'LUI/Tab',
  component: LuiTabGroup
  // argTypes: {
  //   alignTabs: {
  //     control: 'select',
  //     options: ['left', 'center', 'right']
  //   },
  //   alignContent: {
  //     control: 'select',
  //     options: ['left', 'center', 'right']
  //   },
  //   stretch: {
  //     control: 'boolean'
  //     // options: ["left", "center", "right"],
  //   }
  // }
}
export default meta
type Story = StoryObj<typeof LuiTabGroup>

export const Default: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel
    },
    template: `
  <lui-tab-group>
    <lui-tab-buttons align-tabs="left">
      <lui-tab-button>tab-1</lui-tab-button>
      <lui-tab-button>tab-2</lui-tab-button>
      <lui-tab-button>tab-3</lui-tab-button>
      <lui-tab-button>tab-4</lui-tab-button>
      <lui-tab-button>tab-5</lui-tab-button>
    </lui-tab-buttons>
    <lui-tab-panels>
      <lui-tab-panel><div>Panel-1</div></lui-tab-panel>
      <lui-tab-panel>Panel-2</lui-tab-panel>
      <lui-tab-panel>Panel-3</lui-tab-panel>
      <lui-tab-panel>Panel-4</lui-tab-panel>
      <lui-tab-panel>Panel-5</lui-tab-panel>
    </lui-tab-panels>
  </lui-tab-group>`
  })
}
export const WithControls: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel
    },
    setup() {
      const activeTab = ref(0)
      return { activeTab }
    },
    template: `
  <lui-tab-group :selectedIndex="activeTab">
    <lui-tab-buttons align-tabs="left">
      <lui-tab-button>tab-1</lui-tab-button>
      <lui-tab-button>tab-2</lui-tab-button>
      <lui-tab-button >tab-3</lui-tab-button>
      <lui-tab-button>tab-4</lui-tab-button>
      <lui-tab-button>tab-5</lui-tab-button>
    </lui-tab-buttons>
    <lui-tab-panels>
      <lui-tab-panel><div>Panel-1</div></lui-tab-panel>
      <lui-tab-panel>Panel-2</lui-tab-panel>
      <lui-tab-panel>Panel-3</lui-tab-panel>
      <lui-tab-panel>Panel-4</lui-tab-panel>
      <lui-tab-panel>Panel-5</lui-tab-panel>
    </lui-tab-panels>
  </lui-tab-group>`
  })
}
