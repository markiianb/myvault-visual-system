/**
 * Text — token-bound typography primitive.
 *
 * Either pass a `preset` (one of the canonical roles in `typography`), or
 * compose freely with `font` + `size` + `lineHeight`. There is no `fontWeight`
 * prop because Regular is the only allowed weight (per `feedback_regular_weight_only`).
 *
 * For knockout / accent treatments, set `color` to any hex from `colors`.
 */

import type { CSSProperties, ReactNode } from "react";
import { fonts, typography } from "../tokens";

type TypographyPath =
  | "display.xxl" | "display.xl" | "display.l" | "display.m" | "display.s"
  | "heading.l" | "heading.m"
  | "body.xl" | "body.l" | "body.default" | "body.s"
  | "caption";

const PRESETS: Record<TypographyPath, { fontFamily: string; fontSize: number; lineHeight: number }> = {
  "display.xxl": typography.display.xxl,
  "display.xl":  typography.display.xl,
  "display.l":   typography.display.l,
  "display.m":   typography.display.m,
  "display.s":   typography.display.s,
  "heading.l":   typography.heading.l,
  "heading.m":   typography.heading.m,
  "body.xl":     typography.body.xl,
  "body.l":      typography.body.l,
  "body.default": typography.body.default,
  "body.s":      typography.body.s,
  "caption":     typography.caption,
};

export type TextProps = {
  children: ReactNode;
  /** Token preset. If set, font + size + lineHeight come from `tokens.typography`. */
  preset?: TypographyPath;
  /** Override or set explicit font family. */
  font?: "serif" | "sans";
  /** Override or set explicit font size in px. */
  size?: number;
  /** Override or set explicit line-height (unitless multiplier). */
  lineHeight?: number;
  /** Letter-spacing in px. Use sparingly — never on uppercase eyebrows. */
  letterSpacing?: number;
  /** Color hex from `tokens.colors` or any CSS color string. */
  color?: string;
  /** Constrain text width so it wraps. */
  maxWidth?: number;
  /** Text alignment. */
  align?: "left" | "center" | "right";
  /** Margin shortcuts. */
  marginTop?: number;
  marginBottom?: number;
  /** Escape hatch for any other CSS Satori supports. */
  style?: CSSProperties;
};

export function Text({
  children,
  preset,
  font,
  size,
  lineHeight,
  letterSpacing,
  color,
  maxWidth,
  align,
  marginTop,
  marginBottom,
  style,
}: TextProps) {
  const base = preset ? PRESETS[preset] : { fontFamily: fonts.sans, fontSize: 16, lineHeight: 1.5 };
  const fontFamily = font ? (font === "serif" ? fonts.serif : fonts.sans) : base.fontFamily;
  const fontSize = size ?? base.fontSize;
  const lh = lineHeight ?? base.lineHeight;

  const computed: CSSProperties = { fontFamily, fontSize, lineHeight: lh };
  if (letterSpacing !== undefined) computed.letterSpacing = letterSpacing;
  if (color !== undefined) computed.color = color;
  if (maxWidth !== undefined) computed.maxWidth = maxWidth;
  if (align !== undefined) computed.textAlign = align;
  if (marginTop !== undefined) computed.marginTop = marginTop;
  if (marginBottom !== undefined) computed.marginBottom = marginBottom;

  return <div style={{ ...computed, ...style }}>{children}</div>;
}
