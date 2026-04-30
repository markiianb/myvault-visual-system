/**
 * Instagram square frame — 1080x1080 Stream A composition.
 *
 * Top:    Lockup
 * Middle: Pattern body (stat-panel | quote | announcement)
 * Bottom: Footer line
 *
 * Layout mirrors _research/html-css-test/social/instagram-square.html for the
 * stat-panel pattern; the quote and announcement variants follow the same
 * lockup-top / content-middle / footer-bottom rhythm.
 */

import { colors, fonts, lockupForSurface, onSurface } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { StatPanel } from "../components/StatPanel";
import { Quote } from "../components/Quote";
import { Announcement } from "../components/Announcement";
import type { FrameContent } from "../types";

const SIZING = {
  width: 1080,
  height: 1080,
  padding: 80,
  lockupWidth: 200,
  headlineSize: 56,
  quoteSize: 64,
  announcementHeadlineSize: 64,
  panelWidth: 920,
  contentMaxWidth: 880,
};

export const InstagramSquare = ({
  content: payload,
  assets,
}: {
  content: FrameContent;
  assets: { lockups: LockupAssets };
}) => {
  const { surface, content, footerLine } = payload;
  const surfaceBg =
    surface === "teal" ? colors.core.teal :
    surface === "off-white" ? colors.core.offWhite :
    colors.core.white;
  const palette = onSurface[surface];
  const lockupVariant = lockupForSurface[surface];
  const isDark = surface === "teal";
  const stackSurface = isDark ? "dark" : "light";

  return (
    <div
      style={{
        width: SIZING.width,
        height: SIZING.height,
        background: surfaceBg,
        padding: SIZING.padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Lockup
        variant={lockupVariant}
        assets={assets.lockups}
        width={SIZING.lockupWidth}
      />

      {content.pattern === "stat-panel" ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {content.headline ? (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: SIZING.headlineSize,
                lineHeight: 1.10,
                color: palette.fg,
                maxWidth: SIZING.contentMaxWidth,
                marginBottom: 40,
              }}
            >
              {content.headline}
            </div>
          ) : null}
          <StatPanel
            stats={content.stats}
            surface={stackSurface}
            width={SIZING.panelWidth}
          />
        </div>
      ) : content.pattern === "quote" ? (
        <Quote
          quote={content.quote}
          attribution={content.attribution}
          surface={stackSurface}
          size={SIZING.quoteSize}
          maxWidth={SIZING.contentMaxWidth}
        />
      ) : (
        <Announcement
          eyebrow={content.eyebrow}
          headline={content.headline}
          supporting={content.supporting}
          cta={content.cta}
          surface={stackSurface}
          headlineSize={SIZING.announcementHeadlineSize}
          maxWidth={SIZING.contentMaxWidth}
        />
      )}

      {footerLine ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 18,
            letterSpacing: 1,
            color: palette.fgMuted,
            lineHeight: 1,
          }}
        >
          {footerLine}
        </div>
      ) : (
        <div style={{ height: 0 }} />
      )}
    </div>
  );
};
