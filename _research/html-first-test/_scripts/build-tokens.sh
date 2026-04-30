#!/bin/bash
# Token bridge for HTML/CSS test — mirrors renderers/typst/build-tokens.sh.
# Generates tokens.css from tokens/brand.tokens.json.
#
# Usage: ./build-tokens.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_JSON="$SCRIPT_DIR/../../../tokens/brand.tokens.json"
TOKENS_CSS="$SCRIPT_DIR/../_shared/tokens.css"

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
  "/* Auto-generated from tokens/brand.tokens.json — do not hand-edit. */",
  "/* Built by: _research/html-first-test/_scripts/build-tokens.sh */",
  "",
  ":root {",
  "  /* === Core colors === */",
  (.color.core | to_entries[] | "  --color-core-\(.key): \(.value["$value"]);"),
  "",
  "  /* === Secondary colors === */",
  (.color.secondary | to_entries[] | "  --color-secondary-\(.key): \(.value["$value"]);"),
  "",
  "  /* === Signal colors === */",
  (.color.signal | to_entries[] | "  --color-signal-\(.key): \(.value["$value"]);"),
  "",
  "  /* === Typography (size + leading per role; family is fixed) === */",
  (.typography
    | to_entries[]
    | (.key as $tier
       | (if .value["$type"] == "typography" then
            [{key: $tier, val: .value}]
          else
            (.value | to_entries | map({key: ($tier + "-" + .key), val: .value}))
          end))
    | .[]
    | "  --type-\(.key)-family: \"\(.val["$value"].fontFamily)\", serif;\n  --type-\(.key)-size: \(.val["$value"].fontSize | rtrimstr("px"))pt;\n  --type-\(.key)-lh: \(.val["$value"].lineHeight);"),
  "",
  "  /* === Radius === */",
  (.radius | to_entries[] | "  --radius-\(.key): \(.value["$value"] | rtrimstr("px"))pt;"),
  "",
  "  /* === Space === */",
  (.space | to_entries[] | "  --space-\(.key): \(.value["$value"] | rtrimstr("px"))pt;"),
  "}"
]
| .[]
' "$TOKENS_JSON" > "$TOKENS_CSS"

echo "Wrote $(wc -l < "$TOKENS_CSS") lines to $TOKENS_CSS"
