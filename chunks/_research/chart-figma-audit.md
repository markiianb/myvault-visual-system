---
title: Chart chunk — Figma Diagrams page audit
status: cycle-0-research
date: 2026-04-30
purpose: |
  Cycle 0 audit of the Diagrams page (Figma node 70:8479) to extract canonical
  specs for the chart asset-type chunk. Cross-checks the 9-day-old
  project_diagram_canonical_specs memory against current Figma state so that
  chunks/chart.md v0.1 codifies what is true today, not what was true
  2026-04-21.
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "70:8479"
  pageName: "Diagrams"
related_chunks: [chart, ebook, presentation]
related_memories: [project_diagram_canonical_specs]
---

# Chart chunk — Figma Diagrams page audit

## Top-level frames found (8 sections, 7 chart types)

| Section ID | Name | Frame size | Surface |
|---|---|---|---|
| `70:8480` | Horizontal Bar Chart (variant 1) | 960×451 | Gradient — warm cream (4 stops) |
| `70:8520` | Horizontal Bar Chart (variant 2) | 960×449 | Gradient — cool lavender (2 stops) |
| `70:8617` | Vertical Bar Chart | 640×615 | Gradient — warm cream (4 stops) |
| `70:8705` | Vertical Bar Chart — With Axes | 960×669 | **Flat** off-white #fbfaf5 |
| `70:8651` | Radial Chart — Dramatic | 960×550 | Solid teal #094545 |
| `70:8678` | Radial Chart — Light | 960×550 | Gradient (4 stops) |
| `70:8560` | Flow Diagram | 1332×700 | Off-white body + off-white footer |
| `70:8598` | Stat Infographic | 1240×294 | White body + 2px signal-go outer stroke |

## Universal facts confirmed (across all chart-card variants)

- **Card frame `cornerRadius: 0`** — flat rectangles, all variants, every chart-card. Not radius/2xl as the 9-day-old memory claimed. **Memory delta**.
- **Card stroke**: 1px gray-01 (`#dddcd6`), `INSIDE` align, all sides
- **Title typography**: PT Serif Regular 40pt @ 125% LH, LEFT-aligned, surface-paired color
- **Description typography**: Lato Regular 14pt @ 150% LH, LEFT-aligned, gray-02 (or off-white on dark)
- **Value labels / category labels**: Lato Regular 14pt @ 150% LH
- **Source caption**: Lato Regular 12pt @ 150% LH, gray-02 (or off-white on dark)
- **Footer dot**: 6×6 ellipse, surface-paired color (teal on light gradient, white on dark teal, black on light gradient when contrast warrants it)
- **Footer dot + caption layout**: HORIZONTAL `SPACE_BETWEEN` — dot pushed far-LEFT, caption pushed far-RIGHT inside a width-locked row. Not "dot+caption inline together" as memory implied. **Memory delta**.
- **Phosphor icons** for everything: shield-check, file-text, user, files, timer, check-circle, etc. Bound to color tokens.
- **Comparative palette** (verified RGB resolution to hex):
  - Red: `VariableID:1:38` = `#E75247`
  - Blue: `VariableID:1:39` = `#4D80E6`
  - Green: `VariableID:1:37` (= signal-go) = `#69DE49`
- **Token bindings** every fill / stroke / radius traces back to a `VariableID` — which means the existing `tokens/brand.tokens.json` carries them already.

## Memory deltas (the 9-day-old memory was wrong on these)

