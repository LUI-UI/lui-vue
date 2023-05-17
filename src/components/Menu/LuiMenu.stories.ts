import LuiMenuItem from './LuiMenuItem.vue'
import LuiMenuDropdown from './LuiMenuDropdown.vue'
import { color, size, rounded } from '../../../.storybook/global-story-argtypes'

import type { Meta, StoryObj } from '@storybook/vue3'

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
      ]
    }
  }
}
export default meta
type Story = StoryObj<typeof LuiMenuDropdown>

export const Default: Story = {
  render: (args) => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    setup() {
      return { args }
    },
    template: `<lui-menu-dropdown v-bind="args">
             <lui-menu-item v-bind="args"> Menu Item </lui-menu-item>
             <lui-menu-item v-bind="args"> Menu Item </lui-menu-item>
             <lui-menu-item :disabled="true" v-bind="args"> Menu Item </lui-menu-item>
             <lui-menu-item href="https://contentrain.io" target="_blank" v-bind="args"> 
                <template #prepend>
                <i class="ri-home-line"/>
                </template>
                  Menu Item
                <template #append>
                <i class="ri-arrow-down-line"/>
                </template>
             </lui-menu-item>
            </lui-menu-dropdown>
  `,
    args: {
      size: 'md',
      text: 'dropdown'
    }
  })
}
export const customTriggerTemplate: Story = {
  render: (args) => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    setup() {
      return { args }
    },
    template: `<lui-menu-dropdown v-bind="args">
              <template #trigger="{...attrs}">
                <div v-bind="attrs" class="w-12 h-12 rounded-full bg-primary-400 text-3xl flex items-center justify-center text-white ">
                  A
                </div>
              </template>  
              <lui-menu-item v-bind="args">Menu Item1</lui-menu-item>
              <lui-menu-item v-bind="args">Menu Item2</lui-menu-item>
              <lui-menu-item v-bind="args">Menu Item3</lui-menu-item>
              <lui-menu-item v-bind="args">this is the test item with a huge content for a dropdown item</lui-menu-item>
            </lui-menu-dropdown>
  `
  })
}
export const iconTemplate: Story = {
  render: (args) => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    setup() {
      return { args }
    },
    template: `<lui-menu-dropdown v-bind="args" text="Dropdown">
              <lui-menu-item>
                <template #prepend> <i class="ri-edit-box-line"/> </template>
                <span>Edit</span>
              </lui-menu-item>
              <lui-menu-item>
                <template #prepend> <i class="ri-file-copy-line"/> </template>
                <span>Duplicate</span>
              </lui-menu-item>
              <lui-menu-item color="warning">
                <template #prepend> <i class="ri-archive-line"/> </template>
                <span>Archive</span>
              </lui-menu-item>
              <lui-menu-item color="danger">
                <template #prepend> <i class="ri-drag-move-line"/> </template>
                <span>Move</span>
              </lui-menu-item>
              <lui-menu-item color="primary">
                <template #prepend> <i class="ri-share-line"/> </template>
                <span>Share</span>
              </lui-menu-item>
            </lui-menu-dropdown>
  `,
    args: { size: 'md' }
  })
}

export const autoPositionTemplate: Story = {
  render: (args) => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    setup() {
      return { args }
    },
    template: `
    <div class="h-[1300px]">
      <lui-menu-dropdown v-bind="args" text="Dropdown 1">
        <lui-menu-item v-bind="args"> Menu Item 1</lui-menu-item>
        <lui-menu-item v-bind="args"> Menu Item 2</lui-menu-item>
        <lui-menu-item v-bind="args"> Menu Item 3</lui-menu-item>
      </lui-menu-dropdown>
      <div class="mt-[800px]">
        <lui-menu-dropdown v-bind="args" text="Dropdown 2">
          <lui-menu-item v-bind="args"> Menu Item 1</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 2</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 3</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 4</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 5</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 6</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 7</lui-menu-item>
          <lui-menu-item v-bind="args"> Menu Item 8</lui-menu-item>
        </lui-menu-dropdown>
      </div>
    </div>
  `
  })
}

export const positionsTemplate: Story = {
  render: (args) => ({
    components: { LuiMenuDropdown, LuiMenuItem },
    setup() {
      const positions = [
        'bottomLeft',
        'bottomRight',
        'topLeft',
        'topRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom'
      ]
      return { args, positions }
    },
    template: `
    <div class="h-[1000px]">
      <div class="flex items-center justify-between flex-wrap mt-[300px] mx-auto max-w-[800px]">
        <div v-for="(position,i) in positions" :key="position" :class="i > 4 ? 'mt-12' : ''">
          <p>{{position}}</p>
          <lui-menu-dropdown v-bind="args" text="Dropdown" :menu-position="position">
            <lui-menu-item>Menu Item position-1</lui-menu-item>
            <lui-menu-item>Menu Item position-2</lui-menu-item>
            <lui-menu-item>Menu Item position-3</lui-menu-item>
            <lui-menu-item>Menu Item position-4</lui-menu-item>
            <lui-menu-item>Menu Item position-5</lui-menu-item>
          </lui-menu-dropdown>
        </div>
      </div>
    </div>
  `
  })
}
