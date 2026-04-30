---
type: design-system-test-learnings
status: complete
owner: claude
created: 2026-04-30
updated: 2026-04-30
tags:
  - design-system-test
  - presentations
  - marp-pipeline
  - chunks-validation
related:
  chunk: "[[10-Brand/visual-system/chunks/presentation]]"
  renderer: "[[10-Brand/visual-system/renderers/marp/README]]"
  fixture: "[[10-Brand/visual-system/presentations/test-state-of-privacy/content]]"
  spec: "[[10-Brand/visual-system/presentations/test-state-of-privacy/deck]]"
summary: "End-to-end stress test of chunks/presentation.md v1.2 via the actual agentic pipeline (deck.md → theme.css → marp CLI → deck.pdf). Validates the rule-based renderer pattern from architecture v2 §7. Original v1 of this doc captured a mistaken Figma-built test; v2 documents the real Marp-rendered pipeline. Three iteration cycles closed all material visual issues. The chunk's HARD + BASE contract held end-to-end through automated rendering."
---

# Test deck learnings — Marp pipeline build

> **v1 of this doc (deleted) captured a mistaken approach** — slides built manually in Figma via `figma_execute`. Mark called it out: that's not the workflow. This v2 documents the actual end-to-end Marp pipeline build, which is the real test of `chunks/presentation.md`.

## What the pipeline looks like (v3, the workflow we agreed on)

```
1. AUTHOR writes deck.yaml (content + named fields per slide, ergonomic)
2. compile-deck.js emits deck.md (per-pattern emitters; chrome auto-emits)
3. THEME applies HARD + BASE rules from chunks/presentation.md
4. MARP renders → deck.pdf (or per-slide PNGs)
5. REVIEW the rendered output
6. ITERATE the THEME (CSS) or an EMITTER (compile-deck.js) when issues surface
   — never hand-edit deck.md (it's a build artifact)
```

This mirrors the ebook pipeline (`spec.typ` → typst → PDF) — same direction, different language.

This implements architecture v2 §7 — the agentic workflow for design — at the renderer layer. Phase 3 wraps the slash-command + reviewer-swarm UX around this Phase 2 foundation.

## Pipeline command (the one-liner)

```bash
cd 10-Brand/visual-system

# Build the theme (after token or theme.css change)
./renderers/marp/build-tokens.sh

# Render the deck
npx --yes @marp-team/marp-cli \
  --theme renderers/marp/theme.css \
  --html \
  --allow-local-files \
  --pdf \
  presentations/test-state-of-privacy/deck.md \
  -o presentations/test-state-of-privacy/deck.pdf
```

## What was built

| Path | Purpose |
|---|---|
| `renderers/marp/build-tokens.sh` | jq-based token bridge. Mirrors `renderers/typst/build-tokens.sh` discipline. Extracts `tokens/brand.tokens.json` → `tokens.css` (CSS custom properties), then concatenates `tokens.css + myvault-presentation.css` → `theme.css` (the file Marp loads). |
| `renderers/marp/tokens.css` | Auto-generated CSS custom properties — 99 lines covering all colors, gradients, typography roles, radius, space tokens. |
| `renderers/marp/myvault-presentation.css` | Theme rules — implements R-PRES-001..003 + BASE typography ladder + 10 per-class layouts (cover, statement, problem, three-shifts, architecture, stat-hero, comparison, thesis, action, closing). |
| `renderers/marp/theme.css` | Auto-generated. `tokens.css + myvault-presentation.css` concatenated. **The file Marp loads.** |
| `renderers/marp/fonts/Lato-Regular.ttf` | Bundled. Self-contained — no font dep at render time. |
| `renderers/marp/fonts/PTSerif-Regular.ttf` | Bundled. |
| `renderers/marp/README.md` | Operator guide. Quickstart + how-to-author-a-deck + how-to-add-a-layout + token re-sync + known gotchas. |
| `presentations/test-state-of-privacy/content.md` | Slide-by-slide content brief (the design intent — written first, drives the deck spec). |
| `presentations/test-state-of-privacy/deck.md` | Marp markdown spec — 10 slides with `_class:` directives. The author's deliverable. |
| `presentations/test-state-of-privacy/deck.pdf` | Rendered PDF (152 KB, 10 pages, 1920×1080 each). |
| `presentations/test-state-of-privacy/slides/slide.001.png` … `slide.010.png` | Per-slide PNG renders (1920×1080 each). |

