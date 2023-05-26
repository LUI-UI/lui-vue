import LuiBadge from './LuiBadge.vue'
import LuiAvatar from '../Avatar/LuiAvatar.vue'
import { variant, color, size, filter } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiBadge is a small, typically circular, element containing text or icons, used to signify notifications, statuses, or labels.'
  },
  argTypes: {
    border: "Controls a Lui component's border",
    position: 'Used to control the position of the LuiBadge',
    text: 'Used to place a text in the component',
    slots: {
      icon: 'Used to place an icon in the component'
    }
  }
}

const meta: Meta<typeof LuiBadge> = {
  title: 'LUI/Badge',
  component: LuiBadge,
  argTypes: {
    variant,
    color,
    size,
    filter,
    slots: {
      icon: {
        description: descriptions.argTypes.slots.icon
      }
    },
    border: {
      control: 'boolean',
      options: [true, false],
      description: descriptions.argTypes.border
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'bottom-right',
      description: descriptions.argTypes.position
    },
    text: {
      control: 'text',
      description: descriptions.argTypes.text
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

type Story = StoryObj<typeof LuiBadge>

const defaultTemplate = `<lui-badge />`
export const Default: Story = {
  render: () => ({
    components: { LuiBadge },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiBadge looks.'
      }
    }
  }
}

const variantTemplate = `
<lui-badge variant="solid" />
<lui-badge variant="outline" />
`
export const Variant: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { variant },
    template: variantTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: variantTemplate
      },
      description: {
        story: 'There are 2 variant options to customize the LuiBadge.'
      }
    }
  }
}

const sizeTemplate = `
<lui-badge size="xs" />
<lui-badge size="sm" />
<lui-badge size="md" />
<lui-badge size="lg" />
<lui-badge size="xl" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { size },
    template: `<div class="flex items-center space-x-2">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiBadge.'
      }
    }
  }
}

const colorTemplate = `
<lui-badge color="primary" />
<lui-badge color="secondary" />
<lui-badge color="info" />
<lui-badge color="success" />
<lui-badge color="warning" />
<lui-badge color="danger" />
`
export const Color: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { color },
    template: `<div class="w-1/6 grid grid-cols-6 gap-x-0 gap-y-4">${colorTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story: 'There are 6 options to customize the color of a LuiBadge.'
      }
    }
  }
}

const filterTemplate = `
<lui-badge color="primary" filter="darken" />
<lui-badge color="secondary" filter="darken" />
<lui-badge color="info" filter="darken" />
<lui-badge color="success" filter="darken" />
<lui-badge color="warning" filter="darken" />
<lui-badge color="danger" filter="darken" />
<lui-badge color="primary" filter="lighten" />
<lui-badge color="secondary" filter="lighten" />
<lui-badge color="info" filter="lighten" />
<lui-badge color="success" filter="lighten" />
<lui-badge color="warning" filter="lighten" />
<lui-badge color="danger" filter="lighten" />
`
export const Filter: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { color, filter },
    template: `<div class="w-1/6 grid grid-cols-6 gap-x-0 gap-y-4">${filterTemplate}</div>`
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

const borderTemplate = `
<lui-badge color="secondary" filter="lighten" :border="true" />
<lui-badge color="danger" filter="lighten" :border="true" />
`
export const Border: Story = {
  render: () => ({
    components: { LuiBadge },
    template: borderTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: borderTemplate
      },
      description: {
        story:
          'The <b>border</b> props is used to place a thin border around the LuiBadge. The border color changes according to the badge color.'
      }
    }
  }
}

const textTemplate = `
<lui-badge text="9" />
<lui-badge text="Admin" />
`
export const Text: Story = {
  render: () => ({
    components: { LuiBadge },
    template: textTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: textTemplate
      },
      description: {
        story:
          'The <b>text</b> props is used to place a text in the LuiBadge. The size of the badge changes so that the text can fit.'
      }
    }
  }
}

const iconSlotTemplate = `
<lui-badge>
  <template #icon>
    <i class="ri-wifi-line"></i>
  </template>
</lui-badge>
`
export const IconSlot: Story = {
  render: () => ({
    components: { LuiBadge },
    template: iconSlotTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: iconSlotTemplate
      },
      description: {
        story:
          'To place an icon in a LuiBadge the #icon slot can be used. The size of the badge changes so that the icon can fit.'
      }
    }
  }
}

const userTemplate = `<lui-avatar color="secondary" :rounded="true">
    <template #icon>
      <i class="ri-user-fill" />
    </template>
  </lui-avatar>`
const positionTemplate = `
<lui-badge position="top-left" text="9">
  ${userTemplate}
</lui-badge>
<lui-badge position="bottom-left" text="9">
  ${userTemplate}
</lui-badge>
<lui-badge position="bottom-right" text="9">
  ${userTemplate}
</lui-badge>
<lui-badge position="top-right" text="9">
  ${userTemplate}
</lui-badge>
`
export const Position: Story = {
  render: () => ({
    components: { LuiBadge, LuiAvatar },
    args: { color },
    template: positionTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: positionTemplate
      },
      description: {
        story:
          ' There are 4 options to customize the position of the LuiBadge. However to use the <b>position</b> props, you must provide a surrounding to the badge. You can do this by putting a container element inside the badge. Note that the container element here is a LuiAvatar.'
      }
    }
  }
}

const labelsTemplate = `
<lui-badge text="Admin" color="danger" />
<lui-badge text="Editor" color="success" />
<lui-badge text="User" color="primary" />
`
export const Labels: Story = {
  render: () => ({
    components: { LuiBadge },
    template: labelsTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: labelsTemplate
      },
      description: {
        story: 'Here are some use cases of a LuiBadge component for labels.'
      }
    }
  }
}

const avatarTemplate = `<lui-avatar :rounded="true" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />`
const statusesTemplate = `
<lui-badge color="warning">
  <template #icon>
    <i class="ri-check-line" />
  </template>
  ${avatarTemplate}
</lui-badge>
`
export const Statuses: Story = {
  render: () => ({
    components: { LuiBadge, LuiAvatar },
    template: statusesTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: statusesTemplate
      },
      description: {
        story: 'Here are some use cases of a LuiBadge component for statuses.'
      }
    }
  }
}

const messageTemplate = `<lui-avatar color="secondary" filter="darken" :rounded="true">
    <template #icon>
      <i class="ri-mail-fill" />
    </template>
  </lui-avatar>`
const notificationsTemplate = `
<lui-badge position="top-right" text="9" color="info">
  ${messageTemplate}
</lui-badge>
`
export const Notifications: Story = {
  render: () => ({
    components: { LuiBadge, LuiAvatar },
    template: notificationsTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: notificationsTemplate
      },
      description: {
        story: 'Here are some use cases of a LuiBadge component for notifications.'
      }
    }
  }
}

// <lui-badge position="top-left" :border="true">
//   <div
//     class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//   >
//     <i class="ri-user-line"></i>
//   </div>
// </lui-badge>
// <lui-badge position="top-right" :border="true" text="9">
//   <div
//     class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//   >
//     <i class="ri-user-line"></i>
//   </div>
// </lui-badge>
// <lui-badge position="bottom-left" :border="true">
//   <div
//     class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
//   >
//     <i class="ri-user-line"></i>
//   </div>
//   <template #icon>
//     <i class="ri-wifi-off-fill"></i>
//   </template>
// </lui-badge>
// `
