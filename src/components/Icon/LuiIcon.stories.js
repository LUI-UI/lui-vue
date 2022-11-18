import LuiIcon from "./LuiIcon.vue";

export default {
  title: "LUI/Icon",
  component: LuiIcon,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    icon: {
      control: "select",
      options: ["home", "add-circle", "close", "none"],
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-icon v-bind="args" />`,
});
export const Default = Template.bind({ icon: "home" });
Default.args;
