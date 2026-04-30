---
type: reference
status: active
owner: mark
created: 2026-04-29
updated: 2026-04-29 (icons phase shipped)
tags: [visual-system, status, roadmap, progress]
summary: "Single rollup status doc for the MyVault visual-system. Tracks what's shipped, what's in progress, and what's next across tokens, assets, foundation chunks, Figma canon, renderers, and ui-system. Updated when anything material ships. The first thing a future agent or contributor should read to orient."
---

# Visual-system status

Where we are, what's done, and what's next. Updated whenever something material ships. **Read this first** when picking up the visual-system in a new session — it's faster than walking the directory tree.

> **Phase:** Foundation phase 1.7 + **Phase 2.1 (presentation renderer) shipped** — foundations layer locked (4 chunks) + 2 asset-type chunks (ebook v1.1, presentation v1.2) + 2 renderers (Typst for ebook, Marp for presentation). Both renderers validated end-to-end through real-content render: ebook test (`documents/ebook-test/output.pdf`) and presentation test (`presentations/test-state-of-privacy/deck.pdf`). The agentic pipeline (author writes spec → renderer applies chunk rules → PDF) is operational for both asset types. **Status: foundations + asset-type chunks for ebook and presentation are complete; both have working renderers; 4 more asset-type chunks roadmapped (social, chart, email, web-component).**

---

## Shipped

### Tokens layer (1 file + 2 ops files)

| Path | What | Date |
|---|---|---|
| `tokens/brand.tokens.json` | Canonical W3C DTCG tokens — **54 atoms** (14 color · 14 space · 9 radius · 12 typography · 5 gradient + 1 alias) | 2026-04-29 |
| `tokens/extract.log.json` | Run history with per-element added/removed/changed log. Run #1 records every element under `added[]`. | 2026-04-29 |
| `tokens/README.md` | Operator guide + embedded extraction snippet (the `figma_execute` JS) | 2026-04-29 |

**Validated:** 26/26 checks passed against [[04-token-storage-plan]] §10.

### Assets layer — Logo (18 files)

| Path | What | Date |
|---|---|---|
| `assets/logo/{icon,wordmark,lockup}-{primary,teal,light,white}.svg` | **12 active variants** (text-outlined, no font dependency) | 2026-04-29 |
| `assets/logo/{icon,wordmark,lockup}-gray.svg` | **3 deprecated variants** — kept on disk, marked `status: deprecated`, never used | 2026-04-29 |
| `assets/logo/assets-manifest.json` | Catalog: dimensions, color-token bindings, intended use, Figma round-trip metadata | 2026-04-29 |
| `assets/logo/extract.log.json` | Run history; 15 entries in `added[]` | 2026-04-29 |
| `assets/logo/README.md` | Operator guide + embedded extraction snippet | 2026-04-29 |

**Validated:** 17/17 checks passed.

### Assets layer — Icons (3 files, no SVGs — Approach C)

| Path | What | Date |
|---|---|---|
| `assets/icons/icons-manifest.json` | **210 curated Phosphor icons** with full Phosphor metadata (categories, tags, codepoints, version), 2 weights (Regular + Fill), token bindings. ~125 KB. | 2026-04-29 |
| `assets/icons/extract.log.json` | Run history — every sync against Phosphor's metadata + Figma. Run #1 lists all 210 in `added[]` with category breakdown. | 2026-04-29 |
| `assets/icons/README.md` | Operator guide explaining Approach C (Phosphor as versioned dependency, no local SVGs), per-renderer integration notes, re-sync procedure. | 2026-04-29 |

**Approach C decision:** Phosphor IS the canonical source — duplicating 420 SVGs into the vault would be lock-in to Figma export artifacts (clipPath wrappers, hardcoded `fill="black"`). Renderers consume Phosphor via npm (`@phosphor-icons/react` for JSX, `@phosphor-icons/core` for raw SVGs) or CDN. The manifest is our curation record.

### Foundation chunks — agentic canon (4 files, 38 HARD rules total)

