<script lang="ts">
export default {
  name: "LuiDropdownItem",
  inheritAttrs: false,
};
</script>

<template>
  <li
    role="none"
    tabindex="0"
    v-bind="$attrs"
    class="p-2 rounded hover:bg-primary-100 focus:outline focus:outline-primary-500"
  >
    <a role="menuitem">
      <slot />
    </a>
  </li>
</template>
