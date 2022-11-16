import { computed } from "vue";
import type { Ref } from "vue";
import { Rounded, Size, State, Description } from "@/globals/types";
import type { TwClassInterface } from "@/globals/interfaces";
import { useGlobalHiddenInputClasses } from "../../../composables/index"
import classNames from "classnames";

type PropTypes = {
  size: Ref<Size>;
  rounded: Ref<Rounded>;
  state: Ref<State>;
  description: Ref<Description>;
};


export function useSwitchClasses(props: PropTypes) {
  const inputClasses = computed(() => {
    const classes: TwClassInterface = {
      ...useGlobalHiddenInputClasses(),
      width: props.size.value === 'sm' ? 'w-[30px]' : props.size.value === 'md' ? 'w-[38px]' : 'w-[46px]',
      height: props.size.value === 'sm' ? 'h-4' : props.size.value === 'md' ? 'h-5' : 'h-6',
      borderRadius: classNames({
        'rounded-full': props.rounded.value === 'full',
        'rounded': props.rounded.value === true
      })
    }
    return classNames(Object.values({ ...classes }));
  })

  const spanClasses = computed(() => {
    const classes: TwClassInterface = {
      // props.size.value === 'sm' ? 'w-[30px] before:w-3' : props.size.value === 'md' ? 'w-[38px] before:w-4' : 'w-[46px] before:w-5',
      lineHeight: 'leading-none',
      width: classNames({
        "w-[30px] before:w-3": props.size.value === 'sm',
        "w-[38px] before:w-4": props.size.value === 'md',
        "w-[46px] before:w-5": props.size.value === 'lg',
      }),
      // height: props.size.value === 'sm' ? 'h-4 before:h-3' : props.size.value === 'md' ? 'h-5 before:h-4' : 'h-6 before:h-5',
      height: classNames({
        "h-4 before:h-3": props.size.value === 'sm',
        "h-5 before:h-4": props.size.value === 'md',
        "h-6 before:h-5": props.size.value === 'lg',
      }),
      backgroundColor: 'bg-secondary-500 dark:bg-secondary-800 peer-disabled:bg-secondary-100 peer-checked:peer-disabled:bg-success-100 peer-checked:bg-success-500 before:bg-white',
      borderRadius: classNames({
        'rounded-full before:rounded-full': props.rounded.value === 'full',
        'rounded before:rounded-sm': props.rounded.value === true,
      }),
      display: 'inline-flex',
      position: 'relative before:absolute',
      top: 'before:top-0',
      bottom: 'before:bottom-0',
      translate: classNames({
        'before:translate-x-0.5 peer-checked:before:translate-x-4': props.size.value === 'sm',
        'before:translate-x-0.5 peer-checked:before:translate-x-5': props.size.value === 'md',
        'before:translate-x-0.5 peer-checked:before:translate-x-6': props.size.value === 'lg',
      }),
      margin: 'before:my-auto',
      transitionProperty: 'before:transition transition',
      ringWidth: 'peer-focus-visible:ring-2',
      ringColor: classNames({
        'peer-focus-visible:ring-primary-500/40': props.state.value === null,
        'peer-focus-visible:ring-warning-500/40': props.state.value === 'warning',
        'peer-focus-visible:ring-danger-500/40': props.state.value === false,
        'peer-focus-visible:ring-success-500/40': props.state.value === true,
      }),
    }
    return classNames(Object.values({ ...classes }));
  })

  // const descriptionClasses = computed(() => {
  //   const classes: TwClassInterface = {
  //     fontSize: "text-sm",
  //     lineHeight: "leading-normal",
  //     margin: "mt-1",
  //     textColor:
  //       attrs.disabled !== undefined && attrs.disabled.value
  //         ? "text-secondary-200 dark:text-secondary-700"
  //         : classNames({
  //           "text-secondary-600 dark:text-secondary-400":
  //             props.state.value === null,
  //           "text-warning-500": props.state.value === "warning",
  //           "text-danger-500": props.state.value === false,
  //           "text-success-500": props.state.value === true,
  //         }),
  //   };
  //   return classNames(Object.values({ ...classes }));;
  // });

  return { inputClasses, spanClasses }
}