---
type: renderer-guide
status: active
owner: mark
created: 2026-04-30
updated: 2026-04-30
tags: [visual-system, marp, presentations, renderer]
summary: "Marp renderer for MyVault presentations. Implements chunks/presentation.md v1.2. Three-stage pipeline: deck.yaml (author-facing spec, ergonomic — one entry per slide with named fields) → compile-deck.js (per-pattern emitters, mirrors Typst page-functions) → deck.md (marp-ready) → marp CLI → PDF/PPTX/HTML. Token bridge (jq-based) extracts brand.tokens.json → CSS custom properties → concatenated theme.css. Self-contained: bundled fonts (Lato + PT Serif), token bridge script, theme CSS, deck-spec compiler with one emitter per pattern. Direction matches the ebook pipeline (renderers/typst/myvault-ebook.typ): author writes content + a few tags; emitters/templates handle layout, chrome, typography, surface."
---

# Marp renderer — MyVault presentations

Implements `chunks/presentation.md` v1.2 as a Marp theme + deck-spec compiler. **Author writes `deck.yaml` (content + a few tags per slide); compiler emits marp-ready `deck.md`; theme applies HARD + BASE rules; Marp renders to PDF/PPTX/HTML.** Figma never renders output.

The three-stage pipeline mirrors the ebook side (`renderers/typst/myvault-ebook.typ`) — author writes structured content, per-pattern emitters/functions handle layout. Same direction, different language (Marp + JS for presentations; Typst for ebooks).

## Files

| File | Purpose |
|---|---|
| `compile-deck.js` | **The deck-spec compiler.** One emitter function per slide-type (cover, statement, problem, three-shifts, architecture, stat-hero, comparison, thesis, action, closing) — each cites the chunk rule + Pattern Reference register it implements. Reads `deck.yaml`, emits marp-ready markdown. Mirrors the Typst page-function pattern in `renderers/typst/myvault-ebook.typ`. |
| `package.json` | Declares `js-yaml` dep for the compiler. Run `npm install` once. |
| `build-tokens.sh` | jq-based token bridge: extracts `tokens/brand.tokens.json` → `tokens.css` (CSS custom properties); concatenates `tokens.css + myvault-presentation.css` → `theme.css` (the file Marp loads) |
| `tokens.css` | Auto-generated. CSS custom properties for color, gradient, typography, radius, space. Inspect for what's available — do not hand-edit |
| `myvault-presentation.css` | The theme rules. References tokens via `var(--token-name)`. Implements R-PRES-001..003 + BASE typography ladder + per-class layouts (cover, statement, problem, three-shifts, architecture, stat-hero, comparison, thesis, action, closing) |
| `theme.css` | Auto-generated. Concatenated `tokens.css + myvault-presentation.css`. **This is what Marp loads** via `--theme path/to/theme.css` |
| `fonts/Lato-Regular.ttf` | Bundled Lato Regular (R-TYPE-001 — Regular only) |
| `fonts/PTSerif-Regular.ttf` | Bundled PT Serif Regular |

## Quickstart — render a deck end-to-end

```bash
cd 10-Brand/visual-system

# One-time: install compiler dep
npm install --prefix renderers/marp

# After any token or theme.css change
./renderers/marp/build-tokens.sh

# Compile spec → marp markdown
node renderers/marp/compile-deck.js \
  presentations/test-state-of-privacy/deck.yaml \
  --out presentations/test-state-of-privacy/deck.md

# Render to PDF
npx --yes @marp-team/marp-cli \
  --theme renderers/marp/theme.css --html --allow-local-files --pdf \
  presentations/test-state-of-privacy/deck.md \
  -o presentations/test-state-of-privacy/deck.pdf

# Or per-slide PNGs (for review)
npx --yes @marp-team/marp-cli \
  --theme renderers/marp/theme.css --html --allow-local-files \
  --images png --image-scale 1 \
  presentations/test-state-of-privacy/deck.md \
  -o presentations/test-state-of-privacy/slides/slide.png
```

## Authoring a deck

**Author writes only `deck.yaml`.** Everything else is generated.

