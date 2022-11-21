import {
  BackgroundsInterface,
  BordersInterface,
  SpacingInterface,
  TypographyInterface,
} from "@/globals/interfaces";
import type { Border, Color, Filter, Variant } from "@/globals/types";
import { State } from "@/globals/types";
import { computed, Ref, toRef, useSlots } from "vue";

type PropTypes = {
  color: Ref<Color>;
  filter: Ref<Filter>;
  variant: Ref<Variant>;
  border: Ref<Border>;
};
type DescriptionPropTypes = {
  state: Ref<State>;
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

export function useGlobalHiddenInputClasses() {
  return {
    position: "absolute",
    overflow: "overflow-hidden",
    outlineStyle: "outline-none",
    cursor: "disabled:cursor-not-allowed",
    borderWidth: "border-0",
    opacity: "opacity-0",
    zIndex: "z-10",
    peer: "peer",
  };
  // return { classes }
}

export function useGlobalDescriptionClasses(
  props: DescriptionPropTypes,
  attrs: any
) {
  const descriptionClasses = computed(() => {
    const classes: TypographyInterface | SpacingInterface = {
      fontSize: "text-sm",
      lineHeight: "leading-normal",
      margin: "mt-1",
      textColor:
        attrs.disabled !== undefined && attrs.disabled.value
          ? "text-secondary-200 dark:text-secondary-700"
          : {
            "text-secondary-600 dark:text-secondary-400":
              props.state.value === null,
            "text-warning-500": props.state.value === "warning",
            "text-danger-500": props.state.value === false,
            "text-success-500": props.state.value === true,
          },
    };
    return Object.values({ ...classes });
  });
  return { descriptionClasses };
}

export function useGlobalCheckbox(props: any, attrs: any) {
  const modelValueAsArray = toRef(props, "modelValue");
  const handleVModel = function (e: any) {
    if (typeof props.modelValue === "boolean" || props.modelValue === undefined) return e.target.checked;
    if (e.target.checked) {
      modelValueAsArray.value.push(e.target.value);
    } else {
      const index = modelValueAsArray.value.indexOf(e.target.value);
      modelValueAsArray.value.splice(index, 1);
    }
    return modelValueAsArray.value;
  };

  const isInputChecked = computed(() => {
    return props.modelValue === undefined ? attrs.checked !== undefined
      ? attrs.checked
      : false
      : typeof props.modelValue === "boolean"
        ? props.modelValue
        : modelValueAsArray.value.includes(props.value)
  });
  return { handleVModel, isInputChecked };
}
