---
type: plan
status: scoped
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [visual-system, ui-system, architecture, decision, scope]
summary: "Decision doc: should the brand design system (assets) and brand UI system (web/app components) be one unified system or two parallel systems? Recommendation: two parallel systems sharing a single foundations layer + tokens — the GitHub model. UPDATE 2026-04-29: Mark confirmed three-tier architecture but locked Phase 1 scope to Brand Design System ONLY. ui-system is deferred entirely (no scaffolding) until brand design system is shipping."
predecessors:
  - "[[visual-system-architecture-v2]]"
---

# Brand Design System vs Brand UI System — split decision

> **Status:** ✅ Architecture confirmed (three-tier split). ⏸ ui-system fully deferred. Phase 1 scope = `foundations/` + `visual-system/` only.
> **Date:** 2026-04-29
> **Question (resolved):** keep one visual system covering both assets and UI, or split them?

## ⚠️ Scope lock + structural correction (2026-04-29)

Mark confirmed: **work on the Brand Design System only for now. Brand UI System comes later.**

**Then a follow-up correction:** `tokens/` and `foundations/` should NOT be top-level siblings of `visual-system/`. They live INSIDE `visual-system/`. The mental model:

- `10-Brand/brand-system/` — handles **content** (voice, audience, messaging — what the content says)
- `10-Brand/visual-system/` — handles **visual brand application to that content** (how the content looks, lays out, renders). Self-contained: holds its own tokens, foundations, asset-specific chunks.

The two systems are **parallel siblings**, not nested with a shared foundations layer. When ui-system arrives later, we'll decide independently whether it gets its own tokens/foundations or references visual-system's.

This means:
- ✅ Build `10-Brand/visual-system/` with `tokens/`, `foundations/`, and asset chunks all inside it
- ❌ Do NOT build `10-Brand/tokens/` or `10-Brand/foundations/` as separate top-level directories
- ⏸ Do NOT scaffold `10-Brand/ui-system/` at all yet
- ⏸ Do NOT build `myvault-tools/brand-studio/` — renderers are out of Phase 1 scope; the system build is vault-only

**Implication for §4 directory tree:** the three-tier `tokens/ + foundations/ + visual-system/ + ui-system/` layout from this doc is OBSOLETE. The corrected layout is one tier:

```
10-Brand/
├── brand-system/                 # content — already exists
└── visual-system/                # visual — being built
    ├── tokens/                   # inside visual-system
    ├── foundations/              # inside visual-system
    │   └── (color, type, gradient, spacing, logo, iconography, etc.)
    ├── chunks/                   # asset-specific
    │   └── (presentation, social, document, ebook, chart, email)
    ├── skills/, agents/, commands/
    └── _manifest.yaml, _retrieval-rules.yaml
```

---

## 0. Recommendation in two lines

**Split into two parallel systems with a shared foundations layer.** Mirror GitHub's model: brand toolkit (assets) and Primer Brand / Primer Product (UI) sit beside each other, both consuming a single token primitive layer. Same DNA, different opinions about what a "Button" or "Card" looks like in each context.

---

## 1. The question

We have two distinct producers of brand artefacts:

1. **Brand assets** — presentations, social posts, documents/PDFs, ebooks, charts, board reports, marketing one-pagers. Static. Designer-led. Slower-moving canon. Lives outside the product.
2. **Brand UI** — the future MyVault app, the tools site (`tools.myvaultai.com`, Next.js + Tailwind), the Framer marketing site (eventually moved to code), internal admin tools. Interactive. Engineer-led. Faster-moving. Lives inside the product.

Both share the same **brand DNA** (Vault Teal, PT Serif + Lato, the same logo, the same gradient palette). They diverge sharply at the **artefact layer**:

- A button on a social image is a Satori-rendered SVG inside a 1080×1350 frame. It has no hover state, no focus ring, no click handler, no ARIA role.
- A button in the app is a React component with hover/focus/active/disabled states, accessibility props, click handlers, motion, responsive sizing.

Same brand DNA. Completely different concerns.

---

## 2. The GitHub reference

GitHub runs three systems side by side:

