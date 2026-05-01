// icons.mjs — Phosphor icon loader.
//
// Loads Phosphor SVGs from node_modules/@phosphor-icons/core/assets/<weight>/<name>(-fill?).svg
// and returns an inline SVG string sized to the requested width × height with a chosen fill color.
// Icons use `fill="currentColor"` natively, so we wrap them in a <g> with the chosen fill.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_ROOT = path.join(__dirname, "..", "node_modules", "@phosphor-icons", "core", "assets");

const cache = new Map();

function readPhosphorRaw(name, weight) {
  const fileName = weight === "fill" ? `${name}-fill.svg` : `${name}.svg`;
  const filePath = path.join(ASSETS_ROOT, weight, fileName);
  if (cache.has(filePath)) return cache.get(filePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Phosphor icon not found: ${weight}/${fileName} (looked in ${filePath})`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  cache.set(filePath, raw);
  return raw;
}

// Extract the inner content of a Phosphor SVG (everything between <svg ...> and </svg>)
// and return a <g> wrapper that sits inside our composed SVG at (x, y) sized to (width, height)
// with fill = color.
//
// Phosphor SVG viewBox is "0 0 256 256" — we scale via a transform.
export function phosphorIcon({ name, weight = "regular", x, y, size, color }) {
  const raw = readPhosphorRaw(name, weight);
  const innerMatch = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!innerMatch) throw new Error(`Could not parse Phosphor SVG for ${weight}/${name}`);
  const inner = innerMatch[1];
  const scale = size / 256;
  return `<g transform="translate(${x}, ${y}) scale(${scale})" fill="${color}" color="${color}">${inner}</g>`;
}
