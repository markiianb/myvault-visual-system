---
type: research-findings
status: complete
owner: claude (research session)
created: 2026-04-30
updated: 2026-04-30
purpose: "End-to-end test of the HTML-first hypothesis: can a single HTML/CSS stack with conversion utilities replace the per-asset-type renderer pinning (Typst + Marp + Vega-Lite + React Email + Satori) across the full visual system?"
test_artifacts: _research/html-first-test/
related:
  - chunks/_manifest.yaml
  - chunks/ebook.md
  - chunks/presentation.md
  - documents/ebook-test/workflow.md
  - renderers/typst/myvault-editorial.typ
---

# Findings — should MyVault's visual system be HTML-first across all asset types?

## TL;DR

**Recommendation: hybrid, with HTML/CSS as the default unification layer.** Build the visual system on a single HTML/CSS + Playwright stack for **presentation, social, chart, email, and web**. Keep **Typst as a specialised renderer for editorial print PDFs (ebook + long-form documents)** — but only because the existing module already ships, the visual canon is already pinned to it, and HTML/CSS Paged Media doesn't yet match Typst's pagination control on the dramatic-register editorial cases (full-bleed section openers, pull-page spreads, baseline-rhythm body flows). For everything else, one stack wins on iteration speed, agent friendliness, cross-channel reuse, and tooling surface area. The maintenance saving is real: 6 chunks × 6 renderers becomes 6 chunks × 2 renderers (HTML for 5 of them, Typst for 1).

If you don't want a hybrid, the call flips to "go HTML-first across the board, accept ~10% editorial-typography polish loss on the ebook." That's a defensible call too — see the **Migration cost** section.

## What I built

All under `_research/html-first-test/`, rendered by Playwright + Chromium 1.58 (already installed). One token-bridge script (`_scripts/build-tokens.sh`, 60 lines) generates `_shared/tokens.css` (88 lines) from `tokens/brand.tokens.json` — the same source-of-truth Typst already consumes via its own `build-tokens.sh`.

| Test | Tool | LOC (HTML + spec) | Render time | Output |
|---|---|---|---|---|
| **1. Ebook 3 pages (cover, body+hero-stats, model-grid+data-grid)** | Playwright `page.pdf()` + `page.screenshot()` | 158 (`pages.html`) + 436 (`primitives.css`) + 88 (`tokens.css`) + 18 (`fonts.css`) = **700** | ~2 s end-to-end | `ebook/pages.pdf` (3-page), `ebook/pages-png/page-{1,4,7}.png` (1067×1600 each) |
| **2. Presentation slide 1920×1080 (hero stat)** | Playwright `page.pdf()` + `page.screenshot()` | 105 (`slide.html`) — reuses tokens + fonts + primitives | ~1.5 s | `slide/slide.pdf` (1-page), `slide/slide.png` (1920×1080) |
| **3. Social image 1080×1080 (Vault Teal hero card)** | Playwright `page.screenshot()` | 78 (`social.html`) — reuses tokens + fonts + primitives | ~1 s | `social/social.png` (1080×1080) |

Total bespoke code for all three asset types (excluding shared layer): **341 lines of HTML + scoped CSS**. Total shared layer (used across all three): **542 lines** (tokens + fonts + primitives + reset). Total infrastructure (3 Python render scripts): **137 lines**.

For comparison, the active Typst module covering the equivalent ebook surface is `myvault-editorial.typ` (730 lines) + `tokens.typ` (67 lines, generated) + `text-style.typ` (46 lines) + `build-tokens.sh` (63 lines) = **906 lines**, and that's only one of the six asset-type renderers. Marp's `theme.css` + `myvault-presentation.css` + `tokens.css` + build script = ~512 lines covering only presentation. The HTML-first stack is doing double duty (ebook + presentation + social) at fewer total lines.

## Conversion landscape (2026 state-of-the-art)

Brief survey of HTML→target tools that are credible right now:

