import { onMounted, onUnmounted, computed, nextTick, ref } from "vue";
import type { ComponentPublicInstance } from "vue";

function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>
): T | null {
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
}

export function useOutsideClick<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>,
  callback
): void {
  onMounted(() => {
    document.addEventListener("click", function (event) {
      if (!dom(ref)?.contains(event.target)) callback();
    });
  });
  onUnmounted(() => {
    document.removeEventListener("click", function (event) {
      if (!dom(ref)?.contains(event.target)) callback();
    });
  });
}

export function useFindProperPosition<
  T extends Element | ComponentPublicInstance
>(el?: Ref<T | null>): string {
  const properPosition = ref("bottom");

  function updatePosition() {
    if (dom(el) === null) {
      properPosition.value = "bottom";
      return;
    }
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { y, bottom } = dom(el)?.getBoundingClientRect();
    const innerHeight = window.innerHeight;
    if (innerHeight - bottom >= y) {
      properPosition.value = "bottom";
    } else {
      properPosition.value = "top";
    }
  }
  onMounted(() => window.addEventListener("scroll", updatePosition));
  onUnmounted(() => window.removeEventListener("scroll", updatePosition));

  return { properPosition };
}
