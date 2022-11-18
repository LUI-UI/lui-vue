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
} from "../../../.storybook/global-story-argtypes";

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
export const Default = Template.bind({});
Default.args = { rounded: true };
export const Variants = (args) => ({
  components: { LuiButton },
  setup() {
    return { args };
  },
  template: `
  <div class="space-x-2">
    <lui-button v-bind="args" variant="solid">Solid</lui-button>
    <lui-button v-bind="args" variant="outline">Outline</lui-button>
    <lui-button v-bind="args" variant="link">Link</lui-button>
    <lui-button v-bind="args" variant="text">Text</lui-button>
  </div>`,
});
export const Colors = (args) => ({
  components: { LuiButton },
  setup() {
    const colors = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "danger",
    ];
    return { args, colors };
  },
  template: `
  <div class="space-x-2">
    <lui-button v-for="color in colors" :key="color" v-bind="args" :color="color">
      {{color}}
    </lui-button>
  </div>
  <div class="space-x-2 space-y-2">
    <lui-button v-for="color in colors" :key="color" v-bind="args" filter="darken" :color="color">
      Darken
    </lui-button>
  </div>
  <div class="space-x-2 space-y-2">
    <lui-button v-for="color in colors" :key="color" v-bind="args" filter="lighten" :color="color">
      Lighten
    </lui-button>
  </div>
  
  `,
});
export const Sizes = (args) => ({
  components: { LuiButton },
  setup() {
    const sizes = ["xs", "sm", "md", "lg", "xl"];
    return { args, sizes };
  },
  template: `<div class="flex items-center space-x-4">
    <div v-for="size in sizes" :key="size">
      <lui-button v-bind="args" :size="size" append="add-circle">LuiButton</lui-button>
    </div>
  </div>`,
});
