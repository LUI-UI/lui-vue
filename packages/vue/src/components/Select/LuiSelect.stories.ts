import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import LuiOption from '../Option/LuiOption.vue'
import {
  block,
  description,
  rounded,
  size,
  state,
  stateIcon,
} from '../../../../../.storybook/global-story-argtypes'
import LuiSelect from './LuiSelect.vue'

const descriptions = {
  docs: {
    component:
      'LuiSelect presents a dropdown list of options, allowing users to choose a single value from the available options.',
  },
  argTypes: {
    showAppend: 'Must be set to "false" to use <b>stateIcon</b>',
    prepend: 'Used to place an icon to the left side of the component',
    append: 'Used to place an icon to the right side of the component',
    default: 'Used as default to add a text in the component',
    searchable: 'Provides a search feature to filter the options',
    placeholder: 'Used to add a placeholder text to the LuiSelect',
    options: 'Provides the available options to the LuiSelect',
    // change: 'Used to control the action when an option is selected'
  },
}

const meta: Meta<typeof LuiSelect> = {
  title: 'LUI/Select',
  component: LuiSelect,
  argTypes: {
    block,
    rounded,
    size,
    description,
    state,
    stateIcon,
    showAppend: {
      control: 'boolean',
      options: [true, false],
      default: true,
      description: descriptions.argTypes.showAppend,
    },
    searchable: {
      control: 'boolean',
      options: [true, false],
      default: false,
      description: descriptions.argTypes.searchable,
    },
    options: {
      description: descriptions.argTypes.options,
    },
    placeholder: {
      control: 'text',
      description: descriptions.argTypes.placeholder,
    },
    default: { description: descriptions.argTypes.default },
    prepend: { description: descriptions.argTypes.prepend },
    append: { description: descriptions.argTypes.append },
    // change: { description: descriptions.argTypes.change }
  },
  decorators: [() => ({ template: '<div class="py-40 space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component },
    },
  },
}
export default meta

type Story = StoryObj<typeof LuiSelect>

const defaultTemplate = `
<lui-select>
  <lui-option text="Mary" value="Mary"></lui-option>
  <lui-option text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Default: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: defaultTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate,
      },
      description: {
        story:
          'This is how a default LuiSelect looks with two LuiOption components. Note that it has an auto-positioning behavior that makes the menu drop up or down where there is adequate screen space. To provide the options, you can either pass the <b>text</b> and <b>value</b> props to the LuiOption components or use the <b>options</b> prop as described below.',
      },
    },
  },
}

const placeholderTemplate = `
<lui-select placeholder="Names">
  <lui-option text="Mary" value="Mary"></lui-option>
  <lui-option text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Placeholder: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: placeholderTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: placeholderTemplate,
      },
      description: {
        story: 'With the <b>placeholder</b> prop you can give a placeholder text to the LuiSelect.',
      },
    },
  },
}

