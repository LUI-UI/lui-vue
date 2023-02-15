<script lang="ts">
export default {
  name: "LuiTabPanel",
};
</script>
<script setup lang="ts"></script>
<template>
  <div id="panelId" role="tabpanel" tabindex="0" aria-labelledby="activeTabId">
    <slot />
  </div>
  <!-- <div
    v-if="title == injection?.selectedTab?.value?.title"
    :id="injection?.selectedTab?.value?.panelId"
    role="tabpanel"
    tabindex="0"
    :aria-labelledby="injection?.selectedTab?.value?.tabId"
    class="computedClasses.panel"
  >
    <slot />
  </div> -->
</template>
