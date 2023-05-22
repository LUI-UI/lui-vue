import LuiRadio from './LuiRadio.vue'
import { size, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LuiRadio> = {
  title: 'LUI/Radio',
  component: LuiRadio,
  argTypes: {
    size,
    description,
    state
  }
}
export default meta

type Story = StoryObj<typeof LuiRadio>

const defaultTemplate = `
<lui-radio />
`
/** This is how a default LuiRadio looks. */
export const Default: Story = {
  render: () => ({
    components: { LuiRadio },
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
<lui-radio checked />
`
/** The <b>checked</b> props determines if the LuiRadio is checked or not. */
export const Checked: Story = {
  render: () => ({
    components: { LuiRadio },
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
<lui-radio disabled />
<lui-radio disabled checked />
`
/** The <b>disabled</b> props is used to disable a LuiRadio. */
export const Disabled: Story = {
  render: () => ({
    components: { LuiRadio },
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
<lui-radio size="xs" checked />
<lui-radio size="sm" checked />
<lui-radio size="md" checked />
<lui-radio size="lg" checked />
<lui-radio size="xl" checked />
`
/** There are 5 options to control the size of a LuiRadio. */
export const Size: Story = {
  render: () => ({
    components: { LuiRadio },
    template: `<div class="flex items-center space-x-4">${sizeTemplate}</div>`,
    args: { size }
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      }
    }
  }
}

const descriptionTemplate = `
<lui-radio description="Radio description" checked />
<lui-radio description="Radio description" />
`
/** The <b>description</b> props helps us to add a text to a LuiRadio. */
export const Description: Story = {
  render: () => ({
    components: { LuiRadio },
    template: `<div class="w-1/2 grid grid-cols-2">${descriptionTemplate}</div>`,
    args: { description }
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
<lui-radio :state="true" description="Radio description" checked />
<lui-radio :state="false" description="Radio description" checked />
<lui-radio state="warning" description="Radio description" checked />
<lui-radio state="null" description="Radio description" checked />
`
/** There are 4 states to change the description color of a LuiRadio. */
export const State: Story = {
  render: () => ({
    components: { LuiRadio },
    template: `<div class="w-2/3 grid grid-cols-4">${stateTemplate}</div>`,
    args: { state }
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      }
    }
  }
}
