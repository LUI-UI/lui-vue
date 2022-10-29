vbase
<script setup lang="ts">
import { computed, reactive } from "vue";
import type { PropType } from "vue";
import { TextSizes, Icon, TextSizesEnum } from "../../global-types";
import { TwClassInterface } from "../../global-interfaces";
import classNames from "classnames";
const props = defineProps({
  size: {
    type: String as PropType<TextSizes>,
    default: "md",
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
        [`ri-${props.icon.name}-fill`]: props.icon.type === "fill",
        [`ri-${props.icon.name}-line`]: props.icon.type === "line",
        [`ri-${props.icon.name}`]:
          props.icon.type !== "fill" && props.icon.type !== "line",
      }
);
iconClasses.fontSize = TextSizesEnum[props.size];
const computedIconClasses = computed(() =>
  classNames(Object.values(iconClasses))
);
</script>
<script lang="ts">
export default {
  name: "LuiIcon",
};
</script>
<template>
  <i :class="computedIconClasses" v-bind="$attrs" />
</template>
