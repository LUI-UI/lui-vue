<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import LuiDropdown from "./components/Dropdown/LuiDropdown.vue";
import LuiDropdownItem from "./components/Dropdown/LuiDropdownItem.vue";
import LuiButton from "./components/Button/LuiButton.vue";
import LuiIcon from "./components/Icon/LuiIcon.vue";
import LuiTabs from "./components/Tabs/LuiTabs.vue";
import LuiTab from "./components/Tabs/LuiTab.vue";
import LuiSelect from "./components/Select/LuiSelect.vue";
import LuiCheckbox from "./components/Checkbox/LuiCheckbox.vue";
import LuiChip from "./components/Chip/LuiChip.vue";
import LuiLink from "./components/Link/LuiLink.vue";
import LuiLabel from "./components/Label/LuiLabel.vue";
import LuiModal from "./components/Modal/LuiModal.vue";
import LuiAccordionGroup from "./components/Accordion/LuiAccordionGroup.vue";
import LuiAccordion from "./components/Accordion/LuiAccordion.vue";
import LuiRadio from "./components/Radio/LuiRadio.vue";
import LuiCard from "./components/Card/LuiCard.vue";
import NSelect from "./components/NewSelect/NSelect.vue";
import LuiInput from "./components/Input/LuiInput.vue";
import { ref } from "vue";

export default {
  components: {
    LuiButton,
    LuiModal,
    LuiIcon,
    LuiCheckbox,
    LuiAccordionGroup,
    LuiAccordion,
    LuiRadio,
    LuiCard,
    LuiSelect,
    LuiInput,
    NSelect,
    LuiDropdown,
    LuiDropdownItem,
  },
  directives: {
    // "modal-show": {
    //   mounted(el, binding, vnode, prevVnode) {
    //     el.addEventListener("click", () => {
    //       // console.log({el}, {binding}, vnode)
    //       console.log("prevVnode:", prevVnode);
    //       const context = binding.instance;
    //       const modal = context.$refs.modalx;
    //       modal.test = true;
    //       // modal.show = true;
    //       // context.$refs.modalx;
    //       // vnode.context.$refs[binding.value].show = true;
    //       // document.body.style.overflowY = "hidden";
    //     });
    //   },
    // },
  },
  data() {
    return {
      setState: "warning",
      showModal: false,
      price: "year",
      test: "test",
      options: ["option 1", "option 2", "option 3", "option 4"],
      selectedOption: "option 1",
      selectsize: "md",
      // options: [
      //   { text: "Select a city", value: 0, disabled: true },
      //   { text: "Edirne", value: 22 },
      //   { text: "Tekirdag", value: 59 },
      //   { text: "Kırklareli", value: 39 },
      //   { text: "Izmir", value: 35 },
      //   { text: "Mugla", value: 48 },
      // ],
    };
  },
  methods: {
    handleChange(params) {
      console.log("just select a element", params);
    },
    handleSelect(selected) {
      console.log("ay em handlingSelection", selected);
    },
    handleConfirm() {
      console.log("just confirmed..");
    },
    handleCancel() {
      console.log("just cancelled!!..");
      // this.showModal = false;
    },
    handleCheckboxChanged(val) {
      console.log("handleCheckbox!!..", val);
    },
    // handleChange() {
    //   console.log("changed changes checked!!");
    // },
    handleTest(val) {
      console.log("input chancing", val);
    },
  },
};
// const modalActive = ref(false);
// const testOptions = ["Edirne", "Tekirdag", "Kirklarali", "Izmir", "Mugla"];
// const sAppend = {
//   tag: "lui-icon",
//   name: "arrow-down-s",
//   line: true,
// };
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <lui-select :options="options"></lui-select> -->
  <div>tests</div>
  <div class="flex flex-col space-y-4 pl-60">
    <LuiDropdown icon="more-2" @onChange="handleChange">
      <LuiDropdownItem> item 1</LuiDropdownItem>
      <LuiDropdownItem> item 1</LuiDropdownItem>
      <LuiDropdownItem> item 1</LuiDropdownItem>
    </LuiDropdown>
    <LuiDropdown icon="more" @onChange="handleChange">
      <LuiDropdownItem> item 1</LuiDropdownItem>
      <LuiDropdownItem> item 1</LuiDropdownItem>
      <LuiDropdownItem> item 1</LuiDropdownItem>
    </LuiDropdown>
    <LuiDropdown icon="more-2" @onChange="handleChange">
      <LuiDropdownItem> item 1</LuiDropdownItem>
      <LuiDropdownItem> item 1</LuiDropdownItem>
      <LuiDropdownItem> item 1</LuiDropdownItem>
    </LuiDropdown>
    <div class="p-10 bg-danger-50">
      <lui-select multiple :options="['a','b','c','d','e']" />
      <div>selam</div>
    </div>
    <!-- <LuiModal
      :show="true"
      title="title test"
      description="descr test"
      state="danger"
      :show-checkbox="true"
      @onConfirm="handleConfirm"
      @onCancel="handleCancel"
      @onCheckboxChanged="handleCheckboxChanged"
    >
      <div>
        KEndi etrafimda bazen seanki herkes yok oluyor hep buirileri olsa da
        kendi etrafindaaa aaaa a a
      </div>
    </LuiModal> -->
  </div>

  <!-- <div class="p-4 m-4 flex space-x-3">
    <div>
      <label for="sellect" class="mb-1">select an option</label>
      <NSelect
        id="sellect"
        :options="options"
        :state="true"
        :size="selectsize"
        v-model="selectedOption"
        @change="handleSelect"
        description="this is beatiful description"
      />
    </div>
    <span>{{ selectedOption }}</span>
    <select v-model="selectsize">
      <option value="sm">SM</option>
      <option value="md">MD</option>
      <option value="lg">LG</option>
    </select>
  </div> -->
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
