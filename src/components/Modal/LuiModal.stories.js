import LuiModal from "./LuiModal.vue";
import LuiButton from "../Button/LuiButton.vue";
import LuiIcon from "../Icon/LuiIcon.vue";
import LuiCheckbox from "../Checkbox/LuiCheckbox.vue";

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
    horizontal: {
      control: { type: "boolean" },
    },
    vertical: {
      control: { type: "boolean" },
    },
  },
};
import { ref } from "vue";
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LuiModal, LuiButton, LuiIcon, LuiCheckbox },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    let modalActive = ref(false);
    return { args, modalActive };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div>
      <lui-button class="m-24" rounded @click="modalActive = true">open modal</lui-button>
      <lui-modal v-bind="args" v-if="modalActive">
        <template v-slot:icon>
          <lui-icon name="feedback" line />
        </template>
        <template v-slot:title> Warning message </template>
        <template v-slot:description>
          Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit. Dolor sit amet
        </template>
        <template v-slot:check>
        <lui-checkbox id="show" size="lg" />
          <label for="show">Dont show again</label>
        </template>
        <template v-slot:button>
          <lui-button rounded block @click="modalActive = false">
              Confirm
          </lui-button>
          <lui-button
            type="outline"
            variant="secondary"
            rounded
            block
            @click="modalActive = false"
            >Cancel
          </lui-button>
        </template> 
      </lui-modal>
    </div>
  `,
});

export const Small = Template.bind({});
