/**
 * load-assets — load fonts and lockup SVGs for Satori at render time.
 *
 * Satori needs fonts as raw Buffers (no @font-face URL loading) and consumes SVGs
 * as data-URI <img> sources. This helper loads both once per render run.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { LockupAssets, LockupVariant } from "../components/Lockup";

const here = dirname(fileURLToPath(import.meta.url));
const rendererRoot = join(here, "..");
const visualSystemRoot = join(rendererRoot, "..", "..");

export type SatoriFont = {
  name: string;
  data: Buffer;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style: "normal" | "italic";
};

export async function loadFonts(): Promise<SatoriFont[]> {
  const lato = await readFile(join(rendererRoot, "fonts", "Lato-Regular.ttf"));
  const ptSerif = await readFile(join(rendererRoot, "fonts", "PTSerif-Regular.ttf"));
  return [
    { name: "Lato", data: lato, weight: 400, style: "normal" },
    { name: "PT Serif", data: ptSerif, weight: 400, style: "normal" },
  ];
}

export async function loadLockups(): Promise<LockupAssets> {
  const variants: LockupVariant[] = ["primary", "light", "teal", "white"];
  const entries = await Promise.all(
    variants.map(async (v) => {
      const buf = await readFile(
        join(visualSystemRoot, "assets", "logo", `lockup-${v}.svg`)
      );
      return [v, `data:image/svg+xml;base64,${buf.toString("base64")}`] as const;
    })
  );
  return Object.fromEntries(entries) as LockupAssets;
}
