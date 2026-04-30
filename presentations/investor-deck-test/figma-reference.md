---
type: design-system-audit
status: resolved
owner: "[[Mark Bobyliak]]"
created: 2026-04-30
updated: 2026-04-30 (Cycle 0 audit complete)
tags:
  - design-system
  - presentations
  - figma-audit
  - chunks-validation
related:
  chunk: "[[10-Brand/visual-system/chunks/presentation]]"
  fixture: "[[10-Brand/visual-system/presentations/investor-deck-test/deck-content-v1]]"
  workflow: "[[10-Brand/visual-system/documents/ebook-test/workflow]]"
summary: "Figma audit baseline for the presentation chunk. Cycle 0 extraction (2026-04-30) covers all 13 finished slide-type prototypes in Section 1 (97:8611) of file Pm31BDHj34WjJ7NjBK4Ady. The prior 8 Slide Templates prototypes (76:9735) no longer exist — that section was deleted. Audit surfaces 8 deltas requiring Mark's call: 1 critical (header text on every slide vs R-PRES-002 'no top header strip'), 1 structural (Slide Templates deletion vs chunk reference), 6 BASE refinements (default surface, body alpha on dark, typography ladder, 56pt usage, chart-label teal, Slide 09 sub-title-as-title)."
---

# Figma audit — presentation prototypes

## Purpose

Audit baseline for the presentation chunk. Captures exact-value state of every slide-type prototype in Figma and surfaces deltas vs. `chunks/presentation.md`. Per `documents/ebook-test/workflow.md` (Cycle 0):

> **Trust Figma over the chunk doc when they disagree.** Figma wins by default — the chunk gets revised to match.

Eight deltas surfaced — listed in §**Findings** below. The §**Resolution log** records the call on each (chunk update / Figma update / documented deviation).

## Source of truth

- **File:** `Pm31BDHj34WjJ7NjBK4Ady` — MyVault — Brand Design System
- **Page:** `74:9684` — Presentations
- **Pattern Reference:** `97:8611` — Section 1 (nested inside `97:7729` Title slides)
  - 13 finished slide-type prototypes (Slide 09 / Thesis Block through Slide 21 / Ask · Use of Funds)
  - Mark's draft frames Title-9 through Title-20 (12 frames — ground-truth sketches per `claude-handoff-prompt.md`)
- **Slide Templates section** (was `76:9735`) — **DELETED.** No longer exists on the page. The 8 earlier canonical prototypes (Slide 01 / Title through Slide 08 / Comparison) are gone. The chunk + manifest references to it are stale.
- **Title slides — older drafts** (`97:7729` direct children) — Title-1 through Title-8 are pre-Section-1 Mark drafts; ignored by this audit (they were the originals that fed into the now-deprecated Slide Templates).

## Findings — 8 deltas

