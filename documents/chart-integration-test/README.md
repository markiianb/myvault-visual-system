# chart-integration-test

End-to-end proof that the `chart` asset-type chunk integrates with the `ebook` asset-type chunk: charts are authored as JSON fixtures, composed to SVG by the Vega-Lite renderer, and embedded into the PDF via the `chart()` Typst primitive.

## Run

```bash
./build.sh
```

This:
1. Bridges brand tokens (`renderers/vega-lite/build-tokens-vega.sh`)
2. Composes each `charts/*.chart.json` → `charts/*.svg` via `node renderers/vega-lite/compose.mjs`
3. Compiles `spec.typ` → `output.pdf` via Typst, embedding the SVGs

## Layout convention

```
documents/<deliverable>/
├── spec.typ              # the ebook Typst spec
├── charts/
│   ├── <id>.chart.json   # author this — fixture per chunks/chart.md
│   └── <id>.svg          # generated — DO NOT hand-edit
└── build.sh              # runs the two-step pipeline
```

Charts authored as JSON fixtures live alongside the spec they belong to, so the ebook is self-contained and reproducible.

## In the spec

Import the editorial primitives module and use `chart()`:

```typst
#import "../../renderers/typst/myvault-editorial.typ": *

#flow(running-header: "The case for clean filing")[
  ...body content...

  #chart("/documents/<deliverable>/charts/where-time-goes.svg", measure: "wide")

  ...more body...
]
```

**Path convention:** `chart()` paths are project-rooted absolute (start with `/`) because Typst resolves `image()` relative to the *calling module's file*, not the spec. `build.sh` sets `--root ../..` so paths starting with `/` resolve from the visual-system root.

**Measure:**
- `"1-col"` (default) — 640 pt content width inside an ebook page
- `"wide"`  — 720 pt for charts that earn the breath
- `"2-col"` — 300 pt for paired charts in a 2-column page

## What this proves

The two chunks compose: an ebook spec can describe charts as data, the build pipeline produces brand-locked chart SVGs from that data, and the Typst compiler embeds them at the correct measure with the right typography. No design step in the middle.
