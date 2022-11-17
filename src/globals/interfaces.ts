export interface LayoutInterface {
  aspectRatio?: string | object | null;
  container?: string | object | null;
  columns?: string | object | null;
  breakAfter?: string | object | null;
  breakBefore?: string | object | null;
  breakInside?: string | object | null;
  boxDecorationBreak?: string | object | null;
  boxSizing?: string | object | null;
  display?: string | object | null;
  float?: string | object | null;
  clear?: string | object | null;
  isolation?: string | object | null;
  objectFit?: string | object | null;
  objectPosition?: string | object | null;
  overflow?: string | object | null;
  overscrollBehavior?: string | object | null;
  position?: string | object | null;
  top?: string | object | null;
  right?: string | object | null;
  bottom?: string | object | null;
  left?: string | object | null;
  // topRightBottomLeft?: string | object | null;
  visibility?: string | object | null;
  zIndex?: string | object | null;
}
export interface FlexGridInterface {
  flexBasis?: string | object | null;
  flexDirection?: string | object | null;
  flexWrap?: string | object | null;
  flex?: string | object | null;
  flexGrow?: string | object | null;
  flexShrink?: string | object | null;
  order?: string | object | null;
  gridTemplateColumns?: string | object | null;
  gridColumn?: string | object | null;
  gridTemplateRows?: string | object | null;
  gridRow?: string | object | null;
  gridAutoFlow?: string | object | null;
  gridAutoColumns?: string | object | null;
  gridAutoRows?: string | object | null;
  gap?: string | object | null;
  justifyContent?: string | object | null;
  justifyItems?: string | object | null;
  justifySelf?: string | object | null;
  alignContent?: string | object | null;
  alignItems?: string | object | null;
  alignSelf?: string | object | null;
  placeContent?: string | object | null;
  placeItems?: string | object | null;
  placeSelf?: string | object | null;
}
export interface SpacingInterface {
  padding?: string | object | null;
  margin?: string | object | null;
  space?: string | object | null;
}
export interface SizingInterface {
  width?: string | object | null;
  minWidth?: string | object | null;
  maxWidth?: string | object | null;
  height?: string | object | null;
  minHeight?: string | object | null;
  maxHeight?: string | object | null;
}
export interface TypographyInterface {
  fontFamily?: string | object | null;
  fontSize?: string | object | null;
  fontSmoothing?: string | object | null;
  fontStyle?: string | object | null;
  fontWeight?: string | object | null;
  fontVariantNumeric?: string | object | null;
  letterSpacing?: string | object | null;
  lineHeight?: string | object | null;
  listStyleType?: string | object | null;
  listStylePosition?: string | object | null;
  textAlign?: string | object | null;
  textColor?: string | object | null;
  textDecoration?: string | object | null;
  textDecorationColor?: string | object | null;
  textDecorationStyle?: string | object | null;
  textDecorationThickness?: string | object | null;
  textUnderlineOffset?: string | object | null;
  textTransform?: string | object | null;
  textOverflow?: string | object | null;
  textIndent?: string | object | null;
  verticalAlign?: string | object | null;
  whitespace?: string | object | null;
  wordBreak?: string | object | null;
  content?: string | object | null;
}
export interface BackgroundsInterface {
  backgroundAttachment?: string | object | null;
  backgroundClip?: string | object | null;
  backgroundColor?: string | object | null;
  backgroundOrigin?: string | object | null;
  backgroundPosition?: string | object | null;
  backgroundRepeat?: string | object | null;
  backgroundSize?: string | object | null;
  backgroundImage?: string | object | null;
  gradientColorStops?: string | object | null;
}
export interface BordersInterface {
  borderRadius?: string | object | null;
  borderWidth?: string | object | null;
  borderColor?: string | object | null;
  borderStyle?: string | object | null;
  divideWidth?: string | object | null;
  divideColor?: string | object | null;
  divideStyle?: string | object | null;
  outlineWidth?: string | object | null;
  outlineColor?: string | object | null;
  outlineStyle?: string | object | null;
  outlineOffset?: string | object | null;
  ringWidth?: string | object | null;
  ringColor?: string | object | null;
  ringOffsetWidth?: string | object | null;
  ringOffsetColor?: string | object | null;
}
export interface EffectsInterface {
  boxShadow?: string | object | null;
  boxShadowColor?: string | object | null;
  opacity?: string | object | null;
  mixBlendMode?: string | object | null;
  backgroundBlendMode?: string | object | null;
}
export interface FiltersInterface {
  blur?: string | object | null;
  brightness?: string | object | null;
  contrast?: string | object | null;
  dropShadow?: string | object | null;
  grayscale?: string | object | null;
  hueRotate?: string | object | null;
  invert?: string | object | null;
  saturate?: string | object | null;
  sepia?: string | object | null;
  backdropBlur?: string | object | null;
  backdropBrightness?: string | object | null;
  backdropContrast?: string | object | null;
  backdropGrayscale?: string | object | null;
  backdropHueRotate?: string | object | null;
  backdropInvert?: string | object | null;
  backdropOpacity?: string | object | null;
  backdropSaturate?: string | object | null;
  backdropSepia?: string | object | null;
}
export interface TablesInterface {
  borderCollapse?: string | object | null;
  borderSpacing?: string | object | null;
  tableLayout?: string | object | null;
}
export interface TransitionAnimationInterface {
  transitionProperty?: string | object | null;
  transitionDuration?: string | object | null;
  transitionTimingFunction?: string | object | null;
  transitionDelay?: string | object | null;
  animation?: string | object | null;
}
export interface TransformsInterface {
  scale?: string | object | null;
  rotate?: string | object | null;
  translate?: string | object | null;
  skew?: string | object | null;
  transformOrigin?: string | object | null;
}
export interface InteractivityInterface {
  accentColor?: string | object | null;
  appearance?: string | object | null;
  cursor?: string | object | null;
  caretColor?: string | object | null;
  pointerEvents?: string | object | null;
  resize?: string | object | null;
  scrollBehavior?: string | object | null;
  scrollMargin?: string | object | null;
  scrollPadding?: string | object | null;
  scrollSnapAlign?: string | object | null;
  scrollSnapStop?: string | object | null;
  scrollSnapType?: string | object | null;
  touchAction?: string | object | null;
  userSelect?: string | object | null;
  willChange?: string | object | null;
}
export interface SvgInterface {
  fill?: string | object | null;
  stroke?: string | object | null;
  strokeWidth?: string | object | null;
}
export interface CoreConcepts {
  peer?: string | object | null;
}

export interface TwClassInterface
  extends LayoutInterface,
    FlexGridInterface,
    SpacingInterface,
    SizingInterface,
    TypographyInterface,
    BackgroundsInterface,
    BordersInterface,
    EffectsInterface,
    FiltersInterface,
    TablesInterface,
    TransitionAnimationInterface,
    TransformsInterface,
    InteractivityInterface,
    CoreConcepts,
    SvgInterface {}
