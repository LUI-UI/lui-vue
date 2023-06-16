import type { Ref } from 'vue'

export interface ModelValueObject {
  text: string
  value: string | number
  disabled?: boolean
  selected?: boolean
}
export type ModelValue = ModelValueObject | string | undefined
// export type ListboxStateType = {
//   items: ModelValueObject[] | string[];
//   currentIndex: number;
//   currentId: string | undefined;
// };
export type ListboxStateType = {
  items: any[]
  currentIndex: number
  currentId: string
}
export type OptionsType = string[] | ModelValueObject[]

export interface ContextDefination {
  selectedOption: Ref<ModelValue | string[]>
  updateSelectedOption(option: ModelValue, isInitial?: boolean): void
  focusButton(): void
  currentId: Ref<string>
}
