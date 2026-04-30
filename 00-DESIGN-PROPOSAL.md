---
type: plan
status: proposal
owner: mark
created: 2026-04-16
updated: 2026-04-16
tags: [visual-system, brand, architecture, proposal, design-tokens, mcp, ai-generation]
summary: "Comprehensive architectural design proposal for the MyVault visual brand system — a machine-readable, AI-consumable parallel to the existing verbal brand-system. Covers structure, location, chunks, skills, agents, commands, Figma/image/video integration, and phased implementation."
---

# Visual Brand System — Design Proposal

> **Status:** Proposal / thinking document
> **Author:** Mark Bobyliak (with Claude Code multi-agent research synthesis)
> **Date:** 2026-04-16
> **Related research:**
> - [[Visual-Brand-System-Research]] — landscape research (tools, MCPs, image gen APIs, token standards)
> - `10-Brand/brand-system/research/visual-brand-system-research.md` — prior research (2026-03-14, 10 agents across 6 domains)
> - [[Brand-AI-Research-Brief]] — competitive intel on brand.ai
> - [[Infinite-Garden-Research-Brief]] — competitive intel on Infinite Garden

---

## 1. Executive summary

We are building a **Visual Brand System** — a machine-readable, AI-consumable parallel to the existing verbal [[brand-system]]. It will enable Claude Code + MCP tools + AI models to generate on-brand documents, presentations, social assets, charts, email templates, and (eventually) video — at the same quality bar as human-designed work, at scale.

**The architectural bet:** Clone the exact pattern of the existing `10-Brand/brand-system/` — a BrandKit-first architecture with portable knowledge chunks, router skills, task-executing agents, and slash commands. This pattern is already proven in production (17 chunks, 11 agents, 9 commands, 2 satellite systems). Mirror it for visual.

**The tooling bet:** Design tokens (W3C DTCG) as single source of truth. Style Dictionary as the transformer. Template-first rendering via Satori/Marp/Typst/Remotion. Figma as mirror, not source. Generative AI (Gemini/Recraft) as creative collaborator, not replacement.

**The philosophy:** Agency over automation. Tools amplify creators; they don't replace them. Every generated asset passes through AI review, human curation, and brand compliance before shipping. Quality over volume.

---

## 2. What we have today

### 2.1 The verbal brand-system (reference architecture)

Located at `10-Brand/brand-system/`. Three-layer pattern:

| Layer | Count | Purpose |
|---|---|---|
| **Knowledge** (chunks) | 17 chunks, 280-1,250 tokens each | Portable brand knowledge in markdown + YAML frontmatter. Indexed by `_manifest.yaml`, routed by `_retrieval-rules.yaml`. |
| **Routers** (skills) | 4 skills | `brand-kit` (loads chunks), `content-craft` (routes to platform workflows), `seo-craft`, `content-brainstorming` |
| **Executors** (agents + commands) | 11 agents, 9 commands | 4 research, 2 writing, 1 serial fallback, 4 parallel review agents. All commands use `/myvault:` namespace. |

**Satellite systems:**
- `40-Newsletter/brand-system/` — 6 chunks, explicit overrides (authority register, no contractions, em dashes allowed)
- `30-Marketing/.../voice-of-markos/` — 13 chunks, explicit overrides (first-person "I" allowed, personal register)

**Key existing chunk for visual:** `brand-system/identity/visual-system.md` (280 tokens) — defines Vault Teal #094545, Light Sand #FBF7F5, Premium Purple #621C3F, SF Pro Display + PT Serif, logo symbolism, imagery direction. This is the **seed** we extend.

**Existing visual references:**
- `10-Brand/Guidelines/MyVault - Design Principles.pdf` (1.6 MB master design doc)
- `10-Brand/Guidelines/Screens/` (15 UI screen reference PDFs)
- `10-Brand/brand-system/research/visual-brand-system-research.md` (500-line prior research)
- `10-Brand/brand-system/research/raw/01-08-*.md` (8 domain-specific research files)

### 2.2 Installed tooling

**MCP servers (connected):**
- `figma-remote` — official Figma MCP; read designs, write to canvas, Code Connect, generate from web pages
- `figma-console` — 94+ tools; variable CRUD, design tokens, accessibility, FigJam
- `pencil` — native `.pen` file editing, batch design, style guides
- `obsidian`, `linear`, `agentation`, `gmail`, `claude.ai Google Drive`

**Skills (installed, design-relevant):**
- `document-skills:frontend-design`, `canvas-design`, `algorithmic-art`, `pptx`, `pdf`, `docx`, `xlsx`, `theme-factory`, `brand-guidelines`, `web-artifacts-builder`, `slack-gif-creator`, `mcp-builder`
- `compound-engineering:frontend-design`, `gemini-imagegen`, `design-iterator`
- `emil-design-eng`, `seo-image-gen`
- `figma:figma-generate-design`, `figma-generate-library`, `figma-implement-design`, `figma-code-connect`, `figma-create-design-system-rules`, `figma-use`

**Code stack (myvault-tools at `~/Documents/Business/myvault-tools/`):**
- Next.js, React, Tailwind CSS — the Next.js tools app already consumes brand colors
- Kit API webhook bridges, Framer integration
- Deployed to tools.myvaultai.com

### 2.3 What's missing

| Gap | Impact |
|---|---|
| Machine-readable token file (W3C DTCG JSON) | No single source of truth; visual-system.md describes colors but isn't parsable |
| Style Dictionary build pipeline | Can't propagate token changes to CSS/Tailwind/Figma/Typst in one step |
| Templates for each asset type | Social images, slide decks, PDFs, emails all generated ad-hoc |
| Visual review agents | No automated brand compliance for generated visuals |
| Asset-specific slash commands | `/myvault:write` exists for content; no `/myvault:design-*` equivalents |
| Render infrastructure | Satori, Typst, Remotion not yet set up in myvault-tools |
| Brand reference image set | No curated AI-generation reference library |

---

## 3. Design principles

Five principles guide every architectural decision below:

1. **Mirror, don't reinvent.** The existing `brand-system/` architecture is proven. Clone its shape for visual. Different domain, same pattern.
2. **Tokens as single source of truth.** One W3C DTCG JSON file drives every output format (web, Figma, print, slides, email, video). Never hard-code a hex value anywhere downstream.
3. **Templates over generation for volume; generation for creativity.** Satori templates produce deterministic, perfect-brand social assets. Gemini/Recraft produce novel imagery where creativity is needed. Never use generation for what a template can handle better.
4. **Filesystem state, not proprietary stores.** Per-asset folders (`spec.md` + `variants/` + `final.{svg,png}` + `review.md`) — survives tool changes, inspectable, portable.
5. **Human-curated, AI-produced.** Every asset passes through: brief → design → AI review swarm → human curation → output. No asset ships without explicit human approval.

---

## 4. Proposed structure & location

### 4.1 Three locations, three responsibilities