const optionsTemplate = `
<lui-select placeholder="String Array" :options="['Mary', 'Jane']" />
<lui-select placeholder="Object Array" :options="[{text:'Mary', value:'mary', disabled: true}, {text:'Jane', value:'jane'}]" />
`
export const Options: Story = {
  render: () => ({
    components: { LuiSelect },
    template: `<div class="flex space-x-8">${optionsTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: optionsTemplate,
      },
      description: {
        story:
          'Instead of using the LuiOption, you can simply pass the <b>options</b> prop to the LuiSelect and provide the options in an object or a string array. In an object array, <b>text</b>, <b>value</b> and other props of a standard option element can be assigned as key-value pairs. However, in a string array, the values will be equal to the texts.',
      },
    },
  },
}

const blockTemplate = '<lui-select block placeholder="Block" :options="[\'Mary\', \'Jane\']" />'
export const Block: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { block },
    template: blockTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: blockTemplate,
      },
      description: {
        story: 'The <b>block</b> prop provides a full width select menu look.',
      },
    },
  },
}

const disabledTemplate
  = '<lui-select disabled placeholder="Disabled" :options="[\'Mary\', \'Jane\']" />'
export const Disabled: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: disabledTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate,
      },
      description: {
        story:
          'The <b>disabled</b> prop is used to disable a specific LuiSelect, making it non-interactable and visually indicating that it is currently inactive or unavailable for selection.',
      },
    },
  },
}

const roundedTemplate = `
<lui-select :rounded="false" placeholder="Names" :options="['Mary', 'Jane']" />
<lui-select :rounded="true" placeholder="Names" :options="['Mary', 'Jane']" />
<lui-select rounded="full" placeholder="Names" :options="['Mary', 'Jane']" />
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { rounded },
    template: `<div class="flex space-x-8">${roundedTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate,
      },
      description: {
        story: 'The <b>rounded</b> prop is used to round the corners of a LuiSelect.',
      },
    },
  },
}

const sizeTemplate = `
<lui-select size="xs" placeholder="xSmall" :options="['Mary', 'Jane']" />
<lui-select size="sm" placeholder="Small" :options="['Mary', 'Jane']" />
<lui-select size="md" placeholder="Medium" :options="['Mary', 'Jane']" />
<lui-select size="lg" placeholder="Large" :options="['Mary', 'Jane']" />
<lui-select size="xl" placeholder="xLarge" :options="['Mary', 'Jane']" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { size },
    template: `<div class="flex space-x-1 items-center">${sizeTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate,
      },
      description: {
        story:
          'The <b>size</b> prop in the LuiSelect provides five options to control the size of the select input. These options include \'xs\', \'sm\', \'md\', \'lg\' and \'xl\', allowing you to choose the desired size for the select input.',
      },
    },
  },
}

const descriptionTemplate
  = '<lui-select description="This is a description" placeholder="Description" :options="[\'Mary\', \'Jane\']" />'
export const Description: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { description },
    template: descriptionTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: descriptionTemplate,
      },
      description: {
        story:
          'The <b>description</b> prop is used to add a description to a LuiSelect, typically used for validation and error handling.',
      },
    },
  },
}

const stateTemplate = `
<lui-select :state="null" description="This is a description" placeholder="Null" :options="['Mary', 'Jane']" />
<lui-select :state="true" description="This is a description" placeholder="Success" :options="['Mary', 'Jane']" />
<lui-select state="warning" description="This is a description" placeholder="Warning" :options="['Mary', 'Jane']" />
<lui-select :state="false" description="This is a description" placeholder="Danger" :options="['Mary', 'Jane']" />
`
export const State: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { state },
    template: `<div class="flex space-x-8">${stateTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate,
      },
      description: {
        story:
          'There are 4 states used for validation and error handling and they give a border of the state color to the LuiSelect. When used with the <b>description</b> prop they also change the color of the description.',
      },
    },
  },
}

const stateIconTemplate = `
<lui-select :state-icon="true" :show-append="false" :state="null" placeholder="Null" :options="['Mary', 'Jane']" />
<lui-select :state-icon="true" :show-append="false" :state="true" placeholder="Success" :options="['Mary', 'Jane']" />
<lui-select :state-icon="true" :show-append="false" state="warning" placeholder="Warning" :options="['Mary', 'Jane']" />
<lui-select :state-icon="true" :show-append="false" :state="false" placeholder="Danger" :options="['Mary', 'Jane']" />
`
export const StateIcon: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { stateIcon },
    template: `<div class="flex space-x-8">${stateIconTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: stateIconTemplate,
      },
      description: {
        story:
          'The <b>state-icon</b> prop is used for validation and error handling. It places an icon representing the valid state in the right side of the LuiSelect. Note that it should always be used with the <b>state</b> prop and the <b>show-append</b> prop must be set to "false".',
      },
    },
  },
}

const prependTemplate = `
<lui-select placeholder="Prepend" :options="['Mary', 'Jane']">
  <template #prepend>
    <i class="ri-home-line"></i>
  </template>
</lui-select>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiSelect },
    template: prependTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: prependTemplate,
      },
      description: {
        story:
          'The <b>prepend</b> slot can be used to place an icon to the left side of the component, before the text.',
      },
    },
  },
}

