import LuiInput from "./LuiInput.vue";
import {
  block,
  rounded,
  size,
  prepend,
  disabled,
  description,
  state,
} from "../../../.storybook/global-story-argtypes";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "LUI/Input",
  component: LuiInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    block,
    rounded,
    size,
    prepend,
    disabled,
    description,
    state,
    stateIcon: {
      control: { type: "boolean" },
    },
    clear: {
      control: { type: "boolean" },
    },
    onInput: {
      action: "typing",
    },
  },
  // args: {}, set default args for all components
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiInput },
  // data() {
  //   return {
  //     test: "",
  //   };
  // },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<lui-input v-bind="args" placeholder="type something" />',
});

export const Medium = Template.bind({});
Medium.args = { rounded: true, size: "md" };
console.log({ Medium });
export const Description = Template.bind({});
Description.args = { description: "Input description text" };
export const Prepend = Template.bind({});
Prepend.args = { prepend: "add-circle" };
export const StateIcon = Template.bind({});
StateIcon.args = { stateIcon: true };
export const Clear = Template.bind({});
Clear.args = { clear: true };
