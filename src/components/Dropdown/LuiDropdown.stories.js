import LuiDropdown from './LuiDropdown.vue'
import LuiDropdownItem from './LuiDropdownItem.vue'
import LuiDropdownDivider from './LuiDropdownDivider.vue'
import LuiIcon from '../Icon/LuiIcon.vue'
import { variant, block, filter, rounded, prepend } from '../../utils/storyProps'
export default {
  title: 'LuiDropdown',
  component: LuiDropdown,
  LuiDropdownItem,
  LuiIcon,
  LuiDropdownDivider,
  args: {
    // label: 'link',
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    variant,
    block,
    filter,
    rounded,
    prepend,
    text: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: { type: 'select' },
      options: ['default','none','home'],
    },
    placement: {
      control: { type: 'select' },
      options: [
        'bottomLeft',
        'bottomRight',
        'topLeft',
        'topRight',
        'rightTop',
        'rightBottom',
        'leftTop',
        'leftBottom',
      ],
    },
    iconLine: {
      control: { type: 'boolean' },
    },
    uppercase: {
      control: { type: 'boolean' },
    },
  },
}

const BasicTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiDropdown, LuiDropdownItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="w-screen h-screen flex justify-center items-center">
                <lui-dropdown v-bind="args">
                  <lui-dropdown-item>
                    Edit
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    Dublicate
                  </lui-dropdown-item> 
                  <lui-dropdown-item>
                    Archive
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    Move
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    Add to favourites
                  </lui-dropdown-item>
                </lui-dropdown>
             </div>`,
})

const IconContentTemp = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiDropdown, LuiDropdownItem, LuiIcon, LuiDropdownDivider },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="w-screen h-screen flex justify-center items-center">
                <lui-dropdown v-bind="args" right>
                  <lui-dropdown-item>
                    <div class="flex items-center">
                      <lui-icon name="edit-box" line size="md" />
                      <span class="ml-2">Edit</span>
                    </div>
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    <div class="flex items-center">
                      <lui-icon name="file-copy" line size="md" />
                      <span class="ml-2">Dublicate</span>
                    </div>
                  </lui-dropdown-item> 
                  <lui-dropdown-item>
                    <div class="flex items-center">
                      <lui-icon name="archive" line size="md" />
                      <span class="ml-2">Archive</span>
                    </div>
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    <div class="flex items-center">
                      <lui-icon name="drag-move" line size="md" />
                      <span class="ml-2">Move</span>
                    </div>
                  </lui-dropdown-item>
                  <lui-dropdown-divider />
                  <lui-dropdown-item>
                    <div class="flex items-center">
                      <lui-icon name="bookmark" line size="md" />
                      <span class="ml-2">Add to favorites</span>
                    </div>
                  </lui-dropdown-item>
                </lui-dropdown>
             </div>`,
})

const LongContentTemp = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiDropdown, LuiDropdownItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<div class="w-screen h-screen flex justify-center items-center">
                <lui-dropdown v-bind="args">
                  <lui-dropdown-item>
                    <h3 class="font-bold mb-2">Bulgaria</h3>
                    <p class="text-sm" style="maxWidth:28ch;" >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    <h3 class="font-bold mb-2">Turkey</h3>
                    <p class="text-sm" style="maxWidth:28ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </lui-dropdown-item> 
                  <lui-dropdown-item>
                    <h3 class="font-bold mb-2">Greece</h3>
                    <p class="text-sm" style="maxWidth:28ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    <h3 class="font-bold mb-2">Brazil</h3>
                    <p class="text-sm" style="maxWidth:28ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </lui-dropdown-item>
                  <lui-dropdown-item>
                    <h3 class="font-bold mb-2">Argentina</h3>
                    <p class="text-sm" style="maxWidth:28ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </lui-dropdown-item>
                </lui-dropdown>
             </div>`,
})

export const Dropdown = BasicTemplate.bind({})
export const IconContent = IconContentTemp.bind({})
export const LongContent = LongContentTemp.bind({})

//BASIC
//DIVIDER
//LONG CONTENT!