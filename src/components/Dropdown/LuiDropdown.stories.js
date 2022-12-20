import LuiDropdown from "./LuiDropdown.vue";
import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import {
  variant,
  color,
  block,
  rounded,
  size,
  filter,
  disabled,
} from "../../../.storybook/global-story-argtypes";

export default {
  title: "LUI/Dropdown",
  component: LuiDropdown,
  argTypes: {
    variant,
    color,
    block,
    rounded,
    size,
    filter,
    disabled,
    menuPosition: {
      control: "select",
      options: [
        "bottomLeft",
        "bottomRight",
        "topLeft",
        "topRight",
        "leftTop",
        "leftBottom",
        "rightTop",
        "rightBottom",
      ],
    },
    onOnTrigger: {
      action: "menu triggered",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // args: {}, set default args for all components
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiDropdown, LuiMenuItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    function selectItem(option) {
      console.log("selected option is: ", option);
      //..
    }
    return { args, selectItem };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  // <lui-checkbox v-bind="args" v-model="test" />
  template: `
    <div class="h-[1400px] pl-12">
      <lui-dropdown v-bind="args">
        <lui-menu-item v-for="i in 5" :key="i" @click="selectItem(i)">
          lui-menu-item-{{ i }}
        </lui-menu-item>
      </lui-dropdown>   
      <div class="mt-[450px]">
        <lui-dropdown v-bind="args">
          <lui-menu-item v-for="i in 7" :key="i" @click="selectItem(i)">
            lui-menu-item-{{ i }}
          </lui-menu-item>
        </lui-dropdown>    
      </div> 
    </div>
    `,
});

export const Medium = Template.bind({});
Medium.args = { text: "Dropdown" };
export const Options = Template.bind({});
Options.args = { text: "Dropdown", options: ["test", "just", "mkl"] };
