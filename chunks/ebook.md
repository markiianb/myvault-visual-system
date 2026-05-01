---
chunk_id: ebook
domain: chunks
subcategory: asset-type
type: chunk
status: active
version: "1.4"
last_updated: 2026-05-01 (R-EBOOK-001/002 geometry synced to Figma canon)
owner: mark
summary: "Asset-type chunk for ebook + PDF document deliverables. 7 HARD rules (R-EBOOK-001..007) covering page geometry, page-category surface/numbering, signal-go reservation, every-cover-has-a-lockup, mandatory page structure, reading-order, and footnote numbering semantics. BASE rules for default typography per role (Section Opener title and Stat Page hero number are flexible defaults, not locks). MENU catalog of 3 cover treatments + 21 interior patterns (including 5 new editorial-first primitives validated in the privacy-guide build: section-opener-hero, hero-stats, model-grid, takeaways, pull-page). Renderer pinned to Typst (editorial primitives module: myvault-editorial.typ). No foundation overrides — all R-COLOR/R-TYPE/R-LOGO/R-ICON rules apply automatically."
token_count_estimate: 1700

# === RENDERER PINNING ===
renderer: typst
spec_format: typ
template_path: renderers/typst/myvault-editorial.typ  # Active. Composable primitives, not page-stamp templates.
legacy_template_path: renderers/typst/myvault-ebook.typ  # Page-stamp template, preserved for reference/migration only
output_formats: [pdf, pdf-a, pdf-ua]

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
  - assets/logo/lockup-primary.svg
  - assets/logo/icon-primary.svg
  - assets/icons/icons-manifest.json

# === VISUAL CANON (Figma) ===
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "70:8798"
  pageName: "eBooks & Documents"
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8798"
  note: "The Figma page IS the visual kit. Each layout in the chunk's MENU corresponds to a section there."

# === REVIEWER AXES ===
review_axes:
  - ebook-reviewer
  - color-reviewer
  - typography-reviewer
  - brand-element-reviewer
  - accessibility-reviewer

# === DELIVERABLE METADATA ===
asset_type: ebook
typical_use:
  - "multi-page editorial guides"
  - "lead magnets"
  - "white papers and reports"
  - "PDF documents (one-pagers, briefs)"
covers_pdf_documents: true

# === CROSS-REFS ===
related_chunks:
  - presentation
  - social
  - chart
related_memories:
  - feedback_design_pages_are_guidelines
  - feedback_chunk_size_placement_pins
  - project_ebook_cover_canonical_specs
  - project_ebook_page_canonical_specs
  - feedback_grid_is_content_specific

# === FOUNDATION OVERRIDES (none) ===
foundation_overrides: []  # No HARD rule from foundations is overridden by this chunk
---

# Ebook + PDF document

## Purpose & scope

This chunk governs every ebook and PDF-document deliverable: covers, interior pages, navigational pages, dramatic pages, content reading pages. Multi-page editorial work (guides, white papers, lead magnets) and shorter PDF documents (one-pagers, briefs, reports) both consume this chunk. It does not govern presentations (`presentation.md`), social images (`social.md`), or charts standalone (`chart.md`) — but a chart embedded inside an ebook page follows this chunk's page rules and `chart.md`'s data-viz rules together.

## Tokens + assets consumed

This chunk pulls from foundation tokens. It does not introduce new tokens.

| Source | What it provides |
|---|---|
| `tokens/brand.tokens.json` → `color.*`, `typography.*`, `gradient.*`, `space.*`, `radius.*` | Every value used on every page |
| `assets/logo/lockup-primary.svg` (and `icon-primary.svg`) | Cover lockup (Treatment 1 only) and any in-line brand mention |
| `assets/icons/icons-manifest.json` | Phosphor icons for callouts, lists, figure labels, action checklists |

## Asset specs (universal page foundation)

Every ebook + PDF page is built on the same foundation:

- **Page size:** 800 × 1200 (2:3 portrait)
- **Padding:** 40 / 80 / 40 / 80 (top / right / bottom / left)
- **Content measure:** 640 px (single reading column, optimal width)
- **Reading direction:** left-to-right, top-to-bottom

Codified as R-EBOOK-001.

## Severity tiers

This chunk uses three tiers — same as foundations, plus a new MENU tier specific to asset-type chunks:

- **HARD** — non-negotiable. Reviewer agents reject violations. Each carries a stable ID (`R-EBOOK-NNN`) and a machine-checkable predicate.
- **BASE** — defaults that apply unless context calls for deviation. Document the deviation in the deliverable's spec.
- **MENU** — choose-one alternatives from the kit. **No wrong answer**; reviewers do not reject MENU choices. Pick what fits the content.

## HARD rules

### R-EBOOK-001 — Page geometry locked
- **Spec:** Page size **800 × 1200**; padding **40/40/40/40**; content area is **720 px wide × 1120 px tall**.
- **Inner grid (BASE — choose per page):**
  - **1-column** (default): single 720 px reading column. Used for body spreads, lists, callouts, endnotes, single-stat pages, conclusions.
  - **2-column** (Stat / Conclusion): two **340 px** columns × **40 px gap** inside the 720 measure. Used for dual-stat pages, comparative spreads, paired-content layouts (e.g., the 2-col dual-stat on Vault Teal at Figma `89:6938`).
  - **2-column** (Lists): two **350 px** columns × **20 px gap** inside the 720 measure. Tighter gap suits paired-list rhythm.
- **Rationale:** Page geometry is fixed by the canonical Figma `eBooks & Documents` page (audit: `documents/ebook-test/figma-reference.md`). Body content runs in a 720 px measure; dramatic / comparative content benefits from 2-column rhythm. Both grids share the same outer padding so the page-edge geometry is consistent.
- **Allowed deviation:** Stat-page or quote-page may narrow centered content to **580–640 px** for breathing room. Cover and back-cover may break for full-bleed imagery.
- **Check:** any page with size ≠ 800×1200 OR padding ≠ 40/40/40/40 → reject. Any inner grid that isn't 1-column (720 wide), 2-column-340 (340 wide × 40 gap × 340 wide), or 2-column-350 (350 wide × 20 gap × 350 wide) without a documented spec-level reason → reject.

### R-EBOOK-002 — Page category determines surface, and every interior page carries the canonical footer
- **Surface by category:**
  | Category | Surface |
  |---|---|
  | Content / reading (Body Spread, Section Opener, Lists, Figure+Caption, Stat, Conclusion, Endnotes, About, Callouts) | **white** |
  | Navigational (Title Page, Copyright, Table of Contents) | **off-white** |
  | Pull Quote (calmer register) | **off-white** |
  | Special (Cover, Back Cover) | per cover treatment / black |
