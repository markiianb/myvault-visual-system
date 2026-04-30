---
chunk_id: iconography
domain: foundations
subcategory: iconography
type: chunk
status: active
version: "1.0"
last_updated: 2026-04-29
owner: mark
summary: "Iconography rules for MyVault. We use Phosphor Icons (210 curated icons in 2 weights: Regular + Fill) as a versioned dependency — no local SVGs are committed. HARD rules (R-ICON-001..010) including Phosphor-only, manifest-only, no Bold/Thin/Light/Duotone, default Regular at 24px black, Fill for active states only. BASE rules + decision tree for agents."
token_count_estimate: 1100
token_dependencies:
  - color.icon.default
  - color.core.black
  - color.core.white
  - color.core.off-white
  - color.core.gray-02
  - color.signal.*
  - space.2
asset_dependencies:
  - assets/icons/icons-manifest.json
external_dependencies:
  - "@phosphor-icons/core@2.x"
  - "@phosphor-icons/react (for JSX renderers)"
  - "@phosphor-icons/web (for vanilla web)"
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  componentSetPage:
    pageId: "10:119"
    pageName: Icons
    componentSetCount: 210
    url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=10-119"
  guidePage:
    pageId: "125:12294"
    pageName: Iconography
    url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=125-12294"
review_axes:
  - icon-reviewer
  - accessibility-reviewer
  - brand-element-reviewer
related_chunks:
  - color
  - typography
  - logo-usage
  - brand-compliance-rules
related_memories:
  - feedback_figma_imported_assets_scale_fix
  - feedback_regular_weight_only
  - feedback_hero_color_80_20_black_teal
---

# Iconography

## Purpose & scope

This chunk governs every icon decision in MyVault visual deliverables — icon family selection, name lookup, weight, size, color, pairing with text, and decorative restraint. It applies wherever an icon appears: presentations, social images, documents, ebooks, charts, email, web. It does not govern non-icon graphic elements (illustrations, photography) — those live in their own chunks.

## What we use

