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
      'LuiSelect, when used with LuiOption, presents a dropdown list of options, allowing users to choose a single value from the available options.'
  },
  argTypes: {
    prepend: 'Used to place an icon to the left side of the component',
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
      description: descriptions.argTypes.options
    },
    prepend: { description: descriptions.argTypes.prepend },
    placeholder: {
      control: 'text',
      description: descriptions.argTypes.placeholder
    },
    default: { description: descriptions.argTypes.default }
  },
  decorators: [() => ({ template: '<div class="py-40 space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
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
    template: `<p class="pl-2 pb-2">selectedName: {{selectedName}}</p>${defaultTemplate}`
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'This is how a default LuiSelect looks with two LuiOption components. Note that it has an auto-positioning behavior that makes the menu drop up or down where there is adequate screen space. To provide the options, you can either pass the <b>text</b> and <b>value</b> props to the LuiOption components or use the <b>options</b> props as described below.'
      }
    }
  }
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
    template: placeholderTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: placeholderTemplate
      },
      description: {
        story: 'With the <b>placeholder</b> props you can give a placeholder text to the LuiSelect.'
      }
    }
  }
}

const optionsTemplate = `<lui-select :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />`
export const Options: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const selectedName = ref('')
      return { selectedName }
    },
    template: optionsTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: optionsTemplate
      },
      description: {
        story:
          'Instead of using LuiOption components, you can simply pass the <b>options</b> props to the LuiSelect and provide the options in an object array including <b>text</b> and <b>value</b> properties.'
      }
    }
  }
}

const blockTemplate = `<lui-select block placeholder="Block" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />`
export const Block: Story = {
  render: () => ({
    components: { LuiSelect },
    args: { block },
    template: blockTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: blockTemplate
      },
      description: {
        story: 'The <b>block</b> props provides a full width select menu look.'
      }
    }
  }
}

const disabledTemplate = `
<lui-select disabled placeholder="Disabled">
  <lui-option disabled text="Mary" value="Mary"></lui-option>
  <lui-option disabled text="Jane" value="Jane"></lui-option>
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
        story: 'The <b>disabled</b> props is used to disable either the LuiSelect or the LuiOption.'
      }
    }
  }
}

const roundedTemplate = `
<lui-select :rounded="false" placeholder="Names" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select :rounded="true" placeholder="Names" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select rounded="full" placeholder="Names" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiSelect },
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
<lui-select size="xs" placeholder="xSmall" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select size="sm" placeholder="Small" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select size="md" placeholder="Medium" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select size="lg" placeholder="Large" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select size="xl" placeholder="xLarge" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiSelect },
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

const descriptionTemplate = `<lui-select description="This is a description" placeholder="Names" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />`
export const Description: Story = {
  render: () => ({
    components: { LuiSelect },
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
<lui-select :state="null" description="This is a description" placeholder="null" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select :state="true" description="This is a description" placeholder="success" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select state="warning" description="This is a description" placeholder="warning" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select :state="false" description="This is a description" placeholder="danger" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
`
export const State: Story = {
  render: () => ({
    components: { LuiSelect },
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
<lui-select :state-icon="true" :state="null" description="This is a description" placeholder="Null" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select :state-icon="true" :state="true" description="This is a description" placeholder="Success" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select :state-icon="true" state="warning" description="This is a description" placeholder="Warning" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
<lui-select :state-icon="true" :state="false" description="This is a description" placeholder="Danger" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />
`
export const StateIcon: Story = {
  render: () => ({
    components: { LuiSelect },
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
<lui-select placeholder="Prepend">
  <template #prepend>
    <i class="ri-home-line />
  </template>
</lui-select>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiSelect },
    template: prependTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: prependTemplate
      },
      description: {
        story:
          'The <b>prepend</b> slot can be used to place an icon to the left side of the component, before the text.'
      }
    }
  }
}

const searchableTemplate = `<lui-select searchable :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />`
export const Searchable: Story = {
  render: () => ({
    components: { LuiSelect },
    template: searchableTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: searchableTemplate
      },
      description: {
        story:
          'This is how a default LuiSelect looks with two LuiOption components. Note that it has an auto-positioning behavior that makes the menu drop up or down where there is adequate screen space. To provide the options, you can either pass the <b>text</b> and <b>value</b> props to the LuiOption components or use the <b>options</b> props as described below.'
      }
    }
  }
}

const modelTemplate = `<lui-select v-model="selectedName" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />`
export const Model: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const selectedName = ref('')
      return { selectedName }
    },
    template: `<p class="pl-2 pb-2">selectedName: {{selectedName}}</p>${modelTemplate}`
  }),
  parameters: {
    docs: {
      source: {
        code: modelTemplate
      },
      description: {
        story: 'v-model'
      }
    }
  }
}

const changeTemplate = `<lui-select @change="consoleLog" :options="[{text:'Mary', value:'Mary'}, {text:'Jane', value:'Jane'}]" />`
export const Change: Story = {
  render: () => ({
    components: { LuiSelect },
    setup() {
      const selectedName = ref('')
      function consoleLog() {
        console.log(selectedName, ' is selected.')
      }
      return { selectedName, consoleLog }
    },
    template: `<p class="pl-2 pb-2">selectedName: {{selectedName}}</p>${changeTemplate}`
  }),
  parameters: {
    docs: {
      source: {
        code: changeTemplate
      },
      description: {
        story:
          'This is how a default LuiSelect looks with two LuiOption components. Note that it has an auto-positioning behavior that makes the menu drop up or down where there is adequate screen space. To provide the options, you can either pass the <b>text</b> and <b>value</b> props to the LuiOption components or use the <b>options</b> props as described below.'
      }
    }
  }
}
