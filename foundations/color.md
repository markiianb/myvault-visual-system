---
chunk_id: color
domain: foundations
subcategory: color
type: chunk
status: active
version: "1.1"
last_updated: 2026-05-01 (R-COLOR-009 chart-card scoped exception ratified; R-COLOR-010 drops Gray from active variants)
owner: mark
summary: "Color rules for MyVault. 14-token palette across Core/Secondary/Signal tiers + 5 gradients. HARD rules (R-COLOR-001..010) with machine-checkable predicates — R-COLOR-009 carries one scoped exception for chart-card annotations at 18 pt. BASE rules (80/10/10 ratio, 80/20 hero split, white default, Greydient default), exhaustive pairings matrix, WCAG 2.2 AA contrast table, and an explicit decision tree for agents."
token_count_estimate: 1100
token_dependencies:
  - color.core.*
  - color.secondary.*
  - color.signal.*
  - color.icon.*
  - gradient.*
asset_dependencies:
  - assets/logo/lockup-primary.svg
  - assets/logo/lockup-white.svg
  - assets/logo/lockup-light.svg
  - assets/logo/lockup-teal.svg
  # lockup-gray.svg is on disk but deprecated (feedback_no_gray_logo_variant)
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "121:10583"
  pageName: Color
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=121-10583"
review_axes:
  - color-reviewer
  - brand-element-reviewer
  - accessibility-reviewer
related_chunks:
  - typography
  - logo-usage
  - iconography
  - brand-compliance-rules
related_memories:
  - feedback_white_is_default_surface
  - feedback_hero_color_80_20_black_teal
  - feedback_presentation_design_canon
  - feedback_no_gray_logo_variant
---

# Color

## Purpose & scope

This chunk governs every color decision in MyVault visual deliverables — surfaces, content, accents, gradients, logo placement, and on-color contrast. It applies to every renderer downstream of `tokens/brand.tokens.json`: presentations, social images, documents, ebooks, charts, email, and web. It does not govern non-color visual decisions (type sizing, layout, motion, iconography) — those live in their own foundation chunks.

## Tokens this chunk governs

| Tier | Token paths | Count |
|---|---|---|
| Core | `color.core.{teal, white, off-white, gray-01, gray-02, black}` | 6 |
| Secondary | `color.secondary.{premium-purple, dark-earth, rich-blue}` | 3 |
| Signal | `color.signal.{go, stop, sky, earth}` | 4 |
| Aliases | `color.icon.default` → `color.core.black` | 1 |
| Gradients | `gradient.{primary, cool, warm, mist, greydient}` | 5 |

All bound to Figma variables/paint styles. Never hardcoded. Source of truth: `tokens/brand.tokens.json`.

## Severity tiers

- **HARD** — non-negotiable. Reviewer agents reject work that violates these. Each carries a stable ID (`R-COLOR-NNN`) and where possible a machine-checkable predicate.
- **BASE** — defaults that apply unless there's a specific reason to deviate. Document the deviation when you take one.
- **GUIDANCE** — heuristics that inform choice but aren't enforced.

## HARD rules

### R-COLOR-001 — Never set teal text on a teal surface
- **Rationale:** text disappears into the surface.
- **Check:** `text.fill.token == "color.core.teal" && text.parent.background.token == "color.core.teal"` → reject.

### R-COLOR-002 — Never tint Vault Teal
- **Rationale:** Vault Teal at full intensity is the brand color. Tinting reads as a different color and dilutes the brand asset.
- **Check:** any color whose nearest token is `color.core.teal` but `ΔE > 2` from `#094545` → reject.

### R-COLOR-003 — Never use signal colors for branding or decoration
- **Rationale:** signal colors carry semantic meaning (status). Decorative use confuses the meaning.
- **Check:** any `color.signal.*` fill outside an explicit status-indicator component → reject.

### R-COLOR-004 — Never stack two accent colors on one surface
- **Rationale:** two strong accents fight; neither wins. The hierarchy collapses.
- **Check:** a single visual unit with `color.core.teal` AND any `color.secondary.*`, OR two distinct `color.secondary.*` on the same parent → reject.

### R-COLOR-005 — Never use off-white as the default surface
- **Rationale:** white is the default. Off-white is the rare alternate, used only where soft warmth is specifically wanted.
- **Check:** top-level frame fill bound to `color.core.off-white` without an explicit override flag in the deliverable spec → flag for review.