| Chunk | Lines | HARD rules | Cross-refs | Date |
|---|---|---|---|---|
| `foundations/color.md` | 303 | 10 (`R-COLOR-001..010`) | self-contained; pairings duplicated to logo for the canonical home | 2026-04-29 |
| `foundations/typography.md` | 281 | 9 (`R-TYPE-001..009`) | `R-COLOR-009` (no teal below display) | 2026-04-29 |
| `foundations/logo-usage.md` | 311 | 10 (`R-LOGO-001..010`) | `R-COLOR-006`, `[[color#accessibility]]` (contrast authority) | 2026-04-29 |
| `foundations/iconography.md` | ~290 | 10 (`R-ICON-001..010`) | `R-COLOR-003` (signal-color decoration), `[[color#accessibility]]`, `[[typography]]` (icon-text pairing), `[[logo-usage]]` (no decoration parity) | 2026-04-29 |

**Each chunk has:** rich frontmatter (`token_dependencies`, `asset_dependencies`, `visual_canon`, `review_axes`, `related_memories`), HARD rules with machine-checkable predicates, BASE rules, decision tree, reviewer-agent integration, anti-patterns, visual-canon pointer.

### Asset-type chunks — agentic canon (2 files shipped, 4 roadmapped)

| Chunk | Lines | HARD rules | Renderer | Visual canon | Date |
|---|---|---|---|---|---|
| `chunks/ebook.md` v1.1 | ~570 | 7 (`R-EBOOK-001..007`) | Typst | Figma page `70:8798` (+ refs `72:9166`, `89:6938`) | 2026-04-30 |
| `chunks/presentation.md` v1.2 | ~580 | 3 (`R-PRES-001..003`) | Marp (provisional) | Figma page `74:9684` (Section 1 `97:8611` + test Section 2 `151:9048`) | 2026-04-30 |

**Total HARD rules across all chunks: 49** (R-COLOR 10, R-TYPE 9, R-LOGO 10, R-ICON 10, R-EBOOK 7, R-PRES 3). The presentation chunk holds **two foundation overrides** — the first across the chunks layer: R-PRES-003 raises R-TYPE-005's 14-pt floor to 18 pt for the asset type (raise-floor), and a scoped R-COLOR-009 exception allows Vault Teal at 18 pt for chart annotations inside chart-card boundaries (scoped-exception, to be ratified at foundation level when `chunks/chart.md` ships).

### Ebook end-to-end test (Phase 2 proof-of-concept)

The chunks/ebook.md v1.1 contract has been validated end-to-end via a real Typst render. **The pipeline works.**

| Path | What |
|---|---|
| `renderers/typst/myvault-ebook.typ` | Typst function library implementing the chunk contract — 11 page-type functions |
| `renderers/typst/tokens.typ` | Auto-generated token bridge (`build-tokens.sh` produces it from `tokens/brand.tokens.json`) |
| `renderers/typst/build-tokens.sh` | jq-based token bridge script |
| `renderers/typst/fonts/` | Bundled Lato Regular + PT Serif Regular |
| `documents/ebook-test/spec.typ` | Real-content spec — "The Architecture of Trust", an 18-page editorial ebook |
| `documents/ebook-test/output.pdf` | The rendered ebook |
| `documents/ebook-test/README.md` | Operator guide + iteration history + chunk-level findings |

**Validated:** all 7 HARD rules (R-EBOOK-001..007), 11 distinct MENU page types, foundation-rule inheritance (R-COLOR / R-TYPE / R-LOGO / R-ICON), surface-flip on dramatic-register pages, signal-go reservation. Three iteration cycles (smoke → real-content → fixes). Total HARD rules across the visual system: **46** (R-COLOR 10, R-TYPE 9, R-LOGO 10, R-ICON 10, R-EBOOK 7) — all enforced by the template.

**Pipeline command:**
```bash
typst compile --root visual-system --font-path renderers/typst/fonts \
  documents/ebook-test/spec.typ documents/ebook-test/output.pdf
```

**`chunks/_manifest.yaml`** — asset-type registry. Lists all chunks with renderer pinning, foundations consumed, reviewer axes, output formats, severity tiers (HARD/BASE/MENU), and `load_for_task` lookup. Roadmaps 5 more chunks (presentation/Marp, social/Satori, chart/Vega-Lite, email/React-Email, web-component/Tailwind v4 — last is deferred to ui-system phase).

**Severity tier addition:** asset-type chunks use a third tier — **MENU** — that foundations don't have. MENU = choose-one alternatives; reviewers don't reject MENU choices. Pick what fits the content. (Per `feedback_design_pages_are_guidelines`.)

