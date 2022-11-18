import LuiBadge from "./LuiBadge.vue";
import {
  color,
  size,
  filter,
  border,
  icon,
} from "../../../.storybook/global-story-argtypes";
export default {
  title: "LUI/Badge",
  component: LuiBadge,
  argTypes: {
    color,
    size,
    filter,
    icon,
    border,
    variant: {
      control: "select",
      options: ["solid", "outline"],
    },
    text: {
      control: "text",
    },
  },
};
const Template = (args) => ({
  components: { LuiBadge },
  setup() {
    return { args };
  },
  template: `<lui-badge v-bind="args"></lui-badge>`,
});
const SizesTemplate = (args) => ({
  components: { LuiBadge },
  setup() {
    return { args };
  },
  template: `    <div class=" space-x-16">
  <div class="space-x-3">
    <lui-badge v-bind="args" size="xs"></lui-badge>
    <lui-badge v-bind="args" size="sm"></lui-badge>
    <lui-badge v-bind="args" size="md"></lui-badge>
    <lui-badge v-bind="args" size="lg"></lui-badge>
    <lui-badge v-bind="args" size="xl"></lui-badge>
  </div>
  <div class="space-x-3">
    <lui-badge v-bind="args" size="xs" text="9"></lui-badge>
    <lui-badge v-bind="args" size="sm" text="9"></lui-badge>
    <lui-badge v-bind="args" size="md" text="9"></lui-badge>
    <lui-badge v-bind="args" size="lg" text="9"></lui-badge>
    <lui-badge v-bind="args" size="xl" text="9"></lui-badge>
  </div>
  <div class="space-x-3">
    <lui-badge v-bind="args" size="xs" text="9999+"></lui-badge>
    <lui-badge v-bind="args" size="sm" text="9999+"></lui-badge>
    <lui-badge v-bind="args" size="md" text="9999+"></lui-badge>
    <lui-badge v-bind="args" size="lg" text="9999+"></lui-badge>
    <lui-badge v-bind="args" size="xl" text="9999+"></lui-badge>
  </div>
  <div class="space-x-3">
    <lui-badge v-bind="args" size="xs">
      <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="8" height="8" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 21H7A6 6 0 0 1 5.008 9.339a7 7 0 1 1 13.984 0A6 6 0 0 1 17 21zm0-12a5 5 0 1 0-9.994.243l.07 1.488-1.404.494A4.002 4.002 0 0 0 7 19h10a4 4 0 1 0-3.796-5.265l-1.898-.633A6.003 6.003 0 0 1 17 9z"/></svg>      </template>
    </svg>    </lui-badge>
    <lui-badge v-bind="args" size="sm">
      <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zM8 15v2h8v-2H8z"/></svg>
      </template>
    </lui-badge>
    <lui-badge v-bind="args" size="md">
      <template #icon>
        <i class="ri-user-line" />
      </template>
    </lui-badge>
    <lui-badge v-bind="args" size="lg">
      <template #icon>
        <i class="ri-user-line" />
      </template>
    </lui-badge>
    <lui-badge v-bind="args" size="xl">
      <template #icon>
        <i class="ri-user-line" />
      </template>
    </lui-badge>
  </div>
</div>`,
});
export const Default = Template.bind({});
Default.args = { size: "sm" };

export const Sizes = SizesTemplate.bind({});
