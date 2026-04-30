---
type: deck-content
status: brief
owner: claude
created: 2026-04-30
tags:
  - design-system-test
  - presentations
  - test-fixture
  - private-by-design
related:
  chunk: "[[10-Brand/visual-system/chunks/presentation]]"
  fixture-history: "[[10-Brand/visual-system/presentations/investor-deck-test/deck-content-v1]]"
summary: "Test-deck content brief. End-to-end stress test of chunks/presentation.md v1.1 — different content from the investor-deck fixture so the design system gets exercised, not just confirmed against itself. 10 slides covering Cover / Statement / dramatic-teal Problem / 3-card Why Now / editorial-dark Architecture / single Stat hero / Feature Comparison / Thesis-pattern Lessons / Action / Closing."
---

# Test deck — "The State of Family Privacy in 2026"

## Why this deck

This is a **test fixture for the presentation visual-system, not a production deliverable.** The investor deck (`deck-content-v1.md`) was the fixture used to *build* the system. This deck is the fixture used to *test* it — different content, different audience, different register transitions, so the rules get exercised on novel material rather than confirmed against the prototypes that produced them.

Per `documents/ebook-test/workflow.md` (the same discipline): the renderer is a rule-based layout generator, not a Figma replicator. Each slide is composed from content + rules — the Section-1 prototypes are register inspiration, never templates to clone.

## Audience + format

