---
type: research-findings
status: superseded
superseded_by: findings-html-first-stack.md
owner: claude (in-session quick test, parallel to the broader research-prompt-html-first-stack.md)
created: 2026-04-30
purpose: "Quick head-to-head test of HTML/CSS-via-headless-Chrome vs Typst for the ebook PDF case, using 3 representative pages from the AI Privacy Guide. Findings will inform the architecture decision; the broader parallel-session research will validate across all six asset types."
---

> **Superseded.** This is a 3-page quicktest. The broader 6-asset-type stack test in
> [`findings-html-first-stack.md`](./findings-html-first-stack.md) reaches a different
> conclusion for the ebook case (keep Typst). Read that document for the canonical
> recommendation; this one is preserved for the data points it contributes (visual
> fidelity, code volume, render speed).

# Quick findings — HTML/CSS via headless Chrome vs Typst (ebook PDF case)

## TL;DR

**HTML/CSS via headless Chrome matches Typst at ~95% visual fidelity for editorial PDFs**, with significantly better tooling (browser preview, dev tools, agent-friendliness from massive training data) and equivalent code volume. The 5% Typst still wins on is fine-grained typographic control (hyphenation, baseline grid, more pagination primitives). For most MyVault ebook deliverables — lead magnets, guides, reports — that 5% doesn't justify the per-renderer complexity. **Recommendation: switch the ebook chunk to HTML/CSS as the primary path; retain Typst as an optional renderer for premium-print work where typography polish justifies the renderer cost. The whole-stack test for slides + social + chart + email should run before fully committing.**

## What I built

- **Test artifact**: 3-page HTML/CSS rebuild of AI Privacy Guide pages 1, 4, 7 at `_research/html-css-test/ebook/`
- **Tool**: macOS Google Chrome 147 (`--headless=new --print-to-pdf`), no install (already on every Mac)
- **Time invested**: ~25 minutes setup-to-render-to-comparison
- **Output**: `test.pdf` (134 KB, 3 pages) and `pages/page-{1,2,3}.png`

## Code volume comparison

| Layer | Typst | HTML/CSS |
|---|---|---|
| Shared module / stylesheet | 730 LOC (`myvault-editorial.typ`) | 373 LOC (`styles.css`) |
| Spec / markup for 3 pages | ~50 LOC (subset of `privacy-guide-spec.typ`) | 137 LOC (`test.html`) |
| Total | ~780 LOC | ~510 LOC |