- **Footer pattern (every interior page except Cover and Back Cover):**
  - **Left:** Icon variant per surface pairings (Icon-primary on white/off-white; Icon-white on dark surfaces). Sized small (≈24 px square; floor enforced by R-LOGO-006).
  - **Right:** Page number, Lato Regular 12pt, `color.core.gray-02` on light surfaces (white on dark).
  - **Layout:** horizontal SPACE_BETWEEN inside the page's padded content area (x ∈ [40, 760] on an 800-wide page); vertical position pinned at **y = 1136** on a 1200-tall page (footer strip 720 wide × 24 tall, sitting on the bottom-padding line).
  - **Header (optional, BASE):** running-header text top-left in `typography.caption` gray-02 (e.g., section title or book title) — see BASE table.
- **Cover and Back Cover:** no footer. Cover establishes the brand via R-EBOOK-004 (lockup) and the cover composition. Back Cover is the closing surface.
- **Footer is conditional, not universal (v1.2):** The Icon-left + page-number-right footer is the default for body pages and content reading pages. Any page may opt out when the editorial moment earns it (full-bleed pull quotes, dramatic stat pages, dedication pages, transitions). The rule is: when a footer is present on a page, it follows the canonical Icon-left + page-number-right pattern. The rule is NOT: every page must have this footer.
- **Dramatic-register surface override (any content page may use it):** Stat Pages, Section Openers, Pull Quotes, and any other content page may override the white default with a brand surface. The footer pattern doesn't change — only the Icon variant flips per the pairings matrix in `[[logo-usage]]`.

  | Override surface | Footer Icon variant | Body / hero text | Notes |
  |---|---|---|---|
  | `color.core.teal` (Vault Teal) | Icon-white + white page number | white | Most common dramatic surface (see Figma `89:6938`) |
  | `color.core.black` | Icon-white + white page number | white | Same dark-on-dark treatment as Back Cover |
  | `color.secondary.premium-purple` / `dark-earth` / `rich-blue` | **Icon-light** + off-white page number | off-white | Muted dark tones; soft contrast |
  | `gradient.greydient` / `primary` / `cool` / `warm` / `mist` | Icon-primary + gray-02 page number | black (hero only) | **Allowed only on pages with no body text** — R-COLOR-006 forbids body under gradient. Single-stat heroes, Section Openers with just a title, full-bleed editorial moments. |
  | Signal colors (`go` / `stop` / `sky` / `earth`) | — | — | **NOT valid surfaces** — signal colors are status indicators only (R-COLOR-003). |
- **Rationale:** Surface signals the page's role. The unified Icon-left / page-number-right footer is the visible book-spine of the deliverable — readers know where they are at a glance, and the small icon reasserts brand presence without competing with the body. Mirrors the canonical Figma example at node `72:9166` (white content surface) and node `89:6938` (Vault Teal dramatic content surface).
- **Check:** any interior page whose surface is neither (a) the category default (white / off-white) nor (b) a valid dramatic-register override from the table above → reject. Any interior page (excluding Cover / Back Cover) without the Icon-left + page-number-right footer → reject. Any cover or back cover that adds this footer → reject. Any gradient surface carrying body text → reject (R-COLOR-006 cross-check).

### R-EBOOK-003 — Signal-go 60×2 accent rule reserved for Title Page + TOC only
- **Spec:** The 60×2-px `color.signal.go` rule appears only on Title Page (below subtitle area, ~y=700) and Table of Contents (below "Contents" header, ~y=260).
- **Rationale:** The signal-go rule is a structural marker for navigational entry-points. Using it elsewhere dilutes its meaning and conflicts with R-COLOR-003 (signal colors only for status/structure).
- **Check:** any signal-go rule on Body Spread, Section Opener, Pull Quote, Stat Page, Lists Page, Figure+Caption, Conclusion, Back Cover, Endnotes, About, Callouts → reject.

### R-EBOOK-004 — Every cover includes the brand lockup
- **Spec:** Every cover (Treatments 1, 2, 3, and any future treatment) includes a Lockup variant chosen via the surface→lockup pairings matrix in `[[logo-usage]]`:
  - Light surface (T1 light gradient, T2 off-white) → `lockup-primary`
  - Dark surface (T3 black) → `lockup-white`
  - Other surfaces → look up the pairings matrix
- **Placement and size are intentionally not pinned at the chunk level.** Covers are an experimental surface; experimentation should explore *how* the lockup appears, not whether. Foundation rules carry the contract: R-LOGO-005 (clear space, 1× icon height all sides), R-LOGO-006 (minimum size, 160 px wide for lockup), R-LOGO-003 (no distortion), R-LOGO-010 (no recolor outside canonical variants).
- **Rationale:** The cover is the deliverable's first brand moment. A coverless lockup gives up the easiest brand presence we have.
- **Check:** any cover without a Lockup-* variant → reject. Foundation rules (R-LOGO-003/005/006/010) catch placement, sizing, distortion, and recolor violations — the chunk does not duplicate those checks.

### R-EBOOK-005 — DEMOTED in v1.2
- **As of 2026-04-30 (v1.2):** This rule is removed. Mandatory page structure is incompatible with the editorial-first principle. See `documents/ebook-test/workflow.md` and the `feedback_no_mandatory_pages_editorial_first` memory.
- **What replaced it:** Each document brief decides what front matter and back matter it needs. Cover, Title Page, Copyright, TOC, Section Openers, Back Cover are PATTERNS available to a document, not requirements. A short reference guide may have only Cover + content + Back Cover. A formal book may have all of them. The author's brief decides.
- **Imprint:** Copyright/ISBN/publisher no longer require their own page. They can live in a back-cover footer band, on the TOC page, or in a small block at the end of the body — pick what fits the document.
- **Section openers:** No longer required to be standalone pages. A big PT Serif chapter heading inline with the body flow (followed immediately by the first paragraph) is the right transition for most documents. Standalone chapter pages are reserved for moments that earn the breath.

