import LuiButton from './LuiButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { variant, color, block, rounded, size } from '../../../.storybook/global-story-argtypes'

const descriptions = {
  docs: {
    component:
      'LuiButton allows the users to perform an action once activated. It also gives the non-button elements (e.g. div, a ) a style to make them look and act like a button.'
  },
  argTypes: {
    tag: 'Sets root element tag for LuiButton and is used to make a non-button element (e.g. div, a) look like a button.)'
  },
  slots: {
    default: 'Used as a default slot to place a text in a LuiButton',
    icon: 'Used to place an icon in a LuiButton, can not be used to add text',
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
      description: descriptions.argTypes.tag
    },
    default: {
      description: descriptions.slots.default
    },
    icon: {
      description: descriptions.slots.icon
    },
    prepend: {
      description: descriptions.slots.prepend
    },
    append: {
      description: descriptions.slots.append
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
/** This is how a default LuiButton looks. The default color is the <i>primary</i> color. <pre><code>The value for the primary color is defined in the Tailwind CSS configuration file and can be changed there.</code></pre>*/
export const Default: Story = {
  render: () => ({
    components: { LuiButton },
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

const disabledTemplate = `<lui-button disabled>Disabled Button</lui-button>`
/** The <b>disabled</b> props is used to disable a LuiButton. */
export const Disabled: Story = {
  render: () => ({
    components: { LuiButton },
    template: disabledTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      }
    }
  }
}

const tagTemplate = `
<lui-button tag="a" href="https://developer.mozilla.org" target="blank">Button tagged "a"</lui-button>
<lui-button tag="div">Button tagged "div"</lui-button>
`
/** The <b>tag</b> props is used to assign the LuiButton a "div" or "a" functionality. When a LuiButton is passed a tag props, it acts like that element and can have its attributes. */
export const Tag: Story = {
  render: () => ({
    components: { LuiButton },
    template: tagTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: tagTemplate
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
/** There are 4 variant options to customize how a LuiButton looks. */
export const Variant: Story = {
  render: () => ({
    components: { LuiButton },
    template: variantTemplate
  }),
  args: { variant },
  parameters: {
    docs: {
      source: {
        code: variantTemplate
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
/** There are 6 options to customize the color of a LuiButton. (See the details: https://www...). */
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
/** The <b>filter</b> props is used to lighten or darken the selected color.*/
export const Filter: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="grid grid-cols-6 gap-x-2 gap-y-4">${filterTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: filterTemplate
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
/** There are 5 options to control the size of a LuiButton. (The size property might change the padding and/or the font size.) */
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
      }
    }
  }
}

const roundedTemplate = `
<lui-button :rounded="false">False</lui-button>
<lui-button :rounded="true">True</lui-button>
<lui-button rounded="full">Full</lui-button>
`
/** There are 3 options to round the corners of a LuiButton. */
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
      }
    }
  }
}

const blockTemplate = `<lui-button block>Block</lui-button>`
/** The <b>block</b> props provides a full width button look.*/
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
      }
    }
  }
}

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>

const iconSlotTemplate = `
<lui-button>
  <template #icon>
    <i class="ri-home-line" />
  </template>
</lui-button>
`
/** To place an icon in a LuiButton the #icon slot can be used. With the #icon slot, you can not add a text. To add a text next to the icon, you must use the #append or #prepend slots. */
export const IconSlot: Story = {
  render: () => ({
    components: { LuiButton },
    template: iconSlotTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: iconSlotTemplate
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
/** The slot #prepend is used to add a text to the right side of the icon.*/
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiButton },
    template: prependSlotTemplate
  }),
  parameters: {
    docs: {
      source: { code: prependSlotTemplate }
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
/** The slot #append is used to add a text to the left side of the icon.*/
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiButton },
    template: appendSlotTemplate
  }),
  parameters: {
    docs: {
      source: { code: appendSlotTemplate }
    }
  }
}

const inheritedSizeTemplate = `
<lui-button size="xs"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="sm"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="md"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="lg"><template #icon><i class="ri-home-line" /></template></lui-button>
<lui-button size="xl"><template #icon><i class="ri-home-line" /></template></lui-button>
`

/** Here, the icon sizes are changed accordingly, because they're inherited from the button sizes. */
export const InheritedIconSizes: Story = {
  render: () => ({
    components: { LuiButton },
    template: `<div class="w-full gap-x-2 gap-y-4">${inheritedSizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: inheritedSizeTemplate
      }
    }
  }
}
