# renderers/satori — MyVault social-image renderer

Satori (JSX → SVG via Wasm) + @resvg/resvg-js (SVG → PNG). No Chromium. Brand-correct social images from a JSON brief.

This renderer is the social-image counterpart to `renderers/marp/` (presentations), `renderers/typst/` (ebooks), and `renderers/vega-lite/` (charts).

## Quick start

```bash
pnpm install
pnpm build:tokens          # regenerate tokens.ts from ../../tokens/brand.tokens.json
pnpm render fixtures/ig-square-3-stat.json
pnpm render:all            # render every fixture in fixtures/
```

Outputs land in `output/` as PNG.

## Frames

| Frame | Pixels | Use |
|---|---|---|
| `instagram-square` | 1080×1080 | Quote, stat, announcement, carousel cell |
| `instagram-portrait` | 1080×1350 | Higher engagement on IG/LI feed |
| `instagram-story` | 1080×1920 | Vertical full-bleed, IG/TikTok stories |
| `linkedin-feed` | 1200×628 | Article share preview, OG card |

Add a frame: write `frames/<name>.tsx`, register it in `scripts/frames-registry.ts`, and any fixture with `"frame": "<name>"` will render through it.

## Patterns

Each frame accepts a discriminated content union. See `types.ts`.

| Pattern | Shape |
|---|---|
| `stat-panel` | Optional headline + 1-3 stats in a row |
| `quote` | Big PT Serif quote + optional attribution |
| `announcement` | Optional eyebrow + headline + supporting + CTA |

## Surfaces

| Surface | Background | Lockup variant | Body color |
|---|---|---|---|
| `teal` | Vault Teal `#094545` | light | white |
| `white` | `#FFFFFF` | primary (black) | black |
| `off-white` | `#FBFAF5` | primary (black) | black |

Surface choice automatically picks the lockup variant via `lockupForSurface` in `tokens.ts`. The deprecated gray lockup is uncompilable by type.

## Fixture format

```json
{
  "id": "my-post",
  "frame": "instagram-square",
  "surface": "teal",
  "footerLine": "myvaultai.com — Private by design",
  "content": {
    "pattern": "stat-panel",
    "headline": "Your headline.",
    "stats": [
      { "value": "99%", "label": "...", "source": "..." }
    ]
  }
}
```

The `frame` field selects the layout. The `content` union determines which pattern body renders. Footer line is optional.

## Brand rules enforced by types

- `LockupVariant` = `"primary" | "light" | "teal" | "white"` — gray is uncompilable
- `Surface` = `"teal" | "white" | "off-white"` — drives lockup + text colors automatically
- No `fontWeight` prop anywhere — Regular-only is the only thing typed
- `StatPanel.stats` is a tuple `[Stat] | [Stat, Stat] | [Stat, Stat, Stat]` — 4+ stats won't typecheck
- "MyVault" is the canonical brand name — never break it across lines (handled at copy level)

## Tokens

`tokens.ts` is auto-generated from `../../tokens/brand.tokens.json`. Don't edit `tokens.ts` by hand. Run `pnpm build:tokens` after the source token file changes.

The generated module exports:
- `colors` — core, secondary, signal, icon
- `fonts` — `serif: "PT Serif"`, `sans: "Lato"`
- `space` — s0…s32 (px integers)
- `radius` — none, xs…3xl, full (px integers)
- `typography` — display.{xxl,xl,l,m,s} / heading.{l,m} / body.{xl,l,default,s} / caption (no fontWeight)
- `gradients` — primary, cool, warm, mist, greydient (W3C DTCG stop arrays)
- `lockupForSurface` — surface → lockup variant map
- `onSurface` — surface → `{ fg, fgMuted, fgDim }` palette

## Satori constraints to remember

Satori implements a subset of CSS. Things that **don't** work:

- `position: absolute` exists but layout is yoga (flexbox); prefer flex
- `@font-face` URLs are not loaded — fonts are passed as Buffer in `scripts/load-assets.ts`
- Limited shadow / `backdrop-filter` support
- Use `<img src={dataURI}>` for SVGs, not `<svg>` paths inline
- React fragments `<>...</>` in flex containers can confuse layout — wrap pattern branches in explicit divs (this is why the cycle-2 layout regression happened; the fix is in the frame files)

## Files

```
satori/
├── package.json, tsconfig.json, .gitignore
├── tokens.ts                  # generated — do not edit
├── types.ts                   # FrameContent + pattern unions
├── components/
│   ├── Lockup.tsx
│   ├── Stat.tsx
│   ├── StatPanel.tsx
│   ├── Quote.tsx
│   └── Announcement.tsx
├── frames/
│   ├── instagram-square.tsx       # 1080×1080
│   ├── instagram-portrait.tsx     # 1080×1350
│   ├── instagram-story.tsx        # 1080×1920
│   └── linkedin-feed.tsx          # 1200×628
├── scripts/
│   ├── build-tokens.mjs           # tokens.json → tokens.ts
│   ├── load-assets.ts             # fonts as Buffer, lockups as data URIs
│   ├── frames-registry.ts         # frame name → { dimensions, builder }
│   ├── render.ts                  # CLI: pnpm render <fixture>
│   └── render-all.ts              # CLI: pnpm render:all
├── fixtures/                  # JSON briefs
├── fonts/                     # Lato + PT Serif Regular .ttf
└── output/                    # rendered PNGs (gitignored)
```

## Roadmap

- Stream B (newsroom register, knockout headlines, low-opacity stat rows from the 29-03 series). Stream A is canonical voice; Stream B is a promotional alternate. Build when actively needed.
- Carousel frames (multi-slide IG square set with a shared identity).
- Voice of Markos satellite — first-person register, longer rhythm, byline. Build when VoM scales need volume.
- A `chunks/social.md` HARD/BASE/MENU canon doc + `social-reviewer` agent so brand judgement (not just rule compliance) is reviewed automatically.
