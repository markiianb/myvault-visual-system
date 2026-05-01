/**
 * asymmetric-quote-square — 1080x1080.
 *
 * Oversize opening quotation glyph in Vault Teal anchors the composition at
 * top-left; the quote body wraps to its right and below. Off-white surface
 * for editorial feel. Lockup parked top-right (primary), so the brand mark
 * counterweights the giant glyph diagonally.
 *
 * This is the "magazine pull-quote" aesthetic — the punctuation IS the design.
 */

import { colors } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { Text } from "../components/Text";

export type AsymmetricQuoteSquareContent = {
  quote: string;
  attribution?: string;
  footerLine?: string;
};

export const AsymmetricQuoteSquare = ({
  content,
  assets,
}: {
  content: AsymmetricQuoteSquareContent;
  assets: { lockups: LockupAssets };
}) => {
  const { quote, attribution, footerLine } = content;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: colors.core.offWhite,
        padding: 80,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 60,
          fontFamily: "PT Serif",
          fontSize: 360,
          lineHeight: 1,
          color: colors.core.teal,
          display: "flex",
        }}
      >
        “
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Lockup variant="primary" assets={assets.lockups} width={160} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 200,
          marginRight: 40,
          maxWidth: 760,
        }}
      >
        <Text font="serif" size={56} lineHeight={1.20} color={colors.core.black}>
          {quote}
        </Text>
        {attribution ? (
          <Text preset="body.l" color={colors.core.gray02} marginTop={32}>
            {`— ${attribution}`}
          </Text>
        ) : null}
      </div>

      {footerLine ? (
        <Text
          font="sans"
          size={18}
          lineHeight={1}
          letterSpacing={1}
          color={colors.core.gray02}
        >
          {footerLine}
        </Text>
      ) : (
        <div style={{ height: 0 }} />
      )}
    </div>
  );
};