| Location | Purpose | Canonical for |
|---|---|---|
| `10-Brand/visual-system/` | **Knowledge layer** — chunks, manifest, retrieval rules, skills, agents, commands | Design decisions, brand rules, workflows |
| `10-Brand/visual-system/tokens/` | **Token source** — W3C DTCG JSON + Style Dictionary config | Token values (colors, typography, spacing, etc.) |
| `~/Documents/Business/myvault-tools/brand-studio/` | **Template & render layer** — Satori templates, Remotion compositions, Typst themes, email templates, brand asset CLI | Generated outputs, rendering infrastructure |

**Why split?** The vault is git-committed markdown — fast for AI, easy to version. Templates and rendering code live next to the Next.js app where they can share dependencies and deploy together. This matches the existing split: vault has the *knowledge*, myvault-tools has the *tools*.

### 4.2 Proposed directory tree

```
10-Brand/visual-system/                          # NEW
├── _manifest.yaml                              # Index of all chunks + tokens
├── _retrieval-rules.yaml                       # Task profiles + token budgets
├── README.md                                   # Operator guide
├── CLAUDE.md                                   # Architecture doc (mirrors brand-system/CLAUDE.md)
│
├── tokens/                                     # W3C DTCG source of truth
│   ├── brand.tokens.json                       # Primitive + semantic tokens
│   ├── style-dictionary.config.js              # Build config
│   ├── README.md                               # How to edit tokens
│   └── schema/                                 # Validation schemas
│       └── dtcg-schema.json
│
├── brand-system/                               # Portable chunk knowledge (mirrors parent pattern)
│   ├── foundations/
│   │   ├── color-system.md                     # Primitive colors + semantic assignments (600 tokens)
│   │   ├── typography-system.md                # Type stack, scale, hierarchy, rhythm (650 tokens)
│   │   ├── spacing-and-grid.md                 # 8px grid, spacing tokens, layout (450 tokens)
│   │   ├── motion-and-animation.md             # Duration tokens, easing, principles (400 tokens)
│   │   └── elevation-and-shadows.md            # Shadow tokens, z-index, layering (350 tokens)
│   ├── identity/
│   │   ├── logo-usage.md                       # Marks, clear space, sizing, variants, don'ts (550 tokens)
│   │   ├── iconography.md                      # Icon style, grid, stroke width, sizing (400 tokens)
│   │   └── imagery-direction.md                # Photography style, illustration rules, AI gen prompts (700 tokens)
│   ├── components/
│   │   ├── buttons-and-ctas.md                 # Button tokens, states, hierarchy (400 tokens)
│   │   ├── cards-and-containers.md             # Card patterns, corners, shadows (350 tokens)
│   │   ├── forms-and-inputs.md                 # Form patterns, validation, states (400 tokens)
│   │   └── data-viz-patterns.md                # Chart colors, axis rules, legend patterns (550 tokens)
│   ├── patterns/
│   │   ├── layout-patterns.md                  # Grid layouts, compositions, balance (500 tokens)
│   │   ├── social-formats.md                   # OG 1200x630, IG 1080x1080, LI carousel 1080x1350 (550 tokens)
│   │   ├── presentation-layouts.md             # Slide structures, title patterns, density (500 tokens)
│   │   └── document-patterns.md                # Report templates, sections, pagination (450 tokens)
│   └── guardrails/
│       ├── brand-compliance-rules.md           # Color ratios, hierarchy, required elements, banned (800 tokens)
│       ├── ai-generation-prompts.md            # Approved prompt patterns for Gemini/Recraft/etc (650 tokens)
│       └── accessibility-minimums.md           # WCAG 2.2 AA, contrast ratios, min sizes (400 tokens)
│
├── skills/                                     # Router skills (mirrors parent pattern)
│   ├── visual-kit/
│   │   └── SKILL.md                            # Loads visual chunks per task profile
│   ├── asset-craft/
│   │   ├── SKILL.md                            # Routes to asset workflows + shared craft
│   │   ├── workflows/
│   │   │   ├── social-image.md                 # OG images, social previews via Satori
│   │   │   ├── carousel.md                     # LinkedIn/IG carousels via Satori series
│   │   │   ├── presentation.md                 # Marp markdown → slides
│   │   │   ├── document.md                     # Typst PDFs, reports, one-pagers
│   │   │   ├── chart.md                        # Vega-Lite with brand config
│   │   │   ├── email.md                        # React Email with brand theme
│   │   │   ├── web-component.md                # Tailwind v4 + tokens
│   │   │   └── video.md                        # Remotion compositions (Phase 4)
│   │   └── references/
│   │       ├── composition-principles.md       # Balance, hierarchy, visual flow
│   │       ├── color-application.md            # When to use primary vs accent, ratios
│   │       ├── typography-application.md       # Heading/body pairing, measure, rhythm
│   │       └── asset-review-checklist.md       # Self-audit before review swarm
│   └── design-iterator/                        # Already installed, referenced here
│
├── agents/                                     # Task executors (mirrors parent pattern)
│   ├── research/
│   │   ├── visual-researcher.md                # Finds reference visuals, competitive analysis
│   │   └── asset-briefer.md                    # Writer-ready visual brief from concept
│   ├── design/
│   │   ├── asset-designer.md                   # Produces initial design per brief + template
│   │   ├── image-prompt-engineer.md            # Crafts AI gen prompts with brand constraints
│   │   └── design-iterator.md                  # Wraps design-iterator skill for visual work
│   └── review/                                 # Parallel reviewer swarm
│       ├── color-reviewer.md                   # Checks color usage vs brand rules
│       ├── typography-reviewer.md              # Checks type hierarchy, pairing, rhythm
│       ├── layout-reviewer.md                  # Checks composition, balance, hierarchy
│       ├── brand-element-reviewer.md           # Checks logo usage, clear space, iconography
│       └── accessibility-reviewer.md           # WCAG 2.2, contrast, min sizes
│
├── commands/                                   # Slash commands (myvault: namespace)
│   ├── design-asset.md                         # /myvault:design-asset (generic)
│   ├── design-social.md                        # /myvault:design-social (OG, IG, LI)
│   ├── design-carousel.md                      # /myvault:design-carousel (LinkedIn/IG multi-slide)
│   ├── design-presentation.md                  # /myvault:design-presentation (slide deck)
│   ├── design-document.md                      # /myvault:design-document (PDF report)
│   ├── design-chart.md                         # /myvault:design-chart (data viz)
│   ├── design-email.md                         # /myvault:design-email (branded email)
│   ├── design-brief.md                         # /myvault:design-brief (visual brief from concept)
│   ├── design-review.md                        # /myvault:design-review (5-agent parallel swarm)
│   ├── design-iterate.md                       # /myvault:design-iterate (screenshot loop)
│   └── design-video.md                         # /myvault:design-video (Remotion, Phase 4)
│
├── research/                                   # Ongoing research files
│   └── (existing prior research stays at 10-Brand/brand-system/research/)
│
└── .claude-plugin/                             # Plugin metadata (if we make this a distributable plugin)
    ├── plugin.json
    └── marketplace.json
```

