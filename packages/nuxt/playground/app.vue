<script setup>
</script>

<template>
  <header class="flex items-center">
    <nuxt-link to="/">
      Home
    </nuxt-link>
    <nuxt-link to="/about">
      About
    </nuxt-link>
    <lui-popover text="popover">
      <div class="popover-content">
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit.</p>
      </div>
    </lui-popover>
  </header>
  <div>
    <NuxtPage />
  </div>
</template>

<style scoped>
  .popover-content {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
