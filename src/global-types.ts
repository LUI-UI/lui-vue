export type Variant = "solid" | "outline" | "text" | "link";
export type Filter = "darken" | "lighten" | "none";
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
export type TextColor =
  | "white"
  | "solid"
  | "outline"
  | "text"
  | "link"
  | "link-underline";
export type Rounded = false | true | "full";
export type Block = true | false;
export type IconObject = {
  name: string;
  type: "fill" | "line" | undefined;
};
export type Icon = string | IconObject;
export type FullSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type TextSizes =
  | "xs"
  | "sm"
  | "base"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export enum TextSizesEnum {
  xs = "text-xs",
  sm = "text-sm",
  base = "text-base",
  "xl" = "text-xl",
  "2xl" = "text-2xl",
  "3xl" = "text-3xl",
  "4xl" = "text-4xl",
  "5xl" = "text-5xl",
  "6xl" = "text-6xl",
  "7xl" = "text-7xl",
  "8xl" = "text-8xl",
  "9xl" = "text-9xl",
}
