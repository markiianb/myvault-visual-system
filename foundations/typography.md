---
chunk_id: typography
domain: foundations
subcategory: typography
type: chunk
status: active
version: "1.0"
last_updated: 2026-04-29
owner: mark
summary: "Typography rules for MyVault. Two families (PT Serif Regular for display+heading, Lato Regular for body+caption). 12 styles across 4 tiers. HARD rules (R-TYPE-001..009) with machine-checkable predicates, BASE rules (80/15/5 tier distribution, body floor by context, 14pt practical floor), pairings matrix, tier semantics, decision tree."
token_count_estimate: 1150
token_dependencies:
  - typography.display.*
  - typography.heading.*
  - typography.body.*
  - typography.caption
related_token_dependencies:
  - color.core.black
  - color.core.teal
  - color.core.white
  - color.core.off-white
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "121:10779"
  pageName: Typography
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=121-10779"
review_axes:
  - typography-reviewer
  - accessibility-reviewer
related_chunks:
  - color
  - logo-usage
  - iconography
  - brand-compliance-rules
related_memories:
  - feedback_regular_weight_only
  - feedback_no_uppercase_eyebrows
  - feedback_myvault_fonts_lato_primary
  - feedback_presentation_design_canon
  - feedback_14pt_practical_text_floor
  - feedback_hero_color_80_20_black_teal
---

# Typography

## Purpose & scope

This chunk governs every typography decision in MyVault visual deliverables — family selection, size, line-height, weight, case, text-decoration, tier pairing, and size floor by context. It applies to every renderer downstream of `tokens/brand.tokens.json`: presentations, social images, documents, ebooks, charts, email, and web. It does not govern color (see [[color]]) or layout/spacing (future foundation chunk).

## Tokens this chunk governs

| Tier | Token paths | Family · Weight | Sizes (px) |
|---|---|---|---|
| Display | `typography.display.{xxl, xl, l, m, s}` | PT Serif Regular | 160 / 120 / 96 / 72 / 56 |
| Heading | `typography.heading.{l, m}` | PT Serif Regular | 40 / 28 |
| Body | `typography.body.{xl, l, default, s}` | Lato Regular | 20 / 18 / 16 / 14 |
| Caption | `typography.caption` | Lato Regular | 12 |

12 styles total. All bound to Figma text styles. Source of truth: `tokens/brand.tokens.json` (composite `typography` type).

## Severity tiers

- **HARD** — non-negotiable. Reviewer agents reject work that violates these. Each carries a stable ID (`R-TYPE-NNN`) and where possible a machine-checkable predicate.
- **BASE** — defaults that apply unless there's a specific reason to deviate. Document the deviation when you take one.
- **GUIDANCE** — heuristics that inform choice but aren't enforced.

## HARD rules

### R-TYPE-001 — Never use a non-Regular font weight
- **Rationale:** MyVault's emphasis system is size + color + spacing — never weight. Bold, Medium, SemiBold, ExtraBold all break the system.
- **Check:** `text.fontWeight != 400 || text.fontStyleLiteral not in ["Regular"]` → reject.

### R-TYPE-002 — Never use a font outside Lato or PT Serif
- **Rationale:** The two-family system is closed. Adding a third family fragments the brand.
- **Check:** `text.fontFamily not in ["Lato", "PT Serif"]` → reject.

### R-TYPE-003 — Tier↔family mapping is fixed
- **Rationale:** PT Serif Regular handles display + heading. Lato Regular handles body + caption. Reversing the mapping breaks the visual register.
- **Check:**
  - `text.tier in [display, heading] && text.fontFamily != "PT Serif"` → reject.
  - `text.tier in [body, caption] && text.fontFamily != "Lato"` → reject.

### R-TYPE-004 — Never place an uppercase letter-spaced eyebrow above a title
- **Rationale:** Eyebrow/kicker tags signal "branded-up" instead of confident. Emphasis comes from size and rhythm, not labels.
- **Check:** `text.textCase == "UPPER" && text.letterSpacing > 0 && text.size < adjacent.title.size && text.position above title` → reject.

### R-TYPE-005 — Never use text below 14pt (general use)
- **Rationale:** 14pt is the practical floor. 12pt (`typography.caption`) is rare-instance only — must be deliberate (legal disclaimers, dense data table footnotes).
- **Check:** `text.fontSize < 14 && context.allows_caption != true` → reject. The `allows_caption` flag must be set explicitly in the deliverable spec.

### R-TYPE-006 — Never use body text below 18pt in presentations
- **Rationale:** Audiences read slides from across the room. Below 18pt fails them.
- **Check:** `deliverable.context == "presentation" && text.role == "body" && text.fontSize < 18` → reject.

