<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import LuiButtonVue from "./components/Button/LuiButton.vue";
import LuiIcon from "./components/Icon/LuiIcon.vue";
</script>

<template>
  <div>
    <svg class="remix">
      <use
        xlink:href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.symbol.svg/remixicon.symbol.svg#ri-admin-fill"
      ></use>
    </svg>
    <div class="p-3 m-3 flex justify-center space-x-5">
      <LuiIcon :icon="{ name: 'search', type: 'fill' }" size="xl"></LuiIcon>
      <LuiButtonVue variant="outline" filter="darken">Test</LuiButtonVue>
    </div>
    <div class="p-3 m-3 justify-center bg-gray-100 space-x-5">
      <LuiButtonVue
        variant="solid"
        color="primary"
        rounded="full"
        filter="lighten"
        >Test</LuiButtonVue
      >
      <LuiButtonVue variant="solid" color="primary" filter="darken"
        >Test</LuiButtonVue
      >
      <LuiButtonVue size="sm" color="primary">sM</LuiButtonVue>
      <LuiButtonVue size="md" color="primary">MD</LuiButtonVue>
      <LuiButtonVue size="lg" color="primary">LG</LuiButtonVue>
    </div>
    <div class="p-3 m-3 justify-center bg-primary-900 space-x-5">
      <LuiButtonVue variant="text" filter="lighten" color="primary"
        >Test</LuiButtonVue
      >
      <LuiButtonVue variant="link" color="primary">Test</LuiButtonVue>
      <LuiButtonVue size="sm" color="primary" filter="lighten">sM</LuiButtonVue>
      <LuiButtonVue size="md" color="primary" filter="darken">MD</LuiButtonVue>
      <LuiButtonVue size="lg" color="primary">LG</LuiButtonVue>
    </div>
    <div class="p-3 m-3 justify-center bg-warning-800 space-x-5">
      <LuiButtonVue variant="text" color="danger">Test</LuiButtonVue>
      <LuiButtonVue variant="link" color="danger">Test</LuiButtonVue>
      <LuiButtonVue size="sm" color="danger">sM</LuiButtonVue>
      <LuiButtonVue size="md" color="danger">MD</LuiButtonVue>
      <LuiButtonVue size="lg" color="danger">LG</LuiButtonVue>
    </div>
    <div class="p-3 m-3 justify-center bg-success-800 space-x-5">
      <LuiButtonVue variant="text" color="secondary">Test</LuiButtonVue>
      <LuiButtonVue variant="link" color="secondary">Test</LuiButtonVue>
      <LuiButtonVue size="sm" color="secondary">sM</LuiButtonVue>
      <LuiButtonVue size="md" color="secondary">MD</LuiButtonVue>
      <LuiButtonVue size="lg" color="secondary">LG</LuiButtonVue>
    </div>
    <div class="p-3 m-3 justify-center bg-danger-800 space-x-5">
      <LuiButtonVue variant="text" color="primary">Test</LuiButtonVue>
      <LuiButtonVue variant="link" color="primary">Test</LuiButtonVue>
      <LuiButtonVue size="sm" color="primary">sM</LuiButtonVue>
      <LuiButtonVue size="md" color="primary">MD</LuiButtonVue>
      <LuiButtonVue size="lg" color="primary">LG</LuiButtonVue>
    </div>
  </div>
</template>