### R-EBOOK-006 — Reading order locked
- **Spec:** Pages appear in this order — **Cover → Title Page → Copyright → Table of Contents → [content sections] → [endmatter: Endnotes, About the Author] → Back Cover**. Front-matter (Title Page → Copyright → TOC) cannot be reordered. Back Cover is always the final page. Endmatter, when present, sits between the last content page and Back Cover.
- **Rationale:** Reading flow is a contract with the reader. Reorder front-matter and the document signals "I don't know how books work."
- **Check:** any deliverable whose page sequence violates the order → reject. Reviewer walks the page list and validates the sequence.

### R-EBOOK-007 — Footnote / endnote numbering uses signal-go semantically
- **Spec:** Footnote numbers in body text and endnote numbers on the Endnotes page appear in `color.signal.go`, Lato Regular 14 pt, right-aligned within a 24-px-wide column on the Endnotes page (or inline as the marker in body).
- **Rationale:** Footnote numbers are a structural/status marker (they index navigation between body and endmatter). Signal-go is the canonical color for structural status. This is **consistent with R-COLOR-003** (signal colors for status only, not decoration) — footnotes count as status. Promoting from BASE to HARD makes reviewer enforcement explicit.
- **Check:** any footnote/endnote number rendered in a color other than `color.signal.go` → reject.

## BASE rules

### Default typography per role

These are the typical defaults. Deviation is allowed; document the deviation in the deliverable spec. Foundation rules (R-TYPE-* family/weight rules, R-COLOR-009 no-teal-below-display, R-TYPE-005 14pt floor) catch violations the BASE table doesn't enumerate.

| Role | Default | Allowed deviation |
|---|---|---|
| Body paragraph | `typography.body.default` (Lato 16pt @ 150%) | `typography.body.s` (14pt) for footnotes; `typography.body.l` (18pt) for emphasized intro paragraph |
| Body header | `typography.heading.l` (PT Serif 40pt @ 125%) at x=80 left | Centered on Title Page (navigational override) |
| Subhead in body | `typography.heading.m` (PT Serif 28pt @ 130%) | — |
| Pull quote text | `typography.heading.l` (PT Serif 40pt @ 125%), color black | Pull quote uses standard typography, **not teal** (per chunk-level BASE update) |
| Pull quote mark | PT Serif Regular 120pt, color black | — |
| Title Page display | PT Serif Regular **56 pt** centered | — |
| **Section Opener title** | PT Serif Regular **72 pt** @ 115% LH, **centered**, black | Sized to suit the title length and the deck's overall hero rhythm. R-TYPE-001 (Regular only) and the licensed display-tier use apply. Was a HARD rule (R-EBOOK-005) in v1.0 — demoted to BASE in v1.1 per `feedback_chunk_size_placement_pins`. |
| Section Opener intro paragraph | `typography.body.l` (Lato 18pt @ 140%) centered | — |
| **Stat Page hero number** | PT Serif Regular **220 pt** centered, `color.core.teal` | Hero size by feel; **must remain at display tier (≥96pt) when set in teal** — R-COLOR-009 enforces the floor. Was a HARD rule (R-EBOOK-006) in v1.0 — demoted to BASE in v1.1. |
| Stat-page supporting headline | PT Serif Regular 32pt centered | — |
| Stat-page supporting paragraph | `typography.body.l` (Lato 18pt @ 140%) centered | — |
| Running header | `typography.caption` (Lato 12pt) gray-02 | Note: caption is rare-instance use per `feedback_14pt_practical_text_floor` — running header is one of the legitimate cases |
| TOC row | `typography.body.xl` (Lato 20pt) for title; row number + page number Lato 14pt gray-02 | — |
| Callout label | `typography.body.s` (Lato 14pt) in accent color | — |
| Callout body | `typography.body.s` (Lato 14pt) black | — |
| Page number | `typography.caption` (Lato 12pt) gray-02 | Caption use legitimate per running-header reasoning |

### Default content color
Content color is `color.core.black` on white/off-white surfaces; `color.core.white` on the black Back Cover. Auto-derived from R-EBOOK-002 surface category.

### Header alignment
Headers default to **x=40 left** (consistent with the 40-px outer padding). Navigational pages (Title Page, Copyright, TOC) override to **centered**. Section Opener overrides to **centered** as the typical hero-page composition.

### Default page-element rhythm
- Body paragraph spacing: paragraph-break = 1× line-height (the default Lato 150% emits ~24px gap)
- Header → body breathing room: 24 px
- List item spacing: 12 px between items
- Pull quote — large breathing room above and below (≥ 80 px)
- Stat number → supporting headline: 40 px gap
- Cover lockup size + placement: not pinned at chunk level (covers are experimental); foundation rules R-LOGO-005 (clear space) and R-LOGO-006 (≥160 px wide for lockup) carry the floor.

## MENU — kit catalog

The Figma page `eBooks & Documents` (id `70:8798`) holds the visual canon for every entry below. Reviewers do not reject MENU choices; agents pick based on content fit. Treat as **guidelines, not strict canon** (per `feedback_design_pages_are_guidelines`).

**Covers are an experimental surface.** The three cover treatments below describe variations we've shipped — they are *examples of valid covers*, not a closed catalog. New cover compositions are welcome as long as R-EBOOK-001 (page geometry), R-EBOOK-004 (every cover has a lockup), and the foundation rules (R-COLOR, R-TYPE, R-LOGO, R-ICON) hold. Composition splits, image dimensions, strip counts, and exact title sizes inside the cover entries are illustrative, not prescriptive. The 16 interior page types are the structural building blocks of the book body and are more prescriptive — but still MENU, not HARD.

### Cover treatments (3 examples — the catalog is open)

