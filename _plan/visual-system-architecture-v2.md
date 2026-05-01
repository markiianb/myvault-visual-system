---
type: plan
status: proposal
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [visual-system, architecture, pipeline, renderers, tokens, decision]
summary: "Focused architecture proposal for the MyVault visual brand system. Translates Figma (source of tokens, layouts, examples) into agent language so AI agents can regenerate brand assets via the best-fit deterministic renderer per asset type. Verdict: keep verbal-system architecture pattern, add four new layers (tokens, specs, renderers, vision review). Renderer per asset type is pinned: Marp (presentations), Satori (social), Typst (PDFs/ebooks), Vega-Lite (charts), React Email (email), Tailwind v4 (web). Figma is design lab + reference, never a renderer."
predecessors:
  - "[[00-DESIGN-PROPOSAL]]"
  - "[[visual-system-pipeline-plan]]"
---

# Visual System Architecture v2 — translation pipeline + renderer registry

> **Status:** ⚠️ Partially superseded by 2026-04-29 scope corrections — see notice below.
> **Date:** 2026-04-29
> **Goal:** translate Figma into agent language so an agent can regenerate any MyVault brand asset using the best-fit deterministic renderer per asset type. Figma never renders output.

## ⚠️ Scope corrections (2026-04-29, Mark)

Three changes to this doc's architecture:

1. **`myvault-tools/brand-studio/` is OUT OF SCOPE for the system build.** This doc planned the renderer + template + CLI layer to live in `myvault-tools/`. That's a testing/rendering concern, not a system-building concern. We build the system (chunks, tokens, structure) in the vault first; figure out where renderers live and how to test later. **Phase 1 ends at the chunks + token JSON + scaffold — no Marp install, no Satori install, no `brand-studio/` directory.**

2. **Tokens and foundations live INSIDE `visual-system/`, not as separate top-level directories.** The structure is two parallel systems:
   - `10-Brand/brand-system/` — the **content** system (voice, audience, messaging — already exists)
   - `10-Brand/visual-system/` — the **visual** system (design + layout + applying visual brand to content). Self-contained: holds its own `tokens/`, `foundations/`, asset chunks, skills, agents, commands.

   The two systems are parallel siblings. brand-system handles "what the content says"; visual-system handles "what the content looks like." Renderers are downstream of both.

3. The 3-tier split with `ui-system/` as a sibling (proposed in [[03-brand-design-vs-ui-system]]) is **deferred entirely.** When ui-system arrives later, we'll decide whether it gets its own tokens/foundations or references visual-system's.

**Sections of this doc still valid:**
- §1 (the pipeline diagram, conceptually)
- §2 (verdict on cloning verbal-system pattern)
- §3 (the four new layers — tokens, knowledge, specs, vision-review)
- §4 (renderer registry — Marp/Satori/Typst/Vega-Lite/React Email/Tailwind v4) as **future** pinning when we get to rendering
- §6 (chunk taxonomy, except chunks no longer split into separate top-level systems)

**Sections superseded:**
- §3 Layer C (Specs in `myvault-tools/brand-studio/`) — specs are NOT part of Phase 1
- §4's "implementation in myvault-tools" framing — out of scope
- §8 Phase 1.4 + 1.5 (renderer install, template, command, vision review) — moved to a later phase
- §11 question 2 (where `brand-studio/` lives) — moot

---

## 0. Verdict in three lines

1. **Keep the verbal-system architecture pattern** (chunks + skills + agents + commands). Don't rewrite from scratch — the pattern works.
2. **Extend it with four new layers** that visual needs and verbal didn't: machine-readable tokens, per-asset specs, renderers, and vision-enabled review.
3. **Pin one renderer per asset type.** Marp / Satori / Typst / Vega-Lite / React Email / Tailwind v4. Figma is the design lab; never a renderer.

---

## 1. Mark's framing as a pipeline

