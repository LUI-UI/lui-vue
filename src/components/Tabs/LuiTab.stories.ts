// import LuiTabs from "./LuiTabs.vue";
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { size } from '../../../.storybook/global-story-argtypes'
import LuiTabGroup from './LuiTabGroup.vue'
import LuiTabButtons from './LuiTabButtons.vue'
import LuiTabButton from './LuiTabButton.vue'
import LuiTabPanels from './LuiTabPanels.vue'
import LuiTabPanel from './LuiTabPanel.vue'

const descriptions = {
  docs: {
    component:
      'The tab components in LUI provide developers an organized way to interact with the tab buttons to switch between different tab panels, allowing them to view and access different sets of content within a single view. The <b>LuiTabButtons</b> component represents the container for tab buttons, allowing users to switch between different sections of content. Each individual tab button is defined using the <b>LuiTabButton</b> component, which provides a visually clickable element for selecting a specific tab. The content for each tab is defined using the <b>LuiTabPanel</b> component, which serves as a container for the content associated with a particular tab. Multiple <b>LuiTabPanel</b> components are wrapped within the <b>LuiTabPanels</b> component, allowing for seamless management of the tabbed content. Lastly, the <b>LuiTabGroup</b> component is used to bring together the different tab-related components, providing an interactive tabbed interface.',
  },
  argTypes: {
    // alignContent: 'Used to control the alignment of the content within each tab panel',
    // alignTabs: 'Used to control the alignment of the tab buttons within a LuiTabGroup',
    // stretch: 'Used to control the stretching behavior of the tab buttons within a LuiTabGroup',
    selectedIndex: 'Used to control the initially selected tab based on an index value',
    // change: '',
    default: 'Used as default to add a text in the component',
  },
}

const meta: Meta<typeof LuiTabGroup> = {
  title: 'LUI/Tab',
  component: LuiTabGroup,
  argTypes: {
    // alignContent: {
    //   control: 'select',
    //   options: ['left', 'center', 'right'],
    //   default: 'left',
    //   description: descriptions.argTypes.alignContent
    // },
    selectedIndex: { description: descriptions.argTypes.selectedIndex },
    default: { description: descriptions.argTypes.default },
    // change: { description: descriptions.argTypes.change },
    // alignTabs: {
    //   control: 'select',
    //   options: ['left', 'center', 'right'],
    //   default: 'left',
    //   description: descriptions.argTypes.alignTabs
    // },
    // stretch: {
    //   control: 'boolean',
    //   options: [true, false],
    //   default: false,
    //   description: descriptions.argTypes.stretch
    // }
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component },
    },
  },
}

export default meta
type Story = StoryObj<typeof LuiTabGroup>

const defaultTemplate = `
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const Default: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
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
          'Here you can see a basic tabbed interface with three tab buttons and three corresponding content panels. Within the LuiTabGroup, the LuiTabButtons component contains the individual tab buttons. In this example, there are three tab buttons defined as LuiTabButton components with the labels "Tab-1", "Tab-2", and "Tab-3". These buttons represent the selectable options for navigating between different sections of content. The LuiTabPanels component holds the content associated with each tab. Here, we have three LuiTabPanel components defined as "Panel-1", "Panel-2", and "Panel-3". These panels contain the respective content that will be displayed when their corresponding tab button is selected.',
      },
    },
  },
}

const selectedIndexTemplate = `
<lui-tab-group :selected-index="activeTab">
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const SelectedIndex: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    setup() {
      const activeTab = ref(1)
      return { activeTab }
    },
    template: `<div><span>selectedIndex: {{ activeTab }}</span>${selectedIndexTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: selectedIndexTemplate,
      },
      description: {
        story:
          'The <b>selected-index</b> prop in LuiTabGroup is used to control the initially selected tab based on an index value. By binding the <b>selected-index</b> prop to a data property, such as "activeTab" in this example, developers can dynamically determine which tab should be selected by setting the value of the `activeTab` property. In the provided code snippet, the `activeTab` property is defined using the `ref` function in the `setup()` method of the Vue component. By assigning an initial value of `1` to `activeTab`, the second tab (Tab-2) will be selected by default when the component is rendered.',
      },
    },
  },
}

const changeTemplate = `
<lui-tab-group @change="consoleLog">
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const Change: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    setup() {
      const consoleLog = () => console.log('Event executed')
      return { consoleLog }
    },
    template: changeTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: changeTemplate,
      },
      description: {
        story:
          'The <b>change</b> event in the LuiTabGroup component is triggered when the user selects a different tab, allowing you to control the action that should be performed when the active tab changes. This means that whenever the user selects a different tab within the LuiTabGroup, the method that the event is bound will be executed. You can customize the method to perform any desired action, such as updating data, making API calls, or triggering other functions based on the selected tab.',
      },
    },
  },
}