- **Speaker:** Markos Symeonides (CEO, MyVault) — Authority register, longer sentence rhythm, dry observation allowed (per Voice of Markos satellite)
- **Audience:** privacy-engineering practitioners and researchers (IAPP Global Privacy Summit / Privacy Engineering Practice / similar)
- **Length:** 18-min keynote talk + 5-min Q&A
- **Format:** projector slides + verbal delivery (slides reinforce, don't carry the talk)

## Arc

Acknowledge the moment → surface the gap (families, not users) → show the architectural answer → invite the audience into the conversation. Calm authority throughout. No product pitch.

## Slide-by-slide brief

### Slide 1 · Cover

**Register:** Cover — brand moment.

**Surface:** editorial gradient (warm or mist) — establishes a register that's calm but distinct from the white default.

**Content:**
- Title: *The State of Family Privacy in 2026*
- Subtitle: *What we learned building for the household, not the user.*
- Speaker line: *Markos Symeonides · Founder, MyVault · IAPP Global Privacy Summit*

**Layout:** PT Serif title (display tier, 72-96pt depending on what fits two lines), Lato subtitle (28pt) below, speaker line at the bottom. No header labels (Cover). No footer page number on Cover.

### Slide 2 · Opening statement

**Register:** Statement — single-idea slide.

**Surface:** white default.

**Content:**
- Big statement (PT Serif 72pt, black): *Privacy was a product question. It is becoming a household question.*
- One signal-go dot as final punctuation (small, after the period of the second sentence)

**Layout:** centered statement on the slide. Header labels: deck-name + section-name "Opening". Footer: icon + page number "02".

### Slide 3 · The state today (Problem)

**Register:** dramatic — full-bleed Vault Teal background.

**Content:**
- Slide title: *The household is the new edge.* (PT Serif 72pt white)
- Three problem rows (PT Serif 72pt heading + Lato 28pt body, both white):
  1. **Fragmentation.** A typical household manages 72+ online accounts and stores critical documents across 4–6 cloud services. Insurance in email. Wills in a lawyer's drawer. Photos buried across drives.
  2. **Trust collapse.** Mainstream AI assistants read private files in order to train on them. The tools designed to help require households to surrender what they own.
  3. **Crisis fragility.** When something goes wrong — identity stolen, parent's diagnosis, estate triggered — families spend weeks hunting documents that should be one search away.

**Layout:** title at top, three rows stacked. Header labels white. Footer icon-white + page number white.

### Slide 4 · Three shifts

**Register:** data-light — white surface, 3-card grid.

**Content:**
- Slide title (PT Serif 72pt black): *Three shifts make this the moment.*
- Three cards (PT Serif 40pt heading + Lato 28pt body):
  1. **AI is reliable enough to reason over private documents.** Foundation-model accuracy on domain-specific document analysis crossed the usable threshold in 2024–25.
  2. **Privacy is no longer niche.** Twelve US state privacy laws active or scheduled by 2025; post-scandal consumer wariness is mainstream.
  3. **Zero Trust is buildable at consumer scale.** Per-user customer-managed keys, serverless processing, isolated tenancy — startup-affordable.

**Layout:** title left at x=80, three cards in 3-column grid (587 × N + 40 + 40 = 1840). Header labels gray-02, footer icon-primary.

### Slide 5 · The architecture answer

**Register:** editorial-dark — black surface.

**Content:**
- Slide title (PT Serif 72pt white): *Zero Trust is the architecture, not the marketing.*
- Body sentence (Lato 28pt solid white): *Files are processed in isolation, encrypted at rest with per-user keys customers control, and never used to train any model. If any single layer is breached, every other layer still protects the data.*
- Four-layer stack (label PT Serif 40pt white + body Lato 28pt solid white per layer):
  1. **Device.** TLS 1.3 in transit. Customer keys never leave the device unprotected.
  2. **Processing.** Short-lived, scoped, audited. Data is readable only during the work.
  3. **Keys.** AWS KMS, per-user, customer-controlled. Revocable at any time.
  4. **Storage.** Encrypted at rest. Isolated tenancy. Never enters a training pipeline.

**Layout:** title at top, body below, four stacked layer rows. Header labels white. Footer icon-white.

### Slide 6 · The number that matters (Stat hero)

**Register:** dramatic moment — single hero stat.

**Surface:** white default.

**Content:**
- Stat number (PT Serif 144pt teal): *72+*
- Supporting headline (PT Serif 56pt black): *online accounts in a typical household.*
- Supporting paragraph (Lato 28pt black): *And growing 12% year over year. Each one a credential, a document, a memory, a vulnerability — and an entry point for a system that should hold all of them safely.*
- Source caption (Lato 18pt gray-02): *Source · MyVault internal data + Pew 2025 household digital footprint study.*

**Layout:** centered hero number, supporting hierarchy stacked below, source caption near bottom. Header labels gray-02. Footer icon-primary + page number.

### Slide 7 · How approaches handle family data (Comparison)

**Register:** data-comparison — off-white surface (warmer for tables).

**Content:**
- Slide title (PT Serif 72pt black): *How four approaches handle family data.*
- Comparison table (5 rows × 5 columns), Harvey Ball ratings:
  - Columns: MyVault · Trustworthy · Lumo (Proton) · iCloud / Google One · Generic AI assistant
  - Rows: Family-context AI · Zero Trust architecture · Estate / inheritance built-in · Multi-cloud ingest · No-training-data guarantee
- Legend: ● full · ◐ partial · ○ none
- Footer caption: *Axes are the four questions families and privacy practitioners ask first.*

**Layout:** title at top, 5×5 table fills the content area. Header labels gray-02 + section name "Approaches". Footer icon-primary + page number.

### Slide 8 · What we've learned (Thesis pattern)

**Register:** Thesis-pattern — small headline (40pt per chunk Pattern Reference note), 5 cards.

**Surface:** white default.

**Content:**
- Headline (PT Serif 40pt black, small Thesis-pattern style): *Five things we've learned building for the household.*
- Five thesis cards in a 5-up arrangement (PT Serif 28pt distinctive serif body):
  1. **The household is the unit, not the user.** Treat shared documents and shared decisions as first-class.
  2. **Crises are when the system has to work.** Build for the worst day, not the average day.
  3. **The agent must be domain-aware.** Generic AI fails at specialized recall.
  4. **Architecture is the moat.** Marketing-layer privacy promises cannot be verified.
  5. **Trust is earned across years, lost in a session.** Calm operation is a feature.

**Layout:** small headline at top, 5 cards arranged below (could be staircase / 3+2 grid / vertical column — choose what serves the rhythm). Header labels gray-02 + "Lessons". Footer icon-primary + page number.

### Slide 9 · What this enables (Call to action)

**Register:** action — invite the audience to take the next step.

**Surface:** white default with editorial-warmth via small accents.

**Content:**
- Slide title (PT Serif 56pt black): *If you're building for families, here's where to start.*
- Three action blocks (PT Serif 40pt heading + Lato 28pt body):
  1. **Treat the household as a tenant.** One vault per family. Shared keys, shared access controls.
  2. **Make encryption the contract, not the upsell.** Per-user keys customers control should be the default.
  3. **Surface the architecture, not just the policy.** Show the layers — privacy decided in the diagram is privacy that survives the next breach.
- Closing line (PT Serif 28pt black, distinctive serif body): *We'd rather you build it than us alone.*

**Layout:** title at top, 3 action blocks in 3-column grid. Closing line centered below. Header labels gray-02 + "Action". Footer icon-primary + page number.

### Slide 10 · Closing

**Register:** Closing — sign-off, contact, brand calm.

**Surface:** editorial gradient (cool or mist).

**Content:**
- Closing headline (PT Serif 96pt black, two lines): *Built on calm. Private AI for the things that matter most.*
- Speaker contact (Lato 28pt black): *Markos Symeonides · markos@myvault.ai · myvaultai.com*
- Single signal-go dot as the final mark.

**Layout:** centered closing headline, speaker contact below. No header labels (Closing). No footer page number on Closing.

## Pattern coverage matrix

| Slide | Register | Surface | Pattern reference | New composition? |
|---|---|---|---|---|
| 1 Cover | brand moment | gradient/warm | (no Section-1 prototype) | yes |
| 2 Opening | Statement | white | Statement (Section 1 has no exact match — Slide 09 Thesis is closest) | yes |
| 3 Problem | dramatic | teal full-bleed | Slide 10 Three-Panel Diagnostic (`99:8638`) — register inspiration | partly |
| 4 Three shifts | data-light | white 3-col | Slide 11 Why-Now Wedge (`99:8656`) — register + structure | partly |
| 5 Architecture | editorial-dark | black | Slide 12 Architecture Diagram (`99:8677`) — register + structure | partly |
| 6 Stat hero | hero stat | white | (no Section-1 single-stat) — Slide 14 SOM block has dramatic teal stat | yes |
| 7 Comparison | data-comparison | off-white | Slide 17 Feature Comparison (`99:8915`) — register + structure | partly |
| 8 Lessons | Thesis-pattern | white | Slide 09 Thesis Block (`99:8612`) — register + 5-card layout | partly |
| 9 Action | action | white | Slide 21 Ask · Use of Funds (`99:9060`) — 3-block use-of-funds rhythm | partly |
| 10 Closing | Closing | gradient/cool | (no Section-1 closing prototype) | yes |

## Cycle plan

1. **Cycle 1** — build all 10 slides in Figma (new Section 2 on Presentations page), apply HARD + BASE rules, reference Section 1 patterns where useful but compose freely
2. **Cycle 2** — screenshot all + review (Layer 1 mechanical + Layer 2 reader experience)
3. **Cycle 3+** — apply fixes, re-screenshot, repeat
4. **Final** — capture learnings → `learnings.md`; if rule refinements needed, bump `chunks/presentation.md` to v1.2

## Don'ts (carryover discipline)

- Don't clone Section-1 prototypes — compose fresh
- Don't drop big titles to 40pt unless using the Thesis-pattern (Slide 8 only)
- Don't use teal below display tier outside chart-card boundaries (this deck has no chart cards)
- Don't add decorative top header bars (text-only labels only — Slides 2-9 carry them; Slides 1 + 10 omit)
- Don't use any font below 18pt
- Don't apply opacity to body text on dark surfaces — solid white only
