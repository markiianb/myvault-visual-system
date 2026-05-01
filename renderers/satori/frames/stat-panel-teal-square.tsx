/**
 * stat-panel-teal-square — 1080x1080.
 *
 * Hand-composed primitives — no "StatPanel" component — each stat is laid out
 * directly so the typography rhythm and spacing are visible at the frame level
 * rather than buried in a component.
 *
 * Layout: Lockup top-left → headline → 3-stat row inside a 6%-white card → footer line.
 */

import { colors, fonts, radius, space } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { Box } from "../components/Box";
import { Text } from "../components/Text";

export type StatItem = { value: string; label: string; source?: string };

export type StatPanelTealSquareContent = {
  headline: string;
  stats: [StatItem] | [StatItem, StatItem] | [StatItem, StatItem, StatItem];
  footerLine?: string;
};

export const StatPanelTealSquare = ({
  content,
  assets,
}: {
  content: StatPanelTealSquareContent;
  assets: { lockups: LockupAssets };
}) => {
  const { headline, stats, footerLine } = content;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: colors.core.teal,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Lockup variant="light" assets={assets.lockups} width={200} />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text
          font="serif"
          size={56}
          lineHeight={1.10}
          color={colors.core.white}
          maxWidth={880}
          marginBottom={40}
        >
          {headline}
        </Text>

        <Box
          surface="transparent"
          radius="2xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            width: 920,
            padding: space.s10,
            flexDirection: "row",
            gap: space.s8,
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Text font="serif" size={80} lineHeight={1} color={colors.core.white}>
                {s.value}
              </Text>
              <Text preset="body.l" color={colors.core.white} marginTop={16}>
                {s.label}
              </Text>
              {s.source ? (
                <Text preset="caption" color="rgba(251,250,245,0.65)" marginTop={8}>
                  {s.source}
                </Text>
              ) : null}
            </div>
          ))}
        </Box>
      </div>

      {footerLine ? (
        <Text font="sans" size={18} lineHeight={1} letterSpacing={1} color={colors.core.offWhite}>
          {footerLine}
        </Text>
      ) : (
        <div style={{ height: 0 }} />
      )}
    </div>
  );
};
