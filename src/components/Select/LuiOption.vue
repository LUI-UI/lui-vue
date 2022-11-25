<script lang="ts">
export default {
  name: "LuiOption",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
// const props = defineProps({
// selected,disabled,value
// console.log(props);
</script>
<template>
  <li
    role="option"
    tabindex="0"
    v-bind="$attrs"
    aria-selected="true"
    class="focus:border border-danger-500"
  >
    <span><slot /></span>
  </li>
</template>