```yaml
covers:
  - id: cover-gradient-image
    label: "Treatment 1 — Gradient + Image"
    background: "GRADIENT_LINEAR #efebf5 → #e0e8e6 (soft lavender-pink to pale teal-green)"
    layout: "Brand Lockup top-left (171×48); title + subtitle LEFT-aligned below; bottom 720×540 image fill"
    title: "PT Serif Regular, sized to fit (typically display/m–l), LEFT-aligned, black"
    subtitle: "Lato Regular 20pt, 140% LH, black, ~540–680px width"
    use_when: "default cover; flagship guide; brand-emphasis appropriate"
    lockup_present: true
    figma_section: "Ebook Cover (left)"

  - id: cover-flat-image
    label: "Treatment 2 — Flat off-white + Image (centered)"
    background: "color.core.off-white"
    layout: "No lockup; title centered above 720×540 abstract image"
    title: "PT Serif Regular 64pt, 115% LH, CENTER, black, 2 lines"
    subtitle: "Lato Regular 20pt, 140% LH, CENTER, black, ~560px width"
    use_when: "minimalist / editorial register; series companion"
    lockup_present: false
    figma_section: "Ebook Cover (center)"

  - id: cover-black-gradient-strips
    label: "Treatment 3 — Black + Gradient strips (dramatic)"
    background: "color.core.black"
    layout: "No lockup; title centered top; bottom 3 horizontal gradient strips (720×175 each, gap 8) — strips ARE the design"
    title: "PT Serif Regular 96pt, 110% LH, CENTER, color.core.white, 2 lines"
    subtitle: "Lato Regular 20pt, 140% LH, CENTER, color.core.white"
    strip_palette:
      - "GRADIENT_LINEAR #fbf5f5 → #f2f2f0 → #e6dddd → #e7dcd4 (warm cream)"
      - "GRADIENT_LINEAR #efebf5 → #e0e8e6 (lavender-teal — ties to Treatment 1)"
      - "GRADIENT_LINEAR #fafafa → #eff0f4 → #d0d3df (cool silver)"
    use_when: "dramatic / hero-piece register; series flagship; topical urgency"
    lockup_present: false
    figma_section: "Ebook Cover (right)"
```

### Interior page types

