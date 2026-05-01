---
chunk_id: diagram
domain: chunks
subcategory: asset-type
type: chunk
status: active
version: "1.0"
last_updated: 2026-05-01
owner: mark
summary: "Asset-type chunk for flow / system / pipeline diagrams — node-graph deliverables with pill nodes, accent nodes (teal / signal-go), code nodes, and right-angle vector connectors. Inverted card structure: footer at TOP carrying the diagram title; body below holding free-positioned nodes + connectors. 6 HARD rules (R-DIAG-001..006) covering footer-at-top inversion, body fill (off-white) + 1px gray-01 stroke envelope, the closed node-type catalog (pill / accent-teal / accent-go / code), connector kinds (data-flow signal-go solid / logical gray-02 dashed) and right-angle routing only, signal-go reservation for data flow specifically, and the green-accent-text inversion (text on signal-go backgrounds is teal, not white). BASE rules cover typography per node type (Lato 14pt pill labels; Lato 16pt accent labels; Lato 13pt @ 160% LH code text; PT Serif 20pt footer title), node geometry (pill radius 99 / 12 v 20 h padding; accent 200×130 fixed; code 108 wide hug height), and connector style (2px stroke; arrow-less by default; dashPattern [4,4] for logical). MENU catalog of node-type compositions. Renderer pinned to the JSON-spec + Node SVG composer (extends renderers/vega-lite/compose.mjs with composeFlowDiagram). Reviewer integration: diagram-reviewer for HARD enforcement. Adopted from chart.md v1.0's out-of-scope list."
token_count_estimate: 1300

# === RENDERER PINNING ===
renderer: svg-composer
spec_format: json
template_path: renderers/vega-lite/compose.mjs   # shared composer
output_formats: [svg, png, pdf]
renderer_status: active
renderer_note: "JSON fixture + Node SVG composer. The composer's composeFlowDiagram() function renders pill / accent / code nodes at explicit (x, y) positions plus right-angle connectors with explicit path arrays. No auto-routing — the agent describes the connector path in the fixture. This is intentional: auto-routing right-angle paths around obstacles is non-trivial, and the visual canon at Figma 70:8560 was hand-routed by Mark."

# === FOUNDATIONS THIS CHUNK INHERITS FROM ===
inherits_from_foundations:
  - color
  - typography
  - iconography

# === TOKENS + ASSETS CONSUMED ===
token_dependencies:
  - color.signal.go         # data-flow connectors + signal-go accent node fill
  - color.core.teal         # accent-teal node fill + green-on-signal-go text inversion
  - color.core.off-white    # body envelope fill
  - color.core.white        # pill node fill + code node fill
  - color.core.gray-01      # node strokes + body envelope stroke
  - color.core.gray-02      # logical-dashed connector + footer dot
  - color.core.black        # default text color (pill labels, code text)
  - typography.body.s       # Lato 14pt — pill labels
  - typography.body         # Lato 16pt — accent node labels
  - typography.heading.s    # PT Serif 18-20pt — footer title (the canonical reference uses 20pt)
  - space.*                 # padding 12/20/16/18 per node type; gap 8/14
asset_dependencies:
  - "@phosphor-icons/core"  # via npm; weights: regular (pill icons) + fill (accent icons + footer icon)

# === VISUAL CANON (Figma) ===
visual_canon:
  fileKey: Pm31BDHj34WjJ7NjBK4Ady
  fileName: "MyVault — Brand Design System"
  pageId: "70:8479"
  pageName: "Diagrams"
  url: "https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8560"
  reference_examples:
    - { nodeId: "70:8560", what: "Flow Diagram — agentic memory pipeline (1332×700; footer at TOP with Phosphor shield-check + PT Serif 20pt title; body off-white with 1px gray-01 stroke; mix of pill / accent-teal / accent-go / code nodes; right-angle connectors in signal-go solid + gray-02 dashed [4,4])" }

# === REVIEWER AXES ===
review_axes:
  - diagram-reviewer
  - color-reviewer
  - typography-reviewer
  - brand-element-reviewer
  - accessibility-reviewer

# === DELIVERABLE METADATA ===
asset_type: diagram
typical_use:
  - "system architecture diagrams (data flow between services / agents / databases)"
  - "agentic pipeline diagrams (the canonical reference is one — agent → memory API → memory DB)"
  - "process flow diagrams in ebook explainers"
  - "presentation slides showing component relationships"
  - "blog post embeds explaining a technical mechanic"

