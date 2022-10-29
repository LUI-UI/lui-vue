// LuiButton.stories.ts

import LuiButton from "./LuiButton.vue";

import { Meta, StoryFn } from "@storybook/vue3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "LuiButton",
  component: LuiButton,
} as Meta<typeof LuiButton>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof LuiButton> = (args) => ({
  components: { LuiButton },
  setup() {
    return { args };
  },
  template: '<LuiButton v-bind="args"> My Button </LuiButton>',
});

//👇 Each story then reuses that template
export const Solid = Template.bind({});
Solid.args = { rounded: true };

export const Outline = Template.bind({});
Outline.args = { variant: "outline", color: "danger", rounded: "full" };

export const Text = Template.bind({});
Text.args = { variant: "text" };

export const Link = Template.bind({});
Link.args = { variant: "link" };
