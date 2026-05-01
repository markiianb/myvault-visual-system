---
chunk_id: presentation
domain: chunks
subcategory: asset-type
type: chunk
status: active
version: "1.3"
last_updated: 2026-05-01 (R-COLOR-009 chart-card exception removed from foundation_overrides — now inherited from foundations/color.md v1.1; renderer promoted from provisional to active)
owner: mark
summary: "Asset-type chunk for slide deck deliverables. 3 HARD rules (R-PRES-001..003) covering slide canvas geometry; no decorative top header bar / strip / fill (text-only wayfinding labels are allowed when present); canonical footer shape when chrome is used; and 18pt text floor (R-TYPE-005 foundation override). BASE rules cover typography per role with full ladder (144 / 72 / 64 / 56 / 48 / 40 / 32 / 28 / 18 across PT Serif + Lato), surface palette + register guidance (white default, off-white as rare alternate per `feedback_white_is_default_surface`), Vault Teal discipline (sparingly; chart-card annotation exception inherited from R-COLOR-009 v1.1), body color on dark surfaces is solid white, 70/20/7/3 proportion, 1/2/3-column grid, card padding, header-and-footer text-label pattern with Icon-variant pairing, typical deck shape (Cover and Closing as default patterns, not contracts). Pattern Reference points at Figma Section 1 (97:8611) — 13 prototypes are study material, not a closed catalog. Two-layer reviewer: rule-compliance (automated) + reader-experience (judgment-based, asks how the slide reads at presentation distance). Renderer pinned to Marp (active). No mandatory slide structure — `feedback_no_mandatory_pages_editorial_first` applies."
token_count_estimate: 1400

# === RENDERER PINNING ===
renderer: marp
spec_format: md
template_path: brand-studio/templates/presentation/myvault-presentation/  # Phase 2
output_formats: [pdf, pptx, html]
renderer_status: provisional
renderer_note: "Marp is pinned for the chunk's spec contract, not for the chunk's rule shape. The chunk is renderer-agnostic — switching to Slidev or Reveal.js later only changes Phase 2 deliverables."

# === FOUNDATIONS THIS CHUNK INHERITS FROM ===
inherits_from_foundations:
  - color
  - typography
  - logo-usage
  - iconography

# === TOKENS + ASSETS CONSUMED ===
token_dependencies:
  - color.core.*
  - color.secondary.*
  - color.signal.go
  - color.signal.stop
  - color.signal.sky
  - gradient.*
  - typography.*
  - space.*
  - radius.*
asset_dependencies:
  - assets/logo/icon-primary.svg
  - assets/logo/icon-white.svg
  - assets/logo/icon-light.svg
  - assets/logo/lockup-primary.svg
  - assets/logo/lockup-white.svg
  - assets/icons/icons-manifest.json

# === VISUAL CANON (Figma) ===
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "74:9684"
  pageName: "Presentations"
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=74-9684"
  pattern_reference_section:
    sectionId: "97:8611"
    sectionName: "Section 1"
    parentSectionId: "97:7729"
    parentSectionName: "Title slides"
    note: "13 finished slide-type prototypes (Slide 09 / Thesis Block through Slide 21 / Ask · Use of Funds) live here, alongside Mark's draft frames Title-9 through Title-20 (12 frames — ground-truth sketches per claude-handoff-prompt.md). These are register inspiration for new compositions, not templates."
  prior_section_removed:
    note: "An earlier Slide Templates section (76:9735) held 8 canonical type prototypes (Title, Agenda, Section Divider Light/Dark, Statement, Stat Block, Logo Reveal, Comparison). The section was deleted from Figma during v3 of the investor-deck test. Section 1 now holds the canonical pattern reference."

# === REVIEWER AXES ===
review_axes:
  - presentation-reviewer
  - color-reviewer
  - typography-reviewer
  - brand-element-reviewer
  - accessibility-reviewer

# === DELIVERABLE METADATA ===
asset_type: presentation
typical_use:
  - "investor decks"
  - "internal updates and all-hands"
  - "sales decks and partner pitches"
  - "talk decks and conference presentations"
  - "lookbook decks (slide-form portfolio)"

# === CROSS-REFS ===
related_chunks:
  - ebook
  - social
  - chart
related_memories:
  - feedback_no_mandatory_pages_editorial_first
  - feedback_presentation_design_canon
  - project_investor_deck_design_system
  - feedback_design_pages_are_guidelines
  - feedback_chunk_size_placement_pins
  - feedback_grid_is_content_specific
  - feedback_white_is_default_surface
  - feedback_hero_color_80_20_black_teal
  - feedback_regular_weight_only
  - feedback_no_uppercase_eyebrows

# === FOUNDATION OVERRIDES ===
# R-COLOR-009's chart-card scoped exception was ratified into foundations/color.md v1.1
# on 2026-05-01. It no longer needs a chunk-level override — the foundation rule itself
# now carries the exception clause. Charts on slides inherit it from the foundation.
foundation_overrides:
  - rule_id: R-TYPE-005
    chunk: typography
    nature: raise-floor
    from: "14pt practical text floor"
    to: "18pt presentation text floor"
    rationale: "Presentations are read at distance (projector / large display / video screen). 14pt body text fails legibility from row 5 onward in a typical room. R-PRES-003 raises the floor for this asset type. There is no 12pt caption tier in presentations — the smallest legitimate text is the 18pt page number in the footer."
    enforced_by: R-PRES-003
---

# Presentation

## Purpose & scope

