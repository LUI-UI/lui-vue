import LuiSelect from './LuiSelect.vue'
import LuiOption from '../Option/LuiOption.vue'
import { ref } from 'vue'
import {
  block,
  rounded,
  size,
  description,
  state,
  stateIcon
} from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiSelect presents a dropdown list of options, allowing users to choose a single value from the available options. LuiOption represents an individual choice within the LuiSelect, providing a selectable item with a text and value.'
  },
  argTypes: {
    prepend: 'Used to add an icon to the left side of the component',
    default: 'Used as default to add a text in the component',
    searchable: 'Provides a search feature to filter the options',
    placeholder: 'Used to add a placeholder text to the LuiSelect',
    options: 'Provides the available options to the LuiSelect'
  }
}

const meta: Meta<typeof LuiSelect> = {
  title: 'LUI/Select',
  component: LuiSelect,
  subcomponents: { LuiOption }, //👈 Adds the Option component as a subcomponent
  argTypes: {
    block,
    rounded,
    size,
    description,
    state,
    stateIcon,
    searchable: {
      control: 'boolean',
      default: false,
      options: [true, false],
      description: descriptions.argTypes.searchable
    },
    options: {
      control: '',
      options: '',
      default: '',
      description: descriptions.argTypes.options
    },
    prepend: { description: descriptions.argTypes.prepend },
    placeholder: {
      control: 'text',
      description: descriptions.argTypes.placeholder
    },
    default: { description: descriptions.argTypes.default }
  },
  decorators: [() => ({ template: '<div class="pb-28 space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiSelect>

const defaultTemplate = `
<lui-select v-model="selectedName">
  <lui-option text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option text="Sercan" value="Sercan" :selected="false"></lui-option>
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

export const WithObjectArrays: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: defaultTemplate
  })
}

const blockTemplate = `<lui-select block placeholder="Block" :options="['a','b','c']" />`
export const Block: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { block },
    template: blockTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: blockTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const disabledTemplate = `<lui-select disabled placeholder="Dİsabled" :options="['a','b','c']" />`
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
        story: ''
      }
    }
  }
}

const placeholderTemplate = `<lui-select placeholder="xSmall" :options="['a','b','c']" />`
export const Placeholder: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: placeholderTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: placeholderTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const optionsTemplate = `<lui-select placeholder="Options" :options="['a','b','c']" />`
export const Options: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: optionsTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: optionsTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const roundedTemplate = `
<lui-select :rounded="false" placeholder="Names" :options="['a','b','c']" />
<lui-select :rounded="true" placeholder="Names" :options="['a','b','c']" />
<lui-select rounded="full" placeholder="Names" :options="['a','b','c']" />
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
        story: ''
      }
    }
  }
}

const sizeTemplate = `
<lui-select size="xs" placeholder="xSmall" :options="['a','b','c']" />
<lui-select size="sm" placeholder="Small" :options="['a','b','c']" />
<lui-select size="md" placeholder="Medium" :options="['a','b','c']" />
<lui-select size="lg" placeholder="Large" :options="['a','b','c']" />
<lui-select size="xl" placeholder="xLarge" :options="['a','b','c']" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { size },
    template: `<div class="flex space-x-1">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const descriptionTemplate = `<lui-select description="This is a description" placeholder="Names" :options="['a','b','c']" />`
export const Description: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { description },
    template: descriptionTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: descriptionTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const stateTemplate = `
<lui-select :state="null" description="This is a description" placeholder="null" :options="['a','b','c']" />
<lui-select state="success" description="This is a description" placeholder="success" :options="['a','b','c']" />
<lui-select state="warning" description="This is a description" placeholder="warning" :options="['a','b','c']" />
<lui-select state="danger" description="This is a description" placeholder="danger" :options="['a','b','c']" />
`
export const State: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { state },
    template: stateTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const stateIconTemplate = `
<lui-select :state-icon="true" :state="null" description="This is a description" placeholder="Null" :options="['a','b','c']" />
<lui-select :state-icon="true" state="success" description="This is a description" placeholder="success" :options="['a','b','c']" />
<lui-select :state-icon="true" state="warning" description="This is a description" placeholder="warning" :options="['a','b','c']" />
<lui-select :state-icon="true" state="danger" description="This is a description" placeholder="danger" :options="['a','b','c']" />
`
export const StateIcon: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    args: { stateIcon },
    template: stateIconTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: stateIconTemplate
      },
      description: {
        story: ''
      }
    }
  }
}

const prependTemplate = `
<lui-select placeholder="Prepend" :options="['a','b','c']">
  <template #prepend>
    <i class="ri-home-line />
  </template>
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
          'The <b>prepend</b> slot can be used to place an icon to the left side of the LuiOption.'
      }
    }
  }
}

const appendTemplate = `
<lui-select placeholder="Append" :options="['a','b','c']">
  <template #append>
    <i class="ri-home-line />
  </template>
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
          'The <b>append</b> slot can be used to place an icon in the right side of the LuiOption.'
      }
    }
  }
}
