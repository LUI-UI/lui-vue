import LuiSelect from '../Select/LuiSelect.vue'
import LuiOption from './LuiOption.vue'
import { ref } from 'vue'
import {
  block,
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
    prepend: 'Used to add an icon to the left side of the component',
    append: 'Used to add an icon to the right side of the component',
    default: 'Used as default to add a text in the component'
  }
}

const meta: Meta<typeof LuiOption> = {
  title: 'LUI/Option',
  component: LuiOption,
  argTypes: {
    block,
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
  <lui-option text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option text="Sercan" value="Sercan" :selected="false"></lui-option>
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

const blockTemplate = `
<lui-select v-model="selectedName">
  <lui-option block text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option block text="Sercan" value="Sercan" :selected="false"></lui-option>
</lui-select>
`
export const Block: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${blockTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${blockTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}

const roundedTemplate = `
<lui-select v-model="selectedName">
  <lui-option rounded="full" text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option rounded="full" text="Sercan" value="Sercan" :selected="false"></lui-option>
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
  <lui-option size="xs" text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option size="xs" text="Sercan" value="Sercan" :selected="false"></lui-option>
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
        story: ''
      }
    }
  }
}

const stateTemplate = `
<lui-select v-model="selectedName">
  <lui-option state="danger" text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option state="warning" text="Sercan" value="Sercan" :selected="false"></lui-option>
  <lui-option :state="null" text="Serkan" value="Serkan" :selected="false"></lui-option>
  <lui-option state="success" text="Can" value="Can" :selected="false"></lui-option>
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
  <lui-option :state="null" description="This is a description" text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option state="success" description="This is a description" text="Sercan" value="Sercan" :selected="false"></lui-option>
  <lui-option state="warning" description="This is a description" text="Sercan" value="Sercan" :selected="false"></lui-option>
  <lui-option state="danger" description="This is a description" text="Sercan" value="Sercan" :selected="false"></lui-option>
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
  <lui-option state="danger" :state-icon="true" text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option state="warning" :state-icon="true" text="Sercan" value="Sercan" :selected="false"></lui-option>
  <lui-option :state="null" :state-icon="true" text="Serkan" value="Serkan" :selected="false"></lui-option>
  <lui-option state="success" :state-icon="true" text="Can" value="Can" :selected="false"></lui-option>
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
<lui-select v-model="selectedName">
  <lui-option text="Bayhan" value="Bayhan" :selected="true">
    <template #append>
      <i class="ri-home-line" />
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
<lui-select v-model="selectedName">
  <lui-option state="danger" :state-icon="true" text="Bayhan" value="Bayhan" :selected="true"></lui-option>
  <lui-option state="warning" :state-icon="true" text="Sercan" value="Sercan" :selected="false"></lui-option>
  <lui-option :state="null" :state-icon="true" text="Serkan" value="Serkan" :selected="false"></lui-option>
  <lui-option state="success" :state-icon="true" text="Can" value="Can" :selected="false"></lui-option>
</lui-select>
`
export const PrependSlot: Story = {
  render: () => ({
    components: { LuiSelect, LuiOption },
    setup() {
      const selectedName = ref('Select an employee')
      return { selectedName }
    },
    template: `<div>{{selectedName}}${prependTemplate}</div>`
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>{{selectedName}}${prependTemplate}</div>`
      },
      description: {
        story: ''
      }
    }
  }
}
