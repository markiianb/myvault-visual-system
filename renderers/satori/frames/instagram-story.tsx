/**
 * Instagram story frame — 1080x1920 Stream A composition.
 *
 * Tall vertical canvas. Bigger lockup (220), bigger headline (80), bigger
 * quote (96). Generous vertical breathing room with 100px top/bottom padding
 * and 80px sides. Single stat-panel still fits a 920-wide row.
 */

import { colors, fonts, lockupForSurface, onSurface } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { StatPanel } from "../components/StatPanel";
import { Quote } from "../components/Quote";
import { Announcement } from "../components/Announcement";
import type { FrameContent } from "../types";

const SIZING = {
  width: 1080,
  height: 1920,
  paddingTop: 120,
  paddingBottom: 120,
  paddingX: 80,
  lockupWidth: 220,
  headlineSize: 80,
  quoteSize: 96,
  announcementHeadlineSize: 96,
  panelWidth: 920,
  contentMaxWidth: 920,
};

export const InstagramStory = ({
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
        paddingTop: SIZING.paddingTop,
        paddingBottom: SIZING.paddingBottom,
        paddingLeft: SIZING.paddingX,
        paddingRight: SIZING.paddingX,
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
                marginBottom: 60,
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
          ctaSize={28}
          maxWidth={SIZING.contentMaxWidth}
        />
      )}

      {footerLine ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 20,
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
