<script setup>
const showModal = ref(false)
// const test = document.getElementsByTagName("body");
// console.log('test:', test);
</script>

<template>
  <div>
    <button @click="showModal = true">
      open modal
    </button>
    {{ showModal }}
    <LuiModal :show="showModal">
      <div>ModalContent</div>
    </LuiModal>
    <LuiButton>Button</LuiButton>
  </div>
</template>
