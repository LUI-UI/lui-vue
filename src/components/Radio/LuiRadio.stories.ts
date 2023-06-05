import LuiRadio from './LuiRadio.vue'
import { size, state, description } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const descriptions = {
  docs: {
    component:
      'LuiRadio allows users to select a single option from a set of mutually exclusive choices, with only one radio button within the same group being selectable at a time.'
  }
}

const meta: Meta<typeof LuiRadio> = {
  title: 'LUI/Radio',
  component: LuiRadio,
  argTypes: {
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

type Story = StoryObj<typeof LuiRadio>

const defaultTemplate = `<lui-radio />`
export const Default: Story = {
  render: () => ({
    components: { LuiRadio },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiRadio looks.'
      }
    }
  }
}

const checkedTemplate = `<lui-radio checked />`
export const Checked: Story = {
  render: () => ({
    components: { LuiRadio },
    template: `<div class="space-x-4">${checkedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: checkedTemplate
      },
      description: {
        story: 'The <b>checked</b> props determines if the LuiRadio is checked or not.'
      }
    }
  }
}

const disabledTemplate = `
<lui-radio disabled />
<lui-radio disabled checked />
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiRadio },
    template: `<div class="space-x-4">${disabledTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      },
      description: {
        story: 'The <b>disabled</b> props is used to disable a LuiRadio.'
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
export const Size: Story = {
  render: () => ({
    components: { LuiRadio },
    args: { size },
    template: `<div class="flex items-center space-x-4">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiRadio.'
      }
    }
  }
}

const descriptionTemplate = `
<lui-radio description="Radio description" checked />
`
export const Description: Story = {
  render: () => ({
    components: { LuiRadio },
    args: { description },
    template: `<div class="w-1/2 grid grid-cols-2">${descriptionTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: descriptionTemplate
      },
      description: {
        story:
          'The <b>description</b> props is used to add a description to a LuiRadio, typically used for validation and error handling.'
      }
    }
  }
}

const stateTemplate = `
<lui-radio :state="null" description="This is a description" checked />
<lui-radio :state="true" description="This is a description" checked />
<lui-radio state="warning" description="This is a description" checked />
<lui-radio :state="false" description="This is a description" checked />
`
export const State: Story = {
  render: () => ({
    components: { LuiRadio },
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
          'There are 4 states used for validation and error handling and they give a border of the state color to the LuiRadio. When used with the <b>description</b> props they also change the color of the description.'
      }
    }
  }
}

const radioTemplate = `
<lui-radio v-model="picked" name="picked" value="Winter" description="Winter" />
<lui-radio v-model="picked" name="picked" value="Spring" description="Spring" />
<lui-radio v-model="picked" name="picked" value="Summer" description="Summer" />
<lui-radio v-model="picked" name="picked" value="Autumn" description="Autumn" />
`
export const PickedRadio: Story = {
  render: () => ({
    components: { LuiRadio },
    setup() {
      const picked = ref('')
      return { picked }
    },
    template: `
    <div class="flex flex-col space-y-4">
      <h1>Pick one: {{ picked }}</h1>
      <div class="flex space-x-4">${radioTemplate}</div>
    </div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `{{ picked }}${radioTemplate}`
      },
      description: {
        story: 'A simple radio example to select a value. You can only select one.'
      }
    }
  }
}
