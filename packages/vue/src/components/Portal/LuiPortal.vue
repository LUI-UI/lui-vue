<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, ref } from 'vue'
import { useTeleport } from '../../composables'

const props = defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  isActive: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})
const isMounted = ref(false)
const { teleportTarget } = useTeleport(props.name)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Teleport
    v-if="isMounted && isActive"
    :to="teleportTarget"
    :disabled="!teleportTarget"
  >
    <slot />
  </Teleport>
  <div v-else>
    <slot />
  </div>
</template>
