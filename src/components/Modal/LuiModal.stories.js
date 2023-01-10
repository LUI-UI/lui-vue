import LuiModal from "./LuiModal.vue";
import { ref } from "vue";

export default {
  title: "LUI/Modal",
  components: { LuiModal },
};

const DefaultTemplate = (args) => ({
  components: { LuiModal },
  setup() {
    let showModal = ref(false);
    return { args, showModal };
  },
  template: `
    <button @click="showModal = true">open modal</button>
    <lui-modal :show="showModal" @close="showModal = false"></lui-modal>
  `,
});
export const Default = DefaultTemplate.bind({});
