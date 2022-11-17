import LuiDropdown from "./LuiDropdown.vue";
import {
  variant,
  color,
  block,
  rounded,
  prepend,
  append,
  size,
  filter,
  icon,
  disabled,
} from "../../../.storybook/global-story-argtypes";

export default {
  title: "LUI/LuiDropdown",
  component: LuiDropdown,
  argTypes: {
    variant,
    color,
    block,
    rounded,
    prepend,
    append,
    size,
    filter,
    icon,
    disabled,
    onOnSelect: {
      action: "select a item",
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
  components: { LuiDropdown },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    function handleSelect(option) {
      console.log("selected option is: ", option);
      //..
    }
    return { args, handleSelect };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  // <lui-checkbox v-bind="args" v-model="test" />
  template: `<lui-dropdown v-bind="args" @onSelect="handleSelect" />`,
});

export const Medium = Template.bind({});
Medium.args = { label: "Dropdown" };
export const Options = Template.bind({});
Options.args = { label: "Dropdown", options: ["test", "just", "mkl"] };
