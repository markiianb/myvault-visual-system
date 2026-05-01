---
chunk_id: stat-infographic
domain: chunks
subcategory: asset-type
type: chunk
status: active
version: "1.0"
last_updated: 2026-05-01
owner: mark
summary: "Asset-type chunk for stat-infographic deliverables — multi-column icon + big-number + caption layouts framed by a 2px signal-go OUTSIDE border with a signal-go full-width divider above a footer band carrying a small icon and a PT Serif 18pt title in signal-go. Used as a standalone deliverable (social tile, blog asset, web embed) and as an editorial primitive embedded inside ebook PDFs. 5 HARD rules (R-STAT-001..005) covering frame geometry + signal-go OUTSIDE border, the column triplet of icon + stat + caption, the signal-go divider + footer band format, the closed signal-go reservation (no other accent colors compete), and the icon-must-be-Phosphor-fill-signal-go semantics. BASE rules cover typography per role (icon 48; PT Serif Regular 28pt @ 120% LH stat; Lato Regular 16pt @ 140% LH caption; PT Serif Regular 18pt footer title; Lato Regular caption-tier rare uses), surface palette (white default; off-white alternate), column counts (3-up default; 2-up and 4-up valid). MENU catalog of column-count variants. Renderer pinned to a JSON-spec + SVG composer (extends the chart pipeline pattern); chart renderer at renderers/vega-lite/compose.mjs gains a composeStatInfographic() function. Reviewer integration: stat-infographic-reviewer for HARD enforcement."
token_count_estimate: 1100

# === RENDERER PINNING ===
renderer: svg-composer
spec_format: json
template_path: renderers/vega-lite/compose.mjs   # shared composer; per-type function (composeStatInfographic)
output_formats: [svg, png, pdf]
renderer_status: active
renderer_note: "JSON fixture + Node SVG composer. Same toolchain as chart.md — compose.mjs picks the per-type composer by `type` field. The renderer directory name (vega-lite) is historical; the composer is generic SVG with optional Vega-Lite for data-viz inner plots."

# === FOUNDATIONS THIS CHUNK INHERITS FROM ===
inherits_from_foundations:
  - color
  - typography
  - iconography

# === TOKENS + ASSETS CONSUMED ===
token_dependencies:
  - color.signal.go         # the load-bearing accent — border, divider, footer icon + title
  - color.core.white        # default body fill
  - color.core.off-white    # alternate body fill
  - color.core.black        # default text color (stat values)
  - color.core.gray-02      # caption color
  - typography.heading.m    # PT Serif 28pt — stat values
  - typography.body         # Lato 16pt — captions
  - typography.heading.s    # PT Serif 18pt — footer title (named alias for the 18pt PT Serif tier)
  - space.*                 # padding 48/56; gap 40/20/12; divider 2px
asset_dependencies:
  - "@phosphor-icons/core"  # via npm; weights: regular (column icons) + fill (footer icon)

# === VISUAL CANON (Figma) ===
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "70:8479"
  pageName: "Diagrams"
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8598"
  reference_examples:
    - { nodeId: "70:8598", what: "Stat Infographic — 3-up canonical (1240×294 outer; 2px signal-go OUTSIDE stroke; 3 columns of icon-fill-signal-go + PT Serif 28pt stat + Lato 16pt caption; 2px signal-go divider; footer band with icon-fill-signal-go 24px + PT Serif Regular 18pt title in signal-go)" }

# === REVIEWER AXES ===
review_axes:
  - stat-infographic-reviewer
  - color-reviewer
  - typography-reviewer
  - brand-element-reviewer
  - accessibility-reviewer

# === DELIVERABLE METADATA ===
asset_type: stat-infographic
typical_use:
  - "social tiles announcing multi-stat product / market / cohort findings"
  - "blog post inline visual summarizing a study or report"
  - "ebook page primitive (single-row 3-stat band that's visually distinct from hero-stats)"
  - "presentation slide content (closing-stat band on a Statement-style slide)"
  - "internal report headline graphic"

# === CROSS-REFS ===
related_chunks:
  - ebook
  - presentation
  - chart
  - social