### Foundations registry — `foundations/_manifest.yaml`

A single registry an agent loads to discover all foundation chunks and their relationships:

- **chunks** — all 4 foundation chunks with rule IDs, review axes, visual canon pointers, token consumption
- **reviewers** — registry of 5 reviewer agents (color-reviewer, typography-reviewer, brand-element-reviewer, icon-reviewer, accessibility-reviewer) with which chunks each consumes and which is mandatory for what
- **rule_lattice** — explicit cross-rule relationships (e.g., R-COLOR-003 ↔ R-ICON-006 both enforce signal-color discipline)
- **token_consumption** — graph showing which tokens each chunk reads from `brand.tokens.json`
- **related_memories** — 10 universal canon memories that load alongside any foundation chunk
- **load_for_task** — quick lookup of which chunks to load for common task types (presentation, social, document, web, etc.)

This is the structural integration that makes iconography (and every other foundation) discoverable by agents through a single manifest read.

### Figma canon (4 guide pages + 1 source-of-truth page, all bound to live tokens/components)

| Page | id | What's on it |
|---|---|---|
| `Color` | `121:10583` | Header · Palette (14 swatches in 4 groups) · Hero color · 80/10/10 ratio + visual · Gradients (5 cards) · Pairings (14 cells) · Don'ts (5 cells) · Accessibility |
| `Typography` | `121:10779` | Header · Type scale (12 specimens in 4 groups) · Display is the hero · Size discipline + 80/15/5 ratio visual · Pairings (4 combinations) · Don'ts (4 cells) · Accessibility |
| `Logo` | `125:11406` | Header · The Logo system (12 cards) · Anatomy (3 cards) · Clear space + min sizes (rules + visual) · Pairings (14 cells) · Don'ts (4 cells) · Accessibility |
| `Iconography` | `125:12294` | Header · The Icon system (6 categories × 6 sample icons) · Weights (Regular vs Fill, 5 icons + active-state callout) · Sizes (16/20/24/32/48 ladder) · Pairings (5 icon-text cards) · Don'ts (4 cells) · Accessibility |
| `Icons` (source-of-truth) | `10:119` | The 210-icon Phosphor component set (Regular + Fill weights). Source for the curated manifest. Not a guide page — design source. |

All three pages share the established foundation layout: white bg, 1440 frame, 80px padding, 40px section gap, LINE dividers, headings in `heading/l` black, body in `body/l`. Bound to live variables/paint styles/components — change a token, the pages update.

### Plan documents (4 in `_plan/`)

| Path | What |
|---|---|
| `_plan/visual-system-pipeline-plan.md` | Phase 0 reality bridge — what's in Figma vs. proposal |
| `_plan/visual-system-architecture-v2.md` | Translation pipeline + 4-layer extension + renderer registry |
| `_plan/03-brand-design-vs-ui-system.md` | **Locked scope** — visual-system internal layout, ui-system deferred |
| `_plan/04-token-storage-plan.md` | Token storage approach (DTCG, single file, $extensions for round-trip) |

Plus the 1213-line master proposal at `00-DESIGN-PROPOSAL.md` (Mark, 2026-04-16).

### Memories saved this phase (5 entries — none added during icons phase)

| Memory | What it captures |
|---|---|
| `feedback_white_is_default_surface` | White is the default surface (60% of 60/30/10), off-white is the rare alternate |
| `project_foundation_page_layout_pattern` | Foundation page Figma layout pattern (white bg, 1440 frame, 80 padding, 40 gap, LINE dividers) |
| `feedback_hero_color_80_20_black_teal` | Hero color split: ~80% black, ~20% Vault Teal across all visual contexts |
| `feedback_14pt_practical_text_floor` | 14pt is the practical text floor; 12pt rare-instance only |
| `feedback_no_gray_logo_variant` | Gray logo variants are deprecated; never use |

All indexed in `MEMORY.md` and load automatically in future sessions.

---

## In progress

**Thread C — Presentation Figma guide page** in flight. Mirrors the foundation-page layout pattern (white bg, 1440 frame, 80 padding, 40 gap, LINE dividers); sections: header / canvas / header-labels + footer / typography ladder / hero color / column system / slide-type catalog (link to Section 1) / Don'ts / accessibility.

