import LuiSelect from '../Select/LuiSelect.vue'
import LuiOption from './LuiOption.vue'
import { ref } from 'vue'
import { rounded, size } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiOption represents an individual choice within the LuiSelect, providing a selectable item with a text and value.'
  },
  argTypes: {
    selected: 'Used to control the option selection',
    disabled: 'Used to disable the LuiOption ',
    value: 'Used to give a value to the LuiOption',
    text: 'Used to give a text to the LuiOption'
  }
}

const meta: Meta<typeof LuiOption> = {
  title: 'LUI/Option',
  component: LuiOption,
  argTypes: {
    rounded,
    size,
    value: {
      control: 'text',
      description: descriptions.argTypes.value
    },
    text: {
      control: 'text',
      description: descriptions.argTypes.text
    },
    selected: {
      control: 'boolean',
      options: [true, false],
      default: false,
      description: descriptions.argTypes.selected
    },
    disabled: {
      control: 'boolean',
      options: [true, false],
      default: false,
      description: descriptions.argTypes.disabled
    }
  },
  decorators: [() => ({ template: '<div class="pb-32 space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiOption>

const defaultTemplate = `
<lui-select v-model="selectedName">
  <lui-option text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Default: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${defaultTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${defaultTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const roundedTemplate = `
<lui-select v-model="selectedName">
  <lui-option rounded="full" text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option rounded="full" text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${roundedTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const sizeTemplate = `
<lui-select v-model="selectedName">
  <lui-option size="xs" text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option size="xs" text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Size: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${sizeTemplate}</div>`
      },
      description: {
        story:
          "The <b>size</b> prop in the LuiOption provides five options to control the size of the option. These options include 'xs', 'sm', 'md', 'lg' and 'xl', allowing you to choose the desired size for the option."
      }
    }
  }
}
