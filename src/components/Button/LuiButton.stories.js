import LuiButton from "./LuiButton.vue";
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
} from "../../global-story-argtypes";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "LUI/Button",
  component: LuiButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
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
    tag: {
      control: { type: "select" },
      options: ["button", "div", "a"],
    },
    onClick: {
      action: "just clicked",
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiButton },
  // data() {
  //   return {
  //     is: true,
  //   };
  // },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-button v-bind="args">My Button</lui-button>`,
});

export const Solid = Template.bind({});
Solid.args = { rounded: true };
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Solid.args = {
//   primary: true,
//   label: 'Button',
// };