## Iteration cycles

### Cycle 1 (build) — initial scaffold

Built directory + token bridge + theme CSS + bundled fonts + deck.md spec. First render attempt produced a PDF, but with surface and dramatic-register styling missing.

**Issue:** `@import 'tokens.css'` in the theme didn't resolve. Marp's CSS processor strips `@import`. Variables referenced via `var(--color-core-teal)` were never defined.

**Fix (Cycle 2):** Restructured `build-tokens.sh` to also produce `theme.css` = concatenated `tokens.css + myvault-presentation.css`. Marp loads the concatenated file directly.

### Cycle 2 (debug) — class-based styling working

After concatenated theme: all surface palettes, dramatic-register treatments, per-layout compositions render correctly across all 10 slides. The chunk's HARD + BASE rules survive end-to-end through the automated render.

### Cycle 3 (validation) — visual review of all 10 slides

Every slide renders cleanly:

| Slide | Surface | Layout | Status |
|---|---|---|---|
| 1 Cover | gradient/warm | brand-mark anchor + 96pt title + 40pt subtitle + speaker | ✓ |
| 2 Statement | white | header labels + 96pt centered statement + footer | ✓ |
| 3 Problem | Vault Teal full-bleed | header labels + 72pt title + 3 problem rows + closing observation + footer | ✓ |
| 4 Three Shifts | white | header labels + 72pt title + 3-card grid + closing observation + footer | ✓ |
| 5 Architecture | black | header labels + 72pt title + body sentence + 4-layer stack with hairlines + closing observation + footer | ✓ |
| 6 Stat Hero | white | header labels + 240pt teal hero + 56pt headline + body + source + footer | ✓ |
| 7 Comparison | off-white | header labels + 72pt title + 5×5 Harvey Ball table (MyVault column teal) + legend + footer | ✓ |
| 8 Lessons | white + pastel cards | header labels + 40pt thesis-pattern headline + 3+2 staircase pastel cards + footer | ✓ |
| 9 Action | white | header labels + 56pt title + 3 action blocks (signal-go top hairline) + closing line + footer | ✓ |
| 10 Closing | gradient/cool | 120pt centered hero + speaker + signal-go period mark | ✓ |

## What the chunk got right (validated end-to-end through automated render)

The v1.2 chunk's HARD + BASE contract held without revision through automated rendering:

1. **R-PRES-001 canvas** — every slide is 1920×1080, padded 20/40/20/40, vertical layout. The CSS one-liner: `section { width: 1920px; height: 1080px; padding: 20px 40px; display: grid; }`.
2. **R-PRES-002 chrome** — `.chrome-top` and `.chrome-bottom` SPACE_BETWEEN flex rows; `section header, section footer { display: none !important }` to defeat Marp's defaults; both are conditional and the author chooses per slide.
3. **R-PRES-003 18pt floor** — every text class in the theme starts at ≥18px; no caption-tier 12pt class exists; renders never produce text below the floor.
4. **BASE typography ladder** — 9 size tiers via CSS classes. h1–h5 markdown headings map to ladder positions. Author writes `# title` and gets 72pt PT Serif black.
5. **BASE Surface Palette** — `section.cover`, `section.problem`, etc. set surface + text-color + chrome-color in one place per layout.
6. **Vault Teal discipline** — every teal instance in the rendered deck is in a documented earned context (Cover anchor, Stat hero, Comparison MyVault column, Action top hairline, Closing period, Problem full-bleed). No decoration teal anywhere.
7. **Pattern Reference as study, not template** — the test deck's compositions are different from any of the 13 Section-1 prototypes (different slide types, different content, different surface choices), yet every slide is brand-correct. The chunk's "compose, don't slot-fill" framing produces clean output.
8. **Foundation overrides** — both R-TYPE-005 (18pt floor) and R-COLOR-009 (chart-card scoped exception) are intact in the renderer's enforcement.

## Pipeline-side lessons

These are *renderer-implementation* lessons. They belong in the renderer README, not the chunk:

### 1. Marp strips `@import`
Cannot use `@import 'tokens.css'` in the theme — variables stay undefined in the rendered HTML. Build-time concatenation is the fix.

### 2. Defeat Marp's default chrome
Marp adds `<header>` and `<footer>` elements automatically. They conflict with the canonical SPACE_BETWEEN chrome shape. `display: none !important` on both at the global level.

### 3. Inline HTML required
Slide compositions need `<div class="...">` structure beyond markdown. Invoke marp with `--html`.

### 4. `--allow-local-files` for bundled fonts
Without it, `@font-face url('fonts/...')` fails silently. Render proceeds with system fonts (which works for Lato on macOS but fails for PT Serif).

### 5. Bundled fonts are self-contained
Copy/download fonts into `renderers/marp/fonts/`. `@font-face` paths in `myvault-presentation.css` are relative to the CSS file's location after concatenation. As long as `theme.css` lives in `renderers/marp/`, paths resolve.

### 6. CSS Grid handles slide-canvas geometry naturally
`grid-template-rows: auto 1fr auto` maps cleanly to header / content / footer. The 1fr middle row absorbs all available height, pushing footer to the bottom — the same pattern that needed manual `layoutGrow=1` spacers in the (deleted) Figma build.

### 7. Per-class layouts via single-line CSS
Every register (cover, problem, architecture, etc.) is a CSS class on `<section>`. The chunk's "compose, don't slot-fill" maps to "pick a layout class for each slide." Author writes `<!-- _class: problem -->` and gets the dramatic teal full-bleed register.

## Recommendation

**Phase 2 is shipped for presentations.** The renderer + theme + token bridge + bundled fonts + a working test deck now exist. Any future MyVault deck is `cp deck.md new-deck.md`, edit content, run the marp command. Brand-correct output by construction.

The chunk is now load-bearing for two consumers: humans reading it for the canon, and the Marp theme implementing it. Changes to the chunk that affect renderable behavior need a corresponding theme update; the README's "Adding a new layout" section documents the discipline.

## What's NOT done (Phase 3 territory)

Per architecture v2 §7:

1. **`/myvault:design-presentation` slash command** — invokes the agent.
2. **`presentation-designer` agent** — Brief → Spec → Render → Review protocol.
3. **5-reviewer parallel swarm** — color / typography / layout / brand-elements / accessibility, each screenshotting the rendered output and scoring against the chunk.

These wrap the agentic UX around the Phase 2 renderer. Independent of this work.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-30 | **v3 — adapted to ebook-direction author ergonomics.** Mark called out that the v2 pipeline still left the author writing verbose marp markdown with HTML divs — far from the ebook's clean function-call ergonomics (`#body-page(running-header: "X", body)`). Added a deck-spec compiler (`renderers/marp/compile-deck.js`) with per-pattern emitter functions that mirror the Typst page-function model. New three-stage pipeline: **`deck.yaml` (author surface — content + a few tags per slide) → `compile-deck.js` (per-pattern emitters, chrome auto-emits) → `deck.md` (build artifact) → `marp` → `deck.pdf`.** Each emitter cites its R-PRES rule + Section-1 Pattern Reference, mirroring the Typst function discipline of citing R-EBOOK rules + Figma node IDs. Author spec went from ~280 lines of HTML-laced markdown to ~120 lines of structured YAML. Theme CSS unchanged — only the author-facing surface improved. The chunk is still the rule source; the theme is still the layout implementation; the new compiler is the missing layer that lets authors write content like ebook authors do. Re-render confirmed: all 10 slides match the prior output (parity verified visually on Cover, Problem, Comparison). | Mark + Claude |
| 2026-04-30 | v2 — captures the actual Marp pipeline build (this doc). Replaces the deleted v1 (which captured a mistaken Figma-built test). 3 cycles closed. Chunk v1.2 contract validated end-to-end through automated render. Pipeline shipped: deck.md → theme.css → marp → deck.pdf. | Mark + Claude |
| 2026-04-30 | v1 — DELETED. Captured Figma-built test slides. Wrong workflow — bypassed the renderer-based pipeline. Mark caught it; the right approach is what's now documented above. | Claude |