This chunk governs every slide-deck deliverable: investor decks, sales decks, internal updates, partner pitches, talk decks, conference slides, lookbook decks. It does not govern documents (`ebook.md`), social images (`social.md`), or charts standalone (`chart.md`) — but a chart embedded inside a slide follows this chunk's slide rules and `chart.md`'s data-viz rules together.

A presentation is composed, not assembled from a catalog. Each slide is a bespoke arrangement of canvas + content + register, shaped by the moment in the deck arc. This chunk specifies the *contracts every slide must hold* (HARD), the *defaults that hold unless the deliverable says otherwise* (BASE), and *patterns to study for register inspiration* (Pattern Reference). It deliberately does not specify a closed catalog of slide types and **does not impose a mandatory slide structure** — per `feedback_no_mandatory_pages_editorial_first`, each deck decides what slides it needs based on what serves its audience. A 6-slide internal update has no Cover ceremony, no Ask, no Section Dividers; a 30-slide investor deck has all of those. Both are valid as long as the HARD rules and foundation rules hold.

## Tokens + assets consumed

This chunk pulls from foundation tokens. It does not introduce new tokens.

| Source | What it provides |
|---|---|
| `tokens/brand.tokens.json` → `color.*`, `typography.*`, `gradient.*`, `space.*`, `radius.*` | Every value used on every slide |
| `assets/logo/icon-primary.svg` (and `icon-white`, `icon-light`) | Footer brand-mark per surface variant |
| `assets/logo/lockup-primary.svg` (and `lockup-white`) | Cover lockup; reuse where the slide warrants explicit brand presence |
| `assets/icons/icons-manifest.json` | Phosphor icons for callouts, list markers, diagram annotations, status indicators |

## Slide canvas (universal foundation)

Every slide is built on the same canvas:

- **Frame:** 1920 × 1080 (16:9 landscape)
- **Padding:** 20 / 40 / 20 / 40 (top / right / bottom / left)
- **Auto-layout:** vertical, item-spacing 20
- **Children:** content rows. Optional chrome — text-only header labels at the top, a footer row at the bottom — are typical on interior content slides but conditional, not mandatory (per R-PRES-002).

Codified as R-PRES-001 (geometry) and R-PRES-002 (no decorative top header bar; canonical text-label shape for header and footer chrome when present).

## Severity tiers

This chunk uses three tiers — same convention as other asset-type chunks:

- **HARD** — non-negotiable. Reviewer agents reject violations. Each carries a stable ID (`R-PRES-NNN`) and a machine-checkable predicate.
- **BASE** — defaults that apply unless the deliverable spec says otherwise. Document the deviation in the spec.
- **Pattern Reference** — replaces the MENU tier used by `ebook.md`. Slide compositions in Figma are *register inspiration*, not a catalog to pick from. Reviewers do not enforce or reject pattern fit. Authors compose what the content requires, with the patterns as vocabulary.

## HARD rules

### R-PRES-001 — Slide canvas locked
- **Spec:** Slide frame **1920 × 1080**; padding **20 / 40 / 20 / 40**; vertical auto-layout with item-spacing **20**; children are content rows plus optional header-label and footer chrome rows (presence governed by R-PRES-002).
- **Rationale:** A consistent canvas is the floor every other rule depends on. 1920 × 1080 is the modern projector / display / video standard. Auto-layout — not absolute positioning — is what lets the renderer recompose slides for different content lengths without breaking. The 20-px vertical padding is tight on purpose: presentations are read at distance, and visual breathing room comes from the content rhythm, not from slide-edge whitespace.
- **Allowed deviation:** None at the canvas level. Aspect-ratio variants (e.g., 4:3 legacy decks) require an explicit deliverable-spec deviation and a separate render path.
- **Check:** any slide with frame ≠ 1920 × 1080 OR padding ≠ 20/40/20/40 OR a non-vertical-auto-layout root → reject.

### R-PRES-002 — No decorative top header bar; canonical text-label shape for header and footer chrome when present
- **Spec, three parts:**
  1. **No decorative top header bar / strip / fill / rule.** No background-filled chrome bar at the top of the slide. No section title set in a deck-name colored block. No horizontal rule under the header area. The top of the slide is either empty or carries text-only labels per part 2.
  2. **Text-only header labels are allowed at the top of interior content slides.** Canonical shape: 1840-wide row, horizontal auto-layout, `primaryAxisAlignItems: SPACE_BETWEEN`. Left: deck-name (e.g., "MyVault AI Deck"). Right: section-name (e.g., "Thesis", "Problem", "Why Now", "Architecture"). Both Lato Regular 18pt, color per surface (`gray-02` on light surfaces; `white` on dark surfaces). No fills, no rules, no background blocks — text only. Header-label presence is conditional (Cover, Closing, full-bleed editorial slides typically omit them).
  3. **Footer chrome (when present) follows the canonical shape:** 1840 × 24, horizontal auto-layout, `primaryAxisAlignItems: SPACE_BETWEEN`. Left: brand-mark icon (variant per surface — see BASE). Right: page number (Lato Regular 18, color per surface). The footer either follows this shape exactly or is absent.
- **Header-label and footer presence are conditional, not mandatory.** Per `feedback_no_mandatory_pages_editorial_first` (chrome is conditional), header labels and footer are default patterns on interior content slides — not contracts on every slide. A Cover, a Closing, a full-bleed pull-quote slide, a single-statement editorial slide may opt out of either or both. The deliverable spec or the slide's composition logic governs presence.
- **Rationale:** Slides feel calm when chrome is text-only and quiet. A filled header bar competes with content; small wayfinding labels at the top do not. The text-only constraint preserves the calm-not-loud principle while accepting Mark's actual canon (every prototype in Section 1 carries the deck-name + section-name labels at the top, no decorative fill). The HARD part is the *shape* of header and footer chrome when they appear — text-only top, footer follows the 1840 × 24 SPACE_BETWEEN structure — not the *presence* on every slide.
- **Check:** any slide with a filled / colored / ruled top header bar → reject. Any slide whose header text labels violate the SPACE_BETWEEN deck-name-left / section-name-right shape (e.g., centered, multi-line, oversized) → reject. Any slide whose footer violates the 1840 × 24 SPACE_BETWEEN icon-left / page-number-right shape → reject. Header or footer absence is not a violation.

