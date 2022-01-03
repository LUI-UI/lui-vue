import LuiTabs from './LuiTabs.vue'
import LuiTab from './LuiTab.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'LuiTabs',
  component: LuiTabs, LuiTab,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    alignTabs: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    alignContent: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    stretch: {
      control: {type: 'boolean'}
    }    
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiTabs, LuiTab },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: 
  `<lui-tabs v-bind="args"> 
    <lui-tab title="Tab1"> Hello from 1 </lui-tab>
    <lui-tab title="Tab2"> Hello from tab 2 </lui-tab>
    <lui-tab title="Tab3"> Hello from tab 3 </lui-tab>
    <lui-tab title="Tab4"> Hello from tab 4 </lui-tab>
  </lui-tabs>`,
})


export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  alignTabs: 'center',
}

const DisabledTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiTabs, LuiTab },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: 
  `<lui-tabs v-bind="args"> 
    <lui-tab title="Tab1"> Hello from 1 </lui-tab>
    <lui-tab title="Tab2"> Hello from tab 2 </lui-tab>
    <lui-tab title="Tab3" disabled> Hello from tab 3 </lui-tab>
    <lui-tab title="Tab4"> Hello from tab 4 </lui-tab>
  </lui-tabs>`,
})

export const Disabled = DisabledTemplate.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  alignTabs: 'center',
}
