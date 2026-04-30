---
type: plan
status: proposal
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [visual-system, brand, pipeline, phase-0, bridge, design-tokens]
summary: "Bridge plan between the 2026-04-16 visual-system design proposal and current reality. Documents what's actually in Figma now (37 variables, 5 gradient paint styles, 12 text styles), the canon we've built since the proposal (presentation, social, ebook, chart, icon), and the updated Phase 1 scope that flips the build order from 'tokens-from-stale-chunk' to 'tokens-from-Figma'. Lists three blocker open-questions Mark must resolve before execution."
related:
  - "[[00-DESIGN-PROPOSAL]]"
  - "[[10-Brand/brand-system/brand-system/identity/visual-system]]"
  - "[[Brand-System-Router]]"
---

# Visual System Pipeline — Plan v1 (Phase 0 reality bridge)

> **Status:** Proposal — awaiting Mark's review on three open questions before execution
> **Author:** Claude Code (Opus 4.7) with Mark
> **Date:** 2026-04-29
> **Predecessor:** [[00-DESIGN-PROPOSAL]] (2026-04-16, 1213 lines)
> **Successor (when approved):** Phase 1 ADR + execution

---

## TL;DR

Mark already wrote a strong 1213-line design proposal on 2026-04-16. We don't need a new plan — we need to **(a)** confirm three open questions in Section 14 of that proposal, **(b)** reflect what we've built in Figma since then, and **(c)** flip Phase 1's build order so we extract canon **from** Figma into the vault rather than authoring it from a stale chunk and pushing **to** Figma.

This document does (b) and (c) and surfaces the three (a) questions.

---

## 1. What we have today (the discovery pass)

### 1.1 The 2026-04-16 proposal is the master plan

`10-Brand/visual-system/00-DESIGN-PROPOSAL.md` covers:
- 19 chunks across foundations / identity / components / patterns / guardrails
- 2 router skills (`visual-kit`, `asset-craft`)
- 10 agents (2 research, 3 design, 5 parallel review)
- 12 slash commands (`/myvault:design-*`)
- Figma integration architecture (MCP tools and direction)
- Image generation tiers (Satori/Typst/Remotion + Gemini/Recraft + Firefly/SD)
- Validation (token audit, AI swarm, human gate)
- 5-phase roadmap, 8 open questions, 9 risks, success metrics

It's the right shape. Keep it.

### 1.2 Figma is far ahead of the verbal-system "visual-system" chunk

The single visual chunk in the parent brand-system (`10-Brand/brand-system/brand-system/identity/visual-system.md`, 280 tokens, last touched 2026-02-19) declares:

| Field | Chunk says | Figma reality (2026-04-29) |
|---|---|---|
| Primary type | "SF Pro Display" | **Lato** Regular (the social-29-03 SF Pro frames are an anomaly) |
| Secondary type | PT Serif | PT Serif Regular ✓ |
| Vault Teal | `#094545` | `#094545` ✓ (rgb 9,69,69) |
| Light Sand | `#FBF7F5` | `off-white` rgb 251,250,245 ≈ `#FBFAF5` (slight drift) |
| Premium Purple | `#621C3F` | rgb 120,28,66 ≈ `#781C42` (drift) |
| Spacing tokens | none | **14 tokens** `space/0–32` (0/4/8/12/16/20/24/32/40/48/64/80/96/128) |
| Radius tokens | none | **9 tokens** `radius/none, xs, sm, md, lg, xl, 2xl, 3xl, full` |
| Secondary palette | none | premium-purple, dark-earth, rich-blue |
| Signal palette | none | go, stop, sky, earth |
| Gradients | none | **5 paint styles**: `gradient/cool`, `warm`, `mist`, `greydient`, `primary` |
| Type scale | none | **12 text styles**: `display/xxl-s` (PT Serif 56-160), `heading/l-m` (PT Serif 28-40), `body/xl-s` (Lato 14-20), `caption` (Lato 12) |
| Icon alias | none | `color/icon/default → black` |

**Conclusion:** the chunk is ~80% incomplete relative to current Figma. It must be rewritten and split, not edited in place.

### 1.3 We've defined canon for asset types the proposal listed but didn't yet codify

Memory + Figma + recent sessions hold working canon for:

