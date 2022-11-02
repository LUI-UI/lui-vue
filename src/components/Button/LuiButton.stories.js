import LuiButton from "./LuiButton.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "LUI/Button",
  component: LuiButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    tag: {
      control: { type: "select" },
      options: ["button", "div", "a"],
    },
    // loaderPosition: {
    //   control: { type: "select" },
    //   options: ["right", "left"],
    // },
    onClick: {
      action: "just clicked",
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // function handleClick() {
    //   console.log("button just clicked..");
    // }
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<lui-button v-bind="args">My Button</lui-button>',
});

export const Solid = Template.bind({});
Solid.args = { rounded: true };
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Solid.args = {
//   primary: true,
//   label: 'Button',
// };
