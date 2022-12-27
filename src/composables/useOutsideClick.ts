import type { ComponentPublicInstance, Ref } from "vue";
import { onMounted, onUnmounted } from "vue";
// interface customDomType extends Element, ComponentPublicInstance {
//   contains: any;
// }
export function useOutsideClick<T extends Element | ComponentPublicInstance>(
  ref: Ref<T | null>,
  callback: any
) {
  function handleClick(event: MouseEvent) {
    if (!dom(ref)?.contains(event.target)) callback();
  }

  onMounted(() => document.addEventListener("click", handleClick));
  onUnmounted(() => document.removeEventListener("click", handleClick));
}
function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>
): any {
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
}