const sizeTemplate = `
<div>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="xs">xSmall</lui-tab-button>
    <lui-tab-button size="xs">xSmall</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>xSmall</lui-tab-panel>
    <lui-tab-panel>xSmall</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
</div>
<div>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="sm">Small</lui-tab-button>
    <lui-tab-button size="sm">Small</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Small</lui-tab-panel>
    <lui-tab-panel>Small</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
</div>
<div>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="md">Medium</lui-tab-button>
    <lui-tab-button size="md">Medium</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Medium</lui-tab-panel>
    <lui-tab-panel>Medium</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
</div>
<div>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="lg">Large</lui-tab-button>
    <lui-tab-button size="lg">Large</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Large</lui-tab-panel>
    <lui-tab-panel>Large</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
</div>
<div>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="xl">xLarge</lui-tab-button>
    <lui-tab-button size="xl">xLarge</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>xLarge</lui-tab-panel>
    <lui-tab-panel>xLarge</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
</div>
`
export const Size: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    args: { size },
    setup() {
      const activeTab = ref(0)
      return { activeTab }
    },
    template: `<div class="flex items-baseline justify-between">${sizeTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: `
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="xs">xSmall</lui-tab-button>
    <lui-tab-button size="xs">xSmall</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>xSmall</lui-tab-panel>
    <lui-tab-panel>xSmall</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="sm">Small</lui-tab-button>
    <lui-tab-button size="sm">Small</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Small</lui-tab-panel>
    <lui-tab-panel>Small</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="md">Medium</lui-tab-button>
    <lui-tab-button size="md">Medium</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Medium</lui-tab-panel>
    <lui-tab-panel>Medium</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="lg">Large</lui-tab-button>
    <lui-tab-button size="lg">Large</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Large</lui-tab-panel>
    <lui-tab-panel>Large</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button size="xl">xLarge</lui-tab-button>
    <lui-tab-button size="xl">xLarge</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>xLarge</lui-tab-panel>
    <lui-tab-panel>xLarge</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`,
      },
      description: {
        story:
          'The <b>size</b> prop in the LuiTabButton provides five options to control the size of the tab button. These options include \'xs\', \'sm\', \'md\', \'lg\' and \'xl\', allowing you to choose the desired size for the tab button.',
      },
    },
  },
}

const disabledTemplate = `
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button disabled>Disabled Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const Disabled: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    setup() {
      const activeTab = ref(0)
      return { activeTab }
    },
    template: disabledTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate,
      },
      description: {
        story:
          'The <b>disabled</b> prop is used to disable a specific LuiTabButton, making it non-interactable and visually indicating that it is currently inactive or unavailable for selection.',
      },
    },
  },
}

const stretchTemplate = `
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button :stretch="true">Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const Stretch: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    setup() {
      const activeTab = ref(0)
      return { activeTab }
    },
    template: stretchTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: stretchTemplate,
      },
      description: {
        story:
          'The <b>stretch</b> prop in LuiTabButton is used to control the stretching behavior of the tab buttons within a LuiTabGroup component. When the <b>stretch</b> prop is set to "true", the tab buttons will expand horizontally to occupy the available space evenly. In the provided code snippet, the first tab button is set with the stretch prop value of true, expanding to fill the available space, while the remaining tab buttons retain their default width.',
      },
    },
  },
}

const alignTabsTemplate = `
<lui-tab-group>
  <lui-tab-buttons align-tabs="left">
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons align-tabs="center">
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons align-tabs="right">
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const AlignTabs: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    setup() {
      const activeTab = ref(0)
      return { activeTab }
    },
    template: alignTabsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: alignTabsTemplate,
      },
      description: {
        story:
          'The <b>align-tabs</b> prop in the LuiTabButtons component is used to control the alignment of the tab buttons within a LuiTabGroup. This prop offers three options: "left", "center", and "right".',
      },
    },
  },
}

