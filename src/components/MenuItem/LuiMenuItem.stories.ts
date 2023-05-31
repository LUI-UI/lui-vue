import LuiMenuItem from './LuiMenuItem.vue'
import { color, size, rounded } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component: 'LuiMenuItem allows users to choose from available menu items.'
  },
  argTypes: {
    prepend: 'Used to add a text to the right side of the icon',
    append: 'Used to add a text to the left side of the icon'
  }
}

const meta: Meta<typeof LuiMenuItem> = {
  title: 'LUI/MenuItem',
  component: LuiMenuItem,
  argTypes: {
    color,
    size,
    rounded,
    prepend: { description: descriptions.argTypes.prepend },
    append: { description: descriptions.argTypes.append }
  },
  decorators: [() => ({ template: '<div class="h-[160px] space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiMenuItem>

const defaultTemplate = `<lui-menu-item>Menu Item</lui-menu-item>`
export const Default: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiMenuDropdown looks.'
      }
    }
  }
}

const disabledTemplate = `
    <lui-menu-item>Menu Item</lui-menu-item>
    <lui-menu-item disabled>Disabled Menu Item</lui-menu-item>
    <lui-menu-item>Menu Item</lui-menu-item>
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: disabledTemplate
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
<lui-menu-item :rounded="false">Menu Item</lui-menu-item>
<lui-menu-item :rounded="true">Menu Item</lui-menu-item>
<lui-menu-item rounded="full">Menu Item</lui-menu-item>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: `<div class="flex flex-col space-x-4">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 3 options to round the corners of a LuiMenuDropdown.'
      }
    }
  }
}

const sizeTemplate = `
    <lui-menu-item size="xs">xSmall</lui-menu-item>
    <lui-menu-item size="sm">Small</lui-menu-item>
    <lui-menu-item size="md">Medium</lui-menu-item>
    <lui-menu-item size="lg">Large</lui-menu-item>
    <lui-menu-item size="xl">xLarge</lui-menu-item>
`
export const Size: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: sizeTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiMenuItem.'
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
    template: colorTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story: 'There are 6 options to customize the color of a LuiMenuItem.'
      }
    }
  }
}

const filterTemplate = `
<lui-menu-item color="primary" filter="darken">Darken</lui-menu-item>
<lui-menu-item color="secondary" filter="darken">Darken</lui-menu-item>
<lui-menu-item color="info" filter="darken">Darken</lui-menu-item>
<lui-menu-item color="success" filter="darken">Darken</lui-menu-item>
<lui-menu-item color="warning" filter="darken">Darken</lui-menu-item>
<lui-menu-item color="danger" filter="darken">Darken</lui-menu-item>
<lui-menu-item color="primary" filter="lighten">Lighten</lui-menu-item>
<lui-menu-item color="secondary" filter="lighten">Lighten</lui-menu-item>
<lui-menu-item color="info" filter="lighten">Lighten</lui-menu-item>
<lui-menu-item color="success" filter="lighten">Lighten</lui-menu-item>
<lui-menu-item color="warning" filter="lighten">Lighten</lui-menu-item>
<lui-menu-item color="danger" filter="lighten">Lighten</lui-menu-item>
`
export const Filter: Story = {
  render: () => ({
    components: { LuiMenuItem },
    template: filterTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: filterTemplate
      },
      description: {
        story: 'There are 6 options to customize the color of a LuiMenuItem.'
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
          'The <b>append</b> slot is used to add a text in the LuiButton to the left side of the icon.'
      }
    }
  }
}