```yaml
interior_pages:
  - id: title-page
    label: "Title Page"
    category: navigational
    surface: off-white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Title PT Serif 56pt centered + subtitle Lato 18pt centered + signal-go 60×2 rule below subtitle (R-EBOOK-003 allowed)"
    use_when: "always — first interior page after cover"
    figma_section: "(memory canon — verify present)"

  - id: copyright
    label: "Copyright"
    category: navigational
    surface: off-white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Title block + copyright lines Lato 12-14pt centered gray-02; legal text"
    use_when: "always — second interior page"
    figma_section: "Copyright"

  - id: table-of-contents
    label: "Table of Contents"
    category: navigational
    surface: off-white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Header 'Contents' PT Serif 40pt LEFT at x=80 + signal-go 60×2 rule below (R-EBOOK-003 allowed); rows = number Lato 14pt LEFT, title Lato 20pt LEFT, page number Lato 14pt RIGHT, gap 16"
    use_when: "always — navigational anchor"
    figma_section: "Table of Contents"

  - id: section-opener
    label: "Section Opener"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Centered chapter marker Lato 14pt gray-02 + dramatic title PT Serif 72pt 115% centered (BASE default; sized to suit the title) + intro paragraph Lato 18pt 140% centered"
    use_when: "open every major section"
    figma_section: "Section Opener"

  - id: body-spread
    label: "Body Spread (facing-pair)"
    category: content
    surface: white (both pages)
    footer: per R-EBOOK-002 (each page in the facing pair carries Icon-primary left + page number right)
    composition: "Single-column 640-wide body paragraphs; subheads PT Serif 28pt LEFT; running header Lato 12pt outer-top gray-02"
    use_when: "primary reading content"
    figma_section: "Body Spread"

  - id: pull-quote-a
    label: "Pull Quote — Variant A"
    category: content
    surface: off-white (calmer register)
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Quote text PT Serif 40pt 125% LEFT BLACK + adjacent quote mark PT Serif 120pt LEFT black (no longer teal — see BASE update)"
    use_when: "moments of editorial impact; punch-line ideas"
    figma_section: "Pull Quote (variant 1)"

  - id: pull-quote-b
    label: "Pull Quote — Variant B"
    category: content
    surface: off-white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Same typography as Variant A; alternate compositional arrangement (quote mark positioned differently — see Figma)"
    use_when: "second register of pull-quote — when Variant A's composition doesn't suit the quote"
    figma_section: "Pull Quote (variant 2)"

  - id: pull-page
    label: "Pull Page — Decorative quote mark + big serif quote (validated in privacy-guide build)"
    category: content
    surface: off-white (default) | white | teal
    grid: 1-column
    footer: optional per R-EBOOK-002 — pull pages may opt out of footer to earn the breath
    composition: |
      Centered vertically. Two-column inline grid: a large left-aligned decorative " (PT Serif Regular ~120pt teal) + the quote text in PT Serif Regular 36pt @ 135% LH teal, aligned-top to the quote mark, ~640px measure. Generous whitespace above and below the quote (≈ 1fr / 1fr breath bands).
    use_when: "the quote earns its own page — punch-line ideas, narrative pivots, end-of-section punctuation. Inline `dropquote` is the lighter alternative when the quote should flow with the body rather than break the page."
    primitive: pull-page (in myvault-editorial.typ)
    figma_section: "Pull Quote (validated against privacy guide pages 5, 11)"

  - id: section-opener-hero
    label: "Section Opener — Hero (full-bleed dramatic, validated in privacy-guide build)"
    category: content (dramatic-register surface override)
    surface: teal (default) | black | dark-earth | premium-purple | rich-blue
    footer: none — section openers are dramatic moments and don't carry chrome
    composition: |
      Full-bleed surface fill (no inner padding). Top-left at (60, 60): section number in Lato Regular 16pt muted (gray-01 on dark). Bottom-left band at (60, page_height - 80): a 80×2 hairline rule above the title, then the chapter title in PT Serif Regular ~80pt @ 110% LH white (or surface-paired hero color), left-aligned, ~680px measure. Optional epigraph below the title in PT Serif Regular 24pt @ 140% LH muted (gray-01 on dark), ~600px measure.
    use_when: "open a major section that earns a dramatic moment (intro / call to action / pivot). Reserve for one or two key transitions per document — overused, it becomes template chrome. The inline `chapter()` heading is the lighter default for most section transitions."
    primitive: section-opener (in myvault-editorial.typ)
    figma_section: "Section Opener (hero variant — validated against privacy guide page 3)"

  - id: hero-stats
    label: "Hero Stats Panel — 2 to 4 stats inline (validated in privacy-guide build)"
    category: content
    surface: off-white (default) | white | teal | black
    grid: inline (n-up within 720 measure)
    footer: per R-EBOOK-002 (parent page footer carries through; this primitive flows inline)
    composition: |
      720px-wide rounded panel (radius-2xl) with 40px inset on all sides. Optional uppercase-tracking-style label (Lato 14pt teal with 1pt letter-spacing — title-case, NOT all-caps) above the stats. n-column grid (gutter 32px). Each stat: PT Serif Regular ~80pt teal value + Lato 18pt body label below + optional Lato 12pt source caption.
    use_when: "section needs to lead with a quick reading of multiple supporting stats. One panel per section maximum — the visual rhythm decays if used twice in a row."
    primitive: hero-stats (in myvault-editorial.typ)
    figma_section: "Stat Page (multi-stat variant — validated against privacy guide page 4)"

  - id: model-grid
    label: "Model Grid — 2x2 (or n-up) cards for parallel concepts (validated in privacy-guide build)"
    category: content
    surface: white (page) — alternating off-white/white card fills internally
    grid: inline 2-column (350×auto cards) within 720 measure
    footer: per R-EBOOK-002 (parent page footer carries through; this primitive flows inline)
    composition: |
      Optional header (PT Serif Regular 28pt @ 130%) + intro line (Lato 16pt gray-02). 2-column grid of cards, 350px wide each, 20px column-gutter, 20px row-gutter. Each card: 28px inset all sides, radius-xl, alternating fill (off-white | white with gray-01 1px stroke). Card content: optional small Lato 14pt teal label (e.g., "Model 1") + PT Serif Regular 28pt @ 120% title (≤ ~3 words to avoid wrap) + Lato Regular 14pt body @ 150% LH.
    use_when: "presenting parallel options, models, or categories where the reader needs to compare them at a glance. 2x2 is the default; 3-up or 4-up valid if all titles fit the narrower column."
    primitive: model-grid (in myvault-editorial.typ)
    figma_section: "(new pattern — validated against privacy guide pages 6-7)"
    notes: "Card titles must be short enough to fit the 294px content width without hyphenation at 28pt PT Serif (~12-14 chars max)."

  - id: takeaways
    label: "Takeaways Panel — boxed numbered summary at end of section (validated in privacy-guide build)"
    category: content
    surface: white (page) — off-white card fill
    grid: inline 720 measure
    footer: per R-EBOOK-002 (parent page footer carries through; this primitive flows inline)
    composition: |
      720×auto rounded panel (radius-2xl), off-white fill, 32px inset all sides. Top row: a 28×2 teal hairline + small "Takeaways" label in Lato Regular 14pt teal with 1pt letter-spacing (title-case). Then numbered items: each item is a 32px PT Serif Regular 24pt teal numeral + body text in Lato 16pt black @ 150% LH. 16px below each item.
    use_when: "end of a major section to anchor the 2-4 most important things the reader should leave with. Avoid stacking — one takeaways panel per section maximum, used at the section's natural close before the next chapter begins."
    primitive: takeaways (in myvault-editorial.typ)
    figma_section: "(new pattern — validated against privacy guide pages 6, 14)"

  - id: data-grid
    label: "Data Grid — flowing reference table (validated in privacy-guide build)"
    category: content
    surface: white
    grid: inline (auto-spans 720 measure)
    footer: per R-EBOOK-002 (parent page footer carries through; this primitive flows inline)
    composition: |
      Optional header (PT Serif Regular 28pt @ 130%) + intro line (Lato 16pt gray-02). 1px gray-02 hairline above column headers (Lato 14pt gray-02 — Service / Retention / Notes). 1px gray-01 hairline between rows. Each row: Lato 16pt black for first two columns, Lato 14pt gray-02 for notes. Block is non-breakable so header + table stay together.
    use_when: "reference table needed inside a content section (retention windows, comparison spec, feature matrix). For longer reference data sets, consider promoting to its own page or using a multi-page table."
    primitive: data-grid (in myvault-editorial.typ)
    figma_section: "(new pattern — validated against privacy guide page 7)"

  - id: stat-page-1
    label: "Stat Page — Variant 1 (single hero stat)"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Big stat number PT Serif 220pt teal centered (R-EBOOK-006 locks) + supporting headline PT Serif 32pt black centered + supporting paragraph Lato 18pt gray-02 centered (~540 measure) + Lato 12pt gray-02 source caption"
    use_when: "single hero number carries the page"
    figma_section: "Stat Page"

  - id: stat-page-2
    label: "Stat Page — Variant 2 (dual stats on white)"
    category: content
    surface: white
    grid: 2-column (per R-EBOOK-001)
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Two stat columns side-by-side; each follows the BASE Stat Page hero-number defaults (PT Serif ≥96pt teal centered) with supporting headline (PT Serif 32pt) + supporting paragraph (Lato 18pt) below each"
    use_when: "two related stats compared on a quiet surface (before/after, MyVault vs industry)"
    figma_section: "Stat Page - 2"

  - id: stat-page-3-teal-mirror
    label: "Stat Page — Variant 3 (dual-stat 2-column on Vault Teal, mirrored)"
    category: content (dramatic-register surface override per R-EBOOK-002)
    surface: color.core.teal
    grid: 2-column (per R-EBOOK-001)
    footer: per R-EBOOK-002 with surface override — Icon-WHITE left + page number Lato 12pt WHITE right
    composition: |
      Two stat blocks arranged in mirrored 2-column composition: top block = stat-LEFT / copy-RIGHT; bottom block = copy-LEFT / stat-RIGHT. Each stat block: PT Serif Regular hero number (display tier, typical ≥96pt) WHITE + supporting label PT Serif ~32pt WHITE centered under the number. Each copy block: Lato Regular body (14–16pt) WHITE, aligned to its column. Vertical rhythm: top half holds the first stat block centered around the upper third; bottom half holds the second block centered around the lower third — large breathing space between them is part of the design.
    use_when: "dramatic spread for paired comparative stats with brand-emphasis register; works at the climax of a section or as a standalone dramatic interior page"
    figma_section: "Stat Page (2-col on teal, node 89:6938)"
    notes: "Hero numbers stay WHITE on teal (R-COLOR-009 only binds when teal is the text color, not the surface). The '×' multiplier glyph may be tinted off-white or held back slightly for tonal contrast within the white digits — typographic flourish, not enforced."

  - id: lists-page
    label: "Lists Page"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Header PT Serif 40pt LEFT at x=80; three list blocks stacked, each preceded by 12pt gray-02 small label (Bulleted / Numbered / Checklist); bullet = 6×6 signal-go ellipse; number = '1.' Lato 16pt signal-go; checklist = 16×16 signal-go square radius/xs"
    use_when: "actionable checklists, multi-item lists"
    figma_section: "Lists Page"

  - id: figure-caption
    label: "Figure + Caption"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Figure box at (80, 200) size 640×440, off-white fill, 1px gray-01 stroke, radius/lg; 'Fig. 2.1' label below at x=80 in signal-go Lato 12pt; caption Lato 14pt black 640px measure"
    use_when: "diagram, chart, or imagery with explanatory caption"
    figma_section: "Figure + Caption"

  - id: callouts
    label: "Callouts"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Header at x=80; three stacked callout boxes 640×auto-height, padding 20/20/16/16, off-white fill, 1px + 4px LEFT stroke in accent color, radius/md. Kinds: note (teal accent + info icon), tip (signal-go accent + lightbulb icon), important (signal-go accent + warning icon). Icon 20×20 recolored to accent."
    use_when: "asides, tips, warnings, definitions"
    figma_section: "(memory canon — verify present)"

  - id: endnotes
    label: "Endnotes"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Header 'Notes' at x=80 y=160 PT Serif 40pt; numbered notes vertical column at x=80, 640 wide, item-spacing 16; each row = signal-go number Lato 14pt right-aligned width 24 + body/s note Lato 14pt black 150% LH layoutGrow 1"
    use_when: "endnotes / endmatter"
    figma_section: "(memory canon — verify present)"

  - id: about-the-author
    label: "About the Author"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Centered portrait circle 220×220 at y=180 gray-01 fill; below = Name PT Serif 32pt black center, Role Lato 16pt gray-02 center, Bio Lato 16pt black center 580 measure, Links Lato 16pt signal-go center"
    use_when: "endmatter author bio"
    figma_section: "(memory canon — verify present)"

  - id: conclusion-a
    label: "Conclusion — Variant A"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Closing summary; PT Serif 40pt header LEFT at x=80; body paragraphs"
    use_when: "narrative conclusion"
    figma_section: "Conclusion (variant 1)"

  - id: conclusion-b
    label: "Conclusion — Variant B"
    category: content
    surface: white
    footer: per R-EBOOK-002 (Icon-primary left + page number right; SPACE_BETWEEN within padding at y=1136)
    composition: "Action-oriented conclusion; PT Serif 40pt header LEFT at x=80; bulleted next-steps in body"
    use_when: "action-driven closing — tells reader what to do next"
    figma_section: "Conclusion (variant 2)"

  - id: back-cover
    label: "Back Cover"
    category: special
    surface: black
    footer: none (Back Cover has no footer per R-EBOOK-002)
    composition: "Centered closing message in white; centered © / legal line at bottom in white gray-tint; no page number"
    use_when: "always — last page"
    figma_section: "Back Cover"
```

