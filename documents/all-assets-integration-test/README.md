# all-assets-integration-test

End-to-end proof that **all three composer asset-types** (chart, stat-infographic, diagram) integrate with the ebook chunk in one PDF.

## What's in here

| Fixture | Type | Chunk |
|---|---|---|
| `charts/where-time-goes.chart.json` | `horizontal-bar` | `chunks/chart.md` |
| `charts/onboarding-stats.chart.json` | `stat-infographic-3up` | `chunks/stat-infographic.md` |
| `charts/memory-pipeline.chart.json` | `flow-diagram` | `chunks/diagram.md` |

The `spec.typ` is a single ebook PDF that embeds all three inline using `chart()`, `stat-infographic()`, and `diagram()` Typst primitives.

## Run

```bash
./build.sh
```

Two-step pipeline:
1. For each `charts/*.chart.json`, `node renderers/vega-lite/compose.mjs` → `charts/*.svg`
2. `typst compile --root ../.. spec.typ output.pdf`

## What this proves

The visual system is composable. An author writes one ebook spec, drops in three chart fixtures of three different types, and gets one branded PDF. No design step in the middle.

The single composer (`renderers/vega-lite/compose.mjs`) handles all 8 registered fixture `type` values:
- 5 chart types (horizontal-bar, vertical-bar, vertical-bar-axes, radial-dramatic, radial-light)
- 3 stat-infographic variants (-2up, -3up, -4up)
- 2 diagram aliases (flow-diagram, diagram)

Each `*.chart.json` fixture's `type` field dispatches to the right composer function. Brand tokens (colors, gradients, typography) and Phosphor icons are loaded once at composer startup.
