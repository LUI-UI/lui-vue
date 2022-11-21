import { computed, useSlots } from "vue";
// import classNames from "classnames";
//Types
import type { Ref } from "vue";
import type { TwClassInterface } from "@/globals/interfaces";
import type { Clear, StateIcon } from "../input-types";
import type {
  State,
  Rounded,
  Block,
  Icon,
  Size,
  Description,
} from "@/globals/types";
//Define Prop Types
type PropTypes = {
  size: Ref<Size>;
  rounded: Ref<Rounded>;
  state: Ref<State>;
  stateIcon: Ref<StateIcon>;
  block: Ref<Block>;
  clear: Ref<Clear>;
  prepend: Ref<Icon>;
  description: Ref<Description>;
};

export function useInputClasses(props: PropTypes, attrs: any) {
  const slots = useSlots()
  const iconStatus = computed(() => {
    return (props.stateIcon.value === true && props.state.value !== null) || props.clear.value === true
      ? !!slots.prepend
        ? "twoIcon"
        : "rightIcon" // stateIcon-active
      : !!slots.prepend === false
        ? "noIcon"
        : "leftIcon"; // stateIcn-deactive
  });
  const iconClasses: TwClassInterface = {
    position: "absolute",
    translate: "-translate-y-1/2",
    top: "top-2/4",
    //12 16 20 20 24
    fontSize: {
      "text-xs": props.size.value === "xs",
      "text-base": props.size.value === "sm",
      "text-xl": props.size.value === "md" || props.size.value === "lg",
      "text-2xl": props.size.value === "xl",
    },
  };
  const inputClasses = computed(() => {
    const classes: TwClassInterface = {
      peer: "peer",
      // fontSize: "text-base",
      // lineHeight: "leading-normal",
      width: "w-full",
      textColor:
        "text-secondary-600 placeholder:text-secondary-400 disabled:placeholder:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700",
      backgroundColor:
        "bg-secondary-50 disabled:bg-secondary-100 dark:bg-secondary-900 dark:disabled:secondary-800",
      outlineStyle: "outline-none",
      borderWidth: "border",
      borderStyle: "border-solid",
      cursor: "disabled:cursor-not-allowed",
      borderColor: {
        ["border-secondary-200 focus:border-primary-500 disabled:border-secondary-200"]:
          props.state.value === null,
        ["disabled:border-secondary-200 border-warning-500"]:
          props.state.value === "warning",
        ["disabled:border-secondary-200 border-danger-500"]:
          props.state.value === false,
        ["disabled:border-secondary-200 border-success-500"]:
          props.state.value === true,
      },
      ringWidth:
        attrs.disabled !== undefined && attrs.disabled.value
          ? "ring-0"
          : props.state.value === null
            ? "focus:ring-4"
            : "ring-4",
      ringColor: {
        "focus:ring-primary-500/40": props.state.value === null,
        "ring-warning-500/40": props.state.value === "warning",
        "ring-danger-500/40": props.state.value === false,
        "ring-success-500/40": props.state.value === true,
      },
      borderRadius: {
        "rounded-lg": props.rounded.value === true,
        "rounded-full": props.rounded.value === "full",
      },
      // 12 14 16 18 20
      fontSize: {
        "text-xs": props.size.value === "xs",
        "text-sm": props.size.value === "sm",
        "text-base": props.size.value === "md",
        "text-lg": props.size.value === "lg",
        "text-xl": props.size.value === "xl",
      },
      padding:
        iconStatus.value === "noIcon"
          // 4-8 6-10 8-12 10-12 14-16
          ? {
            "py-1 px-2": props.size.value === "xs",
            "py-1.5 px-2.5": props.size.value === "sm",
            "py-2 px-3": props.size.value === "md",
            "py-2.5 px-3": props.size.value === "lg",
            "py-3.5 px-4": props.size.value === "xl",
          }
          : iconStatus.value === "rightIcon"
            // 26 - 32 - 40 - 40 - 48
            ? {
              "py-1 pl-2 pr-[26px]": props.size.value === "xs",
              "py-1.5 pl-2.5 pr-8": props.size.value === "sm",
              "py-2 pl-3 pr-10": props.size.value === "md",
              "py-2.5 pl-3 pr-10": props.size.value === "lg",
              "py-3.5 pl-4 pr-12": props.size.value === "xl",
            }
            : iconStatus.value === "twoIcon"
              ? {
                "py-1 px-[26px]": props.size.value === "xs",
                "py-1.5 px-8": props.size.value === "sm",
                "py-2 px-10": props.size.value === "md",
                "py-2.5 px-10": props.size.value === "lg",
                "py-3.5 px-12": props.size.value === "xl",
              }
              : {
                //leftIcon
                "py-1 pr-2 pl-[26px]": props.size.value === "xs",
                "py-1.5 pr-2.5 pl-8": props.size.value === "sm",
                "py-2 pr-3 pl-10": props.size.value === "md",
                "py-2.5 pr-3 pl-10": props.size.value === "lg",
                "py-3.5 pr-4 pl-12": props.size.value === "xl",
              }
      ,
    };
    return Object.values({ ...classes });
  });

  const descriptionClasses = computed(() => {
    const classes: TwClassInterface = {
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

  const prependClasses = computed(() => {
    const classes: TwClassInterface = {
      ...iconClasses,
      // 8 10 12 12 16
      left: {
        "left-2": props.size.value === "xs",
        "left-2.5": props.size.value === "sm",
        "left-3": props.size.value === "md" || props.size.value === "lg",
        "left-4": props.size.value === "xl",
      },
      textColor:
        attrs.disabled !== undefined && attrs.disabled.value
          ? "text-secondary-300 dark:text-secondary-700"
          : "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300",
    };
    return Object.values({ ...classes });
  });

  const stateIconClasses = computed(() => {
    const classes: TwClassInterface = {
      ...iconClasses,
      right: {
        "right-2": props.size.value === "xs",
        "right-2.5": props.size.value === "sm",
        "right-3": props.size.value === "md" || props.size.value === "lg",
        "right-4": props.size.value === "xl",
      },
      textColor:
        attrs.disabled !== undefined && attrs.disabled.value
          ? "text-secondary-300"
          : {
            "text-warning-500": props.state.value === "warning",
            "text-danger-500": props.state.value === false,
            "text-success-500": props.state.value === true,
          },
    };
    return Object.values({ ...classes });
  });

  const closeIconClasses = computed(() => {
    const classes: TwClassInterface = {
      ...iconClasses,
      right: {
        "right-2": props.size.value === "xs",
        "right-2.5": props.size.value === "sm",
        "right-3": props.size.value === "md" || props.size.value === "lg",
        "right-4": props.size.value === "xl",
      },
      display: "flex",
      outlineStyle: "outline-none",
      textColor:
        "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300",
      ringWidth: "focus-visible:ring-2",
      ringColor: "focus-visible:ring-secondary-200",
    };
    return Object.values({ ...classes });
  });

  return {
    inputClasses,
    descriptionClasses,
    prependClasses,
    stateIconClasses,
    closeIconClasses,
  };
}

// export function useInputClasses(
//   props: ExtractPropTypes<PropTypes>, attrs: any
// ) {
//   const iconStatus = computed(() => {
//     return props.state.valueIcon === true && props.state.value !== null
//       ? props.prepend !== 'none' ? 'twoIcon' : 'rightIcon' // stateIcon-active
//       : props.prepend === 'none' ? 'noIcon' : 'leftIcon' // stateIcn-deactive
//   })

//   let inputClasses: TwClassInterface = {}
//   let descriptionClasses: TwClassInterface = {}
//   let preprendClasses: TwClassInterface = {}
//   let stateIconClasses: TwClassInterface = {}
//   let closeClasses: TwClassInterface = {}
//   let iconClasses: TwClassInterface = {
//     position: "absolute",
//     translate: "-translate-y-1/2",
//     top: "top-2/4",
//     fontSize: classNames({
//       'text-base': props.size.value === 'sm',
//       'text-xl': props.size.value === 'md',
//       'text-2xl': props.size.value === 'lg'
//     })
//   }

//   function setClasses() {
//     inputClasses.peer = "peer";
//     inputClasses.fontSize = "text-base";
//     inputClasses.lineHeight = "leading-normal";
//     inputClasses.width = "w-full";
//     inputClasses.textColor =
//       "text-secondary-600 placeholder:text-secondary-400 disabled:placeholder:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700";
//     inputClasses.backgroundColor = "bg-secondary-50 disabled:bg-secondary-100 dark:bg-secondary-900 dark:disabled:secondary-800";
//     inputClasses.outlineStyle = "outline-none";
//     inputClasses.borderWidth = "border";
//     inputClasses.borderStyle = "border-solid";
//     inputClasses.cursor = "disabled:cursor-not-allowed";
//     inputClasses.borderColor = classNames({
//       ["border-secondary-200 focus:border-primary-500 disabled:border-secondary-200"]: props.state.value === null,
//       ["disabled:border-secondary-200 border-warning-500"]: props.state.value === 'warning',
//       ["disabled:border-secondary-200 border-danger-500"]: props.state.value === false,
//       ["disabled:border-secondary-200 border-success-500"]: props.state.value === true,
//     });
//     inputClasses.ringWidth = attrs.disabled ? 'ring-0' : props.state.value === null ? "focus:ring-4" : "ring-4";
//     inputClasses.ringColor = classNames({
//       "focus:ring-primary-500/40": props.state.value === null,
//       "ring-warning-500/40": props.state.value === 'warning',
//       "ring-danger-500/40": props.state.value === false,
//       "ring-success-500/40": props.state.value === true,
//     });
//     inputClasses.borderRadius = classNames({
//       "rounded-lg": props.rounded,
//       "rounded-full": props.rounded === 'full'
//     });
//     inputClasses.padding = classNames(
//       iconStatus.value === 'noIcon'
//         ? {
//           "py-1 px-2": props.size.value === 'sm',
//           "py-2 px-3": props.size.value === 'md',
//           "py-3 px-3": props.size.value === 'lg',
//         }
//         : iconStatus.value === 'rightIcon'
//           ? {
//             "py-1 pl-2 pr-8": props.size.value === 'sm',
//             "py-2 pl-3 pr-10": props.size.value === 'md',
//             "py-3 pl-3 pr-12": props.size.value === 'lg',
//           }
//           : iconStatus.value === 'twoIcon'
//             ? {
//               "py-1 px-8": props.size.value === 'sm',
//               "py-2 px-10": props.size.value === 'md',
//               "py-3 px-12": props.size.value === 'lg',
//             }
//             : { //leftIcon
//               "py-1 pr-2 pl-8": props.size.value === 'sm',
//               "py-2 pr-3 pl-10": props.size.value === 'md',
//               "py-3 pr-3 pl-12": props.size.value === 'lg',
//             }
//     );
//     //
//     descriptionClasses.fontSize = "text-sm";
//     descriptionClasses.lineHeight = "leading-normal";
//     descriptionClasses.margin = "mt-1";
//     descriptionClasses.textColor = attrs.disabled
//       ? "text-secondary-200 dark:text-secondary-700"
//       : classNames({
//         "text-secondary-600 dark:text-secondary-400": props.state.value === null,
//         "text-warning-500": props.state.value === "warning",
//         "text-danger-500": props.state.value === false,
//         "text-success-500": props.state.value === true,
//       });
//     //
//     preprendClasses.position = "absolute";
//     preprendClasses.translate = "-translate-y-1/2";
//     preprendClasses.top = "top-2/4";
//     preprendClasses.left = classNames({
//       'left-2': props.size.value === 'sm',
//       'left-3': props.size.value === 'md',
//       'left-4': props.size.value === 'lg'
//     });
//     preprendClasses.fontSize = classNames({
//       'text-base': props.size.value === 'sm',
//       'text-xl': props.size.value === 'md',
//       'text-2xl': props.size.value === 'lg'
//     });
//     preprendClasses.textColor = classNames({
//       "text-secondary-300 dark:text-secondary-700": attrs.disabled,
//       "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300": !attrs.disabled
//     })
//     // State icon
//     stateIconClasses.position = "absolute";
//     stateIconClasses.translate = "-translate-y-1/2";
//     stateIconClasses.top = "top-2/4";
//     stateIconClasses.right = classNames({
//       'right-2': props.size.value === 'sm',
//       'right-3': props.size.value === 'md',
//       'right-4': props.size.value === 'lg'
//     });
//     stateIconClasses.fontSize = classNames({
//       'text-base': props.size.value === 'sm',
//       'text-xl': props.size.value === 'md',
//       'text-2xl': props.size.value === 'lg'
//     });
//     stateIconClasses.textColor = classNames(attrs.disabled ? 'text-secondary-300'
//       : {
//         "text-warning-500": props.state.value === 'warning',
//         "text-danger-500": props.state.value === false,
//         "text-success-500": props.state.value === true
//       });
//     // Close
//     closeClasses = { ...iconClasses }
//     closeClasses.right = classNames({
//       'right-2': props.size.value === 'sm',
//       'right-3': props.size.value === 'md',
//       'right-4': props.size.value === 'lg'
//     });
//     closeClasses.display = 'flex';
//     closeClasses.outlineStyle = "outline-none";
//     closeClasses.textColor = "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300";
//     closeClasses.ringWidth = "focus-visible:ring-2";
//     closeClasses.ringColor = "focus-visible:ring-secondary-200";

//   }

//   setClasses()
//   watchEffect(setClasses)

//   return { inputClasses, descriptionClasses, preprendClasses, stateIconClasses, closeClasses }
// }
