import LuiTabs from "./LuiTabs.vue";
import LuiTab from "./LuiTab.vue";
import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import LuiBadge from "../Badge/LuiBadge.vue";
import LuiTabGroup from "./LuiTabGroup.vue";
import LuiTabButtons from "./LuiTabButtons.vue";
import LuiTabButton from "./LuiTabButton.vue";
import LuiTabPanels from "./LuiTabPanels.vue";
import LuiTabPanel from "./LuiTabPanel.vue";
import { ref } from "vue";
export default {
  title: "LUI/Tab",
  component: LuiTabs,
  argTypes: {
    alignTabs: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    alignContent: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    stretch: {
      control: { type: "boolean" },
      // options: ["left", "center", "right"],
    },
  },
};
export const NewTemplate = (args) => ({
  components: {
    LuiTabGroup,
    LuiTabButtons,
    LuiTabButton,
    LuiTabPanels,
    LuiTabPanel,
  },
  setup() {
    return { args };
  },
  template: `
  <lui-tab-group>
    <lui-tab-buttons>
      <lui-tab-button>tab-1</lui-tab-button>
      <lui-tab-button>tab-2</lui-tab-button>
      <lui-tab-button>tab-3</lui-tab-button>
    </lui-tab-buttons>
    <lui-tab-panels>
      <lui-tab-panel>Panel-1</lui-tab-panel>
      <lui-tab-panel>Panel-2</lui-tab-panel>
      <lui-tab-panel>Panel-3</lui-tab-panel>
    </lui-tab-panels>
  </lui-tab-group>`,
});
export const Default = (args) => ({
  components: {
    LuiTabs,
    LuiTab,
    LuiMenuItem,
  },
  setup() {
    const activeTab = ref("Title-2");
    return { args, activeTab };
  },
  template: `
    <lui-tabs v-bind="args" v-model="activeTab">
      <lui-tab title="Title-1">
        <template #prepend>
          <i class="ri-home-line"/>
        </template>
        Tab content 1
      </lui-tab>
      <lui-tab title="Title-2">
        <template #prepend>
          <i class="ri-eye-line"/>
        </template>
      Tab content 2</lui-tab>
      <lui-tab title="Title-3">
        <template #append>
          <LuiBadge color="danger" />
        </template>
        Tab content 3
      </lui-tab>
      <lui-tab title="Title-4" disabled>Tab content 4</lui-tab>
    </lui-tabs>  
  `,
});
export const WithIcons = (args) => ({
  components: {
    LuiTabs,
    LuiTab,
    LuiBadge,
  },
  setup() {
    return { args };
  },
  template: `
    <lui-badge color="danger" />
    <lui-tabs v-bind="args">
      <lui-tab-button>
        
      </lui-tab-button>
      <lui-tab title="Title-1">
        <template #prepend>
          <lui-badge color="danger" />
        </template>
        Tab content 1
      </lui-tab>
      <lui-tab title="Title-2">      
        Tab content 2
      </lui-tab>
      <lui-tab title="Title-3">Tab content 3</lui-tab>
      <lui-tab title="Title-4" disabled>Tab content 4</lui-tab>
    </lui-tabs>  
  `,
});

// EXAMPLE HTML TEMPLATE

// <div class="tabs-wrapper">
//   <div role="tablist">
//     <button
//       id="tab-1"
//       type="button"
//       role="tab"
//       aria-selected="true"
//       aria-controls="tabpanel-1"
//       tabindex="0"
//     >
//       <span class="focus"> Maria Ahlefeldt </span>
//     </button>
//     <button
//       id="tab-2"
//       type="button"
//       role="tab"
//       aria-selected="false"
//       aria-controls="tabpanel-2"
//       tabindex="-1"
//     >
//       <span class="focus"> Carl Andersen </span>
//     </button>
//   </div>
//   <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
//     <p>
//       Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was a
//       Danish, (originally German), composer. She is known as the first female
//       composer in Denmark. Maria Theresia composed music for several ballets,
//       operas, and plays of the royal theatre. She was given good critic as a
//       composer and described as a “
//       <span lang="da"> virkelig Tonekunstnerinde </span>
//       ” ('a True Artist of Music').
//     </p>
//   </div>
// </div>