- **Library:** [Phosphor Icons](https://phosphoricons.com) — `@phosphor-icons/core@2.x`
- **Curated subset:** 210 icons (out of Phosphor's ~1,500). Full list in `assets/icons/icons-manifest.json`.
- **Weights:** `regular` and `fill` only. Phosphor offers `thin`, `light`, `bold`, `duotone` too — we don't use those.
- **Default size:** 24×24 px (Phosphor's native unit)
- **Default color:** `color.icon.default` (alias to `color.core.black`)
- **Storage approach:** Phosphor as **versioned dependency**, no local SVGs in the vault. The manifest is the curation record; renderers consume Phosphor directly via npm or CDN. See `assets/icons/README.md` for the rationale.

## Severity tiers

- **HARD** — non-negotiable. Reviewer agents reject violations. Each carries a stable ID (`R-ICON-NNN`) and a machine-checkable predicate where possible.
- **BASE** — defaults that apply unless there's a specific reason to deviate.
- **GUIDANCE** — heuristics that inform choice but aren't enforced.

## HARD rules

### R-ICON-001 — Use Phosphor exclusively
- **Rationale:** Mixing icon families (Phosphor + Material + Heroicons + Feather + custom) destroys visual consistency. Phosphor is the chosen single source.
- **Check:** any icon SVG/component whose source isn't `@phosphor-icons/*` → reject.
- **Adding a new family** requires a brand-system version bump and Mark's explicit approval.

### R-ICON-002 — Use only icons in the manifest
- **Rationale:** Phosphor has ~1,500 icons; we curated 210. Using an icon outside the curation drifts the canon.
- **Check:** any icon name not present in `assets/icons/icons-manifest.json#icons` → reject.
- **Adding a new icon** requires manifest update first (see `assets/icons/README.md` "Adding a new icon").

### R-ICON-003 — Use only Regular and Fill weights
- **Rationale:** MyVault's typography rule is "Regular weights only" (`R-TYPE-001`). Iconography mirrors it. Phosphor's Thin/Light/Bold/Duotone weights don't fit the brand register.
- **Check:** any Phosphor icon with `weight in [thin, light, bold, duotone]` → reject.

### R-ICON-004 — Default to Regular weight; Fill for active states only
- **Rationale:** Regular reads as neutral/structural; Fill reads as emphasized/selected. Reserving Fill for active states keeps the visual hierarchy crisp.
- **Allowed Fill contexts:** active nav item, currently-selected toggle, currently-viewed tab, primary CTA icon at maximum emphasis.
- **Check:** any icon set to `weight: "fill"` outside an active-state context → flag for review.

### R-ICON-005 — Default color is `color.icon.default`; never recolor outside the palette
- **Rationale:** Custom-color icons fragment the visual system. The default (`color.icon.default` → black) is the workhorse; deviations are token-bound.
- **Allowed colors:** `color.icon.default`, `color.core.{black,white,off-white,gray-02}`, signal colors only in semantic-status contexts (R-ICON-006).
- **Check:** any icon `color.value` not in the allowed set → reject.

### R-ICON-006 — Signal colors only for status icons
- **Rationale:** Signal colors carry semantic meaning (`R-COLOR-003`). Decorative use breaks the meaning.
- **Allowed:** `check-circle` in `color.signal.go` for success state, `warning-circle` in `color.signal.stop` for error, `info` in `color.signal.sky` for info, etc.
- **Check:** any icon in a signal color OUTSIDE an explicit status-indicator component → reject.

### R-ICON-007 — Never modify icon paths
- **Rationale:** Phosphor's path data is the canonical asset. Modifying ("simplifying", "rounding the corners more", "thickening strokes") breaks the canonical asset and creates a new family that we don't own (R-ICON-001).
- **Check:** any imported icon whose path data differs from Phosphor's published source → reject.

### R-ICON-008 — Never use icons below 16px or above 96px without explicit reason
- **Rationale:** Below 16px the Phosphor 24×24-grid icons start dropping detail; above 96px the brand register shifts (icons become illustrations). Both extremes need a deliberate spec decision.
- **Allowed sizes:** 16, 20, 24 (default), 32, 48 px. Larger uses (e.g., 64, 96) only when the deliverable spec explicitly allows.
- **Check:** any icon outside the 16–96 range → flag for review.

### R-ICON-009 — Never use icons as decorative patterns
- **Rationale:** Icons are functional/semantic. Tiling, repeating, or using as background texture devalues them and breaks the "Phosphor icon = meaning marker" contract. Mirrors `R-LOGO-008`.
- **Check:** any container with two or more identical icon instances arranged in a grid or repeating pattern → reject. (Different icons in a coherent listing — e.g., a feature grid — is fine.)

### R-ICON-010 — Don't use an icon when a clear text label would do
- **Rationale:** Icons supplement language; they don't replace it for low-context functions. An ambiguous icon does worse than a four-letter text label.
- **Check:** GUIDANCE-leaning HARD: in critical UI flows (forms, primary CTAs, navigation labels), icons must accompany a text label unless space genuinely forbids it. Reviewer flags icon-only critical UI.

## BASE rules

### Default size: 24px
Matches Phosphor's native unit. Use 24px unless context forces otherwise. Allowed step ladder: 16 / 20 / 24 / 32 / 48.

### Default weight: Regular
Fill weight is reserved for active/selected/emphasized states. Don't use Fill for variety alone.

### Default color: `color.icon.default`
This alias resolves to `color.core.black`. To recolor a whole context (e.g., a sidebar) cleanly, redefine the alias in that context's spec. Never hardcode a different color on individual icons.

### Pairings — icon size to text size
| Text style | Icon size | Spacing (icon → text) |
|---|---|---|
| `body/s` (14pt) | 16px | 8px (`space.2`) |
| `body/default` (16pt) | 20px or 24px | 8px |
| `body/l` (18pt) | 24px | 8px |
| `body/xl` (20pt) | 24px or 32px | 8px–12px |
| `heading/m` (28pt) | 32px | 12px |
| `heading/l` (40pt) | 48px | 16px |

Rule of thumb: icon height ≈ text cap-height × 1.4 to 1.6, rounded to the nearest allowed step.

### Active-state pattern
Default Regular weight at full opacity. On active/selected: switch to Fill weight at full opacity (don't change color or size). Predictable, consistent, recognizable.

### Pair icons with text labels
For nav, primary CTAs, form fields, status indicators — pair icon + text label by default. Icon-only is reserved for tight contexts where the meaning is obvious from convention (close button "x", search "magnifying-glass", menu "list-bullets").

## Anti-patterns (Don'ts)

| # | Anti-pattern | Violates | What goes wrong |
|---|---|---|---|
| 1 | Mixing Phosphor with another icon family on the same surface | R-ICON-001 | Visual register fractures; Phosphor's neat geometry collides with foreign style |
| 2 | Recoloring an icon to a custom hex outside the palette | R-ICON-005 | System fragmentation; custom colors don't refresh on token updates |
| 3 | Using Bold/Thin/Light/Duotone weight | R-ICON-003 | Imports register MyVault doesn't have; breaks Regular-only canon |
| 4 | Icon at 12px or 8px | R-ICON-008 | Detail collapses, the icon stops reading |
| 5 | Icon used as background pattern (tiled) | R-ICON-009 | Icons aren't ornaments; their meaning is devalued |
| 6 | Icon without text label in a critical flow | R-ICON-010 | Ambiguity; users guess |
| 7 | Fill weight everywhere "to look richer" | R-ICON-004 | Erases the active-state signal |

## Decision tree for the agent

When placing an icon on any deliverable, follow this order:

```
1. Decide if an icon is needed
   - Critical UI flow? Icon supplements text, never replaces (R-ICON-010)
   - Decorative? Reconsider — icons are semantic, not ornament (R-ICON-009)

2. Find the icon by intent
   - Search assets/icons/icons-manifest.json by tags or category
   - If no match in the curated 210, check Phosphor's full library (phosphoricons.com)
     - Found in Phosphor → propose adding to manifest (Mark approval)
     - Not found in Phosphor → check R-ICON-001 — never use a non-Phosphor icon
   - Verify R-ICON-002 (icon must be in manifest)

3. Pick weight
   - Default state → Regular (BASE)
   - Active / selected / currently-viewing → Fill
   - Verify R-ICON-003 (only Regular or Fill, never Thin/Light/Bold/Duotone)
   - Verify R-ICON-004 (Fill only for active states)

4. Pick size
   - Default: 24px (BASE)
   - From the allowed step: 16 / 20 / 24 / 32 / 48
   - Match to adjacent text size per the pairings table
   - Verify R-ICON-008 (no <16px or >96px without explicit reason)

5. Pick color
   - Default: color.icon.default (BASE)
   - Allowed alternates: core.{black,white,off-white,gray-02}
   - Status icons only: signal.{go,stop,sky,earth} per R-ICON-006
   - Verify R-ICON-005 (no custom hex outside palette)

6. Place
   - Pair with text label per the pairings table when in critical UI (R-ICON-010)
   - Spacing icon → text: 8px (space.2) for body sizes; 12-16px for headings
   - Verify R-ICON-007 (use canonical Phosphor SVG/component, no path edits)
   - Verify R-ICON-009 (no decorative tiling)

7. Cross-foundation checks
   - Color: cross-ref [[color#accessibility]] for contrast pairs (icon must clear WCAG 2.2 AA at 3:1 minimum for graphics)
   - Typography: paired text follows [[typography]] rules
   - Logo: don't confuse icon and logo placement (R-LOGO rules govern logo, R-ICON rules govern icons)
```

If any HARD rule fails at any step, reject the placement and surface the rule ID + rationale to the human reviewer.

## Reviewer agent integration

Three reviewers consume specific subsets:

- **`icon-reviewer`** (new) — runs all R-ICON-001..010, manifest-conformance check, weight/size/color allowlist verification. Primary reviewer for any deliverable using icons.
- **`accessibility-reviewer`** — runs R-ICON-005 + R-ICON-008 contrast and size implications; cross-refs [[color#accessibility]] for the WCAG AA approved-pairs table.
- **`brand-element-reviewer`** — runs R-ICON-001 (Phosphor exclusivity) and R-ICON-009 (no decorative tiling); shares some logic with logo placement review.

Each reviewer's output cites rule IDs (e.g., "R-ICON-002 violation: icon `acorn` not in manifest"). Output format consistent with color/typography/logo reviewer outputs.

## Cross-references

- **[[color]]** — color tokens icons consume (`color.icon.default`, signal colors); WCAG AA contrast authority
- **[[typography]]** — text styles paired with icons; the icon-text size pairing table here references typography sizes
- **[[logo-usage]]** — same set of restraint principles (no decoration, no recoloring); icons and logos are distinct asset families and never confused
- **[[brand-compliance-rules]]** (future) — universal HARD rules across foundations
- **`assets/icons/icons-manifest.json`** — the curated 210-icon list with Phosphor metadata
- **`assets/icons/README.md`** — operator guide explaining the no-local-SVG approach + per-renderer integration

## Visual canon

The Figma source for icons:
- File: `Pm31BDHj34WjJ7NjBK4Ady` ("MyVault — Brand Design System")
- Page: `Icons` (id `10:119`) — holds 210 component sets, 2 weights each (Regular + Fill)
- URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=10-119>

A separate **Iconography guide page** (id `125:12294`, mirroring Color, Typography, Logo) provides visual examples — sample icons across 6 Phosphor categories, Regular vs Fill weight comparison, the 16/20/24/32/48 size ladder, icon-text pairings table, 4 visual Don'ts, and accessibility cross-refs.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial. 10 HARD rules, BASE defaults (24px / Regular / black), pairings table, decision tree, reviewer-agent integration. Approach C (Phosphor as versioned dependency, no local SVGs). 210 icons curated from Phosphor v2.1+. | Mark + Claude |
