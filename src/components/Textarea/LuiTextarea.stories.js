import LuiTextarea from './LuiTextarea.vue'
import {
  rounded,
  size,
  disabled,
  state,
  description,
  stateIcon,
  block
} from '../../../.storybook/global-story-argtypes'
import { ref } from 'vue'
export default {
  title: 'LUI/Textarea',
  component: LuiTextarea,
  argTypes: {
    rounded,
    size,
    disabled,
    description,
    state,
    stateIcon,
    block,
    resize: {
      control: { type: 'select' },
      options: [true, false, 'x', 'y']
    }
  }
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // args: {}, set default args for all components
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiTextarea },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    let message = ref('okey google!')
    return { args, message }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    {{message}}
    <lui-textarea v-bind="args" placeholder="text placeholder" v-model="message" />
  `
})
export const Medium = Template.bind({})
Medium.args = { size: 'sm' }
