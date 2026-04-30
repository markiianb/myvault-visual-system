/**
 * StatPanel — 1-3 stats in a row inside a card-shaped container.
 *
 * The card surface flips with the parent `surface` prop:
 *   light parent   -> off-white card with teal stat values  (matches ebook hero-stats)
 *   dark parent    -> 6%-white-on-teal card with white stat values  (matches HTML social test)
 *
 * Hard-capped at 3 stats. More than 3 in a row breaks the IG square at 1080. Frames
 * needing 4+ stats should use a different layout (planned: Stat2x2 in cycle 3).
 */

import { colors, radius, space } from "../tokens";
import { Stat, type StatSurface } from "./Stat";

export type StatItem = {
  value: string;
  label: string;
  source?: string;
};

export function StatPanel({
  stats,
  surface,
  width,
}: {
  stats: [StatItem] | [StatItem, StatItem] | [StatItem, StatItem, StatItem];
  surface: StatSurface;
  width: number;
}) {
  const panelBg =
    surface === "dark" ? "rgba(255,255,255,0.06)" : colors.core.offWhite;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: space.s8, // 32px
        width,
        background: panelBg,
        borderRadius: radius["2xl"], // 16px
        padding: space.s10, // 40px
      }}
    >
      {stats.map((s, i) => (
        <Stat
          key={i}
          value={s.value}
          label={s.label}
          source={s.source}
          surface={surface}
          size="compact"
        />
      ))}
    </div>
  );
}
