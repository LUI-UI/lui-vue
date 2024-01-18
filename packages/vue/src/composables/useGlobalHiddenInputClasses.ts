export function useGlobalHiddenInputClasses() {
  return {
    position: 'absolute',
    overflow: 'overflow-hidden',
    outlineStyle: 'outline-none',
    cursor: 'disabled:cursor-not-allowed',
    borderWidth: 'border-0',
    opacity: 'opacity-0',
    zIndex: 'z-10',
    peer: 'peer',
  }
  // return { classes }
}
