export type Variant = "solid" | "outline" | "text" | "link";
export type Filter = "darken" | "lighten" | "none";
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
// export type TextColor =
//   | "white"
//   | "solid"
//   | "outline"
//   | "text"
//   | "link"
//   | "link-underline";
export type Rounded = false | true | "full";
export type Block = true | false;
export type Border = true | false;
// export type Loading = true | false;
export type IconObject = {
  name: string;
  type: "fill" | "line" | undefined;
};
export type Icon = string | IconObject;
export type FullSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type State = true | false | string | null;
export type Description = string | null;
export type CheckableModelValue = string[] | boolean;