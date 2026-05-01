---
type: build-prompt
status: ready
owner: mark
created: 2026-04-30
purpose: "Self-contained prompt for a fresh session to build MyVault's social asset generation system using Satori (JSX → SVG → PNG via WebAssembly). Reverts to the renderer choice from the original visual-system architecture-v2 plan, but applies the HTML/CSS-first lesson — no chunks layer; components encode the rules."
---

# New session — Build MyVault's social asset generation system (Satori + JSX)

## What we're building

A **social asset generation system** for MyVault: JSX/TSX templates rendered via [Satori](https://github.com/vercel/satori) that produce branded social images (Instagram square, portrait, story; LinkedIn; X; OG cards) in PNG/JPG from structured content. The system should let a human or an AI agent author a brief and get a brand-correct image out the other side, in seconds.

**Renderer**: Satori (the same library that powers `@vercel/og`). JSX → SVG via WebAssembly → PNG via `@resvg/resvg-js`. No Chromium dependency, ~5× faster than Puppeteer, edge/Lambda-native, JSX is dense in LLM training data.

**Why Satori (and not headless Chrome or vanilla HTML/CSS)**: Already chosen in `_plan/visual-system-architecture-v2.md` §4 after a deliberate renderer-matrix evaluation. Disqualified alternatives: Puppeteer (150MB Chromium, cold-start hostile), sharp+SVG (manual coordinate math), html2canvas (browser-only). Satori is the right deterministic renderer for social-image production. The HTML/CSS test recently confirmed the substrate works — Satori takes the same kind of HTML-shaped JSX, just runs it through a Wasm layout engine instead of a browser.

## What changed since the original plan

The original plan in `_plan/visual-system-architecture-v2.md` paired Satori with a `chunks/social.md` HARD/BASE/MENU briefing layer (mirroring `chunks/ebook.md`). After the HTML/CSS-vs-Typst test (`_research/findings-html-vs-typst-quicktest.md`), the chunks layer is being deliberately dropped for the web-shaped renderers. **Components encode the rules** via TypeScript prop types, defaults, and variants — the way modern web design systems do.

So: **keep Satori, drop the chunks layer.** That's the architecture for this build.

## Context to load (in this order)

Working directory: `/Users/mark_b/Documents/Business/MyVault/10-Brand/visual-system/`

1. `_plan/visual-system-architecture-v2.md` — read §4 (renderer matrix, Satori rationale) and §3 Layer B (the chunk frontmatter that we're now NOT using for social). Read this BEFORE the next two so you understand what was previously planned.
2. `_research/findings-html-vs-typst-quicktest.md` — explains why we drop the chunks layer for web-shaped renderers and let components encode rules instead.
3. `_research/html-css-test/social/instagram-square.html` and `instagram-square.png` — the proof-of-concept social card. Visual reference; the JSX templates should produce equivalent output.
4. `_research/html-css-test/ebook/styles.css` — proof-of-concept stylesheet. Pattern to translate into JSX style objects.
5. `tokens/brand.tokens.json` — design-token source-of-truth (W3C DTCG format). The system MUST consume from this. A small build script generates `tokens.ts` (TypeScript constants).
6. `assets/logo/` — `lockup-light.svg`, `lockup-primary.svg`, `icon-light.svg`, `icon-primary.svg`. Use these directly; Satori supports SVG via `<img src={dataURI}>` or inline.
7. `chunks/_manifest.yaml` — the planned `social` entry says `renderer_proposed: satori, spec_format_proposed: tsx`. We're shipping that intent; ignore the unbuilt chunk doc.
8. `00-Meta/Conventions.md` and `10-Brand/CLAUDE.md` — vault and brand-system context.

Memory entries that constrain any approach:
- `feedback_myvault_brand_name.md` — "MyVault" always one word, capital M, capital V
- `feedback_myvault_fonts_lato_primary.md` — Lato + PT Serif Regular only
- `feedback_regular_weight_only.md` — no Bold / SemiBold / Italic
- `feedback_no_uppercase_eyebrows.md` — no uppercase letter-spaced eyebrow tags above titles
- `feedback_white_is_default_surface.md` — white is default surface; off-white rare alternate
- `feedback_hero_color_80_20_black_teal.md` — hero color split 80% black / 20% teal
- `feedback_no_gray_logo_variant.md` — Lockup-Gray and Icon-Gray are deprecated — never use
- `feedback_design_pages_are_guidelines.md` — Figma examples are kits of choices, not strict canon
- `feedback_no_mandatory_pages_editorial_first.md` — content drives the layout

For Voice of Markos posts: `30-Marketing/Thought-Leadership/linkedin-engagement/voice-of-markos/` has its own brand satellite (different register from MyVault parent — first-person "I", longer sentences, dry sarcasm allowed).

## Stream A vs Stream B (open question from original plan — resolve in turn 1)

The visual-system-pipeline-plan flags a still-open question:

- **Stream A (editorial)** — canonical MyVault parent voice. PT Serif/Lato + bordered cards + pill buttons. Most posts.
- **Stream B (newsroom)** — the 29-03 series. SF Pro, knockout headline, low-opacity stat rows. Stat-heavy promotional posts.

Ask Mark: are these co-equal styles, or is Stream A canonical and Stream B a one-off? This drives whether you build Stream B variants for v1 or only Stream A.

## Social formats MyVault needs

Build templates for these dimensions. Prioritize the first four; the rest are nice-to-have for v1.

| Format | Pixels | Use case |
|---|---|---|
| **Instagram / LinkedIn square** | 1080 × 1080 | Most-used. Quote, stat, announcement, carousel cells. |
| **Instagram / LinkedIn portrait** | 1080 × 1350 | Higher engagement on IG/LI. Quote cards, content promo. |
| **Instagram / TikTok story** | 1080 × 1920 | Vertical full-bleed. Story posts, sharable testimonials. |
| **LinkedIn / X feed image** | 1200 × 628 | Article share previews, link cards. |
| **OG image / Twitter card** | 1200 × 630 | Website / blog meta-image. |
| **Carousel cell** | 1080 × 1080 (multi-frame) | Slide-deck-style multi-card posts. |

## Content patterns to support

1. **Stat card** — single hero number + supporting line + source. (Validated in HTML test.)
2. **Multi-stat panel** — 2 to 4 stats in a row, like the `hero-stats` from the ebook test.
3. **Quote card** — large PT Serif quote on off-white or teal, optional author attribution.
4. **Announcement** — headline + supporting line + CTA URL.
5. **Article promo** — title + small image / icon + author byline + URL.
6. **Voice of Markos LinkedIn post** — first-person headline + body excerpt; VoM register.
7. **Newsletter promo** — issue title + teaser + CTA.

## Satori-specific constraints to know up front

Satori implements a subset of CSS/HTML. Things that DON'T work:
- `position: absolute` is supported but layout engine is yoga (flexbox-based) — lay out with flex, not absolute placement, where possible
- `@font-face` URLs are not loaded — fonts must be passed as `Buffer`/`ArrayBuffer` to the Satori call
- Limited filter support (no `backdrop-filter`, limited box-shadow nuances)
- No JavaScript / event handlers in output (correct — output is a static image)
- No CSS animations (output is static)
- SVG `<image>` and inline `<svg>` work; some advanced SVG features may not

What you do instead:
- Lay out with `display: flex`, `flexDirection`, `justifyContent`, `alignItems`, `gap`
- Load fonts: `await fs.readFile('fonts/Lato-Regular.ttf')` then pass to Satori options
- Style with inline `style={{...}}` objects (Satori parses these)
- Use SVG paths inline for the lockup, or `<img>` with a base64 data URI

Plan around these from the start; don't build then re-architect.

## Architectural decisions to surface in turn 1

Don't drift. Surface these before writing code.

1. **Stream A only, or Stream A + Stream B?** (See Stream A/B question above.)
2. **Token bridge format**: `tokens.ts` (TypeScript constants) — confirm the file name and shape. Suggested:
   ```ts
   export const colors = {
     core: { teal: '#094545', white: '#ffffff', offWhite: '#fbfaf5', ... },
     secondary: { ... },
     signal: { ... },
   };
   export const fonts = { serif: 'PT Serif', sans: 'Lato' };
   ```
3. **Component model**:
   - Pure functional JSX components (`(props) => <div style={{...}}>...</div>`)
   - TypeScript prop types enforce HARD rules (variants, surface choices)
   - Default props express BASE
   - Named exports per pattern (Stat, MultiStat, Quote, Announcement, etc.)
4. **Render pipeline**: a single `render.ts` script that:
   - Takes a frame name + content JSON + output path
   - Imports the right JSX component
   - Calls Satori → SVG, then resvg → PNG
   - Writes the file
   Confirm CLI shape with Mark: `pnpm render quote-card-square ./content.json ./out.png` or similar.
5. **Where the system lives**:
   - Option A: `visual-system/social/` (self-contained, easy to find next to other visual-system work)
   - Option B: `myvault-tools/social/` (lives with the existing Next.js tools app, easier to deploy as a serverless endpoint later)
   - Recommend A for v1; can move/duplicate to B when serverless is needed.
6. **Brand-satellite handling**: MyVault parent vs Voice of Markos. Same components + a `satellite="vom"` prop swapping fonts/colors/byline-style? Or a separate `voice-of-markos/` directory? Confirm with Mark.
7. **Output destination**: filesystem-only for v1, or wire into Buffer / Notion / a CDN?
8. **AI-authored copy vs composition**: agent writes the COPY for each post, or just composes pre-written copy into a template?

## Suggested directory structure

```
visual-system/
└── social/
    ├── README.md
    ├── package.json                  # satori + @resvg/resvg-js + typescript
    ├── tsconfig.json
    ├── tokens.ts                     # generated — DO NOT edit directly
    ├── fonts/                        # PT Serif + Lato TTFs (loaded as Buffers at render time)
    ├── components/                   # Reusable JSX building blocks
    │   ├── Lockup.tsx                # MyVault wordmark + icon, props for variant
    │   ├── HeroStat.tsx              # Single big number + label + source
    │   ├── MultiStat.tsx             # 2-4 stats in a row
    │   ├── QuoteCard.tsx             # Big PT Serif quote with decorative mark
    │   ├── Announcement.tsx          # Headline + supporting + CTA
    │   ├── ArticlePromo.tsx          # Title + thumbnail + byline + URL
    │   └── voice-of-markos/
    │       └── VomQuote.tsx          # VoM register variant
    ├── frames/                       # Per-format compositions
    │   ├── instagram-square.tsx
    │   ├── instagram-portrait.tsx
    │   ├── instagram-story.tsx
    │   ├── linkedin-feed.tsx
    │   └── og-card.tsx
    ├── scripts/
    │   ├── build-tokens-ts.sh        # brand.tokens.json → tokens.ts
    │   └── render.ts                 # CLI: frame + content → PNG
    ├── examples/                     # Real-content samples (reviewed)
    └── out/                          # Renders go here
```

## What "good" looks like for v1

- Foundation pieces work: `tokens.ts` generation, font loading, end-to-end Satori → PNG pipeline rendering one stat card.
- 4 primary formats × 4 priority patterns = 16 frames working.
- Each component < 150 LOC, frames < 100 LOC, reusing components heavily.
- Tokens flow through one build script — no hardcoded hex values in components.
- TypeScript prop types enforce brand rules: a `<Text>` component literally cannot take `weight: 'bold'` because the prop type doesn't allow it.
- Render pipeline takes < 2 seconds per image (Satori + resvg are both fast).
- Same `<HeroStat>` component renders identically in IG square, IG portrait, and OG card frames — proves cross-format reuse.
- A non-designer can author content (markdown or JSON) and run `pnpm render` to get a brand-correct PNG.

## What NOT to do

- **Don't introduce a `chunks/social.md` HARD/BASE/MENU layer.** Components encode rules via TypeScript types + defaults + variants.
- **Don't reach for headless Chrome / Puppeteer** as the renderer. Satori was deliberately picked over those. Headless Chrome is fine for the dev preview loop if you want fast hot-reload during component dev, but production renders go through Satori.
- **Don't pull in a heavy framework** (Next.js full app, Tailwind + every plugin) for v1. Just satori + @resvg/resvg-js + tsx + tsconfig is enough.
- **Don't reinvent the lockup or icon SVGs.** Use `<img src={dataURI}>` with the existing SVGs from `assets/logo/`.
- **Don't ship without rendering each frame** and reviewing the PNG side-by-side with the Figma reference (where one exists).
- **Don't break the brand rules** — they're load-bearing. Component prop types should make violations impossible to write.

## Suggested cycle

1. **Cycle 0** — Read this prompt + the architecture-v2 §4 + the findings doc. Surface architectural-decision questions to Mark. Don't write code.
2. **Cycle 1** — Foundation: `package.json`, `tsconfig.json`, font loading helper, `tokens.ts` generation script. Build ONE component (`<HeroStat>`) and ONE frame (`instagram-square` rendering one stat card). Validate end-to-end Satori → PNG pipeline.
3. **Cycle 2** — Build the rest of the components (MultiStat, QuoteCard, Announcement, ArticlePromo). Render the 4 primary formats × these 4 patterns. Side-by-side review.
4. **Cycle 3** — Voice of Markos variants if Mark confirms VoM is in v1 scope.
5. **Cycle 4** — Stream B (newsroom register) if Mark confirms it's co-equal with Stream A.
6. **Cycle 5** — Polish: README, examples directory with reviewed content, render-pipeline ergonomics. Ship v1.

## Working dir

All work in `/Users/mark_b/Documents/Business/MyVault/10-Brand/visual-system/social/` (create if missing). Don't commit unless Mark asks.

## What to ask Mark in turn 1 before writing code

1. Stream A only for v1, or Stream A + Stream B together?
2. Voice of Markos variants in v1, or defer to later?
3. Tooling location confirmed: `visual-system/social/` (recommendation), or move to `myvault-tools/social/`?
4. Output destination: filesystem-only for v1, or wire into something (Buffer / Notion / CDN)?
5. Is the agent expected to author copy as well, or is this template+content composition only?
6. Real backlog of social posts that v1 needs to handle in week one? (Drives priority order.)
