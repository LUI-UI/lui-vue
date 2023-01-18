import type { ComponentPublicInstance, Ref } from "vue";
import { onMounted, onUnmounted } from "vue";
// interface customDomType extends Element, ComponentPublicInstance {
//   contains: any;
// }
export function useOutsideClick(
  ref: Ref<HTMLElement | undefined>,
  callback: any
) {
  function handleClick(event: Event) {
    if (event.target instanceof Node && !ref.value?.contains(event?.target))
      callback();
  }

  onMounted(() => document.addEventListener("click", handleClick));
  onUnmounted(() => document.removeEventListener("click", handleClick));
}
function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null | undefined>
) {
  if (ref == undefined) return null;
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
}