### R-PRES-003 — 18pt text floor (foundation override of R-TYPE-005)
- **Spec:** No text on any slide drops below **18 pt**. This raises the foundation R-TYPE-005 14-pt practical floor for the presentation asset type. The smallest legitimate text in this chunk is the 18-pt page number in the footer.
- **Rationale:** Presentations are read at distance — projector in a meeting room, large display in a boardroom, video frame on a small viewer's screen. 14-pt body text fails legibility from row 5 onward in a typical room and dissolves entirely in compressed video. The 18-pt floor is what makes the deck readable in every consumption context.
- **Foundation-override note:** R-PRES-003 is the chunks layer's only *raise-floor* override — making R-TYPE-005's 14-pt foundation floor stricter (18 pt) for the presentation asset type. Other chunks (ebook, social, chart) leave R-TYPE-005 at 14 pt because their consumption contexts (close-reading PDF, hand-held social tile, screen-sized chart) tolerate it. R-PRES-003's override is *additive* — every other foundation rule still binds. The chart-annotation scoped exception that this chunk used to carry as a second override has been ratified into `foundations/color.md` R-COLOR-009 v1.1 (2026-05-01) and is now inherited from the foundation rather than declared here.
- **Check:** any text node with font-size < 18 pt → reject. Caption-tier typography tokens (`typography.caption` 12 pt) are simply not used in this asset type.

## BASE rules

### Default typography per role

These are typical defaults across MyVault decks. Deviation is allowed; document it in the deliverable spec. Foundation rules (R-TYPE-001 Regular only, R-TYPE-002 PT Serif + Lato only, R-COLOR-009 no teal below display tier — including its ratified chart-card 18-pt scoped exception per foundations/color.md v1.1) catch any violation the BASE table doesn't enumerate.

| Role | Default | Notes |
|---|---|---|
| Hero divider word, Cover hero, hero amount on Ask, Team initials | PT Serif Regular **144 pt** @ 110%, `color.core.teal` | The display tier where teal lives — earned, not casual |
| Big slide title | PT Serif Regular **72 pt** @ 115%, `color.core.black` (or `color.core.white` on dark surface) | Titles are black, not teal — teal is reserved for the 144-pt tier and dramatic emphasis |
| Mid-display heading (large secondary stat / dramatic mid-tier) | PT Serif Regular **64 pt** @ 115%, color per role (e.g., `color.core.teal` for SAM-tier stats) | Used when the content needs more weight than 56pt but doesn't carry a slide title; e.g., Slide 14 SAM hero |
| Statement / column head / phase head / mid-tier stat hero | PT Serif Regular **56 pt** @ 115% (or 125% for column heads), `color.core.black` | Mid-display tier — Statement-style single-idea slides, column heads (Direct / Advisors), phase heads, mid-tier stat tile values, prominent secondary headings |
| Mid-stat tile value | PT Serif Regular **48 pt** @ 115%, `color.core.black` | Stat-tile hero numbers in chart-and-tiles compositions (e.g., Slide 20 Financials Year-N ARR tiles) |
| Card / callout heads, section sub-titles, use-of-funds heads | PT Serif Regular **40 pt** @ 125%, `color.core.black` | Default heading inside cards (Ingest / Direct / Device labels; Architecture layer-band heads) |
| Chart card title | PT Serif Regular **32 pt** @ 125%, `color.core.black` | The title above an embedded chart inside a chart card (Slide 16 Traction, Slide 20 Financials) |
| Body, sub-heading, row values, supporting paragraphs | Lato Regular **28 pt** @ 140%, `color.core.black` (or `color.core.white` solid on dark) | The reading body of every content slide. Body on dark surfaces is solid white, not @ 0.85 (per Cycle 0 audit) |
| Distinctive serif body (Thesis cards, editorial body, Ask lead-in / round line / milestone line) | PT Serif Regular **28 pt** @ 130%, `color.core.black` | Editorial-register alternative to Lato body when the content carries authority weight. Also the "name" line in the Team Grid pattern |
| Page number, phase tags, row labels, source captions, tile labels, legends, role lines, header labels | Lato Regular **18 pt** auto LH, `color.core.gray-02` (or `color.core.white` solid on dark) | The 18-pt floor — the smallest legitimate text. White on dark is solid, not @ 0.6 |

### Surface palette + register

The default surface is `color.core.white` (per `feedback_white_is_default_surface` and confirmed in 11 of 13 Section-1 prototypes). `color.core.off-white` is the rare alternate when the slide content benefits from a slightly warmer surface (e.g., comparative tables where rows sit better against a non-white field — Slide 17 Feature Comparison). Dark and gradient surfaces are *register tools* the author selects for dramatic moments. There is no closed mapping from slide kind to surface; the author chooses what the moment calls for.

