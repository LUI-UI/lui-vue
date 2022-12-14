import LuiSelect from "./LuiSelect.vue";
import LuiOption from "./LuiOption.vue";
import { ref } from "vue";

export default {
  title: "LUI/Select",
  component: LuiSelect,
};

export const Default = (args) => ({
  components: { LuiSelect, LuiOption },
  setup() {
    // const names = ["bayhan", "sercan", "serkan", "rahmi", "can"];
    const names = [
      { label: "sercan", value: "1", selected: false, disabled: true },
      { label: "bahyan", value: "2", selected: false },
      {
        label: "serkan uzun uzun yazilar cok uzun yazilar daha da uzun yazi",
        value: "3",
        selected: false,
      },
      { label: "rahmi", value: "4", selected: false },
      { label: "can", value: "5", selected: true },
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
    <div class="p-2">
      SelectedName: {{selectedName}}
    </div>
    <div class="flex space-x-10 h-[1400px]">
      <div>
        <lui-select v-model="selectedName" :options="names">
          <lui-option label="slot option 6" value="6"></lui-option>
          <lui-option v-for="i in 5" :key="i" :label="i + 'okeygoogle'" :value="i" :disabled="i == 1 || i == 2"></lui-option>
          <lui-option label="slot option 7" value="7" disabled></lui-option>
        </lui-select>
      </div>
      <div class="mt-[600px]">
        <lui-select>
          <lui-option label="Second option first item" value="6"></lui-option>
          <lui-option label="Second option 2. item" value="7"></lui-option>
          <lui-option label="Second option 3.. item" value="11"></lui-option>
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
      { label: "bahyan", value: "9" },
      { label: "sercan", value: "10" },
      { label: "serkan", value: "12" },
      { label: "rahmi", value: "4" },
      { label: "can", value: "7" },
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
    const items = ["javascript", "go", "css"];
    const selectedItem = ref(items[1]);
    function handleInp() {
      console.log("handle....");
    }
    return { args, items, selectedItem, handleInp };
  },
  template: `
    <lui-select v-slot="{onClick}" @change="handleInp">
      <lui-option v-for="item in items" :key="item" :id="item" @click="onClick(item)">{{item}}</lui-option>
    </lui-select>
  `,
});
