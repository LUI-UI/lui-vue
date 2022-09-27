import LuiCard from "./LuiCard.vue";
import * as prop from "../../utils/storyProps";
// const props
export default {
  title: "LuiCard",
  components: LuiCard,

  // argTypes: {
  //   img: prop.img,
  //   border: prop.border,
  //   rounded: prop.rounded,
  //   borderFilter: prop.borderFilter,
  //   bgFilter: prop.bgFilter,
  //   textFilter: prop.textFilter,
  //   bgVariant: prop.bgVariant,
  //   textVariant: prop.textVariant,
  //   borderVariant: prop.borderVariant,
  // },
};

const Template = (args, { argTypes }) => ({
  components: { LuiCard },
  props: Object.keys(argTypes),
  // setup() {
  //   return { args };
  // },
  template: `
  <div class="p-5 flex justify-center">
  <lui-card v-bind="$props" class="w-1/2"> Test </lui-card>
  </div>
  `,
});
export const Default = Template.bind({});
// Default.args = {
//   img: prop.img,
//   border: prop.border,
//   rounded: prop.rounded,
//   borderFilter: prop.borderFilter,
//   bgFilter: prop.bgFilter,
//   textFilter: prop.textFilter,
//   bgVariant: prop.bgVariant,
//   textVariant: prop.textVariant,
//   borderVariant: prop.borderVariant,
// };