# === CROSS-REFS ===
related_chunks:
  - ebook
  - presentation
  - chart
  - stat-infographic
  - social
related_memories:
  - feedback_no_uppercase_eyebrows
  - feedback_regular_weight_only
  - feedback_chunk_size_placement_pins
  - feedback_design_pages_are_guidelines
  - feedback_white_is_default_surface

# === FOUNDATION OVERRIDES ===
foundation_overrides:
  - rule_id: R-COLOR-008
    chunk: color
    nature: scoped-exception
    scope: "accent-go node label text — 16pt Lato Regular text rendered in `color.core.teal` on a signal-go fill background (per the green-accent-text inversion in R-DIAG-006)"
    note: "R-COLOR-008 forbids signal-go for body or caption text. The accent-go node's label is teal text on signal-go fill — semantically a node label, not body text — but the contrast inversion is unusual enough to call out as a scoped exception. This pattern only applies inside the diagram body, only on accent-go nodes. The teal-on-signal-go pairing was Mark's deliberate edit to the original draft to maintain teal as the brand-emphasis color even on the green-accent surface (see project_diagram_canonical_specs memory, 'Accent green node' entry)."
    enforced_by: R-DIAG-006
---

# Diagram (flow / system / pipeline)

## Purpose & scope

This chunk governs every node-graph diagram deliverable: flow diagrams, system architecture diagrams, agentic pipeline diagrams, process flow diagrams. It does **not** govern data-viz charts (`chart.md`), stat infographics (`stat-infographic.md`), or hierarchical org-chart trees (which would be a future `chunks/tree.md`).

The shape is structurally distinct from charts:
- **Footer at TOP, body below** (inverted from chart-card).
- Body is a **free-positioned canvas**, not a grid or auto-layout.
- Content is **nodes + connectors**, not data + axes.
- Closed node-type catalog: **pill / accent-teal / accent-go / code**.
- Connectors are **right-angle vectors only** with two semantic kinds (data-flow signal-go solid / logical gray-02 dashed).

The shape is structurally distinct from stat-infographics:
- No signal-go OUTSIDE border (the body envelope uses gray-01 stroke).
- No column triplet — nodes are free-positioned.
- Signal-go is reserved for **data-flow connectors specifically**, not as a brand-identity border.

## Tokens + assets consumed

| Source | What it provides |
|---|---|
| `tokens/brand.tokens.json` → `color.signal.go`, `color.core.*`, `typography.*`, `space.*` | Every value used |
| `@phosphor-icons/core` (npm) → `assets/regular/<icon>.svg` | Pill node icons (Phosphor Regular weight, 18 × 18, fill black) |
| `@phosphor-icons/core` (npm) → `assets/regular/<icon>.svg` (recolored) | Accent node icons (Phosphor Regular weight, 28 × 28, fill white on accent-teal / fill teal on accent-go) |
| `@phosphor-icons/core` (npm) → `assets/regular/<icon>.svg` | Footer icon (Phosphor Regular weight, 28 × 28, fill black) |

## Asset specs (universal foundation)

Every diagram is built on the same shape:

- **Outer frame:** width per content (no fixed default; canonical reference is 1332 × 700)
- **Outer fill:** transparent (the body and footer carry their own fills)
- **Outer cornerRadius:** 0
- **Footer at TOP:** padding `16 / 12 / 16 / 12`, HORIZONTAL gap 14, FILL-width, fill `color.core.off-white`, 1px `color.core.gray-01` stroke on top + right + left (no bottom — the divider is implicit)
- **Body below footer:** fill `color.core.off-white`, 1px `color.core.gray-01` stroke all sides, NO LAYOUT (free positioning of children)

Codified as R-DIAG-001 (footer-at-top inversion) + R-DIAG-002 (body envelope).

## Severity tiers

- **HARD** — non-negotiable. Reviewer agents reject violations.
- **BASE** — defaults that apply unless the deliverable spec says otherwise.
- **MENU** — choose-one alternatives from the closed node-type catalog.

## HARD rules

