import LuiButton from "./LuiButton.vue";
import {
  variant,
  color,
  block,
  rounded,
  size,
  filter,
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
    size,
    filter,
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
    // const iconSize = computed(() =>
    //   props.size === "xs"
    //     ? "12"
    //     : props.size === "sm"
    //     ? "16"
    //     : props.size === "xl"
    //     ? "24"
    //     : "20"
    // );
    function iconSize(size) {
      return size === "xs"
        ? "12"
        : size === "sm"
        ? "16"
        : size === "xl"
        ? "24"
        : "20";
    }
    return { args, sizes, iconSize };
  },
  template: `<div class="flex items-center space-x-4">
    <div v-for="size in sizes" :key="size">
      <lui-button v-bind="args" :size="size">
        <span>LuiButton</span>
        <template #append>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="iconSize(size)" :height="iconSize(size)" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>
        </template>
      </lui-button>
    </div>
  </div>`,
});

export const IconButton = (args) => ({
  components: { LuiButton },
  setup() {
    const sizes = ["xs", "sm", "md", "lg", "xl"];
    const roundedValues = [false, true, "full"];
    function iconSize(size) {
      return size === "xs"
        ? "12"
        : size === "sm"
        ? "16"
        : size === "xl"
        ? "24"
        : "20";
    }
    return { args, sizes, roundedValues, iconSize };
  },
  template: `
  <div class="space-y-6">
    <div v-bind="args" class="flex items-center space-x-6" v-for="value in roundedValues" :key="value">
      <div class="flex" v-for="size in sizes" :key="size">
        <lui-button :size="size" :rounded="value">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="iconSize(size)" :height="iconSize(size)" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>
          </template>
        </lui-button>
      </div>
    </div>
  </div>`,
});