| Surface | Typical use | Header label color | Footer Icon variant | Body / hero text |
|---|---|---|---|---|
| `color.core.white` | Default — most slides | `gray-02` | `icon-primary` + `gray-02` page number | `black` (solid) |
| `color.core.off-white` | Rare alternate — comparison tables, register variation | `gray-02` | `icon-primary` + `gray-02` page number | `black` (solid) |
| `color.core.teal` (full-bleed) | Dramatic register — Problem-style slides, full-bleed thesis moments, dramatic-block panels (e.g., SOM in Slide 14) | `white` | `icon-white` + white page number | `white` (solid) |
| `color.core.black` (full-bleed) | Editorial-dark register — Architecture-style slides, hero closer | `white` | `icon-white` + white page number | `white` (solid) |
| `color.secondary.premium-purple` / `dark-earth` / `rich-blue` | Muted dark register — section dividers, themed sequences | `off-white` (or solid white) | `icon-light` + off-white page number | `off-white` (or solid white) |
| Gradient paint styles (`gradient.greydient` / `primary` / `cool` / `warm` / `mist`) | Editorial gradient — Cover, section dividers, Ask hero, dramatic non-data slides | `gray-02` | `icon-primary` + `gray-02` page number | `black` (hero text only — R-COLOR-006 forbids body under gradient) |

Signal colors (`go` / `stop` / `sky` / `earth`) are **not valid slide surfaces** — they are status indicators only (R-COLOR-003).

### Vault Teal discipline

Vault Teal is the brand's hero color. Every instance on a slide must earn its presence. The Figma examples show where it currently earns: 144-pt display words, Cover hero, Ask hero amount, Team initials, full-bleed Problem-slide background, dramatic surface blocks (e.g., SOM panel in Slide 14 Market Sizing), 64-pt mid-display stats (Slide 14 SAM hero). These are illustrative — the discipline is *every teal instance carries weight*, not *teal lives in a closed list*.

The reviewer evaluates each teal instance for whether it carries the slide's emphasis. Decoration-grade teal — teal as a "look," teal as a tint applied because the slide felt empty — is the failure mode the discipline catches. Mid-tier body text in teal is also a failure (R-COLOR-009 — no teal below display tier).

**Chart-annotation exception (scoped):** Within chart cards (the bordered sub-frames that hold an embedded chart — Slide 16 Traction Hero, Slide 20 Financials Curve), Vault Teal is allowed at 18 pt for chart annotations: axis labels, year labels, legend labels, and source captions. The exception is now part of foundation R-COLOR-009 (`foundations/color.md` v1.1, ratified 2026-05-01) and is inherited automatically — this section just describes how it shows up in slide context. The exception applies only inside the chart card boundary, not to general 18-pt captions on the slide outside that card. Rationale: chart annotations are chart-context labels, not body-text captions; treating them as a brand-color labeling system within the chart card preserves the chart's identity as a designed element.

### 70/20/7/3 colour proportion + max-2-colours-per-graphic

A typical MyVault slide holds one dominant tone (often a panel or background block), one secondary tone (background or text), one small accent (signal-go), one hairline pop. Roughly 70 / 20 / 7 / 3 by area.

`color.signal.go` counts as punctuation, not a third color. One or two signal-go marks per slide — typically a small dot or hairline rule earning the role of "the slide's accent." Used sparingly because it is the canonical accent device across MyVault visuals.

### Column system

- **3-column body grid:** 587 × N, gap 40, total 1840 wide
- **2-column body grid:** 900 × N, gap 40, total 1840 wide
- **Single-column reading:** 1840 wide (the content area edge-to-edge inside the 40-px slide padding)

Cards inside columns: padding 40 / 40 / 40 / 40, item-spacing 22.

The grid is a default — slides may choose 1, 2, or 3 columns based on what the content calls for. Mixed-column slides (e.g., a hero stat above a 3-column row) are valid as long as each row holds its own grid consistently.

### Typical deck shape (default pattern, not a contract)

A typical MyVault deck — investor, sales, partner pitch — opens with a **Cover** and closes with a **Closing**. Cover establishes the brand moment; Closing leaves the audience with a sign-off, contact, or call-to-action. These are *patterns available to a deck*, not requirements (per `feedback_no_mandatory_pages_editorial_first`).

A short deliverable — a 6-slide internal update, a 4-slide one-question briefing, a single-screen all-hands recap — may legitimately omit Cover or Closing or both. The deliverable spec governs which patterns the deck pulls in.

When a deck is shaped for an investor / sales / pitch context, the typical arc is:

1. Cover (brand moment)
2. Thesis or Problem (state the bet or the pain)
3. Content slides (solution, architecture, product, market, model, traction, competition, GTM, team, financials)
4. Ask (the request)
5. Closing (sign-off, contact)

This is illustrative — Hoffman's investment-thesis-first arc is one proven shape, not the only shape. Talk decks, training decks, lookbook decks each take their own shape. The deliverable spec describes the arc; the chunk holds the rules.

### Closing observation pattern (optional)

A single PT Serif Regular **28–32 pt** line at the bottom of a content slide can synthesize the slide's argument and fill empty vertical space meaningfully. Used on slides where the body content (cards, rows, layers) doesn't fill the canvas and a synthesizing sentence reads better than vertical-centering.

**When to use:** Three-Panel Diagnostic, Why-Now Wedge, Architecture-style stack, Card-grid slides — content slides whose argument benefits from a closing thought.

**When not to use:** Cover, Closing, Stat Hero, Statement slides — these carry their own dominant element and don't need synthesis.

**Pattern:** below the body content, insert a `layoutGrow=1` spacer, then the observation line. The spacer pushes the line to the bottom; the line sits just above the footer.

Surfaced from the State of Family Privacy 2026 test deck (Cycle 3, 2026-04-30) where it cleaned up Slides 3, 4, 5 (Problem, Three Shifts, Architecture).

