/**
 * LinkedIn feed image — 1200x628 Stream A composition.
 *
 * Landscape, narrow vertical room. Smaller lockup (160), tighter type ladder
 * (PT Serif 40 headline, 48 quote, 48 announcement headline). Stat-panel
 * with 1-2 stats fits comfortably; 3 stats also fit but get tight.
 *
 * Doubles as the OG card / Twitter card share preview at 1200x630-ish.
 */

import { colors, fonts, lockupForSurface, onSurface } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { StatPanel } from "../components/StatPanel";
import { Quote } from "../components/Quote";
import { Announcement } from "../components/Announcement";
import type { FrameContent } from "../types";

const SIZING = {
  width: 1200,
  height: 628,
  padding: 60,
  lockupWidth: 160,
  headlineSize: 40,
  quoteSize: 48,
  announcementHeadlineSize: 48,
  panelWidth: 1080,
  contentMaxWidth: 1000,
};

export const LinkedInFeed = ({
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
                marginBottom: 24,
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
          ctaSize={20}
          maxWidth={SIZING.contentMaxWidth}
        />
      )}

      {footerLine ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 16,
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
