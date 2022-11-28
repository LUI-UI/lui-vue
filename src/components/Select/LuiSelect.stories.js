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
      { label: "sercan", value: "10", selected: false },
      { label: "bahyan", value: "9", selected: false },
      { label: "serkan", value: "12", selected: false },
      { label: "rahmi", value: "4", selected: false },
      { label: "can", value: "7", selected: false },
    ];
    const selectedName = ref(names[2]);
    function handleChange(option) {
      console.log("selection changed.", option);
      selectedName.value = option;
    }
    function set() {
      selectedName.value = names[0];
      // <lui-option v-for="name in names" :key="name.value" :selected="name.selected" :value="name.value" :label="name.label" />
      // <span v-for="name in names" :key="name.value" class="block" >{{name.label}}</span>
      // <span>ooooo</span>
      // <lui-option>option</lui-option>
      // <span>bbbbb</span>
      // <span>cccc</span>
    }
    return {
      args,
      names,
      selectedName,
      handleChange,
      set,
    };
  },
  template: `
    <button @click="set">set user</button>
    <div class="p-2">
      SelectedName: {{selectedName}}
    </div>
    <lui-select placeholder="select a name">
      <lui-option v-for="name in names" :key="name.value" :selected="name.selected" :value="name.value" :label="name.label" />
    </lui-select>
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
