#!/bin/bash
# Token bridge for Typst v2 — extracts colors, typography, radius, space.
# Run after any token extraction. Idempotent — safe to re-run.
#
# Usage: cd renderers/typst && ./build-tokens.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_JSON="$SCRIPT_DIR/../../tokens/brand.tokens.json"
TOKENS_TYP="$SCRIPT_DIR/tokens.typ"

if [ ! -f "$TOKENS_JSON" ]; then
  echo "ERROR: tokens.json not found at $TOKENS_JSON" >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq required (brew install jq)" >&2
  exit 1
fi

jq -r '
[
  "// Auto-generated from tokens/brand.tokens.json — do not hand-edit.",
  "// Built by: renderers/typst/build-tokens.sh",
  "// Source: \(.["$extensions"]["com.myvault.figma"].fileName) (extracted \(.["$extensions"]["com.myvault.figma"].extractedAt))",
  "",
  "// === Core colors ===",
  (.color.core | to_entries[] | "#let color-core-\(.key) = rgb(\"\(.value["$value"])\")"),
  "",
  "// === Secondary colors ===",
  (.color.secondary | to_entries[] | "#let color-secondary-\(.key) = rgb(\"\(.value["$value"])\")"),
  "",
  "// === Signal colors ===",
  (.color.signal | to_entries[] | "#let color-signal-\(.key) = rgb(\"\(.value["$value"])\")"),
  "",
  "// === Aliases ===",
  "#let color-icon-default = color-core-black",
  "",
  "// === Typography ===",
  "// Each role: (family, size, leading_pct). Use via text-style.typ helpers.",
  (.typography
    | to_entries[]
    | (.key as $tier
       | (if .value["$type"] == "typography" then
            [{key: $tier, val: .value}]
          else
            (.value | to_entries | map({key: ($tier + "-" + .key | gsub("\\."; "-")), val: .value}))
          end))
    | .[]
    | "#let type-\(.key | gsub("\\."; "-")) = (\"\(.val["$value"].fontFamily)\", \(.val["$value"].fontSize | rtrimstr("px"))pt, \(.val["$value"].lineHeight * 100)%)"),
  "",
  "// === Radius ===",
  (.radius | to_entries[] | "#let radius-\(.key) = \(.value["$value"] | rtrimstr("px"))pt"),
  "",
  "// === Space ===",
  (.space | to_entries[] | "#let space-\(.key) = \(.value["$value"] | rtrimstr("px"))pt")
]
| .[]
' "$TOKENS_JSON" > "$TOKENS_TYP"

echo "Wrote $(wc -l < "$TOKENS_TYP") lines to $TOKENS_TYP"