related_memories:
  - feedback_no_uppercase_eyebrows
  - feedback_regular_weight_only
  - feedback_myvault_fonts_lato_primary
  - feedback_chunk_size_placement_pins
  - feedback_white_is_default_surface

# === FOUNDATION OVERRIDES ===
foundation_overrides: []  # No foundation rule is overridden. R-COLOR-003 (signal colors for status only) is consistent with this chunk's signal-go usage — the green border / divider / footer signal completion / positive-result, which IS structural / status semantics.
---

# Stat infographic

## Purpose & scope

This chunk governs every stat-infographic deliverable: 1240×294 (or wider) cards with 2 or 3 or 4 columns of icon + big-number stat + caption, framed by a 2px signal-go OUTSIDE border with a signal-go horizontal divider above a footer band that carries a small Phosphor icon and a PT Serif 18pt title in signal-go.

The shape is **distinct from charts** (no data axes, no plot region, no comparative palette) and **distinct from `hero-stats`** (the editorial primitive in `myvault-editorial.typ`, which is an inline ebook panel without the signal-go border signature).

It serves as:
- A **standalone deliverable** — social tile, blog asset, web embed.
- An **editorial primitive embedded into an ebook page or presentation slide** — see Workflow integration.

## Tokens + assets consumed

This chunk pulls from foundation tokens + Phosphor icons. It does not introduce new tokens.

| Source | What it provides |
|---|---|
| `tokens/brand.tokens.json` → `color.signal.go`, `color.core.*`, `typography.*`, `space.*` | Every value used |
| `@phosphor-icons/core` (npm) → `assets/regular/<icon>.svg` | Column icons (Phosphor Regular weight, default 48 × 48, fill `color.signal.go`) |
| `@phosphor-icons/core` (npm) → `assets/fill/<icon>-fill.svg` | Footer icon (Phosphor Fill weight, 24 × 24, fill `color.signal.go`) |

## Asset specs (universal foundation)

Every stat-infographic is built on the same shape:

- **Outer frame:** width per variant (1240 default; can scale wider for 4-up); height auto from content
- **Outer fill:** `color.core.white` (default) or `color.core.off-white` (alternate)
- **Outer stroke:** **2 px `color.signal.go` OUTSIDE** (this is the load-bearing brand signature — see R-STAT-001)
- **Outer cornerRadius:** 0 (flat)
- **Body padding:** `48 / 56 / 48 / 56` (top / right / bottom / left)
- **Body layout:** HORIZONTAL auto-layout; gap 40; n columns; FILL distribution
- **Divider:** 2 × full-card-width fill `color.signal.go` between body and footer
- **Footer band:** padding `14 / 20 / 14 / 20`; HORIZONTAL gap 12; icon + title row

Codified as R-STAT-001..005.

## Severity tiers

This chunk uses three tiers — same convention as `chart.md` and `ebook.md`:

- **HARD** — non-negotiable. Reviewer agents reject violations. Each carries a stable ID (`R-STAT-NNN`) and a machine-checkable predicate.
- **BASE** — defaults that apply unless the deliverable spec says otherwise. Document the deviation in the spec.
- **MENU** — choose-one alternatives from the kit catalog. **No wrong answer**; reviewers do not reject MENU choices.

## HARD rules

### R-STAT-001 — Signal-go OUTSIDE border + signal-go divider are mandatory and load-bearing
- **Spec:** Every stat-infographic carries (a) a **2 px `color.signal.go` OUTSIDE stroke** around the entire outer frame, and (b) a **2 × full-width `color.signal.go` rectangle** as a horizontal divider between the body block and the footer band. Both are mandatory.
- **Rationale:** The signal-go double-signature (border + divider) is what makes a stat-infographic visibly distinct from a chart-card or a hero-stats panel. Remove either and the asset reads as something else — a generic stat panel, an editorial card, a chart with stats. Keep both and the asset is unmistakable as MyVault's stat-infographic.
- **Allowed deviation:** None at the chunk level. The closest valid alternative is the `hero-stats` editorial primitive (no border, no divider) which has its own contract in `ebook.md`.
- **Check:** any stat-infographic without the 2 px signal-go OUTSIDE stroke OR without the 2 × full-width signal-go divider → reject. Any stat-infographic with the border in a color other than signal-go → reject.

