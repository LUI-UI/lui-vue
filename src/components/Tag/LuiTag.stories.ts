import LuiTag from './LuiTag.vue'
import { variant, color, size, filter } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

// const sizeList = size.options
// const colorList = color.options
// const filterList = filter.options

const meta: Meta<typeof LuiTag> = {
  title: 'LUI/Tag',
  component: LuiTag,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'My tag variant'
    },
    color,
    size,
    filter
  }
}
export default meta

type Story = StoryObj<typeof LuiTag>

const defaultTemplate = `<lui-tag>Tag</lui-tag>`
export const Default: Story = {
  render: () => ({
    components: { LuiTag },
    template: defaultTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTemplate
      },
      description: {
        story: 'This is how a default LuiTag looks.'
      }
    }
  }
}

const variantTemplate = `
<div class="flex flex-row space-x-4">
  <lui-tag variant="solid">Tag</lui-tag>
  <lui-tag variant="outline">Tag</lui-tag>
</div>
`
export const Variant: Story = {
  render: () => ({
    components: { LuiTag },
    args: { variant },
    template: variantTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: variantTemplate
      },
      description: {
        story: 'There are 2 variant options to customize the LuiTag.'
      }
    }
  }
}

const sizeTemplate = `
  <lui-tag size="xs">Tag</lui-tag>
  <lui-tag size="sm">Tag</lui-tag>
  <lui-tag size="md">Tag</lui-tag>
  <lui-tag size="lg">Tag</lui-tag>
  <lui-tag size="xl">Tag</lui-tag>
`
export const Size: Story = {
  render: () => ({
    components: { LuiTag },
    args: { size },
    template: `<div class="flex items-center space-x-2">${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: sizeTemplate
      },
      description: {
        story:
          "The <b>size</b> prop in the LuiTag provides five options to control the size of the tag. These options include 'xs', 'sm', 'md', 'lg' and 'xl', allowing you to choose the desired size for the tag."
      }
    }
  }
}

const colorTemplate = `
<lui-tag color="primary">Tag</lui-tag>
<lui-tag color="secondary">Tag</lui-tag>
<lui-tag color="info">Tag</lui-tag>
<lui-tag color="success">Tag</lui-tag>
<lui-tag color="warning">Tag</lui-tag>
<lui-tag color="danger">Tag</lui-tag>
`
export const ColorTemplate: Story = {
  render: () => ({
    components: { LuiTag },
    args: { color },
    template: `<div class="flex flex-row space-x-4">${colorTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: colorTemplate
      },
      description: {
        story: 'There are 6 options to customize the color of a LuiTag.'
      }
    }
  }
}

const filterTemplate = `
<lui-tag color="primary" filter="darken">Tag</lui-tag>
<lui-tag color="secondary" filter="darken">Tag</lui-tag>
<lui-tag color="info" filter="darken">Tag</lui-tag>
<lui-tag color="success" filter="darken">Tag</lui-tag>
<lui-tag color="warning" filter="darken">Tag</lui-tag>
<lui-tag color="danger" filter="darken">Tag</lui-tag>
<lui-tag color="primary" filter="lighten">Tag</lui-tag>
<lui-tag color="secondary" filter="lighten">Tag</lui-tag>
<lui-tag color="info" filter="lighten">Tag</lui-tag>
<lui-tag color="success" filter="lighten">Tag</lui-tag>
<lui-tag color="warning" filter="lighten">Tag</lui-tag>
<lui-tag color="danger" filter="lighten">Tag</lui-tag>
`
export const Filter: Story = {
  render: () => ({
    components: { LuiTag },
    args: { color, filter },
    template: `<div class="grid grid-cols-6 gap-4">${filterTemplate}</div>`
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

const roundedTemplate = `
<div class="flex flex-row space-x-4">
  <lui-tag>Tag</lui-tag>
  <lui-tag :rounded="false">Tag</lui-tag>
</div>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiTag },
    args: { variant },
    template: roundedTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: roundedTemplate
      },
      description: {
        story: 'There are 2 rounded options to customize the LuiTag.'
      }
    }
  }
}

const closeIcon = `
<div class="flex flex-row space-x-4">
  <lui-tag>Tag</lui-tag>
  <lui-tag :close-icon="false">Tag</lui-tag>
</div>
`
export const CloseIcon: Story = {
  render: () => ({
    components: { LuiTag },
    args: { variant },
    template: closeIcon
  }),
  parameters: {
    docs: {
      source: {
        code: closeIcon
      },
      description: {
        story: ''
      }
    }
  }
}

const prependIcon = `
<div class="flex flex-row space-x-4">
  <lui-tag>
    <template #prepend>
      <i class="ri-admin-line"/>
    </template>
    Tag
  </lui-tag>
  <lui-tag :close-icon="false">Tag</lui-tag>
  <lui-tag>Tag</lui-tag>
</div>
`
export const PrependIcon: Story = {
  render: () => ({
    components: { LuiTag },
    args: { variant },
    template: prependIcon
  }),
  parameters: {
    docs: {
      source: {
        code: prependIcon
      },
      description: {
        story: ''
      }
    }
  }
}
