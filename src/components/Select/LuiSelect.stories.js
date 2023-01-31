import LuiSelect from "./LuiSelect.vue";
import LuiOption from "./LuiOption.vue";
import { ref } from "vue";
import {
  block,
  rounded,
  size,
  prepend,
  disabled,
  description,
  state,
  stateIcon,
} from "../../../.storybook/global-story-argtypes";
export default {
  title: "LUI/Select",
  component: LuiSelect,
  argTypes: {
    block,
    rounded,
    size,
    prepend,
    disabled,
    description,
    state,
    stateIcon,
  },
};
export const Default = (args) => ({
  components: { LuiSelect, LuiOption },
  setup() {
    // const names = ["bayhan", "sercan", "serkan", "rahmi", "can"];
    const names = [
      { text: "sercan", value: "1", selected: false, disabled: true },
      { text: "bahyan", value: "2", selected: false },
      {
        text: "serkan",
        value: "3",
        selected: false,
      },
      { text: "rahmi", value: "4", selected: false },
      { text: "can", value: "5", selected: true },
    ];
    const selectedName = ref(names[1]);
    let test = ref(1);
    // <lui-option v-for="name in names" :key="name.value" :selected="name.selected" :value="name.value" :label="name.label" />
    // <span v-for="name in names" :key="name.value" class="block" >{{name.label}}</span>
    // <span>ooooo</span>
    // <lui-option>option</lui-option>
    // <span>bbbbb</span>
    // <span>cccc</span>

    return {
      args,
      names,
      selectedName,
      test,
    };
  },
  template: `
    <div class="flex space-x-10 h-[1400px]">
      <div>
        <lui-select v-bind="args" v-model="selectedName" :options="names" />
      </div>
      <div>
        <lui-select>
          <lui-option v-for="i in 5" :key="i" :text="i + 'okeygoogle ve bazi baska kelimeler sen bilir misin bilmem '" :value="i" :disabled="i == 1 || i == 2">
            <template #prepend>
              <i class="ri-home-line"/>
            </template>
            <template #append>
              <i class="ri-home-line"/>
            </template>
          </lui-option>
        </lui-select>
      </div>
      <div class="mt-[600px]">
        <lui-select v-bind="args">
          <lui-option text="Second option first item" value="6"></lui-option>
          <lui-option text="Second option 2. item" value="7"></lui-option>
          <lui-option text="Second option 3.. item" value="11"></lui-option>
        </lui-select>
      </div>
    </div>
  `,
});

////////////////
export const WithObjectArrays = (args) => ({
  components: { LuiSelect },
  setup() {
    const names = [
      { text: "bahyan", value: "9" },
      { text: "sercan", value: "10" },
      { text: "serkan", value: "12" },
      { text: "rahmi", value: "4" },
      { text: "can", value: "7" },
    ];
    const selectedName = ref(names[0]);
    return {
      args,
      names,
      selectedName,
    };
  },
  template: `
    <div class="p-2">
      SelectedName: {{selectedName}}
    </div>
    <lui-select :options="names" v-model="selectedName"/>
  `,
});
export const WithSlot = (args) => ({
  components: { LuiSelect, LuiOption },
  setup() {
    const items = ["javascript", "html", "css", "vuejs"];
    const selectedItem = ref(items[1]);
    return { args, items, selectedItem };
  },
  template: `
    <div class="w-[800px]">
      <lui-select v-bind="args" v-model="selectedItem">
        <lui-option v-for="item in items" :key="item" :id="item" :text="item" />
      </lui-select>
    </div>
  `,
});
export const MaxHeight = (args) => ({
  components: { LuiSelect, LuiOption },
  setup() {
    const cities = [
      "Adana",
      "Adiyaman",
      "Afyon",
      "Agri",
      "Aksaray",
      "Amasya",
      "Ankara",
      "Antalya",
      "Ardahan",
      "Artvin",
      "Aydin",
      "Balikesir",
      "Bartin",
      "Batman",
      "Bayburt",
      "Bilecik",
      "Bingol",
      "Bitlis",
      "Bolu",
      "Burdur",
      "Bursa",
      "Canakkale",
      "Cankiri",
      "Corum",
      "Denizli",
      "Diyarbakir",
      "Duzce",
      "Edirne",
      "Elazig",
      "Erzincan",
      "Erzurum",
      "Eskisehir",
      "Gaziantep",
      "Giresun",
      "Gumushane",
      "Hakkari",
      "Hatay",
      "Igdir",
      "Isparta",
      "Istanbul",
      "Izmir",
      "Kahramanmaras",
      "Karabuk",
      "Karaman",
      "Kars",
      "Kastamonu",
      "Kayseri",
      "Kilis",
      "Kirikkale",
      "Kirklareli",
      "Kirsehir",
      "Kocaeli",
      "Konya",
      "Kutahya",
      "Malatya",
      "Manisa",
      "Mardin",
      "Mersin",
      "Mugla",
      "Mus",
      "Nevsehir",
      "Nigde",
      "Ordu",
      "Osmaniye",
      "Rize",
      "Sakarya",
      "Samsun",
      "Sanliurfa",
      "Siirt",
      "Sinop",
      "Sirnak",
      "Sivas",
      "Tekirdag",
      "Tokat",
      "Trabzon",
      "Tunceli",
      "Usak",
      "Van",
      "Yalova",
      "Yozgat",
      "Zonguldak",
    ];
    const selectedCity = ref(cities[0]);
    return { args, cities, selectedCity };
  },
  template: `
    
      <lui-select v-bind="args" v-model="selectedItem" :options="cities" size="xl" />
  `,
});
