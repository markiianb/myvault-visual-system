---
type: research-prompt
status: ready
owner: mark
created: 2026-04-30
purpose: "Independent research session — compare the Typst-based visual system to an HTML/CSS alternative for MyVault's design system + PDF deliverables."
---

# Research prompt — Typst-chunks vs HTML/CSS for MyVault visual system

## What you're being asked to do

Independently research and test whether MyVault's current Typst-based visual-system architecture is the right approach, or whether a simpler HTML/CSS-based design system (with print stylesheets) would work better. Reach your own conclusion — do not assume the existing approach is correct.

The user has been building a chunk-based design system (`HARD/BASE/MENU` rules per asset type) with a Typst renderer for editorial PDFs (ebooks, guides, reports). They just shipped the AI Privacy Guide as a 19-page PDF. They are questioning whether HTML/CSS would give them the same output with less complexity, more reuse across channels (web, email, print), and better leverage from LLMs trained on web tech.

## Context to load (read in this order)

Working directory: `/Users/mark_b/Documents/Business/MyVault/10-Brand/visual-system/`

1. `documents/ebook-test/workflow.md` — the editorial-first principle. Brand provides RULES + PRIMITIVES; document provides INTENT; system COMPOSES. This philosophy is renderer-agnostic — your evaluation should respect it regardless of which renderer wins.
2. `chunks/ebook.md` (v1.3) — the most mature asset-type chunk. Read the HARD/BASE/MENU structure, the renderer pinning section, and the Phase 2 deliverable section listing the active primitives in `myvault-editorial.typ`.
3. `chunks/presentation.md` — sibling chunk; note its scoped exception around chart annotations (anticipates future chart chunk).
4. `renderers/typst/myvault-editorial.typ` — the active editorial primitives module. ~600 lines. Defines `flow`, `chapter`, `subhead`, `section-opener`, `pull-page`, `stat-page`, `hero-stats`, `model-grid`, `takeaways`, `data-grid`, `compare-cols`, `audit-block`, etc.
5. `documents/ebook-test/privacy-guide-spec.typ` — the canonical deliverable using those primitives.
6. `documents/ebook-test/privacy-guide.pdf` and `privacy-pages-v4/` — the rendered output. **This is the visual fidelity bar to match.**
7. `tokens/brand.tokens.json` — the design-token source-of-truth (W3C DTCG format). Already extracted to `tokens.typ` via `renderers/typst/build-tokens.sh`.
8. `00-Meta/Conventions.md` — vault rules.
9. `10-Brand/CLAUDE.md` — brand-system context.

Memory entries that constrain any approach (load via `~/.claude/projects/-Users-mark-b-Documents-Business-MyVault/memory/`):
- `feedback_no_mandatory_pages_editorial_first.md`
- `feedback_chunk_size_placement_pins.md`
- `feedback_grid_is_content_specific.md`
- `feedback_design_pages_are_guidelines.md`
- `feedback_myvault_fonts_lato_primary.md`
- `feedback_regular_weight_only.md`
- `feedback_no_uppercase_eyebrows.md`
- `feedback_white_is_default_surface.md`
- `feedback_hero_color_80_20_black_teal.md`

## The hypothesis to test

**Claim**: An HTML/CSS-based design system (tokens as CSS custom properties + components encoding rules + a print stylesheet rendered to PDF via headless Chrome / weasyprint / Prince / pagedjs) would produce equivalent PDFs to the Typst pipeline with:
- Lower toolchain complexity (no Typst-specific DSL)
- Higher LLM/agent leverage (massive HTML/CSS training data)
- Better cross-channel reuse (same components for web, email, print, social)
- Faster iteration (live browser preview vs compile-render-look loop)

**Counter-claim**: Typst gives:
- Better editorial typography (kerning, hyphenation, baseline-grid, page-aware breaks)
- Native PDF/A and PDF/UA output (accessibility-compliant)
- Fewer rendering quirks for print (no print CSS oddities, no cross-browser inconsistency)
- A model where pagination is first-class (page primitives, footer/header per page, surface variation)

Your job is to test BOTH claims with evidence, not pick a side a priori.

## Test deliverable

Pick **3 representative pages** from the AI Privacy Guide (v4 PDF) and rebuild them in HTML/CSS with a print stylesheet:

1. **Page 1 — Cover** (full-bleed teal, big PT Serif title bottom-left, lockup top-left). Tests: full-bleed surfaces, large display type, color rendering, asset placement.
2. **Page 4 — Body content with hero-stats panel** (Lato body, PT Serif subhead, off-white card with 3-up stats, small Lato caption sources, footer). Tests: inline editorial blocks, multi-column grid, multiple type sizes, conditional surface fill.
3. **Page 7 — Model-grid + data-grid table** (2x2 cards with alternating fills, retention table with column headers and row dividers). Tests: card layouts, table rendering, gridlines, pagination control (data-grid is non-breakable in Typst — does CSS Paged Media handle this cleanly?).

Use whatever HTML→PDF tool you can install locally:
- **Headless Chrome** (`/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --print-to-pdf=...`) — fastest, no install
- **weasyprint** (`pip install weasyprint`) — best print CSS support
- **pagedjs** (`npm install pagedjs-cli`) — purpose-built for Paged Media
- **Prince XML** (commercial trial) — best fidelity for print