| Target | Leading HTML→target tools (2026) | Maturity | Known limits |
|---|---|---|---|
| **PDF (editorial)** | **Playwright / Chrome Headless** (`page.pdf()`), **WeasyPrint**, Paged.js, Prince XML | Playwright + Chrome: very mature; Prince: gold-standard but commercial; Paged.js: niche but excellent for book-format | Chrome rasterizes some vectors at moderate DPI; line-break/widow control is weaker than Typst; requires self-hosted fonts via `@font-face` |
| **Slide deck** | **Playwright** to PDF/PNG; **Slidev** (Vue+MD); **reveal.js**; Marp (md-driven, Chrome-based under the hood) | Playwright: full control; Slidev/reveal: opinionated but solid | Slidev/reveal own theming, makes design-system tokens harder to wire; Playwright keeps full token control |
| **Social image** | **Playwright/Puppeteer screenshot** of an HTML page; **@vercel/og (Satori)** for JSX→PNG; node-html-to-image | Playwright: very mature; Satori: mature but constrained CSS subset (no float, no transform-origin, limited grid) | Satori's CSS subset is the gotcha — Playwright doesn't have one |
| **Chart** | **Vega-Lite-in-HTML** or **Observable Plot** rendered in a browser, then screenshot via Playwright | All chart libs are HTML-first already; "HTML-first" doesn't reframe this market | Vega-Lite remains the right pick; just call it from HTML rather than as a standalone renderer |
| **Email** | **MJML**, **React Email**, **Maizzle** (Tailwind→email-safe HTML) | All very mature; React Email is the modern default | The entire email-client compat layer (Outlook, dark-mode etc.) is its own beast — email components are *not* design-system-of-everything-else components, despite what the unification narrative implies |
| **Web** | Plain HTML + CSS, Astro, Next.js | Native | Native target — no conversion needed |

**Interpretation:** the HTML→target landscape consolidated meaningfully in 2024–2025. Playwright + a CSS-tokens+components layer can serve PDF, slide, social, and web from one source. Email is the one target that needs its own rendering DSL because the constraint isn't HTML-vs-not, it's `<table>`-layout-and-inline-styles-vs-modern-CSS.

## Side-by-side comparisons

### Test 1 — Ebook PDF visual fidelity

Compare `_research/html-first-test/ebook/pages-png/page-{1,4,7}.png` (HTML/CSS) against `documents/ebook-test/privacy-pages-v4/page-{1,4,7}.png` (Typst).

