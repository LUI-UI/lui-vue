import LuiSwitch from "./LuiSwitch.vue";
import {
  rounded,
  size,
  disabled,
  state,
  description,
} from "../../../.storybook/global-story-argtypes";

export default {
  title: "LUI/Switch",
  component: LuiSwitch,
  argTypes: {
    rounded,
    size,
    disabled,
    description,
    state,
    onChange: {
      action: "switch change",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // args: {}, set default args for all components
};
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiSwitch },
  data() {
    return {
      test: false,
      names: [],
    };
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div class="p-2">{{names}}</div>
    <div class="p-2 space-x-4">
      <lui-switch v-bind="args" id="burak" value="burak" v-model="names" />
      <lui-switch v-bind="args" id="eser" value="eser" v-model="names" />
      <lui-switch v-bind="args" id="fatih" value="fatih" v-model="names" />
    </div>
  `,
});
export const Medium = Template.bind({});
Medium.args = { size: "md" };
export const Rounded = Template.bind({});
Rounded.args = { rounded: true };
export const Disabled = Template.bind({});
Disabled.args = { disabled: true, checked: true };