Page geometry to match: 800×1200 (CSS `@page { size: 800px 1200px }`; or use real units). Body margin 60pt top / 56pt bottom / 40pt sides. Use the same fonts (PT Serif + Lato Regular only — `@font-face` from system fonts or self-hosted). Hex values from `tokens/brand.tokens.json`.

Output the HTML version to `_research/html-css-test/` with a sibling rendered `.pdf` and per-page `.png`s.

## Comparison criteria

Rate both approaches across these axes:

| Axis | What to measure |
|---|---|
| **Visual fidelity to Typst output** | Side-by-side at 100% zoom. Match in: type metrics, color, spacing, alignment. Note specific divergences. |
| **Code volume** | Total LOC for the 3 pages — Typst spec + module function calls vs HTML + CSS + framework. |
| **Iteration speed** | Time to apply a change like "increase body line-height from 55% to 60%" — count file edits and build steps. |
| **Pagination control** | Can the HTML/CSS version match Typst's `breakable: false` on `data-grid`? Are header/footer per-page configurable? Section-opener + pull-page get full-bleed surfaces correctly? |
| **Typography quality** | Kerning, hyphenation, optical alignment, baseline rhythm. Print up to look at typography close-up. |
| **Tokens** | How easy to wire `brand.tokens.json` into CSS custom properties vs Typst tokens.typ. |
| **Agent friendliness** | Estimate from training-data density: how many existing HTML/CSS examples vs Typst examples. Try a small extension task in each (e.g., "add a 4th card to the model-grid") — which is faster for an LLM. |
| **Cross-channel reuse** | Could the same HTML/CSS components also render to web (browser), email (with email-CSS subset), social images (rasterize a single component)? Could Typst do the same? |
| **Tooling maturity** | Live preview, compile errors, debugging, fonts, asset pipelines, CI integration. |
| **Output formats** | PDF, PDF/A, PDF/UA, SVG (for embedded charts), email-safe HTML. Each tool's footprint. |
| **Maintenance burden** | If MyVault has 6 asset-type chunks (ebook, presentation, social, chart, email, web) — does each need its own renderer, or could one HTML/CSS stack serve most? |

## What "good research" looks like

- **Build the HTML/CSS test, don't just theorize.** Theory will mislead you about CSS Paged Media's actual quirks (header/footer slots, page-break-before, widow/orphan control, color reproduction).
- **Compare the rendered PDFs at 100% zoom side-by-side.** Don't trust thumbnails — typography lives at full resolution.
- **Try one specific extension to both stacks and time it.** "Add a 4th item to model-grid with a teal accent strip on the left." Whichever stack does this in fewer edits and with better-looking output wins that axis.
- **Be specific about where each fails.** "Headless Chrome's print mode rasterizes vectors at low DPI" or "Typst doesn't support flexbox" — name the actual failure modes.
- **Don't end with 'it depends.'** Pick a recommendation and justify it. The user wants a decision, not a both-sides essay.

## Your deliverable

Write findings to `_research/findings-typst-vs-html-css.md` with this structure:

```markdown
# Findings — Typst-chunks vs HTML/CSS for MyVault visual system

## TL;DR
[2-3 sentence recommendation. State which approach you'd pick and the strongest reason.]

## What I built
[Describe the HTML/CSS test artifact — which pages, which tool, total time, total LOC.]

## Side-by-side comparison

[Per-axis table or per-axis paragraphs. Cite specific evidence — file paths, screenshot diffs, LOC counts, build times.]

## Where Typst wins
[Specific scenarios with evidence.]

## Where HTML/CSS wins
[Specific scenarios with evidence.]

## Edge cases that broke each approach
[Pagination issues, font rendering, color, accessibility, etc.]

## Recommendation
[Pick one or hybrid. Justify with the strongest 2-3 evidence points. If hybrid, explain WHICH parts go where.]

## Open questions
[Things this test couldn't resolve — would need a longer trial, more documents, or different tooling.]
```

Also commit your test artifact to `_research/html-css-test/` so it's reviewable.

## Hard constraints

- **Match the visual fidelity of `documents/ebook-test/privacy-guide.pdf`.** If your HTML/CSS version is visually worse and you can't fix it within the test budget, that's a finding — not a reason to abandon the test.
- **Keep code minimal.** Don't pull in Tailwind/Bootstrap/Material — use vanilla CSS so the comparison isn't muddied by framework overhead. If you want to show what a framework would add, add it as a separate small comparison.
- **Use the same fonts** (PT Serif + Lato Regular). Self-host them if needed; don't substitute system fonts.
- **Same tokens** from `brand.tokens.json`. Generate CSS custom properties from the JSON via a small script.

## What success looks like

After your work, the user can read your findings in 5 minutes and have a confident answer to: "Should we keep building the visual system on Typst chunks, or switch to HTML/CSS components?" If the answer is "switch," your test artifact is a credible starting point.

If the answer is "keep Typst," you've still surfaced the strongest counter-arguments so the user can defend the choice when challenged later.

## What to avoid

- Don't recommend abandoning the chunk pattern (HARD/BASE/MENU). That's the briefing layer; it's renderer-agnostic. Your scope is renderer + component model only.
- Don't propose a third option (e.g., "use InDesign + scripting"). Stick to Typst vs HTML/CSS.
- Don't theorize about hypothetical performance. Measure on the actual privacy-guide pages.
