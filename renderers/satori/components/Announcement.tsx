/**
 * Announcement — eyebrow + headline + supporting line + CTA URL.
 *
 * Eyebrow is sentence-case Lato 14, never uppercase / letter-spaced (per
 * `feedback_no_uppercase_eyebrows`). Headline is PT Serif at the size the
 * frame chooses. Supporting copy is Lato body.l. CTA is Lato 18-24 in the
 * accent color (Vault Teal on light surfaces; pure white on dark).
 */

import { colors, fonts } from "../tokens";

export type AnnouncementSurface = "dark" | "light";

export function Announcement({
  eyebrow,
  headline,
  supporting,
  cta,
  surface,
  headlineSize,
  ctaSize = 24,
  maxWidth,
}: {
  eyebrow?: string;
  headline: string;
  supporting?: string;
  cta?: string;
  surface: AnnouncementSurface;
  headlineSize: number;
  ctaSize?: number;
  maxWidth?: number;
}) {
  const fg = surface === "dark" ? colors.core.white : colors.core.black;
  const fgMuted =
    surface === "dark" ? "rgba(251,250,245,0.75)" : colors.core.gray02;
  const accent = surface === "dark" ? colors.core.white : colors.core.teal;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: 1,
            color: fgMuted,
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: headlineSize,
          lineHeight: 1.10,
          color: fg,
        }}
      >
        {headline}
      </div>

      {supporting ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 20,
            lineHeight: 1.4,
            color: fgMuted,
            marginTop: 24,
          }}
        >
          {supporting}
        </div>
      ) : null}

      {cta ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: ctaSize,
            lineHeight: 1.2,
            color: accent,
            marginTop: 32,
          }}
        >
          {cta}
        </div>
      ) : null}
    </div>
  );
}
