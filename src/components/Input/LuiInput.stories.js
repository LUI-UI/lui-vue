import LuiInput from "./LuiInput.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "LUI/Input",
  component: LuiInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // loaderPosition: {
    //   control: { type: "select" },
    //   options: ["right", "left"],
    // },
    // onChange: {
    //   action: "just clicked",
    // },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // function handleClick() {
    //   console.log("button just clicked..");
    // }
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<div class="m-8"><lui-input v-bind="args" type="text" placeholder="type something" /><div/>',
});

export const Medium = Template.bind({});
Medium.args = { rounded: true, size: "md" };
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Solid.args = {
//   primary: true,
//   label: 'Button',
// };