## Decision tree for the agent

When generating an ebook or PDF document:

```
1. Receive brief
   - Identify deliverable type (ebook | PDF document | one-pager)
   - Identify content structure (sections, key stats, quotes, action items)
   - Identify desired register (editorial, dramatic, minimalist)

2. Pick cover treatment from MENU.covers
   - Treatment 1 (gradient + image) → flagship / brand-emphasis
   - Treatment 2 (flat off-white + image) → minimalist / series companion
   - Treatment 3 (black + gradient strips) → dramatic / hero piece

3. Order interior pages
   - Always: Title Page → Copyright → TOC → [content] → Back Cover
   - Open each major section with Section Opener
   - Pick from MENU.interior_pages for each content slot
   - Variants: Pull Quote (A/B), Stat Page (1/2), Conclusion (A/B) — pick by content fit

4. Apply HARD primitives to every page
   - R-EBOOK-001 page geometry locked (800×1200; inner grid = 1-column 640 OR 2-column 300/40/300; padding adapts per page type — see rule)
   - R-EBOOK-002 surface by category + canonical Icon-left / page-number-right footer when present (variant flips per pairings on dramatic-surface override; footer is conditional, not universal)
   - R-EBOOK-003 signal-go 60×2 rule reservation (Title Page + TOC only when those pages exist)
   - R-EBOOK-004 every cover has a lockup (variant per pairings; placement/size flexible)
   - R-EBOOK-005 DEMOTED in v1.2 — no mandatory page structure; each document brief decides its front/back matter
   - R-EBOOK-006 reading order locked (when front-matter / endmatter present, sequence is preserved)
   - R-EBOOK-007 footnote/endnote numbers in signal-go

5. Apply BASE typography per role
   - Defaults from the BASE table; document any deviation in the spec

6. Apply inherited foundation rules
   - R-COLOR (colors, gradients, contrast)
   - R-TYPE (families, sizes, no eyebrows, no bold)
   - R-LOGO (cover lockup placement, no recolor, no distort)
   - R-ICON (Phosphor only, default 24px / Regular / black)

7. Verify accessibility
   - All text-on-surface pairs clear WCAG 2.2 AA (cross-ref [[color#accessibility]])
   - No body below 14pt
   - Min 12pt for any caption or page number (the legitimate caption-tier use cases)

8. Compose Typst spec
   - Import the editorial primitives module: `#import "renderers/typst/myvault-editorial.typ": *`
   - Default to composable primitives that flow: `flow()` (paginating body stream), `chapter()` (inline section transition), `subhead()` (block-level subhead). The body content fills the page; pages break when columns fill.
   - Reserve standalone-page primitives for moments that earn the breath: `section-opener()` (dramatic full-bleed title page), `pull-page()` (decorative quote on its own page), `stat-page()` (full-page hero stat).
   - Use inline visual primitives for editorial richness: `hero-stats()` (multi-stat panel), `model-grid()` (2x2 cards), `takeaways()` (boxed end-of-section summary), `data-grid()` (reference table), `compare-cols()` (3-up comparison), `audit-block()` (numbered steps with time-estimate pill), `dropquote()` (inline quote).
   - All primitives encode HARD + BASE rules; agent supplies content + MENU choices.

9. Render → PDF
   - typst compile spec.typ output.pdf

10. Reviewer swarm
   - ebook-reviewer: R-EBOOK-001..007 + BASE conformance per page category
   - color/typography/brand-element/accessibility reviewers run their normal foundation checks
