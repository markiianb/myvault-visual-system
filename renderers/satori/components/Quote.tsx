/**
 * Quote — large PT Serif quote with optional attribution.
 *
 * Smart quote characters wrap the body so the rendering matches the editorial
 * tone of MyVault assets. Attribution sits below at body.l size in the muted
 * surface color, prefixed by an em dash.
 */

import { colors, fonts } from "../tokens";

export type QuoteSurface = "dark" | "light";

export function Quote({
  quote,
  attribution,
  surface,
  size,
  maxWidth,
}: {
  quote: string;
  attribution?: string;
  surface: QuoteSurface;
  /** Font-size of the quote body in px. Frames pick the size that fits the canvas. */
  size: number;
  maxWidth?: number;
}) {
  const fg = surface === "dark" ? colors.core.white : colors.core.black;
  const fgMuted =
    surface === "dark" ? "rgba(251,250,245,0.75)" : colors.core.gray02;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: size,
          lineHeight: 1.15,
          color: fg,
        }}
      >
        {`“${quote}”`}
      </div>
      {attribution ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 18,
            lineHeight: 1.5,
            color: fgMuted,
            marginTop: 32,
          }}
        >
          {`— ${attribution}`}
        </div>
      ) : null}
    </div>
  );
}
