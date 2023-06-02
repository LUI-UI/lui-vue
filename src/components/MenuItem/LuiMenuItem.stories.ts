import LuiMenuItem from './LuiMenuItem.vue'
import { color, size, rounded, block } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component: 'LuiMenuItem allows users to choose from available menu items.'
  },
  argTypes: {
    prepend: 'Used to add a text to the right side of the icon',
    append: 'Used to add a text to the left side of the icon',
    default: 'Used as default to add a text in the component',
    tag: 'Sets root element tag for the component and is used to make it look like this element. (e.g. button, div, a) '
  }
}

const meta: Meta<typeof LuiMenuItem> = {
  title: 'LUI/MenuItem',
  component: LuiMenuItem,
  argTypes: {
    color,
    size,
    block,
    rounded,
    tag: {
      control: { type: 'select' },
      options: ['button', 'div', 'a'],
      default: 'button',
      description: descriptions.argTypes.tag
    },
    prepend: { description: descriptions.argTypes.prepend },
    append: { description: descriptions.argTypes.append },
    default: { description: descriptions.argTypes.default }
  },
  decorators: [() => ({ template: '<div class="space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiMenuItem>

const defaultTemplate = `
<lui-menu-item>Menu Item 1</lui-menu-item>
<lui-menu-item>Menu Item 2</lui-menu-item>
<lui-menu-item>Menu Item 3</lui-menu-item>
`
export const Default: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: `<div class="flex">${defaultTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'This is how a default LuiMenuItem looks. Note that it takes the full width of its container by default.'
      }
    }
  }
}

const disabledTemplate = `
<lui-menu-item>Menu Item 1</lui-menu-item>
<lui-menu-item disabled>Disabled Menu Item 2</lui-menu-item>
<lui-menu-item>Menu Item 3</lui-menu-item>
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: `<div class="flex">${disabledTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: disabledTemplate
      },
      description: {
        story: 'The <b>disabled</b> props is used to disable a LuiMenuItem.'
      }
    }
  }
}

const roundedTemplate = `
<lui-menu-item :rounded="false">Menu Item 1</lui-menu-item>
<lui-menu-item :rounded="true">Menu Item 2</lui-menu-item>
<lui-menu-item rounded="full">Menu Item 3</lui-menu-item>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiMenuItem },
    args: { rounded },
    template: `<div class="flex">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 3 options to round the corners of a LuiMenuItem.'
      }
    }
  }
}

const sizeTemplate = `
<div><lui-menu-item size="xs">xSmall</lui-menu-item></div>
<div><lui-menu-item size="sm">Small</lui-menu-item></div>
<div><lui-menu-item size="md">Medium</lui-menu-item></div>
<div><lui-menu-item size="lg">Large</lui-menu-item></div>
<div><lui-menu-item size="xl">xLarge</lui-menu-item></div>
`
export const Size: Story = {
  render: () => ({
    components: { LuiMenuItem },
    args: { size },
    template: `<div class="flex items-baseline space-x-8">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `
<lui-menu-item size="xs">xSmall</lui-menu-item>
<lui-menu-item size="sm">Small</lui-menu-item>
<lui-menu-item size="md">Medium</lui-menu-item>
<lui-menu-item size="lg">Large</lui-menu-item>
<lui-menu-item size="xl">xLarge</lui-menu-item>
        `
      },
      description: {
        story:
          'There are 5 options to control the size of a LuiMenuItem. Note that the text size changes responsively.'
      }
    }
  }
}

const colorTemplate = `
<lui-menu-item color="primary">Primary</lui-menu-item>
<lui-menu-item color="secondary">Secondary</lui-menu-item>
<lui-menu-item color="info">Info</lui-menu-item>
<lui-menu-item color="success">Success</lui-menu-item>
<lui-menu-item color="warning">Warning</lui-menu-item>
<lui-menu-item color="danger">Danger</lui-menu-item>
`
export const Color: Story = {
  render: () => ({
    components: { LuiMenuItem },
    args: { color },
    template: `<div class="flex">${colorTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story:
          'There are 6 options to customize the color of a LuiMenuItem. The <b>color</b> props changes the text color and the background color on hover.'
      }
    }
  }
}

const prependTemplate = `
<lui-menu-item>
  <template #prepend>
    <i class="ri-edit-box-line" />
  </template>
  Edit
</lui-menu-item>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: prependTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: prependTemplate
      },
      description: {
        story:
          'The <b>prepend</b> slot is used to add a text in the LuiMenuItem to the right side of the icon.'
      }
    }
  }
}

const appendTemplate = `
<lui-menu-item>
  Duplicate
  <template #append>
    <i class="ri-file-copy-line" />
  </template>
</lui-menu-item>
`
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: appendTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: appendTemplate
      },
      description: {
        story:
          'The <b>append</b> slot is used to add a text in the LuiMenuItem to the left side of the icon.'
      }
    }
  }
}

const tagTemplate = `
<lui-menu-item tag="button">Button Menu Item</lui-menu-item>
<lui-menu-item tag="a" href="https://google.com" target="_blank">Link Menu Item</lui-menu-item>
`
export const Tag: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: `<div class="flex">${tagTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: tagTemplate
      },
      description: {
        story:
          "The <b>tag</b> props is used to give the LuiMenuItem the functionality of the 'button' or 'a' element. When it's passed a tag props, it acts like that element and can have its attributes."
      }
    }
  }
}
