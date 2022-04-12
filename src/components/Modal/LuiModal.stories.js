import LuiModal from "./LuiModal.vue";
import LuiButton from "../Button/LuiButton.vue";
// import LuiIcon from "../Icon/LuiIcon.vue";
// import LuiCheckbox from "../Checkbox/LuiCheckbox.vue";

export default {
  title: "LuiModal",
  component: LuiModal,
  // args: {
  //   label: 'link',
  // },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // onClick: {},
    state: {
      control: { type: "select" },
      options: ["info", "success", "warning", "danger"],
    },
    vertical: {
      control: { type: "boolean" },
    },
  },
};
import { ref } from "vue";
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiButton,LuiModal },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    let modalActive = ref(false);
    return { args, modalActive };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div>
      <lui-button class="m-24" rounded @click="modalActive = true">open modal</lui-button>
      <lui-modal
        v-bind="args" 
        :show="modalActive"
        title="Information message" 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
        label="Don’t show again"
        @onCancel="modalActive = false" >
      </lui-modal>
    </div>
  `,
});

export const Vertical = Template.bind({});