### Cover brand-mark anchor (optional)

Cover slides may carry a small brand-mark anchor (Icon-variant per surface, ≈ 32 px) at top-left in lieu of header-label chrome. This anchors the cover composition without claiming dominance. The mark follows the same surface→variant pairing as the footer Icon (icon-primary on light/gradient surfaces; icon-white on dark; icon-light on muted dark).

Closing slides may carry the same anchor. Whether to use one is a per-deliverable choice; the test deck used a teal hex anchor on the gradient/warm Cover and no anchor on the gradient/cool Closing.

### Header-label + footer Icon-variant pairing

The header text labels and the footer brand-mark icon both flip per surface (mirrors the canonical surface→icon pairings in `[[logo-usage]]`). Header labels and the footer page number share the same color rules — they are the same text-tier in the same Lato Regular 18pt:

| Surface | Header labels (deck-name, section-name) | Footer Icon | Page number color |
|---|---|---|---|
| Light surfaces (white, off-white, light gradients) | `color.core.gray-02` | `icon-primary` | `color.core.gray-02` |
| Dark teal / black | `color.core.white` (solid) | `icon-white` | `color.core.white` (solid) |
| Muted dark (premium-purple, dark-earth, rich-blue) | `color.core.off-white` (or solid white) | `icon-light` | `color.core.off-white` (or solid white) |
| Editorial gradients (cool, warm, mist, greydient) | `color.core.gray-02` | `icon-primary` | `color.core.gray-02` |

## Pattern reference

The Figma Presentations page (`74:9684`) holds the canonical pattern reference inside Section 1 (`97:8611`, nested in `97:7729` Title slides):

- **Section 1** — 13 finished slide-type prototypes built for the investor-deck test, alongside Mark's draft frames Title-9 through Title-20 (12 ground-truth sketches per `claude-handoff-prompt.md`). The 13 prototypes are: Thesis Block (`99:8612`), Three-Panel Diagnostic (`99:8638`), Why-Now Wedge (`99:8656`), Architecture Diagram (`99:8677`), Product Demo (`99:8718`), Market Sizing (`99:8822`), Two-Stream Model (`99:8842`), Traction Hero (`99:8882`), Feature Comparison (`99:8915`), Phase Diagram (`99:8961`), Team Grid (`99:8991`), Financials Curve (`99:9014`), Ask · Use of Funds (`99:9060`).

> **Note (Cycle 0 audit, 2026-04-30):** An earlier Slide Templates section (`76:9735`) held 8 canonical type prototypes (Title, Agenda, Section Divider Light/Dark, Statement, Stat Block, Logo Reveal, Comparison). That section was deleted from Figma during v3 of the investor-deck test. Section 1 is now the only canonical pattern reference.

**Framing.** These 13 prototypes are *examples of valid slides we have shipped*. They are study material for register, hierarchy, and visual rhythm — not templates to instantiate. When composing a new slide:

- Read the prototypes that share the *register* (calm / dramatic / data-heavy / editorial / single-idea) the new slide needs.
- Note how the prototype distributed canvas: where the hero sits, how the body wraps, where the accent earns its place.
- Compose the new slide using the rules (HARD + BASE + foundation), borrowing register and rhythm decisions from the prototypes when they fit, and inventing new compositions when the content calls for it.

**Notable stylistic choice — Slide 09 Thesis title at 40pt.** The Thesis Block pattern uses PT Serif Regular **40 pt** (card-heading tier) for "Why MyVault wins" rather than the typical 72-pt big-title default. This is a deliberate Thesis-pattern choice: the five thesis cards carry the slide's visual weight, and a quieter headline above them reads as editorial calm. Other slide types using the Thesis pattern (Investment Thesis, Why-We-Win) may inherit this 40-pt headline convention. This is documented for future Thesis-pattern compositions; it is not a license to drop big titles to 40 pt elsewhere.

The 13 prototypes are not a closed catalog. New slide compositions are welcome as long as R-PRES-001..003 and the foundation rules hold. A 14th composition tomorrow is a feature, not a violation.

**Implementation note — shape primitives, not unicode glyphs.** When a slide includes glyph-style markers (Harvey Balls in comparison tables, status indicators, bullet points needing token-bound color), implement them as Figma `Ellipse` / shape primitives — not unicode characters (`●` ◐ ○). Unicode glyphs render unevenly across systems and don't accept token-bound fills cleanly. Shape primitives bind to color tokens and render consistently. Surfaced from the State of Family Privacy 2026 test deck (Cycle 3, 2026-04-30) when the comparison-slide Harvey Balls failed initial render.

## Composition guidance for the agent

When generating a slide deck:

