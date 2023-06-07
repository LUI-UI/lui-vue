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
    selected: 'Used to control the initial option selection',
    disabled: 'Used to disable the LuiOption ',
    value: 'Used to give a value to the LuiOption',
    text: 'Used to give a text to the LuiOption',
    prepend: 'Used to place an icon to the left side of the component',
    append: 'Used to place an icon to the right side of the component'
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
    append: { description: descriptions.argTypes.append },
    prepend: { description: descriptions.argTypes.prepend },
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
  decorators: [() => ({ template: '<div class="pb-36 space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiOption>

const defaultTemplate = `
<lui-select>
  <lui-option text="Mary" value="Mary"></lui-option>
  <lui-option text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Default: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'Here there are two LuiOption components within the LuiSelect component. Note that to provide the options, you must pass the <b>text</b> and <b>value</b> props to the LuiOption as in the code snippet below.'
      }
    }
  }
}

const roundedTemplate = `
<lui-select placeholder="Not Rounded">
  <lui-option :rounded="false" text="Mary" value="Mary"></lui-option>
  <lui-option :rounded="false" text="Jane" value="Jane"></lui-option>
</lui-select>
<lui-select placeholder="Rounded">
  <lui-option :rounded="true" text="Mary" value="Mary"></lui-option>
  <lui-option :rounded="true" text="Jane" value="Jane"></lui-option>
</lui-select>
<lui-select placeholder="Rounded Full">
  <lui-option rounded="full" text="Mary" value="Mary"></lui-option>
  <lui-option rounded="full" text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { rounded },
    template: `<div class="flex space-x-8">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story:
          'The <b>rounded</b> prop is used to round the corners of a LuiOption on mouse-over state.'
      }
    }
  }
}

const sizeTemplate = `
<lui-select placeholder="xSmall">
  <lui-option size="xs" text="Mary" value="Mary"></lui-option>
  <lui-option size="xs" text="Jane" value="Jane"></lui-option>
</lui-select>
<lui-select placeholder="Small">
  <lui-option size="sm" text="Mary" value="Mary"></lui-option>
  <lui-option size="sm" text="Jane" value="Jane"></lui-option>
</lui-select>
<lui-select placeholder="Medium">
  <lui-option size="md" text="Mary" value="Mary"></lui-option>
  <lui-option size="md" text="Jane" value="Jane"></lui-option>
</lui-select>
<lui-select placeholder="Large">
  <lui-option size="lg" text="Mary" value="Mary"></lui-option>
  <lui-option size="lg" text="Jane" value="Jane"></lui-option>
</lui-select>
<lui-select placeholder="xLarge">
  <lui-option size="xl" text="Mary" value="Mary"></lui-option>
  <lui-option size="xl" text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Size: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { size },
    template: `<div class="flex justify-between space-x-1">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story:
          "The <b>size</b> prop in the LuiOption provides five options to control the padding of the option on mouse-over state. These options include 'xs', 'sm', 'md', 'lg' and 'xl', allowing you to choose the desired padding for the option."
      }
    }
  }
}

const disabledTemplate = `
<lui-select placeholder="Disabled">
  <lui-option disabled text="Mary" value="Mary"></lui-option>
  <lui-option text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: disabledTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      },
      description: {
        story: 'The <b>disabled</b> prop is used to disable a LuiOption.'
      }
    }
  }
}

const selectedTemplate = `
<lui-select placeholder="Selected">
  <lui-option text="Mary" value="Mary"></lui-option>
  <lui-option selected text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Selected: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: selectedTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: selectedTemplate
      },
      description: {
        story:
          'The <b>selected</b> prop is used to set a LuiOption as selected initially. Note that if this prop is not passed, the LuiSelect placeholder or the first option will be shown as default.'
      }
    }
  }
}

const prependTemplate = `
<lui-select placeholder="Prepend">
  <lui-option text="Mary" value="Mary">
    <template #prepend>
      <i class="ri-home-line"></i>
    </template>
  </lui-option>
  <lui-option text="Jane" value="Jane">
    <template #prepend>
      <i class="ri-home-line"></i>
    </template>
  </lui-option>
</lui-select>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: prependTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: prependTemplate
      },
      description: {
        story:
          'The <b>prepend</b> slot is used to place an icon to the left side of the LuiOption, before the text.'
      }
    }
  }
}

const appendTemplate = `
<lui-select placeholder="Append">
  <lui-option text="Mary" value="Mary">
    <template #append>
      <i class="ri-home-line"></i>
    </template>
  </lui-option>
  <lui-option text="Jane" value="Jane">
    <template #append>
      <i class="ri-home-line"></i>
    </template>
  </lui-option>
</lui-select>
`
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: appendTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: appendTemplate
      },
      description: {
        story:
          'The <b>append</b> slot is used to place an icon to the right side of the LuiOption, after the text.'
      }
    }
  }
}

const modelTemplate = `
<lui-select placeholder="Select a name" v-model="selectedName">
  <lui-option text="Mary" value="Mary"></lui-option>
  <lui-option text="Jane" value="Jane"></lui-option>
</lui-select>
`
export const Model: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('')
      return { selectedName }
    },
    template: `<div class="flex-col space-y-4"><span>selectedName: {{ selectedName }}</span>${modelTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `{{ selectedName }}${modelTemplate}`
      },
      description: {
        story:
          "The <b>v-model</b> prop in the LuiSelect allows users to easily access the selected option's value by two-way data binding. In this example, it's used to bind the selected option's value to a data property called 'selectedName'. This means that when a user selects an option from the menu, the 'selectedName' property will be updated with the value of the selected option."
      }
    }
  }
}
