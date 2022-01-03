import LuiCard from './LuiCard.vue'
import * as prop from '../../utils/storyProps'
export default {
  title: 'LuiCard',
  components: LuiCard,
  argTypes: {
    img: prop.img,
    border: prop.border,
    rounded: prop.rounded,
    borderFilter: prop.borderFilter,
    bgFilter: prop.bgFilter,
    textFilter: prop.textFilter,
    bgVariant: prop.bgVariant,
    textVariant: prop.textVariant,
    borderVariant: prop.borderVariant,
  },
}

const Template = (args) => ({
  components: { LuiCard },
  setup() {
    return { args }
  },
  template: `
  <div class="p-5 flex justify-center">
  <lui-card v-bind="args" class="w-1/2"> Test </lui-card>
  </div>
  `,
})
export const Default = Template.bind({})
Default.args = {
  bgVariant: 'primary',
  textVariant: 'secondary',
  bgFilter: 'lighter',
  textFilter: 'darker',
}