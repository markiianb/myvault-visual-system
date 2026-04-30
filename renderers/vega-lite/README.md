# renderers/vega-lite

Renderer for the MyVault `chart` asset-type chunk. Produces SVG / PNG / PDF charts from JSON specs that inherit brand tokens.

## Architecture

The chart-card has two parts:

1. **Chrome** — frame, gradient surface, header (title + description), footer (top stroke + dot + source caption). Hand-rolled SVG so we get exact Figma fidelity (token-bound colors, gradient stops, custom layouts that Vega-Lite doesn't reach).
2. **Plot** — the data viz. For per-type fidelity to Figma, each chart type has its own composer that draws the bars / rings / axes directly in SVG. (Vega-Lite was the renderer pin for v1.0; the composer pattern is Vega-Lite-compatible — a fixture's `plot` field is a full Vega-Lite spec for any chart type that doesn't need pixel-perfect Figma layout.)

`compose.mjs` reads a fixture, picks the per-type composer, emits a complete SVG.

## Usage

```bash
# 1. Bridge tokens
./build-tokens-vega.sh
# Wrote tokens.json, theme.json

# 2. Compose a chart from a fixture
node compose.mjs fixtures/horizontal-bar.chart.json
# Wrote output/horizontal-bar.svg

# 3. Convert to PNG / PDF
rsvg-convert -w 1920 -o output/horizontal-bar.png output/horizontal-bar.svg
rsvg-convert -f pdf -o output/horizontal-bar.pdf output/horizontal-bar.svg
```

## Files

| File | Purpose |
|---|---|
| `build-tokens-vega.sh` | Token bridge: `tokens/brand.tokens.json` → `tokens.json` (flat key-value) + `theme.json` (Vega-Lite config) |
| `tokens.json` | Generated. Brand colors, gradients, font names. |
| `theme.json` | Generated. Vega-Lite config block — used when a fixture's plot is rendered through Vega-Lite (e.g., scatter plots in future). |
| `compose.mjs` | The composer. Per-type SVG generation for the 5 canonical chart types. |
| `render.sh` | Wrapper around `vl2svg` / `vl2png` / `vl2pdf` for fixtures that ARE pure Vega-Lite specs (kept for future scatter / line / area chart types). |
| `package.json` | npm deps: `vega`, `vega-lite`, `vega-cli`. Install with `npm install --ignore-scripts` (canvas native build not required for SVG output). |
| `fonts/` | Lato + PT Serif. Used by SVG `font-family` references. Browsers and rsvg pick up font names from system; the bundled TTFs are for offline / CI render parity. |
| `fixtures/<type>.chart.json` | One fixture per chart type. Chrome metadata + plot data spec. |
| `output/` | Generated SVGs + PNGs. Gitignored. |

## Fixture schema

```json
{
  "id":   "horizontal-bar",
  "type": "horizontal-bar | vertical-bar | vertical-bar-axes | radial-dramatic | radial-light",
  "card": {
    "width": 960,
    "padding": [40, 40, 40, 40],
    "surface": "mist | primary | warm | greydient | off-white | teal",
    "headerGap": 20,
    "footerGap": 20
  },
  "header": {
    "title": "...",
    "description": "...",       // optional
    "innerGap": 8 | 10
  },
  "footer": {
    "show": true,
    "source": "Source / caption — MyVault, 2026"
  },
  "plot": {
    "data": { "values": [ ... ] },
    "scale": { ... }            // optional, type-specific
  }
}
```

See `fixtures/*.chart.json` for one example of every type.

## Surface recipes

The chart-card's title color, description color, source caption color, footer top-stroke color, and footer dot color all flip per surface. Per chunk BASE Surface Color Recipes table:

| Surface | Title | Desc | Caption | Footer Stroke | Footer Dot |
|---|---|---|---|---|---|
| mist / primary / warm | black | gray-02 | gray-02 | gray-01 | teal |
| greydient (radial-light) | black | gray-02 | gray-02 | gray-01 | **black** |
| off-white | black | gray-02 | gray-02 | gray-01 | teal |
| teal (radial-dramatic) | white | off-white | off-white | off-white | white |

## Outputs validated

5 fixtures rendered against Figma reference frames on 2026-04-30:

| Type | Figma ref |
|---|---|
| horizontal-bar | `70:8480` |
| vertical-bar | `70:8617` |
| vertical-bar-axes | `70:8705` |
| radial-dramatic | `70:8651` |
| radial-light | `70:8678` |

## Out of scope

- **Flow Diagram** (Figma `70:8560`) — node-graph; goes to a future `chunks/diagram.md` chunk rendered with Typst+Fletcher
- **Stat Infographic** (Figma `70:8598`) — layout primitive; adopted as `stat-infographic` editorial primitive in `renderers/typst/myvault-editorial.typ`

## Relationship to the chunk

The contract this renderer must satisfy is in `chunks/chart.md` v1.0 (HARD: R-CHART-001..007 + BASE typography / surface / color recipes / radial geometry / axis-chart specifics + MENU of 5 canonical types).
