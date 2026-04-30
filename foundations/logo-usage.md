---
chunk_id: logo-usage
domain: foundations
subcategory: identity
type: chunk
status: active
version: "1.0"
last_updated: 2026-04-29
owner: mark
summary: "Logo usage rules for MyVault. Three forms (Icon, Wordmark, Lockup) × four active color variants (Primary, Teal, Light, White) = 12 canonical assets. Gray variant is deprecated. HARD rules (R-LOGO-001..010) including the no-Gray rule, distortion/effect/recolor prohibitions, clear-space minimums, minimum-size floors, and the pairings matrix as the canonical home. Decision tree for agents."
token_count_estimate: 1250
token_dependencies:
  - color.core.black
  - color.core.white
  - color.core.off-white
  - color.core.teal
  - color.secondary.*
  - color.signal.stop
  - color.signal.sky
  - color.core.gray-02
  - gradient.*
asset_dependencies:
  - assets/logo/icon-primary.svg
  - assets/logo/icon-teal.svg
  - assets/logo/icon-light.svg
  - assets/logo/icon-white.svg
  - assets/logo/wordmark-primary.svg
  - assets/logo/wordmark-teal.svg
  - assets/logo/wordmark-light.svg
  - assets/logo/wordmark-white.svg
  - assets/logo/lockup-primary.svg
  - assets/logo/lockup-teal.svg
  - assets/logo/lockup-light.svg
  - assets/logo/lockup-white.svg
deprecated_assets:
  - assets/logo/icon-gray.svg
  - assets/logo/wordmark-gray.svg
  - assets/logo/lockup-gray.svg
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "125:11406"
  pageName: Logo
  componentSetId: "1:572"
  componentSetName: Logo
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=125-11406"
review_axes:
  - brand-element-reviewer
  - accessibility-reviewer
related_chunks:
  - color
  - typography
  - iconography
  - brand-compliance-rules
related_memories:
  - feedback_no_gray_logo_variant
  - feedback_white_is_default_surface
  - feedback_hero_color_80_20_black_teal
  - feedback_figma_imported_assets_scale_fix
---

# Logo

## Purpose & scope

This chunk governs every logo-placement decision in MyVault visual deliverables — variant selection (Icon / Wordmark / Lockup), color variant selection (Primary / Teal / Light / White), surface pairing, clear space, minimum size, recoloring, distortion, and decorative use. It applies to every renderer downstream of `assets/logo/` and every surface that displays the brand mark. It does not govern non-logo identity decisions (color, typography) — those live in their own foundation chunks.

## Forms and variants

| Form | What it is | Native dimensions | Variants in active use |
|---|---|---|---|
| **Icon** | The geometric symbol alone (interlocking "M" form) | 219 × 220 | Primary, Teal, Light, White |
| **Wordmark** | The word "MyVault" in PT Serif Regular | 563 × 167 | Primary, Teal, Light, White |
| **Lockup** | Icon + Wordmark together with fixed proportional spacing | 814 × 220 | Primary, Teal, Light, White |

**12 canonical assets total.** Source of truth: the Figma component set `1:572` (15 variants including 3 deprecated Gray); exports live at `assets/logo/`. The Gray variant exists for archival completeness but is **deprecated** — see R-LOGO-001.

## Color-variant semantics

| Variant | Mark color | When to use |
|---|---|---|
| Primary | `color.core.black` | Default for light surfaces — white, off-white, light gradients |
| Teal | `color.core.teal` | Brand-emphasis on off-white where the mark itself should reinforce Vault Teal (formal documents) |
| Light | `color.core.off-white` | On muted dark surfaces (premium-purple, dark-earth, rich-blue, gray-02) where pure white would feel too clinical |
| White | `color.core.white` | On dark + saturated surfaces (Vault Teal, black, signal colors) for maximum contrast |
| ~~Gray~~ | ~~`color.core.gray-02`~~ | **DEPRECATED — never use** (R-LOGO-001) |

## Severity tiers

- **HARD** — non-negotiable. Reviewer agents reject work that violates these. Each carries a stable ID (`R-LOGO-NNN`) and where possible a machine-checkable predicate.
- **BASE** — defaults that apply unless there's a specific reason to deviate.
- **GUIDANCE** — heuristics that inform choice but aren't enforced.

## HARD rules

### R-LOGO-001 — Never use any Gray variant
- **Rationale:** Mark deprecated the Gray variants on 2026-04-29. A muted gray mark creates a low-emphasis brand presence that doesn't match MyVault's restraint-driven but confident aesthetic. Primary (black) carries the same role with more authority.
- **Check:** any logo asset whose path matches `assets/logo/{icon,wordmark,lockup}-gray.svg`, or any Figma instance from component IDs `1:605`, `1:649`, `1:730` → reject.

### R-LOGO-002 — Never paint a logo a custom color
- **Rationale:** The four canonical variants are the only allowed fills. Custom-color logos break the brand asset.
- **Check:** any logo SVG whose fill colors don't match one of `{#000000, #094545, #FBFAF5, #FFFFFF}` (the four canonical variant fill colors) → reject.