### R-STAT-002 — Column triplet: icon + big-stat + caption, in that order, no exceptions
- **Spec:** Each column in the body block contains exactly three elements stacked VERTICAL gap 20:
  1. **Icon** — Phosphor Regular weight, 48 × 48, fill `color.signal.go`
  2. **Stat value** — PT Serif Regular **28 pt** @ 120% LH, color `color.core.black` (or `color.core.white` on dark surface), LEFT-aligned
  3. **Caption** — Lato Regular **16 pt** @ 140% LH, color `color.core.gray-02`, LEFT-aligned
- **Rationale:** The triplet is the asset's vocabulary. Reordering (caption-stat-icon, stat-icon-caption, etc.) breaks the read order. Removing the icon turns the asset into a typographic stat card; removing the caption turns it into a generic stat block. The triplet is what distinguishes the stat-infographic.
- **Allowed deviation:** Caption may be omitted on extremely tight layouts (4-up at narrow widths) — document in spec. Icon may not be omitted.
- **Check:** any column missing the icon → reject. Any column whose order is not icon-stat-caption (top to bottom) → reject. Any stat value typeset in something other than PT Serif Regular 28pt → reject. Any caption typeset above 16pt or below 14pt → reject.

### R-STAT-003 — Footer band format
- **Spec:** The footer band sits below the signal-go divider with padding `14 / 20 / 14 / 20`, HORIZONTAL gap 12, counter `CENTER`. It contains exactly two elements:
  1. **Footer icon** — Phosphor **Fill** weight, 24 × 24, fill `color.signal.go`
  2. **Footer title** — PT Serif Regular **18 pt** auto LH, fill `color.signal.go`, LEFT-aligned
- **Rationale:** The footer band carries the asset's identity ("MyVault · Onboarding stats"). The fill-weight icon mirrors the regular-weight column icons for hierarchical contrast, and the signal-go-on-white type closes the signal-go signature established by the border + divider.
- **Allowed deviation:** Footer title content is editorial; the chunk does not constrain wording. The `·` separator pattern ("MyVault · <topic>") is a strong default but not enforced.
- **Check:** any footer band whose icon is not Phosphor Fill 24px in signal-go → reject. Any footer title set in a font other than PT Serif Regular 18pt → reject. Any footer title color other than signal-go → reject. Any footer band that omits either the icon or the title → reject.

### R-STAT-004 — Closed signal-go reservation: no competing accents within the asset
- **Spec:** Within a stat-infographic, no color other than `color.signal.go` may appear as an accent / fill / stroke on:
  - The outer border
  - The horizontal divider
  - The column icons
  - The footer icon
  - The footer title text
- **Rationale:** The stat-infographic is a single-accent asset. Adding teal accents, comparative-palette accents, or any other signal color (stop / sky / earth) competes with the signal-go signature and dilutes the brand reading. The closed reservation makes the signal-go choice load-bearing — every signal-go element earns its presence.
- **Allowed deviation:** None. If the data calls for a color other than signal-go (e.g., declining stats), use a chart instead.
- **Check:** any of the listed elements rendered in a color other than signal-go → reject. Any column body containing additional decorative color elements → reject.

### R-STAT-005 — Phosphor only; weight follows position
- **Spec:** Every icon in a stat-infographic is a Phosphor icon. Column icons use **Phosphor Regular** weight (48 × 48). The footer icon uses **Phosphor Fill** weight (24 × 24). Mixing weights between positions is forbidden.
- **Rationale:** R-ICON binds across the visual system; this chunk codifies the per-position weight selection so reviewers can enforce it without inferring.
- **Cross-check with R-ICON:** R-ICON-001 binds family (Phosphor only); this rule binds weight per position. No conflict.
- **Check:** any column icon that is not Phosphor Regular → reject. Any footer icon that is not Phosphor Fill → reject. Any non-Phosphor SVG used as an icon in this asset → reject.

