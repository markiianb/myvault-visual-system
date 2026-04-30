---
type: plan
status: proposal
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [visual-system, tokens, dtcg, figma, extraction, phase-1]
summary: "Detailed plan for saving MyVault design tokens from Figma into the vault. Confirms the live Figma inventory (37 variables + 12 text styles + 5 gradient paint styles + 0 effect styles), pins W3C DTCG v1.0 as the format, locks one canonical file at 10-Brand/visual-system/tokens/brand.tokens.json, defines per-type encoding rules (color, dimension, typography composite, gradient composite, alias), specifies how Figma round-trip metadata is preserved via $extensions, and pins extraction to figma_execute (no myvault-tools). Includes 7 open decisions Mark must approve before execution."
predecessors:
  - "[[visual-system-architecture-v2]]"
  - "[[visual-system-pipeline-plan]]"
  - "[[03-brand-design-vs-ui-system]]"
---

# Token Storage Plan — saving MyVault design tokens from Figma

> **Status:** Proposal — awaiting Mark's review on §13 before execution.
> **Date:** 2026-04-29
> **Goal:** persist every design token that lives in Figma today as a versioned, agent-readable, human-inspectable W3C DTCG file inside `10-Brand/visual-system/tokens/`. No renderers, no `myvault-tools/` work, no derived outputs (`.css`, `.ts`, etc.) — that's all later.

---

## 1. Goal in one paragraph

Take the canonical brand source (Figma file `Pm31BDHj34WjJ7NjBK4Ady` — "MyVault — Brand Design System") and produce **one canonical machine-readable token file** in the vault. The file must capture every variable, every gradient paint style, and every text style verbatim, with enough Figma round-trip metadata (variable IDs, library keys, scopes, gradient transforms) that we can later push back, regenerate downstream outputs, or detect drift. After this plan ships, every chunk in the visual-system can declare `token_dependencies:` against well-known token paths, and every future renderer can read one file.

---

## 2. Confirmed Figma inventory (live, 2026-04-29)

Pulled via `figma-console` MCP + `figma_execute`. Source-of-truth snapshot.

### 2.1 Variables — 37 in collection `MyVault Tokens`, 1 mode (`Mode 1`)

**Spacing (14 FLOAT, scope `WIDTH_HEIGHT, GAP`)**

| Name | px | Name | px | Name | px |
|---|---|---|---|---|---|
| space/0 | 0 | space/5 | 20 | space/16 | 64 |
| space/1 | 4 | space/6 | 24 | space/20 | 80 |
| space/2 | 8 | space/8 | 32 | space/24 | 96 |
| space/3 | 12 | space/10 | 40 | space/32 | 128 |
| space/4 | 16 | space/12 | 48 | | |

The token *number* tracks `px ÷ 4` for most stops (space/4 = 16px), with stops dropped where the design doesn't need them. Naming is not a strict math relationship past `space/8`, so we treat it as a label, not a formula.

**Radius (9 FLOAT, scope `CORNER_RADIUS`)**

| Name | px | Name | px | Name | px |
|---|---|---|---|---|---|
| radius/none | 0 | radius/lg | 8 | radius/3xl | 24 |
| radius/xs | 2 | radius/xl | 12 | radius/full | 999 |
| radius/sm | 4 | radius/2xl | 16 | | |
| radius/md | 6 | | | | |

`radius/full = 999` is a "fully rounded" sentinel.

**Color (14 COLOR, scope `FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR`)**

| Group | Name | Hex |
|---|---|---|
| core | teal | `#094545` |
| core | white | `#FFFFFF` |
| core | off-white | `#FBFAF5` |
| core | gray-01 | `#DDDCD6` |
| core | gray-02 | `#696969` |
| core | black | `#000000` |
| secondary | premium-purple | `#781C42` |
| secondary | dark-earth | `#502C0E` |
| secondary | rich-blue | `#1C4778` |
| signal | go | `#69DE49` |
| signal | stop | `#E75247` |
| signal | sky | `#4D80E6` |
| signal | earth | `#928178` |
| icon | default | → alias to `color/core/black` |

### 2.2 Paint styles — 5 gradients (all `GRADIENT_LINEAR`, all share the same diagonal transform)