| Domain | Source | Status |
|---|---|---|
| **Logo** | `10-Brand/Logo/{svg,PNG}/` + Figma | Files exist, lockup discipline implicit not written |
| **Charts / diagrams** | `project_diagram_canonical_specs` memory + Figma "Diagrams" page | Canon captured in memory |
| **Icons** | `feedback_figma_imported_assets_scale_fix` memory + Phosphor library | Rule captured |
| **Ebook covers** | `project_ebook_cover_canonical_specs` memory + Figma | 3 cover treatments codified |
| **Ebook pages** | `project_ebook_page_canonical_specs` memory + Figma | 13 page types codified |
| **Investor deck (presentation test fixture)** | `presentations/investor-deck-test/deck-content-v1.md` + Figma Section 1 | 13 slide-types codified |
| **Presentation canon** | `feedback_presentation_design_canon` memory | Rules: 18pt floor, no header, body Lato 28/140%, titles black not teal, Vault Teal reserved for hero |
| **Social posts** | Figma Social page + memory entries | Stream A "editorial" (PT Serif/Lato + bordered card + pill button) and Stream B "newsroom" (29-03 series, SF Pro, knockout headline, low-opacity stat rows) |
| **Card primitive** | `feedback_figma_card_structure` memory | Bordered card structure |
| **No uppercase eyebrow** | `feedback_no_uppercase_eyebrows` memory | Universal hard rule |
| **Regular weight only** | `feedback_regular_weight_only` memory | Universal hard rule |

None of this is in chunks yet. Pulling it into the visual chunk skeleton is mostly capture, not invention.

### 1.4 Tooling state

**Already installed:**
- `figma-remote` (read designs, generate from web pages, Code Connect)
- `figma-console` (94+ tools incl. `figma_setup_design_tokens`, `figma_batch_create_variables`, `figma_lint_design`)
- `pencil` (.pen file editor)
- `obsidian`, `linear`, `gmail`, `agentation`, `dfs-mcp` (DataForSEO)
- Skills: `document-skills`, `compound-engineering` design tools, `figma:*` skills

**Not yet installed:**
- `nanobanana-mcp` (Gemini image gen — Phase 2 in proposal)
- `recraft-ai/mcp-recraft-server` (Recraft — Phase 2)
- Satori, Style Dictionary, Typst, Remotion, React Email — none in `myvault-tools/`

**Verbal brand-system status:**
- 17 chunks, 11 agents, 9 commands, 4 skills — published as `markiianb/myvault-content-plugin`
- 2 satellites (Newsletter, Voice of Markos)
- v2.0 shipped 2026-04-17 (blog production pipeline)

---

## 2. What's changed since the 2026-04-16 proposal

The proposal was forward-looking. Two weeks of Figma work moved several "future" items into "already canon":

| Proposal said | Reality on 2026-04-29 |
|---|---|
| "Build chunks first; tokens flow vault → Figma" | Figma already holds 37 vars + 5 gradients + 12 text styles. Tokens should flow Figma → vault. |
| "Phase 1: 3 chunks (color, typography, brand-compliance) + 1 template + 1 command" | Source material for those chunks exists in Figma; we can hydrate from real values, not handwrite. |
| "Add `data-viz-patterns.md`, `presentation-layouts.md`, `social-formats.md` chunks" | Canon for all three already exists in memory + Figma — chunks just need to be written. |
| "Imagery direction — curate 15-20 reference images" | Not started yet, but `10-Brand/visual-system/references/illustration-line-art/` has 4 reference images for the line-art editorial style. |
| "Logo usage chunk" | SVG/PNG files exist, lockup discipline used in deck/social work, no codified rules yet. |
| "Brand reference image library in `myvault-tools/brand-studio/reference/`" | `myvault-tools/` exists but no `brand-studio/` directory yet. |

---

## 3. Three open questions Mark must answer before execution

These three are blockers for Phase 1. They're from the proposal's Section 14 with my recommendation tightened.

### Q1 — Sibling vs satellite of the verbal brand-system?

The verbal brand-system at `10-Brand/brand-system/` is a self-contained plugin with manifest + retrieval rules + agents + commands + chunks. The visual system can either:

- **Option A — Sibling:** Live at `10-Brand/visual-system/` with its own manifest, rules, agents, commands. References parent for voice/positioning chunks when relevant. Clean separation, parallel pattern.
- **Option B — Satellite:** Live inside the parent system as a satellite (like Newsletter), declaring overrides only.

