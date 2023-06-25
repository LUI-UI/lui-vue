export type AlignmentTypes = 'left' | 'center' | 'right'
export interface TabTypes {
  title: string
  tabId: string
  panelId: string
  active?: boolean
  disabled?: boolean
}
export interface TabContext {
  selectedIndex: number
  tabs: HTMLButtonElement[]
  panels: HTMLDivElement[]
}
