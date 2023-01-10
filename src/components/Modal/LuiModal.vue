<script lang="ts">
export default {
  name: "LuiRadio",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useId } from "../../utils/useId";
import useFocusTrap from "../../composables/useFocusTrap";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);
console.log(props);
const teleportId = `lui-modal-teleport-${useId()}`;
const { trapRef } = useFocusTrap();

function createTeleportElement() {
  const body = document.getElementsByTagName("body");
  const teleportWrapper = document.createElement("div");
  teleportWrapper.setAttribute("id", teleportId);
  body[0].appendChild(teleportWrapper);
}
createTeleportElement();
</script>
<template>
  <Teleport :to="`#${teleportId}`">
    <div
      v-if="show"
      ref="trapRef"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div
        role="dialog"
        id="dialog1"
        aria-labelledby="dialog1_label"
        aria-modal="true"
        class="bg-white px-10 py-8 rounded max-w-[400px]"
      >
        <h1 id="dialog1_label">dialog content</h1>
        <input placeholder="input 1" />
        <input placeholder="input 2" />
        <input placeholder="input 3" />
        <div class="flex items-center space-x-4">
          <button @click="emit('close')">Accept</button>
          <button @click="emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
