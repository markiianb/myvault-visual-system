---
chunk_id: chart
domain: chunks
subcategory: asset-type
type: chunk
status: active
version: "1.0"
last_updated: 2026-04-30
owner: mark
summary: "Asset-type chunk for data-visualization chart deliverables. 7 HARD rules (R-CHART-001..007) covering chart-card geometry, no-eyebrow-above-title, canonical footer shape when chrome is used, three-state palette reservation (signal.stop / sky / go for status comparisons only — sequential data uses teal), value labels mandatory on every comparative segment (color-blind safety), Vault Teal at 18 pt allowed for chart annotations within chart-card boundary (ratifies the scoped R-COLOR-009 exception that presentation.md anticipated), and the negative-bar / zero-line / dashed-gridline distinction. BASE rules cover typography per role (PT Serif 40 pt title; Lato 14 pt labels; Lato 12 pt source caption — the rare-instance footer caption case), surface palette (gradient default, flat off-white, solid teal, gradient-light), color recipes per surface (title / description / caption / footer dot / footer top stroke all flip per surface), bar radii (0 default, radius/xs allowed for softening), card padding / stroke / no-radius defaults, and the radial 3-cell composition (200×200 rings, 0.88 inner radius, comparative palette). MENU catalog of 5 canonical types — horizontal-bar / vertical-bar-default / vertical-bar-with-axes / radial-comparison-dramatic / radial-comparison-light. Renderer pinned to Vega-Lite + JSON spec; chart-card chrome wraps the data plot via Vega-Lite layer composition. Reviewer integration: chart-reviewer for HARD enforcement + color/typography/accessibility cross-checks. Flow Diagram and Stat Infographic are explicitly out of scope (Flow → future chunks/diagram.md via Typst+Fletcher; Stat Infographic → editorial primitive in myvault-editorial.typ)."
token_count_estimate: 1500

# === RENDERER PINNING ===
renderer: vega-lite
spec_format: json
template_path: renderers/vega-lite/  # Phase 2 — see Renderer + spec format section
output_formats: [svg, png, pdf]
renderer_status: provisional
renderer_note: "Vega-Lite chosen for clean SVG output (selectable text), strong LLM training-data coverage (~85% first-shot accuracy with feedback loop per the VegaChat 2026 paper), mature theming via JSON config. Headless rendering via vega-cli (`vg2svg`, `vg2png`, `vg2pdf`)."

# === FOUNDATIONS THIS CHUNK INHERITS FROM ===
inherits_from_foundations:
  - color
  - typography
  - logo-usage
  - iconography

# === TOKENS + ASSETS CONSUMED ===
token_dependencies:
  - color.core.teal
  - color.core.off-white
  - color.core.white
  - color.core.gray-01
  - color.core.gray-02
  - color.core.black
  - color.signal.stop   # red — comparative ring 1 (without / negative state)
  - color.signal.sky    # blue — comparative ring 2 (with / partial state)
  - color.signal.go     # green — comparative ring 3 (fully / positive state)
  - gradient.mist       # warm cream → teal — horizontal-bar default
  - gradient.primary    # lavender → mint — alternate register
  - gradient.warm       # warm cream → soft tan — vertical-bar default
  - gradient.greydient  # warm cream → soft purple — radial-light default
  - typography.heading.l   # PT Serif 40pt — chart title; radial center percentage
  - typography.body.s      # Lato 14pt — value labels, axis labels, category labels, description
  - typography.caption     # Lato 12pt — source caption (rare-instance footer use)
  - space.*                # padding 40 / 48; row gaps 4 / 8 / 10 / 16 / 20 / 28 / 32 / 40
  - radius.xs              # optional bar softening (radius 2)
asset_dependencies: []   # Charts are pure SVG/data; no logo or icon assets used in the 5 canonical types

# === VISUAL CANON (Figma) ===
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "70:8479"
  pageName: "Diagrams"
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8479"
  reference_examples:
    - { nodeId: "70:8480", what: "Horizontal Bar Chart on gradient.mist (5 rows, no axes)" }
    - { nodeId: "70:8520", what: "Horizontal Bar Chart on gradient.primary (lavender→mint register)" }
    - { nodeId: "70:8617", what: "Vertical Bar Chart on gradient.warm (5 columns, no axes, bars align bottom of track)" }
    - { nodeId: "70:8705", what: "Vertical Bar Chart with Axes on flat off-white (negative bars in gray-02, dashed gridlines, solid zero line)" }
    - { nodeId: "70:8651", what: "Radial Chart Dramatic on solid teal (3 cells, comparative palette, white text, white-at-0.25-opacity track ring)" }
    - { nodeId: "70:8678", what: "Radial Chart Light on gradient.greydient (3 cells, comparative palette, black text, gray-01 track ring)" }
  note: "Two of the eight sections on the Diagrams page (Flow Diagram 70:8560 and Stat Infographic 70:8598) are out of scope for this chunk — see Purpose & scope."

# === REVIEWER AXES ===
review_axes:
  - chart-reviewer
  - color-reviewer
  - typography-reviewer
  - brand-element-reviewer
  - accessibility-reviewer

# === DELIVERABLE METADATA ===
asset_type: chart
typical_use:
  - "data-driven illustrations in ebooks, presentations, blog posts, social tiles"
  - "single-fact stat visualizations (radial comparisons; bar rankings)"
  - "before/after / comparative state visualisations (3-state radials)"
  - "small-multiples in editorial contexts"

# === CROSS-REFS ===
related_chunks:
  - ebook
  - presentation
  - social
related_memories:
  - project_diagram_canonical_specs   # 9-day-old memory; 3 deltas surfaced + corrected in v1.0 (see _research/chart-figma-audit.md)
  - feedback_no_uppercase_eyebrows
  - feedback_regular_weight_only
  - feedback_myvault_fonts_lato_primary
  - feedback_14pt_practical_text_floor
  - feedback_chunk_size_placement_pins
  - feedback_design_pages_are_guidelines
  - feedback_white_is_default_surface

# === FOUNDATION OVERRIDES ===
foundation_overrides:
  - rule_id: R-COLOR-009
    chunk: color
    nature: scoped-exception
    scope: "chart annotations within chart-card boundary (axis labels, year labels, legend labels, source captions on chart surfaces)"
    note: "R-COLOR-009 forbids Vault Teal below the display tier. The presentation chunk (v1.1) anticipated this exception for chart annotations on slides like Traction Hero and Financials Curve. R-CHART-006 ratifies it at the chart-asset level: Vault Teal is allowed at 18 pt for chart-context labeling within the chart-card boundary. Body text and non-chart captions outside the chart-card still bind R-COLOR-009. Current Figma Diagrams canon (2026-04-30) does not actually exercise this — every label in the 7 reference frames is gray-02 / off-white / white per surface. The exception preserves the option for future chart annotations without forcing a foundation revision."
    enforced_by: R-CHART-006
