---
type: research-prompt
status: ready
owner: mark
created: 2026-04-30
purpose: "Independent research session — test whether MyVault's entire visual system should be built on a single HTML/CSS stack with conversion utilities per output format, instead of the current per-asset-type renderer pinning (Typst for PDF, Marp for slides, Vega-Lite for charts, React Email for email, etc.)."
---

# Research prompt — should the MyVault visual system be HTML-first across all asset types?

## What you're being asked to do

The user is questioning the foundational architecture of the MyVault visual system. The current plan pins one renderer per asset-type chunk:

- **Ebook + PDF documents** → Typst (`renderers/typst/myvault-editorial.typ` — already shipped)
- **Presentation** → Marp (proposed)
- **Chart** → Vega-Lite + JSON (proposed)
- **Email** → React Email (proposed)
- **Social image** → renderer TBD
- **Web component** → Tailwind v4 + React (proposed)

That's six different toolchains for one design system. The user's hypothesis: **if we build the design system once in HTML/CSS (with proper print stylesheets and conversion utilities), we could output every asset type — PDF ebooks, presentation decks, social images, charts, emails, web pages — from a single source language**, with massive LLM training-data leverage and one-stack maintenance.

Your job is to test that hypothesis with concrete evidence. Not theorize. Build small representative artifacts, render them through HTML→target conversion pipelines, compare to the existing Typst output and the planned other renderers, and reach a recommendation. Do not assume either approach is correct.

## Context to load (read in this order)

Working directory: `/Users/mark_b/Documents/Business/MyVault/10-Brand/visual-system/`

1. `documents/ebook-test/workflow.md` — editorial-first principle. Renderer-agnostic; both stacks must respect it.
2. `chunks/ebook.md` v1.3 — most mature chunk, with Typst pinned. Read the HARD/BASE/MENU structure carefully — the **chunk pattern is the briefing layer and is renderer-agnostic**. Your scope is the renderer + component model, not the rules layer.
3. `chunks/presentation.md` — sibling chunk. Note its scoped exception around Vault Teal at 18pt inside chart-card boundaries.
4. `chunks/_manifest.yaml` — see the renderer registry. Currently each chunk pins its own. Test whether one HTML stack could collapse this to a single source format.
5. `renderers/typst/myvault-editorial.typ` — the active editorial primitives module (~600 lines).
6. `documents/ebook-test/privacy-guide-spec.typ` — canonical ebook deliverable (19 pages).
7. `documents/ebook-test/privacy-guide.pdf` and `privacy-pages-v4/` — **visual fidelity bar to match.**
8. `tokens/brand.tokens.json` — design-token source-of-truth (W3C DTCG format).
9. `00-Meta/Conventions.md` and `10-Brand/CLAUDE.md` — vault and brand-system context.

Memory entries that constrain any approach:
- `feedback_no_mandatory_pages_editorial_first.md`
- `feedback_chunk_size_placement_pins.md`
- `feedback_grid_is_content_specific.md`
- `feedback_design_pages_are_guidelines.md`
- `feedback_myvault_fonts_lato_primary.md`
- `feedback_regular_weight_only.md`
- `feedback_no_uppercase_eyebrows.md`
- `feedback_white_is_default_surface.md`
- `feedback_hero_color_80_20_black_teal.md`
- `project_diagram_canonical_specs.md` — chart canon

## The architectural hypothesis to test

**Claim**: A single HTML/CSS-first stack with conversion utilities per output target would replace Typst + Marp + Vega-Lite + React Email + Satori + ad-hoc tooling, producing equivalent (or better) outputs across all six asset types with:
- One component library reused everywhere
- Tokens as CSS custom properties (one source-of-truth, no per-renderer bridges)
- Live browser preview for every deliverable
- Massive LLM training-data leverage (HTML/CSS training data dwarfs Typst/Marp/etc.)
- Zero context-switching between toolchains
- Native cross-channel reuse (a hero card on a website is the same component as in an email or a slide)

