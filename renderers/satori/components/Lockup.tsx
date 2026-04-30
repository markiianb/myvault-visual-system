/**
 * Lockup — MyVault wordmark + icon as a single image.
 *
 * The four canonical variants are primary (black), light (off-white), teal (Vault Teal),
 * white (pure #FFFFFF). The gray lockup variant is deprecated per
 * `feedback_no_gray_logo_variant` and intentionally not exposed by this prop union.
 *
 * Satori renders SVGs reliably via <img src={dataURI}> — pre-loaded by the render
 * driver from assets/logo/lockup-{variant}.svg. Intrinsic size is 814x220 in the source
 * SVG, so width passes through as-is and height is computed from that aspect ratio.
 */

import type { CSSProperties } from "react";

export type LockupVariant = "primary" | "light" | "teal" | "white";

export type LockupAssets = Record<LockupVariant, string>; // data URIs

export function Lockup({
  variant,
  assets,
  width = 200,
  style,
}: {
  variant: LockupVariant;
  assets: LockupAssets;
  width?: number;
  style?: CSSProperties;
}) {
  const height = (width * 220) / 814;
  return (
    <img
      src={assets[variant]}
      width={width}
      height={height}
      alt="MyVault"
      style={style}
    />
  );
}