The schema mirrors the ebook approach in `documents/ebook-test/spec.typ` — content + a few named fields per slide. Each slide has a `type:` matching one of the emitters in `compile-deck.js`. Page numbers, header labels, and footers auto-emit from `deck.meta` + per-slide `section` + the slide's position.

### Minimal example

```yaml
deck:
  meta: "Deck Name · 2026"           # appears as left side of header labels
  slides:
    - type: cover
      title: "Big title"
      subtitle: "Quiet supporting line."
      speaker: "Author · Role · Venue"

    - type: statement
      section: "Opening"               # right side of header labels (this slide)
      page: 2                          # footer page number
      text: "One short sentence carrying the slide."

    - type: problem
      section: "Problem"
      page: 3
      title: "Slide title."
      rows:
        - heading: "Heading."
          body: "Body text..."
      closing: "Optional synthesizing line."
```

### Available slide types

Each is the analog of an ebook page-function. Schemas documented inline in `compile-deck.js`:

| `type` | Register | Surface | What you write |
|---|---|---|---|
| `cover` | brand moment | gradient/warm | title, subtitle, speaker |
| `statement` | single-statement | white | section, page, text |
| `problem` | dramatic | Vault Teal full-bleed | section, page, title, rows[], closing? |
| `three-shifts` | data-light | white | section, page, title, cards[], closing? |
| `architecture` | editorial-dark | black | section, page, title, intro, layers[], closing? |
| `stat-hero` | hero-stat | white | section, page, number, headline, supporting, source? |
| `comparison` | data-comparison | off-white | section, page, title, columns[], myvault_col, rows[], legend_note? |
| `thesis` | Thesis-pattern | white | section, page, title (40pt!), lessons[], cards_per_row? |
| `action` | action | white | section, page, title, blocks[], closing? |
| `closing` | Closing | gradient/cool | headline, speaker, period? |

The compiler validates `type:` against the registered emitters. Adding a new slide type is a 2-step change: add an emitter function in `compile-deck.js`, register it in `EMITTERS`, and document the YAML schema in this README and the chunk's Pattern Reference.

## How the pipeline enforces chunk rules

