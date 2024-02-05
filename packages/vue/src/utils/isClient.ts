export function isClient(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined' && document.createElement !== undefined
}
