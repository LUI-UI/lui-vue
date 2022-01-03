<template>
  <div
    v-show="title == selectedTitle"
    role="tabpanel"
    tabindex="0"
  >
    <slot />
  </div>
</template>
<script>
import { inject } from 'vue'
import * as prop from '../../mixins/props'
export default {
  mixins: [prop.string('title', 'Title'), prop.boolean('active'), prop.boolean('disabled')],
  setup() {
    const selectedTitle = inject('selectedTitle')
    return { selectedTitle }
  },
}
</script>