| # | Severity | Delta | Resolution |
|---|---|---|---|
| 1 | **Critical** | Every prototype carries top-of-slide header text — "MyVault AI Deck" left + section name right (e.g., "Thesis", "Problem", "Why Now") at Lato Regular 18pt gray-02 (or white on dark). R-PRES-002 says **no top header strip on any slide**, and `deck-content-v1.md` v3 explicitly removed it. The prototypes contradict the chunk, the v3 canon, and `feedback_presentation_design_canon`. | **Mark's call.** Either: (a) the prototypes are stale and need the header text removed, or (b) the canon has shifted and R-PRES-002 + v3 + memory all need revision. The screenshot confirms the header text is visually present (no bar, just two text labels at top — but functionally a header). |
| 2 | **Structural** | The Slide Templates section (`76:9735`) was deleted from Figma. The 8 earlier prototypes no longer exist. The chunk `chunks/presentation.md`, the manifest `chunks/_manifest.yaml`, and this audit doc all reference 21 prototypes — only 13 exist. | **Chunk update needed.** Update `chunks/presentation.md` Pattern Reference + `chunks/_manifest.yaml` `pattern_reference_sections` to drop Slide Templates and reference only Section 1 (13 prototypes). |
| 3 | BASE | Default surface in Figma is `color/core/white`, not `color/core/off-white`. 11 of 13 content prototypes use white; only Slide 17 (Feature Comparison) uses off-white. The chunk's BASE Surface Palette table lists off-white first as "Default — most slides" and white second as "Quiet content slides." Aligns with `feedback_white_is_default_surface` ("White is the default surface; off-white is the rare alternate"). | **Chunk update needed.** Swap rows in BASE Surface Palette: white is default, off-white is the rare alternate. |
| 4 | BASE | Body text on dark surfaces is solid `color/core/white`, not `color/core/white @ 0.85` as the chunk's BASE table claims. Slides 10 (teal) and 12 (black) both use solid white for body. | **Chunk update needed.** Drop the `@ 0.85` opacity from the BASE table — body on dark is solid white. |
| 5 | BASE | Vault Teal appears at 18pt on chart axis labels and year labels in Slide 16 (Traction) and Slide 20 (Financials). 18pt is well below display tier; this technically violates foundation R-COLOR-009 ("no teal below display tier"). | **Mark's call.** Either: (a) chart annotations are an explicit exception to R-COLOR-009 (chart context, not body context), or (b) chart axis labels should be in `gray-02` like other 18pt captions. Recommend (a) — the prototypes look intentional and chart-labels-as-brand-color is a defensible editorial choice. If accepted, R-COLOR-009 needs an "except chart annotations" carve-out. |
| 6 | BASE | The typography ladder in Figma includes **64pt, 48pt, 32pt** beyond the 144/72/56/40/28/18 in the chunk's BASE table. 64pt: Slide 14 SAM hero ($4.5–5.4B). 48pt: Slide 20 Financials stat tile values. 32pt: Slide 16/20 chart card titles. | **Chunk update needed.** Extend BASE typography table with mid-display tier rows for chart card title (32pt), mid-stat tile (48pt), and mid-display heading (64pt). |
| 7 | BASE | 56pt usage in Figma is broader than the chunk's "Statement-style headline (Solution, single-idea slides)." Figma uses 56pt for column heads (Slide 15 Direct/Advisors, Slide 18 phase heads), TAM stat (Slide 14), and stat-tile heroes (Slide 16). | **Chunk update needed.** Broaden 56pt BASE row from "Statement-style headline only" to include "column heads, mid-tier stat values, prominent secondary headings" — i.e., the mid-display tier between 72pt big titles and 40pt card heads. |
| 8 | BASE | Slide 09 Thesis "Why MyVault wins" headline uses **PT Serif Regular 40pt** — sized like a card heading rather than a big slide title (72pt) or statement headline (56pt). All other content slides use 72pt for the slide title. | **Mark's call.** Either: (a) the Thesis slide intentionally drops the title to 40pt because the 5 thesis cards carry the visual weight, or (b) the title should be 56pt or 72pt to anchor the slide. Recommend (a) — the cards are the slide's content; a small headline above them reads as editorial calm. If accepted, document as a deliberate stylistic choice for the Thesis pattern. |

## Confirmed canon (no delta)

These match between Figma and the chunk:

- **Frame 1920 × 1080** — ✓ all 13 prototypes
- **Padding 20 / 40 / 20 / 40** — ✓ all 13 prototypes
- **Auto-layout vertical, item-spacing 20** — ✓ all 13 prototypes
- **Body — Lato Regular 28pt @ 140%** — ✓ on every body text node
- **Big slide title — PT Serif Regular 72pt @ 115%** — ✓ Slides 10/11/12/13/14/15/16/17/18/19/20 (10 of 13; Slide 09 = 40pt per delta 8; Slide 21 = 144pt hero)
- **Card heading — PT Serif Regular 40pt @ 125%** — ✓ Slides 09/11/12/13/15/18/21
- **Page number — Lato Regular 18pt** in `gray-02` (light surface) or `white` (dark surface) — ✓ all 13 prototypes
- **Card padding 40 / 40 / 40 / 40** — ✓ Slides 09/11 confirmed by inner-content positions (x:40, y:40)
- **3-column grid 587 × N** — ✓ Slides 09 (Thesis) / 11 (Why-Now) confirmed by 507 + 40+40 = 587 card widths
- **2-column grid 900 × N** — ✓ Slides 15 (Two-Stream) / 18 (Phase Diagram) inferred from row layouts
- **Vault Teal at 144pt display tier** — ✓ Slide 19 Team initials (MS / MB / —), Slide 21 Ask hero ($[X]M)
- **Hero teal-as-surface for SOM panel** — Slide 14 Market Sizing has a Vault-Teal SOM panel with white text (per BASE Surface Palette dramatic register)
- **Editorial gradient on Cover-style register** — Slide 21 Ask uses `style(gradient/warm)` ✓ matches BASE editorial-gradient register