### R-DIAG-001 — Footer-at-TOP inversion is mandatory
- **Spec:** Every diagram has its footer band at the **top** of the outer frame, not at the bottom. The footer carries the diagram's title (PT Serif Regular 20 pt) and an optional Phosphor icon. Below the footer is the body envelope holding the nodes.
- **Rationale:** The footer-at-top inversion is the diagram's structural signature — a single glance distinguishes a flow diagram from a chart-card or a hero-stats panel. Bottom-footer compositions read as charts; top-footer compositions read as diagrams.
- **Allowed deviation:** None at the chunk level. If a top-title isn't desired, omit the footer band entirely (the body envelope on its own is valid for inline embeds). The footer's *position* (top) is what's locked, not its *presence*.
- **Check:** any diagram with a footer at the bottom → reject. Any diagram with a centered or floating title → reject.

### R-DIAG-002 — Body envelope: off-white fill + 1px gray-01 stroke
- **Spec:** The diagram's body (the free-positioning canvas holding nodes + connectors) has fill `color.core.off-white` and a 1 px `color.core.gray-01` stroke on all sides. The body envelope is the visible canvas — nodes sit inside, connectors traverse it.
- **Rationale:** The off-white envelope makes the white pill nodes pop visually (white-on-off-white > white-on-white). The gray-01 stroke gives the canvas its boundary without competing with the nodes' own strokes.
- **Allowed deviation:** None.
- **Check:** any diagram body without the off-white fill OR without the 1 px gray-01 envelope stroke → reject.