## BASE rules

### Default typography per role

| Role | Default | Notes |
|---|---|---|
| Stat value | PT Serif Regular **28 pt** @ 120% LH, LEFT, surface-paired (black on light; white on dark) | The hero number — sized for legibility in social-tile and blog-embed contexts |
| Caption | Lato Regular **16 pt** @ 140% LH, LEFT, gray-02 (gray-01 on dark surface) | One sentence; one idea |
| Footer title | PT Serif Regular **18 pt**, LEFT, signal-go | The asset's identity tag |
| Footer icon size | **24 × 24** | Smaller than column icons by design — hierarchy |
| Column icon size | **48 × 48** | The hero icon for each stat |

### Surface palette

| Surface | Token | Typical use | Notes |
|---|---|---|---|
| White (default) | `color.core.white` | Standalone tiles; ebook embeds; most uses | Default per `feedback_white_is_default_surface` |
| Off-white | `color.core.off-white` | When the surrounding context is white and the infographic should sit slightly forward | Used sparingly |

Dark surfaces (teal, black, premium-purple) are **not valid** for this asset. The signal-go border + divider + footer signature reads cleanly on light surfaces only — on dark, the green-on-dark contrast shifts the asset into a different register that conflicts with the canonical read. If a dark-register stat moment is needed, use the radial-comparison-dramatic chart-card or a stat page (`ebook.md`) on a teal surface.

### Column count

The body block holds 2, 3, or 4 columns. The 3-up is the default canonical pattern (matching the Figma reference); 2-up and 4-up are valid alternates documented in MENU.

### Default outer width

| Column count | Outer width default | Column count fits within |
|---|---|---|
| 2-up | 960 px | The chart-card width — fits naturally inside an ebook 1-col page (when scaled) |
| **3-up (default)** | **1240 px** | Wider than chart cards — earns its standalone deliverable size; embed in ebook scales to 720 px (`measure: "wide"`) |
| 4-up | 1480 px | Widest variant; reserved for asset-heavy contexts (large screen embeds, hero-stat banners) |

## MENU — kit catalog

The Figma page `Diagrams` (id `70:8479`) holds the visual canon for the 3-up reference (`70:8598`). The 2-up and 4-up variants follow the same composition with proportional column scaling. Treat as **guidelines, not strict canon** (per `feedback_design_pages_are_guidelines`).

```yaml
variants:
  - id: stat-infographic-3up
    label: "Stat Infographic — 3-up (canonical)"
    column_count: 3
    outer_width: 1240
    use_when: "default; the canonical 3-stat balance reads cleanly in social, blog, and ebook contexts"
    figma_section: "Stat Infographic (70:8598)"

  - id: stat-infographic-2up
    label: "Stat Infographic — 2-up"
    column_count: 2
    outer_width: 960
    use_when: "before / after; problem / solution; two related stats with breathing room"
    figma_section: "(implicit — same composition with 2 columns)"

  - id: stat-infographic-4up
    label: "Stat Infographic — 4-up"
    column_count: 4
    outer_width: 1480
    use_when: "asset-heavy contexts (large screen embeds, hero-stat banners); only when each caption is short enough to fit narrower columns"
    figma_section: "(implicit — same composition with 4 columns)"
    notes: "Caption text must fit within ~280 px column width without hyphenation. If caption wraps to 3+ lines, drop to 3-up."
```

## Decision tree for the agent

When generating a stat-infographic:

