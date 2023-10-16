// import { ref } from 'vue'
// import {
//   block,
//   rounded,
//   size,
//   description,
//   state,
//   stateIcon
// } from '../../../.storybook/global-story-argtypes'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import LuiOption from '../Option/LuiOption.vue'
import LuiMultiSelect from './LuiMultiSelect.vue'

const meta: Meta<typeof LuiMultiSelect> = {
  title: 'LUI/MultiSelect',
  component: LuiMultiSelect,
}
export default meta

type Story = StoryObj<typeof LuiMultiSelect>

export const Default: Story = {
  render: () => ({
    components: { LuiMultiSelect },
    setup() {
      const names = [
        { value: '1', text: 'Wade Cooper' },
        { value: '2', text: 'Arlene Mccoy' },
        { value: '3', text: 'Devon Webb' },
        { value: '4', text: 'Tom Cook' },
        { value: '5', text: 'Tanya Fox' },
        { value: '6', text: 'Hellen Schmidt' },
      ]
      const selectedName = ref([names[2], names[3]])

      return { names, selectedName }
    },
    template: `
    {{selectedName}}
    <LuiMultiSelect v-model="selectedName" :tags="false" searchable :options="names" />
    `,
  }),
}
export const Size: Story = {
  render: () => ({
    components: { LuiMultiSelect },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      const names = [
        { value: '1', text: 'Wade Cooper' },
        { value: '2', text: 'Arlene Mccoy' },
        { value: '3', text: 'Devon Webb' },
        { value: '4', text: 'Tom Cook' },
        { value: '5', text: 'Tanya Fox' },
        { value: '6', text: 'Hellen Schmidt' },
      ]
      const selectedName = ref([names[2], names[3]])

      return { names, selectedName, sizes }
    },
    template: `
    <LuiMultiSelect size="xs" :options="names" />
    <div class="space-y-12 py-12">
      <LuiMultiSelect v-for="size in sizes" :key="size" :size="size" :options="names" />
    </div>
    `,
  }),
}
export const WithSlot: Story = {
  render: () => ({
    components: { LuiMultiSelect, LuiOption },
    setup() {
      // <LuiOption v-for="item in names" :key="item.value" :text="item.text" />
      const names = [
        { value: '1', text: 'Wade Cooper' },
        { value: '2', text: 'Arlene Mccoy' },
        { value: '3', text: 'Devon Webb' },
        { value: '4', text: 'Tom Cook' },
        { value: '5', text: 'Tanya Fox' },
        { value: '6', text: 'Hellen Schmidt' },
      ]
      return { names }
    },
    template: `
    <LuiMultiSelect>
      <LuiOption v-for="item in names" :key="item.value" :text="item.text" />
    </LuiMultiSelect>`,
  }),
}
export const CustomTag: Story = {
  render: () => ({
    components: { LuiMultiSelect, LuiOption },
    setup() {
      // <LuiOption v-for="item in names" :key="item.value" :text="item.text" />
      const tagOptions = {
        color: 'danger',
        filter: 'lighten',
        closeIcon: false,
      }
      const names = [
        { value: '1', text: 'Wade Cooper' },
        { value: '2', text: 'Arlene Mccoy' },
        { value: '3', text: 'Devon Webb' },
        { value: '4', text: 'Tom Cook' },
        { value: '5', text: 'Tanya Fox' },
        { value: '6', text: 'Hellen Schmidt' },
      ]
      return { names, tagOptions }
    },
    template: `
    <LuiMultiSelect :tag-props="tagOptions">
      <LuiOption v-for="item in names" :key="item.value" :text="item.text" />
    </LuiMultiSelect>`,
  }),
}
export const Teleport: Story = {
  render: () => ({
    components: { LuiMultiSelect, LuiOption },
    template: `
    <LuiMultiSelect :teleport="true" :tags="false">
      <LuiOption rounded v-for="item in ['option-1','option-2','option-3']" :key="item" :text="item" />
    </LuiMultiSelect>`,
  }),
}
const withValueTemplate = `
<div>VModel value: {{ selectedCountry }}</div>
<LuiMultiSelect v-model="selectedCountry" :options="countries" />
`
export const WithValue: Story = {
  render: () => ({
    components: { LuiMultiSelect },
    setup() {
      const countries = [{ text: 'Turkey', value: 'TR' }, { text: 'Austria', value: 'AT' }, { text: 'Azerbaijan', value: 'AZ' }, { text: 'Bangladesh', value: 'BD' }]
      const selectedCountry = ref(['AZ'])
      return { countries, selectedCountry }
    },
    template: withValueTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: withValueTemplate,
      },
    },
  },
}
