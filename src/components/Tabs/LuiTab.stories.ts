// import LuiTabs from "./LuiTabs.vue";
import LuiTabGroup from './LuiTabGroup.vue'
import LuiTabButtons from './LuiTabButtons.vue'
import LuiTabButton from './LuiTabButton.vue'
import LuiTabPanels from './LuiTabPanels.vue'
import LuiTabPanel from './LuiTabPanel.vue'
import { ref } from 'vue'
import { size } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'The tab feature in LUI provides an organized way to display multiple sections of content within a single view. It consists of several components, including LuiTabButton, LuiTabButtons, LuiTabPanel, LuiTabPanels and LuiTabGroup. The <b>LuiTabButtons</b> component represents the container for tab buttons, allowing users to switch between different sections of content. Each individual tab button is defined using the <b>LuiTabButton</b> component, which provides a visually clickable element for selecting a specific tab. The content for each tab is defined using the <b>LuiTabPanel</b> component, which serves as a container for the content associated with a particular tab. Multiple <b>LuiTabPanel</b> components are wrapped within the <b>LuiTabPanels</b> component, allowing for seamless management of the tabbed content. Lastly, the <b>LuiTabGroup</b> component is used to bring together the different tab-related components, providing an interactive tabbed interface. With these components, developers can easily implement a tab-based navigation system, enabling users to navigate between different sections of content with ease.'
  },
  argTypes: {
    alignContent: '',
    alignTabs: '',
    active: '',
    stretch: '',
    id: '',
    selectedIndex: '',
    disabled: ''
  }
}

const meta: Meta<typeof LuiTabGroup> = {
  title: 'LUI/Tab',
  component: LuiTabGroup,
  subcomponents: { LuiTabButton, LuiTabButtons, LuiTabPanel, LuiTabPanels },
  argTypes: {
    size,
    alignContent: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: descriptions.argTypes.alignContent
    },
    disabled: { description: descriptions.argTypes.id },
    id: { description: descriptions.argTypes.id },
    selectedIndex: { description: descriptions.argTypes.selectedIndex },
    alignTabs: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    active: { description: descriptions.argTypes.active },
    stretch: {
      control: 'boolean'
      // options: ["left", "center", "right"],
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiTabGroup>

const defaultTemplate = `
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
export const Default: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel
    },
    template: defaultTemplate
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