```
1. Receive brief
   - Identify the data (2, 3, or 4 stats)
   - Identify the consumption mode (standalone tile | ebook embed | presentation embed | blog asset)
   - Identify the asset's identity (the footer title — "MyVault · <topic>")

2. Pick the column count from MENU (2 / 3 / 4)
   - 3-up is the default
   - 2-up for paired stats
   - 4-up only when each caption fits a narrower column

3. Pick a Phosphor icon per column
   - Choose icons that name the stat at a glance (check-circle for completion, files for storage, timer for speed)
   - All icons render in Phosphor Regular weight + signal-go fill (R-STAT-005)

4. Pick the footer icon + title
   - Footer icon: Phosphor Fill weight (different weight from column icons — hierarchy)
   - Title: "MyVault · <topic>" or similar; signal-go color

5. Apply HARD primitives
   - R-STAT-001 signal-go OUTSIDE border + signal-go divider mandatory
   - R-STAT-002 column triplet icon + stat + caption
   - R-STAT-003 footer band format
   - R-STAT-004 closed signal-go reservation
   - R-STAT-005 Phosphor weight per position

6. Apply BASE typography per role + surface

7. Verify accessibility
   - Stat value at 28pt — well above the 14pt floor
   - Caption at 16pt — above floor
   - Footer title at 18pt — above floor
   - WCAG 2.2 AA contrast: signal-go on white — pre-cleared

8. Compose JSON spec (per the schema in renderers/vega-lite/README.md)
   - Pass to compose.mjs
   - Produces SVG

9. Render
   - Standalone: rsvg-convert SVG → PNG / PDF as needed
   - Ebook embed: place SVG path in #stat-infographic() Typst primitive

10. Reviewer swarm
    - stat-infographic-reviewer: R-STAT-001..005 + BASE conformance
    - color / typography / brand-element / accessibility reviewers run their normal foundation checks
```

## Workflow integration

Charts already proved the pattern; stat-infographic uses the same.

### Pattern A — standalone tile (social, blog, web)

```bash
cd renderers/vega-lite
node compose.mjs <fixture.chart.json> <output.svg>     # composer name uses 'chart' but accepts any registered type
rsvg-convert -w 2400 -o output.png output.svg          # for raster delivery
rsvg-convert -f pdf -o output.pdf output.svg           # for print
```

### Pattern B — embedded in an ebook PDF