### 4.3 Template layer (myvault-tools)

```
~/Documents/Business/myvault-tools/             # Existing Next.js app
├── brand-studio/                               # NEW
│   ├── tokens/
│   │   ├── brand.tokens.json                   # Synced from vault (read-only mirror)
│   │   ├── generated/                          # Style Dictionary outputs
│   │   │   ├── tokens.css                      # CSS custom properties
│   │   │   ├── tokens.ts                       # TypeScript constants
│   │   │   ├── tailwind.tokens.js              # Tailwind theme config
│   │   │   ├── vega-lite.config.json           # Chart config
│   │   │   ├── react-email.theme.ts            # Email theme
│   │   │   └── typst/
│   │   │       └── brand-theme.typ             # Typst variables
│   │   └── sync.ts                             # Script syncing vault → code
│   │
│   ├── templates/
│   │   ├── social/                             # Satori JSX templates
│   │   │   ├── og-default.tsx                  # Default 1200x630 OG
│   │   │   ├── og-blog.tsx                     # Blog-specific OG
│   │   │   ├── og-newsletter.tsx
│   │   │   ├── ig-quote.tsx                    # 1080x1080 Instagram
│   │   │   ├── li-carousel-slide.tsx           # 1080x1350 LinkedIn
│   │   │   └── twitter-card.tsx
│   │   ├── presentations/                      # Marp themes
│   │   │   ├── brand-theme.css
│   │   │   ├── pitch-deck.css
│   │   │   └── report-slides.css
│   │   ├── documents/                          # Typst templates
│   │   │   ├── brand-report.typ                # Main report template
│   │   │   ├── one-pager.typ
│   │   │   ├── white-paper.typ
│   │   │   └── brand-book.typ                  # Auto-generated brand guidelines
│   │   ├── email/                              # React Email templates
│   │   │   ├── newsletter.tsx
│   │   │   ├── product-update.tsx
│   │   │   └── welcome.tsx
│   │   ├── charts/                             # Vega-Lite specs
│   │   │   ├── brand-config.json
│   │   │   └── example-charts/
│   │   └── video/                              # Remotion compositions (Phase 4)
│   │       ├── intro-outro.tsx
│   │       ├── stat-card.tsx
│   │       └── carousel-to-video.tsx
│   │
│   ├── reference/                              # Brand reference assets
│   │   ├── logos/                              # SVG, PNG variants
│   │   ├── imagery/                            # Curated image set for AI gen reference
│   │   ├── fonts/                              # Font files (SF Pro Display, PT Serif)
│   │   └── icons/                              # Icon library
│   │
│   ├── cli/                                    # Brand asset CLI tools
│   │   ├── generate-og.ts                      # CLI: generate OG image from template + props
│   │   ├── generate-carousel.ts                # CLI: generate LinkedIn carousel
│   │   ├── generate-pdf.ts                     # CLI: render Typst template to PDF
│   │   └── audit-tokens.ts                     # CLI: check for hardcoded values
│   │
│   └── package.json                            # Deps: satori, @resvg/resvg-js, sharp, @react-email/components, style-dictionary, vega-lite
```

### 4.4 Why this split works

**Vault (`10-Brand/visual-system/`):**
- Markdown + YAML — fast for Claude Code to read
- Git-versioned — every change tracked
- Inspectable — human can read any rule
- Portable — could be copied to another tool
- Knowledge that doesn't need to execute

**Code (`myvault-tools/brand-studio/`):**
- TypeScript — renders actually execute
- Shares node_modules with Next.js app
- Can be deployed to Vercel (on-demand asset generation as API routes)
- Templates need dependencies (React, Satori, Sharp) that don't belong in the vault
- Generated token outputs (CSS, TS) are build artifacts, not source

---

## 5. The knowledge layer — chunks in detail

### 5.1 Chunk design principles (from parent system experience)

- **350-500 tokens per chunk** for load-if-relevant; 500-800 for always-load
- **Self-contained** — readable without loading dependencies
- **Single topic** — one chunk, one concern
- **Front-loaded** — most important rules first
- **Worked examples over abstract rules** — use Why/Fix tables
- **YAML frontmatter** — `chunk_id`, `domain`, `token_count`, `version`, `status`, `depends_on`

### 5.2 Proposed chunks (with estimated token counts)

#### Foundations (5 chunks, ~2,450 tokens)

| Chunk | Tokens | Contents |
|---|---|---|
| `color-system.md` | 600 | Primitive tokens (teal-100 through teal-900, sand-100-900, purple-100-900), semantic assignments (primary, secondary, accent, text-on-primary, bg-default), mode variants (light/dark if applicable), color-usage ratios (60/30/10 rule), color-in-context examples. |
| `typography-system.md` | 650 | Font stack (SF Pro Display headings, PT Serif body, mono fallback), type scale (6 sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl), line-height tokens, letter-spacing tokens, heading hierarchy rules, measure (line length), rhythm (vertical spacing between elements). |
| `spacing-and-grid.md` | 450 | 8px base grid, spacing scale tokens (0, 1, 2, 3, 4, 6, 8, 12, 16, 24), container widths, responsive breakpoints, layout grid (12-column web, 4-column mobile). |
| `motion-and-animation.md` | 400 | Duration tokens (fast: 150ms, base: 250ms, slow: 400ms), easing curves, motion principles (subtle, purposeful, respectful), when to animate / when not to. |
| `elevation-and-shadows.md` | 350 | Shadow tokens (sm, md, lg, xl), z-index scale, layering rules, depth hierarchy. |

#### Identity (3 chunks, ~1,650 tokens)

| Chunk | Tokens | Contents |
|---|---|---|
| `logo-usage.md` | 550 | Primary mark (full logo), secondary mark (symbol only), wordmark, clear space rules, minimum sizes per use case, color variants (full color, monochrome, reversed), background compatibility, co-branding rules, **banned usages** (rotations, distortions, effects, off-brand backgrounds). |
| `iconography.md` | 400 | Icon style (outlined, 2px stroke, rounded ends), 24x24 base grid, sizing tokens (16, 20, 24, 32, 48), color application rules, custom icon creation guidelines, prohibited icon styles. |
| `imagery-direction.md` | 700 | Photography style (authentic family moments, warm natural lighting, real devices, diverse families), illustration rules (if applicable), AI generation guardrails, approved reference image set location, **prompt patterns for Gemini/Recraft** with exact brand constraints ("warm golden hour lighting, teal accent #094545, natural shallow DOF, real family in real home"), banned imagery tropes (stock photo cliches, fake AI hands, corporate "diversity" photos). |

#### Components (4 chunks, ~1,700 tokens)

