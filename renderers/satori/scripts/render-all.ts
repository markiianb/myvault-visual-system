/**
 * render-all.ts — batch-render every fixture in fixtures/.
 *
 * Walks fixtures/*.json, dispatches each through render.ts, prints a summary.
 * Useful for regenerating the whole gallery after a token / component change.
 */

import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";
import { renderFixture } from "./render";

const here = dirname(fileURLToPath(import.meta.url));
const rendererRoot = join(here, "..");
const fixturesDir = join(rendererRoot, "fixtures");

async function main() {
  const entries = await readdir(fixturesDir);
  const fixtures = entries
    .filter((f) => extname(f) === ".json")
    .sort();

  if (fixtures.length === 0) {
    console.log("No fixtures found in fixtures/.");
    return;
  }

  console.log(`Rendering ${fixtures.length} fixture${fixtures.length === 1 ? "" : "s"}...\n`);

  const t0 = Date.now();
  const results: Array<{ fixture: string; ok: boolean; err?: string; outAbs?: string; frame?: string; width?: number; height?: number }> = [];

  for (const f of fixtures) {
    const fixturePath = join("fixtures", f);
    try {
      const r = await renderFixture(fixturePath);
      results.push({ fixture: f, ok: true, ...r });
      console.log(`  ✓ ${f.padEnd(36)} ${r.frame.padEnd(20)} ${r.width}x${r.height}`);
    } catch (err: any) {
      results.push({ fixture: f, ok: false, err: err?.message ?? String(err) });
      console.log(`  ✗ ${f}\n      ${err?.message ?? err}`);
    }
  }

  const ms = Date.now() - t0;
  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;
  console.log(`\nRendered ${ok}/${results.length} fixtures in ${ms} ms${failed ? ` — ${failed} failed` : ""}.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
