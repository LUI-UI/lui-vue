import { onMounted, onUnmounted, ref, nextTick } from "vue";
import type { Ref } from "vue";

// function dom<T extends Element | ComponentPublicInstance>(
//   ref?: Ref<T | null>
// ): T | null {
//   if (ref == null) return null;
//   if (ref.value == null) return null;

//   return (ref.value as { $el?: T }).$el ?? ref.value;
// }

export function useFindProperPosition(el: Ref<any>) {
  const properPosition = ref<string>("bottom");

  function updatePosition() {
    nextTick(() => {
      if (el === null || el?.value === null) {
        properPosition.value = "bottom";
        return;
      }
      if (el.value?.getBoundingClientRect() !== undefined) {
        const elRect: DOMRect | undefined = el.value?.getBoundingClientRect();
        const innerHeight = window.innerHeight;
        if (elRect?.bottom === undefined || elRect?.y === undefined) {
          properPosition.value = "bottom";
          return;
        }
        if (innerHeight - elRect?.bottom >= elRect?.y) {
          properPosition.value = "bottom";
        } else {
          properPosition.value = "top";
        }
      }
    })
  }
  updatePosition()
  onMounted(() => window.addEventListener("scroll", updatePosition));
  onUnmounted(() => window.removeEventListener("scroll", updatePosition));

  return { properPosition };
}
