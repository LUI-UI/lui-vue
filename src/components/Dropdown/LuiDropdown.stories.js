import LuiDropdown from "./LuiDropdown.vue";
import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import {
  variant,
  color,
  block,
  rounded,
  size,
  filter,
  disabled,
} from "../../../.storybook/global-story-argtypes";

export default {
  title: "LUI/Dropdown",
  component: LuiDropdown,
  argTypes: {
    variant,
    color,
    block,
    rounded,
    size,
    filter,
    disabled,
    menuPosition: {
      control: "select",
      options: [
        "bottomLeft",
        "bottomRight",
        "topLeft",
        "topRight",
        "leftTop",
        "leftBottom",
        "rightTop",
        "rightBottom",
      ],
    },
    onOnTrigger: {
      action: "menu triggered",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // args: {}, set default args for all components
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiDropdown, LuiMenuItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const dditems = ["edit", "duplicate", "archive", "move", "delete"];
    function selectItem(option) {
      console.log("selected option is: ", option);
      //..
    }
    return { args, selectItem, dditems };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  // <lui-checkbox v-bind="args" v-model="test" />
  template: `
    <div class="h-[1400px] pl-12">
      <lui-dropdown v-bind="args">
        <template v-slot:trigger="slotProps">
          <button v-bind="slotProps">new button</button>
        </template>
        <lui-menu-item v-for="(item,i) in dditems" :key="i" @click="selectItem(i)">
          {{item}}
        </lui-menu-item>
      </lui-dropdown>   
      <div class="mt-[150px]">
        <lui-dropdown v-bind="args">
          <template #triggerPrepend>
            <i class="ri-donut-chart-line"></i>
          </template>
          <template #triggerAppend>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M11 2.05v2.012C7.054 4.554 4 7.92 4 12c0 4.418 3.582 8 8 8 1.849 0 3.55-.627 4.906-1.68l1.423 1.423C16.605 21.153 14.4 22 12 22 6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9-9.95zM21.95 13c-.2 2.011-.994 3.847-2.207 5.328l-1.423-1.422c.86-1.107 1.436-2.445 1.618-3.906h2.013zM13.002 2.05c4.724.469 8.48 4.226 8.95 8.95h-2.013c-.451-3.618-3.319-6.486-6.937-6.938V2.049z"/></svg>
          </template>
          <lui-menu-item>
            lui-menu-item-test
          </lui-menu-item>
        </lui-dropdown>    
      </div> 
      <div class="mt-[450px]">
        <lui-dropdown v-bind="args">
          <lui-menu-item v-for="i in 7" :key="i" @click="selectItem(i)">
            lui-menu-item-{{ i }}
          </lui-menu-item>
        </lui-dropdown>    
      </div> 
    </div>
    `,
});

export const Medium = Template.bind({});
Medium.args = { text: "Dropdown" };
export const Options = Template.bind({});
Options.args = { text: "Dropdown", options: ["test", "just", "mkl"] };
