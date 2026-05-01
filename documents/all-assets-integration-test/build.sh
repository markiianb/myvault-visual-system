#!/usr/bin/env bash
# build.sh — combined-asset integration test build script.
#
# Same two-step build as chart-integration-test, but with three asset types in one PDF:
# horizontal-bar chart + 3-up stat infographic + flow diagram.

set -euo pipefail

cd "$(dirname "$0")"
RENDERER="../../renderers/vega-lite"

echo "==> Bridging brand tokens (idempotent)"
( cd "$RENDERER" && ./build-tokens-vega.sh )

echo "==> Composing all chart fixtures"
for fixture in charts/*.chart.json; do
  id="$(basename "$fixture" .chart.json)"
  out="charts/${id}.svg"
  node "$RENDERER/compose.mjs" "$fixture" "$out"
done

echo "==> Compiling spec.typ → output.pdf"
typst compile --root "../.." spec.typ output.pdf

echo "==> Done. Output: $(pwd)/output.pdf"