| Style | Stops |
|---|---|
| gradient/primary | 2 stops: `#EFEBF5 → #E0E8E6` (ends at 65%) |
| gradient/cool | 3 stops: `#FAFAFA → #EFF0F4 (65%) → #D0D3DF` |
| gradient/warm | 4 stops: `#FBF5F5 → #F2F2F0 (52%) → #E6DDDD (78%) → #E7DCD5` |
| gradient/mist | 4 stops: `#FBF5F5 → #F2F0F0 (50%) → #E6DDDD (75%) → #DAD2DF` |
| gradient/greydient | 4 stops: `#FBF7F5 → #FAF6F5 (45%) → `#E0D2CE (75%) → `#9FBCBC` |

(Hex values are converted from Figma's RGB floats — full float fidelity preserved in `$extensions`.)

### 2.3 Text styles — 12 (Lato + PT Serif, Regular only)

| Name | Family | Style | Size | Line height | Letter spacing |
|---|---|---|---|---|---|
| display/xxl | PT Serif | Regular | 160 | 105% | 0 |
| display/xl | PT Serif | Regular | 120 | 110% | 0 |
| display/l | PT Serif | Regular | 96 | 110% | 0 |
| display/m | PT Serif | Regular | 72 | 115% | 0 |
| display/s | PT Serif | Regular | 56 | 115% | 0 |
| heading/l | PT Serif | Regular | 40 | 125% | 0 |
| heading/m | PT Serif | Regular | 28 | 130% | 0 |
| body/xl | Lato | Regular | 20 | 140% | 0 |
| body/l | Lato | Regular | 18 | 155% | 0 |
| body | Lato | Regular | 16 | 150% | 0 |
| body/s | Lato | Regular | 14 | 150% | 0 |
| caption | Lato | Regular | 12 | 150% | 0 |

### 2.4 Effect styles & grid styles — 0

No published shadow tokens, no published grid styles. Worth noting: the visual-system canon already pins "no shadows by default" so this is consistent. We won't *invent* effect tokens here — when shadows arrive, they'll be added in Figma first and re-extracted.

**Net token count to persist: 37 + 5 + 12 = 54 atoms** plus 1 alias.

---

## 3. Where the file lives (path locked by [[03-brand-design-vs-ui-system]])

```
10-Brand/
└── visual-system/
    └── tokens/
        ├── brand.tokens.json        ← canonical W3C DTCG output
        ├── extract.figma.js         ← committed extraction snippet (re-runnable)
        ├── extract.log.json         ← timestamped extraction history
        └── README.md                ← what's here, how it's regenerated, drift policy
```

No `10-Brand/tokens/` at the top level. No `myvault-tools/brand-studio/`. Vault-only.

---

## 4. Format — W3C DTCG v1.0 (October 2025 stable)

**Why:** every modern token tool (Style Dictionary v4, Tokens Studio, Specify, Supernova, future Figma Variables export) consumes DTCG. Pinning early means no rewrite when we eventually add renderers. The verbal `visual-system-architecture-v2.md` already pinned this; this plan honors it.

**DTCG basics we use:**
- Each token is `{ "$value": ..., "$type": ..., "$description": "..." }`
- Composite tokens (`typography`, `gradient`, `shadow`) wrap multiple sub-values inside `$value`
- Aliases use curly-brace dot paths: `"$value": "{color.core.black}"`
- Vendor metadata lives under `$extensions.<reverse-dns-namespace>` — we use `com.myvault.figma`

**DTCG types we'll emit:**
- `color` — colors (hex strings)
- `dimension` — spacing + radius (px strings)
- `typography` — composite (fontFamily / fontWeight / fontSize / lineHeight / letterSpacing)
- `gradient` — composite (array of stops, each with color + position)

---

## 5. File structure — single canonical file

**Decision:** one merged `brand.tokens.json`. No per-category split files.

**Why:**
- DTCG tools (Style Dictionary, Tokens Studio) prefer one file
- Chunk frontmatter references *paths* (`color.core.teal`), not file names — so a merge gives one thing to load
- 54 tokens fit comfortably in one file (<8 KB pretty-printed)
- A future split (per-category files) is trivial — just walk the tree
- Splitting now adds an aggregation step nobody's asked for

The file is structured as a deeply-nested object that mirrors Figma's slash-separated names:

```jsonc
{
  "$schema": "https://design-tokens.org/schemas/v1.0.json",
  "$description": "MyVault brand design tokens, extracted from Figma",
  "$extensions": {
    "com.myvault.figma": {
      "fileKey": "Pm31BDHj34WjJ7NjBK4Ady",
      "fileName": "MyVault — Brand Design System",
      "collectionId": "VariableCollectionId:1:4",
      "collectionName": "MyVault Tokens",
      "extractedAt": "2026-04-29T...Z",
      "extractedBy": "figma_execute via figma-console MCP",
      "modes": [{ "id": "1:0", "name": "Mode 1", "isDefault": true }]
    }
  },
  "color": {
    "core":      { "teal": { ... }, "white": { ... }, ... },
    "secondary": { ... },
    "signal":    { ... },
    "icon":      { "default": { ... } }
  },
  "space":     { "0": { ... }, "1": { ... }, ... },
  "radius":    { "none": { ... }, "xs": { ... }, ... },
  "typography": {
    "display": { "xxl": { ... }, "xl": { ... }, ... },
    "heading": { "l": { ... }, "m": { ... } },
    "body":    { "xl": { ... }, "l": { ... }, "default": { ... }, "s": { ... } },
    "caption": { ... }
  },
  "gradient": {
    "primary":   { ... },
    "cool":      { ... },
    "warm":      { ... },
    "mist":      { ... },
    "greydient": { ... }
  }
}
```

Note: Figma's flat `body` text style becomes `typography.body.default` to keep the tree consistent with the xl/l/s sizes. Documented in the README.

---

## 6. Per-type encoding rules

### 6.1 Color (`$type: "color"`)

```jsonc
"teal": {
  "$value": "#094545",
  "$type": "color",
  "$description": "Vault Teal — primary brand color. Reserved for hero use; never for body/title text.",
  "$extensions": {
    "com.myvault.figma": {
      "id": "VariableID:1:28",
      "key": "cf910111683fd81e50c6dda0db5f836a5cb8ae1c",
      "scopes": ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"],
      "rgba": { "r": 0.0353, "g": 0.2706, "b": 0.2706, "a": 1 }
    }
  }
}
```

- `$value` is uppercase hex `#RRGGBB` (or `#RRGGBBAA` if alpha < 1; none of ours have that today)
- `rgba` preserved for full float fidelity (Figma's source values)
- `scopes` preserved for round-trip (Figma uses these to filter the variable picker)
- `$description` is hand-curated for the few load-bearing colors (Vault Teal especially), empty string otherwise — Mark fills these in Phase 1.3 when chunks are written

### 6.2 Aliases (`color/icon/default → color/core/black`)

```jsonc
"icon": {
  "default": {
    "$value": "{color.core.black}",
    "$type": "color",
    "$description": "Default icon color. Aliased to core/black; change here to retheme all icons.",
    "$extensions": {
      "com.myvault.figma": {
        "id": "VariableID:10:120",
        "key": "c446ff9311c44f99b01d42a4f484058d5cc7d5cc",
        "aliasOf": "VariableID:1:33"
      }
    }
  }
}
```

DTCG resolves `{color.core.black}` at consumer time. We preserve the Figma alias chain in `$extensions` for round-trip.

### 6.3 Dimension — spacing + radius (`$type: "dimension"`)

```jsonc
"4": {
  "$value": "16px",
  "$type": "dimension",
  "$extensions": {
    "com.myvault.figma": {
      "id": "VariableID:1:9",
      "key": "7e91ef95629bc1ffa7bdcc66f83cdaaf14a53f0e",
      "scopes": ["WIDTH_HEIGHT", "GAP"],
      "raw": 16
    }
  }
}
```

- `$value` is a px string (DTCG's canonical dimension form)
- `raw` numeric preserved for math (renderers that don't want to parse "16px")
- `radius/full = 999` ships as `"$value": "999px"` with `$description: "Sentinel for fully rounded corners; consume as 9999px+ in CSS contexts."`

### 6.4 Typography (composite `$type: "typography"`)

```jsonc
"xxl": {
  "$value": {
    "fontFamily": "PT Serif",
    "fontWeight": 400,
    "fontSize": "160px",
    "lineHeight": 1.05,
    "letterSpacing": "0%"
  },
  "$type": "typography",
  "$description": "Display XXL — reserved for hero divider words (e.g., the 144pt teal divider rule).",
  "$extensions": {
    "com.myvault.figma": {
      "styleKey": "2535d8b2960c163c768d6a48762e2bcd37a69586",
      "fontStyleLiteral": "Regular",
      "lineHeightSource": { "unit": "PERCENT", "value": 105 },
      "letterSpacingSource": { "unit": "PERCENT", "value": 0 }
    }
  }
}
```

Decisions encoded:
- **`fontWeight: 400`** — DTCG canonical numeric weight for "Regular". Literal `"Regular"` preserved in `$extensions.fontStyleLiteral` for Figma round-trip and for renderers like Marp/Satori that want the literal style name.
- **`lineHeight` as unitless number** (1.05 = 105%). DTCG-idiomatic; CSS-friendly. Source percent retained in `$extensions`.
- **`letterSpacing` as `"0%"`** even when zero, for completeness and for DTCG validation.
- **`fontSize` as `"160px"`**, not pt or rem — Figma's source unit is pixels, and our reviewer rule "no body under 18pt" lives in the chunks, not in the token.

### 6.5 Gradients (composite `$type: "gradient"`)

```jsonc
"primary": {
  "$value": [
    { "color": "#EFEBF5", "position": 0 },
    { "color": "#E0E8E6", "position": 0.65 }
  ],
  "$type": "gradient",
  "$description": "Soft lavender → soft mint. Used on hero backgrounds for emphasis sections.",
  "$extensions": {
    "com.myvault.figma": {
      "styleKey": "e7756d9f670a9bc3325f9900128757866267dd96",
      "type": "GRADIENT_LINEAR",
      "transform": [[-4.371e-8, 1, 1.682e-8], [-1, -4.371e-8, 0.9421]],
      "rawStops": [
        { "rgba": { "r": 0.9373, "g": 0.9216, "b": 0.9608, "a": 1 }, "position": 0 },
        { "rgba": { "r": 0.8784, "g": 0.9098, "b": 0.9020, "a": 1 }, "position": 0.65 }
      ]
    }
  }
}
```

DTCG gradient is still in the spec's **draft** type list, but the shape is settled. We adopt the array-of-stops shape every major tool (Tokens Studio, Style Dictionary v4) consumes.

---

## 7. `$extensions` policy — preserve everything for round-trip

Every token carries `$extensions.com.myvault.figma` with:

| Field | When | Why |
|---|---|---|
| `id` | every variable | round-trip, drift detection |
| `key` | every variable + style | library publish key (cross-file references) |
| `scopes` | every variable | round-trip Figma's variable-picker filtering |
| `aliasOf` | aliases only | preserve alias chain |
| `raw` | dimensions | numeric form for math-heavy renderers |
| `rgba` | colors | full float fidelity |
| `transform`, `rawStops` | gradients | exact reproduction |
| `fontStyleLiteral`, `lineHeightSource`, `letterSpacingSource` | typography | preserve Figma's source unit & literal style name |

Cost: ~2× JSON file size. Benefit: lossless. We pay this cost.

---

## 8. Mode handling

Today: 1 mode (`Mode 1`). The default mode ID is `1:0`.

**Plan:** every token's `$value` is the *Mode 1 value*. The `$extensions.com.myvault.figma.modes` field at the file root captures all modes. When a second mode arrives (e.g., dark mode), we'll switch to DTCG's `$value` as a per-mode object — that's a non-breaking schema evolution and we'll write a separate plan when it happens.

Until then: don't pre-build a multi-mode shape we don't have data for.

---

## 9. Extraction mechanism — `figma_execute` via the figma-console MCP

The locked scope says no `myvault-tools/`. So extraction is **not a Node script in `myvault-tools/`**. It's a JS snippet that runs in Figma's plugin context via `figma_execute`, returning a JSON blob that Claude writes to `tokens/brand.tokens.json` using `Write`.

### 9.1 The extraction snippet (embedded in README)

The JS that runs in `figma_execute` is **embedded as a fenced `js` code block inside `tokens/README.md`** — not committed as a standalone `.js` file. Reasoning: the snippet's only runtime is the MCP, so a standalone file would be dead code that can't be `node`-run anyway. Embedding it in the README puts the runnable text and the operator guide in one place, eliminates drift between "the file on disk" and "what we actually ran", and makes the README the single durable record of how tokens are produced. Re-running in a future session means: open Desktop Bridge, copy the snippet block from `tokens/README.md`, paste into `figma_execute`, write the returned JSON to `brand.tokens.json`, append to `extract.log.json`.

The snippet is responsible for:
1. Reading the `MyVault Tokens` collection via `figma.variables.getLocalVariableCollectionsAsync()`
2. Reading every variable, resolving aliases to leaf values, preserving alias chains
3. Reading `getLocalPaintStylesAsync()` and filtering to gradient styles
4. Reading `getLocalTextStylesAsync()`
5. Building the DTCG-shaped object exactly as §5–§6 specify
6. Returning the object as the function's `return` value (`figma_execute` serializes it for us)

The snippet is **deterministic**: re-running on the same file state produces byte-identical output (we sort keys alphabetically before serialization).

### 9.2 The extraction log

`extract.log.json` records every run:

```jsonc
{
  "runs": [
    {
      "timestamp": "2026-04-29T...Z",
      "fileKey": "Pm31BDHj34WjJ7NjBK4Ady",
      "tokenCount": 54,
      "varCount": 37,
      "paintStyleCount": 5,
      "textStyleCount": 12,
      "diff": null
    }
  ]
}
```

On re-run, the snippet (or a tiny diff helper) computes the delta against the previous canonical JSON and records `diff` as a structured summary (additions, removals, value changes). This is **stretch scope** for Phase 1 — the first run records `diff: null` and we manually inspect git diff. Automated drift detection is on the roadmap once myvault-tools work begins.

### 9.3 Why not figma-remote MCP?

`figma-remote get_variable_defs` only returns variables consumed by a queried node. It can't list a whole collection. `figma-console` + `figma_execute` runs in the plugin sandbox with full Plugin API access — we get everything in one round-trip.

---

## 10. Validation — manual now, automated later

Phase 1: **eyeball the JSON, check `git diff` on re-runs, validate against the DTCG schema URL declared in `$schema` only when a tool consumes it.**

We do not install AJV, jsonschema, or any validator in the vault. When myvault-tools comes online, we wire validation into CI there.

Manual validation checklist for the first run:
- [ ] `$schema` and `$description` at root
- [ ] `$extensions.com.myvault.figma` at root with all six metadata fields
- [ ] 14 colors + 14 spacing + 9 radius + 12 typography + 5 gradient + 1 alias = 55 entries
- [ ] Every entry has `$value`, `$type`, `$extensions.com.myvault.figma`
- [ ] Alias `color.icon.default` resolves to `color.core.black` (curly-brace path)
- [ ] No raw RGB floats in `$value` — only hex strings
- [ ] No `null`, `undefined`, or `"TODO"` values
- [ ] File is sorted, idempotent — re-running produces byte-identical output

---

## 11. Companion files — what this plan DOES produce

| File | What | Owner |
|---|---|---|
| `tokens/brand.tokens.json` | Canonical DTCG output | produced by snippet, written by Claude |
| `tokens/extract.log.json` | Run history with per-element added/removed/changed records | appended on each run |
| `tokens/README.md` | Operator guide + the extraction snippet embedded as a fenced `js` block (the runnable input to `figma_execute`) | hand-written |

Total: 3 files. All inside `10-Brand/visual-system/tokens/`.

---

## 12. Companion files — what this plan does NOT produce (out of scope)

- `tokens.css`, `tokens.ts`, `tokens.typ`, `tailwind.tokens.js`, `marp.theme.css`, `vega.config.json` — every derived format. **All deferred until myvault-tools work begins.** Style Dictionary or equivalent will read `brand.tokens.json` and emit them.
- A `figma_setup_design_tokens` push-back from JSON to Figma. Sync is one-way (Figma → JSON) until further notice.
- DTCG schema-validation tooling.
- Drift-detection tooling beyond the simple log + git-diff workflow.
- Any chunk content. Token-binding via chunk frontmatter (`token_dependencies:`) is Phase 1.3, separate from this plan.
- Effect/shadow tokens. None in Figma → none in the file. Add them upstream first, re-extract.

---

## 13. Open decisions for Mark (please review before execution)

These are the seven questions where I've made a call but want explicit confirmation. Each has my recommendation.

### Q1 — Single canonical file vs split-by-category?

**Recommend single** (`brand.tokens.json`, ~6–8 KB). Splitting adds an aggregation step nobody is currently asking for. Style Dictionary and Tokens Studio both prefer single files. If you ever want per-category, we generate them — they're never sources.

### Q2 — Preserve full Figma round-trip metadata in `$extensions`?

**Recommend yes** (variable IDs, library keys, scopes, raw RGB floats, gradient transforms, original Figma style key, original line-height percent unit, literal `"Regular"` font style). Doubles file size to ~14 KB, lossless.

### Q3 — fontWeight as DTCG-numeric (`400`) or Figma-literal (`"Regular"`)?

**Recommend numeric `400` in `$value`**, literal `"Regular"` preserved in `$extensions.fontStyleLiteral`. DTCG-idiomatic for `$value`, Figma-faithful for round-trip.

### Q4 — lineHeight as unitless (`1.05`) or percent string (`"105%"`)?

**Recommend unitless `1.05`** in `$value` (DTCG-idiomatic, CSS-friendly). Source percent retained in `$extensions.lineHeightSource`.

### Q5 — Where does the extraction snippet live? *(resolved 2026-04-29)*

**Embedded in `tokens/README.md` as a fenced `js` code block.** Mark's call: a standalone `.js` file is dead code (only runtime is `figma_execute` via MCP) and would create drift risk between disk and what-actually-ran. README-embedded keeps the runnable input and the operator guide in one place.

### Q6 — Treat `radius/full = 999` as a sentinel?

**Recommend yes**, ship as `"$value": "999px"` with `$description` noting the meaning. Renderers will treat it specially when consuming.

### Q7 — Hand-curate the `$description` field for load-bearing tokens now or later?

**Recommend later** — leave `$description` empty in the first extraction. Fill it during chunk hydration (Phase 1.3) when we're already writing the prose for color/typography/gradient chunks. Doing it twice is waste; doing it now without the chunk context is shallow.

---

## 14. Concrete deliverables when this plan is approved

1. `10-Brand/visual-system/tokens/brand.tokens.json` — the canonical DTCG file produced by running the snippet via `figma_execute`
2. `10-Brand/visual-system/tokens/extract.log.json` — first run record with per-element added/removed/changed log
3. `10-Brand/visual-system/tokens/README.md` — operator guide with the extraction snippet embedded as a fenced `js` block

Total: 3 files. Single PR-equivalent change to the vault.

---

## 15. Order of operations on Mark's "go"

1. Confirm Q1–Q7 (or amend my recommendations).
2. Run the extraction snippet via `figma_execute` — capture the returned DTCG object.
3. Write `tokens/brand.tokens.json` from the captured output.
4. Write `tokens/extract.log.json` — first run record (every element listed under `added`).
5. Write `tokens/README.md` with the snippet embedded.
6. Manual validation pass against §10 checklist.
7. Mark eyeballs the JSON, accepts or asks for round 2.
8. Ship the change to the vault (commit when Mark says).

Estimated time: ~45–60 minutes of execution after approval, single session.

---

## 16. What this unlocks

- Every future visual-system chunk can declare `token_dependencies: [color.core.teal, typography.display.xxl, ...]` against well-known paths.
- Every future renderer (Marp / Satori / Typst / Vega-Lite / React Email / Tailwind v4) reads one canonical file. Style Dictionary handles the per-renderer transforms when myvault-tools starts.
- Drift between Figma and the vault becomes a `git diff` away.
- Adding a second mode (dark, brand variants) is a non-breaking schema evolution; the `modes` registry is already in `$extensions`.
- The vault becomes the answer to "what colour is Vault Teal?" — durable, agent-readable, version-controlled.

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial — confirms Figma inventory, pins DTCG single-file shape, defines per-type encoding, locks vault-only extraction via `figma_execute`. Awaits Mark's review on 7 open decisions. | Claude (Opus 4.7) with Mark |