### R-LOGO-003 — Never distort or stretch the logo
- **Rationale:** Native aspect ratios are part of the brand asset's identity. Squishing or stretching breaks recognition.
- **Check:** any instance of components in set `1:572` whose `width / height` ratio differs from the native variant ratio by more than 1% → reject.
  - Icon native ratio: 219/220 ≈ 0.995
  - Wordmark native ratio: 563/167 ≈ 3.371
  - Lockup native ratio: 814/220 ≈ 3.700

### R-LOGO-004 — Never add effects to the logo
- **Rationale:** Drop shadows, glows, outlines, gradient overlays all degrade the brand mark. The mark stands on its own.
- **Check:** any logo instance with `effects.length > 0` or any wrapping frame with effects that affect the mark → reject.

### R-LOGO-005 — Never violate clear-space minimum
- **Rationale:** Crowding the logo with adjacent elements degrades its presence.
- **Clear space (HARD, base = 1× icon height all sides):**
  - Icon: 1× icon height on all four sides
  - Wordmark: 1× wordmark x-height (≈ 30% of total wordmark height) on all four sides
  - Lockup: 1× icon height on all four sides
- **Check:** any element (text, image, button border, gradient stop, container edge) within the clear-space margin around a logo instance → reject.

### R-LOGO-006 — Never go below minimum size
- **Rationale:** Below the floor the asset loses essential detail or becomes unrecognizable.
- **Floors:**
  - Icon: ≥ 24px square
  - Wordmark: ≥ 120px wide
  - Lockup: ≥ 160px wide
- **Print scaling:** scale up at least 25% above the screen minimum for non-screen output.
- **Check:** any logo instance below its floor → reject. Rare exceptions (favicon at OS-mandated 16×16, single brand mention in dense print) must be documented in the deliverable spec.

### R-LOGO-007 — Never rotate the logo
- **Rationale:** Logos sit upright. Always. Rotated logos misrepresent the brand.
- **Check:** any logo instance with `rotation != 0` → reject.

### R-LOGO-008 — Never use the logo as a decorative pattern
- **Rationale:** The logo is a brand mark, not an ornament. Tiling, repeating, or using it as background texture devalues the asset.
- **Check:** any container with two or more logo instances arranged in a grid or repeating pattern → reject. (Two adjacent placements in a co-brand lockup is a separate authorized pattern, requires explicit approval.)

### R-LOGO-009 — Never modify the geometry of the Icon
- **Rationale:** The Icon's interlocking "M" form is the brand's visual signature. Recreating, modifying, or "improving" the geometry breaks recognition.
- **Check:** any SVG claiming to be the MyVault Icon whose path data doesn't match the canonical asset → reject. The Figma component set is the only source.

