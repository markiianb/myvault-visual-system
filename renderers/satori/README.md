# renderers/satori — MyVault social-image renderer

Satori (JSX → SVG via Wasm) + @resvg/resvg-js (SVG → PNG). No Chromium. Hand-composed creative frames from a JSON brief.

This renderer is the social-image counterpart to `renderers/marp/` (presentations), `renderers/typst/` (ebooks), and `renderers/vega-lite/` (charts).

## Philosophy

The system is **tokens + primitives + Lockup**, not a fixed component library.

- **Tokens** (`tokens.ts`, generated from `../../tokens/brand.tokens.json`) — colors, fonts, type scale, space, radius, gradients
- **Primitives** (`components/Text.tsx`, `components/Box.tsx`) — token-bound atoms with brand rules baked into the type signatures
- **Lockup** (`components/Lockup.tsx`) — the only "high-level" component, because the wordmark+icon is genuinely fixed

Frames are **hand-composed creative pieces**. Each frame defines its own content type and lays out the typography, color, and surface from scratch using primitives + tokens. There is no template, no shared dispatcher, no `<Stat>` / `<Quote>` / `<Announcement>` component to fall back on. The composition IS the design.

A pattern earns its own component only after it's been hand-composed three or more times in real frames. Until then, copy the JSX and tune it.

## Quick start

```bash
pnpm install
pnpm build:tokens          # regenerate tokens.ts from ../../tokens/brand.tokens.json
pnpm render fixtures/giant-number-square.json
pnpm render:all            # render every fixture in fixtures/
```

Outputs land in `output/` as PNG.

## Frames shipped

Five hand-composed compositions. Each is its own design — they don't share a layout chassis.

| Frame | Pixels | Composition |
|---|---|---|
| `stat-panel-teal-square` | 1080×1080 | Lockup top-left, headline middle, 3-stat row inside a 6%-white card on Vault Teal, footer line. The validated HTML reference. |
| `giant-number-square` | 1080×1080 | Single PT Serif number filling ~⅓ of the canvas, eyebrow above, caption below. Lockup parked bottom-right (small) so the number leads. Vault Teal. |
| `editorial-knockout-portrait` | 1080×1350 | Split surface: top 60% Vault Teal with knockout PT Serif headline; bottom 40% white with body paragraph and Vault Teal CTA. Lockup top-left, kicker top-right. |
| `asymmetric-quote-square` | 1080×1080 | Oversize PT Serif opening quote glyph (360px) in Vault Teal anchors top-left. Quote body wraps to its right and below. Lockup top-right (primary) counterweights diagonally. Off-white surface. |
| `og-headline-feed` | 1200×628 | Minimalist OG / share card. Maximalist whitespace. Lockup top-left, Vault Teal eyebrow, PT Serif headline, gray body, teal URL bottom. White surface. |

## Adding a frame

1. Write `frames/<name>.tsx` exporting a `Content` type and a builder function `({ content, assets }) => ReactElement`.
2. Compose with `Text`, `Box`, `Lockup`, and tokens. **Do not** import old pattern components — they're gone.
3. Register in `scripts/frames-registry.ts` with width/height.
4. Author a fixture in `fixtures/<name>.json` matching the Content type.
5. `pnpm render fixtures/<name>.json` — review.

## Primitives

### `<Text>`

Token-bound typography. Either set `preset` (one of the canonical roles in `tokens.typography`) or compose freely with `font` + `size` + `lineHeight`.

```tsx
<Text preset="display.l" color={colors.core.teal}>Headline</Text>
<Text font="serif" size={360} lineHeight={1} color={colors.core.white}>82%</Text>
<Text preset="caption" color={colors.core.gray02}>Source.</Text>
```

There is no `fontWeight` prop. Only Regular is allowed.

### `<Box>`