**My recommendation:** **A — sibling.** Visual is a distinct domain with its own task profiles, agents (color-reviewer, layout-reviewer), and commands (`/myvault:design-*`). It's not "the same content with overrides" — it's a parallel system. Keeping it as a sibling also lets it be packaged as its own `myvault-visual-plugin` later if useful.

**Decision needed:** confirm A.

### Q2 — Figma source-of-truth direction?

The proposal recommended **vault is canonical, push to Figma**. Our actual workflow has been the opposite — we explore in Figma first, then capture canon to memory/markdown after the fact.

Three honest options:

- **Option A — Vault canonical, Figma mirror.** Token JSON in vault is source. Style Dictionary builds CSS/Tailwind/Typst. Push to Figma via `figma_setup_design_tokens`. Designer iterates in Figma but vault wins on conflict.
- **Option B — Figma canonical, vault is the codified record.** Designer iterates in Figma freely. A weekly extract script reads Figma vars/styles and writes `tokens/brand.tokens.json`. Vault chunks describe the *semantic intent* (when to use teal, what counts as Stream A) which Figma can't express alone.
- **Option C — Hybrid by domain.** Tokens (colors, type, spacing) → Figma canonical, extract weekly. Semantic rules (when, why, which stream) → vault canonical. Components (cards, buttons) → Figma canonical when published, vault canonical for behavioral spec.

**My recommendation:** **C — hybrid.** It matches our actual workflow. Token *values* live where they get edited (Figma); token *meaning* lives where it gets reasoned about (vault chunks). One extract script keeps them in sync. We avoid the "vault is divorced from designer reality" failure mode that bit the verbal-system visual chunk.

**Decision needed:** confirm C, or choose A.

### Q3 — When do we add image generation MCPs?

The proposal lists Phase 1 = no AI imagery, Phase 2 = Gemini (free), Phase 3+ = Recraft.

**My recommendation:** **Stick with proposal.** No image-gen MCPs until Phase 2. Phase 1 is template-driven (Satori, Typst) where the brand canon is already deterministic. Adding generative imagery before the template pipeline is solid is premature.

**Decision needed:** confirm "Phase 2 only," or signal earlier interest.

---

## 4. Updated Phase 1 scope

Given Figma reality, Phase 1 inverts: **extract first, then chunk, then template.**

### Phase 1.1 — Extract Figma tokens to W3C DTCG (1 day)

- Write a one-shot script (run via `figma_execute` or a Node/TS script in `myvault-tools/`) that:
  - Reads all variables from "MyVault Tokens" collection
  - Reads all paint styles (the 5 gradients)
  - Reads all text styles
  - Writes `10-Brand/visual-system/tokens/brand.tokens.json` in W3C DTCG format
- Commit JSON to vault.
- **Deliverable:** machine-readable token file + extract script for re-runs.

### Phase 1.2 — Scaffold the visual-system structure (½ day)

- Mirror parent shape: `10-Brand/visual-system/{tokens,brand-system,skills,agents,commands,research,_plan}/`.
- Create `_manifest.yaml`, `_retrieval-rules.yaml`, `README.md`, `CLAUDE.md` (architecture doc).
- Create the 22-chunk file skeleton (frontmatter + summary + TODO content). See §5 for the chunk list.
- **Deliverable:** empty-but-organised skeleton ready for chunk hydration.

### Phase 1.3 — Hydrate the foundation chunks (1-2 days)

Hydrate the four foundation chunks with real Figma data and the rules we already know:

1. `color-system.md` — primitive tokens (core/secondary/signal/icon), Vault Teal usage discipline (reserved for hero, never for big titles), 60/30/10 ratio rule.
2. `typography-system.md` — type scale (display/heading/body/caption), Lato + PT Serif Regular only, no bold/italic/medium, 18pt floor.
3. `gradient-system.md` (new — not in proposal) — the 5 gradient paint styles with usage (cool for cool blocks, warm for backgrounds, mist for soft, greydient for default, primary for emphasis).
4. `spacing-and-grid.md` — the 14 spacing tokens, the 9 radii, 8px base grid.
5. `imagery-and-illustration.md` — line-art editorial style (already partly written in `identity/illustration-style.md` of parent — port + extend).

**Deliverable:** 5 chunks alive with real data.

