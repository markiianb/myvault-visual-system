---
type: test-fixture
status: complete
owner: mark + claude
created: 2026-04-30
updated: 2026-05-01
tags: [visual-system, ebook, typst, phase-2-test, end-to-end]
summary: "End-to-end test of the chunks/ebook.md contract. The canonical proof is a real-content 19-page editorial deliverable — 'How to use AI without giving up your data' — rendered via the active editorial primitives module (renderers/typst/myvault-editorial.typ). An earlier 18-page fixture rendered via the legacy page-stamp template is preserved here as historical reference."
---

# Ebook test fixture

## What this is

The end-to-end test for `chunks/ebook.md`. Validates that the chunk contract produces a brand-correct PDF when rendered through the canonical Typst pipeline.

Two test artifacts coexist in this directory. **Read this section before opening anything.**

| Artifact | Status | Renderer | Spec | Output |
|---|---|---|---|---|
| **AI Privacy Guide** (canon) | ✅ active | `renderers/typst/myvault-editorial.typ` (composable primitives) | `privacy-guide-spec.typ` | `privacy-guide.pdf` (19 pages) + `privacy-pages-v4/` per-page PNGs |
| The Architecture of Trust (legacy) | 🗄 historical | `renderers/typst/myvault-ebook.typ` (page-stamp template, kept for migration reference only) | `spec.typ` | `output.pdf` + `pages/` per-page PNGs |

**The canon is the AI Privacy Guide.** It validates the current chunk contract (v1.4, primitives-not-templates) against a real editorial deliverable. The Architecture of Trust fixture validated v1.1 against the older page-stamp template; it's preserved because the legacy template is still in the renderers/ directory as a migration safety net.

## Pipeline (canonical path)

```bash
typst compile --root visual-system --font-path renderers/typst/fonts \
  documents/ebook-test/privacy-guide-spec.typ \
  documents/ebook-test/privacy-guide.pdf
```

The spec imports `myvault-editorial.typ`, which imports `tokens.typ` (auto-generated from `tokens/brand.tokens.json` by `renderers/typst/build-tokens.sh`) and the logo SVGs in `assets/logo/`. The fonts directory bundles Lato Regular + PT Serif Regular.

## What this test validated

- All 7 HARD rules (R-EBOOK-001 through R-EBOOK-007) at the v1.4 geometry baseline
- The 5 editorial-first primitives added in v1.3 — `section-opener-hero`, `hero-stats`, `model-grid`, `takeaways`, `pull-page`
- Foundation rule inheritance — R-COLOR (every surface and text color resolved from tokens), R-TYPE (PT Serif Regular + Lato Regular only, no bold/medium/italic), R-LOGO (Icon variants flip per surface pairings), R-ICON (signal-go markers on lists + endnotes)
- Surface-flip on dramatic-register pages
- Signal-go reservation (Title Page + TOC only)
- The editorial-first principle from `workflow.md` — primitives flowing through `editorial-doc`, not page-stamp templates emitting one page per call

## Files in this directory

### Canon
- `privacy-guide-spec.typ` — the 19-page deliverable spec
- `privacy-guide.pdf` — the rendered output
- `privacy-pages-v4/` — per-page PNG renders for visual reference

### Reference
- `figma-reference.md` — audit of the Figma `eBooks & Documents` page (the visual canon source). When the chunk and Figma disagree, Figma wins until the chunk is updated to match.
- `figma-reference/` — PNG snapshots of canonical Figma frames used during the audit
- `workflow.md` — editorial-first principle: brand provides rules + primitives, document provides intent, system composes. Read this before authoring a new ebook spec.

### Legacy / iteration history
- `spec.typ` — the legacy "Architecture of Trust" spec (uses `myvault-ebook.typ`)
- `output.pdf` / `output-v2.pdf` — legacy rendered outputs
- `pages/`, `pages-v2/` — legacy per-page PNGs
- `privacy-pages/`, `privacy-pages-v2/`, `privacy-pages-v3/` — earlier privacy-guide iteration renders before v4 stabilized
- `comparison.md`, `cycle2-findings.md` — iteration notes from the legacy fixture

The legacy artifacts are preserved as a migration safety net for `myvault-ebook.typ`. If the legacy template is ever retired, these can be deleted.
