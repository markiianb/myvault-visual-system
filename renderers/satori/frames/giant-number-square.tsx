/**
 * giant-number-square — 1080x1080.
 *
 * One PT Serif number fills ~half the canvas. No card chrome, no panel —
 * just typography at scale. Eyebrow above, caption below, lockup parked at
 * the bottom-right (not the canonical top-left — this composition wants
 * the number to dominate, not the brand mark).
 */

import { colors } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { Text } from "../components/Text";

export type GiantNumberSquareContent = {
  eyebrow?: string;
  /** The big number. e.g. "74%", "5x", "$1.2B". */
  number: string;
  caption: string;
  /** Tunable hero-number size in px (default 360). */
  numberSize?: number;
};

export const GiantNumberSquare = ({
  content,
  assets,
}: {
  content: GiantNumberSquareContent;
  assets: { lockups: LockupAssets };
}) => {
  const { eyebrow, number, caption, numberSize = 360 } = content;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: colors.core.teal,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {eyebrow ? (
        <Text
          preset="body.l"
          color={colors.core.offWhite}
          align="center"
          marginBottom={32}
          style={{ opacity: 0.7 }}
        >
          {eyebrow}
        </Text>
      ) : null}

      <Text
        font="serif"
        size={numberSize}
        lineHeight={1}
        color={colors.core.white}
        align="center"
      >
        {number}
      </Text>

      <Text
        font="sans"
        size={28}
        lineHeight={1.4}
        color={colors.core.offWhite}
        align="center"
        maxWidth={840}
        marginTop={40}
      >
        {caption}
      </Text>

      <div style={{ position: "absolute", bottom: 60, right: 60, display: "flex" }}>
        <Lockup variant="light" assets={assets.lockups} width={120} />
      </div>
    </div>
  );
};
