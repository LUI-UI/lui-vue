import LuiCheckbox from './LuiCheckbox.vue'
import { size, rounded, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const descriptions = {
  docs: {
    component:
      'LuiCheckbox allows users to select or deselect a specific option from a set of choices by clicking or tapping on the checkbox, providing a binary selection state.'
  },
  argTypes: {
    indeterminate: 'Used to symbolize a “partially” checked state.'
  }
}

const meta: Meta<typeof LuiCheckbox> = {
  title: 'LUI/Checkbox',
  component: LuiCheckbox,
  argTypes: {
    size,
    rounded,
    state,
    description,
    indeterminate: {
      control: 'boolean',
      options: [true, false],
      default: false,
      description: descriptions.argTypes.indeterminate
    }
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiCheckbox>

const defaultTemplate = `<lui-checkbox />`
export const Default: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiCheckbox looks.'
      }
    }
  }
}

const checkedTemplate = `
<lui-checkbox />
<lui-checkbox checked />
`
export const Checked: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="space-x-4">${checkedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: checkedTemplate
      },
      description: {
        story: 'The <b>checked</b> props determines if the LuiCheckbox is checked or not.'
      }
    }
  }
}

const disabledTemplate = `
<lui-checkbox disabled />
<lui-checkbox disabled checked />
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="space-x-4">${disabledTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      },
      description: {
        story: 'The <b>disabled</b> props is used to disable a LuiCheckbox.'
      }
    }
  }
}

const sizeTemplate = `
<lui-checkbox size="xs" />
<lui-checkbox size="sm" />
<lui-checkbox size="md" />
<lui-checkbox size="lg" />
<lui-checkbox size="xl" />
<lui-checkbox size="xs" checked />
<lui-checkbox size="sm" checked />
<lui-checkbox size="md" checked />
<lui-checkbox size="lg" checked />
<lui-checkbox size="xl" checked />
`
export const Size: Story = {
  render: () => ({
    components: { LuiCheckbox },
    args: { size },
    template: `<div class="w-1/2 grid grid-cols-5 gap-x-2 gap-y-4 items-end justify-start">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiCheckbox.'
      }
    }
  }
}

const roundedTemplate = `
<lui-checkbox :rounded="false"/>
<lui-checkbox :rounded="true"/>
<lui-checkbox rounded="full"/>
<lui-checkbox :rounded="false" checked/>
<lui-checkbox :rounded="true" checked/>
<lui-checkbox rounded="full" checked/>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiCheckbox },
    args: { rounded },
    template: `<div class="w-1/3 grid grid-cols-3 gap-y-4">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 3 options to round the corners of a LuiCheckbox.'
      }
    }
  }
}

const descriptionTemplate = `<lui-checkbox description="This is a description." checked />`
export const Description: Story = {
  render: () => ({
    components: { LuiCheckbox },
    args: { description },
    template: descriptionTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: descriptionTemplate
      },
      description: {
        story: 'The <b>description</b> props is used to add a description to a LuiCheckbox.'
      }
    }
  }
}

const stateTemplate = `
<lui-checkbox :state="true" description="This is a description." checked/>
<lui-checkbox :state="false" description="This is a description." checked />
<lui-checkbox state="warning" description="This is a description." checked />
<lui-checkbox state="null" description="This is a description." checked />
`
export const State: Story = {
  render: () => ({
    components: { LuiCheckbox },
    args: { state },
    template: `<div class="grid grid-cols-4">${stateTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      },
      description: {
        story: 'There are 4 states to change the description color of a LuiCheckbox.'
      }
    }
  }
}

const indeterminateTemplate = `<lui-checkbox indeterminate checked />`
export const Indeterminate: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: indeterminateTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: indeterminateTemplate
      },
      description: {
        story:
          'There is also the <b>indeterminate</b> props, often used to symbolize a “partially” checked checkbox.'
      }
    }
  }
}

// The template for the component story
const toggleCheckTemplate = `
<lui-checkbox v-model="isChecked" checked />`
export const ToggleCheckbox: Story = {
  render: () => ({
    components: { LuiCheckbox },
    setup() {
      const isChecked = ref(true)
      return { isChecked }
    },
    template: `
    <div class="flex flex-col space-y-4">
      <h1>isChecked: {{ isChecked }}</h1>
      <div>${toggleCheckTemplate}</div>
    </div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `{{ isChecked }}${toggleCheckTemplate}`
      },
      description: {
        story:
          'A simple checkbox component for a toggle check. Toggle the checkbox to see the result.'
      }
    }
  }
}

const multipleCheckTemplate = `
<lui-checkbox v-model="checkedNames" value="Jack" description="Jack" checked />
<lui-checkbox v-model="checkedNames" value="John" description="John" />
<lui-checkbox v-model="checkedNames" value="Jane" description="Jane" />
`
export const MultipleCheckboxes: Story = {
  render: () => ({
    components: { LuiCheckbox },
    setup() {
      const checkedNames = ref(['Jack'])
      return { checkedNames }
    },
    template: `
  <div class="flex flex-col space-y-4">
    <h1>checkedNames: {{ checkedNames }}</h1>
    <div class="flex space-x-4">${multipleCheckTemplate}</div>
  </div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `{{ checkedNames }}${multipleCheckTemplate}`
      },
      description: {
        story: 'Multiple checkboxes for selecting names. You can select as many names as you want.'
      }
    }
  }
}
