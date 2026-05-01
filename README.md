# MyVault visual system

In-progress visual production system. Chunks define what good looks like per asset type (ebook, presentation, chart). Renderers turn specs into PDFs / decks / charts / social. Tokens are the single source of truth, bridged into every renderer.

## 5-stop tour (open in this order)

1. **`documents/ebook-test/privacy-guide.pdf`** — see the output first. 19-page AI Privacy Guide rendered through the pipeline.
2. **`chunks/ebook.md`** + **`chunks/_manifest.yaml`** — the contracts. HARD rules + MENU patterns + renderer pin per asset type. Also see `chunks/presentation.md` and `chunks/chart.md`.
3. **`documents/ebook-test/workflow.md`** — the principle. Editorial-first: brand provides rules + primitives, document provides intent, system composes. Read this before authoring.
4. **`renderers/typst/myvault-editorial.typ`** — the active editorial code. Companion renderers in `renderers/marp/` (decks), `renderers/vega-lite/` (charts), `renderers/satori/` (social).
5. **`_plan/visual-system-architecture-v2.md`** §4 — the renderer registry. One renderer per asset type, pinned: Typst (editorial), Marp (presentations), Vega-Lite (charts), Satori (social). Saves relitigating the renderer choice.

## Also useful

- **`STATUS.md`** — running log of phases shipped. "Where are we" doc.
- **`tokens/brand.tokens.json`** — single source of truth for color, type, space. Every renderer bridges from this.
- **`_plan/visual-system-architecture-v2.md`** — strategic context if you want to know where this is all going.

## Heads-up

Directory still has some scratch and intermediate files I haven't pruned yet — ignore anything tagged superseded or `v1`/`v2`/`v3`. The canonical pieces are listed above.