**HTML wins by ~35% at this scale.** At full 19-page document scale, the gap closes (Typst's primitive amortization helps): Typst becomes ~600+ (19×22) ≈ 1018 LOC; HTML becomes ~280+ (19×47) ≈ 1173 LOC. So HTML is cheaper for short documents; Typst is comparable at long-form scale.

Caveat: my HTML is hand-written. With JSX components or web-components, the per-page LOC drops because cards/stats/grids become reusable component instances — same amortization as Typst primitives, but on a more universal substrate.

## Visual fidelity (the headline finding)

Side-by-side at 100% zoom:

**Page 1 (cover, full-bleed teal)** — fidelity is essentially 1:1. The MyVault lockup renders crisply (SVG embedded). Title in PT Serif 64pt wraps to 2 balanced lines just like the Typst version. Subtitle and byline in Lato match. Color hex is identical (#094545). I cannot tell them apart from the rendered PDF.

**Page 4 (body content + hero-stats panel)** — fidelity ~95%. The hero-stats card with off-white background and 3-up grid of teal numbers renders identically. Lato body type at 18pt matches Typst version. Footer (icon + page number) matches. The one minor divergence: Lato kerning is rendered very slightly differently by Chrome's text engine vs Typst's — not visible in normal reading, only on side-by-side at high zoom.

**Page 7 (model-grid 2x2 + data-grid retention table)** — fidelity ~95%. The 2-card grid with alternating off-white / white fills + the retention table with row-rules render almost identically. The data-grid `break-inside: avoid` + `page-break-inside: avoid` worked — no orphan rows on Chrome. Card titles wrap correctly. Header hairline + row hairlines render as 1px gray.

**Where the 5% Typst wins shows up**:
- Hyphenation: Typst can hyphenate long words at line breaks; my HTML does not (would require `hyphens: auto` plus a hyphenation dictionary; Chrome supports this but it's another knob).
- Baseline grid: Typst snaps text baselines to a grid by default; CSS doesn't unless you set up a custom rhythm.
- Edge-of-page typography: Typst handles widows/orphans automatically; CSS Paged Media in Chrome has weaker support — for some content, you'd need explicit `widows: 2; orphans: 2` declarations.

These are real for premium print (a printed book sold at retail) but invisible on screen-read PDFs.

## Iteration speed

| Task | Typst | HTML/CSS |
|---|---|---|
| First render | ~1.5s compile to PDF + manual file open | Open browser, see live; print-to-PDF on demand |
| Apply a token change (e.g. teal hex) | Edit `tokens.typ`, re-run `build-tokens.sh`, recompile | Edit one CSS variable, browser auto-reloads |
| Apply a layout change (e.g. card padding) | Edit primitive, recompile, look at PDF | Edit CSS, browser reloads, can use dev tools to tune live |
| Inspect a specific bug | Open PDF in Preview, tweak, recompile | Open dev tools, inspect element, change CSS in-browser, then commit |

**HTML wins clearly here.** Browser dev tools alone change the iteration loop fundamentally — Typst doesn't have a comparable "live tune in browser" affordance.

## Pagination and chrome control

Both stacks handled the test cases:

| Feature | Typst | HTML/CSS (Chrome headless) |
|---|---|---|
| Per-page footer (icon + page#) | Native `footer:` slot on `page()` | Hand-rolled `.page-footer` absolute-positioned |
| Per-page running header | Native `header:` slot | Hand-rolled `.running-header` absolute-positioned |
| Surface variation per page | `fill:` parameter on `page()` | `.surface-teal` etc. CSS class |
| `breakable: false` block | First-class | `break-inside: avoid; page-break-inside: avoid` |
| Full-bleed page | `margin: 0pt` | `padding: 0` on `.page` |
| Counter for page numbers | `counter(page).display()` | Hand-rolled (would need pagedjs or JavaScript) |

**Typst wins on**: native automatic page numbering. In my HTML test I hardcoded page numbers ("4", "7"). For a real 19-page document, you'd either render through pagedjs (which adds CSS counters for paged media) or generate the markup with the page number baked in.

**HTML wins on**: surface fill, full-bleed treatment, content positioning — these are the same CSS you'd write for any web page.

If we adopt pagedjs (`pagedjs-cli` for build) instead of raw Chrome headless, we get proper page counters, named-page selectors, and better Paged Media spec support. That's the natural production setup.

## Token flow

| Tokens | Typst | HTML/CSS |
|---|---|---|
| Source-of-truth | `brand.tokens.json` (W3C DTCG) | Same |
| Bridge | `build-tokens.sh` → `tokens.typ` (jq-based) | Would be a tiny `build-tokens-css.sh` that emits CSS custom properties |
| Effort to add a token | One line in `build-tokens.sh` | One line in the equivalent CSS-emitter |
| Naming | `color-core-teal` | `--c-teal` |

Equivalent. Both stacks consume from the same JSON.

## Agent friendliness

I wrote the HTML/CSS test pages from scratch in this session and they came out clean on the first try. The Typst module took multiple iteration cycles in earlier sessions (`set page` scope-trapping, multi-line if/else only matching first branch, `$` math-mode parsing, `radius-l` vs `radius-2xl` etc.).

This isn't because HTML is intrinsically better — it's that **LLM training data on HTML/CSS dwarfs anything else**. Agent extension tasks are dramatically easier in HTML. For an organization where AI agents will write more code than humans, this is the strongest single argument for HTML-first.

## Cross-channel reuse

HTML/CSS components written for the ebook would render directly:
- **Web page**: paste the HTML into a marketing site, drop the print stylesheet, done.
- **Email** (with constraints): the hero-stats card pattern is straightforward to adapt to email-safe HTML via MJML or React Email — table-based layout, inline styles. Not free, but a known transform.
- **Social image**: render the same HTML to a 1080×1080 viewport via Satori or Puppeteer screenshot. The hero-stats card becomes a quote card with one CSS swap.
- **Slide**: pop the HTML into reveal.js or Slidev, get a 1920×1080 slide.

Typst can't do any of this cross-channel reuse natively. PDFs and images via SVG export, but no web/email/slide reuse.

This is the architecture-level argument that matters most. **If the goal is one design system serving six asset types, HTML/CSS is the universal substrate.** Typst is best-in-class for one of the six (PDFs).

## Tooling install

| Tool | Install effort |
|---|---|
| Typst | `brew install typst` (~40 MB) |
| Chrome headless | Already installed on every Mac/Win/Linux |
| pagedjs-cli (recommended for production) | `npm i -g pagedjs-cli` (~50 MB with deps) |
| weasyprint (alternative) | `pip install weasyprint` + system libs (gtk, pango) — heavier |

For most teams, HTML/CSS tooling is already there. Typst is a new install + new mental model.

## Failure modes I encountered

- Headless Chrome's `--print-to-pdf` doesn't natively support `@page :first` rules consistently; for production, pagedjs is the better tool.
- Default Lato kerning in Chrome is slightly different from Typst's. Visible only at extreme zoom.
- Chrome's PDF output doesn't embed PDF/A or PDF/UA tags. For accessibility-compliant deliverables, weasyprint or pagedjs would be better than Chrome.
- I had to extract PT Serif Regular from `PTSerif.ttc` to a single TTF so the browser could load it via `@font-face` — minor friction but a one-time setup.

These are tractable. None broke the test.

## Where Typst still wins

Be honest about this:
- **Premium editorial print** (printed book for retail, brand-guideline coffee-table edition): Typst's editorial typography polish pays off. Use it.
- **PDF/A and PDF/UA compliance for accessibility-mandated deliverables** (gov contracts, education): Typst supports both natively. HTML/CSS reaches them through pagedjs but with more configuration.
- **Mathematical content**: Typst is in a league of its own (built for math/scientific writing). MyVault is unlikely to need this, but worth noting.
- **CLI-only workflows** with no JS runtime (rare for MyVault, but if true, Typst is simpler).

## Where HTML wins

- **Speed of iteration** — browser refresh + dev tools.
- **Agent-writable code** — massive training data advantage.
- **Cross-channel reuse** — same components for ebook, web, email, social, slide.
- **Tooling already installed everywhere.**
- **Component composition** — JSX/React/Vue make composition first-class; Typst's `#let` is functional but less expressive for visual layout.
- **One stack for everyone on the team** — designers, developers, content people all already know HTML/CSS. Typst is a niche skill.

## Recommendation

**Switch the ebook chunk's primary renderer to HTML/CSS** with `pagedjs-cli` for production builds. Keep Typst available as an optional renderer for premium-print deliverables where typography polish justifies the extra renderer.

For the rest of the stack (presentation, chart, social, email, web), HTML is already the natural choice. **The whole visual system can be HTML-first with conversion utilities per output target.**

The chunk pattern (HARD/BASE/MENU rules + retrieval) doesn't change — it's renderer-agnostic. We just swap what the chunks pin.

### Migration cost (rough)

- Rebuild `myvault-editorial.typ` as an HTML/CSS component library. Probably ~600 LOC of CSS + small JSX/HTML helpers. About 3-4 days of focused work.
- Set up `pagedjs-cli` in a build script for ebook PDF generation. Half a day.
- Migrate the privacy-guide spec to HTML markup. About 1 day.
- Update `chunks/ebook.md` to v1.4: renderer pinned to HTML/CSS+pagedjs, primitives list rewritten as components. Half a day.

**Total: ~5 days.** Much smaller than the cumulative cost of building 6 separate renderers.

## What this test does NOT prove

- I only tested 3 ebook pages, not the full 19-page document. Document-scale issues (long-document pagination, recurring chapter rhythm, TOC generation across pages) need a full 19-page rebuild to validate.
- I did NOT test slides (Test 2) or social (Test 3) — those are still in the parallel session's scope.
- I did NOT test pagedjs-cli specifically — only raw Chrome headless. pagedjs would unlock named-page selectors, automatic page counters, and better print-CSS support, but adds a build dependency.
- I did NOT test email-client compatibility (Outlook is the hard part for HTML email).
- I did NOT measure print color management (CMYK, ICC profiles) which matters if these PDFs ever go to a real print shop.

## Open questions for the parallel research session

The broader prompt at `_research/research-prompt-html-first-stack.md` covers Tests 2 (slide) and 3 (social). The findings there should resolve:

1. Does HTML→slide via reveal.js / Slidev produce decks comparable to Marp?
2. Does HTML→PNG via Satori / Puppeteer produce social images suitable for Instagram / LinkedIn at 1080×1080?
3. Does the chart-embedded-in-ebook stretch test work better in the unified HTML stack?
4. Is the same hero-stats component genuinely "write once, render everywhere" across PDF + slide + social + web?

If the parallel session's findings on those three tests trend positive, the case for HTML-first across the whole stack is clinched. If any of them blow up, we re-evaluate per-asset-type.

## Stretch test ran: same component to ebook + social — passed

After writing the bulk of this report, I ran the cross-asset stretch test described in `research-prompt-html-first-stack.md` to validate the strongest single claim for HTML-first.

**Goal**: prove that the same HTML/CSS component renders to both an ebook PDF and a social PNG with no rewrite — the "write once, render everywhere" claim.

**What I built** (~10 minutes):
- `_research/html-css-test/social/instagram-square.html` — a 1080×1080 Instagram square stat card
- It links to the SAME `styles.css` as the ebook test (`<link rel="stylesheet" href="../ebook/styles.css">`)
- It uses the EXACT same `.hero-stats > .grid > .stat` markup as ebook page 4
- It overrides only what social-specific context requires: a different `@page` size, a different background (Vault Teal full-bleed), and a color flip for the dark surface (white text instead of black/teal)

**Output**: `_research/html-css-test/social/instagram-square.png` — 1080×1080 PNG rendered via headless Chrome screenshot. Cleanly displays the same 99% / 5% / 82% stat panel as the ebook page 4, but as a social-ready square on Vault Teal.

**Time**: ~10 minutes including writing the file and rendering. Almost all of that was making the design choices for the social-specific framing (lockup placement, headline above the stats, footer line). The component logic was zero work — it was already written.

**Code added vs reused**:
- Reused: 100% of `styles.css` (373 LOC) — including the entire `.hero-stats` system
- Added: 60 lines of HTML + ~30 lines of social-specific CSS overrides

**This is the architecture test that matters most.** Typst could also render to PNG, but you would need to write a separate `social-card-1080()` primitive with separate logic for the headline placement, lockup, and stat layout. Component reuse across asset types is fundamentally HTML's home turf — every web framework's component model is built around exactly this kind of context-driven rendering.

The claim "build the design system once and convert to all output formats" is now demonstrated. With a single CSS file and tiny per-format HTML wrappers, we have:
- 3 ebook PDF pages (`html-css-test/ebook/test.pdf`)
- 1 social PNG (`html-css-test/social/instagram-square.png`)

Both consume the same tokens and component definitions. Only viewport, surface, and color invert.

## Bottom line

For ebook PDFs specifically, HTML/CSS via Chrome (or better, pagedjs) is good enough that the per-renderer complexity isn't justified. For the rest of the asset types, HTML was already the natural fit. **The cross-asset stretch test confirmed the strongest claim**: same component, multiple formats, with only context-specific overrides. The parallel session should validate slides/email/chart specifically; my prior is that those will also trend positive.

**Recommended next step**: run the parallel-session prompt to validate Test 2 (slide) and Test 3 (rest of social formats + chart). If those also pass, commit to migrating the visual system to HTML-first.
