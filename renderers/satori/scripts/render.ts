/**
 * render.ts — single-fixture render driver.
 *
 * Usage:
 *   pnpm render <fixture.json> [output.png]
 *   pnpm render fixtures/ig-square-3-stat.json
 *
 * The fixture's `frame` field selects the layout; the rest of the file is the
 * `FrameContent` payload. Output defaults to output/<fixture-id>.png.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { basename, dirname, extname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

import { loadFonts, loadLockups } from "./load-assets";
import { FRAMES, type Fixture } from "./frames-registry";

const here = dirname(fileURLToPath(import.meta.url));
const rendererRoot = join(here, "..");

export async function renderFixture(fixturePath: string, outputArg?: string) {
  const fixtureAbs = fixturePath.startsWith("/") ? fixturePath : join(rendererRoot, fixturePath);
  const fixture = JSON.parse(await readFile(fixtureAbs, "utf8")) as Fixture;

  const spec = FRAMES[fixture.frame];
  if (!spec) {
    throw new Error(
      `Unknown frame "${fixture.frame}" in ${fixturePath}. Available: ${Object.keys(FRAMES).join(", ")}`
    );
  }

  const fonts = await loadFonts();
  const lockups = await loadLockups();
  const element = spec.build(fixture, { lockups });

  const svg = await satori(element, {
    width: spec.width,
    height: spec.height,
    fonts,
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: spec.width } })
    .render()
    .asPng();

  const fixtureBase = fixture.id ?? basename(fixturePath, extname(fixturePath));
  const outRel = outputArg ?? join("output", `${fixtureBase}.png`);
  const outAbs = outRel.startsWith("/") ? outRel : join(rendererRoot, outRel);
  await mkdir(dirname(outAbs), { recursive: true });
  await writeFile(outAbs, png);

  return { outAbs, frame: fixture.frame, width: spec.width, height: spec.height };
}

async function main() {
  const [fixturePath, outputArg] = process.argv.slice(2);

  if (!fixturePath) {
    console.error("Usage: tsx scripts/render.ts <fixture.json> [output.png]");
    console.error(`Frames available: ${Object.keys(FRAMES).join(", ")}`);
    process.exit(1);
  }

  const result = await renderFixture(fixturePath, outputArg);
  console.log(`Wrote ${result.outAbs}`);
  console.log(`  frame:   ${result.frame}`);
  console.log(`  size:    ${result.width}x${result.height}`);
  console.log(`  fixture: ${fixturePath}`);
}

// Only run main() when invoked directly, not when imported by render-all.ts
const invokedDirect = process.argv[1] && process.argv[1].endsWith("render.ts");
if (invokedDirect) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
