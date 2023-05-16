import LuiButton from './LuiButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import {
  variant,
  color,
  block,
  rounded,
  size,
  filter
} from '../../../.storybook/global-story-argtypes'
const descriptions = {
  docs: {
    component:
      'Button allow users to take actions, and make choices with a single tap. Also provides the style for the non-button(div,a) element look like a button'
  },
  argTypes: {
    tag: 'Sets root element tag for lui-button.(Used to make a non-button(div,a) element look like a button.)'
  },
  slots: {
    default: 'Used for the button content',
    icon: 'Used for the icon button, can not used with the other contents',
    prepend: 'Used for the icon on left side of text',
    append: 'Used for the icon on right side of text'
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
    filter,
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
/** The <b>color</b> of primary button comes from the tailwind.config if you customize the primary color, default button looks with your color. */
export const Default: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      return { args }
    },
    template: `<lui-button>Default button</lui-button>`
  })
}
/** There are 4 different option to choose how to look your button. */
const variantTemplate = `
<lui-button variant="solid">Solid</lui-button>
<lui-button variant="outline">Outline</lui-button>
<lui-button variant="link">Link</lui-button>
<lui-button variant="text">Text</lui-button>
`
export const Variants: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      return { args }
    },
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
/** There are 6 color option which you can customize for buttons(See how to customize the colors: https:/www..). Also you can use the filter prop to have more colors(See the filter details:https:/www.. )  */
export const Colors: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
      return { args, colors }
    },
    template: `
      <lui-button color="primary">Primary</lui-button>
      <lui-button color="secondary">Secondary</lui-button>
      <lui-button color="info">Info</lui-button>
      <lui-button color="success">Success</lui-button>
      <lui-button color="warning">Warning</lui-button>
      <lui-button color="danger">Danger</lui-button>
    `
  }),
  args: { color }
}
/** Filters provides more colors by choosing the lighter or darker tone(shade) of the selected color.*/
export const Filters: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
      return { args, colors }
    },
    template: `
  <div class="space-x-2 mb-4">
    <lui-button color="primary" filter="darken">
      Darken
    </lui-button>
    <lui-button color="secondary" filter="darken">
      Darker
    </lui-button>
    <lui-button color="info" filter="darken">
      Darken
    </lui-button>
    <lui-button color="success" filter="darken">
      Darken
    </lui-button>
    <lui-button color="warning" filter="darken">
      Darken
    </lui-button>
    <lui-button color="danger" filter="darken">
      Darken
    </lui-button>
  </div>
  <div class="space-x-2">
    <lui-button color="primary" filter="lighten">
      Lighten
    </lui-button>
    <lui-button color="secondary" filter="lighten">
      Lighten
    </lui-button>
    <lui-button color="info" filter="lighten">
      Lighten
    </lui-button>
    <lui-button color="success" filter="lighten">
      Lighten
    </lui-button>
    <lui-button color="warning" filter="lighten">
      Lighten
    </lui-button>
    <lui-button color="danger" filter="lighten">
      Lighten
    </lui-button>
  </div>
  `
  }),
  args: { filter, color }
}
/** There are 5 Diffent size to control button size(The size property could change padding or/and fon-size) */
export const Sizes: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, sizes }
    },
    template: `
    <lui-button size="xs"> XSmall</lui-button>
    <lui-button size="sm"> Small</lui-button>
    <lui-button size="md"> Medium</lui-button>
    <lui-button size="lg"> Large</lui-button>
    <lui-button size="xl"> xLarge</lui-button>
    `
  }),
  args: { size }
}
/** There are 3 different option to round button corners. */
export const Rounded: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      return { args }
    },
    template: `
    <lui-button :rounded="false"> False </lui-button>
    <lui-button :rounded="true"> True </lui-button>
    <lui-button rounded="full"> Full </lui-button>
    `
  }),
  args: { rounded }
}
/** Provides a full width button */
export const Block: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      return { args }
    },
    template: `<lui-button block> Block </lui-button>`
  }),
  args: { block }
}
/** To create icon button we should use the "#icon" slot in button. Lui button provides a font-size for each size, so we can inherit the font-size to use on icons. <pre><code>NOTE:text can not used with icon button! If you want to use icon with text you can use prepend or append slots</code></pre> */
export const IconButton: Story = {
  render: (args) => ({
    components: { LuiButton },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      return { args, sizes }
    },
    template: `
    <lui-button>
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>
      </template>
    </lui-button>`
  })
}

// const customTemplate = `
// <lui-button>
//   TEST!
//   <template #prepend>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/> </svg>
//   </template>
// </lui-button>
// `
// export const CustomTest: Story = {
//   render: (args) => ({
//     components: { LuiButton },
//     setup() {
//       return { args }
//     },
//     template: customTemplate
//   }),
//   parameters: {
//     docs: {
//       source: { code: customTemplate }
//     }
//   }
// }