| Memory said | Figma actually shows | Take |
|---|---|---|
| Card radius/2xl (24) | `cornerRadius: 0` on every chart frame | **Cards are flat rectangles.** Update memory. Codify in BASE — radius 0 is the default for chart-cards. |
| "No hairline divider above footer; `stroke: null`" | Every footer carries a top-side stroke (1px). Color varies by surface (see below) | **Footers do have a top hairline.** It's narrow and quiet, but it's there. Update memory. Codify in BASE — hairline color tracks surface. |
| Dot + caption inline together | Figma data property says `SPACE_BETWEEN` BUT visual canon (Mark's edit pass) shows them together-LEFT with a 10-px gap | **Visual canon wins.** The data property is a Figma drift (likely set when the design had a 3rd footer element that was later removed). R-CHART-003 codifies dot + caption together-LEFT, gap 10, HUG width — not SPACE_BETWEEN. |
| Bar radius "0 — or 2 for subtle softening" | Bars are `cornerRadius: 0` except one bar in horizontal-v1 row 3 has radius 2 (bound to `radius/xs` token) | Per-bar radius is a styling choice, not a HARD rule. BASE default = 0; radius/xs (2) allowed. |
| Universal rules apply | Vertical Bar with Axes uses **flat off-white** as surface, not gradient. Radial Dramatic uses **solid teal**, not gradient. | Surface family is wider than memory suggests — gradient | flat off-white | solid teal | gradient (light variant). Codify in BASE surface menu. |

## Footer top-stroke color matrix (NEW finding — not in memory)

The footer top stroke isn't a single rule — its color tracks the chart surface:

| Chart surface | Footer top stroke |
|---|---|
| Gradient — warm cream (Horiz Bar v1, Vert Bar) | 1px **gray-01** `#dddcd6` (or 1px black @ 0.1 opacity for Horiz Bar v1+v2 — slight inconsistency between variants) |
| Gradient — cool lavender (Horiz Bar v2) | 1px black @ 0.1 opacity |
| Flat off-white (Vert Bar with Axes) | 1px **gray-01** |
| Solid teal (Radial Dramatic) | 1px **off-white** `#fbfaf5` |
| Gradient light (Radial Light) | 1px **gray-01** |
| Off-white (Flow Diagram footer is at TOP) | 1px **gray-01** on top + sides, no bottom |
| Stat Infographic | No footer top stroke; uses 2px signal-go full-width divider as a separate frame |

**The two horizontal-bar variants disagree** — v1 and v2 both use 1px black @ 0.1 opacity, but the vertical-bar charts and radials use 1px gray-01 full opacity. This is a Figma-level inconsistency. The chunk should pick one and codify.

**Recommendation:** BASE rule = "footer top stroke 1px, color = gray-01 on light surfaces, off-white on dark surfaces." That's the canonical pattern across 5 of 7 frames; treat the horizontal-bar 0.1-opacity-black as a Figma drift to fix.

## Per-chart spec details

### Horizontal Bar Chart (gradient surface — variant 1: `70:8480`)

```
Card 960 × 451 (HUG height)
  layout: VERTICAL, gap 20, padding 40
  fill: GRADIENT_LINEAR (4 stops, warm cream)
  stroke: 1px gray-01 inside
  cornerRadius: 0

  Header 880 × 81
    layout: VERTICAL, gap 10, padding 0, FILL/HUG
    Title    "Chart Title Goes Here"  PT Serif Regular 40pt 125% black LEFT
    Caption  "A concise line…"         Lato Regular 14pt 150% gray-02 LEFT

  Plot 880 × 216
    layout: VERTICAL, gap 4 (tight), padding 0, FILL/HUG
    5 × Row, each 880 × 40
      layout: HORIZONTAL, gap 0, FILL/HUG, primary MIN, counter CENTER
      Label  120 × 40        VERTICAL, primary CENTER
        Text Lato 14pt RIGHT-aligned
      Bar+Value (HUG/HUG)    HORIZONTAL, gap 12
        Bar         RECTANGLE  variable_w × 40, fill teal, cornerRadius 0 (or 2 for radius/xs)
        Value       Lato 14pt black LEFT

  Footer 880 × 34
    layout: HORIZONTAL, gap 10, padding 16/0/0/0, FILL/HUG, counter CENTER
    stroke: top 1px black @ 0.1 opacity (drift — should be gray-01)
    Frame2 880 × 18  HORIZONTAL, SPACE_BETWEEN, FIXED/HUG
      Ellipse 6 × 6 teal
      Caption "Source / caption — MyVault, 2026"  Lato 12pt 150% gray-02
```

**Variant 2 (`70:8520`) deltas** — header gap 8 (not 10); gradient swapped to 2-stop cool lavender.

### Vertical Bar Chart (no axes — `70:8617`)

```
Card 640 × 615 (HUG height)
  layout: VERTICAL, gap 20, padding 40
  fill: GRADIENT_LINEAR (4 stops, warm cream)
  stroke: 1px gray-01

  Header 406 × 79  HUG/HUG, gap 8

  Plot 560 × 382
    layout: HORIZONTAL, gap 32, padding 0/16/0/16, HUG/HUG, primary MIN counter MAX
    5 × Column, each 80 × 382
      layout: VERTICAL, gap 10, primary MIN counter CENTER
      Value      "92"  Lato 14pt black LEFT
      Track      80 × 320 FIXED/FIXED, primary MAX counter CENTER
        Bar      80 × var_h, teal, no radius (aligned to bottom of track)
      Category   Lato 14pt CENTER black

  Footer 560 × 34  FILL, padding-top 16, top stroke 1px gray-01
    Same dot+caption SPACE_BETWEEN pattern as horizontal
```

### Vertical Bar Chart — With Axes (`70:8705`)

```
Card 960 × 669
  layout: VERTICAL, gap 28, padding 40/48/40/48 (extra L/R)
  fill: SOLID off-white #fbfaf5
  stroke: 1px gray-01

  Header 864 × 79  FILL, gap 8

  Plot 864 × 420  NO LAYOUT MODE (absolute positioning)
    Y-axis labels (Lato 14pt gray-02): -3, -2, 0, 2, 4, 6, 8 (7 ticks)
    Gridlines:
      Non-zero:   1px gray-01, dashPattern [2, 5]
      Zero line:  1px gray-02, solid (NOT dashed) — semantic distinction
    Bars 110 × variable height:
      Negative bar: SOLID gray-02 fill + 1px gray-01 stroke (NOT white-outline)
      Positive bar: SOLID teal fill, no stroke
      Value labels Lato 14pt black, above (positive) or below (negative)
      Category labels Lato 14pt gray-02 CENTER below baseline

  Footer 864 × 34  FILL, padding-top 16, top stroke 1px gray-01
```

### Radial Chart — Dramatic (`70:8651`)

```
Card 960 × 550
  layout: VERTICAL, gap 20, padding 40
  fill: SOLID teal #094545
  stroke: 1px gray-01

  Header 880 × 79  FILL, gap 8
    Title         PT Serif 40pt 125% white LEFT
    Description   Lato 14pt 150% off-white LEFT

  Plot 880 × 317  HORIZONTAL, gap 40, padding 40/0/40/0, FILL, primary CENTER counter MIN
    3 cells, each ~267 × 237, FILL distribution
      layout: VERTICAL, gap 16, primary MIN counter CENTER
      Rings 200 × 200
        Track ellipse 200×200, white @ 0.25 opacity, innerRadius 0.88, full circle
        Data ellipse  200×200, comparative-palette color, innerRadius 0.88
                      arc startAngle 4.71 rad (= 12 o'clock visually), arc clockwise per percentage
        Center label  PT Serif 40pt 125% white LEFT-aligned (centered visually inside rings frame)
      Cell label   Lato 14pt 150% white CENTER

  Footer 880 × 34  FILL, padding-top 16, top stroke 1px off-white
    Ellipse 6×6 white + caption Lato 12pt off-white  (SPACE_BETWEEN)
```

**Comparative palette confirmed:** Cell 1 = red, Cell 2 = blue, Cell 3 = green — left-to-right.

### Radial Chart — Light (`70:8678`)

Identical structure to Dramatic, with these surface-paired changes:
- Surface: GRADIENT_LINEAR (cream → light → warm-tan → soft-purple, 4 stops)
- Title black, description gray-02
- Track ring color: gray-01 `#dddcd6` (not white at 0.25)
- Center label: black
- Cell label: black CENTER
- Footer top stroke 1px gray-01
- Footer dot: BLACK (not teal — interesting choice, contrasts with dot-color-tracks-surface elsewhere)

### Flow Diagram (`70:8560`)

```
Outer frame 1332 × 700  VERTICAL, gap 0, no padding
  Footer 1332 × 60   HORIZONTAL, gap 14, padding 16/12/16/12, FILL/HUG
    fill: off-white
    strokes: 1px gray-01 on TOP + RIGHT + LEFT (no bottom)
    Icon 28 × 28  (Phosphor shield-check, black)
    Title "Diagram title goes here"  PT Serif Regular 20pt black LEFT

  Body 1332 × 640   NO LAYOUT MODE (free positioning)
    fill: off-white
    stroke: 1px gray-01 all sides
    Pill nodes (Diagram / Node / Label):
      cornerRadius 99, padding 12/20/12/20, gap 8, white fill, 1px gray-01 stroke
      Optional icon 18 × 18 (some pills have no icon)
      Text Lato 14pt black LEFT
    Accent nodes (Diagram / Node / Accent):
      200 × 130 FIXED, padding 20, gap 8, primary CENTER counter CENTER, no stroke
      Teal variant:  fill teal, icon white, label white Lato 16pt
      Green variant: fill signal-go, icon TEAL, label TEAL Lato 16pt  (key inversion)
    Code nodes (Diagram / Node / Code):
      108 × 158 HUG, padding 16/18, white fill, 1px gray-01 stroke
      Multi-line text Lato 13pt 160% LH black
    Connectors (VECTOR nodes):
      Data flow:    2px signal-go (#69DE49)
      Logical/etc:  2px gray-02 dashPattern [4, 4]
      Routing:      L-shape / right-angle (vertical + horizontal vector segments)
```

**Key observation:** Flow Diagram is structurally not a chart. It is layout + node-graph + free-positioned connectors. **Out of scope for Vega-Lite.**

### Stat Infographic (`70:8598`)

```
Outer frame 1240 × 294 (HUG height)  VERTICAL, gap 0, no padding
  fill: white
  stroke: 2px signal-go OUTSIDE (full-card green border)

  Body 1240 × 240  HORIZONTAL, gap 40, padding 48/56/48/56, FILL
    fill: white
    3 columns, each ~349 × 144, VERTICAL gap 20
      Icon 48 × 48 (Phosphor, signal-go fill)
      Stat title  PT Serif Regular 28pt 120% black LEFT  (e.g., "92% faster setup")
      Caption     Lato Regular 16pt 140% gray-02 LEFT

  Divider 1240 × 2 — fill signal-go (full-width green stripe)

  Footer 1240 × 52  HORIZONTAL, gap 12, padding 14/20/14/20, FILL, no fill
    Icon 24 × 24 (signal-go fill)
    Title PT Serif Regular 18pt signal-go LEFT  (e.g., "MyVault · Onboarding stats")
```

**Key observation:** Stat Infographic is structurally a 3-column layout with Phosphor icons + typography. **Not data viz; out of scope for Vega-Lite.** Adjacent to the `hero-stats` primitive already in `myvault-editorial.typ`.

## Patterns that emerged across all chart-cards

1. **Header-Plot-Footer triptych.** Every chart-card has these three frames. The Header carries title + description; the Plot is the only chart-specific region; the Footer carries dot + source caption.
2. **Footer dot is a brand mark, not a bullet.** It's a 6×6 token-color ellipse far-left in a SPACE_BETWEEN row. It signals the source attribution band — small, deliberate, surface-aware.
3. **Surface drives every other color.** Title color, description color, footer stroke color, footer dot color, footer caption color all flip per surface. The same chart-card on teal vs. on cream is two different color recipes.
4. **Token bindings are clean.** Every notable fill / stroke / radius traces to a `VariableID` — meaning `tokens/brand.tokens.json` already carries the values. The Vega-Lite theme just needs to inherit them.
5. **Phosphor everywhere.** Icons in chart cards are Phosphor instances bound to color tokens. The chunk inherits R-ICON automatically.

## Implications for chunks/chart.md

**Vega-Lite scope (data viz):**
- Horizontal Bar Chart (1 type, gradient surface canonical; flat off-white acceptable for register variation)
- Vertical Bar Chart (no axes — gradient surface)
- Vertical Bar Chart with Axes (flat off-white surface, dashed gridlines, zero line distinction, negative-bar gray-02 treatment)
- Radial Chart — Dramatic (teal surface, white text, comparative palette)
- Radial Chart — Light (gradient surface, black text, comparative palette)

**Out of Vega-Lite scope:**
- **Flow Diagram** — node-graph with free-positioned connectors. Belongs in a future `chunks/diagram.md` chunk, or as Typst+Fletcher primitive in `myvault-editorial.typ`. Recommendation: defer.
- **Stat Infographic** — 3-column icon+stat+caption layout with full-card signal-go border + signal-go divider + signal-go footer band. Structurally a layout deliverable, not a data viz. Recommendation: codify as an editorial primitive in `myvault-editorial.typ` (similar to `hero-stats` but with the green-border signature). Out of scope for `chart.md`.

**Surface families (BASE menu in chart.md):**
- gradient (warm cream — default)
- gradient (cool lavender — alternate register)
- gradient (light — for radial light)
- flat off-white (preferred for charts with axes that benefit from a quiet field)
- solid teal (for dramatic radial; could extend to other dramatic data slides)

**Footer convention (BASE in chart.md):**
- 1px top stroke on FILL-width footer, padding-top 16
- Stroke color: gray-01 on light surfaces, off-white on dark surfaces (R-COLOR pairings inherit)
- HORIZONTAL SPACE_BETWEEN row inside footer — Ellipse(6×6 dot, surface-paired color) far-LEFT, source caption (Lato 12pt 150% gray-02 / off-white) far-RIGHT
- The 0.1-opacity-black drift on horizontal bar variants is fixable; not honored as canon.

**Comparative palette HARD reservation (R-CHART-004):**
- Verified palette: red `#E75247`, blue `#4D80E6`, green `#69DE49`
- Reserved for **3-state radial comparisons** (per Figma — both radials use the same 3 colors)
- For sequential / quantitative data: use teal single-series or teal-gradient ramp (not the comparative trio)

**Vault Teal at 18pt scoped exception (R-CHART-006):**
- The 14pt category labels and 12pt caption labels use gray-02, not teal — so the existing presentation chunk's chart-card-Vault-Teal-at-18pt scoped exception is more permissive than the Diagrams page actually demonstrates. Worth a clarifying note: chunks/chart.md ratifies the exception but observes that current Figma canon doesn't actually exercise it. The exception lets *future* chart annotations use teal at 18pt; today's chart-cards keep labels in gray-02.

## Open scope question for Mark

Vega-Lite renders types 1-5 (bars + radials). It cannot render Flow Diagram or Stat Infographic. Three options for what `chunks/chart.md` covers:

| Option | What it means |
|---|---|
| **A** — chart.md = data viz only | Bars + radials. Flow + Infographic split off (Flow → future `chunks/diagram.md` rendered with Typst+Fletcher; Infographic → editorial primitive in `myvault-editorial.typ`) |
| **B** — chart.md = mixed renderer | Vega-Lite for bars + radials, Typst for Flow + Infographic. Single chunk, two renderers. Re-introduces the hybrid we declined. |
| **C** — chart.md = all-Vega | Drop down to Vega (not Vega-Lite) — its lower-level grammar can do node-link diagrams. Single renderer. Steeper authoring cost; less LLM training data than Vega-Lite. |

**Recommendation: A.** Keeps `chart.md` coherent. Flow Diagram is genuinely a different shape (node-graph, free positioning, connectors). Stat Infographic is genuinely a layout primitive (no data binding). Treating them as charts because they live on the Diagrams page in Figma is folder-organization, not asset-type identity.

If A: `chart.md` v1.0 covers 5 canonical types (2 horizontal-bar variants share one type); a future `diagram.md` chunk handles Flow Diagram; `myvault-editorial.typ` adds a `stat-infographic` primitive (signal-go border + 3 columns + signal-go footer band).
