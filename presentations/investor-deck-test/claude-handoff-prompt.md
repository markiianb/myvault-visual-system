---
type: handoff-prompt
status: active
owner: "[[Mark Bobyliak]]"
created: 2026-04-28
updated: 2026-04-28
tags:
  - claude-handoff
  - design-system-test
  - investor-deck
summary: Paste-ready prompt for a new Claude Code session that picks up the MyVault investor-deck build in Figma using the design-system presentation flow.
---

# Claude Code session — handoff prompt

> Paste everything below the line into the new session. It is self-contained and does not assume any prior conversation context.

---

You are continuing the MyVault investor deck build inside the existing Figma brand-system file. We're using this deck as the **first real test of our design-system presentation creation flow** — the patterns you set here become the canon for all future MyVault decks. Take your time, study the existing patterns, and match them exactly.

## What this is

MyVault is a privacy-first AI personal-knowledge platform for families. We're building a 16-slide investor deck. The full deck content (slide-by-slide, with content + slide type per slide) lives at:

```
/Users/mark_b/Documents/Business/MyVault/80-Documents/Strategy/Investor-Deck/deck-content-v1.md
```

**Read that file in full before doing anything else.** It's the source of truth for what each slide says and what slide-type pattern applies.

The narrative arc is Hoffman investment-thesis-first, told in Sequoia vocabulary, with AI-era 2025–26 layers (Zero Trust as moat, gross-margin trajectory, NDR posture). 16 slides total in the send-ahead version.

## Where things stand in Figma

- **File:** `Pm31BDHj34WjJ7NjBK4Ady` (MyVault — Brand Design System)
- **Page:** Presentations (id `74:9684`)
- **Two relevant sections on that page:**

### Section A — "Slide Templates" (id `76:9735`)
The canonical slide-type prototypes. Each frame is 1920×1080. Eight types finished:

| Frame id | Name | What it teaches |
|---|---|---|
| `89:7354` | Slide 01 / Title | Cover / opening — wordmark, descriptor, meta footer |
| `89:7380` | Slide 02 / Agenda | List structure, eyebrow + dot |
| `89:7409` | Slide 03 / Section Divider · Light | Editorial off-white register |
| `89:7419` | Slide 04 / Section Divider · Dark | Editorial dark register (Vault Teal background) |
| `89:7426` | Slide 05 / Statement | Big PT Serif headline, no decoration |
| `95:7666` | Slide 06 / Stat Block | 70/20/7/3 proportion rule — off-white left, Vault Teal right panel, signal-go dot accent |
| `95:7678` | Slide 07 / Logo Reveal | Black canvas, construction-grid hairlines, dashed safe-clearance, signal-go period |
| `95:7701` | Slide 08 / Comparison | Two-column max-2-colours, sub-brand lockup footer |

Slides 06, 07, 08 were built in the last session — capture them with `figma_capture_screenshot` and study their JS construction before you build anything new.

### Section B — "Section 1" (id `97:8611`, nested inside "Title slides" section `97:7729`)
Mark's rough deck-layout drafts at 1920×1080 — `Title - 9` through `Title - 20`. These are low-fi sketches of the actual investor deck story (problem, why now, solution, product, market…). **Study these to understand Mark's emerging visual decisions for each slide of the real deck.** Use them as ground truth for layout and tone — your job is to take those drafts and elevate them into the canonical Slide Templates section using the established visual primitives.

## What you build next

Continue adding new slide-type prototypes to the **Slide Templates** section (`76:9735`). They'll be numbered slide 09, 10, 11… in the section, but they correspond to the deck slides defined in `deck-content-v1.md`.

Order to build (high-priority first):

1. **Slide 09 / Thesis Block** — for deck slide 2 (Investment Thesis): five numbered propositions, off-white, single Vault Teal column-rule, signal-go dots
2. **Slide 10 / Three-Panel Diagnostic** — for deck slide 3 (Problem): three equal off-white columns with hairline dividers
3. **Slide 11 / Why-Now Wedge** — for deck slide 4: three columns with a thin Vault Teal arrow under
4. **Slide 12 / Architecture Diagram** — for deck slide 6 (Zero Trust): four-layer dark stack with construction-grid backdrop
5. **Slide 13 / Product Demo** — for deck slide 7: hero screenshot + three callouts
6. **Slide 14 / Market Sizing Block** — for deck slide 8: TAM/SAM/SOM nested
7. **Slide 15 / Two-Stream Model** — for deck slide 9: two-column variant of Comparison with sub-brand footer
8. **Slide 16 / Traction Hero** — for deck slide 10: line chart + four stat tiles
9. **Slide 17 / Feature Comparison Table** — for deck slide 11: Harvey Ball ratings, no 2x2
10. **Slide 18 / Phase Diagram** — for deck slide 12 (GTM): two stacked bands
11. **Slide 19 / Team Grid** — for deck slide 13: 3-up portraits, founder-market-fit one-liners
12. **Slide 20 / Financials Curve** — for deck slide 14: stacked area + burn line + tiles
13. **Slide 21 / Ask · Use of Funds** — for deck slide 15: Stat Block variant, dollar figure as hero stat

