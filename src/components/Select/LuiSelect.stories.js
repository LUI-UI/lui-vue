import LuiSelect from './LuiSelect.vue'

export default {
  title: 'LuiSelect',
  component: LuiSelect,
  args: {
    // label: 'Select',
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    placeholder: {
      control: {type: 'text'}
    },
    textField: {
      control: {type: 'text'}
    },
    valueField: {
      control: {type: 'text'}
    },
    multiple: {
      control: {type: 'boolean'}
    },
    disabled: {
      control: {type: 'boolean'}
    },
    rounded: {
      control: {type: 'boolean'}
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: { type: 'select' },
      options: [null,'warning',false,true]
    },
    selectPrepend: {
      control: { type: 'select' },
      options: [null,'Icon','Badge'],
      mapping: {
        Icon: { tag: 'lui-icon',name: 'map-2', line: true },
        Badge: { tag: 'lui-badge',variant: 'danger' },
      },
    },
    selectAppend: {
      control: { type: 'select' },
      options: [null,'Icon','Badge'],
      mapping: {
        Icon: { tag: 'lui-icon',name: 'arrow-down-s', line: true },
        Badge: { tag: 'lui-badge',variant: 'danger' },
      },
    },
    optionPrepend: {
      control: { type: 'select' },
      options: [null,'Icon','Badge'],
      mapping: {
        Icon: { tag: 'lui-icon',name: 'map-2', line: true },
        Badge: { tag: 'lui-badge',variant: 'danger' },
      },
    },
    optionAppend: {
      control: { type: 'select' },
      options: [null,'Icon','Badge'],
      mapping: {
        Icon: { tag: 'lui-icon',name: 'map-2', line: true },
        Badge: { tag: 'lui-badge',variant: 'danger' },
      },
    },
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const options = [
      {text: 'Select a city', value: 0, disabled:true},
      { text: 'Edirne', value: 22 },
      { text: 'Tekirdag', value: 59 },
      { text: 'Kırklareli', value: 39 },
      { text: 'Izmir', value: 35 },
      { text: 'Mugla', value: 48 },
    ];
    const selectedOption = {text: 'Edirne', value: 22}
    return { args, options, selectedOption }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<lui-select v-bind="args" :options="options" v-model="selectedOption" text-field="text"> </lui-select>`,
})

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// BaseSelect.args = {
//   size: 'sm',
//   variant: 'primary',
// }
