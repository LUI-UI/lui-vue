import LuiInput from "./LuiInput.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "LuiInput",
  component: LuiInput,
  // args: {
  //   placeholder: {
  //     control: { type: "text" },
  //   },
  // },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // argTypes: {
  //   size: {
  //     control: { type: "select" },
  //     options: ["sm", "md", "lg"],
  //   },
  //   state: {
  //     control: { type: "select" },
  //     options: [null, "warning", true, false],
  //   },
  //   textVariant: {
  //     control: { type: "select" },
  //     options: ["primary", "secondary"],
  //   },
  //   clear: {
  //     control: { type: "boolean" },
  //   },
  //   disabled: {
  //     control: { type: "boolean" },
  //   },
  //   description: {
  //     control: { type: "text" },
  //   },
  //   prepend: {
  //     control: { type: "select" },
  //     options: ["search", "search-2", "search-eye", "none"],
  //   },
  //   placeholder: {
  //     control: { type: "text" },
  //   },
  // },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args,{argTypes}) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiInput },
  props: Object.keys(argTypes),
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    console.log(args)
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: ` <div class="text-warning"> test </div> <lui-input v-bind="args" placeholder-variant="primary" />`,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.argTypes = {
  size: {
    control: { type: "select" },
    options: ["sm", "md", "lg"],
  },
  state: {
    control: { type: "select" },
    options: [null, "warning", true, false],
  },
  textVariant: {
    control: { type: "select" },
    options: ["primary", "secondary"],
  },
  clear: {
    control: { type: "boolean" },
  },
  disabled: {
    control: { type: "boolean" },
  },
  description: {
    control: { type: "text" },
  },
  prepend: {
    control: { type: "select" },
    options: ["search", "search-2", "search-eye", "none"],
  },
  placeholder: {
    control: { type: "text" },
  },
};
export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Warning.args = {
  size: "sm",
  state: "warning",
};
export const Danger = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Danger.args = {
  size: "sm",
  state: false,
};
export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Success.args = {
  size: "sm",
  state: true,
};
