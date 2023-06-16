import LuiMultiSelect from './LuiMultiSelect.vue'
import LuiOption from '../Select/LuiOption.vue'

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
const meta: Meta<typeof LuiMultiSelect> = {
  title: 'LUI/MultiSelect',
  component: LuiMultiSelect
}
export default meta

type Story = StoryObj<typeof LuiMultiSelect>

export const Default: Story = {
  render: () => ({
    components: { LuiMultiSelect },
    setup() {
      const names = [
        { value: 1, text: 'Wade Cooper' },
        { value: 2, text: 'Arlene Mccoy' },
        { value: 3, text: 'Devon Webb' },
        { value: 4, text: 'Tom Cook' },
        { value: 5, text: 'Tanya Fox' },
        { value: 6, text: 'Hellen Schmidt' }
      ]
      const selectedName = ref([names[2], names[3]])

      return { names, selectedName }
    },
    template: `
    {{selectedName}}
    <LuiMultiSelect v-model="selectedName" disabled :tags="false" searchable :options="names" />
    `
  })
}
export const Test: Story = {
  render: () => ({
    components: { LuiMultiSelect },
    setup() {
      const cities = [
        'Adana',
        'Adiyaman',
        'Afyon',
        'Agri',
        'Aksaray',
        'Amasya',
        'Ankara',
        'Antalya',
        'Ardahan',
        'Artvin',
        'Aydin',
        'Balikesir',
        'Bartin',
        'Batman',
        'Bayburt',
        'Bilecik',
        'Bingol',
        'Bitlis',
        'Bolu',
        'Burdur',
        'Bursa',
        'Canakkale',
        'Cankiri',
        'Corum',
        'Denizli',
        'Diyarbakir',
        'Duzce',
        'Edirne',
        'Elazig',
        'Erzincan',
        'Erzurum',
        'Eskisehir',
        'Gaziantep',
        'Giresun',
        'Gumushane',
        'Hakkari',
        'Hatay',
        'Igdir',
        'Isparta',
        'Istanbul',
        'Izmir',
        'Kahramanmaras',
        'Karabuk',
        'Karaman',
        'Kars',
        'Kastamonu',
        'Kayseri',
        'Kilis',
        'Kirikkale',
        'Kirklareli',
        'Kirsehir',
        'Kocaeli',
        'Konya',
        'Kutahya',
        'Malatya',
        'Manisa',
        'Mardin',
        'Mersin',
        'Mugla',
        'Mus',
        'Nevsehir',
        'Nigde',
        'Ordu',
        'Osmaniye',
        'Rize',
        'Sakarya',
        'Samsun',
        'Sanliurfa',
        'Siirt',
        'Sinop',
        'Sirnak',
        'Sivas',
        'Tekirdag',
        'Tokat',
        'Trabzon',
        'Tunceli',
        'Usak',
        'Van',
        'Yalova',
        'Yozgat',
        'Zonguldak'
      ]
      const selectedCities = ref([cities[0]])

      return { cities, selectedCities }
    },
    template: `
    {{selectedCities}}
    <LuiMultiSelect searchable v-model="selectedCities" :tags="false" :options="cities" />
    `
  })
}
export const WithSlot: Story = {
  render: () => ({
    components: { LuiMultiSelect, LuiOption },
    setup() {
      // <LuiOption v-for="item in names" :key="item.value" :text="item.text" />
      const names = [
        { value: 1, text: 'Wade Cooper' },
        { value: 2, text: 'Arlene Mccoy' },
        { value: 3, text: 'Devon Webb' },
        { value: 4, text: 'Tom Cook' },
        { value: 5, text: 'Tanya Fox' },
        { value: 6, text: 'Hellen Schmidt' }
      ]
      return { names }
    },
    template: `
    <LuiMultiSelect>
      <LuiOption v-for="item in names" :key="item.value" :text="item.text" />
    </LuiMultiSelect>`
  })
}
