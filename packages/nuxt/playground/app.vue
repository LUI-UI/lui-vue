<script setup>
const showModal = ref(false)
// const test = document.getElementsByTagName("body");
// console.log('test:', test);
</script>

<template>
  <div class="test">
    <button @click="showModal = true">
      open modal
    </button>
    {{ showModal }}
    <LuiModal :show="showModal" @close="showModal = false">
      <div>ModalContent</div>
    </LuiModal>
    <LuiButton>Button</LuiButton>
  </div>
</template>

<style>
.test {
  min-height: 2000px;
}
</style>
