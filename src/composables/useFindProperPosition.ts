import { onMounted, onUnmounted, ref } from "vue";
import type { Ref, ComponentPublicInstance } from "vue";

function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>
): T | null {
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
}

export function useFindProperPosition<T extends Element>(el?: Ref<T | null>) {
  const properPosition: Ref<string> = ref("bottom");

  function updatePosition() {
    if (dom(el) === null) {
      properPosition.value = "bottom";
      return;
    }
    // const { y, bottom } = dom(el)?.getBoundingClientRect();
    const elRect: DOMRect | undefined = dom(el)?.getBoundingClientRect();
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
  onMounted(() => window.addEventListener("scroll", updatePosition));
  onUnmounted(() => window.removeEventListener("scroll", updatePosition));

  return { properPosition };
}