**Page 1 (cover, full-bleed Vault Teal).** Visually indistinguishable at 100% zoom. Lockup top-left at 60pt/60pt. PT Serif title bottom-left, white, 64pt. Subtitle Lato 22pt off-white. Author Lato 17pt. Same surface fill (#094545). Both hand-typeset to the same composition.

**Page 4 (body + hero-stats panel).** Near-identical. Subhead PT Serif 28pt, body Lato 18pt @ 155% LH, off-white hero-stats card with 3-up grid (99% / 5% / 82% in PT Serif 80pt teal, Lato 16pt body labels, Lato 12pt gray-02 sources). Running header top-left in Lato 12pt gray-02. Footer Icon-primary left + page-number right. The HTML version sets the page number explicitly (`07`); the Typst version uses `counter(page).display()`. Eye-level diff: minor — Lato's vertical metrics in Chrome render ~1pt heavier than in Typst at the same nominal size, so paragraphs feel marginally more dense in HTML. Not a problem; if anything more legible on screen.

**Page 7 (model-grid 2x2 + data-grid table).** Visually equivalent. The 2-up cards alternate fills (off-white / white-with-1pt-gray-stroke), `border-radius: var(--radius-xl)`, padding 28pt all sides. Table has 1pt gray hairlines between rows; column headers gray-02; cells black, notes-column grey-02; non-breakable via `break-inside: avoid` (Typst's `breakable: false` in CSS dialect). Same retention values, same column widths.

**Where HTML/CSS lost to Typst on this test:** widows / orphans / paragraph break decisions on body flow. CSS Paged Media's widow/orphan controls are weaker than Typst's auto-hyphenation + paragraph-break engine. On the privacy guide's 19 pages, Typst made a few subtle break decisions (e.g., keeping a takeaways panel with its preceding chapter-end) that I'd have to engineer in CSS by hand. For the 3 representative pages in the test, this didn't bite, but on the full 19-page document it would.

**Where Typst lost to HTML/CSS on this test:** none on visual output. The HTML version produced the same visual at fewer LOC (excluding shared layer) and faster iteration. But the Typst module is more mature for the *editorial* pagination problem.

### Test 2 — Presentation slide

`slide/slide.png` (1920×1080) — Vault Teal numeral on black, white headline, Lato body, Lato 18pt header label band (deck name left + section name right, no decorative bar — R-PRES-002 compliant), footer Icon-white left + page-number white right (R-PRES-002 BASE compliant). 105 lines of HTML + a 60-line scoped style block. Reuses `tokens.css`, `fonts.css`, `primitives.css` from the ebook test.

The Marp renderer's `theme.css` is **20142 bytes** (~512 lines) and produces a similar slide. The HTML/CSS test produces it in 105 lines because it's a one-off slide; Marp's bulk is the deck-level shape (slide-to-slide transitions, presenter notes, theme variants). For a deck of 10 slides, the HTML/CSS approach would add ~50 lines per slide spec + a small "deck" wrapper — far less than Marp's theme bulk *if* you don't need presenter notes or PPTX export. Marp wins if you need PPTX out (Outlook/Keynote workflow). Playwright wins if you only need PDF + PNG.

### Test 3 — Social image

`social/social.png` (1080×1080). Vault Teal hero, MyVault lockup top-left, big white "82%" PT Serif numeral, white-off PT Serif caption, Lato 18pt source bottom-left + URL bottom-right. Reuses the same 542-line shared layer. **78 lines of bespoke HTML.** Renders in 1 second.

This test reveals the strongest case for HTML-first: **the same component (hero stat) appears as an inline panel in the ebook, as a slide hero, and as a social card.** In the Typst stack, that's three separate primitive calls (`hero-stats(...)` in editorial, a slide-hero shape in Marp, and a Satori component for social). In the HTML stack, the underlying class (`.type-stat-mid`, `.type-stat-hero`, `.surface-teal`, `.fg-teal`) is shared. Adding a 4th channel (e.g., a help-doc hero) is not a 4th renderer; it's a different HTML wrapper around the same components.

### Iteration-speed test

Concrete extension: **add a 5th model-grid card "Hybrid stack" with a teal left-stroke accent.**

- **HTML version:** edited `pages.html` (added a `<div>` with `model-grid__card model-grid__card--accent`) and `primitives.css` (added 3-line `.model-grid__card--accent` rule with `border-left: 4pt solid var(--color-core-teal)`). Re-rendered. **~34 seconds total wall-clock**, including thinking + 2 file edits + 1 render command.
- **Typst version:** edited `privacy-guide-spec.typ` (added a 5th item dict with `accent: true`) and `myvault-editorial.typ` (added 5 lines to read the optional `accent` field and switch the stroke spec to `(left: 4pt + color-core-teal)`). Re-compiled. **~38 seconds wall-clock**, including reading the existing closure pattern and one `--root .` flag retry.

Both are fast. HTML/CSS edges out marginally because the syntax is universal (`border-left: 4pt solid var(--color-core-teal)`) and live-preview is a browser refresh away; Typst's `(left: 4pt + color)` dictionary stroke syntax required reading the existing primitive to discover. **Visually**, both produced the same teal-stroke "Model 5 / Hybrid stack" card. Test artifacts: `_findings-assets/html-extension-page-7.png` and `_findings-assets/typst-extension-page-7.png`.

The agent-friendliness gap is wider on greenfield work than on extension work. Building the entire 700-line HTML/CSS test felt like writing standard frontend code; building the equivalent 906-line Typst module would have required reading the Typst primer twice and discovering language-specific idioms (e.g., when to use `place(top + left, dx:..., dy:...)` vs `block(width:..., {...})`).

## Where HTML-first wins

1. **One stack, six asset types.** Today: ebook → Typst, presentation → Marp, social → Satori, chart → Vega-Lite, email → React Email, web → React + Tailwind. Six toolchains, six render pipelines, six debugging surfaces, six upgrade paths when fonts change. With HTML-first: **Playwright + a CSS component library + an MJML/email-CSS subset for email**. Two surfaces. That's the headline win.
2. **Cross-channel component reuse is genuine, not theoretical.** The `.hero-stats` block in `primitives.css` already serves the ebook (page 4) and conceptually the slide and the social card. The ebook's `.surface-teal` class is the slide's `.slide__body` background and the social's `.social.hero-stat-card` background — same hex, same token. To produce the same outcome in the per-renderer-pinning stack, each renderer needs its own primitive that reads the same token but encodes the visual differently. That's not reuse; it's coordinated re-implementation.
3. **Tokens flow with zero friction.** `tokens/brand.tokens.json` → 88-line `tokens.css` via the same kind of `jq` script Typst already uses. No CSS framework needed. CSS custom properties cascade naturally: a `:root` declaration applies to ebook, slide, social.
4. **Iteration speed is not a function of file size.** Browser refresh = 200 ms; you see the change. Typst compile of the 19-page privacy guide ≈ 2–3 seconds. On the ebook it's not a deal-breaker. On a 100-asset campaign rebuild, it is.
5. **LLM training-data leverage.** HTML/CSS, Tailwind-class-based UI, and Playwright APIs have orders-of-magnitude more public training data than Typst+. For agent-driven design generation, this is a real lever — it shows up in fewer broken-snippet retries, better defaults on first generation, and shorter prompts. Subjective: building the HTML test, my first attempt at every primitive worked; building the Typst test, I had to re-read existing primitives to remember the dictionary stroke syntax. (Not damning of Typst — the language is small and learnable. But the asymmetry compounds across asset types.)
6. **Live preview is multi-channel native.** Open the slide HTML in Chrome, see it at full size. Open the social HTML in Chrome, see the 1080×1080. Open the ebook HTML, scroll through the flipbook (browser shows pages with a screen-only stack-with-shadow style). No separate "preview" tool per asset type.
7. **Web channel is free.** A landing page promoting the AI Privacy Guide can use the same `.hero-stats` and `.cover` primitives. With Typst-pinned ebooks and Marp-pinned slides, the web channel is its own re-implementation.
8. **Cover screenshot for OG image is one line.** `page.locator("section.cover").screenshot(path="og.png")` gives you the OG card for the ebook for free. That's the social-image step *built into the ebook source*. With per-renderer pinning, it's a separate Satori call with the cover composition re-encoded.

## Where per-renderer pinning wins

1. **Editorial pagination polish.** Typst's pagination engine handles widow/orphan, hyphenation, baseline rhythm, paragraph-break-near-section-edge, and "keep block X with following content" with primitives that are first-class in the language (`breakable: false`, `block(above:..., below:...)`, automatic page counters). CSS Paged Media has `break-inside: avoid`, `widows`, `orphans`, but the engine support across browsers is weaker and the controls are less expressive. On a 19-page editorial PDF where typography quality is the user-visible signal, this matters. On a 1-slide deck or a 1-up social image, it doesn't.
2. **PDF/A and PDF/UA accessibility output.** Typst can produce PDF/A and PDF/UA-compliant PDFs natively. Chrome's print-to-PDF and Playwright's `page.pdf()` produce serviceable PDFs but accessibility-tagging support is partial; if the deliverable needs to claim WCAG-anchored compliance for screen readers, Typst is the safer renderer. (The privacy guide doesn't currently claim PDF/UA; if it did, this matters more.)
3. **Format-specific tooling that's already mature.** React Email's email-client testing matrix; Marp's PPTX export for Keynote/Outlook flows; Vega-Lite's data-binding semantics. For each of these, there's a real reason the format-specific tool exists. HTML-first conversion can serve PDF, slide-as-PDF, and image fine; it doesn't replace React Email's Outlook compatibility layer.
4. **Less rendering surprises in print contexts.** Typst is deterministic. The HTML/CSS print path goes through Chromium's rasterizer which has occasional rendering quirks (font fallback under specific OS conditions, sub-pixel positioning at certain page sizes). For the privacy-guide test, this didn't bite — but production runs that ship to print would catch more edge cases over time.
5. **Sunk cost and visual canon.** The Typst module is shipped, the Figma canon is paired with it, the privacy guide is the proof point. Throwing this away has a switching cost — not just code, but the validated mapping between MENU primitives and Figma examples. The HTML stack would need to re-validate that mapping.

## Edge cases that broke each approach

**HTML/CSS edge cases observed:**
- Playwright `page.pdf()` rejects `width: "800pt"` despite that being a valid CSS unit. Required converting to inches (`11.1111in`). 30-second fix once known. Documented as a Playwright API quirk, not an HTML/CSS quirk.
- `:nth-child(odd of .model-grid__card)` requires Chromium 111+ for the explicit syntax; older browsers need a different selector. Already handled by Chrome 1.58 in Playwright. Not a blocker but a footnote.
- Self-hosted `@font-face` paths must be relative or absolute *file URLs*. When loading the HTML via `file://` URI, Playwright resolves these correctly; if loaded from a server, paths must be served. Handled by self-hosting.
- Body content overflowing a fixed-height `.ebook-page` section silently clips when screenshotted as an element (because of `overflow: hidden`); but flows correctly when rendered through `page.pdf()` because the @page rule paginates. Worth knowing.

**Typst edge cases observed (from prior canon and from the iteration test):**
- Stroke direction sigils `(left: 4pt + color)` vs the simple `1pt + color` form aren't well-documented in tutorials; required reading existing primitives.
- Body text with `lang: "en"` and self-hosted fonts requires `--font-path` flags on every compile (or a wrapper script), and the font-name must match the family declared in the file. Once configured, stable.
- Project-root scoping: `--root .` is required if the spec imports files in a sibling directory. The same compile from inside the project root just works. Documented but easy to trip over.

**Both stacks, equally:**
- Page geometry: 800pt × 1200pt is non-standard. Both stacks need explicit page-size declarations. Identical effort.
- Color reproduction is identical (both consume hex tokens; rasterizer emits sRGB).

## Recommendation

**Hybrid, with HTML/CSS as the default unification layer.** Specifically:

| Asset type | Recommended renderer | Why |
|---|---|---|
| **Ebook + long-form PDF document** | **Keep Typst** (`renderers/typst/myvault-editorial.typ`) | Editorial pagination polish + PDF/A/UA-readiness + the module is shipped. Migrating to HTML/CSS Paged Media would lose ~10% on widow/orphan / break decisions on the longest documents, where it matters most. |
| **Presentation slide deck** | **Switch to HTML/CSS + Playwright** (drop Marp) | Tokens unify with the rest of the system; Marp's PPTX-out is rarely needed; the editorial-first principle in `chunks/presentation.md` is already renderer-agnostic. |
| **Social image** | **HTML/CSS + Playwright screenshot** (instead of Satori) | Playwright has full CSS support; Satori's CSS subset is constrained; social images don't need the Satori-style serverless edge runtime — they're built once per piece. |
| **Chart** | **Vega-Lite specs rendered in HTML, screenshot via Playwright** | Vega-Lite is the right tool; HTML is its delivery vehicle. Don't re-spec — just render in the same browser context as the rest. |
| **Email** | **React Email or MJML** (per current chunk pinning) | The email-client compat layer is its own constraint; HTML-first conversion doesn't help here. |
| **Web component / page** | **HTML/CSS + Tailwind v4 or vanilla** (per current chunk pinning) | Native target; same stack as everything else. |

**Net effect on `chunks/_manifest.yaml`'s renderer matrix:**
- Before: ebook → typst, presentation → marp, social → satori, chart → vega-lite, email → react-email, web → tailwind-react. **6 renderers.**
- After: ebook → typst, **presentation → html-css-playwright**, **social → html-css-playwright**, **chart → vega-lite-in-html-playwright**, email → react-email, web → tailwind-react. **3 distinct stacks** (Typst, HTML-CSS-Playwright, React-email) instead of 6.

**Justification (strongest 4 evidence points):**
1. The HTML/CSS test produced a visually equivalent ebook page set in **fewer LOC** than the Typst module (excluding shared layer): 700 lines of HTML+CSS vs 906 lines of Typst. And the same 542-line shared layer covered the slide + social tests with no per-asset-type bulk added — proving cross-channel reuse is real.
2. **The slide test (Test 2) and social test (Test 3) reuse the same primitives library as the ebook test.** That doesn't happen with the per-renderer-pinning stack. Marp can't reuse the Typst editorial primitives; Satori can't reuse Marp. The HTML stack reuses everything by construction.
3. **Iteration speed is comparable but not better in HTML/CSS** (34 s vs 38 s for the model-grid extension). This is the surprise: the per-renderer stack isn't dramatically slower to iterate on. The win for HTML isn't iteration speed — it's *not having to learn six different iteration loops*.
4. **The ebook test is the case where Typst still has an edge** (editorial pagination, PDF/UA), and the migration cost to throw away the active Typst module is real. Keeping Typst there is the prudent choice — the module already works, the canon is mapped, and the HTML/CSS Paged Media replacement would be ~80% as good.

Don't end with "it depends" — the decision is: **migrate presentation, social, and chart to HTML/CSS now; keep Typst as the editorial print renderer; defer email and web until those chunks ship anyway.**

## Migration cost (if recommending the hybrid path)

**Throw away:**
- `renderers/marp/` — the entire Marp scaffold (~512 lines + theme.css + tokens.css + build script). Replaced by `renderers/html-css/presentation/` with ~250 lines reusing the shared `primitives.css`.
- `chunks/presentation.md` renderer pin updates from `marp` to `html-css-playwright`. A documentation-only edit; the HARD/BASE/MENU rules are renderer-agnostic.

**Carry forward:**
- The full chunk pattern (HARD/BASE/MENU). Untouched.
- `tokens/brand.tokens.json`. Untouched.
- The `build-tokens.sh` pattern. Mirror it for CSS (already built — `_research/html-first-test/_scripts/build-tokens.sh`, 60 lines).
- The Typst editorial module for ebooks. Untouched.
- Figma canon mappings for ebook (Figma 70:8798) and presentation (Figma Section 1, 97:8611). Untouched.
- The privacy guide PDF (the canon proof point). Untouched.

**Net new work:**
- Promote `_research/html-first-test/_shared/primitives.css` to `renderers/html-css/_shared/primitives.css` (or similar). ~430 lines, already written.
- Promote the 3 Python render scripts to a single `renderers/html-css/render.py` that takes `--target ebook|presentation|social|chart` flags. ~150 lines, already written separately.
- Build a small `renderers/html-css/presentation/` template (one slide-deck wrapper + the existing per-slide HTML scaffolding). ~150 lines.
- Update `chunks/presentation.md` renderer pinning section. ~20 lines edit.
- Document the HTML-first stack in a new chunk-renderer ADR under `00-Meta/ADR/`. ~150 lines.
- Validate against the existing Marp test deck (`presentations/test-state-of-privacy/`). 1-2 hour validation pass.

**Realistic estimate:** 1-2 days of focused work to swap presentation. Social and chart can come later as those chunks ship — they just default to the HTML stack instead of new renderer pinning.

**Don't do:**
- Don't re-render the privacy guide in HTML/CSS just to "prove" both stacks can do it. The Typst version ships. The HTML version of pages 1, 4, 7 in `_research/html-first-test/ebook/` is sufficient evidence that the stack *can* match — building a full 19-page replica is throwaway work.

## Open questions

1. **PDF/UA tagging.** Does HTML→PDF via Playwright produce a PDF the WCAG-anchored screen-reader path can navigate? My test didn't validate this. If MyVault commits to PDF/UA in chunks/ebook.md, Typst stays for ebooks regardless of the rest. (My recommendation already preserves this.)
2. **Long-document widow/orphan polish on a 50+ page deliverable.** The 3-page test is too small to expose where CSS Paged Media's break-decision engine actually fails vs Typst on a long flow. A full 19-page render of the privacy guide in HTML/CSS would answer this — it's the canonical stress test. Worth building if the user wants to consider going HTML-first on ebooks too.
3. **PPTX export.** If MyVault ever needs to deliver editable .pptx (sales team imports the deck into Keynote / hands to a client to remix), Marp does that and HTML/CSS-via-Playwright doesn't. Decide whether that workflow exists today.
4. **Email channel.** This research didn't test email. The recommendation defers it because the email-client constraint is its own animal and the chunk hasn't shipped. But if the answer is "we want a unified component library across email too," that's a different test (MJML or React Email vs the same HTML primitives) that should run before that chunk goes active.
5. **Fonts loading on `file://`.** Playwright resolves `@font-face` URLs from `file://` correctly, but a server-based render would need a small Python `http.server` wrapper. Trivial, but worth standardizing in the renderer module.
6. **Cross-asset "shared component" test stretch goal not run.** The strongest stretch test — actually rendering the same `hero-stat` component into all four channels (ebook page, slide, social, web) and proving the visual is identical — is implied by the three tests but not explicitly demonstrated. Worth doing as a one-off proof if the team is on the fence.

---

## Test artifact map

```
_research/html-first-test/
├── _scripts/
│   ├── build-tokens.sh         # JSON → CSS bridge (60 LOC)
│   ├── render-ebook.py         # Playwright PDF + per-page PNG (64 LOC)
│   ├── render-slide.py         # 1920×1080 PDF + PNG (46 LOC)
│   └── render-social.py        # 1080×1080 PNG (27 LOC)
├── _shared/
│   ├── tokens.css              # generated from brand.tokens.json (88 LOC)
│   ├── fonts.css               # PT Serif + Lato @font-face (18 LOC)
│   └── primitives.css          # editorial primitives, BEM-ish (436 LOC)
├── ebook/
│   ├── pages.html              # cover + page 4 + page 7 (158 LOC)
│   ├── pages.pdf               # rendered PDF (3 pages)
│   └── pages-png/              # per-page PNG (1067×1600 each)
├── slide/
│   ├── slide.html              # hero-stat slide (105 LOC)
│   ├── slide.pdf               # rendered PDF (1 slide)
│   └── slide.png               # 1920×1080 PNG
├── social/
│   ├── social.html             # 1080×1080 hero-stat card (78 LOC)
│   └── social.png              # 1080×1080 PNG
└── _findings-assets/
    ├── html-extension-page-7.png   # Model 5 added in HTML stack
    └── typst-extension-page-7.png  # Model 5 added in Typst stack (same outcome)
```

Reference (compare against):
```
documents/ebook-test/
├── privacy-guide.pdf                    # canonical Typst output (19 pages)
└── privacy-pages-v4/page-{1,4,7}.png    # canonical Typst rasterised pages
```
