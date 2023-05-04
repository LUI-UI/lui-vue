import type { InjectionKey } from 'vue'
import type { TabContext } from './types'
// import type { ContextDefination } from "./select-types";
// need remove types folder also using in luitabs bue
// type TabTypes = {
//   title: string;
//   active?: boolean;
//   disabled?: boolean;
// };
interface ContextDefination {
  registerTab(tab: any): void
  unRegisterTab(tab: any): void
  registerPanel(panel: any): void
  unRegisterPanel(panel: any): void
  setSelectedIndex(index: number): void
  context: TabContext
  // changeTabProps(tab: TabTypes, oldTitle: string): void;
}
// interface ContextDefination {
//   selectedTab: Ref<TabTypes | null>;
//   changeTabProps(tab: TabTypes, oldTitle: string): void;
// }

export const ContextKey = Symbol('ContextKey') as InjectionKey<ContextDefination>