```
Figma (canonical source)
  ├─ tokens & variables  ──┐
  ├─ paint & text styles ──┤
  └─ layouts & examples  ──┘
                            │
                  [TRANSLATION PASS]
                            │
   ┌────────────────────────┼─────────────────────────┐
   │                        │                         │
   ▼                        ▼                         ▼
tokens.json             chunks.md                 spec templates
(machine,             (agent prose,              (renderer input,
 deterministic)         frontmatter)              one per asset)
   │                        │                         │
   └─────────────┬──────────┴────────────┬────────────┘
                 │                       │
                 ▼                       ▼
        Agent reads chunks        Agent fills spec template
        + tokens to make          using brief + tokens
        on-brand decisions
                                          │
                                          ▼
                               Renderer (Marp / Satori / Typst /
                               Vega-Lite / React Email / Tailwind)
                                          │
                                          ▼
                               PNG / PDF / HTML / SVG / PPTX
                                          │
                                          ▼
                               Vision-review agent screenshots
                               and validates against canon
                                          │
                                          ▼
                                  Approved asset
```

Three things move left-to-right: the **token values** (numeric truth), the **canon prose** (rules, intent, examples), and the **renderer-specific spec** (the structured input that produces the actual file).

---

## 2. Verdict on the verbal-system pattern

### What translates well (keep)

| Verbal pattern | Why it works for visual |
|---|---|
| **Chunked knowledge** (~280-1250 token markdown files with YAML frontmatter) | Same retrieval economics. An agent loading a `social-canon` chunk for a social post is the right shape. |
| **Manifest + retrieval rules** (`_manifest.yaml`, `_retrieval-rules.yaml` mapping task profiles to chunk subsets with token budgets) | Same: a presentation task profile loads `presentation-canon`, `typography-system`, `color-system`, `brand-compliance`. Verbal agents already prove the pattern. |
| **Router skills** (`brand-kit` loads chunks; `content-craft` routes to workflows) | Same: `visual-kit` loads visual chunks; `asset-craft` routes to per-renderer workflows. |
| **Agents with worldview + signature moves + multi-phase protocol** | Same: a `presentation-designer` agent has axioms ("clarity over density"), signature moves (canonical slide-types), and a Brief→Spec→Render→Review protocol. |
| **`/myvault:` slash commands** invoking agents | Same: `/myvault:design-presentation`, `/myvault:design-social`. |
| **Plugin-distributable** | Visual system can be its own plugin, or extend `myvault-content-plugin`. |
| **Parallel review swarm** (4 agents in `/myvault:edit`) | Same: 5 vision-enabled reviewers (color, typography, layout, brand-elements, accessibility). |

### What doesn't translate (gaps to fill)

| Gap | Why verbal doesn't have it | What visual needs |
|---|---|---|
| **Machine-readable token layer** | Verbal "tokens" are just words (banned-words list, voice adjectives). No format to enforce. | W3C DTCG JSON file with primitive + semantic tokens. Generated outputs (CSS, Tailwind, Typst, JS) consumed by renderers. |
| **Spec templates per asset** | Verbal output is markdown text. Renderer is the human reader. | Per-asset spec format (markdown for Marp, JSX for Satori, JSON for Vega, `.typ` for Typst). Each chunk pins one. |
| **Renderer registry** | No renderers — `/myvault:write` produces text directly. | Explicit "this asset type uses this renderer" mapping. Rationale per choice. |
| **Vision-enabled review** | Reviewers read text. | Reviewers screenshot rendered output and pass to vision model with the canon chunk in context. |
| **Sync mechanics** | None needed — markdown is the source. | Figma → tokens.json extract script (one-way for now). Re-runnable, deterministic, committed to vault. |

### Verdict

**Clone with extensions.** Don't rewrite. Don't fork. Adopt the existing four-layer pattern (chunks/skills/agents/commands) and add four new layers (tokens/specs/renderers/vision). The verbal system doesn't need a rewrite either — its `visual-system.md` chunk gets demoted to a 50-token pointer at the new sibling system.

---

## 3. The four new layers

### Layer A — Tokens (machine, deterministic)

**Source of values:** Figma collection "MyVault Tokens" + 5 gradient paint styles + 12 text styles.

**Extracted to:** `10-Brand/visual-system/tokens/brand.tokens.json` (W3C DTCG, stabilized as v1.0 in October 2025).