### Phase 1.4 — Scaffold and stub the rest (½ day)

For the remaining 17 chunks, write frontmatter + 1-paragraph summary + "TODO: hydrate from Figma + memory entries" markers. Don't try to write full content yet.

**Deliverable:** all 22 chunks have at least a frontmatter + summary, manifest registers them.

### Phase 1.5 — First template + first command (1-2 days)

Once the chunks are real (even if partly stubbed), prove the pipeline end-to-end:

- Install Satori + Style Dictionary in `myvault-tools/brand-studio/`.
- Build `og-default.tsx` template using generated tokens.
- Create `/myvault:design-social` command + minimal `asset-designer` agent.
- Generate one OG image for an existing blog post.

**Deliverable:** one rendered OG image + working pipeline.

**Total Phase 1 estimate:** ~5-7 working days.

---

## 5. Updated chunk list (22 chunks)

The proposal's 19 chunks plus 3 new ones to reflect canon we've built.

**Foundations (6 chunks)** — *was 5; added gradient-system*

| # | Chunk | Source for hydration |
|---|---|---|
| 1 | `color-system.md` | Figma vars (core/secondary/signal/icon) + memory rules |
| 2 | `typography-system.md` | Figma text styles + presentation memory + regular-weight memory |
| 3 | `gradient-system.md` ⭐ NEW | Figma paint styles (5 gradients) + ebook cover memory |
| 4 | `spacing-and-grid.md` | Figma vars (14 spacing + 9 radii) |
| 5 | `motion-and-animation.md` | TBD — Phase 4 work |
| 6 | `elevation-and-shadows.md` | Figma effect styles audit needed |

**Identity (4 chunks)** — *was 3; split icon canon out from iconography*

| # | Chunk | Source |
|---|---|---|
| 7 | `logo-usage.md` | Logo SVG/PNG files + lockup discipline used in deck/social |
| 8 | `iconography.md` | Phosphor library + scale-fix memory |
| 9 | `imagery-and-illustration.md` | line-art memory + reference set + parent's `illustration-style.md` |
| 10 | `terminology-visual.md` | (visual terminology — Stream A vs Stream B, knockout headline, bordered card) |

**Components (4 chunks)** — same as proposal

| # | Chunk | Source |
|---|---|---|
| 11 | `buttons-and-ctas.md` | Pill button primitive (Social 07 / SM Post 26-11-6) |
| 12 | `cards-and-containers.md` | Bordered card primitive memory + Stream A social cards |
| 13 | `forms-and-inputs.md` | TBD — derive from app/website refs |
| 14 | `data-viz-patterns.md` | Diagram canonical specs memory |

**Patterns (5 chunks)** — *was 4; added ebook-canon*

| # | Chunk | Source |
|---|---|---|
| 15 | `layout-patterns.md` | Common compositions across deck + social + ebook |
| 16 | `social-formats.md` | Social Streams A and B canon |
| 17 | `presentation-layouts.md` | 13 slide-types from investor-deck-test |
| 18 | `document-patterns.md` | TBD — Typst patterns |
| 19 | `ebook-canon.md` ⭐ NEW | Ebook cover + 13 page types memories |

**Guardrails (3 chunks)** — same as proposal

| # | Chunk | Source |
|---|---|---|
| 20 | `brand-compliance-rules.md` | Aggregate of "regular weight only," "no uppercase eyebrow," "Vault Teal reserved," "18pt floor," etc. |
| 21 | `ai-generation-prompts.md` | Phase 2 — defer until Gemini installed |
| 22 | `accessibility-minimums.md` | WCAG 2.2 AA contrast, 44px tap, etc. |

---

## 6. Architecture summary (for Mark to sanity-check)

