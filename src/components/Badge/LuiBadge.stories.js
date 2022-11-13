import LuiBadge from "./LuiBadge.vue";
import { color, size, filter } from "../../../.storybook/global-story-argtypes";
export default {
  title: "LUI/Badge",
  component: LuiBadge,
  argTypes: {
    color,
    size,
    filter,
  },
};
const Template = (args) => ({
  components: { LuiBadge },
  setup() {
    return { args };
  },
  template: `<lui-badge v-bind="args"></lui-badge>`,
});
export const Small = Template.bind({});
Small.args = { size: "sm" };
export const Medium = Template.bind({});
Medium.args = { size: "md" };
export const Large = Template.bind({});
Large.args = { size: "lg" };
