import LuiMenuItem from '../MenuItem/LuiMenuItem.vue'
import LuiMenuDropdown from './LuiMenuDropdown.vue'
import LuiBadge from '../Badge/LuiBadge.vue'
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
    trigger: 'Used to insert a template in the component',
    default: 'Used as default to add a text in the component'
    //triggerAppend: 'Used to place an icon in the component'
  }
}

const meta: Meta<typeof LuiMenuDropdown> = {
  title: 'LUI/MenuDropdown',
  component: LuiMenuDropdown,
  argTypes: {
    color,
    size,
    rounded,
    variant,
    block,
    filter,
    text,
    //triggerAppend: { description: descriptions.argTypes.triggerAppend },
    menuPosition: {
      control: 'select',
      default: 'bottomLeft',
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
    },
    trigger: {
      description: descriptions.argTypes.trigger
    },
    default: {
      description: descriptions.argTypes.default
    }
  },
  decorators: [() => ({ template: '<div class="py-28 space-x-2"><story/></div>' })],
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
    template: `<div class="">${defaultTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'This is how a default LuiMenuDropdown looks with two LuiMenuItem components. Note that it has an auto-positioning behavior that makes the menu drop up or down where there is adequate screen space.'
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
    template: `<div class="">${textTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: textTemplate
      },
      description: {
        story:
          'The <b>text</b> prop is used to add a text in the LuiMenuDropdown. Note that the size of the menu changes according to the text length.'
      }
    }
  }
}

const blockTemplate = `
<lui-menu-dropdown block text="Text">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Block: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { text },
    template: blockTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: blockTemplate
      },
      description: {
        story: 'The <b>block</b> prop provides a full width menu look.'
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
<lui-menu-dropdown variant="link" text="Link">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown variant="text" text="Text">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const Variant: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    args: { variant },
    template: `<div class="flex space-x-4 items-center">${variantTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: variantTemplate
      },
      description: {
        story: 'There are 4 variant options to customize the LuiMenuDropdown.'
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
    template: `<div class="flex space-x-4 ">${roundedTemplate}</div>`
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
    template: `<div class="flex items-center space-x-4 ">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story:
          "The <b>size</b> prop in the LuiMenuDropdown provides five options to control the size of the dropdown menu. These options include 'xs', 'sm', 'md', 'lg' and 'xl', allowing you to choose the desired size for the dropdown menu."
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
    template: `<div class="flex space-x-8 ">${colorTemplate}</div>`
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
    template: `<div class="grid grid-cols-6 gap-x-2 gap-y-4 ">${filterTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: filterTemplate
      },
      description: {
        story: 'The <b>filter</b> prop is used to lighten or darken the selected color.'
      }
    }
  }
}

const triggerTemplate = `
<lui-menu-dropdown>
  <template #trigger="{...attrs}">
    <lui-badge v-bind="attrs" text="Badge Menu" />
  </template>  
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const TriggerSlot: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem, LuiBadge },
    template: triggerTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: triggerTemplate
      },
      description: {
        story:
          'With the <b>trigger</b> slot you can insert any template or other LUI components and replace the default LuiMenuDropdown lookLui. To do that you should trigger the attributes of LuiMenuDropdown and bind them to the template.'
      }
    }
  }
}

const appendTemplate = `
<lui-menu-dropdown text="Connect">
  <template #append>
    <i class="ri-wifi-line"></i>
  </template>
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: appendTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: appendTemplate
      },
      description: {
        story:
          'The <b>append</b> slot is used to place an icon in the left side of the LuiMenuDropdown, after the text, thus replacing the default down arrow icon.'
      }
    }
  }
}

const prependTemplate = `
<lui-menu-dropdown text="Connect">
  <template #prepend>
    <i class="ri-wifi-line"></i>
  </template>
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: prependTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: prependTemplate
      },
      description: {
        story:
          'The <b>prepend</b> slot is used to place an icon in the right side of the LuiMenuDropdown, before the text.'
      }
    }
  }
}

const menuPositionTemplate = `
<lui-menu-dropdown menu-position="topLeft" text="topLeft">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="leftTop" text="leftTop">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="topRight" text="topRight">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="rightTop" text="rightTop">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="bottomLeft" text="bottomLeft">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="leftBottom" text="leftBottom">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="bottomRight" text="bottomRight">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown menu-position="rightBottom" text="rightBottom">
  <lui-menu-item>Menu Item</lui-menu-item>
  <lui-menu-item>Menu Item</lui-menu-item>
</lui-menu-dropdown>
`
export const MenuPosition: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: `<div class="px-28 grid grid-cols-4 gap-x-2 gap-y-4 justify-center items-center">${menuPositionTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: menuPositionTemplate
      },
      description: {
        story:
          'The <b>menu-position</b> prop is used to customize the position and alignment of where the dropdown menu opens.'
      }
    }
  }
}