### R-TYPE-007 — Never use display tier for body content
- **Rationale:** Display sizes are for hero moments. Used for paragraphs, lists, or running content, the reader stops reading the words and starts reading the size.
- **Check:** `text.tier == "display" && text.role in [body, list-item, paragraph]` → reject.

### R-TYPE-008 — Never use Vault Teal in heading or below-display sizes
- **Rationale:** Vault Teal is a hero color — earns impact only at display sizes. Heading-size or body-size teal dilutes the asset. Cross-refs [[color#R-COLOR-009]].
- **Check:** `text.fill.token == "color.core.teal" && text.tier != "display"` → reject.

### R-TYPE-009 — Never use text-decoration or italic for emphasis
- **Rationale:** Underline, strikethrough, and italic styling all break the "emphasis comes from size + color + spacing" principle. Italic isn't even available in the token system (Regular only).
- **Check:** `text.textDecoration in ["UNDERLINE", "STRIKETHROUGH"] || text.fontStyleLiteral == "Italic"` → reject. Underline is permitted only on hyperlinks where required by accessibility convention.

## BASE rules

### 80 / 15 / 5 tier distribution
Across a typical deliverable, by occurrence:
- ~80% body + caption — the substance of any deliverable
- ~15% heading — section structure
- ~5% display — hero moments only

The numbers are approximate. Some pages run heavier on headings (a structured doc); some run almost all body (a long-form essay). What matters is the hierarchy: body dominates, headings divide, display punctuates. If display creeps above ~5%, the work is over-using its hero tier.

### 80 / 20 black/teal hero split
When display tier is used:
- ~80% of the time it's `color.core.black`
- ~20% of the time it's `color.core.teal` at display sizes (a 144pt divider word, a hero accent phrase)

Reach for teal only when the work needs the extra hit of brand presence beyond what black at hero size already provides. Cross-refs [[color]] hero rule.

### Body floor by context
- **Presentations:** 18pt body floor (audiences read across the room) — HARD via R-TYPE-006
- **Documents / web:** 16pt body floor (on-screen, arm's length)
- **Dense reference** (tables, footnotes, foundation page meta rows): 14pt minimum
- **Caption-only contexts** (rare): 12pt minimum, deliberate use only

### Default content color: black
Body, headings, captions default to `color.core.black` unless on a dark surface (then `color.core.white` or `color.core.off-white` per [[color]] pairings).

### Default line-height (per token, do not override)
- Display: 105–115% (set in the token)
- Heading: 125–130%
- Body: 140–155%

These come from the typography composite tokens. Don't override line-height except for very specific cases (e.g., a single-word divider where line-height doesn't matter).

## Type pairings matrix

Common compositions and their tier combinations.

```yaml
pairings:
  - context: cover
    headline: display/m
    subtitle: body/xl
    rationale: "Hero cover headline + subtitle pair. The 80/20 black-teal split applies — most covers are black; 144pt teal divider words are the rare accent."

  - context: section-opener
    headline: heading/l
    body: body/l
    rationale: "Top of a major section. heading/l (40pt) + body/l (18pt)."

  - context: subsection
    headline: heading/m
    body: body/default
    rationale: "Subsection within a section. heading/m (28pt) + body/default (16pt)."

  - context: body-block
    body: body/default
    rationale: "Default body paragraphs. 16pt with 150% line-height."

  - context: dense-reference
    body: body/s
    rationale: "Tables, footnotes, foundation page meta rows. 14pt — the practical floor."

  - context: microcopy-attribution
    primary: body/xl
    secondary: body/s
    rationale: "Microcopy with attribution. body/xl (20pt) + body/s (14pt). Use caption (12pt) only if the deliverable spec explicitly allows it."

  - context: presentation-slide-body
    body_min: body/l
    rationale: "Presentation body must be 18pt+ (R-TYPE-006). body/l (18pt) is the floor; use body/xl (20pt) for emphasized slide body."

  - context: hero-divider-word
    word: display/xxl
    color: color.core.teal
    rationale: "The single-word teal divider — the canonical 20% teal hero use. Reserved for moments where one word carries the section."
```

## Tier semantics — what each tier is for

| Tier | Use for | Don't use for |
|---|---|---|
| **Display** | Hero moments — covers, divider words, primary CTAs, hero accents | Paragraphs, lists, body content (R-TYPE-007) |
| **Heading** | Section + subsection structure | Hero impact (use display); body (use body tier) |
| **Body** | Substance — paragraphs, lists, captions, microcopy | Hero impact (use display); structural division (use heading) |
| **Caption** | Rare metadata — legal disclaimers, dense table footnotes | General body/microcopy/attribution (use body/s instead — R-TYPE-005) |

## Anti-patterns (Don'ts)

Visual examples live in the Figma canon at page `121:10779` (the Don'ts section).

| # | Anti-pattern | Violates | What goes wrong |
|---|---|---|---|
| 1 | Uppercase letter-spaced eyebrow above a title | R-TYPE-004 | Reads as branded-up; signals insecurity in the title |
| 2 | Body at 12pt in a slide context | R-TYPE-006 | Audience can't read it from across the room |
| 3 | Heading in Vault Teal | R-TYPE-008 | Dilutes Vault Teal; teal earns impact only at display sizes |
| 4 | Display tier used for body copy | R-TYPE-007 | Reader stops reading the words and starts reading the size |

## Decision tree for the agent

When generating any deliverable that uses typography, follow this order:

```
1. Identify context (sets body floor)
   - Presentation                  → body floor 18pt (HARD via R-TYPE-006)
   - Document / web                → body floor 16pt
   - Dense reference               → body floor 14pt
   - Caption-only context          → 12pt allowed (must be deliberate)

2. Pick body size from floor up
   - Default: body/default (16pt)              → if doc/web context
   - Default: body/l (18pt)                    → if presentation context
   - Verify R-TYPE-005 (no text below 14pt for general use)
   - Verify R-TYPE-002, R-TYPE-003 (Lato Regular for body)

3. Pick heading size relative to body
   - Major section opener   → heading/l (40pt) + body/l (18pt)
   - Subsection             → heading/m (28pt) + body/default (16pt)
   - Verify R-TYPE-002, R-TYPE-003 (PT Serif Regular for heading)

4. Pick display ONLY for hero moments
   - Cover headline                       → display/m (72pt) + body/xl subtitle
   - Single-word divider                  → display/xxl (160pt) — 20% teal hero allowed here
   - Primary CTA                          → display/s or m at hero scale
   - Verify R-TYPE-007 (no display for body content)
   - Verify R-TYPE-008 (no teal below display tier)

5. Verify family-tier mapping (R-TYPE-003)
   - Display + Heading must be PT Serif
   - Body + Caption must be Lato

6. Verify weight + decoration (R-TYPE-001, R-TYPE-009)
   - Regular only
   - No bold, italic, underline, strikethrough

7. Verify Don'ts
   - Run through the 4 anti-patterns above
   - Reject if any match

8. Verify accessibility
   - Size compliance (steps 2–4 above)
   - Contrast: cross-ref [[color#accessibility]] approved-pairs table
   - Line-height: do not override token defaults
```

If any HARD rule fails at any step, reject the design and surface the rule ID + rationale to the human reviewer. BASE rule deviations are allowed but must be documented in the deliverable's spec.

## Reviewer agent integration

The two review agents declared in frontmatter consume specific subsets of this chunk:

- **`typography-reviewer`** — runs all HARD rules (R-TYPE-001 through R-TYPE-009), the family-tier mapping, the body floor by context, and BASE-rule sanity checks (80/15/5 tier distribution, default content color).
- **`accessibility-reviewer`** — runs R-TYPE-005 and R-TYPE-006 (size floors), checks line-height conformance, then cross-refs [[color#accessibility]] for the contrast table. A typography combination that fails contrast fails the deliverable.

Each reviewer's output should cite rule IDs (e.g., "R-TYPE-007 violation at node X") so consolidation across reviews is straightforward.

## Cross-references

- **[[color]]** — The 80/20 black/teal hero split lives there as R-COLOR-009 territory; this chunk references it. The WCAG AA contrast table also lives in color — never duplicate.
- **[[logo-usage]]** (future) — Logo wordmarks consume `typography.display.*` constraints implicitly; the logo chunk will cite back to this one.
- **[[brand-compliance-rules]]** (future) — Aggregates universal HARD rules across foundations.

## Visual canon

The rendered version of this chunk lives in Figma:
- File: `Pm31BDHj34WjJ7NjBK4Ady` ("MyVault — Brand Design System")
- Page: `Typography` (id `121:10779`)
- URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=121-10779>

The Figma page hosts the spec strip (Frame 29070) on top and the foundations guide (root frame 125:11209) beneath. They stay in sync — when canon changes, both update.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial. 9 HARD rules, BASE distribution + body floors + family-tier mapping, pairings matrix, tier semantics, decision tree, reviewer-agent integration. Captures Mark's 14pt practical floor canon, Regular-weights-only rule, no-uppercase-eyebrows rule, and the 80/15/5 tier distribution. | Mark + Claude |