In `documents/<deliverable>/charts/<id>.chart.json` (yes, `charts/` is the convention even for non-charts — they're all composer fixtures):

```json
{
  "id": "onboarding-results",
  "type": "stat-infographic-3up",
  ...
}
```

In `spec.typ`:

```typst
#import "../../renderers/typst/myvault-editorial.typ": *

#stat-infographic("/documents/<deliverable>/charts/onboarding-results.svg", measure: "wide")
```

The `stat-infographic()` primitive in `myvault-editorial.typ` sizes the embed to `wide` (720 pt — fits the ebook content area with breathing room), `1-col` (640 pt), or `full` (no scaling — uses the SVG's native width).

### Pattern C — embedded in a presentation slide

To be ratified when the presentation chunk's Phase 2 renderer ships. Today: render to PNG, embed at slide-image position.

## Reviewer agent integration

| Reviewer | What it checks for stat-infographic |
|---|---|
| `stat-infographic-reviewer` | All R-STAT-001..005. Border presence + color + 2px width; divider presence + color + 2px height; column triplet order; column icon Phosphor Regular 48px signal-go fill; footer icon Phosphor Fill 24px signal-go; footer title PT Serif Regular 18pt signal-go; closed signal-go reservation; no competing accents. Cites violations as `R-STAT-NNN at column N` or `at footer`. |
| `color-reviewer` | Foundation R-COLOR-001..010 across the asset. R-COLOR-003 (signal colors for status only) is honored — the green-border-as-signature reads as a structural marker (this asset's brand identity), not as decorative color. |
| `typography-reviewer` | Foundation R-TYPE-001..009 with the 14pt floor in effect. Stat value (28pt) and caption (16pt) and footer title (18pt) all sit above the floor. |
| `brand-element-reviewer` | R-LOGO + R-ICON. No logo is required by default. Icons follow R-ICON (Phosphor only) + R-STAT-005 (weight per position). |
| `accessibility-reviewer` | WCAG 2.2 AA contrast on every text-on-surface pair. Signal-go (#69DE49) on white at 18pt+ is pre-cleared. |

## Renderer + spec format

**Renderer:** Node SVG composer (`renderers/vega-lite/compose.mjs`). The chart renderer's compose.mjs gains a `composeStatInfographic()` function that handles the 2 / 3 / 4-up variants. The renderer pipeline is identical to charts.

**Spec format:** `.chart.json` — yes, the same extension and directory convention as charts. The composer dispatches on the `type` field. `stat-infographic-3up` (and `-2up`, `-4up`) are valid `type` values.

**Why share the chart renderer:** the SVG composition pipeline (token bridge, Phosphor icon loader, render targets, font binding) is generic. Splitting renderers per asset type would duplicate ~300 lines of infrastructure for ~50 lines of per-type logic. The directory name (`renderers/vega-lite/`) is historical — Vega-Lite is one of several inner-plot renderers the composer dispatches to; for stat-infographic, the inner plot is pure SVG layout.

**Phase 2 deliverable:** `renderers/vega-lite/compose.mjs` extended with `composeStatInfographic`. New module: `renderers/vega-lite/lib/icons.mjs` — loads Phosphor SVGs from `node_modules/@phosphor-icons/core/assets/` by `weight + name`, recolors via `currentColor` substitution.

**Renderer-agnostic note:** The chunk's HARD + BASE + MENU contract is renderer-agnostic. If the SVG composition moves to Satori (TSX → SVG) later, only Phase 2 deliverables change — the chunk does not.

## Foundation overrides

**None.** R-COLOR-003 (signal colors for status / structure only) is consistent with this chunk's signal-go usage — the green border and divider mark the asset's brand identity, which IS structural / status semantics. R-COLOR-008 (no signal-go for body or caption) is honored — the footer title in signal-go at PT Serif 18pt is a brand mark, not body text. Every R-COLOR / R-TYPE / R-ICON rule applies automatically.

## Cross-references

- **`color`** — palette, contrast, signal color semantics
- **`typography`** — type styles per role; 14pt floor binds; the named tier `typography.heading.s` (PT Serif 18pt) drives the footer title
- **`iconography`** — Phosphor only; R-STAT-005 codifies weight-per-position
- **`chart`** (sibling) — different asset type; charts have data plots, stat-infographics have layout. A chart-card embedded in a brief next to a stat-infographic is fine; replacing one with the other is not.
- **`ebook`** (sibling) — when a stat-infographic is embedded in an ebook page, both chunks bind. The `stat-infographic()` Typst primitive in `myvault-editorial.typ` sizes the embed for the ebook context.
- **`hero-stats`** (existing editorial primitive in `myvault-editorial.typ`) — different asset type; hero-stats has no signal-go border, no divider, no footer band. It's an inline editorial panel, not a standalone stat infographic. They are not interchangeable.

## Visual canon

The Figma reference at `70:8598` (file `Pm31BDHj34WjJ7NjBK4Ady`) is the canonical 3-up. The 2-up and 4-up variants are documented in MENU but not yet shipped to Figma — the chunk specifies their composition by extension from 3-up.

URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8598>

## Memory linkage

The stat-infographic shape was previously catalogued in the `project_diagram_canonical_specs` memory (2026-04-21) which is now superseded by both `chart.md` and this chunk. The memory's stat-infographic entry is **superseded by this chunk** and can be replaced with a one-line pointer on the next gardening pass.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-05-01 | **v1.0 — Initial.** 5 HARD rules (R-STAT-001..005). BASE typography per role; surface palette (white default; off-white alternate); column count (3-up default; 2-up + 4-up valid). MENU of 3 variants. Renderer pinned to the existing JSON-spec + Node SVG composer (extends `renderers/vega-lite/compose.mjs` with `composeStatInfographic`). No foundation overrides. Adopted from `chart.md` v1.0's "out of scope" list — Stat Infographic was originally proposed as an editorial primitive in `myvault-editorial.typ` (sibling of `hero-stats`); during planning we chose to give it its own chunk because it's also a standalone deliverable (social tile, blog asset) and the standalone use deserves the chunk's first-class governance. The Typst primitive `stat-infographic()` in `myvault-editorial.typ` embeds the standalone SVG into ebook PDFs — same pattern as `chart()`. | Mark + Claude |
