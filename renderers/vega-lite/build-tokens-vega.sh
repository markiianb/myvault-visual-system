#!/usr/bin/env bash
# Token bridge: tokens/brand.tokens.json -> renderers/vega-lite/theme.json + tokens.json
# Phase 2 of the chunks/chart.md renderer plan.
# Output:
#   tokens.json — flat key-value map of every token used by chart specs
#   theme.json  — Vega-Lite config with brand defaults (background, font, axis, mark, view, range, title)

set -euo pipefail

cd "$(dirname "$0")"
TOKENS_SRC="../../tokens/brand.tokens.json"
OUT_TOKENS="tokens.json"
OUT_THEME="theme.json"

if [ ! -f "$TOKENS_SRC" ]; then
  echo "ERROR: source tokens not found at $TOKENS_SRC" >&2
  exit 1
fi

# 1) Flat tokens.json — easy to reference inside chart specs
jq -n --slurpfile src "$TOKENS_SRC" '
  $src[0] as $T |
  {
    color: {
      teal:     $T.color.core.teal["$value"],
      offWhite: $T.color.core["off-white"]["$value"],
      white:    $T.color.core.white["$value"],
      gray01:   $T.color.core["gray-01"]["$value"],
      gray02:   $T.color.core["gray-02"]["$value"],
      black:    $T.color.core.black["$value"],
      signalStop: $T.color.signal.stop["$value"],
      signalSky:  $T.color.signal.sky["$value"],
      signalGo:   $T.color.signal.go["$value"]
    },
    gradient: {
      mist:      $T.gradient.mist["$value"],
      primary:   $T.gradient.primary["$value"],
      warm:      $T.gradient.warm["$value"],
      greydient: $T.gradient.greydient["$value"],
      cool:      $T.gradient.cool["$value"]
    },
    font: {
      serif: "PT Serif",
      sans:  "Lato"
    }
  }
' > "$OUT_TOKENS"

echo "Wrote $OUT_TOKENS"

# 2) theme.json — Vega-Lite config with brand defaults
# Note: Vega-Lite config is a single object that describes default mark / axis / legend / title styling
jq -n --slurpfile T "$OUT_TOKENS" '
  $T[0] as $tok |
  {
    background: $tok.color.white,
    padding: 0,
    font: $tok.font.sans,
    title: {
      font: $tok.font.serif,
      fontSize: 40,
      fontWeight: 400,
      color: $tok.color.black,
      anchor: "start",
      offset: 0,
      subtitleFont: $tok.font.sans,
      subtitleFontSize: 14,
      subtitleFontWeight: 400,
      subtitleColor: $tok.color.gray02,
      subtitlePadding: 8
    },
    axis: {
      labelFont: $tok.font.sans,
      labelFontSize: 14,
      labelFontWeight: 400,
      labelColor: $tok.color.gray02,
      labelPadding: 6,
      titleFont: $tok.font.sans,
      titleFontSize: 14,
      titleFontWeight: 400,
      titleColor: $tok.color.gray02,
      grid: false,
      domain: false,
      ticks: false,
      labelLimit: 200
    },
    axisX: {
      labelAngle: 0
    },
    axisY: {
      grid: true,
      gridColor: $tok.color.gray01,
      gridDash: [2, 5],
      gridWidth: 1
    },
    mark: {
      color: $tok.color.teal,
      cornerRadius: 0
    },
    bar: {
      color: $tok.color.teal,
      cornerRadius: 0
    },
    arc: {
      stroke: null
    },
    view: {
      stroke: null,
      fill: null
    },
    text: {
      font: $tok.font.sans,
      fontSize: 14,
      fontWeight: 400,
      color: $tok.color.black
    },
    range: {
      category: [$tok.color.signalStop, $tok.color.signalSky, $tok.color.signalGo],
      ordinal: { scheme: "tealgreen" },
      ramp: { scheme: "tealgreen" }
    },
    legend: {
      labelFont: $tok.font.sans,
      labelFontSize: 14,
      labelColor: $tok.color.gray02,
      titleFont: $tok.font.sans,
      titleFontSize: 14,
      titleFontWeight: 400,
      titleColor: $tok.color.gray02,
      symbolType: "circle",
      symbolSize: 100
    },
    style: {
      "footer-caption": {
        font: $tok.font.sans,
        fontSize: 12,
        fontWeight: 400,
        color: $tok.color.gray02
      },
      "chart-title": {
        font: $tok.font.serif,
        fontSize: 40,
        fontWeight: 400,
        color: $tok.color.black
      },
      "chart-description": {
        font: $tok.font.sans,
        fontSize: 14,
        fontWeight: 400,
        color: $tok.color.gray02
      },
      "value-label": {
        font: $tok.font.sans,
        fontSize: 14,
        fontWeight: 400,
        color: $tok.color.black
      },
      "category-label": {
        font: $tok.font.sans,
        fontSize: 14,
        fontWeight: 400,
        color: $tok.color.black
      }
    }
  }
' > "$OUT_THEME"

echo "Wrote $OUT_THEME"