### R-DIAG-003 — Closed node-type catalog: pill / accent-teal / accent-go / code
- **Spec:** Every node in a diagram is one of exactly four types:
  1. **pill** — pill-shaped (cornerRadius 99), white fill, 1 px gray-01 stroke, padding `12 / 20 / 12 / 20`, gap 8, optional Phosphor icon (18×18) + Lato Regular 14 pt label
  2. **accent-teal** — 200 × 130 fixed, fill `color.core.teal`, no stroke, padding 20, gap 8, primary CENTER counter CENTER, Phosphor icon (28×28, white) + Lato Regular 16 pt **white** label
  3. **accent-go** — 200 × 130 fixed, fill `color.signal.go`, no stroke, padding 20, gap 8, primary CENTER counter CENTER, Phosphor icon (28×28, **teal**) + Lato Regular 16 pt **teal** label
  4. **code** — narrow (108 wide, HUG height), white fill, 1 px gray-01 stroke, padding `16 / 18 / 16 / 18`, no gap, multi-line code text in Lato Regular 13 pt @ 160% LH (the only place 13pt is allowed in this chunk per R-TYPE-005's footer / monospace exception precedent)
- **Rationale:** The closed catalog is what makes the diagram unmistakably MyVault. New ad-hoc node types (rectangles with different fills, stadium shapes, hexagons, cloud-icons-as-nodes) dilute the visual vocabulary. The four types cover every case in the canonical reference and any new diagram should fit one of them.
- **Allowed deviation:** None at the chunk level. If a future diagram needs a fifth node type, evolve the catalog through a chunk version bump (v1.1+) and update the renderer.
- **Check:** any node whose shape / fill / stroke / padding doesn't match one of the four types → reject. Any node attempting a fifth type → reject.

### R-DIAG-004 — Connector kinds: data-flow signal-go solid / logical gray-02 dashed; right-angle only; endpoint markers
- **Spec:** Every connector between nodes uses a 2 px stroke and follows one of two kinds:
  - **data-flow** — color `color.signal.go`, solid (no dash), used for the diagram's primary information path. Endpoint markers: a 4 px filled `color.signal.go` circle at **both** the source and the destination.
  - **logical** — color `color.core.gray-02`, dashed pattern `[4, 4]`, used for secondary / optional / inferred relationships. Endpoint marker: a small triangular arrowhead (`color.core.gray-02`, ~7 px) at the **destination only**.
- All connectors use **right-angle (L-shape) routing** — no diagonals, no curves. Each connector path is described as a sequence of axis-aligned segments in the fixture.
- **Rationale:** Two connector kinds cover every information-flow semantic the canonical reference uses. Right-angle routing keeps the diagram visually quiet — curved or diagonal connectors compete with the nodes for attention. The endpoint markers carry semantic weight: data-flow connectors are bidirectional anchors (signal-go circles at both ends mark the join points to the participating nodes); logical connectors are directional implications (gray arrowhead at destination signals the implied / inferred / optional relationship pointing one way). Dashed-vs-solid + arrow-vs-circle reads at a glance.
- **Allowed deviation:** None at the chunk level. Curved arrow markers, multi-arrow polylines (e.g., bidirectional logical edges), or alternative endpoint shapes (squares, diamonds) are forbidden in v1.0. If future diagrams need them, evolve through a version bump.
- **Check:** any connector whose color is not signal-go or gray-02 → reject. Any connector whose path includes diagonals or curves → reject. Any connector whose stroke is not 2 px → reject. Any solid gray-02 connector (the kinds don't cross — gray-02 is dashed, signal-go is solid) → reject. Any data-flow connector missing the source or destination endpoint circle → reject. Any logical connector missing the destination arrowhead → reject.

### R-DIAG-005 — Signal-go reservation: data-flow connectors and accent-go node fills only
- **Spec:** Within a diagram, signal-go (`#69DE49`) appears in **exactly two contexts**:
  1. As the stroke color of **data-flow connectors** (per R-DIAG-004)
  2. As the fill of **accent-go nodes** (per R-DIAG-003)
- Signal-go does **not** appear as a body envelope stroke, a pill stroke, a code stroke, or any text color (text on accent-go nodes is teal, not signal-go — see R-DIAG-006).
- **Rationale:** The diagram's signal-go usage signals "the data flows here" or "this node is the active / completion / positive-result node." Diluting signal-go across other surfaces (envelope strokes, decorative dots, captions) would weaken the data-flow read.
- **Allowed deviation:** None.
- **Check:** any signal-go appearance in the diagram outside (a) data-flow connector strokes and (b) accent-go node fills → reject.

### R-DIAG-006 — Accent-go node text inversion: teal on signal-go, not white
- **Spec:** The icon and label inside an **accent-go** node are rendered in `color.core.teal` (`#094545`), **not white**. This is the inverse of the accent-teal pattern (where icon + label are white on the teal fill).
- **Rationale:** The teal-on-signal-go pairing keeps Vault Teal as the visible brand-emphasis color even on the green node — a subtle anchor reminding the reader the diagram is MyVault's. White-on-signal-go would visually flatten the accent-go into a generic "completion" green node and lose that anchor. Mark's deliberate edit to the original draft (which used white-on-signal-go) — see `project_diagram_canonical_specs` memory.
- **Foundation-override note:** R-COLOR-008 forbids signal-go for body or caption text. This rule is the inverse — *teal on signal-go*, not signal-go on anything. R-COLOR-008 is honored. The scoped exception in `foundation_overrides` documents the unusual contrast pairing.
- **Check:** any accent-go node whose icon or label is rendered in white, gray, or any color other than `color.core.teal` → reject.

## BASE rules

### Default typography per node type

| Node type | Icon | Label | Size + LH | Color |
|---|---|---|---|---|
| **pill** | Phosphor Regular 18 × 18 (optional) | Lato Regular 14 pt @ AUTO LH | LEFT-aligned | Black on white |
| **accent-teal** | Phosphor Regular 28 × 28 white | Lato Regular 16 pt @ AUTO LH | LEFT or CENTER | White on teal |
| **accent-go** | Phosphor Regular 28 × 28 teal | Lato Regular 16 pt @ AUTO LH | LEFT or CENTER | Teal on signal-go |
| **code** | — | Lato Regular 13 pt @ 160% LH | LEFT, multi-line | Black on white |

### Footer band typography

- **Footer icon:** Phosphor Regular 28 × 28, fill `color.core.black`
- **Footer title:** PT Serif Regular **20 pt**, AUTO LH, fill `color.core.black`, LEFT-aligned

### Connector default behavior

- **Stroke width:** 2 px
- **Endpoints:** the connector path's first and last point are the connection points on the source and target nodes — the agent supplies them in the fixture (no auto-routing in v1.0)
- **Path format:** array of `[x, y]` axis-aligned breakpoints; the renderer draws a polyline with no curves

### Default outer width

The outer width is sized to fit the content. The canonical reference is 1332 wide; adjust per diagram complexity.

## MENU — node-type composition catalog

Each entry describes a valid node composition. Treat as **guidelines, not strict canon** (per `feedback_design_pages_are_guidelines`).

```yaml
node_types:
  - id: pill-with-icon
    label: "Pill node with Phosphor icon (most common)"
    type: pill
    composition: "icon (Phosphor Regular 18px black) + Lato 14pt black label"
    use_when: "the node has a recognizable icon meaning (file, message, prompt, task)"
    figma_section: "Flow Diagram (70:8560) — left-side pill nodes"

  - id: pill-text-only
    label: "Pill node, text only"
    type: pill
    composition: "Lato 14pt black label only"
    use_when: "the node is a text-only marker (e.g., a function call name, a state label)"
    figma_section: "Flow Diagram (70:8560) — 'call to store_memory tool' pill"

  - id: accent-teal-node
    label: "Accent teal node — primary actor / agent / dramatic anchor"
    type: accent-teal
    composition: "Phosphor Regular 28px white icon + Lato 16pt white label, CENTER-stacked"
    use_when: "the node represents the primary actor (Agent), the dramatic anchor of the diagram, or a brand-emphasis point"
    figma_section: "Flow Diagram (70:8560) — 'Agent 1' node"

  - id: accent-go-node
    label: "Accent signal-go node — completion / positive-result / API endpoint"
    type: accent-go
    composition: "Phosphor Regular 28px TEAL icon + Lato 16pt TEAL label (R-DIAG-006), CENTER-stacked"
    use_when: "the node represents a completion / positive result / API endpoint / stored / persisted state"
    figma_section: "Flow Diagram (70:8560) — 'Memory API' and 'Memory DB' nodes"

  - id: code-node
    label: "Code node — narrow card with multi-line code text"
    type: code
    composition: "Lato 13pt @ 160% LH black multi-line code; no icon"
    use_when: "the diagram needs to show a literal payload, message shape, or function signature"
    figma_section: "Flow Diagram (70:8560) — the 'memory: { subject: ... }' payload nodes"

connector_kinds:
  - id: data-flow
    label: "Data flow — primary information path"
    color: signal.go
    style: solid
    width: 2
    use_when: "the connector represents the diagram's main information / data / control flow"

  - id: logical
    label: "Logical / optional — secondary or inferred relationship"
    color: gray-02
    style: dashed [4, 4]
    width: 2
    use_when: "the connector represents a secondary relationship, an optional path, or an inferred/computed link"
```

## Decision tree for the agent

```
1. Receive brief
   - Identify the nodes (what they represent — agent, message, payload, endpoint, etc.)
   - Identify the connections (which node sends/receives what to/from which)
   - Identify the diagram's title (the footer label)

2. Pick a node type per node from the closed catalog
   - pill (with or without icon) — for most labelled markers
   - accent-teal — for the primary actor / agent
   - accent-go — for completion / API / persisted state
   - code — for literal payloads / signatures

3. Place nodes — assign explicit (x, y) positions in the body envelope
   - Body width: typically 1332 (canonical) but author per content
   - Body height: typically 640 (canonical) but author per content
   - Top-left of body is (0, 0); positions are top-left of node bounding box

4. Define connector paths — explicit right-angle paths
   - For each connector: from-node, to-node, kind (data-flow | logical), path
   - path is a sequence of [x, y] breakpoints; renderer draws polyline with no curves
   - First point is the exit point on the source node; last point is the entry point on the target node
   - Intermediate points are right-angle turning points

5. Apply HARD rules
   - R-DIAG-001 footer at TOP
   - R-DIAG-002 body envelope (off-white fill, 1px gray-01 stroke)
   - R-DIAG-003 closed node-type catalog
   - R-DIAG-004 connector kinds + right-angle routing
   - R-DIAG-005 signal-go reservation
   - R-DIAG-006 accent-go text inversion (teal, not white)

6. Apply BASE typography per node type + connector style

7. Apply inherited foundation rules
   - R-COLOR (palette, contrast — note R-COLOR-008 scoped exception declared in foundation_overrides)
   - R-TYPE (families, weights — Regular only; PT Serif + Lato only)
   - R-ICON (Phosphor only)

8. Verify accessibility
   - Pill labels at 14pt — at the floor
   - Accent labels at 16pt — above floor
   - Code text at 13pt — below the 14pt floor; legitimate exception (code monospace tier)
   - WCAG 2.2 AA contrast: teal-on-signal-go for accent-go nodes — pre-cleared (~4.7:1)

9. Compose JSON spec, pass to compose.mjs

10. Render → SVG → embed in deliverable via diagram() Typst primitive (or standalone)
```

## Workflow integration

Same pattern as `chart` and `stat-infographic`.

### Pattern A — embedded in an ebook PDF

Fixture lives at `documents/<deliverable>/charts/<id>.chart.json` (the `charts/` directory holds all composer fixtures regardless of type).

```typst
#import "../../renderers/typst/myvault-editorial.typ": *

#diagram("/documents/<deliverable>/charts/memory-pipeline.svg", measure: "wide")
```

The `diagram()` primitive in `myvault-editorial.typ` sizes the embed to `wide` (720 pt) by default, `1-col` (640 pt) for tighter layouts, or `full` (no scaling — uses native SVG width).

### Pattern B — standalone deliverable

```bash
node renderers/vega-lite/compose.mjs <fixture> <output.svg>
rsvg-convert -w 2400 -o output.png output.svg
```

### Pattern C — embedded in a presentation slide

To be ratified when the presentation chunk's Phase 2 renderer ships.

## Reviewer agent integration

| Reviewer | What it checks for diagrams |
|---|---|
| `diagram-reviewer` | All R-DIAG-001..006. Footer-at-top + footer band format; body envelope fill + stroke; node type compliance per the closed catalog; connector kinds + right-angle routing; signal-go reservation; accent-go text inversion (teal not white). Cites violations as `R-DIAG-NNN at node <id>` or `at connector <from>→<to>`. |
| `color-reviewer` | Foundation R-COLOR-001..010. Honors the R-COLOR-008 scoped exception declared in this chunk's `foundation_overrides`. |
| `typography-reviewer` | Foundation R-TYPE-001..009. Code text at 13pt is the named exception (per R-TYPE-005's footer / caption-tier precedent). |
| `brand-element-reviewer` | R-LOGO + R-ICON. Phosphor icons only (R-ICON binds); per-position weight follows the per-node-type defaults. |
| `accessibility-reviewer` | WCAG 2.2 AA contrast on every text-on-surface pair. Teal-on-signal-go for accent-go nodes is the contrast-cleared pairing. |

## Renderer + spec format

**Renderer:** Node SVG composer (`renderers/vega-lite/compose.mjs`) — same toolchain as charts and stat-infographic. The composer's `composeFlowDiagram()` function:
- Reads node positions and types from the fixture
- Loads Phosphor icons via `lib/icons.mjs`
- Renders nodes (pill / accent-teal / accent-go / code) with type-specific composition
- Renders connectors as polylines with axis-aligned segments

**Spec format:** `.chart.json` — yes, the same extension and directory convention as charts and stat-infographics. The composer dispatches on `type: "flow-diagram"`.

**Phase 2 deliverable:** `renderers/vega-lite/compose.mjs` extended with `composeFlowDiagram` + per-node-type renderers. Same pipeline as the existing types.

## Foundation overrides

**One.** The R-COLOR-008 scoped exception for accent-go node label text (teal on signal-go, declared in `foundation_overrides`). See R-DIAG-006 for the rationale.

## Cross-references

- **`color`** — palette, contrast, signal color semantics
- **`typography`** — type styles per role; 14pt floor + named code-tier 13pt exception
- **`iconography`** — Phosphor only
- **`chart`** (sibling) — different shape; chart-card has bottom-footer + plot region. Diagrams have top-footer + free-positioned body.
- **`stat-infographic`** (sibling) — different shape; signal-go OUTSIDE border + column triplet, no node-graph.
- **`ebook`** (sibling) — when a diagram is embedded in an ebook page, both bind. The `diagram()` primitive in `myvault-editorial.typ` sizes the embed.

## Visual canon

The Figma reference at `70:8560` (file `Pm31BDHj34WjJ7NjBK4Ady`) is the canonical example — an agentic memory pipeline showing task / prompt / agent → memory API → memory DB with code payload nodes. Future diagrams follow the same node-type catalog + connector kinds.

URL: <https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System?node-id=70-8560>

## Memory linkage

Diagram canon was previously catalogued in `project_diagram_canonical_specs` (2026-04-21) which is now superseded by `chart.md`, `stat-infographic.md`, and this chunk together. The memory's Flow Diagram entry — including the deliberate teal-on-signal-go inversion for accent-go nodes — is **superseded by this chunk** and can be replaced with a one-line pointer on the next gardening pass.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-05-01 | **v1.0 — Initial.** 6 HARD rules (R-DIAG-001..006). BASE typography per node type. MENU of 5 node-type compositions + 2 connector kinds. Renderer pinned to the existing JSON-spec + Node SVG composer. One foundation override (R-COLOR-008 scoped exception for accent-go node text — teal on signal-go, not white). Adopted from `chart.md` v1.0's "out of scope" list. The Typst primitive `diagram()` in `myvault-editorial.typ` embeds the SVG into ebook PDFs — same pattern as `chart()` and `stat-infographic()`. Auto-routing connectors deferred to v2 — v1.0 requires explicit path arrays in the fixture, matching Mark's hand-routing in the canonical reference. | Mark + Claude |
