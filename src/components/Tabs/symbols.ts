import type { InjectionKey } from "vue";
import type { TabTypes } from "./types";
// import type { ContextDefination } from "./select-types";
// need remove types folder also using in luitabs bue
// type TabTypes = {
//   title: string;
//   active?: boolean;
//   disabled?: boolean;
// };
interface ContextDefination {
  selectedIndex: Ref<number>;
  registerTab(tab: any): void;
  // changeTabProps(tab: TabTypes, oldTitle: string): void;
}
// interface ContextDefination {
//   selectedTab: Ref<TabTypes | null>;
//   changeTabProps(tab: TabTypes, oldTitle: string): void;
// }

export const ContextKey = Symbol(
  "ContextKey"
) as InjectionKey<ContextDefination>;