### R-COLOR-006 — Never place a gradient under content text
- **Rationale:** gradients have varying luminance. Body text on a gradient passes contrast in some passages and fails in others.
- **Check:** any text node whose direct parent's fill is a `gradient.*` paint style → reject.

### R-COLOR-007 — Never combine more than one gradient on a single surface
- **Rationale:** stacked gradients muddy the surface and break the "gradient as clean background" principle.
- **Check:** any frame with two children both having `gradient.*` fills, where one is positioned over another → reject.

### R-COLOR-008 — Never use signal-go or signal-earth for body or caption text
- **Rationale:** insufficient luminance contrast against any standard surface. Fails WCAG AA.
- **Check:** `text.fill.token` in `[color.signal.go, color.signal.earth]` && `text.role` in `[body, caption]` → reject.

### R-COLOR-009 — Never use Vault Teal in body or title-size text (with one scoped exception)
- **Rationale:** Vault Teal earns its impact at hero size only. Title-size or body teal dilutes the asset.
- **Check:** `text.fill.token == color.core.teal && text.fontSize < 96` → reject. (96px ≈ `display/l`, the smallest size where teal carries hero weight.)
- **Scoped exception — chart-card annotations:** Vault Teal is allowed at **18 pt** for chart-context labeling (axis labels, year labels, legend labels, source captions) **inside a chart-card boundary**. The chart-card is the visual frame defined by `chunks/chart.md` R-CHART-001 — annotations sit on that surface and read as data labels, not as body or title text. Body text on a chart card and any text outside chart-card boundaries still bind R-COLOR-009.
- **Exception check:** `text.fill.token == color.core.teal && text.fontSize == 18 && text.role in [chart-axis-label, chart-year-label, chart-legend-label, chart-source-caption] && text.parent.is_chart_card == true` → allow.
- **History:** the exception was anticipated by `chunks/presentation.md` v1.1 (2026-04-30) and ratified by `chunks/chart.md` v1.0 (2026-04-30) as scoped chunk-level overrides. Promoted to a foundation-level scoped exception 2026-05-01 (Mark's call) so it lives in one place. Chunks no longer carry duplicate `foundation_overrides` entries for this rule.

### R-COLOR-010 — Never paint a logo a custom color outside the canonical variants
- **Rationale:** the Lockup component set is the source of truth. Recoloring breaks the brand asset.
- **Canonical variants (active):** `Primary, Teal, Light, White` — four variants only.
- **Deprecated:** `Gray` (Lockup-Gray, Icon-Gray, Wordmark-Gray) — kept on disk as `status: deprecated` for asset-manifest history; never use. See `assets/logo/assets-manifest.json` and `feedback_no_gray_logo_variant`.
- **Check:** any imported logo SVG whose fill doesn't match one of `assets/logo/{icon,wordmark,lockup}-{primary,teal,light,white}.svg` → reject.

## BASE rules

### 80 / 10 / 10 ratio
The base color allocation across a finished deliverable:
- ~80% white surface
- ~10% black + gray content
- ~10% accent (Vault Teal, Secondary, or Signal as appropriate)

The numbers are approximate, not arithmetic. What matters is the hierarchy: surface dominates, content is sparing, accent is rare. Real work varies — some pages run heavier on accent, some run almost all surface.

### 80 / 20 black-teal hero split
When a deliverable needs a hero color (cover headlines, divider words, primary CTAs, hero accents):
- ~80% of cases use `color.core.black`
- ~20% of cases use `color.core.teal`

Reach for teal only when the work needs an extra hit of brand presence beyond what black already provides. Black at hero size carries weight; let it.

### White is the default surface
The default page/canvas/frame fill is `color.core.white`. Off-white (`color.core.off-white`) is the rare alternate, used only where soft warmth is specifically wanted. Supersedes any older brand-system entry that implied off-white as a primary surface.

### Greydient is the default gradient
When a deliverable calls for a gradient surface, default to `gradient.greydient`. The other four (Primary, Cool, Warm, Mist) are alternates picked by feel — there is no fixed mapping.

### Black is the default content color
Body content, titles, captions, and labels default to `color.core.black`. Use `color.core.gray-02` for muted/secondary content (timestamps, footnotes, metadata) — but never for caption-size text on any surface (insufficient contrast; see R-COLOR-008 adjacent territory).

## Pairings matrix

Look up the surface to choose the lockup variant. Exhaustive for canonical surfaces.

```yaml
pairings:
  # Light surfaces → Lockup-Primary (black mark)
  - surface: color.core.white
    lockup: lockup-primary
    rationale: "Black mark on white. Maximum legibility, default."
  - surface: color.core.off-white
    lockup: lockup-primary
    rationale: "Black mark on off-white. Default for warm-light contexts."
  - surface: gradient.greydient
    lockup: lockup-primary
    rationale: "Light gradient → black mark."
  - surface: gradient.cool
    lockup: lockup-primary
    rationale: "Light gradient → black mark."
  - surface: gradient.warm
    lockup: lockup-primary
    rationale: "Light gradient → black mark."
  - surface: gradient.mist
    lockup: lockup-primary
    rationale: "Light gradient → black mark."

  # Dark + saturated surfaces → Lockup-White (max contrast)
  - surface: color.core.teal
    lockup: lockup-white
    rationale: "Vault Teal hero block → pure white mark."
  - surface: color.core.black
    lockup: lockup-white
    rationale: "Black surface → pure white mark."
  - surface: color.signal.stop
    lockup: lockup-white
    rationale: "Signal-Stop background → pure white mark."
  - surface: color.signal.sky
    lockup: lockup-white
    rationale: "Signal-Sky background → pure white mark."

  # Muted surfaces → Lockup-Light (soft contrast)
  - surface: color.secondary.premium-purple
    lockup: lockup-light
    rationale: "Muted dark surface → soft off-white mark."
  - surface: color.secondary.dark-earth
    lockup: lockup-light
    rationale: "Muted dark surface → soft off-white mark."
  - surface: color.secondary.rich-blue
    lockup: lockup-light
    rationale: "Muted dark surface → soft off-white mark."
  - surface: color.core.gray-02
    lockup: lockup-light
    rationale: "Muted gray surface → soft off-white mark."
```

**Rule of thumb:** pick the strongest contrast unless soft contrast is specifically wanted. Lockup-Light suits dark surfaces where pure white would feel too clinical.

## Gradients

`gradient.greydient` is the **default** (BASE). The other four (`primary`, `cool`, `warm`, `mist`) are alternates picked by feel.

**Two valid uses (BASE):**
1. As a background for clean images with minimal content (just a header, just a logo, or a single phrase). The gradient does the heavy visual work because nothing else is competing.
2. As a fill for graphic elements (shapes, accents in diagrams, decorative blocks).

**Selection (GUIDANCE):** no fixed mapping. Pick what feels right for the moment. Don't enforce "Primary always means X."

**HARD constraints:** R-COLOR-006 (never under content text), R-COLOR-007 (never two on one surface).

## Accessibility — WCAG 2.2 AA approved pairs

All text must meet WCAG 2.2 AA before shipping. HARD constraint.

| Surface | Approved text colors | Forbidden text colors |
|---|---|---|
| `color.core.white` | `color.core.black` (any size) · `color.core.gray-02` (body+) · `color.signal.stop` (18pt+) · `color.signal.sky` (18pt+) | `color.signal.go` (any) · `color.signal.earth` (any) |
| `color.core.off-white` | Same as white above | Same as white above |
| `color.core.teal` | `color.core.white` (any size) · `color.core.off-white` (18pt+) | All other colors |
| `color.secondary.{premium-purple, dark-earth, rich-blue}` | `color.core.white` (any) · `color.core.off-white` (any) | All other colors |
| `color.core.black` | `color.core.white` (any) · `color.core.off-white` (any) | All other colors |
| `color.core.gray-02` | `color.core.white` (any) · `color.core.off-white` (any) | All other colors |
| `color.signal.stop` | `color.core.white` (any) | All other colors |
| `color.signal.sky` | `color.core.white` (any) | All other colors |
| Any `gradient.*` | None — body text on gradient violates R-COLOR-006 | All colors |

When in doubt, run the pair through a contrast checker before shipping. Accessibility is a hard constraint, not a preference.

## Anti-patterns (Don'ts)

Five canonical anti-patterns. Visual examples live in the Figma canon at page `121:10583`, section "Don'ts".

| # | Anti-pattern | Violates | What goes wrong |
|---|---|---|---|
| 1 | Teal text on teal surface | R-COLOR-001 | Text disappears into surface |
| 2 | Off-white as default surface | R-COLOR-005 | White is the default; off-white is a rare alternate |
| 3 | Body text laid over a gradient | R-COLOR-006 | Reads in light passages, vanishes in dark |
| 4 | Vault Teal in body or title-size text | R-COLOR-009 | Dilution; teal earns impact only at hero size |
| 5 | Two accents stacked on one surface | R-COLOR-004 | Two accents compete; hierarchy collapses |

## Decision tree for the agent

When generating any deliverable that uses color, follow this order:

```
1. Pick surface
   - Default: color.core.white               (BASE — white is default)
   - Override only with explicit reason       (e.g., warm context → off-white)
   - For gradient surfaces:
     - Default: gradient.greydient            (BASE — Greydient default)
     - Alternate by feel: primary | cool | warm | mist
   - Verify R-COLOR-005 (no off-white-as-default without flag)

2. Pick content color
   - Body, titles, labels → color.core.black                        (BASE)
   - Muted secondary content → color.core.gray-02 (body+ only)
   - Verify R-COLOR-006 (no body text under gradient)
   - Verify R-COLOR-008 (no signal-go/earth as text)

3. Pick accent (only if needed)
   - Hero size: 80% black, 20% teal                                 (BASE)
   - Verify R-COLOR-009 (no teal below hero size)
   - Verify R-COLOR-002 (no tinted teal)
   - Secondary accent: pick one from color.secondary.*
   - Verify R-COLOR-004 (never two accents at once)
   - Verify R-COLOR-003 (signal colors only for status)

4. Place logo
   - Look up surface in pairings matrix above
   - Use the prescribed Lockup variant from assets/logo/
   - Verify R-COLOR-010 (no custom recolor)

5. Verify Don'ts
   - Run through the five anti-patterns above
   - Reject if any match

6. Verify accessibility
   - Every text-on-surface pair must appear in the approved list (Section above)
   - Anything outside requires a contrast check
   - Reject if AA fails at the deliverable's text size
```

If any HARD rule fails at any step, reject the design and surface the rule ID + rationale to the human reviewer. BASE rule deviations are allowed but must be documented in the deliverable's spec.

## Reviewer agent integration

The three review agents declared in frontmatter consume specific subsets of this chunk:

- **`color-reviewer`** — runs all HARD rules (R-COLOR-001 through R-COLOR-010), the pairings matrix, and the BASE-rule sanity checks (80/10/10, 80/20 hero, white default, Greydient default).
- **`brand-element-reviewer`** — runs R-COLOR-010 (logo color compliance) plus the pairings matrix; focuses on logo placement and brand-asset integrity.
- **`accessibility-reviewer`** — runs R-COLOR-006 and R-COLOR-008 plus the WCAG AA approved-pairs table; reports pass/fail per text node.

Each reviewer's output should cite rule IDs (e.g., "R-COLOR-001 violation at node X") so consolidation is straightforward.

## Visual canon

The rendered version of this chunk lives in Figma:
- File: `Pm31BDHj34WjJ7NjBK4Ady` ("MyVault — Brand Design System")
- Page: `Color` (id `121:10583`)
- URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=121-10583>

The Figma page is the visual canvas; this file is the durable agent-readable record. They stay in sync — when canon changes, both update.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-05-01 | **Ratified the chart-card scoped exception into R-COLOR-009** so the foundation is the single source of truth — Vault Teal is allowed at 18 pt for chart annotations (axis / year / legend labels, source captions) inside chart-card boundaries. Replaces the duplicate `foundation_overrides` entries that were previously declared in `chunks/presentation.md` v1.1 and `chunks/chart.md` v1.0 against this rule. R-COLOR-010 also updated to drop `Gray` from the active canonical-variants list per `feedback_no_gray_logo_variant` (kept on disk as deprecated). | Mark + Claude |
| 2026-04-29 | Initial. 10 HARD rules, 5 BASE rules, 14-row pairings matrix, WCAG AA contrast table, decision tree, reviewer-agent integration. Captures Mark's 80/10/10 ratio, 80/20 black-teal hero split, white-as-default, Greydient-as-default-gradient. | Mark + Claude |