Token-bound surface. `surface` props for the brand palette (`teal`, `white`, `off-white`, `transparent`, plus the five gradient surfaces). `radius` for corner radii from the radius scale. `border` for a 1px gray-01 stroke. `style` is the escape hatch for layout (flex, padding, gap).

```tsx
<Box surface="teal" radius="2xl" style={{ padding: 40, flexDirection: "column" }}>
  ...
</Box>
```

### `<Lockup>`

The only high-level component, because the wordmark+icon never varies. Variant prop union covers the four canonical variants — gray is uncompilable.

```tsx
<Lockup variant="light" assets={assets.lockups} width={200} />
```

## Brand rules enforced by types

- `LockupVariant` = `"primary" | "light" | "teal" | "white"` — gray won't compile
- `Text` has no `fontWeight` prop — Regular-only is the only thing typed
- `Box.surface` is a union of canonical surface names — invented surfaces won't compile
- `Box.radius` accepts only the radius token names — invented radii won't compile

Compositions can violate brand rules in other ways (e.g., setting an off-brand color hex). The primitives prevent the most common mistakes; the rest is on whoever writes the frame.

## Fixture format

```json
{
  "id": "my-post",
  "frame": "giant-number-square",
  "content": { ...frame-specific shape... }
}
```

The `frame` field selects the layout. The `content` payload matches that frame's exported `Content` type. Read `frames/<frame>.tsx` to see the shape.

## Tokens

`tokens.ts` is auto-generated from `../../tokens/brand.tokens.json`. Don't edit by hand — run `pnpm build:tokens` after the source file changes.

Exports: `colors`, `fonts`, `space`, `radius`, `typography`, `gradients`, `Surface`, `lockupForSurface`, `onSurface`.

## Satori constraints to remember

- Subset of CSS. Layout via flex (yoga), not CSS Grid.
- `@font-face` URLs are not loaded — fonts pass as Buffer in `scripts/load-assets.ts`.
- SVGs render via `<img src={dataURI}>` — `loadLockups()` handles the conversion.
- **Never spread optional props into a style object** — Satori crashes on `undefined` values (it calls `.trim()` somewhere internally without a null guard). Build the style object conditionally. See `Text.tsx` / `Box.tsx` for the pattern.
- Limited shadow / `backdrop-filter` support.
- Fragments (`<>...</>`) inside flex containers can confuse layout — wrap in explicit divs when in doubt.

## Files

```
satori/
├── package.json, tsconfig.json, .gitignore
├── tokens.ts                  # generated — do not edit
├── types.ts                   # FrameSpec + FrameAssets only
├── components/
│   ├── Lockup.tsx
│   ├── Text.tsx               # typography primitive
│   └── Box.tsx                # surface primitive
├── frames/                    # hand-composed creative pieces
│   ├── stat-panel-teal-square.tsx
│   ├── giant-number-square.tsx
│   ├── editorial-knockout-portrait.tsx
│   ├── asymmetric-quote-square.tsx
│   └── og-headline-feed.tsx
├── scripts/
│   ├── build-tokens.mjs       # tokens.json → tokens.ts
│   ├── load-assets.ts         # fonts as Buffer, lockups as data URIs
│   ├── frames-registry.ts     # name → { dimensions, builder }
│   ├── render.ts              # CLI: pnpm render <fixture>
│   └── render-all.ts          # CLI: pnpm render:all
├── fixtures/                  # JSON briefs
├── fonts/                     # Lato + PT Serif Regular .ttf
└── output/                    # rendered PNGs (gitignored)
```

## Roadmap

- More creative frames as real social posts are scoped.
- A `chunks/social.md` HARD/BASE/MENU canon doc + a `social-reviewer` agent — needed only once we have enough shipped frames to extract patterns from.
- Voice of Markos satellite — different register entirely. Build when VoM scales need volume.
- Stream B (newsroom register: SF Pro, knockout headlines, low-opacity stat rows from the 29-03 series). Add SF Pro to `fonts/` and write Stream-B frames as needed.