**Built outputs** (via Style Dictionary v4 in `myvault-tools/brand-studio/`):
- `tokens.css` — CSS custom properties
- `tokens.ts` — TypeScript constants for Satori/React Email JSX
- `tailwind.tokens.js` — Tailwind v4 `@theme` config
- `tokens.typ` — Typst variables for documents
- `vega.config.json` — Vega-Lite scheme config
- `marp.theme.css` — Marp theme CSS

**Sync direction:** Figma → JSON → outputs. One-way. Extract script re-runnable on demand; a chunk's frontmatter declares "needs token re-extract if Figma changes X."

**Why DTCG:** every modern tool (Style Dictionary, Tokens Studio, Specify, Supernova, future Figma Variables export) consumes it. Portable. Future-proof.

### Layer B — Knowledge (prose, agent-readable)

Markdown chunks with YAML frontmatter, in `10-Brand/visual-system/brand-system/{foundations,identity,components,patterns,guardrails}/`.

**New frontmatter fields** (extending verbal-system frontmatter):

```yaml
chunk_id: "social-canon"
domain: "patterns"
renderer: "satori"               # NEW — pins which renderer this chunk's assets use
spec_format: "tsx"               # NEW — what shape an agent produces (jsx, md, json, typ, html)
template_path: "brand-studio/templates/social/og-default.tsx"  # NEW — concrete starting point
token_dependencies:              # NEW — which token groups must be loaded with this chunk
  - "color/core"
  - "color/secondary"
  - "gradient/cool"
  - "type/display"
  - "type/body"
  - "space"
visual_examples:                 # NEW — Figma node URLs that exemplify the canon
  - "figma://Pm31BDHj34WjJ7NjBK4Ady?node-id=120-10513"  # Sm-post 29-03 - 1
  - "figma://Pm31BDHj34WjJ7NjBK4Ady?node-id=114-10437"  # Social 06 / Category Card
visual_anti_examples:            # NEW — what the canon explicitly excludes
  - "rule: no SF Pro outside Stream B; PT Serif/Lato Regular only"
review_axes:                     # NEW — which review agents apply
  - color-reviewer
  - typography-reviewer
  - layout-reviewer
  - brand-element-reviewer
context_tags:
  - social
  - 1080x1350
  - ig-portrait
  - linkedin-post
depends_on:
  - color-system
  - typography-system
  - gradient-system
  - brand-compliance-rules
token_count: ~600
version: "1.0"
last_updated: "2026-04-29"
status: "active"
```

The five new fields make the chunk **executable**: an agent can read the chunk and know exactly which renderer to invoke, which spec format to produce, which template to start from, which tokens to load, and which reviewers to spawn.

### Layer C — Specs (per-asset, structured)

> **Superseded** by the scope corrections at the top of this doc. Specs in
> `myvault-tools/brand-studio/` are NOT part of Phase 1. Kept for reference.


A spec is the **structured input** an agent produces and a renderer consumes. The spec format is determined by the renderer.

| Asset type | Renderer | Spec format | What an agent writes |
|---|---|---|---|
| Slide deck | Marp | Markdown with slide-break separators + theme directive | `presentation.md` |
| Single social image | Satori | JSX file exporting `<Frame>{...}</Frame>` | `og.tsx` |
| Multi-slide carousel | Satori (series) | JSX array | `carousel.tsx` |
| PDF document | Typst | `.typ` markup | `report.typ` |
| Chart | Vega-Lite | JSON spec | `chart.json` |
| Email | React Email | TSX component | `email.tsx` |
| Web component | Tailwind v4 + React | TSX component | `Component.tsx` |
| Ebook | Typst (or Pandoc HTML→PDF) | `.typ` markup | `ebook.typ` |

**Specs live in `myvault-tools/brand-studio/`** — they're code that needs Node deps and a build step. The vault chunks describe how to produce them; the code lives where it executes.

### Layer D — Renderers (deterministic, code-driven)

Pinned per asset type. Each is a 2025-2026 best-of-breed for AI-driven generation, headless rendering, and clean DTCG token binding.

See §4 for the full registry and rationale.

### Layer E (already exists) — Skills, agents, commands

Same as verbal-system. `visual-kit` skill loads chunks; `asset-craft` routes to renderer-specific workflows; agents follow Brief→Spec→Render→Review protocol; commands invoke agents.

### Layer F (new at the end) — Vision-enabled review

