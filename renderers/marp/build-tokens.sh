#!/bin/bash
# Token bridge for Marp — extracts colors, gradients, typography, radius, space → CSS custom properties.
# Mirrors renderers/typst/build-tokens.sh discipline. Idempotent — safe to re-run.
#
# Outputs:
#   tokens.css  — the token variables (for inspection)
#   theme.css   — the final theme = tokens.css + myvault-presentation.css (loaded by Marp)
#
# Why theme.css: Marp's CSS processor strips @import statements, so we concatenate at build time.
#
# Usage: cd renderers/marp && ./build-tokens.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_JSON="$SCRIPT_DIR/../../tokens/brand.tokens.json"
TOKENS_CSS="$SCRIPT_DIR/tokens.css"
THEME_RULES_CSS="$SCRIPT_DIR/myvault-presentation.css"
FINAL_THEME_CSS="$SCRIPT_DIR/theme.css"

if [ ! -f "$TOKENS_JSON" ]; then
  echo "ERROR: tokens.json not found at $TOKENS_JSON" >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq required (brew install jq)" >&2
  exit 1
fi

{
  echo "/* Auto-generated from tokens/brand.tokens.json — do not hand-edit. */"
  echo "/* Built by: renderers/marp/build-tokens.sh */"
  jq -r '"/* Source: \(.["$extensions"]["com.myvault.figma"].fileName) (extracted \(.["$extensions"]["com.myvault.figma"].extractedAt)) */"' "$TOKENS_JSON"
  echo ""
  echo ":root {"
  echo "  /* === Core colors === */"
  jq -r '.color.core | to_entries[] | "  --color-core-\(.key): \(.value["$value"]);"' "$TOKENS_JSON"
  echo ""
  echo "  /* === Secondary colors === */"
  jq -r '.color.secondary | to_entries[] | "  --color-secondary-\(.key): \(.value["$value"]);"' "$TOKENS_JSON"
  echo ""
  echo "  /* === Signal colors === */"
  jq -r '.color.signal | to_entries[] | "  --color-signal-\(.key): \(.value["$value"]);"' "$TOKENS_JSON"
  echo ""
  echo "  /* === Aliases === */"
  echo "  --color-icon-default: var(--color-core-black);"
  echo ""
  echo "  /* === Gradients === */"
  jq -r '
    .gradient | to_entries[] |
    "  --gradient-\(.key): linear-gradient(180deg, " +
    ([.value["$value"][] | "\(.color) \((.position * 100))%"] | join(", ")) +
    ");"
  ' "$TOKENS_JSON"
  echo ""
  echo "  /* === Typography (family + size + line-height per role) === */"
  jq -r '
    .typography
    | to_entries[]
    | (.key as $tier
       | (if .value["$type"] == "typography" then
            [{key: $tier, val: .value}]
          else
            (.value | to_entries | map({key: ($tier + "-" + .key | gsub("\\."; "-")), val: .value}))
          end))
    | .[]
    | "  --type-\(.key)-family: \"\(.val["$value"].fontFamily)\";\n  --type-\(.key)-size: \(.val["$value"].fontSize);\n  --type-\(.key)-leading: \(.val["$value"].lineHeight);"
  ' "$TOKENS_JSON"
  echo ""
  echo "  /* === Radius === */"
  jq -r '.radius | to_entries[] | "  --radius-\(.key): \(.value["$value"]);"' "$TOKENS_JSON"
  echo ""
  echo "  /* === Space === */"
  jq -r '.space | to_entries[] | "  --space-\(.key): \(.value["$value"]);"' "$TOKENS_JSON"
  echo "}"
} > "$TOKENS_CSS"

echo "✓ Built $TOKENS_CSS"
echo "  $(wc -l < "$TOKENS_CSS") lines"

# Concatenate tokens + theme rules into theme.css (the file Marp loads)
if [ -f "$THEME_RULES_CSS" ]; then
  {
    cat "$TOKENS_CSS"
    echo ""
    echo "/* === Theme rules (myvault-presentation.css) === */"
    echo ""
    cat "$THEME_RULES_CSS"
  } > "$FINAL_THEME_CSS"
  echo "✓ Built $FINAL_THEME_CSS"
  echo "  $(wc -l < "$FINAL_THEME_CSS") lines (tokens + theme rules)"
else
  echo "⚠ $THEME_RULES_CSS not found; skipping theme.css build"
fi
