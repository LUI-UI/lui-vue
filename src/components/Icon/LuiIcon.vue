<script lang="ts">
export default {
  name: "LuiIcon",
};
</script>
<script setup lang="ts">
import { computed, reactive } from "vue";
import type { PropType } from "vue";
import type { Icon } from "../../global-types";
import { TwClassInterface } from "../../global-interfaces";
import { IconSizeEnum } from "../../global-enum";
import type { IconSizes } from "./icon-types";
import classNames from "classnames";
const props = defineProps({
  size: {
    type: String as PropType<IconSizes>,
    default: "none",
  },
  icon: {
    type: [String, Object] as PropType<Icon>,
    required: true,
  },
});
interface RemixIconClasses extends TwClassInterface {
  svgClasses: string;
}

const iconClasses: RemixIconClasses = reactive({ svgClasses: "" });
iconClasses.svgClasses = classNames(
  typeof props.icon === "string"
    ? `ri-${props.icon}-line`
    : {
        [`ri-${props.icon.name}`]:
          props.icon.type !== "fill" && props.icon.type !== "line",
        [`ri-${props.icon.name}-fill`]: props.icon.type === "fill",
        [`ri-${props.icon.name}-line`]: props.icon.type === "line",
      }
);
iconClasses.fontSize = classNames({
  [IconSizeEnum[props.size]]: props.size !== "none",
});
const computedIconClasses = computed(() => {
  console.log(iconClasses);
  return classNames(Object.values(iconClasses));
});
</script>

<template>
  <i :class="computedIconClasses" />
</template>
