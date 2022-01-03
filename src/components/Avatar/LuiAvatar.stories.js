import LAvatar from './LuiAvatar.vue'
import { variant, rounded, roundedFull, filter, size, border, img } from '../../utils/storyProps'
export default {
  title: 'LuiAvatar',
  component: LAvatar,
  argTypes: {
    onClick: {},
    variant: variant,
    rounded: rounded,
    roundedFull: roundedFull,
    filter: filter,
    size: size,
    border: border,
    img: img,
    icon: {
      control: { type: 'select' },
      options: ['user', 'arrow-right', 'mail-check', 'home', 'user', 'account-circle'],
    },
    badge: {
      control: {type: 'object'}
    }
  },
}

const Template = (args) => ({
  components: { LAvatar },
  setup() {
    return { args }
  },
  template: `<l-avatar v-bind="args"> {{ args.label }} </l-avatar>`,
})

export const Default = Template.bind({})
Default.args = {
  text: 'BB',
}

export const Text = Template.bind({})
Text.args = {
  text: 'BB',
}
export const Icon = Template.bind({})
Icon.args = {
  icon: 'user',
}
export const Image = Template.bind({})
Icon.args = {
  img: 'https://randomuser.me/api/portraits/men/43.jpg',
}