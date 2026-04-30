/**
 * Instagram portrait frame — 1080x1350 Stream A composition.
 *
 * Same lockup-top / content-middle / footer-bottom rhythm as the square,
 * with extra vertical room for taller pattern bodies and a slightly larger
 * type ladder (PT Serif 64 headline, 80 quote, 72 announcement headline).
 */

import { colors, fonts, lockupForSurface, onSurface } from "../tokens";
import { Lockup, type LockupAssets } from "../components/Lockup";
import { StatPanel } from "../components/StatPanel";
import { Quote } from "../components/Quote";
import { Announcement } from "../components/Announcement";
import type { FrameContent } from "../types";

const SIZING = {
  width: 1080,
  height: 1350,
  padding: 80,
  lockupWidth: 200,
  headlineSize: 64,
  quoteSize: 80,
  announcementHeadlineSize: 72,
  panelWidth: 920,
  contentMaxWidth: 920,
};

export const InstagramPortrait = ({
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
                marginBottom: 48,
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
