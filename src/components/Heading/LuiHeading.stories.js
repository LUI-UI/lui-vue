import LuiHeading from "./LuiHeading.vue";

export default {
  title: "LuiHeading",
  component: LuiHeading,
  args: {
    label: "heading",
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    display: {
      control: { type: "boolean" },
    },
    level: {
      control: { type: "select" },
      options: ["1", "2", "3", "4", "5", "6"],
    },
    size: {
      control: { type: "select" },
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "default"],
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiHeading },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-heading v-bind="args"> {{ args.label }} </lui-heading>`,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  level: "3",
};
export const Display = Template.bind({});

Display.args = {
  level: "3",
  display: true,
};
