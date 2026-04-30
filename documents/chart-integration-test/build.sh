#!/usr/bin/env bash
# build.sh — chart-in-PDF integration test build script.
#
# Two-step build:
#   1. For each charts/*.chart.json fixture, run the Vega-Lite composer
#      to produce charts/<id>.svg.
#   2. Compile spec.typ → output.pdf via Typst (which embeds the SVGs).

set -euo pipefail

cd "$(dirname "$0")"
RENDERER="../../renderers/vega-lite"

echo "==> Bridging brand tokens (idempotent)"
( cd "$RENDERER" && ./build-tokens-vega.sh )

echo "==> Composing charts"
for fixture in charts/*.chart.json; do
  id="$(basename "$fixture" .chart.json)"
  out="charts/${id}.svg"
  node "$RENDERER/compose.mjs" "$fixture" "$out"
done

echo "==> Compiling spec.typ → output.pdf"
typst compile --root "../.." spec.typ output.pdf

echo "==> Done. Output: $(pwd)/output.pdf"