---

# Chart

## Purpose & scope

This chunk governs every data-visualization chart deliverable: bar charts, radial comparisons, and any future quantitative-data shapes that fit the Vega-Lite grammar. It covers charts shipped as standalone SVG / PNG / PDF assets, charts embedded inline in an ebook page (where this chunk's chart-card rules apply alongside `ebook.md`'s page rules), and charts embedded in presentation slides (where this chunk applies alongside `presentation.md`'s slide rules — the chart-card scoped Vault Teal exception that `presentation.md` declared in v1.1 is ratified here).

**Out of scope for this chunk:**

- **Flow Diagram** (Figma `70:8560`) — node-graph with pill nodes, accent nodes, code nodes, and free-positioned right-angle connectors. Genuinely a diagram, not a chart. **Defer to a future `chunks/diagram.md` chunk** rendered with Typst + Fletcher, which handles pill nodes and right-angle edge routing natively.
- **Stat Infographic** (Figma `70:8598`) — 3-column icon + PT Serif 28 pt stat + Lato 16 pt caption with full-card 2 px signal-go border and signal-go divider + footer band. Structurally a layout primitive, not data viz. **Adopt as a `stat-infographic` editorial primitive in `renderers/typst/myvault-editorial.typ`** (sibling to the existing `hero-stats` primitive but with the signal-go border signature).

Both shapes share the Diagrams Figma page with the in-scope charts as a folder-organization choice; neither belongs to the chart asset-type identity.

## Tokens + assets consumed

This chunk pulls from foundation tokens. It does not introduce new tokens.

| Source | What it provides |
|---|---|
| `tokens/brand.tokens.json` → `color.core.*`, `color.signal.*`, `gradient.*`, `typography.*`, `space.*`, `radius.*` | Every value used on every chart. The Vega-Lite theme builds from this file via `renderers/vega-lite/build-tokens-vega.sh` (Phase 2). |

The "comparative palette" used in radial comparisons is **not a new token namespace** — it is `color.signal.stop` (red `#E75247`) + `color.signal.sky` (blue `#4D80E6`) + `color.signal.go` (green `#69DE49`). Using signal colors for state comparison (without / partial / fully) is structural / status use, fully consistent with R-COLOR-003 ("signal colors only for status / structure, not branding or decoration"). The chunk does not override R-COLOR-003.

## Chart-card foundation (universal)

Every chart-card is built on the same foundation:

- **Frame:** auto-sized per chart type (the 5 canonical sizes from MENU); inner content area derives from frame width minus padding
- **Padding:** **40 / 40 / 40 / 40** for bar / radial cards; **40 / 48 / 40 / 48** for vertical-bar-with-axes (extra L/R for axis labels)
- **Auto-layout:** vertical, item-spacing 20 (gap 28 for vertical-bar-with-axes)
- **Children:** Header (title + description), Plot (chart-type-specific), Footer (when chrome is used)
- **Frame `cornerRadius`:** **0** (flat rectangle) — confirmed across all 7 Diagrams page reference frames
- **Frame stroke:** 1 px `color.core.gray-01` (`#dddcd6`), `INSIDE` align, all sides
- **Frame fill:** per surface (see BASE Surface Palette)

Codified as R-CHART-001.

## Severity tiers

This chunk uses three tiers — same convention as `ebook.md` and `presentation.md`:

- **HARD** — non-negotiable. Reviewer agents reject violations. Each carries a stable ID (`R-CHART-NNN`) and a machine-checkable predicate.
- **BASE** — defaults that apply unless the deliverable spec says otherwise. Document the deviation in the spec.
- **MENU** — choose-one alternatives from the kit catalog. **No wrong answer**; reviewers do not reject MENU choices. Pick what fits the data and the register.

## HARD rules

### R-CHART-001 — Chart-card geometry locked when a card is used
- **Spec:** When a chart appears inside a chart-card, the card frame uses `cornerRadius: 0`, 1 px `color.core.gray-01` stroke (`INSIDE` align, all sides), and padding **40 / 40 / 40 / 40** (or **40 / 48 / 40 / 48** for vertical-bar-with-axes — the +8 L/R is for axis labels). Auto-layout is vertical with item-spacing 20 (28 for vertical-bar-with-axes).
- **Card is conditional, not universal.** A chart embedded inline in an ebook page or sitting in a presentation chart card may follow the parent chunk's chrome rather than wrap itself in another card. The HARD constraint is the *shape* of the chart-card when one is used — not its presence on every chart.
- **Rationale:** The chart-card is the visible boundary that signals "here is a designed data object." A consistent card geometry across every chart is what makes a deck of mixed chart types feel like one system rather than several.
- **Allowed deviation:** Frame width is set per chart type (see MENU). Inner padding may go to 32 on a small chart-card embedded inside a presentation slide where the slide already supplies outer breathing room — document the deviation in the spec.
- **Check:** any chart-card with `cornerRadius` ≠ 0, stroke ≠ 1 px gray-01, or padding outside the 40/40/40/40 ↔ 40/48/40/48 envelope (without a documented spec reason) → reject.

### R-CHART-002 — No uppercase letter-spaced eyebrow above the chart title
- **Spec:** The chart title (PT Serif Regular 40 pt) is the topmost text in the Header. There is **no uppercase letter-spaced eyebrow / kicker / "FIG. 2.1" tag** above it.
- **Rationale:** Chart titles are a tempting place to add figure-numbering eyebrows ("FIG. 2.1 — RETENTION", "EXHIBIT A — Q3 GROWTH"). The MyVault visual system forbids these everywhere (see `feedback_no_uppercase_eyebrows` and R-TYPE-004). Restating the rule in the chart context catches the most common drift before reviewer escalation.
- **Cross-check with R-TYPE-004:** This is a chart-context restatement of the foundation rule, not a new rule. R-TYPE-004 binds independently; R-CHART-002 makes the chart-specific failure mode explicit.
- **Check:** any TEXT node above the chart title with `letterSpacing > 0` and `textCase: UPPER` → reject. Any text node above the chart title at all (other than parent-chunk chrome like presentation header labels) → reject.

### R-CHART-003 — Footer canonical shape when chrome is used
- **Spec, three parts:**
  1. **Footer is conditional, not universal.** A chart-card may opt out of the footer when the chart's source / context lives elsewhere (e.g., the surrounding ebook page caption, the surrounding slide). When the chart-card carries a footer, parts 2 and 3 bind.
  2. **Outer footer shape:** FILL-width inside the card content area, HORIZONTAL auto-layout, padding-top 16 (other padding 0), counter `CENTER`. The footer carries a **1 px top stroke** — color tracks surface per the BASE Surface Color Recipes table (gray-01 on light surfaces; off-white on dark surfaces).
  3. **Inner footer row:** a HORIZONTAL row (HUG width, HUG height), counter `CENTER`, item-spacing 10. Far-LEFT: a **6 × 6** ellipse (the "footer dot"), color tracks surface per the recipes table. Immediately to its right (10-px gap): source caption text in `typography.caption` (Lato Regular 12 pt @ 150% LH), color tracks surface. Both elements sit together at the LEFT edge of the footer; the rest of the footer width is empty.
- **Rationale:** The footer is a quiet attribution band — small dot anchors the brand, caption sits beside it. They read together as one slipstream signature on the bottom-left. The Figma layout property says SPACE_BETWEEN, but the rendered visual canon (Mark's edit pass on the Diagrams page) shows them together-LEFT. Visual canon wins; the property is a Figma drift.
- **Source caption is the legitimate 12-pt exception** (per `feedback_14pt_practical_text_floor` — the caption tier is rare-instance use, and source captions on chart-cards are one of the named legitimate cases).
- **Check:** any chart-card footer that omits the dot, omits the top stroke, separates dot and caption, sets padding-top other than 16, or pushes the caption to the right edge → reject. Any chart-card footer caption set in something other than `typography.caption` → reject. Footer absence is not a violation.

### R-CHART-004 — Comparative palette reservation
- **Spec:** The 3-color comparative palette — `color.signal.stop` (`#E75247`) / `color.signal.sky` (`#4D80E6`) / `color.signal.go` (`#69DE49`) — is reserved for **3-state status comparisons only**. Canonical use: radial charts comparing without / with-partial / fully states (e.g., the radial reference at Figma `70:8651` and `70:8678`). Sequential or quantitative data uses `color.core.teal` for a single series; multi-series quantitative data uses a teal-gradient ramp.
- **Rationale:** Repurposing the comparative palette for sequential data ("rainbow charts") is a load-bearing failure mode of brand-locked data viz — it both violates R-COLOR-003 (signal colors for status only) and produces visually loud charts that fight the calm-not-loud principle. The reservation is what keeps the comparative palette legible as a status signal across every MyVault chart.
- **Check:** any chart that uses two or more of {signal.stop, signal.sky, signal.go} on a single chart where the data axis is sequential, ordinal, or quantitative (not 3-state status) → reject. A chart that uses one signal color (e.g., signal-go alone for a positive bar in an axis chart) is fine — that is single-color status use, not comparative use.

### R-CHART-005 — Value labels on every comparative segment
- **Spec:** Every chart that uses two or more colors from the comparative palette (signal.stop / sky / go) carries a **value label on every segment**, set in `typography.body.s` (Lato Regular 14 pt @ 150% LH) at minimum. The label may be the literal value, the percentage, or the state name — but it must be present and readable.
- **Rationale:** Red-and-green together is not deuteranopia-safe (the canonical comparative palette pairs red and green). Mandating a value label on every segment makes color decorative, not load-bearing — a viewer who cannot distinguish red from green still reads the value. This is the chunk's color-blind accessibility solution; it requires no patterns / textures / palette changes.
- **Cross-check with R-TYPE-005:** Value labels at 14 pt sit at the foundation 14 pt practical text floor — within the floor, not below it.
- **Check:** any comparative-palette chart with one or more segments missing a value label OR with a value label below 14 pt → reject.

### R-CHART-006 — Vault Teal at 18 pt allowed for chart annotations within chart-card boundary
- **Spec:** Vault Teal (`color.core.teal`) is allowed at **18 pt** for chart annotations — axis labels, year labels, legend labels, source captions — **within the chart-card boundary**. Outside the chart-card, R-COLOR-009 binds in full (no Vault Teal below the display tier).
- **Rationale:** Chart-context labeling is a brand-color labeling system within the designed data object — semantically distinct from body-text captions. The presentation chunk (v1.1) declared this scoped exception in `foundation_overrides`; this rule ratifies it at the chart-asset level so other consuming chunks (ebook, social) inherit the same scope. The exception is *narrow* — body text and non-chart captions outside the card still bind R-COLOR-009.
- **Foundation-override note:** This is the second explicit foundation override in the chunks layer (R-PRES-003's 18-pt floor was the first). It is a *scoped exception* (less strict in a defined scope), not a *raise* or *universal lower*. Declared in `foundation_overrides` of the chunk frontmatter.
- **Current Figma canon does not exercise this exception.** Every label in the 7 reference frames is `gray-02` / off-white / white per surface. The exception preserves forward compatibility — future chart annotations may use teal at 18 pt without forcing a foundation revision.
- **Check:** Vault Teal at 18 pt outside a chart-card boundary → reject (R-COLOR-009 binds). Vault Teal below 18 pt anywhere (including inside a chart-card) → reject.

### R-CHART-007 — Negative bars and zero-line distinction
- **Spec:** In any axis chart that supports negative values (canonical reference: vertical-bar-with-axes at Figma `70:8705`), the visual distinction between positive bars, negative bars, the zero line, and non-zero gridlines uses a fixed convention:
  | Element | Treatment |
  |---|---|
  | Positive bar | Solid `color.core.teal` fill, no stroke |
  | Negative bar | Solid `color.core.gray-02` fill **+ 1 px `color.core.gray-01` stroke** (`INSIDE` align, all sides) |
  | Zero line | Solid 1 px `color.core.gray-02`, no dash |
  | Non-zero gridlines | 1 px `color.core.gray-01`, dashed pattern `[2, 5]` |
- **Rationale:** The zero line is semantically different from the other gridlines — it is the axis baseline, not a tick. Solid-vs-dashed reads as that distinction at a glance. Negative bars in solid gray-02 (not white-outline) keep the chart calm; the 1 px gray-01 stroke gives them a quiet edge against the off-white field without competing with the positive teal bars.
- **The white-outline trap.** A common failure mode (and an early-draft mistake on the Sketches page before Mark rebuilt this) is to render negative bars as white rectangles with a teal outline. That treatment is forbidden — it produces visual confusion (the bar reads as "missing" rather than "negative"). Solid gray-02 is the canon.
- **Check:** any negative bar with a fill other than gray-02 OR a stroke other than 1 px gray-01 → reject. Any zero line that is dashed → reject. Any non-zero gridline that is solid → reject. Any axis chart whose gridline color is anything other than gray-01 / gray-02 → reject.

## BASE rules

### Default typography per role

These are typical defaults across every MyVault chart. Deviation is allowed; document it in the deliverable spec. Foundation rules (R-TYPE-001 Regular only, R-TYPE-002 PT Serif + Lato only, R-COLOR-009 no teal below display tier — see chart-card scoped exception in `foundation_overrides`) catch any violation the BASE table doesn't enumerate.

| Role | Default | Notes |
|---|---|---|
| Chart title | PT Serif Regular **40 pt** @ 125% LH, LEFT, surface-paired (black on light; white on dark) | The Header's anchor; sized to read at chart-card scale, not slide scale |
| Description (subtitle below title) | Lato Regular **14 pt** @ 150% LH, LEFT, gray-02 (off-white on dark) | Optional; one line, one idea |
| Value label / category label / axis label | Lato Regular **14 pt** @ 150% LH, surface-paired | The 14-pt floor — never go below |
| Source caption (footer) | Lato Regular **12 pt** @ 150% LH, gray-02 (off-white on dark) | The legitimate footer caption — rare-instance 12-pt use per `feedback_14pt_practical_text_floor` |
| Radial center percentage | PT Serif Regular **40 pt** @ 125% LH, surface-paired | The radial's hero number; lives inside the rings frame |
| Radial cell label (below rings) | Lato Regular **14 pt** @ 150% LH, CENTER, surface-paired | Sits 16 px below the rings frame |

### Surface palette

The default chart-card surface is **gradient** — each canonical chart type ships with its own canonical gradient pairing (see the table below). Flat off-white and solid teal are register tools for quieter or more dramatic charts. There is no closed mapping from chart-type to surface; the author chooses what the moment calls for.

| Surface | Token | Typical use | Reference frame |
|---|---|---|---|
| Gradient `gradient.mist` | `gradient.mist` (warm cream → soft teal, 4 stops) | Horizontal Bar Chart default | Figma `70:8480` |
| Gradient `gradient.primary` | `gradient.primary` (lavender → mint, 2 stops) | Horizontal Bar Chart alternate register | Figma `70:8520` |
| Gradient `gradient.warm` | `gradient.warm` (warm cream → soft tan, 4 stops) | Vertical Bar Chart default | Figma `70:8617` |
| Gradient `gradient.greydient` | `gradient.greydient` (warm cream → soft purple, 4 stops) | Radial Light default | Figma `70:8678` |
| Flat off-white | `color.core.off-white` `#fbfaf5` | Vertical Bar with Axes (axes / gridlines benefit from a quiet field) | Figma `70:8705` |
| Solid teal | `color.core.teal` `#094545` | Radial Dramatic (and any single-stat hero-chart that earns the dramatic register) | Figma `70:8651` |

**Per `feedback_white_is_default_surface`:** White is the default surface across the visual system. For chart-cards, the gradient palette wins because the gradient softens the data plot's visual weight against the surrounding white page or slide. White is *available* as a chart-card surface (and is implicit when a chart is rendered without a card in an already-white parent), but no canonical chart-card on the Diagrams page uses pure white — the gradients earn it.

### Color recipes per surface

The chart-card's title color, description color, source caption color, footer top-stroke color, and footer dot color all flip per surface. This is the recipe map, derived from the 7 Figma reference frames:

| Surface | Title | Description | Caption | Footer top stroke | Footer dot |
|---|---|---|---|---|---|
| `gradient.mist` | black | gray-02 | gray-02 | gray-01 | teal |
| `gradient.primary` | black | gray-02 | gray-02 | gray-01 | teal |
| `gradient.warm` | black | gray-02 | gray-02 | gray-01 | teal |
| `gradient.greydient` (radial light) | black | gray-02 | gray-02 | gray-01 | black |
| `color.core.off-white` (flat) | black | gray-02 | gray-02 | gray-01 | teal |
| `color.core.teal` (dramatic) | white | off-white | off-white | off-white | white |

**Variant notes.** The two horizontal-bar reference frames currently use a 1 px black @ 0.10 opacity top stroke on the footer (rather than 1 px gray-01 full opacity). Treat that as a Figma drift, not canon — gray-01 full opacity is the recipe across the other 5 reference frames. The Radial Light footer dot is **black**, not teal, despite the surface being light — surface-paired-to-meaningful-contrast wins over surface-paired-to-teal.

### Bar typography and geometry

| Element | Default | Notes |
|---|---|---|
| Bar fill (positive / single-series) | `color.core.teal` (`#094545`) solid | Single-color data series uses teal; the comparative palette is reserved per R-CHART-004 |
| Bar `cornerRadius` | **0** (flat rectangle) | `radius.xs` (2 px) allowed for subtle softening — illustrative only on Horizontal Bar v1 row 3, not a default |
| Bar height (horizontal-bar) | **40 px** (matches row height) | Bar fills full row height; no top/bottom gap inside the row |
| Bar width (vertical-bar default) | **80 px** (matches column width) | Bar fills full column width; aligned to bottom of track |
| Bar width (vertical-bar-with-axes) | **110 px** | Wider bars for axis-chart legibility; spacing handled by Vega-Lite paddingInner |
| Track height (vertical-bar default) | **320 px** (FIXED) | Bar height is variable within track; track defines the data ceiling |

### Radial geometry

| Element | Default | Notes |
|---|---|---|
| Cell width | ~267 (FILL distribution within plot) | 3 cells side-by-side in 880-wide plot with 40-px gaps |
| Cell layout | VERTICAL gap 16 (rings → label) | rings frame on top, cell label below |
| Rings frame | 200 × 200 | The full rings live inside this frame; center text is positioned within it |
| Track ring | 200×200 ellipse, `innerRadius: 0.88`, full circle (0 → 2π) | Color: white at 0.25 opacity on dramatic surface; gray-01 at full opacity on light surface |
| Data ring | 200×200 ellipse, `innerRadius: 0.88`, arc startAngle ≈ 4.71 rad (12 o'clock visually), arc clockwise per percentage | Color from comparative palette per cell position (cell 1 = stop, cell 2 = sky, cell 3 = go) |
| Center percentage | PT Serif Regular 40 pt, surface-paired, positioned visually centered inside rings frame | The hero number for each cell |

### Axis-chart specifics (vertical-bar-with-axes)

- **Y-axis tick count:** 7 (canonical reference uses −3 / −2 / 0 / 2 / 4 / 6 / 8 — five positive ticks, two negative, one zero)
- **Y-axis label position:** LEFT of the gridlines, Lato 14 pt gray-02
- **Plot is absolutely positioned** (no auto-layout) inside the chart-card content area — Vega-Lite's natural composition mode for axis charts
- **X-axis category labels** sit below the baseline, CENTER-aligned under each bar slot, Lato 14 pt gray-02

## MENU — kit catalog

The Figma page `Diagrams` (id `70:8479`) holds the visual canon for every entry below. Reviewers do not reject MENU choices; agents pick based on data shape and register fit. Treat as **guidelines, not strict canon** (per `feedback_design_pages_are_guidelines`).

```yaml
charts:
  - id: horizontal-bar
    label: "Horizontal Bar Chart"
    surface: gradient (mist | primary | warm — pick by register; mist is default)
    composition: |
      Card 960 × HUG, padding 40 / 40 / 40 / 40, vertical auto-layout gap 20.
      Header: title (PT Serif 40 pt black) + description (Lato 14 pt gray-02), VERTICAL gap 8 (or 10 for v1).
      Plot: VERTICAL auto-layout gap 4. Each row is 880 × 40 with a 120-wide RIGHT-aligned label column + a HORIZONTAL bar+value group (gap 12) where the bar is variable width × 40 height (teal fill, radius 0) and the value is Lato 14 pt black LEFT.
      Footer: per R-CHART-003 — 1 px top stroke (gray-01 — see drift note), padding-top 16, SPACE_BETWEEN row with 6×6 teal dot LEFT and source caption RIGHT.
    use_when: "ranking 3–8 categorical items by a single quantitative dimension. Default chart type for editorial data summaries (engagement, retention, growth, comparison rankings)."
    figma_section: "Horizontal Bar Chart (70:8480 default; 70:8520 cool register)"
    data_shape: "category[] + value[] (sorted descending)"

  - id: vertical-bar-default
    label: "Vertical Bar Chart (no axes)"
    surface: gradient (warm — default)
    composition: |
      Card 640 × HUG, padding 40, vertical auto-layout gap 20.
      Header: title + description, gap 8 (HUG width — narrower than horizontal bar header).
      Plot: HORIZONTAL auto-layout gap 32, padding 0 / 16 / 0 / 16, primary MIN counter MAX. 5 columns each 80 × 382: VERTICAL gap 10 with value (Lato 14 pt LEFT) on top, Track frame 80 × 320 FIXED in the middle (bar aligned to bottom), category label (Lato 14 pt CENTER) at the bottom.
      Bar: 80 × variable height, teal fill, radius 0.
      Footer: per R-CHART-003 — 1 px gray-01 top stroke, padding-top 16, SPACE_BETWEEN dot+caption.
    use_when: "comparing 3–7 categorical items at presentation distance; the 80-wide bars read at scale. Use when the y-axis range is implicit (no negative values, no precision required) — for axis precision use vertical-bar-with-axes."
    figma_section: "Vertical Bar Chart (70:8617)"
    data_shape: "category[] + value[]"

  - id: vertical-bar-with-axes
    label: "Vertical Bar Chart with Axes (supports negative values)"
    surface: flat off-white (default — a quiet field for the axis chart's gridlines and labels)
    composition: |
      Card 960 × HUG, padding 40 / 48 / 40 / 48 (extra L/R for axis labels), vertical auto-layout gap 28.
      Header: title + description, gap 8.
      Plot: 864 × 420 absolutely positioned. 7 horizontal gridlines at the data ticks (1 px gray-01 dashed [2, 5] for non-zero, 1 px gray-02 solid for zero). Y-axis tick labels LEFT (Lato 14 pt gray-02). Bars 110 wide × variable height: positive bars solid teal (no stroke), negative bars solid gray-02 + 1 px gray-01 stroke. Value labels Lato 14 pt black above positive / below negative. Category labels Lato 14 pt gray-02 CENTER below the baseline.
      Footer: per R-CHART-003 — 1 px gray-01 top stroke, padding-top 16, SPACE_BETWEEN dot+caption.
    use_when: "quantitative data spanning positive and negative values, or data where axis precision matters (year-over-year growth/decline, sentiment scores, deltas)."
    figma_section: "Vertical Bar Chart — With Axes (70:8705)"
    data_shape: "category[] + value[] (signed; mix of positive and negative valid)"
    hard_anchor: R-CHART-007

  - id: radial-comparison-dramatic
    label: "Radial Comparison Chart (Dramatic — solid teal surface)"
    surface: solid teal
    composition: |
      Card 960 × 550, padding 40, vertical auto-layout gap 20.
      Header: title (PT Serif 40 pt white LEFT) + description (Lato 14 pt off-white LEFT), gap 8.
      Plot: 880 × 317, HORIZONTAL gap 40, padding 40 / 0 / 40 / 0, primary CENTER counter MIN. 3 cells (~267 × 237 FILL distribution).
      Each cell: VERTICAL gap 16. Rings 200 × 200: track ring (white at 0.25 opacity, innerRadius 0.88, full circle) + data ring (comparative palette color per cell — stop / sky / go left to right; innerRadius 0.88; arc startAngle 4.71 rad / 12 o'clock; arc length encodes percentage). Center percentage PT Serif 40 pt white. Cell label below: Lato 14 pt CENTER white.
      Footer: per R-CHART-003 — 1 px off-white top stroke, padding-top 16, SPACE_BETWEEN row with 6×6 white dot LEFT and source caption (Lato 12 pt off-white) RIGHT.
    use_when: "3-state status comparison (without / partial / fully) where the dramatic register earns the brand emphasis. Hero data moment in an ebook section opener or a presentation closing slide."
    figma_section: "Radial Chart — Dramatic (70:8651)"
    data_shape: "3 × {label, percentage} (always exactly 3 cells)"
    hard_anchor: R-CHART-004 + R-CHART-005

  - id: radial-comparison-light
    label: "Radial Comparison Chart (Light — gradient surface)"
    surface: gradient.greydient (default light gradient for radial cards)
    composition: |
      Same as radial-comparison-dramatic with these surface-paired changes:
      - Title PT Serif 40 pt BLACK; description Lato 14 pt gray-02
      - Track ring color: gray-01 at full opacity (NOT white at 0.25)
      - Center percentage: black
      - Cell label: black CENTER
      - Footer top stroke: 1 px gray-01
      - Footer dot: BLACK (not teal — surface-paired-to-meaningful-contrast)
      - Footer caption: Lato 12 pt gray-02
    use_when: "3-state status comparison in calm register — body of an ebook, a quieter slide, an editorial blog post. Same data shape as the dramatic variant; the choice is register, not data."
    figma_section: "Radial Chart — Light (70:8678)"
    data_shape: "3 × {label, percentage} (always exactly 3 cells)"
    hard_anchor: R-CHART-004 + R-CHART-005
```

## Decision tree for the agent

When generating a chart:

```
1. Receive brief
   - Identify the data shape (categorical ranking | categorical comparison | quantitative-with-axes | 3-state status)
   - Identify the consumption mode (standalone SVG | embedded in ebook page | embedded in presentation slide | social tile)
   - Identify the register the chart should carry (calm / editorial / dramatic / data-heavy)

2. Pick the chart type from MENU
   - Horizontal Bar — ranking 3–8 items by one dimension
   - Vertical Bar (no axes) — comparing 3–7 items at presentation distance
   - Vertical Bar with Axes — quantitative + signed values + axis precision
   - Radial Dramatic — 3-state status, dramatic register
   - Radial Light — 3-state status, calm register

3. Pick the surface
   - Default per chart type (see MENU surface entries)
   - Flat off-white when the chart benefits from a quiet field (axis charts; charts inside an already-coloured parent)
   - Solid teal when the moment earns the dramatic register
   - Gradient alternates (mist / primary / warm / greydient) when register variety matters across a deck

4. Apply HARD primitives
   - R-CHART-001 chart-card geometry (when a card is used)
   - R-CHART-002 no eyebrow above title
   - R-CHART-003 footer canonical shape (when chrome is used)
   - R-CHART-004 comparative palette reservation (only for 3-state status)
   - R-CHART-005 value labels on every comparative segment
   - R-CHART-006 Vault Teal at 18 pt allowed for chart annotations within card
   - R-CHART-007 negative bars + zero line + dashed gridlines (axis charts only)

5. Apply BASE typography per role
   - Title PT Serif 40 pt; description Lato 14 pt; labels Lato 14 pt; source caption Lato 12 pt
   - Color recipe per surface (see the BASE Surface Color Recipes table)

6. Apply inherited foundation rules
   - R-COLOR (palette, gradient, contrast)
   - R-TYPE (families, weights, sizes — R-TYPE-005's 14-pt floor binds; chart annotations may use teal at 18 pt per R-CHART-006)
   - R-LOGO (no logo on charts by default — chart-cards do not carry a footer logo)
   - R-ICON (Phosphor only — charts do not use icons in the 5 canonical types; if added, follow R-ICON)

7. Verify accessibility
   - Every comparative segment carries a value label (R-CHART-005)
   - Text-on-surface pairs clear WCAG 2.2 AA contrast
   - No body label below 14 pt; only source caption sits at 12 pt (the named exception)

8. Compose Vega-Lite spec (Phase 2)
   - Import the brand theme: `"$schema": "https://vega.github.io/schema/vega-lite/v5.json"`, `"config": { "$ref": "renderers/vega-lite/theme.json" }`
   - Set the chart-card chrome via Vega-Lite layer composition (rect for card frame + text for title/description + group for plot + group for footer)
   - Bind data inline or via `data.url`

9. Render → SVG / PNG / PDF
   - `vg2svg spec.vl.json output.svg`  (clean, selectable text)
   - `vg2png spec.vl.json output.png --scale 2`
   - `vg2pdf spec.vl.json output.pdf`

10. Reviewer swarm
    - chart-reviewer: R-CHART-001..007 + BASE conformance per surface
    - color / typography / brand-element / accessibility reviewers run their normal foundation checks
```

## Reviewer agent integration

| Reviewer | What it checks for charts |
|---|---|
| `chart-reviewer` | All R-CHART-001..007. Card geometry (cornerRadius, stroke, padding, auto-layout); no eyebrow above title; footer SPACE_BETWEEN canonical shape when present; comparative-palette-reserved-for-3-state; value-labels-on-every-comparative-segment; Vault Teal at 18 pt only inside card boundary; negative-bars-gray-02 + zero-line-solid + non-zero-gridlines-dashed. Cites violations as `R-CHART-NNN at chart frame N`. Also flags BASE deviations (off-default surface, off-default typography role) as advisory, not blocking. |
| `color-reviewer` | Foundation R-COLOR-001..010 across the chart. Cites e.g., `R-COLOR-009 at chart axis label — Vault Teal at 14 pt outside chart card scope`. The chart-annotation scoped exception (R-CHART-006) is honored — color-reviewer does not flag teal at 18 pt inside the card. |
| `typography-reviewer` | Foundation R-TYPE-001..009 with the 14-pt floor in effect (R-TYPE-005 not overridden by this chunk). Source caption at 12 pt is the named legitimate exception. |
| `brand-element-reviewer` | R-LOGO + R-ICON. Charts do not use the logo by default; if a brand mark is added (e.g., a chart shipped as a social tile), it follows R-LOGO. Phosphor icons follow R-ICON. |
| `accessibility-reviewer` | WCAG 2.2 AA contrast on every text-on-surface pair (cross-ref `[[color#accessibility]]`). The comparative-palette color-blind solution is the value-label mandate (R-CHART-005); no further pattern / texture overlay required. |

## Workflow integration — embedding charts in deliverables

Charts are not standalone assets in most cases. They live inside an ebook page, a presentation slide, or a social tile. The workflow has to make this composition trivial. This section documents the integration patterns proven by `documents/chart-integration-test/` (2026-04-30).

### Pattern A — chart embedded in an ebook PDF

**Directory layout (per deliverable):**

```
documents/<deliverable>/
├── spec.typ                   # the ebook Typst spec
├── charts/
│   ├── <id>.chart.json        # author this — fixture per the schema in this chunk
│   └── <id>.svg               # generated by the composer; DO NOT hand-edit
├── build.sh                   # two-step pipeline
└── output.pdf                 # produced by build.sh
```

**Two-step build (`build.sh`):**

1. **Compose charts** — for each `charts/*.chart.json`, run `node renderers/vega-lite/compose.mjs <fixture> <output.svg>`. Produces a brand-locked SVG with chart-card chrome (frame, gradient surface, header, footer).
2. **Compile PDF** — `typst compile --root <visual-system-root> spec.typ output.pdf`. Typst embeds the SVG at the call site of `chart()`.

**In the spec:**

```typst
#import "../../renderers/typst/myvault-editorial.typ": *

#flow(running-header: "The case for clean filing")[
  ...body content...

  #chart("/documents/<deliverable>/charts/where-time-goes.svg", measure: "wide")

  ...more body...
]
```

**Path convention.** `chart()` paths must be **project-rooted absolute** (start with `/`). Typst resolves `image()` relative to the file calling it (the editorial module in `renderers/typst/`), not the spec. `build.sh` passes `--root` pointing at the visual-system root, so paths starting with `/` resolve from there.

**Measure:**
| Value | Use |
|---|---|
| `"1-col"` (default) | 640 pt — body content width on a single-column ebook page |
| `"wide"` | 720 pt — full content width on an ebook page that gives the chart the breath |
| `"2-col"` | 300 pt — for paired charts in a 2-column page (per R-EBOOK-001) |

The chart's own header (PT Serif 40 + Lato 14 description) carries the title and source caption — by default `caption-kind: "none"` (no extra caption). Use `caption-kind: "fig"` only when the chart-card has no header (rare — when the page narrative carries the title).

**Working example:** see `documents/chart-integration-test/` for two charts (horizontal-bar + radial-light) embedded into a 4-page ebook PDF.

### Pattern B — chart embedded in a presentation slide

To be ratified when the presentation chunk's Phase 2 renderer ships. Today: render the chart to PNG (`rsvg-convert -w 1920 -o chart.png chart.svg`) and use the slide composer's image-embed primitive at the chart-card boundary. The R-CHART-006 scoped Vault Teal exception applies — chart annotations inside the chart-card may use Vault Teal at 18 pt.

### Pattern C — standalone chart deliverable (social tile, blog asset)

When a chart ships as its own deliverable (no surrounding page or slide):

```bash
node renderers/vega-lite/compose.mjs <fixture> <output.svg>
rsvg-convert -w 2400 -o output.png output.svg     # for raster delivery
# OR
rsvg-convert -f pdf -o output.pdf output.svg      # for print
```

The composed SVG is the deliverable. No surrounding chrome needed — the chart-card *is* the deliverable.

### Discovery — how an agent learns this workflow

An agent generating an ebook with charts loads:
- `chunks/ebook.md` (parent deliverable contract — page geometry, surface, footer, primitives)
- `chunks/chart.md` (this chunk — chart-card contract + this Workflow integration section)
- `renderers/vega-lite/README.md` (composer usage + fixture schema)
- `renderers/typst/myvault-editorial.typ` (the `chart()` primitive)

The retrieval rule pattern: when a deliverable brief mentions data viz, load the `chart` chunk in addition to the deliverable's primary chunk.

## Renderer + spec format

**Renderer:** [Vega-Lite](https://vega.github.io/vega-lite/) — declarative JSON grammar of graphics. Headless rendering via [vega-cli](https://www.npmjs.com/package/vega-cli) (`vg2svg`, `vg2png`, `vg2pdf`). Mature 1.0+ API; well-represented in LLM training data; the [VegaChat 2026 paper](https://arxiv.org/html/2601.15385) reports ~85% first-shot accuracy on chart generation with a correction feedback loop.

**Spec format:** `.vl.json` (Vega-Lite source — JSON object with `$schema`, `config`, `data`, `mark`, `encoding`, optional `layer` / `concat` / `repeat`).

**Why Vega-Lite:**
- **Clean SVG output** with `<text>` elements (selectable, editable, SEO-readable, smaller files than path-text)
- **Theming via JSON config** — every brand color / font / axis style flows from one `theme.json` extracted from `tokens/brand.tokens.json`
- **Headless CLI is production-grade** — no Puppeteer / Playwright / browser dependency
- **Strong agent friendliness** — LLMs write Vega-Lite well; the JSON grammar's correction loops converge fast

**Chart-card chrome:** Vega-Lite composes the chart-card chrome via layer composition. The outer chart-card (frame + title + description + footer) is encoded as Vega-Lite `concat` (vertical) wrapping the data plot. Alternatively, the chart-card chrome can be a wrapping SVG template that embeds the Vega-Lite plot output as an inner `<g>` — Phase 2 picks the cleaner of the two during fixture validation.

**Phase 2 deliverable:** `renderers/vega-lite/`

```
renderers/vega-lite/
├── build-tokens-vega.sh        # token bridge: tokens/brand.tokens.json → theme.json
├── theme.json                  # base Vega-Lite config (colors / fonts / axis / mark / view)
├── chart-card.template.json    # outer card chrome (header + footer wrapping the data plot)
├── render.sh                   # vg2svg / vg2png / vg2pdf wrapper with sensible defaults
├── package.json                # vega-cli + vega-lite deps
└── fonts/
    ├── Lato-Regular.ttf
    └── PTSerif-Regular.ttf
```

**Renderer-agnostic note:** The chunk's HARD + BASE + MENU + Reviewer contract is renderer-agnostic. If a future shape benefits from full Vega (not Vega-Lite) — e.g., a small-multiples grid or a connected-scatter — the chunk does not change; only the spec format inside `renderers/vega-lite/` does (same renderer, lower-level grammar).

## Foundation overrides

**One.**

**Scoped exception to R-COLOR-009 (`no Vault Teal below display tier`) for chart annotations within chart-card boundary.** R-CHART-006 ratifies the exception that `presentation.md` declared in v1.1. Vault Teal is allowed at 18 pt for chart-context labeling — axis labels, year labels, legend labels, source captions — inside the chart-card boundary. Outside the card, R-COLOR-009 binds in full.

The exception is *narrow* and *forward-compatible* — current Figma Diagrams canon does not exercise it; every label in the 7 reference frames is `gray-02` / off-white / white per surface. The exception preserves the option for future chart annotations to use teal at 18 pt without forcing a foundation revision.

**No other overrides.** The 14-pt typography floor (R-TYPE-005) binds for chart body labels; only the named source caption sits at 12 pt (the rare-instance footer use). Every other R-COLOR / R-TYPE / R-LOGO / R-ICON rule applies automatically.

## Cross-references

- **`color`** — palette, surface, contrast, R-COLOR-009 (with chart-context scoped exception via R-CHART-006)
- **`typography`** — type styles per role; 14-pt floor binds; source caption is the rare-instance 12-pt use
- **`logo-usage`** — charts do not carry a logo by default; if added (social tile, standalone deliverable), R-LOGO binds
- **`iconography`** — Phosphor icons only; not used in the 5 canonical types but available for callouts inside an axis chart legend
- **`ebook`** (sibling) — when a chart sits inside an ebook page, both chunks bind (this chunk for the chart-card; ebook for the page geometry, surface, footer)
- **`presentation`** (sibling) — when a chart sits inside a presentation slide, both chunks bind (this chunk for the chart-card; presentation for the slide geometry, header labels, slide footer). Presentation v1.1's `foundation_overrides` entry for chart-context Vault Teal at 18 pt is **ratified** by R-CHART-006 in this chunk.
- **`feedback_design_pages_are_guidelines`** — informs the MENU framing (5 canonical types are guidelines, not strict canon)
- **`feedback_chunk_size_placement_pins`** — informs why HARD rules are 7, not 12 (size / placement specifics live in BASE)
- **`feedback_white_is_default_surface`** — explains why gradient (not white) is the chart-card default while white remains the system default

## Visual canon

The Figma page `Diagrams` (id `70:8479`, file `Pm31BDHj34WjJ7NjBK4Ady`) is the visual reference. Six of the eight sections on the page are the in-scope canonical chart types (the two horizontal-bar variants share one chart type with two register variants). Two sections — Flow Diagram (`70:8560`) and Stat Infographic (`70:8598`) — are explicitly out of scope; see Purpose & scope.

URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8479>

## Memory linkage

Before this chunk, chart canon lived in one memory entry:

- `project_diagram_canonical_specs` — Mark's finalized specs from the Diagrams page (2026-04-21). **Largely superseded by this chunk + the Cycle 0 audit at `chunks/_research/chart-figma-audit.md`.** Three deltas surfaced during the audit:
  1. The memory said card `radius/2xl` (24); Figma actually shows `cornerRadius: 0`.
  2. The memory said "no hairline divider above footer"; every footer in Figma carries a 1 px top stroke (color tracks surface).
  3. The memory said footer dot + caption inline together; Figma shows them in a HORIZONTAL `SPACE_BETWEEN` row (dot far-LEFT, caption far-RIGHT).
- The memory remains in `MEMORY.md` as a historical pointer; its canon load is now this chunk's HARD + BASE. Mark's MEMORY.md entry should be replaced with a one-line pointer to this chunk on the next gardening pass.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-30 | **Workflow integration shipped (still v1.0).** Added `chart()` primitive to `renderers/typst/myvault-editorial.typ` for embedding chart SVGs into ebook PDFs (sizes to 1-col / wide / 2-col measure; defers caption to the chart-card's own header). Added `documents/chart-integration-test/` — a 4-page test PDF that embeds a horizontal-bar chart + a radial-light chart inline in an ebook flow, proving the two chunks compose end-to-end. Two-step build (`build.sh`): compose charts → compile PDF. Documented as **Pattern A** in this chunk's new "Workflow integration — embedding charts in deliverables" section, mirrored in `ebook.md`'s new "Embedding charts" section. Path convention: project-rooted absolute paths starting with `/` (Typst resolves `image()` against the calling module, not the spec; `build.sh` sets `--root`). `_manifest.yaml` `load_for_task` updated with `chunks_if_brief_mentions_data_viz: [ebook, chart]` for both `ebook` and `pdf_document` task profiles. | Mark + Claude |
| 2026-04-30 | **v1.0 ship confirmation.** End-to-end build cycle complete: `renderers/vega-lite/` infrastructure shipped (`build-tokens-vega.sh`, `tokens.json`, `theme.json`, `compose.mjs`, `render.sh`, `package.json`, `fonts/`, `README.md`); 5 fixtures landed (`fixtures/horizontal-bar.chart.json`, `fixtures/vertical-bar.chart.json`, `fixtures/vertical-bar-axes.chart.json`, `fixtures/radial-dramatic.chart.json`, `fixtures/radial-light.chart.json`); each fixture renders reproducibly (`node compose.mjs <fixture>` → SVG; `rsvg-convert -w 1920` → PNG). Visual parity validated against Figma reference frames at `70:8480` / `70:8617` / `70:8705` / `70:8651` / `70:8678`. Composer architecture: per-type SVG composition (chrome + plot drawn as native SVG with token-bound colors) wraps Vega-Lite where applicable. R-CHART-003 amended mid-cycle: footer pattern is dot+caption together-LEFT (gap 10), not SPACE_BETWEEN — Figma data property says SPACE_BETWEEN but visual canon shows together-LEFT; visual wins. Manifest bumped 1.4 → 1.5; chart promoted from roadmap to active; chart-reviewer status: contract-defined; presentation.md v1.1's anticipated R-COLOR-009 scoped exception now ratified by R-CHART-006; ebook.md cross-ref expanded with concrete embed pattern. New roadmap entry: `chunks/diagram.md` (Typst+Fletcher) for the Flow Diagram shape that this chunk excludes. | Mark + Claude |
| 2026-04-30 | **v1.0 — Initial.** 7 HARD rules (R-CHART-001..007) covering chart-card geometry, no-eyebrow-above-title, footer canonical shape when chrome is used, comparative-palette reservation for 3-state status only, value-labels-on-every-comparative-segment (color-blind safety), Vault Teal at 18 pt allowed for chart annotations within chart-card boundary (ratifies the scoped R-COLOR-009 exception declared in `presentation.md` v1.1), and the negative-bar / zero-line / dashed-gridline distinction for axis charts. BASE rules cover typography per role, surface palette (gradient default; flat off-white and solid teal as register tools), color recipes per surface (title / description / caption / footer top stroke / footer dot all flip per surface), bar geometry (radius 0 default; radius/xs allowed), radial geometry (3 cells × 200×200 rings × 0.88 inner radius × clockwise arc from 12 o'clock encoding percentage), and axis-chart specifics (7 ticks; absolute-positioned plot; dashed gridlines; solid zero line). MENU catalog of 5 canonical types: horizontal-bar (with two register variants on the same shape), vertical-bar-default, vertical-bar-with-axes, radial-comparison-dramatic, radial-comparison-light. Renderer pinned to Vega-Lite + JSON spec; Phase 2 deliverables in `renderers/vega-lite/`. One foundation override (scoped R-COLOR-009 exception per R-CHART-006). Flow Diagram and Stat Infographic explicitly out of scope (Flow → future `chunks/diagram.md` via Typst+Fletcher; Stat Infographic → `myvault-editorial.typ` editorial primitive). Cycle 0 audit at `chunks/_research/chart-figma-audit.md` corrects three deltas in the 9-day-old `project_diagram_canonical_specs` memory. | Mark + Claude |
