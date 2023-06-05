import LuiButton from './LuiButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import {
  variant,
  color,
  block,
  rounded,
  size,
  filter
} from '../../../.storybook/global-story-argtypes'

const descriptions = {
  docs: {
    component:
      'LuiButton is used to trigger an action or event when clicked or activated by the user. It also gives the non-button elements (e.g. div, a ) a style to make them look and act like a button.'
  },
  argTypes: {
    tag: 'Sets root element tag for the component and is used to make it look like this element. (e.g. button, div, a) ',
    icon: 'Used to place an icon in the component, can not be used to add text',
    prepend: 'Used to add a text to the right side of the icon',
    append: 'Used to add a text to the left side of the icon'
  }
}
const meta: Meta<typeof LuiButton> = {
  title: 'LUI/Button',
  component: LuiButton,
  argTypes: {
    variant,
    color,
    block,
    rounded,
    size,
    tag: {
      control: { type: 'select' },
      options: ['button', 'div', 'a'],
      default: 'button',
      description: descriptions.argTypes.tag
    },
    icon: {
      description: descriptions.argTypes.icon
    },
    prepend: {
      description: descriptions.argTypes.prepend
    },
    append: {
      description: descriptions.argTypes.append
    }
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
  // includeStories: /.*Default$/ // 👈 Storybook ignores anything that contains Data
}

export default meta
type Story = StoryObj<typeof LuiButton>

const defaultTemplate = `<lui-button>Default Button</lui-button>`
export const Default: Story = {
  render: () => ({
    components: { LuiButton },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'This is how a default LuiButton looks. The default color is the <i>primary</i> color. <pre><code>The value for the primary color is defined in the Tailwind CSS configuration file and can be changed there.</code></pre>'
      }
    }
  }
}

const disabledTemplate = `<lui-button disabled>Disabled Button</lui-button>`
export const Disabled: Story = {
  render: () => ({
    components: { LuiButton },
    template: disabledTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      },
      description: {
        story: 'The <b>disabled</b> props is used to disable a LuiButton.'
      }
    }
  }
}

const variantTemplate = `
<lui-button variant="solid">Solid</lui-button>
<lui-button variant="outline">Outline</lui-button>
<lui-button variant="link">Link</lui-button>
<lui-button variant="text">Text</lui-button>
`
export const Variant: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="flex space-x-4 items-center">${variantTemplate}</div>`
  }),
  args: { variant },
  parameters: {
    docs: {
      source: {
        code: variantTemplate
      },
      description: {
        story: 'There are 4 variant options to customize the LuiButton.'
      }
    }
  }
}

const colorTemplate = `
<lui-button color="primary">Primary</lui-button>
<lui-button color="secondary">Secondary</lui-button>
<lui-button color="info">Info</lui-button>
<lui-button color="success">Success</lui-button>
<lui-button color="warning">Warning</lui-button>
<lui-button color="danger">Danger</lui-button>
`
export const Color: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="grid grid-cols-6 gap-x-2 gap-y-4">${colorTemplate}</div>`
  }),
  args: { color },
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story:
          'There are 6 options to customize the color of a LuiButton. (See the details: https://www...)'
      }
    }
  }
}

