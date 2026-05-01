/**
 * Box — token-bound surface primitive.
 *
 * A flex `<div>` with shortcut props for the brand surface palette and corner
 * radii. Layout (flex direction, justify, align, gap, padding numbers) is set
 * via inline `style` — Box doesn't try to wrap every flex prop, just the
 * brand-token bits. Use `style` for everything else.
 */

import type { CSSProperties, ReactNode } from "react";
import { colors, gradients, radius as radiusTokens } from "../tokens";

type FlatSurface = "teal" | "white" | "off-white" | "black" | "transparent";
type GradientSurface = "gradient-primary" | "gradient-cool" | "gradient-warm" | "gradient-mist" | "gradient-greydient";
export type BoxSurface = FlatSurface | GradientSurface;

const SURFACE_BG: Record<BoxSurface, string> = {
  teal: colors.core.teal,
  white: colors.core.white,
  "off-white": colors.core.offWhite,
  black: colors.core.black,
  transparent: "transparent",
  "gradient-primary":   linearGradient(gradients.primary),
  "gradient-cool":      linearGradient(gradients.cool),
  "gradient-warm":      linearGradient(gradients.warm),
  "gradient-mist":      linearGradient(gradients.mist),
  "gradient-greydient": linearGradient(gradients.greydient),
};

function linearGradient(stops: ReadonlyArray<{ color: string; position: number }>): string {
  const parts = stops.map((s) => `${s.color} ${(s.position * 100).toFixed(2)}%`).join(", ");
  return `linear-gradient(180deg, ${parts})`;
}

export type BoxProps = {
  children?: ReactNode;
  /** Token-bound background. Flat colors or canonical gradients. */
  surface?: BoxSurface;
  /** Token-bound corner radius. */
  radius?: keyof typeof radiusTokens;
  /** 1px gray-01 stroke. Use sparingly. */
  border?: boolean;
  /** Escape hatch for layout, sizing, padding, etc. */
  style?: CSSProperties;
};

export function Box({ children, surface, radius, border, style }: BoxProps) {
  const computed: CSSProperties = { display: "flex" };
  if (surface) computed.background = SURFACE_BG[surface];
  if (radius) computed.borderRadius = radiusTokens[radius];
  if (border) computed.border = `1px solid ${colors.core.gray01}`;

  return <div style={{ ...computed, ...style }}>{children}</div>;
}
