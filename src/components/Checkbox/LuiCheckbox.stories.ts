import LuiCheckbox from './LuiCheckbox.vue'
import { size, rounded, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiCheckbox allows the users to check or uncheck a checkbox and to add a description to it.'
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
      description: descriptions.argTypes.indeterminate
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiCheckbox>

const defaultTemplate = `<lui-checkbox />`
/** This is how a default LuiCheckbox looks. */
export const Default: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      }
    }
  }
}

const checkedTemplate = `
<lui-checkbox />
<lui-checkbox checked />
`
/** The <b>checked</b> props determines if the LuiCheckbox is checked or not. */
export const Checked: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="space-x-4">${checkedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: checkedTemplate
      }
    }
  }
}

const disabledTemplate = `
<lui-checkbox disabled />
<lui-checkbox disabled checked />
`
/** The <b>disabled</b> props is used to disable a LuiCheckbox. */
export const Disabled: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="space-x-4">${disabledTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
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
/** There are 5 options to control the size of a LuiCheckbox. */
export const Size: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="w-1/2 grid grid-cols-5 gap-x-2 gap-y-4 items-end justify-start">${sizeTemplate}</div>`
  }),
  args: { size },
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
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
/** There are 3 options to round the corners of a LuiCheckbox. */
export const Rounded: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="w-1/3 grid grid-cols-3 gap-y-4">${roundedTemplate}</div>`
  }),
  args: { rounded },
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      }
    }
  }
}

const descriptionTemplate = `
<lui-checkbox description="This is a description." checked />
<lui-checkbox description="This is a description."  />
`
/** The <b>description</b> props helps us to add a text to a LuiCheckbox. */
export const Description: Story = {
  render: () => ({
    components: { LuiCheckbox },
    args: { description },
    template: `
    <div class="w-1/2 grid grid-cols-2">${descriptionTemplate}</div>
  `
  }),
  parameters: {
    docs: {
      source: {
        code: descriptionTemplate
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
/** There are 4 states to change the description color of a LuiCheckbox. */
export const State: Story = {
  render: () => ({
    components: { LuiCheckbox },
    args: { state },
    template: `
    <div class="grid grid-cols-4">${stateTemplate}</div>
  `
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      }
    }
  }
}

const indeterminateTemplate = `
<lui-checkbox indeterminate checked />
<lui-checkbox indeterminate disabled />
`
/** There is also the <b>indeterminate</b> props, often used to symbolize a “partially” checked checkbox. */
export const Indeterminate: Story = {
  render: () => ({
    components: { LuiCheckbox },
    template: `<div class="space-x-4">${indeterminateTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: indeterminateTemplate
      }
    }
  }
}
