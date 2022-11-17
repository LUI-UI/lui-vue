import LuiAvatar from "./LuiAvatar.vue";
import { color, size, filter } from "../../../.storybook/global-story-argtypes";
export default {
  title: "LUI/Avatar",
  component: LuiAvatar,
  argTypes: {
    color,
    size,
    filter,
  },
};
const Template = (args) => ({
  components: { LuiAvatar },
  setup() {
    return { args };
  },
  template: `<lui-avatar v-bind="args">SO</lui-avatar>`,
});
export const Small = Template.bind({});
Small.args = { size: "sm" };
export const Medium = Template.bind({});
Medium.args = { size: "md" };
export const Large = Template.bind({});
Large.args = { size: "lg" };