Five review agents spawn in parallel after a render:

- `color-reviewer` — screenshot + `color-system` chunk → "are colors used correctly per the 60/30/10 rule and Vault Teal reservation?"
- `typography-reviewer` — `typography-system` → "is the type scale respected? 18pt floor? Lato/PT Serif Regular only?"
- `layout-reviewer` — `layout-patterns` + asset-specific canon → "does composition match canon? Whitespace ratio? Grid?"
- `brand-element-reviewer` — `logo-usage` + `iconography` → "logo placement, clear space, icon style"
- `accessibility-reviewer` — `accessibility-minimums` → "contrast ratios, min sizes"

Each returns structured findings (pass / needs-work + evidence rect). Orchestrator merges into one report. No asset ships without explicit human approval after the swarm.

---

## 4. Renderer registry — pinned per asset type

> **Partially superseded** by the scope corrections at the top of this doc. The
> `myvault-tools/brand-studio/` implementation framing is out of scope; the renderer
> matrix itself (Marp / Satori / Typst / Vega-Lite / React Email / Tailwind v4) remains
> useful as future pinning. Renderers now live inside `visual-system/renderers/` rather
> than `myvault-tools/brand-studio/`. Also note: `_research/findings-html-first-stack.md`
> proposes consolidating presentation / social / chart / email / web onto a single
> HTML/CSS+Playwright stack — open architectural question, not yet decided.


| Asset type | **Winner** | Why | Spec format | Disqualified alternatives |
|---|---|---|---|---|
| **Presentations** | **Marp** | Markdown → HTML/PDF/PPTX, 40MB standalone binary, serverless-friendly, Marp Claude skill exists, exports editable PPTX. Mark's "HTML for presentations" intuition lands here — Marp is HTML semantics with a renderer that doesn't need Chromium. | `presentation.md` + theme.css | Slidev (heavier, Vue runtime), Reveal.js (raw HTML, harder for AI), python-pptx (imperative API), Google Slides (vendor lock) |
| **Social images** | **Satori** | JSX → SVG → PNG via @resvg/resvg-js. Edge/Lambda native (WebAssembly), no Chromium. ~5x faster than Puppeteer. JSX is dense in LLM training data. Token binding via JS variables = zero transform. | `og.tsx` | Puppeteer (150MB Chromium, cold-start hostile), sharp+SVG (manual coordinate math), html2canvas (browser-only) |
| **Documents / ebooks (PDF)** | **Typst** | 40MB binary, millisecond compilation, native JSON/CSV ingestion, PDF/A and PDF/UA output, official Docker image. LLMs learn the syntax faster than LaTeX. | `report.typ` | LaTeX (LLM-fragile), React-PDF (no PDF/A, weaker layout control), Prince XML ($3,800/yr), Paged.js (needs headless browser) |
| **Charts** | **Vega-Lite** | JSON spec is dense in LLM training data. VegaChat (arXiv, Jan 2026) achieved 0% syntax error with feedback loop. Node-native, no DOM required for SVG output. | `chart.json` | D3 (too low-level, imperative), Plotly (JSON exists but heavier runtime), Recharts (needs React DOM), Observable Plot (less LLM corpus) |
| **Email** | **React Email** (default), **MJML** (if Outlook is hard requirement) | JSX → HTML one-call render. JS/TS native. Token binding via JS constants. MJML wins only if legacy Outlook compatibility is non-negotiable. | `email.tsx` | Maizzle (fine but more config), raw HTML+tables (LLM-hostile) |
| **Web components** | **Tailwind v4 + CSS variables** | `@theme` block makes tokens canonical. Style Dictionary v4 has DTCG support. `tokens-studio/sd-tailwindv4` is a working reference impl. | `Component.tsx` + `tokens.css` | Panda CSS (overkill), vanilla-extract (CSS-in-JS, not CSS-var-native), Stitches (unmaintained 2024+) |
| **Animation / video** | **Remotion** (Phase 4 only) | React-native, deterministic, Lambda parallel rendering. Defer per the 2026-04-16 proposal. | `composition.tsx` | fal.ai for generative B-roll only (Phase 4) |