```
1. Receive brief
   - Identify the deliverable type (investor deck | sales deck | internal update | talk deck | lookbook)
   - Identify the audience and consumption context (boardroom projector | embedded video | PDF send-ahead)
   - Identify the narrative arc the deck must carry

2. Sketch the deck shape
   - The chunk imposes no mandatory slides. Decide what the audience needs based on the deliverable type.
   - Investor / sales / partner decks: typically open with Cover, close with Closing, with Thesis or Problem early and Ask near close — but every slide is the deliverable spec's call.
   - Internal updates, talks, lookbooks: structure is shaped by the talk, not by a template. A 6-slide update may have no Cover and no Closing.
   - Do NOT pick from a fixed slide-type list. The shape is determined by what each moment in the arc must communicate.

3. For each slide, compose:
   a. What does this slide need to communicate? One idea, or one tightly-scoped cluster of ideas.
   b. What register serves it? Calm / dramatic / data-heavy / editorial / single-idea.
   c. What surface? Off-white default; dark or gradient for dramatic register; choose by what the moment calls for.
   d. What hierarchy? Where does the eye land first; what supports the headline; what is footer/secondary.
   e. Compose using BASE typography, BASE column system, BASE card padding, BASE footer pattern.
   f. Reference Figma Section 1 prototypes for register inspiration when useful — never as templates.

4. Apply HARD primitives to every slide
   - R-PRES-001 canvas locked (1920×1080, padding 20/40/20/40, vertical auto-layout)
   - R-PRES-002 no decorative top header bar; text-only header labels are allowed (deck-name left + section-name right, Lato 18); canonical footer shape when chrome is used; both are conditional, not mandatory
   - R-PRES-003 18pt text floor (no caption tier)

5. Apply inherited foundation rules
   - R-COLOR (palette, gradient, contrast)
   - R-TYPE (families, weights, sizes — note R-TYPE-005 is overridden to 18pt for this asset type)
   - R-LOGO (cover lockup, footer icon variants per surface)
   - R-ICON (Phosphor only, default 24px / Regular / black)

6. Verify reader experience (the qualitative pass — see Reviewer Layer 2)
   - Hierarchy reads in 3 seconds at presentation distance
   - Each slide carries one idea, not five
   - Text legible from row 5+
   - Vault Teal earns its presence (or is absent)
   - Deck arc works as a narrative

7. Compose Marp spec (Phase 2)
   - Author writes markdown; the theme applies the rules
   - Per-pattern layouts (e.g., `<!-- _class: thesis -->`) handle complex compositions

8. Render → PDF / PPTX / HTML (Phase 2)

9. Reviewer swarm
   - Layer 1: rule-compliance reviewers (presentation, color, typography, brand-element, accessibility) — automated
   - Layer 2: presentation-reviewer reader-experience pass — judgment-based
```

## Reviewer agent integration

The presentation reviewer runs in two layers. Both are part of the reviewer's contract.

### Layer 1 — rule compliance (automated)

Mechanical checks against the rule set:

| Reviewer | What it checks |
|---|---|
| `presentation-reviewer` (Layer 1) | All R-PRES-001..003. Canvas geometry + padding + auto-layout root; no decorative top header bar on any slide (text-only header labels allowed when present); header label shape correct when present (SPACE_BETWEEN deck-name-left / section-name-right Lato 18); footer shape correct when present (1840×24 SPACE_BETWEEN icon-left / page-number-right); every text node ≥ 18 pt. Cites violations as `R-PRES-NNN at slide N`. **Does not** flag absent header labels, absent footers, missing Cover, or missing Closing — those are deliverable-spec choices, not violations. Vault Teal at 18 pt for chart-card annotations is allowed per the foundation-level R-COLOR-009 scoped exception (`foundations/color.md` v1.1); teal at 18 pt anywhere else still binds R-COLOR-009. |
| `color-reviewer` | Foundation R-COLOR-001..010 across all slides. Palette membership, gradient discipline, contrast pairs, Vault Teal teal-below-display violations. |
| `typography-reviewer` | Foundation R-TYPE-001..009 with the 18-pt floor in effect (R-TYPE-005 is overridden by R-PRES-003). Family / weight / size / line-height enforcement. |
| `brand-element-reviewer` | R-LOGO + R-ICON. Footer icon variant correct for surface, Cover lockup placement, no decorative icon tiling, no logo recolor. |
| `accessibility-reviewer` | WCAG 2.2 AA contrast on every text-on-surface pair. Touch targets if interactive. Caption-tier accessibility checks not applicable (no caption tier in this chunk). |

### Layer 2 — reader experience (judgment-based)

The qualitative pass — the thing rule-compliance review cannot catch. The presentation-reviewer evaluates each slide and the deck-as-whole against these questions:

**Per slide:**
1. **3-second test.** Does the hierarchy read in 3 seconds at presentation distance? The hero element should be unambiguous; the supporting elements should be clearly subordinate.
2. **One-idea test.** Does the slide carry one idea, or one tightly-scoped cluster? A slide trying to deliver five ideas at once fails this test even when every rule is satisfied.
3. **Distance legibility.** Could a viewer in row 5 of a meeting room read every text element? (Tied to but distinct from R-PRES-003 — 18 pt is the floor, not a guarantee of distance legibility for every layout.)
4. **Register match.** Does the slide's surface and tone match the moment in the deck arc? A dramatic teal full-bleed in the middle of quiet data slides is jarring unless the deck arc earns it.
5. **Vault Teal earns presence.** Every teal instance on the slide carries the slide's emphasis. No decoration-grade teal, no teal-as-tint.
6. **Calm, considered, not loud.** The slide should feel MyVault — quiet authority, not visual shouting. Ornament that doesn't earn its presence breaks this test.
7. **Brand voice in slide copy.** No banned words. Product Voice held where applicable. "Zero Trust, never zero-knowledge" if architecture is mentioned.

**Per deck:**
1. **Arc works.** The deck reads as a narrative — opening, build, close — not as a stack of slides.
2. **Cadence varies.** Dense data slides are punctuated by quieter slides. Five 3-column data slides in a row exhausts the reader.
3. **Chrome is consistent where it appears.** Slides that use the footer all carry the canonical shape; page numbers ascend correctly across slides that show them; the icon variant flips correctly across surface changes. Slides that opt out of footer chrome do so for a reason that the composition makes obvious.
4. **Opening and closing close the loop.** When the deck has a Cover and a Closing, the Closing references the Cover's promise — the deck feels finished, not abandoned. When the deck has neither, the first and last slides still carry that responsibility.