const filterTemplate = `
<lui-button color="primary" filter="darken">Darken</lui-button>
<lui-button color="secondary" filter="darken">Darken</lui-button>
<lui-button color="info" filter="darken">Darken</lui-button>
<lui-button color="success" filter="darken">Darken</lui-button>
<lui-button color="warning" filter="darken">Darken</lui-button>
<lui-button color="danger" filter="darken">Darken</lui-button>
<lui-button color="primary" filter="lighten">Lighten</lui-button>
<lui-button color="secondary" filter="lighten">Lighten</lui-button>
<lui-button color="info" filter="lighten">Lighten</lui-button>
<lui-button color="success" filter="lighten">Lighten</lui-button>
<lui-button color="warning" filter="lighten">Lighten</lui-button>
<lui-button color="danger" filter="lighten">Lighten</lui-button>
`
export const Filter: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="grid grid-cols-6 gap-x-2 gap-y-4">${filterTemplate}</div>`
  }),
  args: { color, filter },
  parameters: {
    docs: {
      source: {
        code: filterTemplate
      },
      description: {
        story: 'The <b>filter</b> props is used to lighten or darken the selected color.'
      }
    }
  }
}

const sizeTemplate = `
<lui-button size="xs">xSmall</lui-button>
<lui-button size="sm">Small</lui-button>
<lui-button size="md">Medium</lui-button>
<lui-button size="lg">Large</lui-button>
<lui-button size="xl">xLarge</lui-button>
`
export const Size: Story = {
  render: () => ({
    components: { LuiButton },
    template: sizeTemplate
  }),
  args: { size },
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story:
          'There are 5 options to control the size of a LuiButton. (The size property might change the padding and/or the font size.)'
      }
    }
  }
}

const roundedTemplate = `
<lui-button :rounded="false">False</lui-button>
<lui-button :rounded="true">True</lui-button>
<lui-button rounded="full">Full</lui-button>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiButton },
    template: roundedTemplate
  }),
  args: { rounded },
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 3 options to round the corners of a LuiButton.'
      }
    }
  }
}

const blockTemplate = `<lui-button block>Block</lui-button>`
export const Block: Story = {
  render: () => ({
    components: { LuiButton },
    template: blockTemplate
  }),
  args: { block },
  parameters: {
    docs: {
      source: {
        code: blockTemplate
      },
      description: {
        story: 'The <b>block</b> props provides a full width button look.'
      }
    }
  }
}

const iconSlotTemplate = `
<lui-button>
  <template #icon>
    <i class="ri-home-line" />
  </template>
</lui-button>
`
export const IconSlot: Story = {
  render: () => ({
    components: { LuiButton },
    template: iconSlotTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: iconSlotTemplate
      },
      description: {
        story:
          'The <b>icon</b> slot can be used to place an icon in a LuiButton. Note that to add a text next to the icon, you must use the <b>append</b> or <b>prepend</b> slots.'
      }
    }
  }
}

const prependSlotTemplate = `
<lui-button>
  <template #prepend>
    <i class="ri-home-line" />
  </template>
  Prepend
</lui-button>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiButton },
    template: prependSlotTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: prependSlotTemplate
      },
      description: {
        story:
          'The <b>prepend</b> slot is used to add a text in the LuiButton to the right side of the icon.'
      }
    }
  }
}

const appendSlotTemplate = `
<lui-button>
  Append
  <template #append>
    <i class="ri-home-line" />
  </template>
</lui-button>
`
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiButton },
    template: appendSlotTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: appendSlotTemplate
      },
      description: {
        story:
          'The <b>append</b> slot is used to add a text in the LuiButton to the left side of the icon.'
      }
    }
  }
}

const inheritedSizeTemplate = `
<div><lui-button size="xs"><template #icon><i class="ri-home-line" /></template></lui-button></div>
<div><lui-button size="sm"><template #icon><i class="ri-home-line" /></template></lui-button></div>
<div><lui-button size="md"><template #icon><i class="ri-home-line" /></template></lui-button></div>
<div><lui-button size="lg"><template #icon><i class="ri-home-line" /></template></lui-button></div>
<div><lui-button size="xl"><template #icon><i class="ri-home-line" /></template></lui-button></div>
`
export const InheritedIconSizes: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="flex items-center space-x-4">${inheritedSizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `
<lui-button size="xs"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="sm"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="md"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="lg"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="xl"><template #icon><i class="ri-home-line" /></template></lui-button>
        `
      },
      description: {
        story:
          "Here, the icon sizes are changed accordingly, because they're inherited from the button sizes."
      }
    }
  }
}

const tagTemplate = `
<lui-button tag="div" variant="outline">
  This is a button.
</lui-button>
<lui-button tag="a" href="https://google.com" target="_blank">
  Go to Google
</lui-button>
`
export const Tag: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="flex space-x-4">${tagTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: tagTemplate
      },
      description: {
        story:
          "The <b>tag</b> props is used to give the LuiButton the functionality of the 'div' or 'a' element. When it's passed a tag props, it acts like that element and can have its attributes."
      }
    }
  }
}
