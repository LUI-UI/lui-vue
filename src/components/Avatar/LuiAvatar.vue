<script setup lang="ts">
import type {
  Variant,
  Filter,
  Rounded,
  Icon,
  Color,
  Size,
  Border,
} from "@/globals/types";
import { PropType } from "vue";
import LuiBadge from "../Badge/LuiBadge.vue";
const props = defineProps({
  color: {
    type: String as PropType<Color>,
    default: "primary",
  },
  filter: {
    type: String as PropType<Filter>,
    default: "none",
  },
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  border: {
    type: Boolean as PropType<Border>,
    default: false,
  }, // Ne yapılacak karar verelim
});
</script>
<template>
  <div class="lui-avatar"><slot></slot></div>

<LuiBadge position="">

</LuiBadge>
</template>

<script lang="ts">
export default {
    name: "LuiAvatar",
    inheritAttrs: false,
    components: { LuiBadge }
};
</script>
