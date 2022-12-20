import { onMounted, onUnmounted, ref } from "vue";

function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>
): T | null {
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
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