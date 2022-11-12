import { BackgroundsInterface } from "@/global-interfaces";
import { Color, Filter } from "@/global-types";
import classNames from "classnames";
import { computed, Ref } from "vue";

type PropTypes = {
  color: Ref<Color>;
  filter: Ref<Filter>;
};
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