| Chunk | Tokens | Contents |
|---|---|---|
| `buttons-and-ctas.md` | 400 | Button variants (primary, secondary, tertiary, ghost, destructive), states (default, hover, active, disabled, loading), size tokens, padding tokens, border-radius tokens, CTA copy patterns (verb-led, specific, active voice). |
| `cards-and-containers.md` | 350 | Card patterns, border-radius tokens, padding tokens, shadow application, container variants (default, elevated, bordered, ghost), content hierarchy within cards. |
| `forms-and-inputs.md` | 400 | Input variants, label patterns, validation states (default, focus, error, success), error message patterns, field grouping, required field indicators. |
| `data-viz-patterns.md` | 550 | Chart color palette (categorical: primary → accent → secondary; sequential: teal ramp), axis color rules, grid line colors, legend patterns, chart typography (axis labels, titles, annotations), **Vega-Lite brand config reference**, **when to use each chart type** (bar, line, area, pie, scatter). |

#### Patterns (4 chunks, ~2,000 tokens)

| Chunk | Tokens | Contents |
|---|---|---|
| `layout-patterns.md` | 500 | Core layouts (hero + content, two-column, three-column, centered content, split screen), balance principles, visual hierarchy, whitespace ratios, density guidelines (sparse for emotional, dense for functional). |
| `social-formats.md` | 550 | Platform dimensions (OG 1200x630, Twitter card 1200x600, IG square 1080x1080, IG story 1080x1920, LinkedIn post 1200x627, LinkedIn carousel 1080x1350), safe zones, typography sizing per platform, text-to-image ratios, engagement patterns. |
| `presentation-layouts.md` | 500 | Slide structures (title, section divider, content, split-layout, full-image, quote, data), title hierarchy, content density limits (max 5 bullets, max 30 words per slide), speaker-note patterns. |
| `document-patterns.md` | 450 | Report structures (cover, TOC, section openers, content pages, data pages, closing), pagination patterns, header/footer rules, callout boxes, figure captions, reference formatting. |

#### Guardrails (3 chunks, ~1,850 tokens — always load)

| Chunk | Tokens | Contents |
|---|---|---|
| `brand-compliance-rules.md` | 800 | **The core rules file.** Color ratios (60% primary, 30% secondary, 10% accent), required elements (logo on social, disclaimer on financial), banned combinations (accent-on-accent, low-contrast pairs), hierarchy rules, consistency requirements, **the checklist** (25 items for self-audit), examples of compliant vs non-compliant. |
| `ai-generation-prompts.md` | 650 | Approved prompt patterns for each AI model (Gemini, Recraft, FLUX), required constraints (exact hex codes, banned styles like "corporate photoshoot"), negative prompt patterns, reference image usage rules, **seed management** for consistency, quality gates. |
| `accessibility-minimums.md` | 400 | WCAG 2.2 AA requirements, contrast ratios (4.5:1 body, 3:1 large text, 3:1 non-text), minimum touch targets (44x44), focus indicators, alt text patterns, color-blindness considerations. |

**Total: 19 chunks, ~9,650 tokens** (parent system is 17 chunks, ~9,400 tokens — comparable scale)

### 5.3 Manifest & retrieval rules

```yaml
# _manifest.yaml
brand: "MyVault"
system: "visual"
version: "1.0"
last_updated: "2026-04-16"
parent_system: "10-Brand/brand-system"  # Inherits verbal brand context
total_chunks: 19
total_tokens: 9650
tokens_file: "tokens/brand.tokens.json"

chunks:
  color-system:
    path: "foundations/color-system.md"
    domain: "foundations"
    summary: "Primitive + semantic color tokens, mode variants, usage ratios"
    token_count: 600
  # ... etc for all 19 chunks
```

```yaml
# _retrieval-rules.yaml
# Task profiles — which chunks to load for each asset type

task_profiles:
  social_image:
    description: "Generate OG image, Twitter card, Instagram post, or LinkedIn post image"
    asset_type: "static-image"
    render_tool: "satori"
    always_load:
      - "color-system"
      - "typography-system"
      - "brand-compliance-rules"
      - "social-formats"
      - "logo-usage"
    load_if_relevant:
      - "imagery-direction"      # if image is part of the asset
      - "ai-generation-prompts"  # if using AI gen for imagery
    token_budget: 3500

  linkedin_carousel:
    description: "Multi-slide LinkedIn or Instagram carousel"
    asset_type: "carousel"
    render_tool: "satori-series"
    always_load:
      - "color-system"
      - "typography-system"
      - "brand-compliance-rules"
      - "social-formats"
      - "layout-patterns"
      - "logo-usage"
    load_if_relevant:
      - "data-viz-patterns"      # if slides include charts
    token_budget: 4200

  presentation:
    description: "Slide deck via Marp or python-pptx"
    asset_type: "deck"
    render_tool: "marp"
    always_load:
      - "color-system"
      - "typography-system"
      - "brand-compliance-rules"
      - "presentation-layouts"
      - "logo-usage"
    load_if_relevant:
      - "data-viz-patterns"
      - "imagery-direction"
    token_budget: 4000

  document:
    description: "PDF report, white paper, one-pager via Typst"
    asset_type: "document"
    render_tool: "typst"
    always_load:
      - "color-system"
      - "typography-system"
      - "brand-compliance-rules"
      - "document-patterns"
      - "spacing-and-grid"
    load_if_relevant:
      - "data-viz-patterns"
      - "accessibility-minimums"
    token_budget: 4200

  chart:
    description: "Data visualization via Vega-Lite or Recharts"
    asset_type: "chart"
    render_tool: "vega-lite"
    always_load:
      - "color-system"
      - "typography-system"
      - "data-viz-patterns"
      - "brand-compliance-rules"
    load_if_relevant:
      - "accessibility-minimums"
    token_budget: 2500

  email:
    description: "Branded email template via React Email"
    asset_type: "email"
    render_tool: "react-email"
    always_load:
      - "color-system"
      - "typography-system"
      - "brand-compliance-rules"
      - "logo-usage"
      - "buttons-and-ctas"
    token_budget: 3000

  web_component:
    description: "React component with Tailwind v4 + brand tokens"
    asset_type: "component"
    render_tool: "tailwind"
    always_load:
      - "color-system"
      - "typography-system"
      - "spacing-and-grid"
      - "buttons-and-ctas"
      - "cards-and-containers"
      - "forms-and-inputs"
      - "brand-compliance-rules"
      - "accessibility-minimums"
    token_budget: 4500

  video:
    description: "Remotion-generated video or animation"
    asset_type: "video"
    render_tool: "remotion"
    always_load:
      - "color-system"
      - "typography-system"
      - "motion-and-animation"
      - "brand-compliance-rules"
      - "logo-usage"
      - "social-formats"
    load_if_relevant:
      - "imagery-direction"
      - "data-viz-patterns"
    token_budget: 4000

  ai_image_generation:
    description: "Generate custom imagery via Gemini/Recraft/FLUX"
    asset_type: "generated-image"
    render_tool: "gemini|recraft|flux"
    always_load:
      - "color-system"
      - "imagery-direction"
      - "ai-generation-prompts"
      - "brand-compliance-rules"
    token_budget: 2700

  design_review:
    description: "Review existing asset for brand compliance"
    asset_type: "review"
    always_load:
      - "brand-compliance-rules"
      - "accessibility-minimums"
    load_if_relevant:
      # Reviewer-specific chunks loaded per reviewer agent
      - "color-system"        # color-reviewer
      - "typography-system"   # typography-reviewer
      - "layout-patterns"     # layout-reviewer
      - "logo-usage"          # brand-element-reviewer
    token_budget: 3000
```