**Cross-cutting facts:**
- All winners run headless (no GPU, no Chromium except Slidev which we rejected)
- All winners output PNG/SVG/PDF that vision models can score
- All winners have stable APIs and dense LLM training data
- DTCG token binding is native (Tailwind v4) or trivial (Satori, React Email, Typst, Vega-Lite via Style Dictionary)

**Mark's HTML-for-presentations intuition:** *mostly confirmed.* Marp gives you HTML semantics via Markdown authoring without the Chromium tax. If raw HTML+CSS+JS becomes important later (interactive presentations, web-embedded decks), we can add Reveal.js as a second renderer for that subset; Marp covers the static-export 90%.

---

## 5. Figma's role under the new model

| Function | Figma | Vault | Renderers |
|---|---|---|---|
| Design tokens (values) | **canonical source** | extracted JSON copy | consume tokens.json |
| Paint styles, text styles | **canonical source** | extracted, documented | consume |
| Live design exploration | **lab** | — | — |
| Visual reference / examples | **lab** | linked via `visual_examples:` frontmatter | — |
| Canon documentation (rules, intent) | — | **canonical** (chunks) | — |
| Spec authoring | — | (Mark, by hand) | (agent, programmatically) |
| Asset rendering | **NEVER** | — | **canonical** |
| Brand-compliance review | — | (chunks describe rules) | review agents read rendered output |

**Sync direction:** Figma → vault → renderer outputs. One-way. We never push from vault back to Figma in this architecture (no `figma_setup_design_tokens` from token JSON). If a token needs adding, Mark adds it in Figma first; the extract script picks it up.

**One exception:** Voice-of-Markos / Newsletter satellite visual systems (future, not Phase 1) might need their *own* canon documented while the parent system stays stable. Treat that the same way verbal satellites work — explicit overrides in chunk frontmatter.

---

## 6. Updated chunk taxonomy

22 chunks (proposal had 19; we add `gradient-system`, `ebook-canon`, and split `terminology-visual` out).

Each chunk gets the new frontmatter fields from §3 Layer B. Renderer pinning is explicit per chunk:

| # | Chunk | Renderer relevance |
|---|---|---|
| **Foundations** |
| 1 | `color-system.md` | universal — used by all renderers |
| 2 | `typography-system.md` | universal |
| 3 | `gradient-system.md` ⭐ | universal |
| 4 | `spacing-and-grid.md` | universal |
| 5 | `motion-and-animation.md` | Remotion (Phase 4) |
| 6 | `elevation-and-shadows.md` | Tailwind, React Email, Satori |
| **Identity** |
| 7 | `logo-usage.md` | universal |
| 8 | `iconography.md` | Satori, Tailwind, Typst |
| 9 | `imagery-and-illustration.md` | Phase 2 (image-gen MCPs) |
| 10 | `terminology-visual.md` ⭐ | universal (defines "Stream A", "knockout headline", etc.) |
| **Components** |
| 11 | `buttons-and-ctas.md` | Satori, Tailwind, React Email |
| 12 | `cards-and-containers.md` | Satori, Tailwind |
| 13 | `forms-and-inputs.md` | Tailwind |
| 14 | `data-viz-patterns.md` | Vega-Lite |
| **Patterns** |
| 15 | `layout-patterns.md` | universal |
| 16 | `social-formats.md` | Satori |
| 17 | `presentation-layouts.md` | Marp |
| 18 | `document-patterns.md` | Typst |
| 19 | `ebook-canon.md` ⭐ | Typst |
| **Guardrails** |
| 20 | `brand-compliance-rules.md` | universal — required by all reviewers |
| 21 | `ai-generation-prompts.md` | Phase 2 |
| 22 | `accessibility-minimums.md` | universal |

---

## 7. End-to-end workflow (the agent's view)

A user runs `/myvault:design-presentation Q2 board update, 12 slides`. What happens:

