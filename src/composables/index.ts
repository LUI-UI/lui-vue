import {
  BackgroundsInterface,
  BordersInterface,
  TypographyInterface,
} from "@/globals/interfaces";
import type { Border, Color, Filter, Variant } from "@/globals/types";
import { computed, Ref } from "vue";

type PropTypes = {
  color: Ref<Color>;
  filter: Ref<Filter>;
  variant: Ref<Variant>;
  border: Ref<Border>;
};
export function useGlobalColorClasses(props: PropTypes) {
  const computedBackgroundColorClasses = computed<BackgroundsInterface>(() => {
    return {
      backgroundColor:
        props.variant.value === "solid"
          ? {
              [`bg-${props.color.value}-500`]: props.filter.value === "none", // filter none
              [`bg-${props.color.value}-100`]: props.filter.value === "lighten", // filter lighten
              [`bg-${props.color.value}-800`]: props.filter.value === "darken", // filter darken
            }
          : null,
    };
  });
  const computedTextColorClasses = computed<TypographyInterface>(() => {
    return {
      textColor:
        props.variant.value === "solid"
          ? {
              [`text-white`]: props.filter.value === "none", // filter none
              [`text-${props.color.value}-500`]:
                props.filter.value === "lighten", // filter lighten
              [`text-${props.color.value}-100`]:
                props.filter.value === "darken", // filter darken
            }
          : {
              [`text-${props.color.value}-500`]: props.filter.value === "none", // filter none
              [`text-${props.color.value}-100`]:
                props.filter.value === "lighten", // filter lighten
              [`text-${props.color.value}-800`]:
                props.filter.value === "darken", // filter darken
            },
    };
  });
  const computedBorderColorClasses = computed<BordersInterface>(() => {
    return {
      borderColor:
        props.variant.value === "outline"
          ? {
              [`border-${props.color.value}-500`]:
                props.filter.value === "none", // filter none
              [`border-${props.color.value}-100`]:
                props.filter.value === "lighten", // filter lighten
              [`border-${props.color.value}-800`]:
                props.filter.value === "darken", // filter darken
            }
          : props.border.value
          ? {
              [`border-white`]: props.filter.value === "none", // filter none
              [`border-${props.color.value}-500`]:
                props.filter.value === "lighten", // filter lighten
              [`border-${props.color.value}-100`]:
                props.filter.value === "darken", // filter darken
            }
          : "border-transparent",
    };
  });
  return {
    backgroundColorClasses: computedBackgroundColorClasses.value,
    textColorClasses: computedTextColorClasses.value,
    borderColorClasses: computedBorderColorClasses.value,
  };
}
