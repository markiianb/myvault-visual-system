/**
 * frames-registry — central map of frame name -> { dimensions, builder }.
 *
 * Both render.ts and render-all.ts consume this. Add a new frame by importing
 * the component here and registering it once; the CLI surface picks it up
 * automatically.
 */

import type { ReactElement } from "react";
import { InstagramSquare } from "../frames/instagram-square";
import { InstagramPortrait } from "../frames/instagram-portrait";
import { InstagramStory } from "../frames/instagram-story";
import { LinkedInFeed } from "../frames/linkedin-feed";
import type { LockupAssets } from "../components/Lockup";
import type { FrameContent } from "../types";

export type FrameAssets = { lockups: LockupAssets };

export type FrameSpec = {
  width: number;
  height: number;
  build: (content: FrameContent, assets: FrameAssets) => ReactElement;
};

export const FRAMES: Record<string, FrameSpec> = {
  "instagram-square": {
    width: 1080,
    height: 1080,
    build: (content, assets) => InstagramSquare({ content, assets }),
  },
  "instagram-portrait": {
    width: 1080,
    height: 1350,
    build: (content, assets) => InstagramPortrait({ content, assets }),
  },
  "instagram-story": {
    width: 1080,
    height: 1920,
    build: (content, assets) => InstagramStory({ content, assets }),
  },
  "linkedin-feed": {
    width: 1200,
    height: 628,
    build: (content, assets) => LinkedInFeed({ content, assets }),
  },
};

export type Fixture = FrameContent & {
  id?: string;
  frame: keyof typeof FRAMES | string;
};
