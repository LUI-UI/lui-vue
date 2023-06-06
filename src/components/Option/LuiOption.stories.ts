import LuiSelect from '../Select/LuiSelect.vue'
import LuiOption from './LuiOption.vue'
import { ref } from 'vue'
import {
  rounded,
  size,
  description,
  state,
  stateIcon
} from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiOption represents an individual choice within the LuiSelect, providing a selectable item with a text and value.'
  },
  argTypes: {
    prepend: 'Used to place an icon to the left side of the component',
    append: 'Used to place an icon to the right side of the component',
    default: 'Used as default to add a text in the component'
  }
}

const meta: Meta<typeof LuiOption> = {
  title: 'LUI/Option',
  component: LuiOption,
  argTypes: {
    rounded,
    size,
    description,
    state,
    stateIcon
  },
  decorators: [() => ({ template: '<div class="pb-32 space-x-2"><story/></div>' })],
  parameters: {
    docs: {
      description: { component: descriptions.docs.component }
    }
  }
}
export default meta

type Story = StoryObj<typeof LuiOption>

const defaultTemplate = `
<lui-select v-model="selectedName">
  <lui-option text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Default: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${defaultTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${defaultTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const roundedTemplate = `
<lui-select v-model="selectedName">
  <lui-option rounded="full" text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option rounded="full" text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Rounded: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${roundedTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${roundedTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const sizeTemplate = `
<lui-select v-model="selectedName">
  <lui-option size="xs" text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option size="xs" text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Size: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${sizeTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${sizeTemplate}</div>`
      },
      description: {
        story:
          "The <b>size</b> prop in the LuiOption provides five options to control the size of the option. These options include 'xs', 'sm', 'md', 'lg' and 'xl', allowing you to choose the desired size for the option."
      }
    }
  }
}

const stateTemplate = `
<lui-select v-model="selectedName">
  <lui-option :state="null" text="Brad" value="Brad" :selected="false"></lui-option>
  <lui-option :state="true" text="Pitt" value="Pitt" :selected="false"></lui-option>
  <lui-option state="warning" text="Jane" value="Jane" :selected="false"></lui-option>
  <lui-option :state="false" text="Mary" value="Mary" :selected="true"></lui-option>
</lui-select>
`
export const State: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${stateTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${stateTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const descriptionTemplate = `
<lui-select v-model="selectedName">
  <lui-option :state="null" description="This is a description" text="Mary" value="Mary" :selected="true"></lui-option>
  <lui-option :state="true" description="This is a description" text="Jane" value="Jane" :selected="false"></lui-option>:
  <lui-option state="warning" description="This is a description" text="Jane" value="Jane" :selected="false"></lui-option>
  <lui-option :state="false" description="This is a description" text="Jane" value="Jane" :selected="false"></lui-option>
</lui-select>
`
export const Description: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${descriptionTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${descriptionTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const stateIconTemplate = `
<lui-select v-model="selectedName">
  <lui-option :state="null" :state-icon="true" text="Brad" value="Brad" :selected="false"></lui-option>
  <lui-option :state="true" :state-icon="true" text="Pitt" value="Pitt" :selected="false"></lui-option>
  <lui-option state="warning" :state-icon="true" text="Jane" value="Jane" :selected="false"></lui-option>
  <lui-option :state="false" :state-icon="true" text="Mary" value="Mary" :selected="true"></lui-option>
</lui-select>
`
export const StateIcon: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${stateIconTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${stateIconTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const appendTemplate = `
<lui-select placeholder="Append">
  <lui-option text="Mary" value="Mary" :selected="true">
    <template #append>
      <i class="ri-home-line"></i>
    </template>
  </lui-option>
</lui-select>
`
export const AppendSlot: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${appendTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${appendTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const prependTemplate = `
<lui-select placeholder="Prepend">
  <lui-option text="Mary" value="Mary" :selected="true">
    <template #prepend>
      <i class="ri-home-line"></i>
    </template>
  </lui-option>
</lui-select>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    template: prependTemplate
  }),
  parameters: {
    docs: {
      source: {
        code: prependTemplate
      },
      description: {
        story:
          'The <b>prepend</b> slot Pitt be used to place an icon to the left side of the LuiOption.'
      }
    }
  }
}
