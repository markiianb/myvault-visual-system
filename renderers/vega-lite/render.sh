#!/usr/bin/env bash
# Render Vega-Lite chart specs to SVG / PNG / PDF.
# Usage:
#   ./render.sh svg fixtures/horizontal-bar.vl.json [output/horizontal-bar.svg]
#   ./render.sh png fixtures/horizontal-bar.vl.json [output/horizontal-bar.png]
#   ./render.sh pdf fixtures/horizontal-bar.vl.json [output/horizontal-bar.pdf]
#   ./render.sh all fixtures/horizontal-bar.vl.json
#
# If output path omitted, infers from input filename and FORMAT (writes to ./output/).
# vg2png and vg2pdf require canvas (native build). vg2svg works without it — preferred path.

set -euo pipefail

cd "$(dirname "$0")"
BIN="./node_modules/.bin"

if [ ! -x "$BIN/vl2svg" ]; then
  echo "ERROR: Vega CLI not installed. Run: npm install --ignore-scripts" >&2
  exit 1
fi

FORMAT="${1:-}"
INPUT="${2:-}"
OUTPUT="${3:-}"

if [ -z "$FORMAT" ] || [ -z "$INPUT" ]; then
  echo "Usage: $0 <svg|png|pdf|all> <input.vl.json> [output]" >&2
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "ERROR: input not found: $INPUT" >&2
  exit 1
fi

basename_no_ext() {
  local f="$1"
  f="$(basename "$f")"
  echo "${f%.vl.json}"
}

mkdir -p output
BASE="$(basename_no_ext "$INPUT")"

render_one() {
  local fmt="$1"
  local out="${OUTPUT:-output/${BASE}.${fmt}}"
  case "$fmt" in
    svg)
      "$BIN/vl2svg" "$INPUT" "$out"
      ;;
    png)
      "$BIN/vl2png" "$INPUT" "$out" 2>&1 || {
        echo "WARN: PNG render failed (likely missing canvas native build). Skipping." >&2
        return 1
      }
      ;;
    pdf)
      "$BIN/vl2pdf" "$INPUT" "$out" 2>&1 || {
        echo "WARN: PDF render failed (likely missing canvas native build). Skipping." >&2
        return 1
      }
      ;;
    *)
      echo "ERROR: unknown format $fmt" >&2
      return 1
      ;;
  esac
  echo "Wrote $out"
}

case "$FORMAT" in
  all)
    render_one svg
    render_one png || true
    render_one pdf || true
    ;;
  svg|png|pdf)
    render_one "$FORMAT"
    ;;
  *)
    echo "ERROR: format must be svg|png|pdf|all" >&2
    exit 1
    ;;
esac
