import LuiBadge from './LuiBadge.vue'
import { variant, color, size, filter, border } from '../../../.storybook/global-story-argtypes'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const descriptions = {
  docs: {
    component:
      'LuiBadge visually represents additional information or status by displaying a small, typically circular, element containing text or icons, providing a quick and noticeable way to convey relevant details or notifications within an interface.'
  },
  argTypes: {
    position: 'Used to control the position of ...'
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
    border,
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'bottom-right',
      description: descriptions.argTypes.position
    },
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

type Story = StoryObj<typeof LuiBadge>

export const Default: Story = {
  render: () => ({
    components: { LuiBadge },
    setup() {
      const activeColor = ref('secondary')
      return { activeColor }
    },
    template: ` <button @click="activeColor = 'primary'">change color!</button> {{activeColor}} <lui-badge  :color="activeColor" />`
  })
}
export const Variant: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { variant },
    template: `
    <div v-for="variant in variants" key="variant" class="flex items-center space-x-4 mb-4">
    <lui-badge  :variant="variant"/>
      <lui-badge  :variant="variant" text="Badge"/>
      <lui-badge  :variant="variant">
        <template #icon>
        <i class="ri-user-line"></i>
        </template>
      </lui-badge>
      <pre>{{variant}}</pre>
    </div>
    `
  })
}

export const Color: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { color },
    template: `
<lui-badge color="primary" />
<lui-badge color="secondary" />
<lui-badge color="info" />
<lui-badge color="success" />
<lui-badge color="warning" />
<lui-badge color="danger">Danger</lui-badge>
<lui-badge color="primary" text="Badge" />
<lui-badge color="secondary" text="Badge" />
<lui-badge color="info" text="Badge" />
<lui-badge color="success" text="Badge" />
<lui-badge color="warning" text="Badge" />
<lui-badge color="danger" text="Badge" />
    `
  })
}

export const Filter: Story = {
  render: () => ({
    components: { LuiBadge },
    args: { color, filter },
    template: `
<lui-badge color="primary" filter="lighten" />
<lui-badge color="secondary" filter="lighten" />
<lui-badge color="info" filter="lighten" />
<lui-badge color="success" filter="lighten" />
<lui-badge color="warning" filter="lighten" />
<lui-badge color="danger" filter="lighten" />
<lui-badge color="primary" filter="darken" />
<lui-badge color="secondary" filter="darken" />
<lui-badge color="info" filter="darken" />
<lui-badge color="success" filter="darken" />
<lui-badge color="warning" filter="darken" />
<lui-badge color="danger" filter="darken" />
<lui-badge color="primary" text="Badge" filter="lighten" />
<lui-badge color="secondary" text="Badge" filter="lighten" />
<lui-badge color="info" text="Badge" filter="lighten" />
<lui-badge color="success" text="Badge" filter="lighten" />
<lui-badge color="warning" text="Badge" filter="lighten" />
<lui-badge color="danger" text="Badge" filter="lighten" />
<lui-badge color="primary" text="Badge" filter="darken" />
<lui-badge color="secondary" text="Badge" filter="darken" />
<lui-badge color="info" text="Badge" filter="darken" />
<lui-badge color="success" text="Badge" filter="darken" />
<lui-badge color="warning" text="Badge" filter="darken" />
<lui-badge color="danger" text="Badge" filter="darken" />
<lui-badge color="primary"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="secondary"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="info"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="success"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="warning"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="danger"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="primary"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="secondary"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="info"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="success"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="warning"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="danger"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="primary" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="secondary" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="info" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="success" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="warning" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="danger" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>

<lui-badge color="primary" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="secondary" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="info" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="success" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="warning" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
<lui-badge color="danger" text="Badge"><template #icon>
<i class="ri-user-line"></i>
</template>
</lui-badge>
`
  })
}

export const Size: Story = {
  render: () => ({
    components: { LuiBadge },
    template: `
    <div class="space-x-4 mb-4">
    <lui-badge size="xs"/>
    <lui-badge size="sm"/>
    <lui-badge size="md"/>
    <lui-badge size="lg"/>
    <lui-badge size="xl"/>
    </div>
    <div class="space-x-4 mb-4">
    <lui-badge size="xs" text="Badge"/>
    <lui-badge size="sm" text="Badge"/>
    <lui-badge size="md" text="Badge"/>
    <lui-badge size="lg" text="Badge"/>
    <lui-badge size="xl" text="Badge"/>
    </div>
    <div class="space-x-4 mb-4">
    <lui-badge size="xs"><template #icon>
      <i class="ri-user-line"></i>
      </template></lui-badge>
    <lui-badge size="sm"><template #icon>
      <i class="ri-user-line"></i>
      </template></lui-badge>
    <lui-badge size="md"><template #icon>
      <i class="ri-user-line"></i>
      </template></lui-badge>
    <lui-badge size="lg"><template #icon>
      <i class="ri-user-line"></i>
      </template></lui-badge>
    <lui-badge size="xl"><template #icon>
      <i class="ri-user-line"></i>
      </template></lui-badge>
    </div>
    `
  })
}

export const PositionTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      return { args, positions }
    },
    template: `
      <div
        v-for="position in positions"
        :key="position"
        class="p-6 flex space-x-12"
      >
        <div class="space-x-4 mb-4">
          <lui-badge  color="success" :position="position">
            <div
              class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
            >
              <i class="ri-user-line"></i>
            </div>
          </lui-badge>
        </div>
        <div class="space-x-4 mb-4">
          <lui-badge  color="warning" :position="position" text="9">
            <div
              class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
            >
              <i class="ri-user-line"></i>
            </div>
          </lui-badge>
        </div>
        <div class="space-x-4 mb-4">
          <lui-badge  color="danger" :position="position">
            <div
              class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
            >
              <i class="ri-user-line"></i>
            </div>
            <template #icon>
              <i class="ri-wifi-off-fill"></i>
            </template>
          </lui-badge>
        </div>
      </div>
    `
  })
}
export const BorderTemplate: Story = {
  render: (args) => ({
    components: { LuiBadge },
    setup() {
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      return { args, positions }
    },
    template: `
    <div
      v-for="position in positions"
      :key="position"
      class="p-6 flex space-x-12"
    >
      <div class="space-x-4 mb-4">
        <lui-badge  color="success" :position="position" :border="true">
          <div
            class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
          >
            <i class="ri-user-line"></i>
          </div>
        </lui-badge>
      </div>
      <div class="space-x-4 mb-4">
        <lui-badge  color="warning" :position="position" :border="true" text="9">
          <div
            class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
          >
            <i class="ri-user-line"></i>
          </div>
        </lui-badge>
      </div>
      <div class="space-x-4 mb-4">
        <lui-badge  color="danger" :position="position" :border="true">
          <div
            class="flex w-8 h-8 rounded-md items-center justify-center bg-secondary-500 text-secondary-50"
          >
            <i class="ri-user-line"></i>
          </div>
          <template #icon>
            <i class="ri-wifi-off-fill"></i>
          </template>
        </lui-badge>
      </div>
    </div>
  `
  })
}
