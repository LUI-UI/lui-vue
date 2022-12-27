import type { InjectionKey } from 'vue';
import type { ContextDefination } from "./select-types"


// export const ContextKey: InjectionKey<ContextDefination> = Symbol('ContextDefination');
export const ContextKey = Symbol("ContextKey") as InjectionKey<ContextDefination>

// const ProductKey: InjectionKey<Product> = Symbol('Product');

// let SelectContext = Symbol() as InjectionKey<ContextDefination>;