After each slide, screenshot it with `figma_capture_screenshot` to verify, and iterate up to 3 times if the layout is off.

## Slide construction pattern (canonical)

```js
await figma.loadAllPagesAsync();
const presPage = figma.root.children.find(p => p.name === "Presentations");
await figma.setCurrentPageAsync(presPage);
const section = presPage.findOne(n => n.type === "SECTION" && n.name === "Slide Templates");

// Variables — store the OBJECTS, not ids
const localVars = await figma.variables.getLocalVariablesAsync();
const VARS = {};
for (const v of localVars) if (v.resolvedType === "COLOR") VARS[v.name] = v;

const tokenFill = (name) => {
  const f = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };
  return figma.variables.setBoundVariableForPaint(f, "color", VARS[name]);
};

await figma.loadFontAsync({ family: "Lato", style: "Regular" });
await figma.loadFontAsync({ family: "PT Serif", style: "Regular" });

// Clean any prior failed attempt with the same name
const stale = section.children.find(c => c.name === "Slide NN / Name");
if (stale) stale.remove();

const slide = figma.createFrame();
slide.name = "Slide NN / Name";
slide.resize(1920, 1080);
slide.x = 80 + (NN - 1) * 2000;  // slide stride is 2000 (1920 wide + 80 gap)
slide.y = 80;
slide.fills = [tokenFill("color/core/off-white")];  // or black, or teal per register
slide.clipsContent = true;
section.appendChild(slide);

// ... add children ...

return { id: slide.id, name: slide.name };
```

If the section width is exceeded as you add new slides, expand it first:
```js
section.resizeWithoutConstraints(80 + N * 2000 + 80, 1240);
```

## Available design tokens (variables)

Color (always bind via `setBoundVariableForPaint`, never hardcode rgb):
```
color/core/teal              (Vault Teal — dominant brand)
color/core/white
color/core/off-white         (default page background)
color/core/gray-01           (subtle hairlines)
color/core/gray-02           (body / secondary text)
color/core/black             (Editorial Dark register)
color/secondary/premium-purple
color/secondary/dark-earth
color/secondary/rich-blue
color/signal/go              (the green accent dot)
color/signal/stop
color/signal/sky
color/signal/earth
color/icon/default
```

Paint styles (gradients):
```
gradient/greydient
gradient/primary
gradient/cool
gradient/warm
gradient/mist
```

Bind a paint style with `await node.setFillStyleIdAsync(paintStyleId)` after fetching with `await figma.getLocalPaintStylesAsync()`.

## Brand rules — apply to every slide

- **Fonts:** Lato Regular and PT Serif Regular ONLY. No bold/medium/italic. No other families. Emphasis comes from size, color, spacing.
- **70/20/7/3 colour proportions** — one dominant tone (often a panel block), one secondary (background or text), one small accent (signal-go), and one hairline pop.
- **Max 2 colours per graphic** — signal-go counts as punctuation, not a third colour.
- **Signal-go dot** is the canonical accent device. Use it sparingly — one or two per slide.
- **Sub-brand lockup formula** in footers: `MyVault | DESCRIPTOR` with a vertical hairline divider.
- **No uppercase letter-spaced "kicker" eyebrows** as decorative tags above titles.
- **No emojis.**
- **No bolds.** If you find yourself reaching for `style: "Bold"`, switch to PT Serif at a larger size instead.

## Hard rules — never violate

1. **Image size limit: 2000 PIXELS.** Never produce an image with either dimension > 2000px. For Figma screenshots:
   - Prefer `figma_capture_screenshot` (plugin) — it auto-caps at 1568px on the longest side, always safe.
   - For `figma_take_screenshot` (REST), calculate scale: `scale ≤ 2000 / max(width, height)`. A 1920×1080 frame at any scale ≤ 1.0 is safe; the full Slide Templates section at 16160 wide needs `scale ≤ 0.12`.
   - The Section 1 area (`97:8611`) is 20480 wide — needs `scale ≤ 0.097` for REST, or just use the plugin screenshot.