---

## 6. The router skills

### 6.1 `visual-kit` (mirrors `brand-kit`)

**Purpose:** Load the right visual chunks for a given task.

**Behavior:**
1. Identify task type (social_image, presentation, document, etc.)
2. Read `_retrieval-rules.yaml`, find matching profile
3. Load `always_load` chunks
4. Conditionally load `load_if_relevant` chunks based on context
5. Return 2,500-4,500 tokens of visual knowledge

**Output:** Formatted brand knowledge ready for agent consumption.

### 6.2 `asset-craft` (mirrors `content-craft`)

**Purpose:** Route to asset-specific workflows + shared craft references.

**Workflows (one per asset type):**
- `social-image.md` — How to brief → render → review social images
- `carousel.md` — Multi-slide carousel production workflow
- `presentation.md` — Marp-based slide production
- `document.md` — Typst PDF production
- `chart.md` — Vega-Lite chart generation
- `email.md` — React Email template filling
- `web-component.md` — Tailwind + tokens component creation
- `video.md` — Remotion composition (Phase 4)

**References (shared craft):**
- `composition-principles.md` — Balance, hierarchy, visual flow
- `color-application.md` — When to use primary vs accent
- `typography-application.md` — Heading/body pairing, measure, rhythm
- `asset-review-checklist.md` — Self-audit before human/AI review

---

## 7. The agent layer

### 7.1 Research agents (2)

**`visual-researcher`**
- Finds reference visuals (competitor assets, inspiration, industry patterns)
- Uses WebFetch, Explore agent, Google Image search
- Produces: research.md with reference images, visual patterns, competitive analysis

**`asset-briefer`**
- Consumes concept + research, produces writer-ready visual brief
- Output: `brief.md` with exact specs (dimensions, format, key elements, mood, constraints)
- Same pattern as `brief-writer` in parent system — brief-as-contract

### 7.2 Design agents (3)

**`asset-designer`**
- Primary producer. Takes brief + template, produces initial design
- Different workflows per asset type (Satori JSX, Typst, Remotion, etc.)
- Output: `variants/draft-01.{ext}` with 3 variants for comparison

**`image-prompt-engineer`**
- Specialized for AI image generation
- Takes concept + `ai-generation-prompts.md` chunk, crafts optimized prompts
- Handles seed management, reference images, negative prompts
- Outputs multiple prompt variations for A/B testing

**`design-iterator`**
- Wraps the existing `design-iterator` skill
- Takes initial design, runs screenshot → analyze → improve N times
- Stops when quality threshold met or max iterations reached
- Output: `variants/iteration-N.{ext}` history

### 7.3 Review agents (5 parallel swarm)

Following the **exact pattern** of the parent system's `/myvault:edit` — 5 agents spawned in a single message, run in parallel, consolidated:

| Agent | Reviews | Chunks loaded |
|---|---|---|
| `color-reviewer` | Color usage, ratios, compliance | color-system, brand-compliance-rules |
| `typography-reviewer` | Type hierarchy, pairing, rhythm | typography-system, brand-compliance-rules |
| `layout-reviewer` | Composition, balance, hierarchy, whitespace | layout-patterns, spacing-and-grid, brand-compliance-rules |
| `brand-element-reviewer` | Logo usage, clear space, iconography | logo-usage, iconography, brand-compliance-rules |
| `accessibility-reviewer` | WCAG 2.2, contrast, min sizes | accessibility-minimums |

**How review works:**
1. Each reviewer receives the asset (screenshot or file)
2. Each uses Claude's vision capability to analyze against their scoped chunks
3. Each returns structured findings (pass/needs-work per check + evidence)
4. Orchestrator merges into unified report with actionable notes

---

## 8. The command layer

All commands follow the `/myvault:` namespace convention.

### 8.1 Design commands

| Command | What it does | Invokes |
|---|---|---|
| `/myvault:design-brief <concept>` | Create visual brief from concept | `visual-researcher` + `asset-briefer` |
| `/myvault:design-asset <brief>` | Generic asset generation — infers type from brief | `asset-designer` (type-specific) |
| `/myvault:design-social <spec>` | OG image / Twitter card / IG post | `asset-designer` (social workflow) |
| `/myvault:design-carousel <spec>` | LinkedIn / IG multi-slide carousel | `asset-designer` (carousel workflow) |
| `/myvault:design-presentation <spec>` | Marp slide deck | `asset-designer` (presentation workflow) |
| `/myvault:design-document <spec>` | Typst PDF report | `asset-designer` (document workflow) |
| `/myvault:design-chart <data>` | Vega-Lite branded chart | `asset-designer` (chart workflow) |
| `/myvault:design-email <brief>` | React Email branded template | `asset-designer` (email workflow) |
| `/myvault:design-generate-image <brief>` | AI image via Gemini/Recraft | `image-prompt-engineer` + MCP |
| `/myvault:design-iterate <asset> <N>` | N rounds of screenshot-improve | `design-iterator` |
| `/myvault:design-review <asset>` | 5-agent parallel review swarm | All 5 review agents (parallel) |
| `/myvault:design-video <spec>` | Remotion video (Phase 4) | `asset-designer` (video workflow) |

### 8.2 Example flows

**Flow 1: Blog post OG image**
```
/myvault:design-social OG image for blog post "Why privacy matters for families"
  → visual-kit loads: color-system, typography-system, brand-compliance-rules, social-formats, logo-usage
  → asset-designer picks Satori template "og-blog.tsx"
  → Fills props: title, subtitle, brand colors from tokens
  → Renders PNG
  → Saves to `50-Website/Blog/{slug}/images/og.png`
  → Invokes /myvault:design-review (5-agent swarm)
  → Consolidated feedback → iterate if needed
  → Final image committed
```

**Flow 2: Quarterly report PDF**
```
/myvault:design-document Q2 2026 marketing report
  → visual-kit loads: color-system, typography-system, document-patterns, data-viz-patterns
  → asset-designer picks Typst template "brand-report.typ"
  → Content generated by parent `/myvault:write` (separate workflow)
  → Visual design integrates content + brand theme + charts (via /myvault:design-chart)
  → Typst compiles to PDF
  → /myvault:design-review
  → Final PDF
```

**Flow 3: Video stat card (Phase 4)**
```
/myvault:design-video stat: "97% of families have unorganized photos"
  → visual-kit loads: color-system, typography-system, motion-and-animation, social-formats
  → asset-designer picks Remotion composition "stat-card.tsx"
  → Fills props: stat, source, brand theme
  → Remotion renders MP4 (local or Lambda)
  → /myvault:design-review (includes motion-and-animation checks)
  → Final MP4
```

---

## 9. Figma integration architecture

### 9.1 Figma's role: mirror, not source