**Thread B — Figma audit (`figma-reference.md`)** — **complete.** Cycle 0 extracted all 13 Section-1 prototypes via `figma_execute`. 8 deltas surfaced; all 8 resolved. 5 mechanical chunk updates applied to `chunks/presentation.md` v1.0 → v1.1; 3 canon decisions made (header text accepted as labels-not-bar, chart-card teal accepted as scoped exception, Slide 09 Thesis-pattern at 40pt accepted as stylistic choice). Total chunks layer foundation overrides: 1 → 2.

**Phase 2 ebook end-to-end** is **complete** (see Ebook end-to-end test below). Foundation phase 1.7 (4 foundation chunks + ebook + presentation chunks shipped). Presentation Phase 2 (Marp theme + per-pattern layouts) is queued behind the Figma guide page (Thread C).

---

## Roadmap

Ordered by my recommendation, but Mark drives priority.

### Next foundation pages + chunks

| Foundation | Why next | Effort estimate | Blocker |
|---|---|---|---|
| **Imagery & illustration** | `references/illustration-line-art/` already has 4 reference images; Figma illustration page exists but empty | ~2 sessions | Mark: gather more line-art refs first, OR codify what we have |
| ~~Spacing & grid~~ | ~~Reclassified~~ | — | **Removed from roadmap** — grid is content-specific (per `feedback_grid_is_content_specific`); space tokens are universal but grid rules live in asset-type chunks (presentation, social, ebook, document, chart). Each asset-type chunk defines its own grid. |

### Asset-type chunks (next layer — 4 more after ebook + presentation)

| Chunk | Renderer | Existing canon | Effort | Blocker |
|---|---|---|---|---|
| ~~`chunks/presentation.md`~~ | ~~Marp~~ | ~~shipped 2026-04-30 v1.0~~ | — | **Done** |
| **`chunks/social.md`** | Satori | `feedback_figma_card_structure`, Stream A vs Stream B canon mentioned in plans | ~1 session | Stream A/B split rules need Mark's call |
| **`chunks/chart.md`** | Vega-Lite | `project_diagram_canonical_specs` is rich | ~1 session | None |
| **`chunks/email.md`** | React Email | Less existing canon | ~2 sessions | Minimal canon collected so far |
| **`chunks/web-component.md`** | Tailwind v4 + React | n/a | — | Deferred to ui-system phase per locked scope |

### Cross-cutting chunks

| Chunk | Purpose |
|---|---|
| `foundations/brand-compliance-rules.md` | Universal HARD rules pulled from per-foundation chunks (no shadows, regular only, no eyebrows, 18pt floor, white default, no gray logo, no tinted teal, etc.) |
| `foundations/motion-and-animation.md` | Phase 4 per architecture v2 — defer until Remotion phase |

### Token categories deferred

