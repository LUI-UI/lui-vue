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
    handleSelect(selected) {
      console.log("selected option", selected);
    },
    handleConfirm() {
      console.log("just confirmed..");
    },
    handleCancel() {
      console.log("just cancelled!!..");
      this.showModal = false;
    },
    handleCheckbox(val) {
      console.log("handleCheckbox!!..", val);
    },
    handleChange() {
      console.log("changed changes checked!!");
    },
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
  <div class="flex space-x-3">
    <lui-input placeholder="heytes!SM" size="sm" />
    <lui-input placeholder="heytes!MD" size="md" />
    <lui-input placeholder="heytes!LG" size="lg" />
  </div>

  <select id="">
    <option value="1">One</option>
    <option value="1">Two</option>
    <option value="1">Three</option>
    <option value="1">Four</option>
  </select>
  <div class="p-4 m-4 flex space-x-3">
    <NSelect
      :options="options"
      size="lg"
      v-model="selectedOption"
      @onSelect="handleSelect"
    />
    <span>{{ selectedOption }}</span>
    <!-- <NSelect :options="options" /> -->
  </div>

  <div class="p-24 bg-danger-50">
    <lui-button variant="white" rounded>white</lui-button>
    <lui-button class="mx-4" disabled>default</lui-button>
    <lui-button filter="lighter">lighter</lui-button>
    <hr class="my-12" />
    <lui-button type="outline">darker</lui-button>
    <lui-button type="outline" class="mx-4" filter="darker">darker</lui-button>
    <lui-button type="outline" filter="lighter">lighter</lui-button>
    <!-- <LuiCard img="https://via.placeholder.com/300" rounded class="my-12">
      <h3>Card test!</h3>
    </LuiCard> -->
    <lui-button type="outline" class="mr-2">default</lui-button>
    <lui-modal
      :show="showModal"
      :state="setState"
      title="Warning test"
      description="lorem ipsum test falan"
      label="custom label"
      @onConfirm="handleConfirm"
      @onCancel="handleCancel"
      @onCheckboxChanged="handleCheckbox"
    />

    <!-- <mtest ref="mtest" /> -->
    <!-- <lui-modal ref="modalx" horizontal>
      <template v-slot:icon>
        <lui-icon name="feedback" line />
      </template>
      <template v-slot:title> Warning message </template>
      <template v-slot:description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor sit amet
      </template>
      <template v-slot:check>
        <lui-checkbox id="test" size="lg" />
        <label for="test">Dont show again</label>
      </template>
      <template v-slot:button>
        <lui-button
          type="outline"
          variant="secondary"
          rounded
          block
          @click="modalActive = false"
          >Cancel</lui-button
        >
        <lui-button rounded block>Confirm</lui-button>
      </template>
      <div>Hey am em content of modal</div>
      <lui-button filter="darker" @click="modalActive = false"
        >darker</lui-button
      > 
    </lui-modal> -->
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
