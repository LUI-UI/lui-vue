<script setup>
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

const options = [
  { text: "Select a city", value: 0, disabled: true },
  { text: "Edirne", value: 22 },
  { text: "Tekirdag", value: 59 },
  { text: "Kırklareli", value: 39 },
  { text: "Izmir", value: 35 },
  { text: "Mugla", value: 48 },
];

const testOptions = ["Edirne", "Tekirdag", "Kirklarali", "Izmir", "Mugla"];
const sAppend = {
  tag: "lui-icon",
  name: "arrow-down-s",
  line: true,
};

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="p-24">
    <lui-link>extarnel link</lui-link>
    <lui-checkbox>test</lui-checkbox>
    <span>span!</span>
    <lui-label>label tesrts</lui-label>
    <label for="tt">LABEL</label>
  </div>
  <!-- <div class="p-14">
    <lui-dropdown text="dropdown" placement="topRight" @onChange="handleDDChanges">
      <lui-dropdown-item>item1</lui-dropdown-item>
      <lui-dropdown-item>item1</lui-dropdown-item>
      <lui-dropdown-item>item1</lui-dropdown-item>
    </lui-dropdown>
    <hr class="my-4" />
    <lui-button icon="home">test</lui-button>
    <hr class="my-4" />
    <lui-tabs>
      <lui-tab title="tab1">tabC1</lui-tab>
      <lui-tab title="tab2">tabC2</lui-tab>
      <lui-tab title="tab3">tabC3</lui-tab>
      <lui-tab title="tab4">tabC4</lui-tab>
    </lui-tabs>
    <hr class="my-4" />
    <lui-select 
      :options="options" 
      size="md" 
      multiple 
      :selectAppend="sAppend" 
      :optionPrepend="sAppend" 
    />
    <hr class="my-4" />
    <lui-checkbox size="sm" />
    <hr class="my-4" />
    <lui-chip icon="home" size="lg" :iconLine="false">Chip</lui-chip>
    <hr class="my-8" />
    <lui-select :options="options" multiple textField="text" />
    <hr class="my-8" />
    <lui-link to="/About" tag="vue">this is link</lui-link>
  </div> -->
  <!-- <div class="text-danger-600">hehey</div>  -->
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
