import LuiTextarea from './LuiTextarea.vue'
import {
  rounded,
  size,
  state,
  description,
  stateIcon,
  block
} from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiTextarea allows users to input or display multiple lines of text within a fixed rectangular area, often used for longer texts, comments, or descriptions.'
  },
  argTypes: {
    resize: 'Used to control the resizability of the LuiTextarea '
  }
}

const meta: Meta<typeof LuiTextarea> = {
  title: 'LUI/Textarea',
  component: LuiTextarea,
  argTypes: {
    rounded,
    size,
    description,
    state,
    stateIcon,
    block,
    resize: {
      control: { type: 'select' },
      options: [true, false, 'x', 'y'],
      default: true,
      description: descriptions.argTypes.resize
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
type Story = StoryObj<typeof LuiTextarea>

const defaultTemplate = `<lui-textarea placeholder="Type something" />`
export const Default: Story = {
  render: () => ({
    components: { LuiTextarea },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'This is how a default LuiTextarea looks. Note that the text area is resizable by default. You can just click and drag the yellow icon which appears at the lowest right part to resize the text area. This feature can be controlled by the <b>resize</b> prop.'
      }
    }
  }
}

const roundedTemplate = `
<lui-textarea rounded placeholder="Type something" />
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiTextarea },
    args: { rounded },
    template: `<div class="flex space-x-4">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'The <b>rounded</b> prop is used to round the corners of a LuiTextarea.'
      }
    }
  }
}

const blockTemplate = '<lui-textarea block placeholder="Type something" />'
export const Block: Story = {
  render: () => ({
    components: { LuiTextarea },
    args: { block },
    template: blockTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: blockTemplate
      },
      description: {
        story: 'The <b>block</b> prop provides a full width text area look.'
      }
    }
  }
}

const sizeTemplate = `
<lui-textarea size="xs" placeholder="xSmall" />
<lui-textarea size="sm" placeholder="Small" />
<lui-textarea size="md" placeholder="Medium" />
<lui-textarea size="lg" placeholder="Large" />
<lui-textarea size="xl" placeholder="xLarge" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiTextarea },
    args: { size },
    template: `<div class="flex flex-col space-y-2">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story:
          "The <b>size</b> prop in the LuiTextarea provides five options to control the size of the text area. These options include 'xs', 'sm', 'md', 'lg' and 'xl', allowing you to choose the desired size for the text area."
      }
    }
  }
}

const resizeTemplate = `
<lui-textarea :resize="true" placeholder="Resizable in both axis" />
<lui-textarea :resize="false" placeholder="Not resizable" />
<lui-textarea resize="x" placeholder="Resizable only horizontally" />
<lui-textarea resize="y" placeholder="Resizable only vertically" />
`
export const Resize: Story = {
  render: () => ({
    components: { LuiTextarea },
    template: resizeTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: resizeTemplate
      },
      description: {
        story:
          'By default a LuiTextarea is resizable in both horizontal (x) and vertical (y) axis. However the <b>resize</b> prop can be used to control the resizability.'
      }
    }
  }
}

const descriptionTemplate = `<lui-textarea description="This is a description" placeholder="Type something" />`
export const Description: Story = {
  render: () => ({
    components: { LuiTextarea },
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
          'The <b>description</b> prop is used to add a description to a LuiTextarea, typically used for validation and error handling.'
      }
    }
  }
}

const stateTemplate = `
<lui-textarea :state="null" description="This is a description" placeholder="Type something" />
<lui-textarea :state="true" description="This is a description" placeholder="Type something" />
<lui-textarea state="warning" description="This is a description" placeholder="Type something" />
<lui-textarea :state="false" description="This is a description" placeholder="Type something" />
`
export const State: Story = {
  render: () => ({
    components: { LuiTextarea },
    args: { state },
    template: `<div class="flex gap-x-4">${stateTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: stateTemplate
      },
      description: {
        story:
          'There are 4 states used for validation and error handling and they give a border of the state color to the LuiTextarea. When used with the <b>description</b> prop they also change the color of the description.'
      }
    }
  }
}

const stateIconTemplate = `
<lui-textarea state-icon :state="null" placeholder="Type something" />
<lui-textarea state-icon :state="true" placeholder="Type something" />
<lui-textarea state-icon state="warning" placeholder="Type something" />
<lui-textarea state-icon :state="false" placeholder="Type something" />
`
export const StateIcon: Story = {
  render: () => ({
    components: { LuiTextarea },
    args: { stateIcon },
    template: `<div class="flex gap-x-4">${stateIconTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: stateIconTemplate
      },
      description: {
        story:
          'The <b>state-icon</b> prop is used with the <b>state</b> prop for validation and error handling. It places an icon representing the valid state in the right side of the LuiTextarea.'
      }
    }
  }
}
