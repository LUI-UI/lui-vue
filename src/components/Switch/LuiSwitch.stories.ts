import LuiSwitch from './LuiSwitch.vue'
import { rounded, size, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiSwitch> = {
  title: 'LUI/Switch',
  component: LuiSwitch,
  argTypes: {
    rounded,
    size,
    description,
    state
  }
}
export default meta
type Story = StoryObj<typeof LuiSwitch>

const defaultTemplate = `<lui-switch />`
/** This is how a default LuiSwitch looks. */
export const Default: Story = {
  render: () => ({
    components: { LuiSwitch },
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

const checkedTemplate = `<lui-switch checked />`
/** The <b>checked</b> props determines if the LuiSwitch is checked or not. */
export const Checked: Story = {
  render: () => ({
    components: { LuiSwitch },
    template: checkedTemplate
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
<lui-switch checked disabled />
<lui-switch disabled />
`
/** The <b>disabled</b> props is used to disable a LuiSwitch. */
export const Disabled: Story = {
  render: () => ({
    components: { LuiSwitch },
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
<lui-switch size="xs" />
<lui-switch size="sm" />
<lui-switch size="md" />
<lui-switch size="lg" />
<lui-switch size="xl" />
`
/** There are 5 options to control the size of a LuiSwitch. */
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
      }
    }
  }
}

const roundedTemplate = `
<lui-switch :rounded="false" />
<lui-switch :rounded="true" />
<lui-switch rounded="full" />
`
/** There are 3 options to round the corners of a LuiSwitch. */
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
      }
    }
  }
}

const descriptionTemplate = `
<lui-switch description="Switch description" />
`
/** The <b>description</b> props helps us to add a text to a LuiSwitch. */
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
      }
    }
  }
}

const stateTemplate = `
<lui-switch :state="true" description="Switch description" />
<lui-switch :state="false" description="Switch description" />
<lui-switch state="warning" description="Switch description" />
<lui-switch state="null" description="Switch description" />
`
/** There are 4 states to change the description color of a LuiSwitch. */
export const State: Story = {
  render: () => ({
    components: { LuiSwitch },
    args: { description },
    template: `<div class="w-2/3 grid grid-cols-4">${stateTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      }
    }
  }
}

// const exampleTemplate = `
// <div class="flex space-x-8">
//   <p>Do you want to subscribe to our newsletter?</p>
//   <lui-switch />
// </div>
// <div class="flex space-x-8">
//   <p>Do you want to be notiffied by phone?</p>
//   <lui-switch />
// </div>
// <div class="flex space-x-8">
//   <p>Do you want to be notiffied by email?</p>
//   <lui-switch />
// </div>
// `
// /** Here are some use cases of a LuiSwitch. */
// export const Examples: Story = {
//   render: () => ({
//     components: { LuiSwitch },
//     args: { description },
//     template: `<div class="flex flex-col space-x-8">${exampleTemplate}</div>`
//   }),
//   parameters: {
//     docs: {
//       source: {
//         code: exampleTemplate
//       }
//     }
//   }
// }