const appendTemplate = `
<lui-select placeholder="Append" :options="['Mary', 'Jane']">
  <template #append>
    <i class="ri-home-line"></i>
  </template>
</lui-select>
`
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiSelect },
    template: appendTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: appendTemplate,
      },
      description: {
        story:
          'The <b>append</b> slot can be used to place an icon to the right side of the component, after the text, thus replacing the default down arrow icon.',
      },
    },
  },
}

const searchableTemplate
  = '<lui-select searchable placeholder="Searchable" :options="[\'Mary\', \'Jane\']" />'
export const Searchable: Story = {
  render: () => ({
    components: { LuiSelect },
    template: searchableTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: searchableTemplate,
      },
      description: {
        story:
          'The <b>searchable</b> prop allows users to easily search and filter the available options within the LuiSelect. By enabling this feature, users can conveniently find specific options by typing keywords or phrases into the search bar.',
      },
    },
  },
}
const clearableTemplate = `
<lui-select clearable searchable :options="['Mary','Jane','John']" placeholder="select a name">
</lui-select>
`
export const Clearable: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: clearableTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: clearableTemplate,
      },
      description: {
        story:
          'This is how a default LuiSelect looks with two LuiOption components. Note that it has an auto-positioning behavior that makes the menu drop up or down where there is adequate screen space. To provide the options, you can either pass the <b>text</b> and <b>value</b> props to the LuiOption components or use the <b>options</b> prop as described below.',
      },
    },
  },
}

const modelTemplate
  = '<lui-select v-model="selectedName" placeholder="Names" :options="[\'Mary\', \'Jane\']" />'
export const Model: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const selectedName = ref('')
      return { selectedName }
    },
    template: `<div class="space-y-4"><span>selectedName: {{ selectedName }}</span>${modelTemplate}</div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: `{{ selectedName }}${modelTemplate}`,
      },
      description: {
        story:
          'The <b>v-model</b> prop allows users to easily access the selected option\'s value by two-way data binding. In this example, it\'s used to bind the selected option\'s value to a data property called \'selectedName\'. This means that when a user selects an option from the menu, the \'selectedName\' property will be updated with the value of the selected option.',
      },
    },
  },
}

const changeTemplate = '<lui-select @change="consoleLog" :options="[\'Mary\', \'Jane\']" />'
export const Change: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const selectedName = ref('')
      const consoleLog = (e: any) => console.warn('selectedName: ', e)
      return { selectedName, consoleLog }
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
          'The <b>change</b> event allows users to specify a custom action to be performed when an option is selected by the user. By attaching the @change event handler, users can define a function that will be executed when the user makes a selection. This feature enables users to trigger specific actions, perform calculations, update data, or execute any desired logic based on the selected option.',
      },
    },
  },
}

const teleportTemplate
  = '<lui-select :teleport="true" v-model="selectedName" placeholder="Names" :options="[\'Mary\', \'Jane\']" />'
export const Teleport: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const selectedName = ref('')
      return { selectedName }
    },
    template: teleportTemplate,
  }),
}
const withValueTemplate = `
<div>VModel value: {{ selectedCountry }}</div>
<lui-select v-model="selectedCountry" :options="countries" />
`
export const WithValue: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const countries = [{ text: 'Turkey', value: 'TR' }, { text: 'Austria', value: 'AT' }, { text: 'Azerbaijan', value: 'AZ' }, { text: 'Bangladesh', value: 'BD' }]
      const selectedCountry = ref('AZ')
      return { countries, selectedCountry }
    },
    template: withValueTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: withValueTemplate,
      },
    },
  },
}
const controlShowTemplate = `
<div>{{isShow}}</div>
<LuiSelect v-model:open="isShow" :options="[\'Mary\', \'Jane\']" />
<button @click.stop="isShow = true">other button</button>
`
export const ControlShow: Story = {
  render: () => ({
    components: { LuiSelect },
    template: controlShowTemplate,
    setup() {
      const isShow = ref(true)
      return {
        isShow,
      }
    },
  }),
}
