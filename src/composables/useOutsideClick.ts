import type { ComponentPublicInstance } from "vue";
import { onMounted, onUnmounted  } from "vue";
export function useOutsideClick<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>,
  callback
): void {
  function handleClick() {
    if (!dom(ref)?.contains(event.target)) callback();
  }

  onMounted(() => document.addEventListener("click", handleClick));
  onUnmounted(() => document.removeEventListener("click", handleClick));
  // onMounted(() => {
  //   document.addEventListener("click", function (event) {
  //     if (!dom(ref)?.contains(event.target)) callback();
  //   });
  // });
  // onUnmounted(() => {
  //   document.removeEventListener("click", function (event) {
  //     if (!dom(ref)?.contains(event.target)) callback();
  //   });
  // });
}
function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>
): T | null {
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
}
