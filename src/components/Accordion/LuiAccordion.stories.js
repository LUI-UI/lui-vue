import LuiAccordion from './LuiAccordion.vue'
import LuiAccordionGroup from './LuiAccordionGroup.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'LuiAccordion',
  component: LuiAccordion, LuiAccordionGroup,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    title:{
      control:{type: 'text'}
    }  
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiAccordion },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: 
  ` <lui-accordion title="Title1"> Hello from 1 </lui-accordion>
    <lui-accordion title="Title2" active> Hello from tab 2 </lui-accordion>
    `,
})
const GroupTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiAccordion, LuiAccordionGroup },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: 
  `<lui-accordion-group v-bind="args"> 
    <lui-accordion title="Title1"> Hello from 1 </lui-accordion>
    <lui-accordion title="Title2"> Hello from tab 2 </lui-accordion>
    <lui-accordion title="Title3"> Hello from tab 3 </lui-accordion>
    <lui-accordion title="Title4"> Hello from tab 4 </lui-accordion>
  </lui-accordion-group>`,
})


export const Accordion = Template.bind({})
export const AccordionGroup = GroupTemplate.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Default.args = {
//   alignTabs: 'center',
// }