```

## Reviewer agent integration

| Reviewer | What it checks for ebook |
|---|---|
| `ebook-reviewer` | All R-EBOOK-001..007. Page geometry + inner grid (1-col vs 2-col), surface-by-category + canonical Icon-left / page-number-right footer (variant flips on dramatic-surface override), signal-go rule reservation, every-cover-has-lockup, mandatory page structure, reading-order sequence, footnote/endnote numbering. Cites violations as `R-EBOOK-NNN at page N` (or `at sequence` for ordering rules). Also flags BASE deviations (e.g., Section Opener title set off-default, Stat Page hero number off-default) as advisory, not blocking. |
| `color-reviewer` | Foundation R-COLOR-001..010 across all pages. Cites e.g., `R-COLOR-009 at page 17 — heading-size text in teal`. |
| `typography-reviewer` | Foundation R-TYPE-001..009. Cites e.g., `R-TYPE-005 at page 22 — body at 12pt`. |
| `brand-element-reviewer` | R-LOGO + R-ICON. Cover lockup placement, icon family, no decorative tiling. |
| `accessibility-reviewer` | WCAG 2.2 AA contrast (cross-ref `[[color#accessibility]]`). Touch targets if interactive. |

Each reviewer runs in parallel after render. Outputs a structured pass/fail-by-rule-ID list. Orchestrator merges.

## Renderer + spec format

**Renderer:** [Typst](https://typst.app) (CLI, free, ~40 MB binary, millisecond compile)

**Spec format:** `.typ` (Typst source — markdown-ish, with structured function calls)

**Why Typst:** Native PDF/A and PDF/UA output (accessibility-compliant), JSON/CSV ingestion, dense LLM training data (modern syntax), official Docker image, runs in CI without browsers. See `_plan/visual-system-architecture-v2.md` §4 for the full renderer registry rationale.

**Active module:** `renderers/typst/myvault-editorial.typ` — composable primitives, not page-stamp templates. The module exports primitives that the spec calls inline; pagination happens automatically.

**Composable primitives (v1.3):**

Ceremonial pages (always full-page):
- `cover(title, subtitle, author, surface, title-size)` — branded cover; surface and title-size parametric
- `back-cover(closing, url, imprint, surface)` — closing page with optional colophon footer band

Flowing content:
- `flow(running-header, surface, body)` — auto-paginating content stream with conditional chrome
- `chapter(title, subtitle, number)` — inline section transition; PT Serif 56pt heading, no forced pagebreak
- `subhead(text)` — block-level subhead inside body flow

Inline editorial blocks (flow with body, can wrap pages):
- `stat-inline(number, label)` — hero number that lives in the body column
- `dropquote(text)` — inline larger-format quote with left teal rule
- `data-grid(header, intro, rows)` — reference table; non-breakable
- `compare-cols(header, intro, items)` — 2/3/4-up comparison
- `audit-block(number, title, time-estimate, steps)` — numbered steps with pill chip
- `list-block(kind, items)` — bulleted/numbered/checklist
- `faq-block(pairs)` — Q&A pairs
- `sources-block(header, sources)` — numbered citations
- `toc-block(header, entries)` — TOC pattern
- `divider(style)` — explicit pacing (rule | space)
- `hero-stats(header, items, surface)` — multi-stat boxed panel **(new in v1.3)**
- `model-grid(header, intro, items)` — 2x2 cards **(new in v1.3)**
- `takeaways(header, items)` — boxed end-of-section summary **(new in v1.3)**
- `chart(path, measure, caption-kind, fig-number)` — embed a brand-locked chart-card SVG produced by `renderers/vega-lite/compose.mjs` from a `*.chart.json` fixture. `measure` is `"1-col"` (640 pt, default), `"wide"` (720 pt), or `"2-col"` (300 pt). The chart-card carries its own title / description / footer per `chart.md`'s R-CHART-001..007; this primitive only sizes the embed. See **Embedding charts** below.

Standalone-page primitives (each renders its own page):
- `stat-page(number, headline, paragraph, source, accent)` — full-page hero stat
- `pull-page(quote)` — decorative quote-mark + big serif quote on off-white **(refined in v1.3)**
- `section-opener(number, title, epigraph, surface)` — dramatic full-bleed section opener **(new in v1.3)**

**Legacy module (preserved for migration):** `renderers/typst/myvault-ebook.typ` — earlier page-stamp template with `#cover-t1`, `#body-page`, `#section-opener` (centered) etc. Use only for documents already targeting that contract; new documents should use the editorial primitives.

## Embedding charts

When an ebook deliverable includes data visualizations, the chart asset-type chunk (`chunks/chart.md`) governs the chart-card itself; this chunk governs the page that holds it. Both bind together.

**Directory convention** (per deliverable):

```
documents/<deliverable>/
├── spec.typ                   # the ebook spec
├── charts/
│   ├── <id>.chart.json        # author this — fixture per chunks/chart.md schema
│   └── <id>.svg               # generated; do not hand-edit
└── build.sh                   # two-step build (compose charts → compile PDF)
```

**Two-step build:**

1. For each `charts/*.chart.json`, run `node renderers/vega-lite/compose.mjs <fixture> charts/<id>.svg` to produce a brand-locked SVG.
2. Compile `spec.typ` → PDF via Typst with `--root` set to the visual-system root.

**In the spec:**

```typst
#chart("/documents/<deliverable>/charts/<id>.svg", measure: "wide")
```

Paths must be **project-rooted absolute** (start with `/`) because Typst resolves `image()` relative to the calling module's file (the editorial primitives module), not the spec. `build.sh` sets `--root` accordingly.

**Choosing the measure:**

| Page type | Measure |
|---|---|
| Body Spread, Lists, Conclusion (1-column page) | `"1-col"` (640 pt) — fits inside the body column |
| Stat Page, dramatic editorial slot | `"wide"` (720 pt) — chart earns the breath |
| Dual-stat or comparative 2-column page | `"2-col"` (300 pt) per chart |

**Caption convention.** The chart-card's own header (PT Serif 40 + Lato 14 description) carries the title and source. Default `caption-kind: "none"` — no extra caption. Use `caption-kind: "fig"` with a `fig-number` only when the chart-card has no header and the surrounding ebook narrative carries the title.

**Working example:** `documents/chart-integration-test/` — a 4-page ebook PDF with two charts (horizontal-bar + radial-light) embedded inline. End-to-end build proven 2026-04-30.

**Cross-reference:** `chunks/chart.md` § Workflow integration — Pattern A.

## Foundation overrides

**None.** Every rule from `color`, `typography`, `logo-usage`, and `iconography` applies automatically. The chunk explicitly notes contexts where signal-go is allowed (Title Page + TOC rule; footnote numbers; list bullets) — but these are *consistent* with R-COLOR-003's "signal colors only for structure/status" rather than overrides.

## Cross-references

- **`color`** — color tokens, surface rules, contrast authority
- **`typography`** — type styles per role; BASE typography table inherits from typography tokens
- **`logo-usage`** — cover lockup placement (R-EBOOK-004 + R-LOGO rules together)
- **`iconography`** — callout icons, list bullets, figure-label markers (Phosphor only)
- **`presentation`** (sibling) — different asset type with its own grid; some shared layout patterns (e.g., section openers, pull quotes) but ebook is multi-page and Typst-rendered; presentation is slide-based and Marp-rendered
- **`chart`** (sibling) — when an ebook page embeds a chart, the page follows R-EBOOK-001..007 and the embedded chart-card follows R-CHART-001..007. Embed pattern: render the chart to SVG via `renderers/vega-lite/compose.mjs`, place inside a `figure-caption` interior page (Figma `eBooks & Documents` figure pattern) or inline via `figure()` primitive in `myvault-editorial.typ` (Phase 2). Chart titles (PT Serif 40pt) coexist with ebook subhead typography — they read as figure headlines, not page-level headers.
- **`feedback_design_pages_are_guidelines`** — informs the MENU tier
- **`feedback_grid_is_content_specific`** — explains why grid lives here, not in foundations

## Visual canon

The Figma page `eBooks & Documents` (id `70:8798`, file `Pm31BDHj34WjJ7NjBK4Ady`) is the visual kit. Each MENU entry corresponds to a section there; HARD rules are visible in every section's composition. When canon changes, both the Figma page and this chunk update.

URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8798>

## Memory linkage

Before this chunk, ebook canon lived in two memory entries:
- `project_ebook_cover_canonical_specs` — three cover treatments
- `project_ebook_page_canonical_specs` — interior page specs

Both are **superseded by this chunk**. They remain in `MEMORY.md` as historical pointers; their content is now authoritative here. The teal-pull-quote pattern in those memories has been **removed** (per Mark's 2026-04-29 decision: pull quotes use standard typography in black, not teal).

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-05-01 | v1.4 — Page geometry + footer pin synced to canonical Figma `eBooks & Documents` page per the audit at `documents/ebook-test/figma-reference.md`. **R-EBOOK-001 outer padding** corrected from 40/80/40/80 → **40/40/40/40**; **content area** corrected from 640×1080 → **720×1120**; **inner grid** updated — 1-column to 720 wide, 2-column-stat to 340/40/340 (was 300/40/300), new 2-column-lists at 350/20/350. **R-EBOOK-002 footer layout** repositioned — x range corrected from [80, 720] → **[40, 760]**, y pinned at **1136** (was y≈1142). All 14 MENU `footer:` references updated to the new y. The active editorial renderer (`renderers/typst/myvault-editorial.typ`) and the privacy-guide deliverable already build on these values; this update brings the chunk's HARD rule contract in line with the rendered canon. **Note:** MENU pattern descriptions still contain absolute coordinates (e.g., "x=80", "640 wide") inherited from the v1.0 geometry — these are not HARD-rule violations because MENU is choose-from patterns, but a follow-up sweep would refresh them. | Mark + Claude |
| 2026-04-30 | v1.3 — Primitives-not-templates rebuild validated against the AI Privacy Guide deliverable (19 pages). **Renderer pinned to `renderers/typst/myvault-editorial.typ`** (active) — composable primitives that flow rather than page-stamp templates that emit one page per call; legacy `myvault-ebook.typ` preserved for migration only. **5 new MENU primitives added**, all validated visually in the privacy-guide build: `section-opener-hero` (dramatic full-bleed title page on teal/black surface), `hero-stats` (multi-stat boxed panel), `model-grid` (2x2 alternating-fill cards for parallel concepts), `takeaways` (boxed end-of-section numbered summary), `pull-page` (decorative quote-mark composition). **`data-grid` formalized** as a MENU entry (was used inline before; now a reusable reference-table primitive). **Decision tree updated** to default to flowing primitives + reserve standalone-page primitives for moments that earn the breath. **Body density tuned** to 18pt @ 55% leading (was 17pt @ 50%) per Mark's "less condensed" call. Privacy guide is the canon application — see `documents/ebook-test/privacy-guide-spec.typ` and `privacy-pages-v4/` for the validated visual reference. | Mark + Claude |
| 2026-04-30 | v1.2 — Editorial-first rethink in line with `feedback_no_mandatory_pages_editorial_first`. **R-EBOOK-005 (mandatory page structure) demoted** — each document decides what front/back matter it needs; no required Cover+TitlePage+Copyright+TOC+SectionOpener+BackCover bundle. **R-EBOOK-002 footer softened** — footer is the default for body content, but conditional per page; pages can opt out when the editorial moment earns it. Imprint info moves to back-cover footer or end-matter block; no longer requires a standalone Copyright page. Section openers default to inline body transitions (big PT Serif heading + first paragraph on same page), not standalone pages. Builds on the workflow doc rewrite at `documents/ebook-test/workflow.md`. The privacy guide rebuild is the first deliverable applying this rethink. | Mark + Claude |
| 2026-04-30 | v1.1 — Pinning relaxed in line with `feedback_chunk_size_placement_pins`. R-EBOOK-004 reshaped from "Treatment-1-only lockup at 171×48 top-left" to **every cover has a lockup; placement and size governed by R-LOGO foundation rules**. R-EBOOK-005 (Section Opener title 72pt) and R-EBOOK-006 (Stat Page hero number 220pt) demoted from HARD to BASE — values are typical defaults; foundation rules (R-COLOR-009 teal-only-at-display, R-TYPE-* family/weight) carry the real floors. R-EBOOK-009 (cover composition split) deleted — covers reframed as an **experimental surface**; the three cover treatments remain in MENU as examples, not a closed catalog. R-EBOOK-007/008/010 renumbered to R-EBOOK-005/006/007. **R-EBOOK-002 reshaped** around the canonical **Icon-left / page-number-right footer** (per Figma `72:9166`), with surface-flip override for dramatic content (per Figma `89:6938`). **R-EBOOK-001 expanded** to formalize a 1-column (640) and 2-column (300/40/300) inner grid. **New MENU entry:** `stat-page-3-teal-mirror` — dual-stat 2-column composition on Vault Teal. Total HARD rule count: **10 → 7**. | Mark + Claude |
| 2026-04-29 | Initial. 10 HARD rules (R-EBOOK-001..010) covering page geometry, page-category surface/numbering, signal-go 60×2 reservation, cover lockup placement, Section Opener title, Stat Page hero number, mandatory page structure, reading order, cover composition split, footnote/endnote signal-go semantics. BASE typography table per role. MENU catalog: 3 cover treatments + 16 interior page types (with intentional variants). Renderer pinned to Typst. No foundation overrides. Pull-quote teal pattern removed per Mark's call. | Mark + Claude |
