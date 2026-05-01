/**
 * Shared types for the Satori renderer.
 *
 * Each frame defines its own content shape — there is no global pattern union.
 * Frames import what they need from `tokens.ts` and compose freely with the
 * `Text`, `Box`, and `Lockup` primitives.
 */

import type { ReactElement } from "react";
import type { LockupAssets } from "./components/Lockup";

export type FrameAssets = { lockups: LockupAssets };

export type FrameSpec<TContent = unknown> = {
  width: number;
  height: number;
  build: (content: TContent, assets: FrameAssets) => ReactElement;
};