| Rule | Where enforced |
|---|---|
| R-PRES-001 (canvas geometry) | `section { width: 1920px; height: 1080px; padding: 20px 40px; display: grid; }` |
| R-PRES-002 (no top header bar; chrome shape) | `section header, section footer { display: none !important; }` (defeat Marp's defaults) + `.chrome-top` and `.chrome-bottom` SPACE_BETWEEN flex |
| R-PRES-003 (18pt floor) | All typography classes start at ≥18px; no caption-tier 12pt class exists in the theme |
| R-COLOR-009 chart-card scoped exception (foundation override) | When a `.chart-card` descendant exists, Vault Teal at 18pt is allowed there per the `foundation_overrides` declaration in the chunk. Theme honors via `.chart-card .label { color: var(--color-core-teal); }` (added when chart cards are needed) |
| BASE typography ladder | CSS classes: `.display-xl`, `.display-l`, `.display-m`, `.display-s`, `.display-xs`, `.display-mid`, `.heading-l`, `.heading-m`, `.serif-body`, `.body`, `.label`. h1–h5 default to ladder positions |
| BASE Surface Palette | Per-class `section.<layout> { background: ...; color: ...; }` |
| BASE Vault Teal discipline | Only 144pt teal display class + per-layout teal accent (Cover anchor, Stat-hero hero, Comparison MyVault column, Action signal-go top hairline, Closing period) |
| BASE column system | Per-layout `display: grid; grid-template-columns: repeat(3, 1fr) / 1fr 1fr / 1fr; gap: 40px;` |
| BASE card padding | `.card, .lesson, .action-block { padding: 40px; gap: 22px; }` |

## Adding a new layout

1. Add a section to `myvault-presentation.css`:
   ```css
   section.my-new-layout {
     background: var(--color-core-white);
     /* ... */
   }
   section.my-new-layout .body {
     /* layout-specific composition */
   }
   ```
2. Reference HARD/BASE rules from the chunk — never invent surface colors or font sizes outside the ladder.
3. Run `./build-tokens.sh` to rebuild `theme.css`.
4. Use the new layout in any deck via `<!-- _class: my-new-layout -->`.

If the layout introduces a new register that didn't exist before, **also update `chunks/presentation.md` Pattern Reference** to document it as part of the chunk canon.

## Re-syncing tokens

If `tokens/brand.tokens.json` changes (e.g., Mark adds a new color in Figma + re-extracts), run:

```bash
cd renderers/marp
./build-tokens.sh
```

This regenerates `tokens.css` and re-concatenates `theme.css`. Marp loads `theme.css` directly, so the next render picks up the changes.

## Why bash + jq instead of Style Dictionary

Architecture v2 originally proposed Style Dictionary v4 as the token transformer. We use bash + jq instead because:

- Same discipline as `renderers/typst/build-tokens.sh` (already shipped); single tooling decision across renderers
- No node dependency at the token-bridge layer (Marp itself runs via npx; tokens stay infra-light)
- Single-file output is what Marp wants anyway (`@import` is stripped by Marp's CSS processor — see "known gotchas" below)

If we ever need multi-format token outputs (Tailwind, JSX constants, etc.), Style Dictionary becomes worth the dependency. For Marp + Typst alone, bash + jq is the right size.

## Known gotchas

- **`@import` is stripped by Marp.** Variables referenced from a separate file aren't defined in the rendered output. `build-tokens.sh` concatenates `tokens.css + myvault-presentation.css` into `theme.css` to work around this. Do not use `@import` in `myvault-presentation.css`.
- **`section header, section footer` must be `display: none !important`.** Marp adds default header/footer elements that conflict with the canonical chrome shape. The theme defeats them globally.
- **Inline HTML required.** Slides need raw HTML (`<div class="...">`) for layout structure beyond what markdown provides. Marp must be invoked with `--html` to allow this.
- **PDF rendering needs Chromium.** First `marp --pdf` run downloads Chromium via Puppeteer (~150MB). Subsequent runs are cached. PNG/HTML output doesn't need Chromium.
- **Font paths are relative to the CSS file's location.** `@font-face url('fonts/Lato-Regular.ttf')` resolves relative to `theme.css`. As long as `theme.css` lives in `renderers/marp/`, the path resolves correctly.

## Phase 3 (future)

Per architecture v2 §7, the agentic workflow has additional layers above the renderer:

1. **`/myvault:design-presentation` slash command** — invokes a `presentation-designer` agent
2. **`presentation-designer` agent** — Brief → Spec → Render → Review protocol
3. **5-reviewer parallel swarm** — color, typography, layout, brand-elements, accessibility — each screenshots the rendered output and scores against the chunks

This Phase 2 ships the renderer + theme. Phase 3 wraps the agentic UX around it.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-30 | **Adapted to ebook-direction author ergonomics.** Added `compile-deck.js` (Node + js-yaml) — per-pattern emitters that mirror the Typst page-function model in `renderers/typst/myvault-ebook.typ`. New three-stage pipeline: `deck.yaml` (author writes content + a few tags per slide) → `compile-deck.js` (per-pattern emitters; chrome + page numbers auto-emit from deck.meta + slide.section + position) → `deck.md` (build artifact, marp-ready) → `marp` → PDF. Each emitter cites its R-PRES rule and Section-1 Pattern Reference (same discipline as the Typst functions citing R-EBOOK rules + Figma node IDs). Theme CSS unchanged — author surface improved. Deck spec dropped from ~280 lines of HTML-laced markdown to ~120 lines of structured YAML. | Mark + Claude |
| 2026-04-30 | Initial. `build-tokens.sh` + `tokens.css` + `myvault-presentation.css` + `theme.css` (concatenated) + bundled Lato + PT Serif. 10 layouts implementing chunks/presentation.md v1.2. Test deck (`presentations/test-state-of-privacy/deck.md`) renders end-to-end via `npx @marp-team/marp-cli --theme renderers/marp/theme.css --html --allow-local-files --pdf|--images png ...`. | Mark + Claude |
