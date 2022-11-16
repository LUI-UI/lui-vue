import LuiRadio from "./LuiRadio.vue";
import {
  size,
  disabled,
  state,
  description,
} from "../../../.storybook/global-story-argtypes";
export default {
  title: "LUI/LuiRadio",
  component: LuiRadio,
  argTypes: {
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
  components: { LuiRadio },
  data() {
    return {
      e: false,
      b: null,
      checkedNames: ["Mike"],
      nativeNames: ["b"],
    };
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  // <lui-checkbox v-bind="args" v-model="test" />
  template: `
  <div class="p-3">{{checkedNames}} - {{e}}</div>
    <button class="bg-primary-500 text-white p-1 rounded" @click="checkedNames.push('John')">add new</button>
    <div class="p-2 space-x-4">
      <lui-radio v-bind="args" id="jack" value="Jack" v-model="checkedNames" />
      <lui-radio v-bind="args" id="john" value="John" v-model="checkedNames" />
      <lui-radio v-bind="args" id="mike" value="Mike" v-model="checkedNames" />
    </div>
    <div class="p-2">
      <lui-radio v-bind="args" v-model="e" />
    </div>`,
});

export const Medium = Template.bind({});
Medium.args = { size: "md" };
export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
export const Description = Template.bind({});
Description.args = { description: "Radio description" };
