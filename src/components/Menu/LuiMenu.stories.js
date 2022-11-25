import LuiMenuItem from "./LuiMenuItem.vue";
import LuiMenuDropdown from "./LuiMenuDropdown.vue";
import {
  color,
  size,
  rounded,
} from "../../../.storybook/global-story-argtypes.js";

export default {
  title: "LUI/Menu",
  component: LuiMenuDropdown,
  subcomponents: { LuiMenuItem }, //👈 Adds the ListItem component as a subcomponent
  argTypes: {
    color,
    size,
    rounded,
    tag: {
      control: { type: "select" },
      options: ["button", "a"],
    },
  },
};
const DefaultTemplate = (args) => ({
  components: { LuiMenuDropdown, LuiMenuItem },
  setup() {
    return { args };
  },
  template: `<lui-menu-dropdown v-bind="args">
             <lui-menu-item v-bind="args"> Menu Item </lui-menu-item>
             <lui-menu-item v-bind="args"> Menu Item </lui-menu-item>
             <lui-menu-item disabled="true" v-bind="args"> Menu Item </lui-menu-item>
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
});
export const Default = DefaultTemplate.bind({});
Default.args = { size: "md" };
