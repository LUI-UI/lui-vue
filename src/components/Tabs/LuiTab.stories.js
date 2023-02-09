import LuiTabs from "./LuiTabs.vue";
import LuiTab from "./LuiTab.vue";
import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import { ref } from "vue";
export default {
  title: "LUI/Tab",
  component: LuiTabs,
};

export const Default = (args) => ({
  components: {
    LuiTabs,
    LuiTab,
    LuiMenuItem,
  },
  setup() {
    const isTabActive = ref(false);
    return { args, isTabActive };
  },
  template: `    
    <lui-tabs>
      <lui-tab title="Title-1">Tab content 1</lui-tab>
      <lui-tab title="Title-2">Tab content 2</lui-tab>
      <lui-tab :title="isTabActive ? 'New-Title' : 'Title-3'">Tab content 3</lui-tab>
      <lui-tab title="Title-4" disabled>Tab content 4</lui-tab>
    </lui-tabs> 

  `,
});
// <div class="mt-4 flex">
//   <div class="relative after:w-full after:h-0.5 after:absolute after:-bottom-2 after:left-0 after:inline-block after:rounded-full after:bg-transparent text-primary-500">
//     <LuiMenuItem>menu item 1</LuiMenuItem>
//   </div>
//   <div class="relative after:w-full after:h-0.5 after:absolute after:left-0 after:inline-block after:rounded-full after:bg-transparent text-primary-500 after:bg-primary-500">
//     <LuiMenuItem>menu item 2</LuiMenuItem>
//   </div>
//   <div class="relative after:w-full after:h-0.5 after:absolute after:-bottom-2 after:left-0 after:inline-block after:rounded-full after:bg-transparent text-primary-500">
//     <LuiMenuItem>menu item 3</LuiMenuItem>
//   </div>
// </div>
