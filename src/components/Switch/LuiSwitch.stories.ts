import LuiSwitch from './LuiSwitch.vue'
import { rounded, size, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiSwitch provides a binary on/off or true/false functionality, allowing users to switch between two states with a single click or touch, typically used for enabling or disabling a feature or option.'
  }
}

const meta: Meta<typeof LuiSwitch> = {
  title: 'LUI/Switch',
  component: LuiSwitch,
  argTypes: {
    rounded,
    size,
    description,
    state
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiSwitch>

const defaultTemplate = `<lui-switch />`
export const Default: Story = {
  render: () => ({
    components: { LuiSwitch },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiSwitch looks.'
      }
    }
  }
}

const checkedTemplate = `<lui-switch checked />`
export const Checked: Story = {
  render: () => ({
    components: { LuiSwitch },
    template: checkedTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: checkedTemplate
      },
      description: {
        story: 'The <b>checked</b> props determines if the LuiSwitch is checked or not.'
      }
    }
  }
}

const disabledTemplate = `
<lui-switch checked disabled />
<lui-switch disabled />
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiSwitch },
    template: `<div class="space-x-4">${disabledTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      },
      description: {
        story: 'The <b>disabled</b> props is used to disable a LuiSwitch.'
      }
    }
  }
}

const sizeTemplate = `
<lui-switch size="xs" />
<lui-switch size="sm" />
<lui-switch size="md" />
<lui-switch size="lg" />
<lui-switch size="xl" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiSwitch },
    args: { size },
    template: `<div class="w-1/2 items-center grid grid-cols-5">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiSwitch.'
      }
    }
  }
}

const roundedTemplate = `
<lui-switch :rounded="false" />
<lui-switch :rounded="true" />
<lui-switch rounded="full" />
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiSwitch },
    args: { rounded },
    template: `<div class="w-1/3 grid grid-cols-3">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 3 options to round the corners of a LuiSwitch.'
      }
    }
  }
}

const descriptionTemplate = `
<lui-switch description="Switch description" />
`
export const Description: Story = {
  render: () => ({
    components: { LuiSwitch },
    args: { description },
    template: descriptionTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: descriptionTemplate
      },
      description: {
        story:
          'The <b>description</b> props is used to add a description to a LuiSwitch, typically used for validation and error handling.'
      }
    }
  }
}

const stateTemplate = `
<lui-switch :state="null" description="This is a description" />
<lui-switch :state="true" description="This is a description" />
<lui-switch state="warning" description="This is a description" />
<lui-switch :state="false" description="This is a description" />
`
export const State: Story = {
  render: () => ({
    components: { LuiSwitch },
    args: { state },
    template: `<div class="w-2/3 grid grid-cols-4">${stateTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      },
      description: {
        story:
          'There are 4 states used for validation and error handling and they give a border of the state color to the LuiSwitch. When used with the <b>description</b> props they also change the color of the description.'
      }
    }
  }
}