2. **Zero Trust, never zero-knowledge.** Per ADR-0001, this distinction is load-bearing. MyVault processes files in the clear during the work; "zero-knowledge" is factually wrong.
3. **Product Voice:** MyVault is a tool, never "I". "MyVault organises…" not "I organise…". Founder voice ("we") is fine on team / thesis slides.
4. **Banned words:** leverage, seamless, revolutionary, cutting-edge, robust, scalable, ecosystem, journey, magic. Banned across all MyVault content.
5. **Brand name:** always "MyVault" — capital M, capital V, one word. Never "My Vault", "Myvault", or "myvault".

## Known gotchas

- `figma_get_token_values` returns `{}` — useless. Use `figma_execute` with `figma.variables.getLocalVariablesAsync()` directly.
- `node.mainComponent` (sync getter) throws under `documentAccess: dynamic-page`. Always `await node.getMainComponentAsync()`.
- `figma.variables.setBoundVariableForPaint` expects the variable **object**, not the id string. Store objects in your VARS map, not ids.
- REST screenshot endpoint caches aggressively. After a fresh edit, individual frame renders may return "node not renderable" for a few seconds. Use `figma_capture_screenshot` (plugin) — it always reflects current plugin runtime state.
- `figma_capture_screenshot` (plugin) has minimum scale 0.5; for very wide nodes use `figma_take_screenshot` (REST) at small explicit scale.
- `figma_execute` results > ~60k chars hit limits. If you need to dump a lot of data, write to a node property or return only summary fields.
- The Slide Templates section width must be expanded before adding a slide that would extend past it.

## Important context to load

- **Memory** — auto-loaded from `~/.claude/projects/-Users-mark-b-Documents-Business-MyVault/memory/`. The most relevant entries:
  - `feedback_design_pages_are_guidelines.md` — design-system page mockups are guidelines not strict rules; don't flag placeholder copy or variant duplicates as bugs
  - `feedback_myvault_brand_name.md` — capitalisation
  - `feedback_image_size_limit.md` — the 2000px rule
  - `feedback_myvault_fonts_lato_primary.md` — fonts
  - `feedback_no_uppercase_eyebrows.md` — no kicker tags
  - `feedback_regular_weight_only.md` — Regular only
  - `feedback_figma_card_structure.md` — match Mark's existing patterns exactly
  - `project_diagram_canonical_specs.md`, `project_ebook_cover_canonical_specs.md`, `project_ebook_page_canonical_specs.md` — finalised visual specs
- **Vault `CLAUDE.md`** — `/Users/mark_b/Documents/Business/MyVault/CLAUDE.md`
- **Brand-system parent CLAUDE.md** — `/Users/mark_b/Documents/Business/MyVault/10-Brand/CLAUDE.md`
- **Marketing CLAUDE.md** — `/Users/mark_b/Documents/Business/MyVault/30-Marketing/CLAUDE.md`
- **ADR-0001** — `/Users/mark_b/Documents/Business/MyVault/Decisions/ADR-0001-Zero-Trust-not-Zero-Knowledge.md`

## Workflow

1. Read `deck-content-v1.md` in full.
2. Capture screenshots of the existing 8 slide-type prototypes (`76:9735` children). Study them.
3. Capture a screenshot of "Section 1" (`97:8611`) — Mark's rough draft layouts. Study them.
4. Build slides one at a time. After each, screenshot to verify and iterate up to 3 times.
5. Resize the Slide Templates section as you add slides.
6. After each new slide-type prototype is approved, update `deck-content-v1.md` to mark which slide-types are now built.
7. Maintain the changelog table in `deck-content-v1.md` — bump to v2 when you've added all 11 new slide types.

## Tone for talking to Mark

- Brief and direct. State results, not deliberations.
- One sentence updates between major actions. No long status reports.
- When in doubt about a layout decision, look at Section 1 first; if Mark drew it that way, that's the answer.
- If a layout decision isn't covered, ask before building.

---

When ready, start by reading `deck-content-v1.md`, then capture the existing 8 slide prototypes, then capture Mark's Section 1 drafts, then propose which slide to build first and what its layout will be — wait for approval before executing.