| System | What it is | Audience |
|---|---|---|
| [brand.github.com](https://brand.github.com) | "Brand in action" — voice, photography, illustration, logo, social toolkit. Mostly guidelines, not code. | Marketers, designers, partners |
| [primer.style/brand](https://primer.style/brand) | **Primer Brand** — React component library for marketing sites + brand-level layout primitives | Marketing-site engineers |
| [primer.style](https://primer.style) | **Primer** — React component library for product UI | Product engineers |

All three inherit from **Primer Primitives** (the token layer). They share colors, type, spacing, but they ship **different component libraries** because a hero section on a marketing page has different ergonomics than a data table in the product app.

For MyVault, the parallel is:

| GitHub | MyVault equivalent |
|---|---|
| brand.github.com | `10-Brand/visual-system/` (presentations, social, documents, ebooks, charts) |
| Primer Brand | `10-Brand/ui-system/` for marketing-site + tools components (initially) |
| Primer | (future) `10-Brand/ui-system/product/` when the MyVault app ships |
| Primer Primitives | `10-Brand/foundations/` + `10-Brand/tokens/` (NEW shared layer) |

We don't need three systems on day one. We need **two systems + one shared foundations layer**, with a hook for adding a product UI sub-system later if the app's needs diverge meaningfully from the marketing/tools UI.

---

## 3. Three options, evaluated

### Option A — One unified `visual-system`

All chunks under one roof. Web components are just another renderer (Tailwind v4) alongside Marp/Satori/Typst. The button chunk covers both static assets and interactive components.

**Pros:**
- Simpler navigation — one manifest, one retrieval-rules file
- Zero duplication
- Faster to ship Phase 1

**Cons:**
- Conflates two different audiences (designers shipping social, engineers shipping app code)
- A `buttons-and-ctas` chunk has to cover BOTH the Stream A pill button on a social image AND the interactive React button — two different specs, two different review axes
- The UI system needs concerns the asset system never has: interaction states, focus management, responsive behavior, animation timing, accessibility patterns, component composition, RTL support, theming
- Different cadences — brand assets evolve quarterly; UI components evolve weekly with product
- Hard to give clean ownership (Mark owns brand assets; engineers own UI)

### Option B — Two parallel systems + shared foundations ⭐ recommended

Three layers:

1. **`10-Brand/foundations/`** — shared chunks: color-system, typography-system, gradient-system, spacing-and-grid, logo-usage, iconography, motion, elevation, imagery
2. **`10-Brand/visual-system/`** — brand DESIGN system (assets): presentation-canon, social-canon, document-patterns, chart-patterns, ebook-canon, etc. Renderers: Marp, Satori, Typst, Vega-Lite.
3. **`10-Brand/ui-system/`** — brand UI system (web/app): buttons, forms, cards, navigation, layout-patterns, interaction-states, responsive-patterns, accessibility-patterns. Renderer: Tailwind v4 + React.

Both systems inherit from `foundations/`. Both consume the same `tokens/brand.tokens.json`. Each has its own manifest, retrieval rules, agents, commands.

**Pros:**
- Each system has clear scope, ownership, cadence
- Components and patterns can be specialized per audience
- Mirrors the GitHub / Atlassian / Material Design model — proven at scale
- New asset types or new UI patterns don't bloat the other system
- Ownership maps to people (Mark owns foundations + visual-system; UI engineer owns ui-system)
- Brand DNA stays unified through `foundations/`; drift is impossible at the token layer

**Cons:**
- Two manifests, two retrieval-rules files — slightly more navigation overhead
- "Where does this chunk belong?" can be ambiguous at the seams (e.g., is `cards-and-containers` foundations, visual, or UI?) — answer: usually it's all three at different fidelities, with the foundations chunk defining the abstract pattern and the system-specific chunks defining concrete specs

### Option C — One system with explicit "tracks"

Keep `visual-system/` as the umbrella, but split into `visual-system/assets/` and `visual-system/ui/` with separate manifests but shared infrastructure.

**Pros:**
- Less duplication than B
- Single repo / plugin

**Cons:**
- Same audience-conflation issue as A in practice
- Half-measure that buys 80% of B's complexity for 50% of its benefit

### Verdict

**B.** The audiences, cadences, renderers, and concerns diverge too sharply for one system. The shared foundations layer prevents drift. The split lets each system optimize for its own producers. GitHub, Atlassian, Shopify, and Material Design all converged on this pattern — that's a strong prior.

---

## 4. The refactored directory tree

> **Superseded** by the scope-lock correction at the top of this doc (2026-04-29). The
> three-tier `tokens/ + foundations/ + visual-system/ + ui-system/` layout proposed below
> is obsolete; the corrected layout is one tier with `tokens/` and `foundations/` living
> inside `visual-system/`. Kept for reference.


This refactors the Architecture v2 layout. **Notably, several chunks move from visual-system to either foundations or ui-system.**

```
10-Brand/
│
├── tokens/                                   # ⭐ NEW — single source of truth for values
│   ├── brand.tokens.json                     # W3C DTCG, extracted from Figma
│   ├── extract.ts                            # Extract script (one-way: Figma → JSON)
│   └── README.md
│
├── foundations/                              # ⭐ NEW — chunks shared by both systems
│   ├── _manifest.yaml
│   ├── color-system.md
│   ├── typography-system.md
│   ├── gradient-system.md
│   ├── spacing-and-grid.md
│   ├── motion-and-animation.md
│   ├── elevation-and-shadows.md
│   ├── logo-usage.md
│   ├── iconography.md
│   ├── imagery-and-illustration.md
│   ├── terminology-visual.md
│   └── brand-compliance-rules.md             # universal rules (Vault Teal reservation, weight rules, etc.)
│
├── visual-system/                            # Brand DESIGN system — for ASSETS
│   ├── 00-DESIGN-PROPOSAL.md                 # existing
│   ├── _plan/                                # existing
│   ├── _manifest.yaml                        # references foundations/
│   ├── _retrieval-rules.yaml                 # task profiles: presentation, social, document, chart, ebook, email
│   ├── README.md, CLAUDE.md
│   ├── chunks/                               # ASSET-specific chunks
│   │   ├── presentation-canon.md
│   │   ├── social-canon.md
│   │   ├── document-patterns.md
│   │   ├── ebook-canon.md
│   │   ├── chart-canon.md
│   │   ├── email-canon.md
│   │   └── layout-patterns-assets.md         # poster/cover/spread layouts
│   ├── skills/visual-kit/
│   ├── agents/                               # asset designers + reviewers
│   │   ├── design/
│   │   │   ├── presentation-designer.md
│   │   │   ├── social-designer.md
│   │   │   ├── document-designer.md
│   │   │   ├── chart-designer.md
│   │   │   └── ebook-designer.md
│   │   └── review/                           # vision-enabled, scoped to assets
│   │       └── ... (5 reviewers)
│   ├── commands/                             # /myvault:design-* (asset slash commands)
│   ├── presentations/                        # existing investor-deck-test
│   └── references/                           # line-art refs etc.
│
└── ui-system/                                # ⭐ NEW — Brand UI system — for WEB/APP
    ├── _manifest.yaml                        # references foundations/
    ├── _retrieval-rules.yaml                 # task profiles: component, page, dashboard, form, marketing-section
    ├── README.md, CLAUDE.md
    ├── chunks/                               # UI-specific chunks
    │   ├── buttons-and-ctas.md               # interactive button: states, ARIA, sizing
    │   ├── forms-and-inputs.md
    │   ├── cards-and-containers.md
    │   ├── navigation-patterns.md
    │   ├── layout-patterns-web.md            # hero, feature grid, pricing, footer
    │   ├── interaction-states.md             # hover, focus, active, disabled, loading
    │   ├── responsive-patterns.md            # breakpoints, mobile-first rules
    │   ├── animation-patterns.md             # motion timing per UI context
    │   ├── accessibility-patterns.md         # WCAG, focus management, screen-reader
    │   └── theming-patterns.md               # light/dark, brand variants
    ├── skills/ui-kit/
    ├── agents/
    │   ├── design/
    │   │   ├── component-builder.md          # builds React component from chunk + brief
    │   │   ├── page-builder.md               # composes a marketing/tools page
    │   │   └── pattern-iterator.md           # screenshot loop for UI work
    │   └── review/
    │       ├── component-reviewer.md         # checks component vs canon
    │       ├── accessibility-reviewer.md     # WCAG audit
    │       └── responsive-reviewer.md        # tests breakpoints
    └── commands/                             # /myvault:build-* (UI slash commands)
        ├── build-component.md                # /myvault:build-component
        ├── build-page.md                     # /myvault:build-page
        ├── build-marketing-section.md
        └── ui-review.md                      # /myvault:ui-review
```

**Changes from v2:**

| Chunk in v2 | New home |
|---|---|
| `color-system`, `typography-system`, `gradient-system`, `spacing-and-grid`, `motion-and-animation`, `elevation-and-shadows`, `logo-usage`, `iconography`, `imagery-and-illustration`, `terminology-visual`, `brand-compliance-rules`, `accessibility-minimums` | → `foundations/` |
| `presentation-layouts` → renamed `presentation-canon` | → `visual-system/chunks/` |
| `social-formats` → renamed `social-canon` | → `visual-system/chunks/` |
| `document-patterns`, `data-viz-patterns` → renamed `chart-canon`, `ebook-canon` ⭐ NEW | → `visual-system/chunks/` |
| `buttons-and-ctas`, `cards-and-containers`, `forms-and-inputs` | → **`ui-system/chunks/`** |
| `layout-patterns` | → **split**: `layout-patterns-assets.md` (visual) + `layout-patterns-web.md` (ui) |
| `ai-generation-prompts` (Phase 2+) | → `foundations/` (universal) |
| 5 new ui-system chunks (interaction-states, responsive, animation, accessibility, theming) | → **`ui-system/chunks/`** |

**Total chunk count:** ~12 foundations + ~7 visual-system + ~10 ui-system = **~29 chunks** (was 22). Larger, but with clearer ownership and lower per-chunk complexity.

---

## 5. How agents resolve chunks across systems

> **Superseded** by the scope-lock correction at the top of this doc. ui-system is fully
> deferred — there is no cross-system chunk resolution to design. Kept for reference.


A retrieval rule can declare chunks from any of the three layers. Example for a presentation:

```yaml
# visual-system/_retrieval-rules.yaml
task_profiles:
  presentation:
    description: "Slide deck via Marp"
    renderer: marp
    inherits_from: foundations         # ⭐ NEW field — resolves cross-system chunks
    always_load:
      # foundations layer
      - "foundations/color-system"
      - "foundations/typography-system"
      - "foundations/gradient-system"
      - "foundations/logo-usage"
      - "foundations/brand-compliance-rules"
      # visual-system layer
      - "presentation-canon"
    load_if_relevant:
      - "foundations/iconography"
      - "chart-canon"                  # if data viz appears
    token_budget: 4500
```

For a UI task:

```yaml
# ui-system/_retrieval-rules.yaml
task_profiles:
  component:
    description: "Build a React component"
    renderer: tailwind-v4
    inherits_from: foundations
    always_load:
      - "foundations/color-system"
      - "foundations/typography-system"
      - "foundations/spacing-and-grid"
      - "foundations/brand-compliance-rules"
      - "interaction-states"
      - "accessibility-patterns"
    load_if_relevant:
      - "buttons-and-ctas"
      - "forms-and-inputs"
      - "cards-and-containers"
      - "responsive-patterns"
    token_budget: 5000
```

The `visual-kit` and `ui-kit` skills both know how to resolve `foundations/<chunk>` paths in addition to their own chunks. Verbal-system stays unchanged.

---

## 6. Where current artefacts live under the new model

| Current artefact | System | Notes |
|---|---|---|
| Investor deck (Figma) | `visual-system/` test fixture | Already there |
| Social posts (Figma Social page) | `visual-system/` references | Already there |
| Ebook covers + 13 page types (Figma) | `visual-system/` references | Memory entries port to `ebook-canon.md` |
| Charts/diagrams canon (memory) | `visual-system/chart-canon.md` | Memory ports here |
| Logo PNG/SVG (`10-Brand/Logo/`) | `foundations/logo-usage.md` references it | File location unchanged |
| `tools.myvaultai.com` (Next.js + Tailwind) | `ui-system/` consumes | Tailwind config feeds from generated tokens |
| Framer marketing site | (eventually) `ui-system/` if/when migrated to code | Today: not in code, so can't be component-bound |
| Future MyVault app | `ui-system/` (eventually `ui-system/product/` if it diverges) | Phase 4+ |
| Verbal `brand-system` (existing 17 chunks) | unchanged | Its `visual-system.md` chunk gets demoted to a 50-token pointer |

---

## 7. Phasing under the split

> **Superseded** by the scope-lock correction at the top of this doc. Phase 1 covers
> visual-system only; ui-system is deferred entirely. Kept for reference.


**Phase 1 — Foundations + visual-system, ui-system scaffolded but empty (5-7 days)**

- Build `foundations/` (12 chunks) and hydrate the universal ones (color, typography, gradient, spacing, logo, iconography, compliance)
- Build `visual-system/` per Architecture v2 — 7 asset chunks + Marp pipeline + 1 working command (`/myvault:design-presentation`)
- Scaffold `ui-system/` (manifest + retrieval rules + chunk frontmatter only — no content yet, no commands yet)

**Phase 2 — More asset renderers (3-4 weeks)**

- Hydrate remaining visual-system chunks (social-canon, ebook-canon, chart-canon, document-patterns)
- Build Satori, Typst, Vega-Lite renderers + their commands
- ui-system stays scaffolded

**Phase 3 — UI system goes live (2-3 weeks)**

- Hydrate ui-system chunks (buttons, forms, cards, layouts, states, responsive, accessibility, theming)
- Tailwind v4 token integration — consume `foundations/` tokens
- First `/myvault:build-component` command working
- Apply to `tools.myvaultai.com` first, then to a marketing-site rebuild

**Phase 4 — Product UI (when the app ships)**

- Decide if `ui-system/` needs an internal split into `ui-system/marketing/` and `ui-system/product/` (the GitHub Primer Brand vs Primer split)
- If yes, factor; if no, keep one ui-system

---

## 8. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Drift between foundations and the two systems | Token extraction is one-way from Figma; `foundations/` is the only token source either system reads; drift is impossible at the token layer |
| Chunks get duplicated across systems (e.g., both have "buttons") | Strict naming + frontmatter rule: foundations chunks define abstract patterns; system chunks define concrete specs. The asset "button" is `social-canon.md` covering pill primitive; the UI "button" is `ui-system/buttons-and-ctas.md`. Same brand, different artefact. |
| Decision paralysis on chunk placement | Three-question test: (1) Does it apply universally? → foundations. (2) Is it about static assets? → visual-system. (3) Is it about interactive UI? → ui-system. |
| ui-system feels premature when nothing in code consumes it yet | It IS premature in Phase 1. Scaffold only — no chunks, no agents, no commands. Hydrate when the tools site or app needs it (Phase 3). |
| Two manifests double the navigation cost | Single index in `10-Brand/Brand MOC.md` lists both; routing skills know where each chunk lives |

---

## 9. What this changes in Architecture v2

Architecture v2 is mostly correct, but the directory tree and chunk taxonomy need this refactor. Specifically:

- `10-Brand/visual-system/` no longer holds `buttons-and-ctas`, `forms-and-inputs`, `cards-and-containers`, `web-component` workflow → those move to `ui-system/`
- `10-Brand/visual-system/` no longer holds the foundation chunks → those move to `10-Brand/foundations/`
- The renderer registry still applies, but Tailwind v4 + React Email move primarily to ui-system
- Marp / Satori / Typst / Vega-Lite stay primarily in visual-system

The four-layer extension (tokens / specs / renderers / vision review) still applies. It applies to BOTH systems uniformly.

---

## 10. Open questions for Mark

**Blockers (for Phase 1 directory layout):**

1. **Confirm the three-tier split** (`foundations/` + `visual-system/` + `ui-system/`)?
2. **Should `foundations/` and `tokens/` be inside `10-Brand/` or sit at the vault root?** Recommend inside `10-Brand/` so the verbal-system, visual-system, ui-system, and foundations all live in one domain.
3. **Naming** — `ui-system` or `app-ui` or `product-ui` or `primer-style` (in homage to GitHub)? Recommend **`ui-system`** for symmetry with `visual-system`.

**Non-blockers (resolve at Phase 3 entry):**

4. Inside `ui-system`, do we anticipate a future `marketing/` vs `product/` split (the GitHub Primer Brand vs Primer move)? My recommendation: **defer** until the MyVault app's UI needs visibly diverge from the marketing-site UI.
5. Does the existing `myvault-tools/` Next.js app drive ui-system requirements, or do we plan ui-system top-down? Recommend **bottom-up**: hydrate ui-system as `myvault-tools/` needs grow; don't pre-spec components nobody is using.

---

## 11. The recommended call

- **Yes**, split into two systems with shared foundations
- **Yes**, mirror GitHub's pattern at the architecture level
- **Yes**, scaffold both systems in Phase 1 but only hydrate `foundations/` and `visual-system/` now
- **Yes**, `ui-system/` waits until Phase 3 when the tools site or future app drives it
- **No**, don't pre-build a "Primer Brand vs Primer" internal split inside ui-system; defer that

This keeps Phase 1 focused (the existing 5-6 day plan still applies, just with `foundations/` as a named layer instead of inside `visual-system/`), and leaves room to scale into a full app UI system without ever needing to refactor.

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial — recommends three-tier split (foundations + visual-system + ui-system) following the GitHub model. Refactors v2 directory tree and chunk taxonomy. | Mark + Claude |
