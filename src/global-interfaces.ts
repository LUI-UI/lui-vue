export interface LayoutInterface {
  aspectRatio?: string;
  container?: string;
  columns?: string;
  breakAfter?: string;
  breakBefore?: string;
  breakInside?: string;
  boxDecorationBreak?: string;
  boxSizing?: string;
  display?: string;
  float?: string;
  clear?: string;
  isolation?: string;
  objectFit?: string;
  objectPosition?: string;
  overflow?: string;
  overscrollBehavior?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  // topRightBottomLeft?: string;
  visibility?: string;
  zIndex?: string;
}
export interface FlexGridInterface {
  flexBasis?: string;
  flexDirection?: string;
  flexWrap?: string;
  flex?: string;
  flexGrow?: string;
  flexShrink?: string;
  order?: string;
  gridTemplateColumns?: string;
  gridColumn?: string;
  gridTemplateRows?: string;
  gridRow?: string;
  gridAutoFlow?: string;
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gap?: string;
  justifyContent?: string;
  justifyItems?: string;
  justifySelf?: string;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
}
export interface SpacingInterface {
  padding?: string;
  margin?: string;
  space?: string;
}
export interface SizingInterface {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}
export interface TypographyInterface {
  fontFamily?: string;
  fontSize?: string;
  fontSmoothing?: string;
  fontStyle?: string;
  fontWeight?: string;
  fontVariantNumeric?: string;
  letterSpacing?: string;
  lineHeight?: string;
  listStyleType?: string;
  listStylePosition?: string;
  textAlign?: string;
  textColor?: string;
  textDecoration?: string;
  textDecorationColor?: string;
  textDecorationStyle?: string;
  textDecorationThickness?: string;
  textUnderlineOffset?: string;
  textTransform?: string;
  textOverflow?: string;
  textIndent?: string;
  verticalAlign?: string;
  whitespace?: string;
  wordBreak?: string;
  content?: string;
}
export interface BackgroundsInterface {
  backgroundAttachment?: string;
  backgroundClip?: string;
  backgroundColor?: string;
  backgroundOrigin?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  backgroundImage?: string;
  gradientColorStops?: string;
}
export interface BordersInterface {
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  divideWidth?: string;
  divideColor?: string;
  divideStyle?: string;
  outlineWidth?: string;
  outlineColor?: string;
  outlineStyle?: string;
  outlineOffset?: string;
  ringWidth?: string;
  ringColor?: string;
  ringOffsetWidth?: string;
  ringOffsetColor?: string;
}
export interface EffectsInterface {
  boxShadow?: string;
  boxShadowColor?: string;
  opacity?: string;
  mixBlendMode?: string;
  backgroundBlendMode?: string;
}
export interface FiltersInterface {
  blur?: string;
  brightness?: string;
  contrast?: string;
  dropShadow?: string;
  grayscale?: string;
  hueRotate?: string;
  invert?: string;
  saturate?: string;
  sepia?: string;
  backdropBlur?: string;
  backdropBrightness?: string;
  backdropContrast?: string;
  backdropGrayscale?: string;
  backdropHueRotate?: string;
  backdropInvert?: string;
  backdropOpacity?: string;
  backdropSaturate?: string;
  backdropSepia?: string;
}
export interface TablesInterface {
  borderCollapse?: string;
  borderSpacing?: string;
  tableLayout?: string;
}
export interface TransitionAnimationInterface {
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
  animation?: string;
}
export interface TransformsInterface {
  scale?: string;
  rotate?: string;
  translate?: string;
  skew?: string;
  transformOrigin?: string;
}
export interface InteractivityInterface {
  accentColor?: string;
  appearance?: string;
  cursor?: string;
  caretColor?: string;
  pointerEvents?: string;
  resize?: string;
  scrollBehavior?: string;
  scrollMargin?: string;
  scrollPadding?: string;
  scrollSnapAlign?: string;
  scrollSnapStop?: string;
  scrollSnapType?: string;
  touchAction?: string;
  userSelect?: string;
  willChange?: string;
}
export interface SvgInterface {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}
export interface CoreConcepts {
  peer?: string;
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
