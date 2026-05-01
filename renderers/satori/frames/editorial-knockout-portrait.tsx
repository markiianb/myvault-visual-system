/**
 * editorial-knockout-portrait — 1080x1350.
 *
 * Top 60% of the canvas is a Vault Teal block holding a knockout PT Serif
 * headline (white on teal). Bottom 40% is white with the supporting body
 * paragraph and a Vault Teal CTA. Lockup top-left in light variant; small
 * primary lockup-icon implied by the body section's discipline.
 *
 * The split surface is the design move — the brand reads as authority on top,
 * editorial substance below.
 */

import { colors } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { Text } from "../components/Text";

export type EditorialKnockoutPortraitContent = {
  headline: string;
  body: string;
  cta?: string;
  /** Optional small label inside the teal block, top-right area. */
  kicker?: string;
};

export const EditorialKnockoutPortrait = ({
  content,
  assets,
}: {
  content: EditorialKnockoutPortraitContent;
  assets: { lockups: LockupAssets };
}) => {
  const { headline, body, cta, kicker } = content;
  const TOP_H = 810;       // 60% of 1350
  const BOTTOM_H = 1350 - TOP_H;

  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: colors.core.white,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: TOP_H,
          background: colors.core.teal,
          padding: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Lockup variant="light" assets={assets.lockups} width={200} />
          {kicker ? (
            <Text preset="body.s" color={colors.core.offWhite}>
              {kicker}
            </Text>
          ) : null}
        </div>

        <Text
          font="serif"
          size={88}
          lineHeight={1.05}
          color={colors.core.white}
          maxWidth={920}
        >
          {headline}
        </Text>
      </div>

      <div
        style={{
          height: BOTTOM_H,
          padding: 80,
          paddingTop: 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text
          preset="body.xl"
          color={colors.core.black}
          maxWidth={920}
          style={{ flex: 1 }}
        >
          {body}
        </Text>

        {cta ? (
          <Text
            font="sans"
            size={24}
            lineHeight={1}
            color={colors.core.teal}
          >
            {cta}
          </Text>
        ) : null}
      </div>
    </div>
  );
};
