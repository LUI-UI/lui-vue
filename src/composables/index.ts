import { BackgroundsInterface } from "@/globals/interfaces";
import type { TwClassInterface } from "@/globals/interfaces";
import { State } from "@/globals/types"
import { Color, Filter } from "@/globals/types";
import classNames from "classnames";
import { computed, Ref, toRef, defineEmits } from "vue";

type PropTypes = {
  color: Ref<Color>;
  filter: Ref<Filter>;
};
type DescriptionPropTypes = {
  state: Ref<State>
}
export function useGlobalColorClasses(props: PropTypes) {
  const computedBackgroundColorClasses = computed<BackgroundsInterface>(() => {
    return {
      backgroundColor: classNames({
        [`bg-${props.color.value}-500`]: props.filter.value === "none", // filter none
        [`bg-${props.color.value}-100`]: props.filter.value === "lighten", // filter lighten
        [`bg-${props.color.value}-800`]: props.filter.value === "darken", // filter darken
      }),
    };
  });
  return { backgroundColorClasses: computedBackgroundColorClasses.value };
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
  }
  // return { classes }
}

export function useGlobalDescriptionClasses(props: DescriptionPropTypes, attrs: any) {
  const descriptionClasses = computed(() => {
    const classes: TwClassInterface = {
      fontSize: "text-sm",
      lineHeight: "leading-normal",
      margin: "mt-1",
      textColor:
        attrs.disabled !== undefined && attrs.disabled.value
          ? "text-secondary-200 dark:text-secondary-700"
          : classNames({
            "text-secondary-600 dark:text-secondary-400":
              props.state.value === null,
            "text-warning-500": props.state.value === "warning",
            "text-danger-500": props.state.value === false,
            "text-success-500": props.state.value === true,
          }),
    };
    return classNames(Object.values({ ...classes }));;
  });
  return { descriptionClasses }
}

export function useGlobalCheckbox(props: any) {
  // type ModelValue = string[] | false | true;
  // const emit = defineEmits(["update:modelValue"]);
  let modelValueAsArray = toRef(props, "modelValue");

  const handleVModel = function (e: any) {
    if (typeof props.modelValue === "boolean") {
      // emit("update:modelValue", e.target.checked);
      return e.target.checked
    } else {
      if (e.target.checked) {
        modelValueAsArray.value.push(e.target.value);
      } else {
        const index = modelValueAsArray.value.indexOf(e.target.value);
        modelValueAsArray.value.splice(index, 1);
      }
      // emit("update:modelValue", ...[modelValueAsArray.value]);
      return modelValueAsArray.value
    }
  }

  const isInputChecked = computed(() => {
    return typeof props.modelValue === "boolean"
      ? props.modelValue
      : modelValueAsArray.value.includes(props.value);
  });
  return { handleVModel, isInputChecked }
}
