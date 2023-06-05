import LuiAvatar from './LuiAvatar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import {
  variant,
  color,
  size,
  rounded,
  filter,
  text,
  border
} from '../../../.storybook/global-story-argtypes'

const descriptions = {
  docs: {
    component:
      'LuiAvatar shows a small icon, image or text to identify a user or entity, used in profiles, comments, or messaging, adding a personalized touch to the interface.'
  },
  argTypes: {
    src: 'Used to place an image in the component',
    alt: 'Used to give an alt text to the image',
    icon: 'Used to place an icon in the component'
  }
}

const meta: Meta<typeof LuiAvatar> = {
  title: 'LUI/Avatar',
  component: LuiAvatar,
  argTypes: {
    variant,
    text,
    color,
    size,
    rounded,
    filter,
    border,
    icon: { description: descriptions.argTypes.icon },
    src: {
      control: 'text',
      description: descriptions.argTypes.src
    },
    alt: {
      control: 'text',
      description: descriptions.argTypes.alt
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

type Story = StoryObj<typeof LuiAvatar>

const defaultTemplate = `<lui-avatar />`
export const Default: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiAvatar looks.'
      }
    }
  }
}

const variantTemplate = `
<lui-avatar variant="solid" />
<lui-avatar variant="outline" />
`
export const Variant: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { variant },
    template: `<div class="flex space-x-4">${variantTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: variantTemplate
      },
      description: {
        story: 'There are 2 variant options to customize the LuiAvatar.'
      }
    }
  }
}

const sizeTemplate = `
<lui-avatar size="xs" />
<lui-avatar size="sm" />
<lui-avatar size="md" />
<lui-avatar size="lg" />
<lui-avatar size="xl" />
`
export const Size: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { size },
    template: `<div class="flex w-1/3 items-center justify-between">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story: 'There are 5 options to control the size of a LuiAvatar.'
      }
    }
  }
}

const roundedTemplate = `
<lui-avatar :rounded="false" />
<lui-avatar :rounded="true" />
<lui-avatar rounded="full" />
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { rounded },
    template: `<div class="flex space-x-8">${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 3 options to round the corners of a LuiAvatar.'
      }
    }
  }
}

const colorTemplate = `
<lui-avatar color="primary" />
<lui-avatar color="secondary" />
<lui-avatar color="info" />
<lui-avatar color="success" />
<lui-avatar color="warning" />
<lui-avatar color="danger" />
`
export const Color: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { color },
    template: `<div class="w-1/2 grid grid-cols-6 gap-x-2 gap-y-4">${colorTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story: 'There are 6 options to customize the color of a LuiAvatar.'
      }
    }
  }
}

const filterTemplate = `
<lui-avatar color="primary" filter="darken" />
<lui-avatar color="secondary" filter="darken" />
<lui-avatar color="info" filter="darken" />
<lui-avatar color="success" filter="darken" />
<lui-avatar color="warning" filter="darken" />
<lui-avatar color="danger" filter="darken" />
<lui-avatar color="primary" filter="lighten" />
<lui-avatar color="secondary" filter="lighten" />
<lui-avatar color="info" filter="lighten" />
<lui-avatar color="success" filter="lighten" />
<lui-avatar color="warning" filter="lighten" />
<lui-avatar color="danger" filter="lighten" />
`
export const Filter: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { color, filter },
    template: `<div class="w-1/2 grid grid-cols-6 gap-x-2 gap-y-4">${filterTemplate}</div>`
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
<lui-avatar border color="primary" filter="lighten" />
<lui-avatar border color="secondary" filter="lighten" />
<lui-avatar border color="info" filter="lighten" />
<lui-avatar border color="success" filter="lighten" />
<lui-avatar border color="warning" filter="lighten" />
<lui-avatar border color="danger" filter="lighten" />
<lui-avatar border color="primary" />
<lui-avatar border color="secondary" />
<lui-avatar border color="info" />
<lui-avatar border color="success" />
<lui-avatar border color="warning" />
<lui-avatar border color="danger" />
<lui-avatar border color="primary" filter="darken" />
<lui-avatar border color="secondary" filter="darken" />
<lui-avatar border color="info" filter="darken" />
<lui-avatar border color="success" filter="darken" />
<lui-avatar border color="warning" filter="darken" />
<lui-avatar border color="danger" filter="darken" />
`
export const Border: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { border },
    template: `<div class="w-1/2 grid grid-cols-6 gap-x-2 gap-y-4">${borderTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: borderTemplate
      },
      description: {
        story:
          'The <b>border</b> props is used to place a thin border around the LuiAvatar. The border color changes according to the avatar color.'
      }
    }
  }
}

const iconSlotTemplate = `
<lui-avatar>
  <template #icon>
    <i class="ri-home-line />
  </template>
</lui-avatar>
`
export const IconSlot: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: iconSlotTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: iconSlotTemplate
      },
      description: {
        story: 'The <b>icon</b> slot can be used to place an icon in a LuiAvatar.'
      }
    }
  }
}

const textTemplate = `<lui-avatar text="T" />`
export const Text: Story = {
  render: () => ({
    components: { LuiAvatar },
    args: { text },
    template: textTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: textTemplate
      },
      description: {
        story: 'The <b>text</b> props is used to add a text in the LuiAvatar.'
      }
    }
  }
}

const srcTemplate = `<lui-avatar src="https://www.w3schools.com/howto/img_avatar.png" />`
export const Src: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: srcTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: srcTemplate
      },
      description: {
        story: 'The <b>src</b> props is used to place an image in the LuiAvatar.'
      }
    }
  }
}

const altTemplate = `<lui-avatar src="https://www.w3schools.com/howto/img_avatar2.png" alt="User Avatar" />`
export const Alt: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: altTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: altTemplate
      },
      description: {
        story: 'The <b>alt</b> props is used to give an alt text to the image in the LuiAvatar.'
      }
    }
  }
}
