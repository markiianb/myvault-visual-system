/**
 * og-headline-feed — 1200x628.
 *
 * Essay opener / OG card. Maximalist whitespace, single-axis composition.
 * Lockup top-left primary, small Vault Teal eyebrow above the PT Serif
 * headline, Lato body line in gray, optional URL in teal at the bottom.
 *
 * Doubles as the canonical Twitter card / OpenGraph image. Resists chrome.
 */

import { colors } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { Text } from "../components/Text";

export type OgHeadlineFeedContent = {
  eyebrow?: string;
  headline: string;
  body?: string;
  url?: string;
};

export const OgHeadlineFeed = ({
  content,
  assets,
}: {
  content: OgHeadlineFeedContent;
  assets: { lockups: LockupAssets };
}) => {
  const { eyebrow, headline, body, url } = content;

  return (
    <div
      style={{
        width: 1200,
        height: 628,
        background: colors.core.white,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Lockup variant="primary" assets={assets.lockups} width={140} />

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1080 }}>
        {eyebrow ? (
          <Text
            font="sans"
            size={16}
            lineHeight={1}
            color={colors.core.teal}
            marginBottom={16}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Text
          font="serif"
          size={56}
          lineHeight={1.10}
          color={colors.core.black}
        >
          {headline}
        </Text>
        {body ? (
          <Text preset="body.l" color={colors.core.gray02} marginTop={20}>
            {body}
          </Text>
        ) : null}
      </div>

      {url ? (
        <Text font="sans" size={18} lineHeight={1} color={colors.core.teal}>
          {url}
        </Text>
      ) : (
        <div style={{ height: 0 }} />
      )}
    </div>
  );
};