```
1. Command invokes presentation-designer agent
2. Agent loads visual-kit skill
3. visual-kit reads _retrieval-rules.yaml task_profiles.presentation
4. Loads chunks: color-system, typography-system, presentation-layouts,
   logo-usage, brand-compliance-rules, gradient-system
5. Loads tokens: tokens/brand.tokens.json (filtered by token_dependencies frontmatter)
6. Loads asset-craft workflow: workflows/presentation.md (Marp-specific)
7. Agent runs Brief phase: confirms goal, audience, narrative arc, 12 slide types
8. Agent runs Spec phase: writes presentation.md (Markdown with Marp directives)
   - Pulls type sizes, colors from tokens
   - Picks slide types from canonical 13-slide-type set in presentation-layouts chunk
9. Agent runs Render phase: invokes Marp via myvault-tools/brand-studio/cli/render-marp.ts
   - Output: presentation.html, presentation.pdf, presentation.pptx
10. Agent runs Review phase: invokes /myvault:design-review on the PDF
    - 5 reviewers spawn in parallel, each screenshots PDF pages, scores against chunks
    - Consolidated report
11. Agent presents result to user with iteration prompts
12. Mark approves, or asks for round 2
```

The agent never opens Figma. Figma is only consulted for `visual_examples:` URLs when the agent or a reviewer needs visual reference (e.g., a Mark-approved slide-type prototype for benchmark).

---

## 8. Phase 1 revised (concrete and minimal)

The previous bridge plan said 5-7 days. With the renderer pinning locked in, Phase 1 is more focused.

**Goal:** prove the translation pipeline end-to-end on **one asset type** (presentations, since Mark led with that example) with **the minimum viable scaffolding** for the rest.

### Phase 1.1 — Token extract pipeline (1 day)

- One-shot extract script in `myvault-tools/brand-studio/cli/extract-figma-tokens.ts`
- Reads "MyVault Tokens" collection (37 vars) + 5 gradient paint styles + 12 text styles
- Writes `10-Brand/visual-system/tokens/brand.tokens.json` (W3C DTCG)
- Style Dictionary v4 build pipeline produces: `tokens.css`, `tokens.ts`, `marp.theme.css`, `tokens.typ`
- **Deliverable:** committed JSON + 4 generated outputs.

### Phase 1.2 — Visual-system scaffold (½ day)

- Create `10-Brand/visual-system/{tokens,brand-system,skills,agents,commands,research,_plan}/`
- Write `_manifest.yaml`, `_retrieval-rules.yaml` (with task profiles for presentation, social, document, chart, email, web — even if only presentation is hydrated)
- Write `README.md` and `CLAUDE.md` mirroring verbal-system shape
- **Deliverable:** empty-but-organised structure.

### Phase 1.3 — Hydrate presentation chunk + foundations (1-2 days)

- Hydrate the 4 universal foundations: `color-system`, `typography-system`, `gradient-system`, `spacing-and-grid`
- Hydrate `presentation-layouts` from existing `presentations/investor-deck-test/deck-content-v1.md` + `feedback_presentation_design_canon` memory
- Hydrate `brand-compliance-rules` from accumulated memories (regular weight only, no eyebrows, Vault Teal reserved, 18pt floor)
- Add new frontmatter fields (renderer, spec_format, template_path, token_dependencies, visual_examples, review_axes)
- Stub the other 17 chunks (frontmatter + summary + TODO marker)
- **Deliverable:** 6 chunks hydrated, 16 stubbed, manifest registers all 22.

### Phase 1.4 — Marp template + first command (1-2 days)

> **Superseded** by the scope corrections at the top of this doc. Renderer install was
> moved out of Phase 1 in this doc, but has since shipped under Phase 2.1
> (see `STATUS.md`). Kept for reference.


- Build `myvault-tools/brand-studio/templates/presentations/myvault-deck.css` (Marp theme using generated tokens)
- Build `myvault-tools/brand-studio/cli/render-marp.ts` (invokes Marp CLI, outputs HTML + PDF + PPTX)
- Build `presentation-designer` agent at `10-Brand/visual-system/agents/design/presentation-designer.md`
- Build `/myvault:design-presentation` command
- Build `asset-craft` skill with `workflows/presentation.md` (Marp-specific)
- Build `visual-kit` skill (reads retrieval rules, loads chunks, loads tokens)
- **Deliverable:** working `/myvault:design-presentation` regenerating the investor deck (or a subset) from current canon.

### Phase 1.5 — Vision review for presentations (1 day)

> **Superseded** by the scope corrections at the top of this doc. Reviewer-agent
> implementation is deferred — chunks contract reviewers; agent code does not yet exist.
> Kept for reference.


