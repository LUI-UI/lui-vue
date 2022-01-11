<template>
  <div>
    <lui-button v-modal-show="'modalx'">TESTMODALTEST</lui-button>
    <lui-modal ref="modalx" horizontal>
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
      <!-- <div>Hey am em content of modal</div>
      <lui-button filter="darker" @click="modalActive = false"
        >darker</lui-button
      > -->
    </lui-modal>
  </div>
</template>

<script>
import LuiModal from "./Modal/LuiModal.vue";
import LuiButton from "./Button/LuiButton.vue";
import LuiCheckbox from "./Checkbox/LuiCheckbox.vue";
import LuiIcon from "./Icon/LuiIcon.vue";
export default {
  components: { LuiModal, LuiButton, LuiCheckbox, LuiIcon },
};
</script>
