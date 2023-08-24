export function isElementScrollable(element: HTMLElement) {
  return element && element.clientHeight < element.scrollHeight
}