```
10-Brand/
├── brand-system/                          # Verbal — already shipped, v2.0
│   └── brand-system/
│       └── identity/
│           └── visual-system.md           # ⚠️  Becomes a 1-paragraph stub pointing to ↓
│
├── visual-system/                         # NEW sibling system
│   ├── 00-DESIGN-PROPOSAL.md              # Existing 2026-04-16 master plan
│   ├── _plan/
│   │   └── visual-system-pipeline-plan.md # ← THIS DOCUMENT
│   ├── _manifest.yaml                     # Index of 22 chunks
│   ├── _retrieval-rules.yaml              # Task profiles (social, presentation, document, etc.)
│   ├── README.md                          # Operator guide
│   ├── CLAUDE.md                          # Architecture for AI agents
│   ├── tokens/
│   │   ├── brand.tokens.json              # W3C DTCG (extracted from Figma)
│   │   └── extract.ts                     # Re-run script
│   ├── brand-system/                      # 22 chunks across foundations/identity/components/patterns/guardrails
│   ├── skills/
│   │   ├── visual-kit/                    # Loads chunks per task
│   │   └── asset-craft/                   # Routes to workflows + craft references
│   ├── agents/
│   │   ├── research/                      # visual-researcher, asset-briefer
│   │   ├── design/                        # asset-designer, image-prompt-engineer, design-iterator
│   │   └── review/                        # 5 parallel reviewers
│   ├── commands/                          # /myvault:design-*
│   ├── presentations/                     # Existing investor-deck-test
│   └── references/                        # Existing line-art refs
│
└── (Logo/, Guidelines/, Visual-Tools/ stay as-is for now)


~/Documents/Business/myvault-tools/
└── brand-studio/                          # NEW
    ├── tokens/                            # Style Dictionary build outputs
    ├── templates/                         # Satori, Marp, Typst, React Email, Remotion
    ├── reference/                         # Logos, fonts, imagery, icons (mirrored)
    └── cli/                               # Generation + audit scripts
```

---

## 7. What I'm NOT proposing

- A new from-scratch plan — the 2026-04-16 proposal stands.
- Throwing out the verbal `visual-system.md` chunk — instead, rewrite it to ~50 tokens that points to the new sibling system, so existing retrieval rules still resolve.
- Building all 12 commands or all 5 review agents in Phase 1 — that's Phase 3 in the proposal; that timing still works.
- Voice of Markos / Newsletter visual satellites — defer until parent visual system is shipped.
- Image generation in Phase 1 — defer to Phase 2 per proposal.
- Video pipeline — defer to Phase 4 per proposal.

---

## 8. Risks specific to this bridge

| Risk | Mitigation |
|---|---|
| Figma drift between extract runs | Re-run extract script before any chunk hydration; commit JSON snapshots; alarm on unexpected delta |
| Stale verbal `visual-system.md` retrieval-rules references | First action of Phase 1.2: edit the parent chunk to a 50-token pointer + bump version |
| Ebook + presentation canon currently lives only in memory entries | Phase 1.3 explicitly migrates memory content into chunks; memory entries become `superseded-by:` pointers |
| Stream A vs Stream B social tension unresolved | Decide before writing `social-formats.md` chunk (see §9 question 4) |
| Lato/PT Serif vs SF Pro inconsistency on the 29-03 social posts | Decide before writing `typography-system.md` (see §9 question 5) |

---

## 9. Open questions for Mark (decisions before Phase 1 starts)

**Blockers (must answer):**

1. **Sibling vs satellite?** (§3 Q1) — recommend Sibling.
2. **Figma source-of-truth direction?** (§3 Q2) — recommend Hybrid (C).
3. **Image-gen timing?** (§3 Q3) — recommend Phase 2 per proposal.

**Non-blockers (nice to resolve, can defer to chunk-writing time):**

4. **Stream A vs Stream B social posts** — are these two co-equal styles, or is Stream A canonical and Stream B a one-off newsroom style for stat-heavy posts?
5. **SF Pro on 29-03 posts** — accidental, intentional second-system, or staging for replacement?
6. **Voice of Markos visual satellite** — needed now, deferred, or never?
7. **Phase 1 owner** — me with Mark reviewing each chunk, or pair-mode where Mark drives token decisions?

---

## 10. Recommended decision

If §9 Q1-Q3 are confirmed (sibling / hybrid / Phase 2 image-gen), **start Phase 1.1 immediately** — extract Figma tokens, scaffold the structure, hydrate the foundation chunks, scaffold the rest. Estimated 5-7 working days end-to-end for Phase 1.

Once Phase 1 ships, we have:
- Real, agent-loadable visual canon
- Token sync pipeline running
- One working asset command (proof of concept)
- Clear roadmap for Phase 2 (carousel, document, chart, image-gen)

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial bridge plan — captures Figma reality, deltas since 2026-04-16, updated Phase 1 scope, three blocker open-questions | Mark + Claude |
