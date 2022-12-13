import type { Ref } from "vue"

export interface ModelValueObject  {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
}
export type ModelValue = ModelValueObject | string | undefined;
export type ListboxStateType = {
  items: ModelValueObject[] | string[];
  currentIndex: number;
  currentId: string | undefined;
};
export type OptionsType = string[] | ModelValueObject[];

export interface ContextDefination {
  selectedOption: Ref<ModelValue>;
  updateSelectedOption(option:ModelValue): void;
  focusButton(): void;
};