### R-LOGO-010 — Never place the logo on a surface that fails contrast
- **Rationale:** A logo that doesn't read fails the deliverable.
- **Check:** every logo placement must appear in the pairings matrix below, OR pass an explicit WCAG 2.2 AA contrast check for graphics (3:1 minimum for non-text logo elements).
- **Cross-refs:** [[color#R-COLOR-006]] (no logo on gradient under content), [[color#accessibility]] (the WCAG approved-pairs table — the contrast authority lives on the Color page).

## BASE rules

### Lockup is the default
When in doubt, use the **Lockup** (Icon + Wordmark together). The Icon stands alone only in tight contexts (favicons, app icons, profile avatars, in-product nav where the brand is already named). The Wordmark stands alone only when the symbol would be redundant or where horizontal space forbids the icon.

### Default color variant by surface tier
- Light surfaces (white, off-white, light gradients) → **Lockup-Primary** (default)
- Dark + saturated surfaces (Vault Teal, black, signal-stop, signal-sky) → **Lockup-White**
- Muted surfaces (premium-purple, dark-earth, rich-blue, gray-02) → **Lockup-Light**

The full pairings matrix below is exhaustive for canonical surfaces.

### Print scaling
For any non-screen output (print, large-format display), scale up at least 25% above the screen minimum.

### Co-brand lockups require approval
Pairing the MyVault logo with a partner logo in a co-brand lockup is allowed only with explicit Brand approval. The clear-space spec for co-brands differs from solo placement.

## Pairings matrix (canonical home)

This is the canonical home for the surface → lockup-variant mapping. The Color foundation chunk references this matrix without duplicating it (any future edits land here).

```yaml
pairings:
  # Light surfaces → Lockup-Primary
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

  # Dark + saturated → Lockup-White
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

  # Muted → Lockup-Light
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

**Rare alternates:** Off-White surface + Lockup-Teal (formal documents where the mark itself should reinforce Vault Teal) is allowed but rare. Use sparingly.

## Anti-patterns (Don'ts)

Visual examples live in the Figma canon at page `125:11406` (the Don'ts section).

| # | Anti-pattern | Violates | What goes wrong |
|---|---|---|---|
| 1 | Logo squashed/stretched to a different aspect ratio | R-LOGO-003 | Brand recognition fails |
| 2 | Lockup-Primary on Vault Teal (instead of Lockup-White) | R-LOGO-010 | Fails contrast; ignores the pairings matrix |
| 3 | Text or other elements crowding the logo with no breathing room | R-LOGO-005 | Visual weight collapses; the logo loses presence |
| 4 | Logo tiled/repeated as a background pattern | R-LOGO-008 | Logo is a mark, not an ornament |
| 5 (implicit) | Any Gray variant used | R-LOGO-001 | Deprecated; never use |

## Decision tree for the agent

When placing the MyVault logo on any deliverable, follow this order:

```
1. Pick form
   - Default: Lockup (BASE)
   - Tight context (favicon, app icon, profile, in-product nav with brand named): Icon
   - Symbol redundant or horizontal space forbids icon: Wordmark
   - Verify R-LOGO-008 (never as decoration; never tiled)

2. Pick color variant
   - Default by surface tier (BASE):
     - Light surface → Primary
     - Dark + saturated → White
     - Muted → Light
   - Rare: Off-White surface → Teal (formal/brand-emphasis)
   - Verify R-LOGO-001 (never Gray)
   - Verify R-LOGO-002 (never custom color)

3. Look up the surface in the pairings matrix above
   - If listed, use the prescribed lockup
   - If not listed, run a WCAG 2.2 AA graphics contrast check (3:1 minimum)
   - If contrast fails, change surface or change color variant — never proceed
   - Verify R-LOGO-010 (no contrast violations)

4. Size and placement
   - Verify R-LOGO-006 (never below minimum: Icon 24px, Wordmark 120px, Lockup 160px)
   - Apply print scaling (+25%) if non-screen output
   - Verify R-LOGO-005 (clear-space minimum on all sides — 1× icon height for Icon/Lockup, 1× wordmark x-height for Wordmark)
   - Verify R-LOGO-003 (preserve native aspect ratio, no distortion)
   - Verify R-LOGO-007 (no rotation)

5. Final visual verification
   - Verify R-LOGO-004 (no effects: shadow, glow, outline, gradient overlay)
   - Verify R-LOGO-009 (using the canonical SVG from assets/logo/, not a recreated one)
   - Run through the four Don'ts visually

6. Cross-foundation checks
   - Color: cross-ref [[color#accessibility]] for full contrast pairs
   - Typography: if the logo is paired with a tagline, the tagline follows [[typography]] rules (PT Serif or Lato Regular only, never below 14pt for general use)
```

If any HARD rule fails at any step, reject the placement and surface the rule ID + rationale to the human reviewer. BASE rule deviations are allowed but must be documented in the deliverable's spec (e.g., "co-brand lockup with [partner] approved by Brand on [date]").

## Reviewer agent integration

Two reviewers consume specific subsets of this chunk:

- **`brand-element-reviewer`** — runs all logo HARD rules (R-LOGO-001 through R-LOGO-009), plus pairings-matrix conformance (the surface side of R-LOGO-010), plus the BASE rules. This is the primary reviewer for any deliverable that includes the logo.
- **`accessibility-reviewer`** — runs the contrast side of R-LOGO-010, cross-referencing [[color#accessibility]] for the WCAG AA approved-pairs table. Reports pass/fail per logo placement.

Each reviewer's output should cite rule IDs (e.g., "R-LOGO-001 violation: lockup-gray.svg used at frame X") so consolidation across reviews is straightforward.

## Cross-references

- **[[color]]** — color tokens that surfaces use; the WCAG approved-pairs table is the authority for contrast (don't duplicate here)
- **[[typography]]** — when the logo is paired with text (taglines, attribution, co-brand wordmarks), the typography rules apply to the text portion
- **[[brand-compliance-rules]]** (future) — universal HARD rules across all foundations

## Visual canon

The rendered version of this chunk lives in Figma:
- File: `Pm31BDHj34WjJ7NjBK4Ady` ("MyVault — Brand Design System")
- Page: `Logo` (id `125:11406`)
- Component set: `1:572` (the source of truth for all 15 variants — 12 active, 3 deprecated Gray)
- URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=125-11406>

The Figma page hosts: the Logo system (12 cards), Anatomy (3 cards), Clear space + minimum sizes (visual + rules), the 14-cell Pairings matrix, 4 Don'ts examples, and Accessibility. The page and this chunk stay in sync — when canon changes, both update.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial. 10 HARD rules, BASE defaults, 14-row pairings matrix as canonical home, anatomy, decision tree, reviewer-agent integration. Captures Mark's no-Gray canon (R-LOGO-001), distortion/effect/recolor prohibitions, clear-space minimums (1× icon height on all sides), minimum-size floors (24/120/160), and the print +25% rule. | Mark + Claude |