The Layer 2 reviewer outputs a structured pass / advisory list, not pass / fail. Layer 2 findings are advisory — they inform the author's revision, but they do not block the deliverable. (Layer 1 findings do block.)

## Renderer + spec format

**Renderer (provisional):** [Marp](https://marp.app) — markdown → deck. CSS-themed; per-slide directives (`<!-- _class: thesis -->`) drive layout selection. Outputs PDF, PPTX, HTML.

**Spec format:** `.md` with Marp directives.

**Why Marp (and the trade-off):** Simplest author flow — slides are markdown sections separated by `---`. CSS theming maps directly to the BASE typography table and column system. AI-friendly authoring — the spec is plain text, not Vue or HTML. The trade-off is that complex compositions (multi-layer Architecture Diagram, mirrored 2-column dual-stat, 5-staircase Thesis cards) become per-pattern layouts in the theme — CSS Grid + Marp directives carry weight Marp's defaults don't reach. Phase 2 builds those layouts; the chunk doesn't depend on it.

**Renderer-agnostic note:** The chunk's HARD + BASE + Pattern Reference + Reviewer-Layer-2 contract is renderer-agnostic. If Slidev (Vue components for complex slides) or Reveal.js (raw HTML) replaces Marp later, only Phase 2 deliverables change — the chunk does not.

**Phase 2 deliverable:** `myvault-tools/brand-studio/templates/presentation/` — Marp theme + per-pattern layout CSS. Author writes markdown with directives:

```md
---
marp: true
theme: myvault-presentation
paginate: true
---

<!-- _class: cover -->
# Cover headline
Subtitle line

---

<!-- _class: thesis -->
# Why MyVault wins.
1. ...
2. ...
3. ...
```

The theme applies HARD + BASE rules automatically; the author supplies content + register choices.

## Foundation overrides

**One.**

**R-PRES-003 raises foundation R-TYPE-005's 14-pt practical text floor to 18 pt** for the presentation asset type. The override is *raising* — more strict than the foundation rule. Raising is allowed freely at the chunk level.

The chart-card scoped exception to R-COLOR-009 that this chunk carried in v1.1–v1.2 has been ratified into `foundations/color.md` v1.1 (2026-05-01). It now lives at the foundation level and is inherited automatically by every asset-type chunk; this chunk no longer declares it as an override.

The chunk mechanism for foundation overrides:
- *Raising* (more strict) is allowed freely at the chunk level.
- *Scoped exceptions* (less strict in a defined scope) are allowed when the scope is documented and the foundation reviewer has access to the scope boundary — but should be promoted to foundation-level after a second chunk needs the same exception.
- *Universal lowering* (less strict everywhere) requires a foundation-level revision through ADR.

## Cross-references

- **`color`** — color tokens, surface rules, contrast authority
- **`typography`** — type styles per role; R-TYPE-005 is overridden by R-PRES-003
- **`logo-usage`** — Cover lockup, footer icon variants per surface
- **`iconography`** — callout icons, list markers, diagram annotations (Phosphor only)
- **`ebook`** (sibling) — different asset type with different geometry, grid, and structure rules. Both chunks share the foundation layer but carry independent contracts.
- **`feedback_design_pages_are_guidelines`** — informs the Pattern Reference framing
- **`feedback_chunk_size_placement_pins`** — informs why HARD rules are 3, not 8
- **`feedback_no_mandatory_pages_editorial_first`** — the principle that dropped what was R-PRES-004 (mandatory deck structure) into BASE
- **`feedback_white_is_default_surface`** — informs the BASE Surface Palette ordering (white default, off-white rare alternate)
- **`project_investor_deck_design_system`** — the test-fixture deck this chunk's canon was distilled from

## Visual canon

The Figma page `Presentations` (id `74:9684`, file `Pm31BDHj34WjJ7NjBK4Ady`) is the visual reference. Section 1 (id `97:8611`, nested in `97:7729` Title slides) holds the 13 prototypes. The earlier Slide Templates section (`76:9735`) was deleted from Figma during v3 of the investor-deck test; Section 1 is now the only canonical reference. Section 1 is bound to live tokens / paint styles / components — change a token, the prototypes update.

URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=74-9684>

## Memory linkage

Before this chunk, presentation canon lived in three memory entries plus one cross-cutting principle:

- `feedback_presentation_design_canon` — slide canvas + typography + Vault Teal reservation. **Largely superseded by this chunk.** The "Vault Teal reserved for the 5 places" clause is replaced by the discipline-not-list framing in the BASE Vault Teal section (with the chart-card 18-pt scoped exception added in v1.1). The 18-pt floor, body-Lato-28 / titles-72-black canon is now codified as HARD + BASE. The "no header strip" clause was reshaped in v1.1 to "no decorative top header bar; text-only header labels are allowed" after the Cycle 0 audit confirmed every Section-1 prototype carries deck-name + section-name labels.
- `project_investor_deck_design_system` — the investor deck IS the test fixture. **Preserved as project memory** (still useful pointer to where the test fixture lives and what it tests).
- `project_diagram_canonical_specs` — chart/diagram patterns. **Out of scope here** — those rules belong to `chart.md` (planned).
- `feedback_no_mandatory_pages_editorial_first` — the cross-cutting principle that no asset-type chunk imposes mandatory page/slide structure. **Active and shaping this chunk** — R-PRES-004 (minimum-viable deck structure) was drafted and removed during initial authoring once this principle landed; Cover and Closing now live in BASE as default patterns, not contracts.

These memory entries remain in `MEMORY.md` as historical pointers; their canon load is now this chunk's HARD + BASE. When `feedback_presentation_design_canon` is updated next, replace its body with a one-line pointer to this chunk.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-05-01 | **v1.3 — R-COLOR-009 chart-card exception ratified to foundations.** The chunk's second foundation override (scoped exception to R-COLOR-009 for chart annotations within chart cards) has been ratified into `foundations/color.md` v1.1 — the foundation rule itself now carries the exception clause. Per-chunk duplication was a smell (two asset chunks declaring the same exception against the same foundation rule); the foundation is now the single source of truth. Removed the override from `foundation_overrides` frontmatter (down from 2 to 1 — only R-PRES-003's R-TYPE-005 raise-floor remains). Updated BASE Vault Teal discipline prose, reviewer-agent integration line, and the Foundation overrides section to reference the foundation rule rather than declaring the exception. **Renderer status promoted from `provisional` to `active`** — Marp is the locked renderer for presentations (Mark, 2026-05-01). HARD/BASE/MENU contract unchanged. | Mark + Claude |
| 2026-04-30 | **v1.2 — Test-deck learnings landed.** End-to-end stress test of v1.1 via the State of Family Privacy 2026 deck (10 slides built fresh in Figma Section 2 `151:9048`, 3 review cycles). HARD + BASE contract held without rule changes — every fix landed inside BASE defaults. Three additive BASE patterns documented: (a) **Closing observation pattern** — optional 28–32 pt PT Serif synthesizing line at the bottom of content slides, with a `layoutGrow=1` spacer pushing it down. (b) **Cover brand-mark anchor** — optional small Icon-variant (≈32 px) at top-left in lieu of header-label chrome on Cover/Closing slides. (c) **Shape-primitive glyphs** — implement Harvey Balls and similar markers as Figma Ellipse/shape primitives, not unicode characters, for token-bound fills. No HARD rule changes. Foundation overrides unchanged (still 2 — R-TYPE-005 raise-floor and R-COLOR-009 chart-card scoped exception). Test artifacts at `presentations/test-state-of-privacy/`. | Mark + Claude |
| 2026-04-30 | **v1.1 — Cycle 0 audit deltas applied.** Eight deltas surfaced in `presentations/investor-deck-test/figma-reference.md` (audit of all 13 Section-1 prototypes via `figma_execute`). Resolutions: **(1) R-PRES-002 reshaped** — "no top header strip" became "no decorative top header bar / strip / fill / rule; text-only header labels at the top of interior slides are allowed (deck-name left + section-name right, Lato Regular 18 in `gray-02` on light / `white` on dark; SPACE_BETWEEN row); both header-labels and footer are conditional, not mandatory." Header-label color rules added to the surface→variant pairing table. **(2) Slide Templates references dropped** — section was deleted from Figma during v3; chunk + manifest now reference Section 1 only (13 prototypes, not 21). **(3) BASE Surface Palette swap** — `color.core.white` is now the default (per `feedback_white_is_default_surface` and 11/13 prototype confirmation); `color.core.off-white` is the rare alternate. **(4) Body color on dark surfaces** is solid `color.core.white`, not `@ 0.85`. Same for header labels and page numbers on dark — solid white. **(5) Vault Teal chart-annotation scoped exception** — added as the chunk's second `foundation_overrides` entry: R-COLOR-009 carves out chart-context labeling (axis labels, year labels, legend labels, source captions) inside chart cards. Narrow scope, ratified at foundation level when `chunks/chart.md` ships. **(6) Typography ladder extended** — added rows for 64 pt (mid-display heading), 48 pt (mid-stat tile value), 32 pt (chart card title) to BASE typography table. **(7) 56 pt usage broadened** — BASE description now covers Statement headlines, column heads, phase heads, mid-tier stat values, prominent secondary headings (was just "Statement-style headline"). **(8) Slide 09 Thesis-pattern title at 40 pt** — documented in Pattern Reference as a deliberate Thesis-pattern stylistic choice (cards carry weight; headline plays small for editorial calm). Foundation-overrides expanded from 1 to 2. Added `feedback_white_is_default_surface` to cross-references. | Mark + Claude |
| 2026-04-30 | v1.0 — Initial. **3 HARD rules** (R-PRES-001..003) covering canvas geometry (1920×1080, padding 20/40/20/40, vertical auto-layout), no-top-header-strip + canonical footer shape when chrome is used (footer presence itself conditional, not mandatory), and 18-pt text floor (first foundation override of R-TYPE-005). A 4th HARD rule (minimum-viable deck structure — Cover + Closing) was drafted and removed during initial authoring once `feedback_no_mandatory_pages_editorial_first` landed; Cover and Closing now live in BASE as default patterns, not contracts. BASE rules cover typography per role (144 / 72 / 56 / 40 / 28 / 18 across PT Serif + Lato), surface palette + register guidance, Vault Teal discipline (sparingly, every instance earns its presence — no closed reservation list), 70/20/7/3 + max-2-colours, 3-col / 2-col / 1-col grid, card padding 40 / 22, footer Icon-variant pairing per surface, typical deck shape. Pattern Reference replaces MENU — 13 Section 1 prototypes + 8 Slide Templates prototypes are study material for register, not templates. Two-layer reviewer: Layer 1 (rule compliance, automated) + Layer 2 (reader experience, judgment-based — 3-second test, one-idea test, distance legibility, register match, Vault Teal earns presence, calm-not-loud, brand-voice; deck-level arc / cadence / chrome consistency / opening-closing loop). Renderer pinned provisionally to Marp; chunk is renderer-agnostic. | Mark + Claude |