## Per-prototype tables

### Slide 09 / Thesis Block — `99:8612`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Padding (T/R/B/L) | 20 / 40 / 20 / 40 | 20 / 40 / 20 / 40 | ✓ |
| Auto-layout | VERTICAL, item-spacing 20 | VERTICAL, item-spacing 20 | ✓ |
| Header text | "MyVault AI Deck" Lato 18 gray-02 + "Thesis" Lato 18 gray-02 (top of slide) | none — R-PRES-002 forbids | **delta 1** |
| Slide title | PT Serif Regular **40pt** @ 125% black | 72pt big title (or 56pt statement) | **delta 8** |
| Card body | PT Serif Regular **28pt** @ 130% black | typography table allows PT Serif body for editorial register | ✓ (matches "Distinctive serif body" row) |
| Card layout | x:40, y:40 (40px padding) | 40 / 40 / 40 / 40 | ✓ |
| Card body width | 507px | 587 card – 40 – 40 = 507 | ✓ |
| Page number | "02" Lato 18 gray-02 | Lato 18 gray-02 | ✓ |

### Slide 10 / Three-Panel Diagnostic — `99:8638`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/teal)` (full-bleed dramatic) | dramatic-register surface for problem-style slides | ✓ |
| Padding | 20 / 40 / 20 / 40 | 20 / 40 / 20 / 40 | ✓ |
| Header text | "MyVault AI Deck" Lato 18 white + "Problem" Lato 18 white | none | **delta 1** |
| Row heading | PT Serif Regular **72pt** @ 115% white | 72pt big title | ✓ |
| Row body | Lato Regular 28pt @ 140% **solid white** | white @ 0.85 on dark | **delta 4** |
| Row body width | 880 | 2-col: 900 | ~✓ (tight 2-col variant) |
| Page number | "03" Lato 18 white | Lato 18 white on dark | ✓ |

### Slide 11 / Why-Now Wedge — `99:8656`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Why Now" | none | **delta 1** |
| Slide title | PT Serif 72pt @ 115% black | 72pt big title | ✓ |
| Card heading | PT Serif 40pt @ 125% black | 40pt card head | ✓ |
| Card body | Lato 28pt @ 140% black | 28pt body | ✓ |
| Card width | 587 (507 body + 40 + 40 padding) | 3-col 587 × N | ✓ |
| Page number | "04" Lato 18 gray-02 | gray-02 | ✓ |

### Slide 12 / Architecture Diagram — `99:8677`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/black)` (editorial-dark) | dark register | ✓ |
| Header text | "MyVault AI Deck" + "Architecture" 18 white | none | **delta 1** |
| Slide title | PT Serif 72pt white | 72pt big title | ✓ |
| Body sentence | Lato 28pt **solid white** | white @ 0.85 | **delta 4** |
| Layer-band heading | PT Serif 40pt white | 40pt card head | ✓ |
| Layer-band body | Lato 28pt **solid white** | white @ 0.85 | **delta 4** |
| Page number | "06" Lato 18 white | white on dark | ✓ |

### Slide 13 / Product Demo — `99:8718`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Product" | none | **delta 1** |
| Slide title | PT Serif 72pt @ 115% black | 72pt big title | ✓ |
| Callout heading | PT Serif 40pt @ 125% black | 40pt card head | ✓ |
| Callout body | Lato 28pt @ 140% black | 28pt body | ✓ |
| Mockup placeholder | "[ iPhone mockup ]" Lato 18 black | (placeholder — not chunk BASE) | n/a |
| Page number | "07" gray-02 | ✓ | ✓ |