- Build the 5 reviewer agents (scoped to presentation-relevant chunks first)
- Build `/myvault:design-review` command (parallel swarm)
- Wire the screenshot-and-score loop
- **Deliverable:** review swarm catches a planted brand violation (e.g., teal title) on a generated deck.

**Total Phase 1: ~5-6 working days.** Output is one fully working asset pipeline + scaffolding for the rest.

---

## 9. Phase 2+ at a glance

Once Phase 1 ships, each subsequent phase clones the Phase 1.4 pattern for one more renderer:

| Phase | Asset type | Renderer | Effort |
|---|---|---|---|
| 2.1 | Social images | Satori | 2-3 days |
| 2.2 | Charts | Vega-Lite | 2 days |
| 2.3 | Documents / ebooks | Typst | 3-4 days |
| 3.1 | Email | React Email | 2 days |
| 3.2 | Web components | Tailwind v4 | 2 days |
| 4.x | Video | Remotion + Phase-4 image-gen | open-ended |

After Phase 2, we have the four highest-volume asset types covered.

---

## 10. What I'm explicitly NOT proposing

- **Image generation** (Gemini/Recraft MCPs) — defer to Phase 4 per Mark's direction. Use what we have.
- **Bidirectional Figma sync** — extract is one-way. Vault never pushes tokens to Figma.
- **Custom DSL** for any layer — every spec format is a known one (Markdown, JSX, JSON, Typst). Zero invention.
- **Rebuilding the verbal brand-system** — it's fine. We rewrite only its `visual-system.md` chunk to a 50-token pointer at the new sibling.
- **All 12 commands in Phase 1** — Phase 1 ships one (`/myvault:design-presentation`).
- **Voice of Markos / Newsletter visual satellites** — defer until parent ships.

---

## 11. Open questions for Mark

**Blocker (must answer before Phase 1.1):**

1. **Pin Marp for presentations?** This is the boldest call. Confirms HTML-shape but routes through Markdown. Alternative: raw HTML+CSS rendered via Puppeteer (heavier, more control). My recommendation: **Marp**.

2. **Where does `myvault-tools/brand-studio/` live in the existing app?** As a sibling directory, a `/brand-studio` route, or a separate package? My recommendation: **sibling directory at `~/Documents/Business/myvault-tools/brand-studio/`**, separate `package.json` if needed.

3. **First proof-of-concept asset.** Phase 1.4 ends with one regenerated asset. Pick one:
   - (a) Subset of investor-deck (3-5 slides)
   - (b) One full slide-type (e.g., the Thesis Block)
   - (c) Something brand new (e.g., a Q2 board-update template)

   My recommendation: **(a)** — proves canon-fidelity by reproducing slides Mark already approved in Figma.

**Non-blockers (resolve when relevant):**

4. **React Email vs MJML for email?** Decide at Phase 3 start. Default React Email unless Outlook compatibility surfaces.

5. **Tailwind v4 deployment in `myvault-tools`** — is the Next.js app already on Tailwind v4? Confirm or plan migration before Phase 3.2.

6. **Token version pinning** — DTCG hit stable v1.0 in October 2025. Pin Style Dictionary v4 with DTCG profile, or wait for SD v5 + DTCG 2025.10 stable? My recommendation: **start with SD v4 + DTCG v1.0; upgrade later**.

---

## 12. What this unlocks

When Phase 1 ships:
- One slash command regenerates an on-brand presentation in <60 seconds
- Every value in that presentation traces back to a Figma variable
- Every layout decision traces back to a chunk
- Five vision agents catch brand drift before a human ever sees the file
- The pattern (token-extract → chunk → spec → render → review) is reusable for the next 5 asset types

When Phase 2 ships, three more asset types follow the same pattern with no architectural debate.

When Phase 3 ships, brand operations runs on autopilot for everyone except the truly creative work, which Mark and Markian still do in Figma — where it should be done.

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial — replaces Phase 1 scope in `visual-system-pipeline-plan.md`. Pins renderers, formalizes 4-layer extension over verbal-system pattern, declares Figma-as-source / Figma-as-not-renderer. | Mark + Claude |
