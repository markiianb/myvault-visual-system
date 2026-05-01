/**
 * frames-registry — central map of frame name -> { dimensions, builder }.
 *
 * Each frame is a hand-composed creative piece, not a templated dispatcher.
 * Add a new frame: write `frames/<name>.tsx` exporting a builder + content type,
 * then register it here. Fixtures with `"frame": "<name>"` flow through it.
 */

import { StatPanelTealSquare, type StatPanelTealSquareContent } from "../frames/stat-panel-teal-square";
import { GiantNumberSquare, type GiantNumberSquareContent } from "../frames/giant-number-square";
import { EditorialKnockoutPortrait, type EditorialKnockoutPortraitContent } from "../frames/editorial-knockout-portrait";
import { AsymmetricQuoteSquare, type AsymmetricQuoteSquareContent } from "../frames/asymmetric-quote-square";
import { OgHeadlineFeed, type OgHeadlineFeedContent } from "../frames/og-headline-feed";
import type { FrameSpec } from "../types";

export const FRAMES: Record<string, FrameSpec<any>> = {
  "stat-panel-teal-square": {
    width: 1080,
    height: 1080,
    build: (content: StatPanelTealSquareContent, assets) =>
      StatPanelTealSquare({ content, assets }),
  },
  "giant-number-square": {
    width: 1080,
    height: 1080,
    build: (content: GiantNumberSquareContent, assets) =>
      GiantNumberSquare({ content, assets }),
  },
  "editorial-knockout-portrait": {
    width: 1080,
    height: 1350,
    build: (content: EditorialKnockoutPortraitContent, assets) =>
      EditorialKnockoutPortrait({ content, assets }),
  },
  "asymmetric-quote-square": {
    width: 1080,
    height: 1080,
    build: (content: AsymmetricQuoteSquareContent, assets) =>
      AsymmetricQuoteSquare({ content, assets }),
  },
  "og-headline-feed": {
    width: 1200,
    height: 628,
    build: (content: OgHeadlineFeedContent, assets) =>
      OgHeadlineFeed({ content, assets }),
  },
};

export type Fixture = {
  id?: string;
  frame: keyof typeof FRAMES | string;
  content: unknown;
};