**Principle:** The vault is the source of truth. Figma is a human-friendly mirror. One-way sync: tokens flow vault → Figma.

### 9.2 The bidirectional workflow

```
Vault (source)                         Figma (mirror)
  │                                      │
  │ tokens/brand.tokens.json             │
  │           │                          │
  │           ▼                          │
  │ Style Dictionary ────────────────────┼───────► Figma variables
  │           │                          │         (via figma-console
  │           ▼                          │          MCP: figma_setup_
  │           ▼                          │          design_tokens)
  │ Generated: tokens.css, tokens.ts,   │
  │            tailwind, typst, etc.    │
  │                                      │
  │                              ◄───────┤
  │                              Designer refines in Figma
  │                                      │
  │ get_design_context(nodeId) ──────────┤ Claude Code reads back
  │           │                          │ design for code gen
  │           ▼                          │
  │ React components generated           │
  │ (for website/app)                    │
  │                                      │
```

### 9.3 Specific Figma patterns

**Pattern 1: Push tokens to Figma** (one-time + on change)
```
Vault: brand.tokens.json changes
  → Style Dictionary build
  → figma-console MCP: figma_setup_design_tokens + figma_batch_create_variables
  → Figma variables updated (primitive + semantic collections, modes for light/dark)
```

**Pattern 2: Generate a new screen from description**
```
User: "Design the pricing page section for enterprise tier"
  → figma-remote MCP: generate_figma_design
  → Figma creates editable layers using brand design system
  → Designer refines in Figma
  → Claude reads back via get_design_context
  → React component generated for myvault-tools
```

**Pattern 3: Build asset in Figma, export to brand-studio**
```
Designer creates new social template in Figma
  → figma_execute: export frames as SVG
  → Save to myvault-tools/brand-studio/templates/social/
  → Convert SVG to Satori JSX (manual or automated)
  → Template available for `/myvault:design-social`
```

**Pattern 4: Design system linting**
```
figma-console: figma_lint_design on entire library
  → Detects hardcoded colors, missing tokens, accessibility issues
  → Reports violations
  → Fix in Figma OR update tokens in vault
```

### 9.4 When to use which MCP

| Task | Use |
|---|---|
| Read a Figma design to generate code | `figma-remote` (simpler, official) |
| Push tokens from vault to Figma | `figma-console` (has `figma_setup_design_tokens`) |
| Create new Figma designs programmatically | `figma-console` (full Plugin API, 94+ tools) |
| Accessibility scan a Figma file | `figma-console` (`figma_lint_design`) |
| Code Connect mapping | `figma-remote` (official tooling) |
| Bulk asset export | `figma-console` (`figma_execute` for scripts) |

---

## 10. Image generation architecture

### 10.1 Three tiers of imagery

**Tier 1: Code-generated (deterministic, perfect brand)**
- Satori JSX for OG images, social cards, carousel slides
- Typst for document covers, report graphics
- Remotion for video stills (Phase 4)
- Vega-Lite for all charts/data viz
- **Use when:** Template-driven, repeatable, text-heavy, data-driven

**Tier 2: AI-generated (creative, high variability)**
- Gemini (Nano Banana) via nanobanana-mcp — general use, 14 reference images, free tier
- Recraft V4 — vector/SVG assets, brand-trained styles, 100+ presets
- FLUX 2 Pro via fal.ai — highest quality, 8 reference images
- Ideogram 3.0 — when text-in-image accuracy matters
- **Use when:** Novel imagery, creative exploration, hero images, illustrations

**Tier 3: Photo-realistic human/product (professional needs)**
- Adobe Firefly with Custom Models — enterprise brand training (future, requires $1K/mo commitment)
- Stable Diffusion + LoRA trained on brand reference set — maximum consistency (future, requires GPU)
- **Use when:** Photography-quality outputs, very high consistency requirements

### 10.2 The `ai-generation-prompts.md` chunk structure

This chunk is load-bearing — it teaches agents how to craft prompts that respect brand rules:

```markdown
## Gemini (Nano Banana) — general purpose

### Base prompt structure
[subject] + [style constraints] + [brand color enforcement] + [composition] + [quality markers]

### MyVault brand constraints (ALWAYS INCLUDE)
- "Natural warm lighting, golden hour feel"
- "Color palette: teal #094545, warm sand #FBF7F5, subtle purple #621C3F accent"
- "Authentic family moment, not staged"
- "Real home environment, not studio"
- "Diverse family composition"

### Negative constraints (ALWAYS INCLUDE)
- "not stock photo style"
- "not corporate diversity photo"
- "not AI-generated-looking (no distorted hands, no extra fingers)"
- "not fake UI on devices"

### Reference images (attach 3-5)
Use from: `myvault-tools/brand-studio/reference/imagery/approved/*.jpg`

### Example approved prompt
"A mother and child sitting on a worn leather couch in a sun-filled living room,
natural warm window light, the mother looking at a tablet showing organized photos,
teal and warm sand color palette, shallow depth of field, authentic moment,
[REFERENCE: family-photo-001.jpg, family-photo-003.jpg]"
```

### 10.3 The generate-evaluate-iterate chain

```
Claude analyzes brief + loads ai-generation-prompts chunk
  ↓
Claude crafts prompt using brand constraints
  ↓
Gemini generates 3-4 variations (nanobanana-mcp)
  ↓
Claude reads each (vision) → scores against brand-compliance-rules.md
  ↓
If best < threshold → refine prompt → regenerate (max 3 iterations)
  ↓
If best >= threshold → save to variants/ folder
  ↓
design-review swarm gives final verdict
  ↓
Human curation → approved → final.png
```

### 10.4 MCP installation checklist

```bash
# Phase 1 — free Gemini
claude mcp add nanobanana-mcp -- npx -y @ycse/nanobanana-mcp \
  -e "GOOGLE_AI_API_KEY=$YOUR_KEY"

# Phase 2 — add Recraft for vectors
npx @recraft-ai/mcp-recraft-server

# Phase 3 — add OpenAI as backup
claude mcp add openai-image-gen -- npx -y openai-gpt-image-mcp \
  -e "OPENAI_API_KEY=$YOUR_KEY"

# Future — FLUX via fal.ai for highest quality
# Future — LoRA training on SD for maximum consistency
```

---

## 11. Video generation architecture (Phase 4)

### 11.1 Why Remotion

- **React-native** — same stack as myvault-tools
- **Deterministic** — template-driven = perfect brand consistency
- **Claude Code skill** — official skill (`npx skills add remotion-dev/skills`) released Jan 2026, huge adoption
- **Lambda parallel rendering** — 1-min video in ~30 seconds
- **Pricing** — free for ≤3 employees, $25/dev/mo + $10/1000 renders if scaled
- **Token integration** — brand tokens become Remotion props the same way they become Satori props

### 11.2 Proposed compositions

| Composition | Dimensions | Purpose | Template file |
|---|---|---|---|
| `stat-card` | 1080x1080 | Single stat animation for LinkedIn | `stat-card.tsx` |
| `quote-card` | 1080x1080 | Quote with author attribution | `quote-card.tsx` |
| `data-viz-reveal` | 1920x1080 | Chart animation for reports | `chart-reveal.tsx` |
| `intro-outro` | 1920x1080 | Brand bumpers for videos | `intro-outro.tsx` |
| `carousel-to-video` | 1080x1350 | Convert LinkedIn carousel → video | `carousel-video.tsx` |
| `weekly-report-summary` | 1920x1080 | Weekly product/marketing recap | `weekly-summary.tsx` |

### 11.3 Hybrid video pipeline

```
Code-based (Remotion):
  Templates, stat cards, data reveals, intro/outro, carousel-to-video

Generative fallback (fal.ai MCP → Kling/Veo/Runway):
  Hero B-roll, creative shots where novelty > consistency

Branded avatars (HeyGen MCP, optional):
  On-brand AI avatar for Markos's newsletter video summaries

Orchestration:
  Claude Code chooses which pipeline per asset type
  Template-first for recurring content, generative for creative shots
```

---

## 12. Validation & compliance

### 12.1 Three validation layers

**Layer 1: Token validation (automated)**
- Audit script in `myvault-tools/brand-studio/cli/audit-tokens.ts`
- Scans generated outputs for hardcoded values not in token file
- Returns exit code 1 if violations found (CI-ready)
- Pattern from Atlassian case study (418 violations → 0)

**Layer 2: AI review swarm (5 parallel agents)**
- `/myvault:design-review` invokes all 5 reviewers
- Each scoped to specific concern (color, typography, layout, brand elements, accessibility)
- Consolidated report with pass/needs-work per axis + evidence crops

**Layer 3: Human curation (mandatory gate)**
- Every asset ships only with explicit human approval
- Review notes archived in `review.md` alongside asset
- Rejected assets stay in `variants/rejected/` for learning

### 12.2 Brand compliance metrics

Track over time:
- % of assets passing review on first iteration
- Average iterations to approval
- Token hardcode violations per build
- Accessibility score trends

### 12.3 The Google self-healing loop (for AI-generated imagery)

```
1. Generate image (Gemini)
2. Gemini/Claude reviews against brand rules (exact hex codes, composition, logo placement)
3. System automatically adjusts prompt with specific corrections
4. Regenerate. Repeat 3-5 iterations until compliant
5. No human intervention between attempts
```

Proven pattern from [Google Cloud blog](https://cloud.google.com/transform/closing-the-creative-gap-how-gemini-supports-brand-consistency). We'll adopt this for `/myvault:design-generate-image`.

---

## 13. Implementation roadmap

### Phase 1: Foundation (Week 1-2, zero cost)

**Goal:** Codify the token system; get basic renderers working.

1. **Create W3C DTCG token file** from `visual-system.md`
   - Path: `10-Brand/visual-system/tokens/brand.tokens.json`
   - Primitive + semantic tokens
   - Validation schema
2. **Set up Style Dictionary** in myvault-tools
   - Config for CSS, Tailwind, TypeScript outputs
   - Add build script to myvault-tools package.json
3. **Create first 3 chunks:**
   - `color-system.md`
   - `typography-system.md`
   - `brand-compliance-rules.md`
4. **Install Satori + dependencies** in myvault-tools
5. **Build first template:** `og-default.tsx`
6. **Create first command:** `/myvault:design-social`
7. **Test end-to-end:** Generate OG image for a blog post

**Deliverables:**
- Token file + Style Dictionary build pipeline
- 3 chunks (color, typography, compliance rules)
- 1 working command (`/myvault:design-social`)
- 1 rendered OG image

### Phase 2: Core asset pipelines (Week 3-4)

**Goal:** Cover the highest-volume asset types.

1. **Install nanobanana-mcp** for Gemini image gen (free tier)
2. **Create remaining foundation + identity chunks** (8 more chunks)
3. **Build templates:**
   - `og-blog.tsx`, `og-newsletter.tsx` (Satori)
   - `li-carousel-slide.tsx` (Satori series)
   - `brand-report.typ` (Typst)
   - Vega-Lite brand config
4. **Create commands:**
   - `/myvault:design-carousel`
   - `/myvault:design-document`
   - `/myvault:design-chart`
   - `/myvault:design-generate-image`
5. **Push tokens to Figma** via `figma_setup_design_tokens`
6. **Build visual-kit skill**
7. **Build asset-craft skill** with first 4 workflows

**Deliverables:**
- 11 chunks total
- 2 router skills
- 4 commands
- 5+ templates
- Gemini image generation working

### Phase 3: Review automation (Week 5-6)

**Goal:** Automate brand compliance checking.

1. **Create remaining chunks** (components, patterns, guardrails — 8 more)
2. **Create all 5 review agents:**
   - color-reviewer, typography-reviewer, layout-reviewer, brand-element-reviewer, accessibility-reviewer
3. **Build `/myvault:design-review` command** (parallel swarm, mirrors `/myvault:edit`)
4. **Build design-iterator agent** wrapping existing skill
5. **Build `/myvault:design-iterate` command**
6. **Create brand reference image set** (15-20 curated images)
7. **Build token audit CLI** (`cli/audit-tokens.ts`)
8. **Document the full system** in `CLAUDE.md` and `README.md`

**Deliverables:**
- All 19 chunks complete
- 5 review agents + design-iterator agent
- 2 more commands (review, iterate)
- Full documentation
- Brand reference image library

### Phase 4: Video + scale (Month 2-3)

**Goal:** Add video pipeline; scale production.

1. **Install Remotion Skill** (`npx skills add remotion-dev/skills`)
2. **Build Remotion compositions** (stat-card, quote-card, intro-outro, carousel-video)
3. **Set up Lambda rendering** (Remotion Lambda on AWS)
4. **Create `/myvault:design-video` command**
5. **Add motion-and-animation chunk**
6. **Optional:** HeyGen MCP for Markos avatar
7. **Optional:** Chromatic for visual regression testing
8. **Build asset analytics** (track what's generated, what works, what's rejected)

**Deliverables:**
- Video pipeline live
- `/myvault:design-video` command
- Analytics dashboard
- Scale-ready infrastructure

### Phase 5: Advanced (Month 4+)

1. **LoRA training** on FLUX/SD for maximum brand consistency (if GPU available)
2. **Interactive brand book** at tools.myvaultai.com/brand (auto-generated from tokens)
3. **Custom MCP server** exposing the visual brand system to external tools
4. **Figma plugin** that enforces compliance during design
5. **Evaluate Supernova** for enterprise-grade design system management

---

## 14. Open questions for decision

### 14.1 Structural decisions

**Q1:** Should `visual-system/` be a **sibling** to `brand-system/` or a **satellite** that inherits from it?

- **Option A — Sibling** (my recommendation): Parallel system, clean separation, explicit dependencies via `_manifest.yaml`. Follows the pattern of existing satellites (Newsletter, Voice of Markos).
- **Option B — Satellite**: Lighter structure, `parent_chunks_if_relevant` pulls voice/positioning from parent. Less duplication but more complex routing.

**Recommendation:** A — sibling. Visual has its own chunks, agents, commands; conceptually parallel.

**Q2:** Should `asset-craft` workflows live in `visual-system/skills/asset-craft/workflows/` or in `myvault-tools/brand-studio/docs/`?

- **Option A — In vault**: Markdown for Claude Code, keeps knowledge in vault
- **Option B — In code**: Next to template files they describe

**Recommendation:** A — vault. Workflows are agent-facing guidance, not executable code.

### 14.2 Tool decisions

**Q3:** Primary AI image generator — Gemini, Recraft, or both?

- **Option A — Gemini first** (free tier, 14 reference images, general purpose)
- **Option B — Recraft first** (purpose-built for brand assets, vector output, paid)
- **Option C — Both** (Gemini for exploration, Recraft for final)

**Recommendation:** C. Start with Gemini (free), add Recraft when volume justifies the cost.

**Q4:** Video — Remotion or AI generative?

- **Option A — Remotion only** (deterministic, template-driven)
- **Option B — Hybrid** (Remotion for templates, fal.ai for generative)

**Recommendation:** B — hybrid, but Phase 4 only.

**Q5:** Do we build Figma as **read-only mirror** or **bidirectional source of truth**?

- **Option A — Read-only mirror** (my recommendation): Vault is source, tokens push to Figma
- **Option B — Bidirectional**: Designer edits Figma, Tokens Studio syncs back to vault
- **Option C — Figma-first**: Figma is source, vault mirrors

**Recommendation:** A. Avoids merge conflicts, keeps vault as canonical.

### 14.3 Operational decisions

**Q6:** Who owns what?

| Area | Current | Proposed |
|---|---|---|
| Visual chunks (colors, typography, etc.) | Mark | Mark (domain owner) |
| Brand compliance rules | Mark | Mark |
| Templates | — | Mark (small changes) + Markiian (major redesigns) |
| AI prompt engineering | — | Mark |
| Image library curation | — | Mark |
| Video compositions | — | TBD (possibly Supermega Design?) |

**Q7:** What's the review threshold for each asset type?

- Blog OG image: auto-review + human approval
- Quarterly report PDF: human review, external designer approval
- LinkedIn carousel: auto-review + Mark approval
- Voice of Markos content: Markos approval (as currently)

**Q8:** Should we package this as a **Claude Code plugin** for distribution?

- The parent brand-system is already distributed as a plugin (private repo)
- Visual system could follow same pattern
- Pros: Team can install easily, version-controlled
- Cons: More complexity, GitHub repo setup

**Recommendation:** Later (Phase 3+). Start in-vault, extract to plugin once stable.

---

## 15. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **Scope creep** — trying to build everything at once | Strict phase discipline; Phase 1 is 3 chunks + 1 template + 1 command |
| **Premature abstraction** — over-engineering before understanding needs | Start with simplest possible chunks; evolve based on actual usage |
| **Token drift** — chunks grow, budgets break | Audit every chunk change; recalculate `always_load` sums |
| **Brand drift** — AI-generated content slowly deviates | Mandatory human gate before any external publication |
| **Template rot** — templates break when tokens change | CI check that renders all templates on every token change |
| **Tool lock-in** — Figma, Gemini become dependencies | Markdown + W3C DTCG is portable; tooling can be swapped |
| **Security** — AI API keys | Never in vault; always in Vercel env vars or `.env.local` (already gitignored) |
| **Accessibility regression** — new assets fail WCAG | Accessibility-reviewer in every review swarm |
| **Cost overrun** — AI generation gets expensive | Free tier for Gemini, hard limits in Phase 1-3; monitor spend |

---

## 16. Success metrics

How we'll know this is working:

| Metric | Phase 1 target | Phase 3 target | Phase 5 target |
|---|---|---|---|
| Asset types supported | 1 (OG image) | 6 (OG, carousel, doc, chart, email, component) | 8 (+ video, AI gen) |
| Chunks complete | 3 | 19 | 19+ |
| Commands working | 1 | 10 | 12+ |
| Assets generated per week | 1-2 | 10-15 | 30+ |
| First-iteration review pass rate | — | 60% | 80% |
| Token hardcode violations | n/a | 0 | 0 |
| Average time to asset (brief → approved) | — | < 30 min | < 10 min |
| Brand consistency score (AI-judged) | — | 85% | 95% |

---

## 17. What this unlocks

If we ship this:

1. **10x faster asset production** — OG image in 30 seconds, not 2 hours
2. **Perfect brand consistency at scale** — templates are deterministic
3. **Agent-native brand** — any future AI tool can consume our brand system
4. **Compounding value** — every chunk, template, and command is reusable
5. **Competitive parity** — matches what brand.ai, Typeface, Writer are building, at a fraction of the cost
6. **Strategic moat** — portable brand system that survives tool changes; our competitors are platform-locked
7. **Team scaling** — new hires can produce on-brand assets day one
8. **Voice × Visual unification** — same architectural pattern across verbal and visual brand = coherent brand OS

---

## 18. Next steps

1. **Review this proposal** — does the structure make sense? What would you change?
2. **Answer open questions** in Section 14
3. **Approve Phase 1 scope** (3 chunks + 1 template + 1 command + token pipeline)
4. **Write Phase 1 ADR** — `10-Brand/visual-system/ADR/0001-visual-system-architecture.md`
5. **Begin Phase 1 implementation**

---

## Appendix A: Inspiration references

| Reference | What we're borrowing |
|---|---|
| GitHub Primer | Three-tier token structure, AI-readable metadata |
| Shopify Polaris | Semantic naming conventions |
| Atlassian design system | Four-layer LLM-ready system (spec files, token layer, audit script, upstream sync) |
| Typeface Arc Graph | Brand intelligence layer pattern |
| OpenPencil | Multi-agent design orchestration |
| Existing MyVault brand-system | Entire architectural pattern |
| MRBS Specification | Brand-as-code structure |
| Google Gemini self-healing loop | Auto-refine AI generation |
| Deloitte Digital Orb Foundry | AI-generated brand assets workflow |

## Appendix B: File count estimate

| Category | Files |
|---|---|
| Markdown chunks | 19 |
| Router skills | 2 (+ design-iterator reference) |
| Agents | 10 (2 research + 3 design + 5 review) |
| Commands | 12 |
| Workflows (in asset-craft) | 8 |
| References (in asset-craft) | 4 |
| Manifest/retrieval rules | 2 |
| Documentation (README, CLAUDE.md, ADRs) | 5 |
| Tokens (JSON + schema) | 2 |
| **Total in vault** | **~64 files** |
| Templates (in myvault-tools) | 15-20 |
| CLI tools (in myvault-tools) | 4 |
| Generated token outputs | 6 |
| **Total in myvault-tools** | **~25-30 files** |

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-16 | Initial design proposal — multi-agent research synthesis across existing architecture mapping, Figma/video research, agent orchestration patterns | Mark |