### Slide 14 / Market Sizing — `99:8822`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Market" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Footer caption | Lato 28pt black | 28pt body | ✓ |
| TAM block: label | "TAM" Lato 18 black | tile label 18pt | ✓ |
| TAM block: hero | "$14.2B" PT Serif **56pt** gray-02 | (delta 7 — broader 56pt usage) | **delta 7** |
| SAM block: label | "SAM" Lato 18 black | tile label | ✓ |
| SAM block: hero | "$4.5–5.4B" PT Serif **64pt** teal | 64pt not in BASE ladder | **delta 6** |
| SOM panel: label | "SOM · 3-year" Lato 18 white | tile label on dark | ✓ |
| SOM panel: hero | "$50–72M" PT Serif **72pt** white (on Vault Teal surface) | 72pt big title; Vault Teal-as-surface for dramatic block | ✓ |
| SOM panel: body | Lato 28pt solid white (on teal) | (delta 4 — solid white not 0.85) | **delta 4** |
| Page number | "08" gray-02 | ✓ | ✓ |

### Slide 15 / Two-Stream Model — `99:8842`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Business Model" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Phase tag (Direct) | "Phase 1 · running now" Lato 28 white (on Vault Teal pill) | 28pt body | ✓ |
| Phase tag (Advisors) | "Phase 2 · Q3 2026" Lato 28 white (on accent pill) | 28pt body | ✓ |
| Column head | "Direct" / "Advisors" PT Serif **56pt** @ 125% black | (delta 7 — broader 56pt) | **delta 7** |
| Column descriptor | Lato 28pt black | 28pt body | ✓ |
| Row label | "Who pays" / "Pricing" / "Margin" / "Distribution" Lato 28 gray-02 | 28pt body in gray-02 | ✓ |
| Row value | Lato 28pt black | 28pt body | ✓ |
| 2-col grid | label 180 + 16 + value 624 = 820 inner; 80 padding ⇒ 900 col × 2 = 1800 + 40 gap | 900 × N + 40 gap = 1840 | ✓ |
| Page number | "09" gray-02 | ✓ | ✓ |

### Slide 16 / Traction Hero — `99:8882`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Traction" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Subtitle | Lato 28pt black | 28pt body | ✓ |
| Chart card title | "Chart Title Goes Here" PT Serif **32pt** @ 125% black | 32pt not in BASE ladder | **delta 6** |
| Chart card description | Lato 28pt gray-02 | 28pt body | ✓ |
| Chart Y-axis labels | "0", "25", "50", "75" Lato **18pt teal** | teal at 18pt below display tier — R-COLOR-009 conflict | **delta 5** |
| Chart source caption | Lato 18pt teal | (caption-tier teal) | **delta 5** |
| Stat tile label | "Beta cohort" / etc. Lato 18 black | tile label | ✓ |
| Stat tile value | "[INSERT]" PT Serif **56pt** @ 115% black | (delta 7 — broader 56pt; mid-stat) | **delta 7** |
| Page number | "10" gray-02 | ✓ | ✓ |

### Slide 17 / Feature Comparison — `99:8915`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/off-white)` | off-white | ✓ (only prototype to use off-white) |
| Header text | "MyVault AI Deck" + "Competition" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Row label | Lato 28pt black | 28pt body | ✓ |
| Column header (MyVault + 4 competitors) | Lato 28pt black | 28pt body | ✓ |
| Legend | Lato 18pt black | 18pt caption tier | ✓ |
| Page number | "11" gray-02 | ✓ | ✓ |

### Slide 18 / Phase Diagram — `99:8961`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Go-to-Market" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Phase tag | Lato 28pt white (on accent pill) | 28pt body | ✓ |
| Phase head | "Direct" / "Advisors" PT Serif **56pt** @ 125% black | (delta 7) | **delta 7** |
| Phase body row | Lato 28pt black | 28pt body | ✓ |
| Page number | "12" gray-02 | ✓ | ✓ |

