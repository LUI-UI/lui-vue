import LuiMenuItem from './LuiMenuItem.vue'
import LuiMenuDropdown from './LuiMenuDropdown.vue'
import LuiAvatar from '../Avatar/LuiAvatar.vue'
import { color, size, rounded } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'Lui components LuiMenuDropdown and LuiMenuItem provide a vertical list of selectable options, typically displayed in a dropdown fashion when triggered, allowing users to choose from available menu items.'
  },
  argTypes: {
    menuPosition: 'Used to control the position of the ...',
    slots: {
      prepend: 'Used to add a text to the right side of the icon',
      append: 'Used to add a text to the left side of the icon',
      trigger: 'Used to insert a template for the dropdown menu look'
    }
  }
}

const meta: Meta<typeof LuiMenuDropdown> = {
  title: 'LUI/Menu',
  component: LuiMenuDropdown,
  subcomponents: { LuiMenuItem }, //👈 Adds the ListItem component as a subcomponent
  argTypes: {
    color,
    size,
    rounded,
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
  decorators: [() => ({ template: '<div class="h-[160px] space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiMenuDropdown>

const defaultTemplate = `
<lui-menu-dropdown text="Dropdown">
  <lui-menu-item>Menu Item 1</lui-menu-item>
  <lui-menu-item>Menu Item 2</lui-menu-item>
</lui-menu-dropdown>
`
export const Default: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story:
          'This is how a default LuiMenuDropdown looks with two LuiMenuItem components. Note that you can add a menu title with the <b>text</b> props.'
      }
    }
  }
}

const disabledTemplate = `
<div class="h-[200px]">
  <lui-menu-dropdown text="Dropdown">
    <lui-menu-item>Menu Item 1</lui-menu-item>
    <lui-menu-item disabled>Menu Item 2</lui-menu-item>
  </lui-menu-dropdown>
</div>
`
export const Disabled: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
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

const customTriggerTemplate = `
<lui-menu-dropdown>
  <template #trigger="{...attrs}">
    <lui-avatar v-bind="attrs" text="A" rounded="full" color="warning" />
  </template>  
  <lui-menu-item>Menu Item1</lui-menu-item>
  <lui-menu-item>Menu Item2</lui-menu-item>
</lui-menu-dropdown>
`
export const CustomTrigger: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem, LuiAvatar },
    template: customTriggerTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: customTriggerTemplate
      },
      description: {
        story:
          'With the <b>trigger</b> slot you can insert any template for the dropdown menu look. To do that you should trigger and bind <b>attrs</b>.'
      }
    }
  }
}

const prependTemplate = `
<lui-menu-dropdown text="Dropdown">
  <lui-menu-item>
    <template #prepend>
      <i class="ri-edit-box-line" />
    </template>
    Edit
  </lui-menu-item>
  <lui-menu-item>
    <template #prepend>
      <i class="ri-file-copy-line" />
    </template>
    Duplicate
  </lui-menu-item>
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
          'The <b>prepend</b> slot is used to add a text in the LuiMenuItem to the right side of the icon.'
      }
    }
  }
}

const appendTemplate = `
<lui-menu-dropdown text="Dropdown">
  <lui-menu-item>
    Edit
    <template #append>
      <i class="ri-edit-box-line" />
    </template>
  </lui-menu-item>
  <lui-menu-item>
    Duplicate
    <template #append>
      <i class="ri-file-copy-line" />
    </template>
  </lui-menu-item>
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
          'The <b>append</b> slot is used to add a text in the LuiButton to the left side of the icon.'
      }
    }
  }
}

const autoPositionTemplate = `
<div class="h-[200px]">
  <lui-menu-dropdown text="Dropdown">
    <lui-menu-item> Menu Item 1</lui-menu-item>
    <lui-menu-item> Menu Item 2</lui-menu-item>
    <lui-menu-item> Menu Item 3</lui-menu-item>
  </lui-menu-dropdown>
`
export const AutoPosition: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: autoPositionTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: autoPositionTemplate
      },
      description: {
        story: '...'
      }
    }
  }
}

const menuPositionTemplate = `<lui-menu-dropdown text="Dropdown" menu-position="bottomLeft">
  <lui-menu-item>bottomLeft</lui-menu-item>
  <lui-menu-item>bottomLeft</lui-menu-item>
  <lui-menu-item>bottomLeft</lui-menu-item>
  <lui-menu-item>bottomLeft</lui-menu-item>
  <lui-menu-item>bottomLeft</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="bottomRight">
  <lui-menu-item>bottomRight</lui-menu-item>
  <lui-menu-item>bottomRight</lui-menu-item>
  <lui-menu-item>bottomRight</lui-menu-item>
  <lui-menu-item>bottomRight</lui-menu-item>
  <lui-menu-item>bottomRight</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="topLeft">
  <lui-menu-item>topLeft</lui-menu-item>
  <lui-menu-item>topLeft</lui-menu-item>
  <lui-menu-item>topLeft</lui-menu-item>
  <lui-menu-item>topLeft</lui-menu-item>
  <lui-menu-item>topLeft</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="topRight">
  <lui-menu-item>topRight</lui-menu-item>
  <lui-menu-item>topRight</lui-menu-item>
  <lui-menu-item>topRight</lui-menu-item>
  <lui-menu-item>topRight</lui-menu-item>
  <lui-menu-item>topRight</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="leftBottom">
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="rightBottom">
  <lui-menu-item>rightBottom</lui-menu-item>
  <lui-menu-item>rightBottom</lui-menu-item>
  <lui-menu-item>rightBottom</lui-menu-item>
  <lui-menu-item>rightBottom</lui-menu-item>
  <lui-menu-item>rightBottom</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="leftTop">
  <lui-menu-item>leftTop</lui-menu-item>
  <lui-menu-item>leftTop</lui-menu-item>
  <lui-menu-item>leftTop</lui-menu-item>
  <lui-menu-item>leftTop</lui-menu-item>
  <lui-menu-item>leftTop</lui-menu-item>
</lui-menu-dropdown>
<lui-menu-dropdown text="Dropdown" menu-position="leftBottom">
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
  <lui-menu-item>leftBottom</lui-menu-item>
</lui-menu-dropdown>
`
export const MenuPosition: Story = {
  render: () => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    template: menuPositionTemplate
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