const alignContentTemplate = `
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel align-content="left">Panel-1</lui-tab-panel>
    <lui-tab-panel align-content="left">Panel-2</lui-tab-panel>
    <lui-tab-panel align-content="left">Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel align-content="center">Panel-1</lui-tab-panel>
    <lui-tab-panel align-content="center">Panel-2</lui-tab-panel>
    <lui-tab-panel align-content="center">Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>
<lui-tab-group>
  <lui-tab-buttons>
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel align-content="right">Panel-1</lui-tab-panel>
    <lui-tab-panel align-content="right">Panel-2</lui-tab-panel>
    <lui-tab-panel align-content="right">Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const AlignContent: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    setup() {
      const activeTab = ref(0)
      return { activeTab }
    },
    template: alignContentTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: alignContentTemplate,
      },
      description: {
        story:
          'The <b>align-content</b> prop in the LuiTabPanel component is used to control the alignment of the content within each tab panel. This prop offers three options: "left", "center", and "right".',
      },
    },
  },
}

const customButtonsTemplate = `
<lui-tab-group>
  <lui-tab-buttons custom-style class="bg-secondary-200 w-max rounded">
    <lui-tab-button>Tab-1</lui-tab-button>
    <lui-tab-button>Tab-2</lui-tab-button>
    <lui-tab-button>Tab-3</lui-tab-button>
  </lui-tab-buttons>
  <lui-tab-panels>
    <lui-tab-panel>Panel-1</lui-tab-panel>
    <lui-tab-panel>Panel-2</lui-tab-panel>
    <lui-tab-panel>Panel-3</lui-tab-panel>
  </lui-tab-panels>
</lui-tab-group>`
export const CustomButtons: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    template: customButtonsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: customButtonsTemplate,
      },
      description: {
        story: 'If you want to customize style of the LuiTabButtons you can use set custom-style true and bind new styles with class attribute.',
      },
    },
  },
}

const customButtonTemplate = `
<div class="w-full h-full p-12 bg-white">
  <lui-tab-group>
    <lui-tab-buttons custom-style class="border border-[#E9F0F9] p-1 rounded-full bg-[#F8FAFC]">
      <lui-tab-button>
        <template #custom="{mouseUp,keyDown,setRef,isSelected, ...props}">
          <button 
            v-bind="props" 
            :ref="(el) => setRef(el)"
            @mouseup="mouseUp"
            @keydown="keyDown"
            class="py-3 px-10 rounded-full border whitespace-nowrap outline-primary-200"
            :class="isSelected ? 'bg-white border-[#E9F0F9]' : 'border-transparent bg-[#F8FAFC]'"
            >
            tab-1
          </button>
        </template>
      </lui-tab-button>
      <lui-tab-button>
        <template #custom="{mouseUp,keyDown,setRef,isSelected, ...props}">
          <button 
            v-bind="props" 
            :ref="(el) => setRef(el)"
            @mouseup="mouseUp"
            @keydown="keyDown"
            class="py-3 px-10 rounded-full border whitespace-nowrap outline-primary-200"
            :class="isSelected ? 'bg-white border-[#E9F0F9]' : 'border-transparent bg-[#F8FAFC]'"
            >
            tab-2
          </button>
        </template>
      </lui-tab-button>
      <lui-tab-button>
        <template #custom="{mouseUp,keyDown,setRef,isSelected, ...props}">
          <button 
            v-bind="props" 
            :ref="(el) => setRef(el)"
            @mouseup="mouseUp"
            @keydown="keyDown"
            class="py-3 px-10 rounded-full border whitespace-nowrap outline-primary-200"
            :class="isSelected ? 'bg-white border-[#E9F0F9]' : 'border-transparent bg-[#F8FAFC]'"
            >
            tab-3
          </button>
        </template>
      </lui-tab-button>
    </lui-tab-buttons>
    <lui-tab-panels>
      <lui-tab-panel>Panel-1</lui-tab-panel>
      <lui-tab-panel>Panel-2</lui-tab-panel>
      <lui-tab-panel>Panel-3</lui-tab-panel>
    </lui-tab-panels>
  </lui-tab-group>
</div>
`
export const CustomButton: Story = {
  render: () => ({
    components: {
      LuiTabGroup,
      LuiTabButtons,
      LuiTabButton,
      LuiTabPanels,
      LuiTabPanel,
    },
    template: customButtonTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: customButtonTemplate,
      },
      description: {
        story: 'If you want to customize style of the LuiTabButton you can use custom slot and slotProps like in the example.',
      },
    },
  },
}
