import LuiAvatar from './LuiAvatar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import {
  variant,
  color,
  size,
  rounded,
  border,
  filter
} from '../../../.storybook/global-story-argtypes'

const descriptions = {
  docs: {
    component:
      'LuiAvatar shows a small image or initials to identify a user or entity, used in profiles, comments, or messaging, adding a personalized touch to the interface.'
  },
  slots: {
    icon: 'Used to place an icon in a component',
    src: 'Used to place an image in a component',
    alt: 'Used to give an alt text to the image'
  }
}

const meta: Meta<typeof LuiAvatar> = {
  title: 'LUI/Avatar',
  component: LuiAvatar,
  argTypes: {
    variant,
    color,
    size,
    rounded,
    filter,
    border,
    text: {
      control: 'text'
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
/** This is how a default LuiAvatar looks. */
export const Default: Story = {
  render: () => ({
    components: { LuiAvatar },
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

const variantTemplate = `
<lui-avatar variant="solid" />
<lui-avatar variant="outline" />
`
/** There are 2 variant options to customize the LuiAvatar. */
export const Variant: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: `<div class="flex space-x-4">${variantTemplate}</div>`
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

const borderTemplate = `
<lui-avatar :border="true" />
<lui-avatar :border="false" />
`
/** With the <b>border</b> props you can customize the LuiAvatar. */
export const Border: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: `<div class="flex space-x-4">${borderTemplate}</div>`
  }),
  args: { border },
  parameters: {
    docs: {
      source: {
        code: borderTemplate
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
/** There are 5 options to control the size of a LuiAvatar. */
export const Size: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: `<div class="flex w-1/2 items-center justify-between">${sizeTemplate}</div>`
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
<lui-avatar :rounded="false" />
<lui-avatar :rounded="true" />
<lui-avatar rounded="full" />
`
/** There are 3 options to round the corners of a LuiAvatar. */
export const Rounded: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: `<div class="flex space-x-8">${roundedTemplate}</div>`
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

const colorTemplate = `
<lui-avatar color="primary" />
<lui-avatar color="secondary" />
<lui-avatar color="info" />
<lui-avatar color="success" />
<lui-avatar color="warning" />
<lui-avatar color="danger" />
`
/** There are 6 options to customize the color of a LuiAvatar. */
export const Color: Story = {
  render: () => ({
    components: { LuiAvatar },
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
/** The <b>filter</b> props is used to lighten or darken the selected color.*/
export const Filter: Story = {
  render: () => ({
    components: { LuiAvatar },
    template: `<div class="grid grid-cols-6 gap-x-2 gap-y-4">${filterTemplate}</div>`
  }),
  args: { filter },
  parameters: {
    docs: {
      source: {
        code: filterTemplate
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
/** To place an icon in a LuiAvatar the #icon slot can be used. */
export const IconSlot: Story = {
  render: () => ({
    components: { LuiAvatar },
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

// const exampleTemplate = `<lui-avatar />`
// /** Here are some use cases of a LuiAvatar. */
// export const Examples: Story = {
//   render: () => ({
//     components: { LuiAvatar },
//     template: exampleTemplate
//   }),
//   parameters: {
//     docs: {
//       source: {
//         code: exampleTemplate
//       }
//     }
//   }
// }
