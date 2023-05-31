import LuiMenuItem from '../MenuItem/LuiMenuItem.vue'
import LuiMenuDropdown from './LuiMenuDropdown.vue'
import LuiButton from '../Button/LuiButton.vue'
import {
  color,
  size,
  rounded,
  text,
  filter,
  variant,
  block
} from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiMenuDropdown, when used with LuiMenuItem, provides a vertical list of selectable options, typically displayed in a dropdown fashion when triggered, allowing users to choose from available menu items.'
  },
  argTypes: {
    menuPosition: 'Used to control the position of the menu items',
    prepend: 'Used to add a text to the right side of the icon',
    append: 'Used to add a text to the left side of the icon',
    trigger: 'Used to insert a template for the dropdown menu look'
  }
}

const meta: Meta<typeof LuiMenuDropdown> = {
  title: 'LUI/MenuDropdown',
  component: LuiMenuDropdown,
  subcomponents: { LuiMenuItem }, //👈 Adds the ListItem component as a subcomponent
  argTypes: {
    color,
    size,
    rounded,
    variant,
    block,
    filter,
    text,
    menuPosition: {
      control: 'select',
      options: [
        'bottomLeft',
        'bottomRight',
        'topLeft',
        'topRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom'
      ],
      description: descriptions.argTypes.menuPosition
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
type Story = StoryObj<typeof LuiMenuDropdown>

const defaultTemplate = `
<lui-menu-dropdown text="Menu Dropdown">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Default: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: `<div class="mb-28">${defaultTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiMenuDropdown looks with two LuiMenuItem components.'
      }
    }
  }
}

const textTemplate = `
<lui-menu-dropdown text="Text">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Text: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { text },
    template: `<div class="mb-28">${textTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: textTemplate
      },
      description: {
        story:
          'The <b>text</b> props is used to place a text in the LuiMenuDropdown. Note that the size of the menu changes according to the text length.'
      }
    }
  }
}

const variantTemplate = `
<lui-menu-dropdown variant="solid" text="Solid">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown variant="outline" text="Outline">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Variant: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { variant },
    template: `<div class="flex space-x-4 mb-28">${variantTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: variantTemplate
      },
      description: {
        story: 'There are 2 variant options to customize the LuiMenuDropdown.'
      }
    }
  }
}

const roundedTemplate = `
<lui-menu-dropdown :rounded="false" text="Rounded">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown :rounded="true" text="Rounded">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown rounded="full" text="Rounded">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { rounded },
    template: `<div class="flex space-x-4 mb-28">${roundedTemplate}</div>`
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
<lui-menu-dropdown size="xs" text="xSmall">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown size="sm" text="Small">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown size="md" text="Medium">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown size="lg" text="Large">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown size="xl" text="xLarge">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Size: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { size },
    template: `<div class="flex items-center space-x-4 mb-28">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiMenuDropdown.'
      }
    }
  }
}

const colorTemplate = `
<lui-menu-dropdown color="primary" text="Primary">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="secondary" text="Secondary">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="info" text="Info">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="success" text="Success">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="warning" text="Warning">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="danger" text="Danger">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Color: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { color },
    template: `<div class="flex space-x-8 mb-28">${colorTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story: 'There are 6 options to customize the color of a LuiMenuDropdown.'
      }
    }
  }
}

const filterTemplate = `
<lui-menu-dropdown color="primary" filter="darken" text="Darken">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="secondary" filter="darken" text="Darken">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="info" filter="darken" text="Darken">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="success" filter="darken" text="Darken">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="warning" filter="darken" text="Darken">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="danger" filter="darken" text="Darken">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="primary" filter="lighten" text="Lighten">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="secondary" filter="lighten" text="Lighten">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="info" filter="lighten" text="Lighten">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="success" filter="lighten" text="Lighten">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="warning" filter="lighten" text="Lighten">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown color="danger" filter="lighten" text="Lighten">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Filter: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { color, filter },
    template: `<div class="grid grid-cols-6 gap-x-2 gap-y-4 mb-28">${filterTemplate}</div>`
  }),
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

const triggerTemplate = `
<lui-menu-dropdown>
  <template #trigger="{...attrs}">
    <lui-button v-bind="attrs">Menu Button</lui-button>
  </template>  
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const TriggerSlot: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem, LuiButton },
    template: `<div class="mb-28">${triggerTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: triggerTemplate
      },
      description: {
        story:
          'With the <b>trigger</b> slot you can insert a template in the LuiMenuDropdown. To do that you should trigger the <b>attrs</b> and bind it to the component.'
      }
    }
  }
}

const menuPositionTemplate = `
<lui-menu-dropdown menu-position="leftBottom" text="leftBottom">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="rightBottom" text="rightBottom">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="leftTop" text="leftTop">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="rightTop" text="rightTop">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const MenuPosition: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: `<div class="m-32 grid grid-cols-2 gap-x-2 gap-y-4">${menuPositionTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: menuPositionTemplate
      },
      description: {
        story:
          'The <b>menu-position</b> props is used to control the position where the dropdown menu opens.'
      }
    }
  }
}