### Slide 19 / Team Grid — `99:8991`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Team" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Team initials | "MS" / "MB" / "—" PT Serif **144pt** @ 110% Vault Teal | 144pt teal display tier (Team initials) | ✓ |
| Name | PT Serif 28pt @ 125% black | (BASE doesn't have a 28pt PT Serif heading row separate from "distinctive serif body" — names function as headings) | **observation** |
| Role | Lato 18pt black | 18pt caption | ✓ |
| Bio one-liner | Lato 28pt black | 28pt body | ✓ |
| 3-col grid | name+bio body w:587 | 587 × 3 + 40 + 40 = 1841 | ✓ |
| Page number | "13" gray-02 | ✓ | ✓ |

### Slide 20 / Financials Curve — `99:9014`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `var(color/core/white)` | off-white default | **delta 3** |
| Header text | "MyVault AI Deck" + "Financials" | none | **delta 1** |
| Slide title | PT Serif 72pt black | 72pt big title | ✓ |
| Chart card title | "Revenue · ARR ($M)" PT Serif **32pt** @ 125% black | 32pt not in BASE | **delta 6** |
| Chart card subtitle | Lato 28pt gray-02 | 28pt body | ✓ |
| Chart Y-axis labels | "$0", "$25M", "$50M", "$75M" Lato **18pt teal** | teal at 18pt — R-COLOR-009 conflict | **delta 5** |
| Chart X-axis years | "2026"–"2029" Lato 18pt teal | teal at 18pt — R-COLOR-009 conflict | **delta 5** |
| Legend (DTC / B2B2C / Burn) | Lato 18pt teal | teal at 18pt | **delta 5** |
| Source caption | Lato 18pt teal | teal at 18pt | **delta 5** |
| Stat tile label | Lato 18pt black | tile label | ✓ |
| Stat tile value | "[INSERT]" PT Serif **48pt** @ 115% black | 48pt not in BASE ladder | **delta 6** |
| Page number | "14" gray-02 | ✓ | ✓ |

### Slide 21 / Ask · Use of Funds — `99:9060`

| Property | Figma value | Chunk BASE value | Delta |
|---|---|---|---|
| Frame size | 1920 × 1080 | 1920 × 1080 | ✓ |
| Surface | `style(gradient/warm)` | editorial gradient — Cover/Section divider/Ask | ✓ |
| Header text | "MyVault AI Deck" + "Ask" | none | **delta 1** |
| Lead-in | "We're raising" PT Serif 28pt @ 130% black | 28pt distinctive serif body | ✓ |
| Hero amount | "$[X]M" PT Serif **144pt** @ 110% Vault Teal (1840-wide centered behavior) | 144pt teal hero amount on Ask | ✓ |
| Round line | "Series [Seed | A] · 18-month runway" PT Serif 28pt @ 130% black | 28pt distinctive serif body | ✓ |
| Use-of-funds heading | PT Serif **40pt** @ 125% black | 40pt card head | ✓ |
| Use-of-funds body | Lato 28pt @ 140% black | 28pt body | ✓ |
| Milestone line | "From [current state] to..." PT Serif 28pt @ 140% black | 28pt distinctive serif body | ✓ |
| Page number | "15" gray-02 | ✓ | ✓ |

## Resolution log

Each delta is owned and tracked here through to resolution.

| Date | Delta | Owner | Resolution | Notes |
|---|---|---|---|---|
| 2026-04-30 | 1 — Header text on every prototype vs R-PRES-002 | Mark | **RESOLVED — accept as canon, reshape R-PRES-002** | The header text labels are not a decorative bar; they are text-only wayfinding. R-PRES-002 v1.1 distinguishes "no decorative top header bar / strip / fill / rule" (HARD prohibition) from "text-only header labels at top of interior slides allowed: deck-name left + section-name right, Lato Regular 18 in gray-02/white per surface, SPACE_BETWEEN row, conditional." Memory entry updated. `deck-content-v1.md` v3→v4 reconciled. |
| 2026-04-30 | 2 — Slide Templates section deleted | Claude | **RESOLVED — chunk + manifest updated** | `chunks/presentation.md` v1.1 Pattern Reference references Section 1 only. `chunks/_manifest.yaml` v1.3 dropped Slide Templates from `pattern_reference_sections` and added a `prior_section_removed` note. |
| 2026-04-30 | 3 — Default surface white not off-white | Claude | **RESOLVED — BASE Surface Palette swapped** | White is default; off-white is rare alternate. Aligns with `feedback_white_is_default_surface`. |
| 2026-04-30 | 4 — Body color on dark = solid white | Claude | **RESOLVED — BASE typography updated** | Dropped `@ 0.85` (body) and `@ 0.6` (small text) opacity references; body and 18pt text on dark are solid white. Footer / header label rows aligned. |
| 2026-04-30 | 5 — Teal at 18pt on chart axis labels | Mark | **RESOLVED — scoped exception to R-COLOR-009** | Added as the chunk's second `foundation_overrides` entry. Vault Teal at 18pt allowed for chart annotations (axis labels, year labels, legend labels, source captions) inside chart-card boundaries only. Body and non-chart captions still bind R-COLOR-009. To be ratified at foundation level when `chunks/chart.md` ships. |
| 2026-04-30 | 6 — Typography ladder 64 / 48 / 32pt | Claude | **RESOLVED — BASE ladder extended** | Three rows added: 64pt (mid-display heading), 48pt (mid-stat tile value), 32pt (chart card title). Total tiers: 6 → 9. |
| 2026-04-30 | 7 — 56pt usage broader than chunk | Claude | **RESOLVED — BASE 56pt row broadened** | Description now covers Statement headlines, column heads, phase heads, mid-tier stat values, prominent secondary headings (was just Statement-style headline). |
| 2026-04-30 | 8 — Slide 09 Thesis title at 40pt | Mark | **RESOLVED — accept as Thesis-pattern stylistic choice** | Documented in chunk Pattern Reference under "Notable stylistic choice — Slide 09 Thesis title at 40pt." Editorial calm; the 5 thesis cards carry the slide's visual weight. Future Thesis-pattern compositions may inherit the convention. Not a license to drop big titles to 40pt elsewhere. |

## Mark's draft frames — ground-truth context

`Title slides` → `Section 1` also contains 12 of Mark's draft frames (`Title - 9` through `Title - 20`) that the 13 finished prototypes were elevated from. Per `claude-handoff-prompt.md` "Use them as ground truth for layout and tone." These are not audit targets — the audit's scope is the canonical prototypes — but they remain the reference for visual decisions when the prototypes are ambiguous.

| Title-N | Figma id | Maps to deck slide |
|---|---|---|
| Title - 9 | 97:8051 | Cover (slide 1) |
| Title - 10 | 97:8080 | Thesis (slide 2) |
| Title - 11 | 97:8109 | (TBD) |
| Title - 12 | 97:8130 | (TBD) |
| Title - 13 | 97:8151 | Problem (slide 3) |
| Title - 14 | 97:8197 | Why Now (slide 4) |
| Title - 15 | 97:8259 | Solution (slide 5) |
| Title - 16 | 97:8292 | Solution divider |
| Title - 17 | 97:8333 | Product divider |
| Title - 18 | 97:8348 | Product Demo (slide 7) |
| Title - 19 | 97:8407 | Market divider |
| Title - 20 | 97:8422 | Market chart |

Title - 1 through Title - 8 are older drafts that fed the now-deprecated 8 Slide Templates section; ignored by this audit.

## Cycle 0 → Cycle 1 plan

**Cycle 0 closed.** All 8 deltas resolved on 2026-04-30. No Cycle 1 audit required because the resolutions did not modify any Figma prototype — they updated the chunk, manifest, memory entry, and deck-content fixture to match what Figma already showed. The prototypes are now the canon; the chunk reflects them.

What's done:
1. ✓ `chunks/presentation.md` v1.0 → v1.1 — 8 deltas applied; foundation_overrides expanded from 1 to 2.
2. ✓ `chunks/_manifest.yaml` v1.2 → v1.3 — chunk metadata refreshed; Slide Templates dropped; chrome_policy added.
3. ✓ `feedback_presentation_design_canon.md` memory — body replaced with pointer to chunk + headline canon; MEMORY.md index updated.
4. ✓ `presentations/investor-deck-test/deck-content-v1.md` v3 → v4 — header chrome distinction (bar vs labels), Vault Teal discipline-not-list framing, body-solid-white-on-dark, typography ladder extended.
5. ✓ `STATUS.md` — Phase 1.7.1 entry; total foundation overrides 1 → 2.

What's next:
- **Thread C — Presentation Figma guide page** (in flight) — mirror foundation-page layout pattern; sections for canvas, header labels, footer, typography ladder, hero color, column system, slide-type catalog (link to Section 1), Don'ts, accessibility.
- **Phase 2 — Marp theme + per-pattern layouts** — queued behind Thread C. The chunk's HARD + BASE contract is the spec; Marp implementation builds the theme.

## `figma_execute` extraction snippet

The snippet that produced the Cycle 0 data is preserved here for re-runs. Walks all 13 Section-1 prototypes; returns frame size + padding + auto-layout + surface (with bound variable name when present) + every text node's family/style/size/lh/align/fill (with bound variable name when present).

```javascript
await figma.loadAllPagesAsync();

const PROTOTYPE_IDS = [
  "99:8612", "99:8638", "99:8656", "99:8677", "99:8718",
  "99:8822", "99:8842", "99:8882", "99:8915", "99:8961",
  "99:8991", "99:9014", "99:9060",
];

const variableNameById = new Map();
for (const v of await figma.variables.getLocalVariablesAsync()) variableNameById.set(v.id, v.name);
const styleNameById = new Map();
for (const s of await figma.getLocalPaintStylesAsync()) styleNameById.set(s.id, s.name);

const fillSummary = (fills) => {
  if (!Array.isArray(fills) || fills.length === 0) return "none";
  const f = fills[0];
  if (f.type === "SOLID") {
    const bound = f.boundVariables?.color?.id ? variableNameById.get(f.boundVariables.color.id) : null;
    return bound ? `var(${bound})` : `solid(${Math.round(f.color.r*255)},${Math.round(f.color.g*255)},${Math.round(f.color.b*255)})`;
  }
  return f.type;
};
const lhString = (lh) => !lh || lh.unit === "AUTO" ? "AUTO" : (lh.unit === "PERCENT" ? `${lh.value}%` : `${lh.value}px`);

const walkText = (node, out, depth = 0) => {
  if (node.type === "TEXT") out.push({
    name: node.name, x: Math.round(node.x), y: Math.round(node.y), w: Math.round(node.width), h: Math.round(node.height),
    family: node.fontName?.family, style: node.fontName?.style, size: node.fontSize,
    lh: lhString(node.lineHeight), align: node.textAlignHorizontal, fill: fillSummary(node.fills),
  });
  if ("children" in node && depth < 8) for (const c of node.children) walkText(c, out, depth + 1);
};

const summarize = (frame) => {
  const texts = [];
  walkText(frame, texts);
  const styleId = frame.fillStyleId;
  const surfaceFromStyle = (typeof styleId === "string" && styleNameById.has(styleId)) ? `style(${styleNameById.get(styleId)})` : null;
  return {
    id: frame.id, name: frame.name,
    size: { w: Math.round(frame.width), h: Math.round(frame.height) },
    padding: { t: frame.paddingTop, r: frame.paddingRight, b: frame.paddingBottom, l: frame.paddingLeft },
    autoLayout: frame.layoutMode, itemSpacing: frame.itemSpacing,
    surface: surfaceFromStyle ?? fillSummary(frame.fills),
    childCount: frame.children?.length ?? 0, textCount: texts.length, texts,
  };
};

const output = {};
for (const id of PROTOTYPE_IDS) {
  const node = await figma.getNodeByIdAsync(id);
  output[id] = node ? summarize(node) : "NOT_FOUND";
}
return output;
```

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-30 | Cycle 0 closed — all 8 deltas resolved. Mark accepted: header text labels as canon (R-PRES-002 reshaped to "no decorative bar; text-only labels allowed"), chart-card teal as scoped R-COLOR-009 exception (chunk's second `foundation_overrides` entry), Slide 09 Thesis-pattern title at 40pt as deliberate stylistic choice. Mechanical updates landed: Slide Templates ref dropped, white default surface, solid white body on dark, typography ladder extended to 9 tiers, 56pt usage broadened. Chunk v1.0 → v1.1; manifest v1.2 → v1.3; deck-content-v1 v3 → v4; memory entry replaced with chunk pointer. No Figma changes — the prototypes are the canon. | Mark + Claude |
| 2026-04-30 | Cycle 0 audit complete. All 13 Section-1 prototypes extracted via `figma_execute`. 8 deltas surfaced (1 critical, 1 structural, 6 BASE refinements). 5 of 8 deltas have direct chunk-update resolutions; 3 require Mark's call (header strip, chart-label teal, Slide 09 sub-title-as-title). Slide Templates section confirmed deleted from Figma — chunk + manifest references are stale. Filled the audit doc from scaffold to filled status. | Mark + Claude |
| 2026-04-30 | Scaffold created. Audit table headers + 21 prototype rows + extraction template. Filling pending Desktop Bridge reconnect. | Mark + Claude |
