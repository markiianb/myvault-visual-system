/**
 * Stat — single big-number stat with label and optional source line.
 *
 * Atomic. Used directly when a frame has one hero stat, or composed by StatPanel
 * when 2-3 stats sit side-by-side. The big value is PT Serif (display.m by default,
 * 72px); reduce to "compact" when the stat lives in a multi-stat panel.
 *
 * Brand rules baked in:
 * - Only Regular weights — no fontWeight prop.
 * - 14px floor on label/source per `feedback_14pt_practical_text_floor`. The 12px
 *   source caption is the documented `typography.caption` role — rare-instance use.
 * - Value color follows the surface: teal on light surfaces, white on dark.
 */

import { colors, fonts, typography } from "../tokens";

export type StatSurface = "dark" | "light";
export type StatSize = "hero" | "compact";

const VALUE_SIZE: Record<StatSize, number> = {
  hero: typography.display.m.fontSize,    // 72px
  compact: 80,                             // matches HTML test reference for 3-up panels
};

export function Stat({
  value,
  label,
  source,
  surface,
  size = "hero",
}: {
  value: string;
  label: string;
  source?: string;
  surface: StatSurface;
  size?: StatSize;
}) {
  const valueColor =
    surface === "dark" ? colors.core.white : colors.core.teal;
  const labelColor =
    surface === "dark" ? colors.core.white : colors.core.black;
  const sourceColor =
    surface === "dark" ? "rgba(251,250,245,0.65)" : colors.core.gray02;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: VALUE_SIZE[size],
          lineHeight: 1,
          color: valueColor,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: typography.body.l.fontSize, // 18px
          lineHeight: typography.body.l.lineHeight,
          color: labelColor,
          marginTop: 16,
        }}
      >
        {label}
      </div>
      {source ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: typography.caption.fontSize, // 12px
            lineHeight: typography.caption.lineHeight,
            color: sourceColor,
            marginTop: 8,
          }}
        >
          {source}
        </div>
      ) : null}
    </div>
  );
}
