#!/usr/bin/env node
/**
 * build-tokens.mjs — bridge ../../tokens/brand.tokens.json -> tokens.ts
 *
 * Mirrors the renderers/vega-lite/build-tokens-vega.sh and renderers/typst/build-tokens.sh
 * pattern: read the canonical W3C-DTCG token file, emit a renderer-shaped token bundle.
 * Output is a TypeScript module so JSX components get autocomplete and type narrowing
 * on token names instead of stringly-typed lookups.
 *
 * Brand-rule reminders that show up in token shape:
 * - Only Regular weights (no bold/medium/italic). Typography presets carry no `fontWeight`.
 * - Lato + PT Serif only. No third family.
 * - No "gray" lockup variant — the four canonical lockup variants are primary/light/teal/white.
 *   Lockup paths are loaded at render time, not from this token bundle.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const src = join(root, "..", "..", "tokens", "brand.tokens.json");
const out = join(root, "tokens.ts");

const t = JSON.parse(readFileSync(src, "utf8"));

const colors = {
  core: {
    teal: t.color.core.teal.$value,
    white: t.color.core.white.$value,
    offWhite: t.color.core["off-white"].$value,
    gray01: t.color.core["gray-01"].$value,
    gray02: t.color.core["gray-02"].$value,
    black: t.color.core.black.$value,
  },
  secondary: {
    premiumPurple: t.color.secondary["premium-purple"].$value,
    darkEarth: t.color.secondary["dark-earth"].$value,
    richBlue: t.color.secondary["rich-blue"].$value,
  },
  signal: {
    go: t.color.signal.go.$value,
    stop: t.color.signal.stop.$value,
    sky: t.color.signal.sky.$value,
    earth: t.color.signal.earth.$value,
  },
};

const space = Object.fromEntries(
  Object.entries(t.space).map(([k, v]) => [`s${k}`, parseInt(v.$value, 10)])
);

const radius = Object.fromEntries(
  Object.entries(t.radius).map(([k, v]) => [k, parseInt(v.$value, 10)])
);

const fonts = { serif: "PT Serif", sans: "Lato" };

const px = (s) => parseInt(String(s).replace("px", ""), 10);
const typeRole = (role) => ({
  fontFamily: role.fontFamily,
  fontSize: px(role.fontSize),
  lineHeight: role.lineHeight,
});

const typography = {
  display: {
    xxl: typeRole(t.typography.display.xxl.$value),
    xl: typeRole(t.typography.display.xl.$value),
    l: typeRole(t.typography.display.l.$value),
    m: typeRole(t.typography.display.m.$value),
    s: typeRole(t.typography.display.s.$value),
  },
  heading: {
    l: typeRole(t.typography.heading.l.$value),
    m: typeRole(t.typography.heading.m.$value),
  },
  body: {
    xl: typeRole(t.typography.body.xl.$value),
    l: typeRole(t.typography.body.l.$value),
    default: typeRole(t.typography.body.default.$value),
    s: typeRole(t.typography.body.s.$value),
  },
  caption: typeRole(t.typography.caption.$value),
};

const gradients = Object.fromEntries(
  Object.entries(t.gradient).map(([k, v]) => [
    k,
    v.$value.map((stop) => ({ color: stop.color, position: stop.position })),
  ])
);

const banner = `// AUTO-GENERATED from ../../tokens/brand.tokens.json — do not edit by hand.
// Regenerate with: pnpm build:tokens (or: node scripts/build-tokens.mjs)
//
// Source-of-truth is the W3C DTCG token file in 10-Brand/visual-system/tokens/.
// Components import named exports from this module; never hardcode hex/sizes.
`;

const body = `
export const colors = ${JSON.stringify(colors, null, 2)} as const;

export const fonts = ${JSON.stringify(fonts, null, 2)} as const;

export const space = ${JSON.stringify(space, null, 2)} as const;

export const radius = ${JSON.stringify(radius, null, 2)} as const;

export const typography = ${JSON.stringify(typography, null, 2)} as const;

export const gradients = ${JSON.stringify(gradients, null, 2)} as const;

export type Surface = "teal" | "white" | "off-white";

/** Map a surface choice to the lockup variant that pairs with it.
 * Dark surfaces (teal) take the light lockup; light surfaces (white, off-white)
 * take the primary lockup. Per memory: the gray variant is deprecated. */
export const lockupForSurface = {
  teal: "light",
  white: "primary",
  "off-white": "primary",
} as const;

/** Map a surface choice to the body text color that pairs with it.
 * Per memory feedback_presentation_design_canon v1.1: body text on dark surfaces
 * is solid white, not opacity-reduced. */
export const onSurface = {
  teal:        { fg: colors.core.white,    fgMuted: colors.core.offWhite, fgDim: "rgba(251,250,245,0.65)" },
  white:       { fg: colors.core.black,    fgMuted: colors.core.gray02,   fgDim: colors.core.gray02 },
  "off-white": { fg: colors.core.black,    fgMuted: colors.core.gray02,   fgDim: colors.core.gray02 },
} as const;
`;

writeFileSync(out, banner + body);
console.log(`Wrote ${out}`);