Documented in [[tokens/README.md#future-token-categories]]:
- Grid styles (`grid.*`) — recommended, not in Figma yet
- Effect styles (`shadow.*`, `blur.*`) — mostly deferred to ui-system
- Border-width tokens (`stroke.*`) — worth considering when component patterns codify
- Opacity tokens (`opacity.*`) — when chunk hydration surfaces canonical values
- Motion (`duration.*`, `easing.*`) — Phase 4
- Z-index/elevation, breakpoints — deferred (ui-system territory)

### Renderer phase (Phase 2+)

Per [[visual-system-architecture-v2]], one renderer per asset type. Each phase ≈ 2–4 days of focused work, runs after all foundations are stable.

| Asset type | Renderer | Phase |
|---|---|---|
| Presentations | Marp | 2.0 — first proof-of-concept |
| Social images | Satori | 2.1 |
| Charts | Vega-Lite | 2.2 |
| Documents / ebooks | Typst | 2.3 |
| Email | React Email | 3.1 |
| Web components | Tailwind v4 + CSS variables | 3.2 |
| Animation / video | Remotion | Phase 4 |

**All deferred** until foundations are stable. Per locked scope ([[03-brand-design-vs-ui-system]]), `myvault-tools/brand-studio/` is out of phase 1.

### `ui-system/` (deferred entirely)

Per locked scope: ui-system arrives only when the tools site or future MyVault app drives it. No scaffolding, no chunks, no commands.

---

## Standing items

### Uncommitted work

Everything from the foundation phase 1 buildout is **on `main`, uncommitted**. When you say go, this is a single coherent commit's worth of work:

- `tokens/` — 3 files
- `assets/logo/` — 18 files
- `foundations/` — 3 chunks
- `_plan/04-token-storage-plan.md` (and amendments to 03)
- 5 new memory entries + `MEMORY.md` updates
- The 3 Figma pages live in Figma directly (not in git — they're authored in the design tool)

Suggested commit message: `feat(visual-system): foundation phase 1 — color, typography, logo (tokens, assets, chunks)`.

### Open decisions Mark has not yet made

- **Effect tokens:** stay deferred or add `shadow/none` sentinel now?
- **Plugin packaging:** does `visual-system/` ship as a Claude Code plugin (like `brand-system/` does)?
- **Asset-type ordering:** which asset-type chunk to build first (presentation / social / ebook / document)?

### Resolved decisions (this phase)

- **Iconography source** — resolved to Phosphor (curated 210-icon subset, 2 weights, no local SVGs per Approach C)
- **Spacing & grid scope** — grid is content-specific, not foundational. Lives in asset-type chunks. Foundations layer is complete at 4 chunks (no spacing-and-grid coming).

### Cleanup queued

- Old `10-Brand/Logo/{SVG,PNG}/` (3 SVG + 3 PNG masters): superseded by the new asset bundle but still on disk. Cleanup waits until references in other vault docs get rewritten to point at `assets/logo/`.
- Old verbal-system `visual-system.md` chunk in `10-Brand/brand-system/brand-system/identity/visual-system.md` (280 tokens, 2026-02-19): partially superseded by the new foundation chunks. Should become a 50-token pointer to the new sibling system.

---

## How to update this file

When something material ships:

1. Move the item from **Roadmap** to **Shipped**, or from **In progress** to **Shipped**
2. Add a row to the relevant **Shipped** table with path, what, date
3. If the item resolves an **Open decision**, add the decision to the relevant chunk's changelog and remove from this file
4. Update the **Phase** line at the top if a phase boundary was crossed
5. Update `last_updated` in frontmatter

Don't let this file rot. It's the single source of truth for "where are we" — drift here costs every future session a 30-minute archaeological dig.

---

## Cross-references

- **`MEMORY.md`** — indexed entries auto-load each session; the canon-decision log
- **`_plan/`** — the thinking documents (architecture, scope, storage)
- **`tokens/README.md`** — token-layer operator guide
- **`assets/logo/README.md`** — logo-asset operator guide
- **Figma canon:** [Color](https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=121-10583) · [Typography](https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=121-10779) · [Logo](https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=125-11406) · [Iconography](https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=125-12294)

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial. Captures foundation phase 1 completion: tokens (54 atoms) · logo assets (15 SVGs, 12 active) · 3 foundation chunks (29 HARD rules) · 3 Figma canon pages · 4 plan documents · 5 new memory entries. | Mark + Claude |
| 2026-04-29 | Icons phase shipped. Adds: 210-icon manifest with full Phosphor metadata, `foundations/iconography.md` (10 HARD rules, 38 total across 4 chunks), Iconography Figma guide page (id 125:12294), Approach C documented (no local SVGs, Phosphor as versioned dependency). Iconography removed from Roadmap. | Mark + Claude |
| 2026-04-29 | Phase 1.6 — first asset-type chunk shipped. Adds: `chunks/` layer (sibling to `foundations/`), `chunks/ebook.md` (10 HARD rules R-EBOOK-001..010, Typst pinned, MENU of 3 covers + 16 interior page types), `chunks/_manifest.yaml` (asset-type registry with renderer matrix, reviewer roster, load-for-task lookup). MENU tier introduced — unique to asset-type chunks. Spacing & grid reclassified (content-specific, lives in asset-type chunks not foundations). Two ebook memories superseded by the chunk; pull-quote teal pattern removed. Total HARD rules across all chunks: 49 (R-COLOR 10, R-TYPE 9, R-LOGO 10, R-ICON 10, R-EBOOK 10). | Mark + Claude |
| 2026-04-30 | **Phase 2 ebook end-to-end test passed.** Built `renderers/typst/myvault-ebook.typ` (function library implementing 11 page types), token bridge (`build-tokens.sh` + `tokens.typ`), bundled fonts. Wrote `documents/ebook-test/spec.typ` (18-page real-content fixture: "The Architecture of Trust"). Three iteration cycles. All 7 HARD rules + 11 MENU page types validated. Pipeline is replicable for the next 5 asset-type chunks. | Mark + Claude |
| 2026-04-30 | **Phase 2.1.1 — Marp pipeline adapted to ebook-direction author ergonomics.** Mark called out that the v2.1 pipeline still left the author writing verbose marp markdown with HTML divs — far from the ebook's clean function-call ergonomics. Added `renderers/marp/compile-deck.js` (Node + js-yaml) with per-pattern emitters mirroring the Typst page-function model in `renderers/typst/myvault-ebook.typ`. New three-stage pipeline: `deck.yaml` (content + a few tags per slide) → `compile-deck.js` (one emitter per pattern; chrome auto-emits from deck.meta + slide.section + position) → `deck.md` (build artifact) → `marp` → `deck.pdf`. Each emitter cites its R-PRES rule + Section-1 Pattern Reference (same discipline as Typst functions citing R-EBOOK rules + Figma node IDs). Author spec compressed from ~280 lines of HTML-laced markdown to ~120 lines of structured YAML. Theme CSS, token bridge, font bundling all unchanged. Render parity verified — all 10 slides match prior output. New files: `compile-deck.js`, `package.json` (declares js-yaml), `presentations/test-state-of-privacy/deck.yaml`. Pipeline now matches the ebook side in author-facing direction. | Mark + Claude |
| 2026-04-30 | **Phase 2.1 — Marp renderer shipped for presentations.** End-to-end pipeline operational: `presentations/<deck>/deck.md` (markdown + Marp directives) → `renderers/marp/theme.css` (concatenated tokens + theme rules, applies chunks/presentation.md v1.2) → `marp` CLI → `deck.pdf` + per-slide PNGs. New files: `renderers/marp/build-tokens.sh` (jq-based token bridge mirroring Typst's pattern), `tokens.css` (auto-generated CSS custom properties), `myvault-presentation.css` (theme rules — 10 per-class layouts: cover, statement, problem, three-shifts, architecture, stat-hero, comparison, thesis, action, closing), `theme.css` (concatenated, the file Marp loads), bundled `fonts/Lato-Regular.ttf` + `fonts/PTSerif-Regular.ttf`, `README.md` (operator guide). Test deck (`presentations/test-state-of-privacy/`) renders all 10 slides correctly via the pipeline — chunk v1.2 contract held end-to-end through automated render. Earlier same-day mistake (built test slides directly in Figma via figma_execute) corrected — Section 2 deleted from Figma; the canon is Section 1 only; render output is PDF, never Figma frames. Phase 2.1 spec: deck.md → theme.css → marp → PDF. Replicable for any future MyVault deck. | Mark + Claude |
| 2026-04-30 | **Phase 1.7.2 — presentation chunk → v1.2 after end-to-end test deck.** Built the State of Family Privacy 2026 deck — 10 novel slides (Cover, Statement, dramatic-teal Problem, 3-card Why-Now, editorial-dark Architecture, Stat Hero, Comparison with Harvey Balls, Thesis-pattern Lessons, Action, Closing) — via `figma_execute` in Figma Section 2 (`151:9048`) on Presentations page. Three review/iteration cycles closed 8 issues: 1 critical bug (Harvey Balls rendering as text), 4 layout fixes (auto-layout STRETCH overrides, footer push-to-bottom, card auto-sizing, staircase centering), 3 polish items (Cover brand-mark anchor, Stat-hero rhythm, Closing hero size + signal-go period mark). **Chunk's HARD + BASE contract held without rule changes.** Three additive BASE patterns landed in v1.2: (a) Closing observation pattern (28–32 pt synthesizing line at bottom of content slides with `layoutGrow=1` spacer); (b) Cover brand-mark anchor (optional small Icon-variant in lieu of header-label chrome on Cover/Closing); (c) Shape-primitive glyphs (Harvey Balls and similar markers as Figma Ellipse primitives, not unicode characters). Foundation overrides unchanged at 2. Test artifacts: `presentations/test-state-of-privacy/content.md` + `learnings.md` + Figma Section 2. Manifest 1.3 → 1.4. | Mark + Claude |
| 2026-04-30 | **Phase 1.7.1 — presentation chunk → v1.1 after Cycle 0 Figma audit.** All 13 Section-1 prototypes extracted via `figma_execute` and saved as audit baseline at `presentations/investor-deck-test/figma-reference.md`. 8 deltas surfaced and resolved: (1) R-PRES-002 reshaped — "no top header strip" became "no decorative top header bar; text-only deck-name + section-name labels are allowed at top of interior slides (Lato Regular 18, gray-02/white per surface, SPACE_BETWEEN row, conditional)" after every prototype confirmed the labels are present and text-only. (2) Slide Templates section reference dropped from chunk + manifest — section was deleted from Figma during v3 of the investor deck. (3) BASE Surface Palette swap — `color.core.white` is the default surface, `color.core.off-white` is the rare alternate (per `feedback_white_is_default_surface`). (4) Body color on dark surfaces is solid white, not @ 0.85. (5) Typography ladder extended from 6 to 9 tiers — 144 / 72 / 64 / 56 / 48 / 40 / 32 / 28 / 18 — adding 64pt mid-display heading, 48pt mid-stat tile value, 32pt chart card title. (6) 56pt usage broadened beyond Statement headlines. (7) Vault Teal scoped exception within chart cards — second `foundation_overrides` entry; R-COLOR-009 carve-out for chart annotations (axis labels, year labels, legend labels, source captions) at 18pt inside chart card boundaries. (8) Slide 09 Thesis-pattern title at 40pt documented as a deliberate Thesis-pattern stylistic choice. Manifest bumped 1.2 → 1.3. Total foundation overrides across the chunks layer: 1 → 2. | Mark + Claude |
| 2026-04-30 | **Phase 1.7 — second asset-type chunk shipped.** `chunks/presentation.md` v1.0 — 3 HARD rules (R-PRES-001..003): canvas geometry (1920×1080, padding 20/40/20/40, vertical auto-layout), no-top-header-strip + canonical footer shape when chrome is used (footer presence conditional, not mandatory), 18-pt text floor (the chunks layer's first explicit foundation override of R-TYPE-005). BASE table covers typography ladder (144 / 72 / 56 / 40 / 28 / 18 across PT Serif + Lato), surface palette + register guidance (no closed kind→surface mapping), Vault Teal as discipline (sparingly, every instance earns presence — explicit rejection of the closed reservation list), 70/20/7/3 + max-2-colours, 1/2/3-column grid (1840 / 900×N / 587×N gap 40), card padding 40/22, footer Icon-variant pairing per surface, typical deck shape (Cover + Closing as default patterns, not contracts). Pattern Reference replaces MENU — 13 Section 1 prototypes + 8 Slide Templates prototypes are study material for register, not templates. Two-layer reviewer (Layer 1 rule compliance blocking, Layer 2 reader experience advisory). Renderer pinned provisionally to Marp; chunk is renderer-agnostic. **Total HARD rules across all chunks: 46 → 49.** A 4th HARD rule (minimum-viable deck structure — Cover + Closing) was drafted and removed during initial authoring once `feedback_no_mandatory_pages_editorial_first` landed mid-write — Cover and Closing now live in BASE as default patterns, not contracts. Manifest v1.1 → v1.2. | Mark + Claude |
| 2026-04-30 | `chunks/ebook.md` → v1.1. Pinning relaxed per new `feedback_chunk_size_placement_pins` memory. R-EBOOK-004 reshaped (every cover has a lockup; placement/size governed by R-LOGO foundation rules, not chunk pins). R-EBOOK-005 (Section Opener 72pt) and R-EBOOK-006 (Stat Page 220pt) demoted to BASE. R-EBOOK-009 (cover composition split) deleted — covers reframed as experimental surface. R-EBOOK-007/008/010 renumbered to R-EBOOK-005/006/007. R-EBOOK-002 reshaped around canonical Icon-left + page-number-right footer (Figma 72:9166) with surface-flip override for dramatic content (Figma 89:6938). R-EBOOK-001 expanded with explicit 1-col / 2-col inner-grid options. New MENU entry: `stat-page-3-teal-mirror`. Total HARD across all chunks: 49 → **46** (R-COLOR 10, R-TYPE 9, R-LOGO 10, R-ICON 10, R-EBOOK **7**). Phase 2 ebook-flow test queued as next milestone before continuing to other asset-type chunks. | Mark + Claude |
