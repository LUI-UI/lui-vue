import LuiModal from "./LuiModal.vue";
import { ref } from "vue";
import { size } from "../../../.storybook/global-story-argtypes";
import LuiButton from "../Button/LuiButton.vue";
export default {
  title: "LUI/Modal",
  components: { LuiModal },
  argTypes: {
    size,
  },
};

const DefaultTemplate = (args) => ({
  components: { LuiModal, LuiButton },
  setup() {
    let showModal = ref(true);
    return { args, showModal };
  },
  template: `
    <button @click="showModal = true">open modal</button>
    <lui-modal :show="showModal" v-bind="args" @close="showModal = false">
      <div class="w-full">
        <h2 class="text-xl font-bold mb-4">Information message</h2>
        <p class="mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div class="flex space-x-3 ml-auto">
          <lui-button rounded color="primary">Confirm</lui-button>
          <lui-button rounded color="secondary">Cancel</lui-button>
        </div>
      </div>
    </lui-modal>
  `,
});
export const Default = DefaultTemplate.bind({});
Default.args = { size: "sm" };
