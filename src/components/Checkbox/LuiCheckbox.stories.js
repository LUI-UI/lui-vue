import LuiCheckbox from "./LuiCheckbox.vue";
import {
  rounded,
  size,
  disabled,
  state,
  description,
} from "../../../.storybook/global-story-argtypes";
export default {
  title: "LUI/Checkbox",
  component: LuiCheckbox,
  argTypes: {
    rounded,
    size,
    disabled,
    description,
    state,
    onChange: {
      action: "checked change",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // args: {}, set default args for all components
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiCheckbox },
  data() {
    return {
      test: true,
    };
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<lui-checkbox v-bind="args" v-model="test" /><div class="ml-3">{{test}}</div>',
});

export const Medium = Template.bind({});
Medium.args = { rounded: true, size: "md" };
export const Disabled = Template.bind({});
Disabled.args = { rounded: true, disabled: true };
export const RoundedFull = Template.bind({});
RoundedFull.args = { rounded: "full" };
export const Description = Template.bind({});
Description.args = { description: "checkbox description" };
export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: true };