**Counter-claim**: Per-asset-type renderer pinning gives:
- Best-in-class output for each format (Typst for editorial print typography; Marp's slide model; Vega-Lite's data-binding for charts; React Email's email-client testing matrix)
- Each renderer is mature for its target — fewer rendering surprises than HTML→target conversion pipelines
- Pagination, slide transitions, chart data-binding, email client compatibility are all hard problems already solved by purpose-built tools

Your test must produce evidence for both, then a recommendation.

## The conversion landscape — survey before you build

Spend ~30 minutes mapping which HTML→target tools are actually credible in 2026. Don't theorize from old knowledge — many of these matured in 2024-2025.

For each target, identify the leading 1-2 HTML→target tools, their maturity, their known limitations, and what install effort they require. Suggested scan list:

| Target | HTML→target tools to investigate |
|---|---|
| **PDF (ebook, guide, whitepaper)** | Headless Chrome `--print-to-pdf`, weasyprint, pagedjs (+ pagedjs-cli), Prince XML, Vivliostyle, Playwright |
| **Presentation deck** | reveal.js (export to PDF/PPTX), Slidev (Vue-based, MD source, themes), Spectacle (React), WebSlides, impress.js |
| **Social image (square, vertical, story)** | @vercel/og (Satori — JSX→SVG/PNG server-side), Puppeteer screenshot, Playwright screenshot, Resvg (SVG→PNG), node-html-to-image |
| **Chart (data viz)** | Vega-Lite-in-HTML (still HTML-first), Observable Plot, Chart.js, ECharts, D3, Visx, Recharts |
| **Email** | MJML (HTML-like DSL → email-safe HTML), React Email (JSX → email-safe), Maizzle (Tailwind-based), Foundation for Emails. Note: email clients (Outlook especially) are the hard part — email-safe HTML is a constrained subset of regular HTML/CSS. |
| **Web component / page** | Just HTML+CSS. Astro for static, Next.js for dynamic. |
| **Animated content (out of scope but flag)** | CSS animations, Framer Motion (React), Lottie. |

Tabulate findings briefly in your write-up so the user can see what's mature vs experimental.

## Test deliverable — three asset types, end-to-end

Build the following in HTML/CSS (your choice of vanilla CSS, Tailwind, or another framework — justify the choice in findings) and convert each to its native output format:

### Test 1 — Ebook PDF (3 pages from the AI Privacy Guide)

Rebuild **Page 1 (cover)**, **Page 4 (body + hero-stats panel)**, and **Page 7 (model-grid 2x2 + data-grid table)** in HTML/CSS, then render to PDF.

- Page geometry: 800×1200 pt (CSS `@page { size: 800pt 1200pt }` or equivalent)
- Body 60pt top / 56pt bottom / 40pt sides margins
- PT Serif Regular + Lato Regular, self-hosted via `@font-face`
- Hex values from `tokens/brand.tokens.json` as CSS custom properties
- Compare visual fidelity to `documents/ebook-test/privacy-guide.pdf` pages 1, 4, 7

Pick your conversion tool (Chrome headless / weasyprint / pagedjs / Prince) — note which one and why.

### Test 2 — Presentation slide (1 hero slide)

Build **one** presentation slide in HTML/CSS using the same design tokens. Slide canvas: 1920×1080 (16:9) or 800×600 — your call. Content suggestion: a hero stat slide ("99% of Americans used AI last week" with the supporting headline + source). Use the same PT Serif + Lato + Vault Teal palette.

Then export it as a PDF slide (single-page) AND as a PNG image (1920×1080). If you use reveal.js or Slidev, also export as a multi-slide deck (one slide is fine for the test).

### Test 3 — Social image (1 stat card)

Build **one** social image at 1080×1080 (Instagram square). Content: a hero stat with MyVault branding (lockup, Vault Teal, big PT Serif number). Render to PNG via Satori, Puppeteer, or Playwright screenshot.

### What this triple test reveals

- **Test 1** measures whether HTML→PDF can match Typst's editorial typography on the highest-stakes deliverable (the ebook).
- **Test 2** measures whether HTML can serve as a slide source — the Marp question, but for HTML.
- **Test 3** measures whether HTML→image (Satori et al.) is good enough for social.

If all three work well, the unification hypothesis is credible. If any one fails badly, the pin-per-asset-type approach is justified for that asset type.

## Comparison criteria

Rate each axis with concrete evidence. Don't do this purely as theory.

| Axis | What to measure |
|---|---|
| **Visual fidelity to existing canon** | Side-by-side at 100% zoom. Each test artifact vs its existing/canonical reference. Note specific divergences (typography, color, spacing, alignment, asset placement). |
| **Component reuse across the three tests** | Did you write the hero-stats card once and reuse it in the ebook AND social image? If not, why not — what's the actual blocker? |
| **Token flow** | Generate CSS custom properties from `tokens/brand.tokens.json` via a small script. How much friction vs the existing Typst `tokens.typ` bridge? |
| **Pagination control (Test 1)** | Did `data-grid` stay together (Typst's `breakable: false`)? Did `section-opener` get a full-bleed page? Were widows/orphans avoidable? Did any text reflow break the design? |
| **Typography quality** | Print Test 1 at 100% and look at: kerning, hyphenation, word spacing, baseline alignment, weight rendering, anti-aliasing, color reproduction. Cite specific failures or wins. |
| **Slide control (Test 2)** | Could you set exact slide dimensions, control over per-slide backgrounds, transitions, presenter notes? |
| **Image rendering (Test 3)** | Did the PNG render at the exact 1080×1080? Did the lockup SVG render crisply? Did teal show as the correct hex? Are there text rendering issues (Satori has known limits)? |
| **Iteration speed** | Time to apply one change ("make all hero stats 96pt instead of 80pt"). HTML iteration via browser refresh should be near-instant; Typst is compile-render. |
| **Tooling install / setup** | How long did it take to install + configure each conversion tool? Document the exact commands. |
| **Cross-channel reuse** | Could the cover-page HTML also work as a web landing page? Could the social card HTML also be embedded in a website? |
| **Email viability (out-of-scope test, in-scope analysis)** | Could the same HTML/CSS components render to email-safe HTML via MJML or React Email? Or would email require its own component library because of inline-CSS / table-layout / Outlook constraints? |
| **Agent friendliness** | Try an extension task: "add a 4th item to the model-grid card." Time it on the HTML version vs reading the Typst version. Note which is faster for you. |
| **Edge cases / failure modes** | Specific things that broke each pipeline. Cite tool versions. |
| **Maintenance burden estimate** | How many distinct toolchains does each approach require for the six chunks? What's the upgrade story (e.g., when fonts change, when tokens change)? |

## Stretch — if time permits

Try **one** scenario the existing approach struggles with:

- A **chart embedded in an ebook page** (the cross-asset case) — does the HTML stack handle this naturally (chart is just a component in the page), while the multi-renderer approach requires gluing Typst + Vega-Lite output?
- A **shared component across asset types** — the same hero-stats card rendered in (a) the ebook PDF, (b) a slide, (c) a social image, (d) a web page. Is the HTML stack genuinely "write once, render everywhere"?

These stretch tests are where the unified approach should shine if it's going to win. Or fail visibly.

## Deliverable

Write findings to `_research/findings-html-first-stack.md` with this structure:

```markdown
# Findings — should MyVault's visual system be HTML-first across all asset types?

## TL;DR
[2-3 sentence recommendation. Pick: (a) keep per-renderer pinning, (b) switch to HTML-first, (c) hybrid (be specific about which assets go where).]

## What I built
- Test 1 (ebook 3 pages): tool used, total time, total LOC, output PDF path
- Test 2 (slide): tool, time, LOC, output paths (PDF + PNG)
- Test 3 (social): tool, time, LOC, output PNG

## Conversion landscape (2026 state-of-the-art)
[Brief table: per target, leading tools, maturity, known limits.]

## Side-by-side comparisons
[For each test, side-by-side description. Cite specific evidence.]

## Where HTML-first wins
[Concrete scenarios with evidence — component reuse, iteration speed, agent friendliness, etc.]

## Where per-renderer pinning wins
[Concrete scenarios — typography polish, pagination, format-specific fidelity, etc.]

## Edge cases that broke each approach
[Specific failure modes with tool versions cited.]

## Recommendation
[Pick one. Justify with the strongest 3-4 evidence points.]

If hybrid: name exactly which asset types use which stack and why.

## Migration cost (if recommending a change)
[Honest estimate: weeks of work, what gets thrown away, what carries forward.]

## Open questions
[Things this test couldn't resolve.]
```

Commit your test artifacts to `_research/html-first-test/{ebook,slide,social}/` so they're reviewable.

## Hard constraints

- **Match the visual fidelity of the existing privacy-guide PDF.** If the HTML/CSS version is visibly worse and you can't fix it within the test budget, that's a finding — not a reason to abandon the test.
- **Use the actual fonts** (PT Serif Regular + Lato Regular). Self-host them; don't substitute system serif/sans.
- **Use the actual tokens** from `brand.tokens.json`. Generate CSS custom properties from the JSON.
- **Don't reach for a different design system framework** (Material, Mantine, etc.) — write minimal CSS so the comparison isn't muddied. If you use Tailwind, justify why and configure it from the brand tokens.
- **Test agent friendliness directly**: pick one extension task, do it in both stacks, time it.

## What success looks like

After your work, the user can read findings in 5 minutes and have a confident answer to: **"Should we throw out the per-renderer pinning and rebuild the whole visual system on HTML/CSS, or is the current per-asset-type renderer architecture justified?"**

If the answer is "switch to HTML-first," your test artifacts are credible starting points for migration.

If the answer is "keep per-renderer," you've surfaced the strongest counter-arguments so the user can defend the choice.

If the answer is "hybrid," you've named exactly which asset types go where, with evidence.

## What to avoid

- **Don't recommend abandoning the chunk pattern** (HARD/BASE/MENU rules). That's the briefing layer; it's renderer-agnostic. Your scope is renderer + component model only.
- **Don't theorize about hypothetical performance.** Measure on the actual test artifacts.
- **Don't end with "it depends."** Pick a recommendation and justify it.
- **Don't chase polish on the wrong axis.** If Test 1's HTML/CSS PDF has slightly worse hyphenation, that matters for an editorial guide. If Test 3's social image has slightly worse hyphenation, it doesn't (social is glance-read). Weight findings by what each asset type actually needs.

---

A narrower companion prompt focused only on the ebook PDF question is at `_research/research-prompt-typst-vs-html-css.md`. The current prompt is the broader version — use it.
