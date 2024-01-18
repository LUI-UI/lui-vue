import type { Ref } from 'vue'

export interface ModelValueObject {
  text: string
  value: string | number
  disabled?: boolean
  selected?: boolean
}
export interface SelectedOption {
  text: string
  value: string | number
}
export type ModelValue = ModelValueObject | string | undefined
// export type ListboxStateType = {
//   items: ModelValueObject[] | string[];
//   currentIndex: number;
//   currentId: string | undefined;
// };
export interface ListboxStateType {
  items: any[]
  currentIndex: number
  currentId: string
}
export type OptionsType = string | ModelValueObject

export interface ContextDefination {
  selectedOption: Ref<SelectedOption> | Ref<string[]>
  updateSelectedOption(option: ModelValue): void
  focusButton(): void
  currentId: Ref<string>
}
