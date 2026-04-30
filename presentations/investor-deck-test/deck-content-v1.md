---
type: design-system-test
status: in-progress
owner: "[[Mark Bobyliak]]"
created: 2026-04-28
updated: 2026-04-28T15:30
tags:
  - design-system
  - presentations
  - test-fixture
version: v4
summary: Design-system test — investor deck content used as the test fixture for the MyVault presentation creation flow. Output is the canonical presentation system. NOT a production fundraising document.
---

# MyVault Presentation System — Investor Deck Test

> **This is a test of the MyVault presentation design system, not a production investor deck.** The investor-deck content is the fixture we're using to define the canonical presentation rules: typography, layout, colour, footer pattern, gradient cards, etc. The output of this test is the **design system canon** documented below — which becomes the template for every future MyVault deck.
>
> The `[CONFIRM]` / `[INSERT]` / `[DRAFT]` markers are placeholders proving the layouts hold up with real text, not fundraising blockers.

## Provenance

- **Product / market research:** distilled from `[[20-Product/01-Product-and-Functionality]]`, `[[20-Product/02-Target-Audience-and-Market-Reach]]`, `[[20-Product/03-Technical-Overview]]`, `[[20-Product/04-Detailed-Use-Cases]]`, `[[20-Product/05-Market-Research-Intelligence-Report]]`, `[[20-Product/06-Life-Domains-Framework]]`, `[[20-Product/Competitors/Trustworthy]]`, `[[20-Product/Competitors/Lumo]]`, `[[20-Product/Competitors/TheDrive]]`, `[[Decisions/ADR-0001-Zero-Trust-not-Zero-Knowledge]]`, `[[Decisions/ADR-0005-Three-Brand-Systems]]`.
- **Deck-construction research:** synthesis of YC (Seibel/Altman), Sequoia template, Reid Hoffman / Greylock annotated decks, Guy Kawasaki 10/20/30, a16z, Headline VC AI-era 2025 template, First Round Review, SaaStr (Lemkin), Hunter Walk, DocSend.
- **Constraint inheritance:** [[10-Brand/brand-system]] — no banned words, Product Voice rule (MyVault is a tool, never "I"), Zero Trust language never relaxed to "zero-knowledge".

## Narrative arc

Hoffman's **Investment-Thesis-First** structure, told in **Sequoia's slide vocabulary**, with **AI-era 2025–26 layers** (Zero Trust as moat, gross-margin trajectory, NDR posture). Sixteen slides in the send-ahead version, ten survive the live cut.

State the bet → prove it slide by slide (problem real → shifted from impossible to inevitable → solution → architecture is the moat → product works → market is large → model is sound → motion starting → competitors haven't built it → distribution is already ours → team can win it → numbers add up → ask) → circle back to the thesis.

## Open items requiring Markos / Mark input

| # | Item | Status |
|---|---|---|
| 1 | Round size and use-of-funds split | Not yet specified |
| 2 | Pricing — DTC tiers ($7 / $15 / $25) | [CONFIRM against `01-Product-and-Functionality`] |
| 3 | Pricing — B2B2C advisor seat ($10–30K/yr) | [DRAFT per project memory `project_briefing_v16_3_open_conflicts.md`] |
| 4 | TAM ($14.2B) / SAM ($4.5–5.4B) / SOM ($50–72M) | [CONFIRM against `05-Market-Research`] |
| 5 | Beta cohort size, newsletter subs, LinkedIn reach, advisor convos | All [INSERT] — no live numbers in vault |
| 6 | Team beyond Markos & Mark | [INSERT or omit] |
| 7 | Year 1/2/3 ARR targets and gross margin trajectory | [INSERT from finance model] |
| 8 | First customer / partnership names if any | [INSERT or omit] |

---

# The deck

## Slide 1 · Cover

**Slide type:** **Title / Logo Reveal** — already built (Figma slide 07 pattern). Editorial dark register.

**Content:**
- MyVault wordmark, centered, optional construction-grid backdrop
- One line: *Private AI for the things that matter most.*
- Meta footer: *Series [Seed | A] · 202X · markos@myvault.ai · myvaultai.com* `[CONFIRM round stage]`

---

## Slide 2 · Investment Thesis

**Slide type:** **NEW — "Thesis Block"**. Off-white. Five large-number propositions in PT Serif Regular, body in Lato Regular below each. 70/20/7/3 proportions: dominant off-white, single Vault Teal column-rule, signal-go dot accents on the numbers.

**Content:**

Headline: *Why MyVault wins.*

1. Families hold the highest-stakes personal data — and no software treats it that way.
2. AI is finally good enough to organise it. Privacy is finally the customer ask.
3. Zero Trust architecture turns privacy into a verifiable moat, not a marketing claim.
4. Two channels — direct to families, and through advisors — compound each other.
5. Founder-market fit: built by operators who lived this problem.

**Why this slide leads instead of an Agenda:** Hoffman's principle — name the bet before listing a table of contents. Investors decide by slide 2 whether to engage with the argument.

---

## Slide 3 · Problem

**Slide type:** **NEW — "Three-Panel Diagnostic"**. Off-white background, three equal columns separated by hairline rules. Lato Regular body. One small signal-go dot at the top of each panel.

**Content:**

Headline: *Three problems, one missing solution.*

| Panel | Heading | Body |
|---|---|---|
| 1 | The fragmentation problem. | The average household manages 72+ online accounts and stores critical documents across 4–6 cloud services. Insurance policies in email. Wills in a lawyer's drawer. Photos buried in three drives at once. |
| 2 | The trust problem. | Every mainstream AI assistant reads private files in order to train on them. The tools designed to make life easier require households to surrender the most sensitive information they own. |
    | 3 | The crisis problem. | When something goes wrong — an identity stolen, a parent's diagnosis, an estate triggered — families spend weeks hunting for documents that should be one search away. |

---

## Slide 4 · Why Now

**Slide type:** **NEW — "Why-Now Wedge"**. Three-column layout on off-white, with a thin Vault Teal arrow or rule moving left-to-right beneath the columns to imply the convergence.

**Content:**

Headline: *Three shifts make this possible now.*

| Shift | One-line evidence |
|---|---|
| AI is reliable enough to reason over private documents. | Foundation-model accuracy on domain-specific document analysis crossed the usable threshold in 2024–25. |
| Privacy is no longer a niche concern. | Twelve US state privacy laws active or scheduled by 2025; post-scandal consumer wariness is now mainstream. |
| Zero Trust is buildable at consumer scale. | Per-user customer-managed keys, serverless processing, isolated tenancy — now startup-affordable. |

---

## Slide 5 · Solution

**Slide type:** **Statement** — already built (Figma slide 05 pattern). Editorial Dark or Editorial Off-White register. PT Serif headline only, no other elements competing.

**Content:**

Headline (PT Serif, large): *"MyVault organises, protects, and recalls everything a family owns — without anyone having to read it themselves."*

Caption (Lato Regular, smaller, beneath): *One vault. Fourteen domain agents. Zero Trust by architecture, not promise.*

Single signal-go dot as punctuation.

---

## Slide 6 · Zero Trust as Moat

**Slide type:** **NEW — "Architecture Diagram"**. Editorial Dark register. Borrows construction-grid treatment from Figma slide 07 to imply formal architecture. Layers as horizontal bands with thin signal-go connecting lines.

**Content:**

Headline: *Zero Trust isn't a feature. It's the architecture.*

Body sentence: *Files are processed in isolation, encrypted at rest with per-user keys customers control, and never used to train any model. If any single layer is breached, every other layer still protects the data.*

Diagram (four-layer stack, top to bottom):

1. **Device** — TLS 1.3 in transit
2. **Processing** — short-lived, scoped, audited; data readable here only during the work
3. **Keys** — AWS KMS, per-user, customer-controlled
4. **Storage** — encrypted at rest, isolated tenancy, no training pipeline

Footer micro-line: *Zero Trust, not zero-knowledge. See `[[Decisions/ADR-0001-Zero-Trust-not-Zero-Knowledge]]` for why we hold the line on the language.*

**Why this comes before the product demo:** the architecture *is* the moat. Showing the product first reads as a feature pitch; showing the architecture first reads as category creation.

---

## Slide 7 · Product Demo

**Slide type:** **NEW — "Product Demo"**. Off-white. Single hero screenshot (1200px wide centered) with three annotation callouts pulling out via thin rules. Send-ahead uses static screenshot; live version can swap in a 30-second video frame.

**Content:**

Headline: *Three workflows, one interface.*

Annotated callouts:

- **Ingest.** Automatic capture from Google, Apple, Dropbox, OneDrive.
- **Organise.** Fourteen domain agents classify, extract, and connect.
- **Recall.** Ask MyVault — natural language, with sources cited.

Caption: *Live today: insurance, finance, asset management, general knowledge. By Q3 2026: health, legal, tax, property, travel, employment.* `[CONFIRM Q3 dates against V2.0 roadmap]`

---

## Slide 8 · Market

**Slide type:** **NEW — "Market Sizing Block"**. Off-white. Three-box nested layout (or three concentric circles) — SOM in Vault Teal, TAM/SAM in gray-02, applies the max-2-colours rule.

**Content:**

Headline: *A category being built, not contested.*

- **TAM** — **$14.2B**. 79.2M US households earning $75K+ × ~$15/month blended ARPU. `[CONFIRM]`
- **SAM** — **$4.5–5.4B**. 25–30M US households fitting the ICP profile (digital literacy, multiple cloud services, financial complexity).
- **SOM (3-year)** — **$50–72M ARR**. 350–400K paying households at 1% SAM penetration, plus B2B2C advisor channel revenue.

Footer: *Bottom-up, household-level. Vanity top-down figures intentionally excluded.*

---

## Slide 9 · Business Model

**Slide type:** **NEW — "Two-Stream Model"**. Off-white, two columns separated by a single Vault Teal column rule. Sub-brand lockup formula in the footer (`MyVault | TWO CHANNELS, ONE PLATFORM`).

**Content:**

Headline: *Two channels. One platform.*

| | Direct (now) | Advisors (Q3 2026) |
|---|---|---|
| Who pays | Families | Attorneys, financial advisors, insurance brokers |
| Pricing | Starter $7 / Family $15 / Premium $25 per month `[CONFIRM]` | $10–30K / year per seat `[DRAFT]` |
| Margin | 70%+ at scale | Higher; lower CAC per household |
| Distribution | Voice of Markos engine + privacy-focused communities | Each partner = 50–500 households per seat |

Footer: *Phase 1 (now): direct. Phase 2 (Q3 2026): advisor. Both compound; we don't run them in parallel from day one.*

---

## Slide 10 · Traction

**Slide type:** **NEW — "Traction Hero"**. Off-white. One large line chart top-third, four stat tiles bottom-third, the largest tile in Vault Teal as the headline metric. 70/20/7/3 proportions throughout.

**Content:**

Headline: *Early signals, honestly.*

Hero chart (single line): `[INSERT actual growth curve — beta cohort growth, newsletter subscribers, or LinkedIn reach]`

Four stat tiles:

| Stat | Value |
|---|---|
| Beta cohort size | `[INSERT]` |
| Private by Design newsletter subscribers | `[INSERT]` |
| Voice of Markos LinkedIn reach (90d) | `[INSERT]` |
| Advisor partnership conversations underway | `[INSERT]` |

Caption: *We're not pretending to be a company we're not. These are the leading indicators we track and what's behind them.*

**Note:** if traction is genuinely thin, keep this slide and frame it as *leading indicators*. The research is unambiguous: a missing traction slide is a harder stop than an honest sparse one.

---

## Slide 11 · Competition

**Slide type:** **NEW — "Feature Comparison Table"**. Off-white. Harvey Ball ratings (the research is explicit — 2x2s with manufactured axes get caught instantly; comparison tables read as honest). Vault Teal for MyVault's row header; gray for competitors.

**Content:**

Headline: *Where MyVault sits.*

| | MyVault | Trustworthy | Lumo (Proton) | TheDrive.ai | iCloud / Google One |
|---|---|---|---|---|---|
| AI domain agents | ● | ◐ | ○ | ◐ | ○ |
| Zero Trust security | ● | ◐ | ◐ | ○ | ○ |
| Family / estate purpose-built | ● | ● | ○ | ○ | ○ |
| Advisor channel | ● | ○ | ○ | ○ | ○ |

Legend: ● full · ◐ partial · ○ none

Footer: *Axes are the four questions families and advisors actually ask before buying.*

---

## Slide 12 · Go-to-Market

**Slide type:** **NEW — "Phase Diagram"**. Off-white. Two horizontal bands; Phase 1 in Vault Teal accent, Phase 2 in gray-02 (still upcoming). Signal-go dot to mark the transition.

**Content:**

Headline: *Distribution we already own.*

**Phase 1 — Direct (running now)**
- Voice of Markos LinkedIn engine — Tier 1/2/3 workflow shipping weekly
- Private by Design newsletter — authority register, signed by Markos
- Privacy-focused communities (r/privacy, Hacker News, Privacy Guides)
- SEO content moat under construction — `[INSERT article count from SEO-and-Backlink-Strategy-v1.md]`

**Phase 2 — Advisor (Q3 2026)**
- White-label portal for RIAs, estate attorneys, IFAs
- Compliance-grade audit trails out of the box
- Per-seat licensing with 50–500 households per partner
- First partnership conversations underway — `[INSERT count]`

Footer: *Marketing isn't a line item. The thought-leadership engine ships every week.*

---

## Slide 13 · Team

**Slide type:** **NEW — "Team Grid"**. Off-white. 3-up portrait grid, name in PT Serif Regular, role and one-line founder-market-fit in Lato Regular. No advisor headshots — Lemkin's rule.

**Content:**

Headline: *Why us.*

- **Markos Symeonides** — Founder & CEO. *Built privacy-first products before privacy was a category. Lived the family-data problem firsthand.* `[CONFIRM founder-market-fit phrasing with Markos]`
- **Mark Bobyliak** — Co-founder & Creative Director. *Founder of Supermega Design. Author of MyVault's three-brand-system architecture and product voice.*
- **[Engineering / AI Lead]** — `[INSERT or omit if not yet hired]` — *Founder-market-fit line.*

Optional thin row beneath: *Advisors:* `[INSERT 1–2 named privacy or estate-planning advisors, if applicable]`

**Why this comes late:** by slide 13 the investor has accepted (or rejected) market and moat. Team is the closer on *can they execute,* not the opener on *should I keep reading.*

---

## Slide 14 · Financials

**Slide type:** **NEW — "Financials Curve"**. Off-white. One stacked area chart top-half, four stat tiles bottom-half. Vault Teal for DTC band, signal-go for B2B2C, gray-02 for burn.

**Content:**

Headline: *Path to $50M ARR.* `[CONFIRM target]`

Stacked revenue chart 2026 → 2029, two bands: DTC + B2B2C. Burn curve overlaid as a thin gray line.

Four stat tiles:

| | Value |
|---|---|
| Year 1 ARR target | `[INSERT]` |
| Year 2 ARR target | `[INSERT]` |
| Year 3 ARR target | `[INSERT]` |
| Gross margin trajectory | `[INSERT — show the AI-cost path]` |

Caption: *Gross margin improves with fine-tuning and proprietary retrieval — the AI-era moat investors look for.*

`[FLAG]` All numbers on this slide must come from the finance model. Synthesis is not safe here.

---

## Slide 15 · Ask · Use of Funds

**Slide type:** **NEW — "Ask · Use of Funds"**. Variant of Stat Block (Figma slide 06) — off-white left, Vault Teal right panel. Dollar figure as the hero stat; three use-of-funds blocks on the off-white left; milestone line along the bottom of the teal panel.

**Content:**

Headline: *We're raising **$[AMOUNT]** to do three things.* `[INSERT amount]`

Three use-of-funds blocks:

1. **Ship the remaining ten domain agents.** Engineering + AI/ML hires.
2. **Launch the advisor channel and complete SOC 2.** Compliance + GTM.
3. **Build the direct growth engine.** Marketing + content + community.

Milestone line: *This round takes us from **[current state]** to **$[target] ARR** and Series A qualification by **Q[X] 202X**.* `[INSERT all bracketed values]`

---

## Slide 16 · Closing

**Slide type:** **Section Divider · Dark** — already built (Figma slide 04 pattern). Or a tighter "Closing Statement" variant of the Logo Reveal.

**Content:**

Headline (PT Serif, very large): *Built on calm.*

Sub: *Private AI for the things that matter most. Zero Trust, always.*

Footer: *Markos Symeonides · markos@myvault.ai · myvaultai.com*

Single signal-go dot as the final mark.

---

# Slide-type registry

## Already built in Figma (file `Pm31BDHj34WjJ7NjBK4Ady`, Presentations page `74:9684`, section `76:9735`)

| # | Type | Used for |
|---|---|---|
| 01 | Title | Slide 1 (Cover) |
| 02 | Agenda | not used in this deck |
| 03 | Section Divider · Light | not used |
| 04 | Section Divider · Dark | Slide 16 (Closing) |
| 05 | Statement | Slide 5 (Solution) |
| 06 | Stat Block (70/20/7/3) | Slide 15 (Ask) — variant |
| 07 | Logo Reveal · Construction Grid | Slide 1 (Cover) and Slide 6 (Architecture) — variants |
| 08 | Comparison · Two-Column | Slide 9 (Business Model) — variant |

## New types — all built (v2)

| # | Type | Deck slide | Figma id |
|---|---|---|---|
| 09 | Thesis Block — five teal numbered cards | 2 | `99:8612` |
| 10 | Three-Panel Diagnostic — full-bleed teal, three problem rows | 3 | `99:8638` |
| 11 | Why-Now Wedge — three columns + convergence rule | 4 | `99:8656` |
| 12 | Architecture Diagram — black canvas, four-layer stack | 6 | `99:8677` |
| 13 | Product Demo — title left, device frame right | 7 | `99:8718` |
| 14 | Market Sizing Block — TAM / SAM / SOM nested | 8 | `99:8822` |
| 15 | Two-Stream Model — two-column, sub-brand footer | 9 | `99:8842` |
| 16 | Traction Hero — line chart + four stat tiles | 10 | `99:8882` |
| 17 | Feature Comparison Table — Harvey Ball ratings | 11 | `99:8915` |
| 18 | Phase Diagram — two stacked horizontal bands | 12 | `99:8961` |
| 19 | Team Grid — 3-up portraits with placeholder slot | 13 | `99:8991` |
| 20 | Financials Curve — stacked area + burn line + tiles | 14 | `99:9014` |
| 21 | Ask · Use of Funds — Stat Block variant | 15 | `99:9060` |

All thirteen new types live in Figma section `Slide Templates` (id `76:9735`) on the Presentations page (id `74:9684`). All bound to design tokens. PT Serif Regular + Lato Regular only. Signal-go accent throughout. 70/20/7/3 proportion holds.

---

# What this deck deliberately does *not* do

- No vision-as-decoration slide. The thesis carries the vision.
- No customer logo wall. We don't have one yet — pretending would destroy credibility.
- No advisors-as-team padding (Lemkin's rule).
- No 2x2 with invented axes for competition. Comparison table only (Hunter Walk's rule).
- No "zero-knowledge" anywhere. Zero Trust holds throughout (`[[Decisions/ADR-0001-Zero-Trust-not-Zero-Knowledge]]`).

---

# Send-ahead vs. live cut

| Slide | Send-ahead (16) | Live (10) |
|---|---|---|
| 1 Cover | ✓ | ✓ |
| 2 Investment Thesis | ✓ | ✓ |
| 3 Problem | ✓ | ✓ |
| 4 Why Now | ✓ | merge into Problem verbally |
| 5 Solution | ✓ | ✓ |
| 6 Zero Trust as Moat | ✓ | ✓ |
| 7 Product Demo | ✓ | ✓ |
| 8 Market | ✓ | ✓ |
| 9 Business Model | ✓ | merge into Market verbally |
| 10 Traction | ✓ | ✓ |
| 11 Competition | ✓ | drop, discuss verbally |
| 12 GTM | ✓ | drop, discuss verbally |
| 13 Team | ✓ | ✓ |
| 14 Financials | ✓ | drop, discuss verbally |
| 15 Ask | ✓ | ✓ |
| 16 Closing | ✓ | ✓ |

---

# Canonical design system (v3)

The investor deck is also the **first real test of the MyVault presentation design system**. The rules below are the canon — apply them everywhere.

## Slide canvas

- **Frame:** 1920 × 1080, fixed, **vertical auto-layout**
- **Padding:** `[20, 40, 20, 40]` (top, right, bottom, left)
- **Item-spacing:** 20
- **Children:** content rows + (optional) header labels + (optional) footer

## Header labels (text-only — no bar)

(v4 update — see Cycle 0 audit.) Every interior content slide in Section 1 carries small text-only navigational labels at the top: deck-name left + section-name right. Both Lato Regular 18pt, color per surface (`gray-02` on light, `white` on dark). **Not a bar — text only, no fill, no rule.** SPACE_BETWEEN row pattern, mirrors the footer shape.

The earlier v3 line "Top header strip — REMOVED" referred to a *decorative chrome bar*. The text-only labels do not constitute a strip; they are quiet wayfinding text. R-PRES-002 in `chunks/presentation.md` v1.1 codifies this distinction: no decorative top header bar / strip / fill / rule, but text-only labels at the top are allowed.

## Footer (chrome bottom row)

- 1840 × 24, horizontal auto-layout, `primaryAxisAlignItems: SPACE_BETWEEN`
- Left: **Logo component instance** (24 × 24) — cloned from `Pm31BDHj34WjJ7NjBK4Ady` Logo component set `1:572`. Variant flips per surface (icon-primary on light, icon-white on dark, icon-light on muted dark).
- Right: **page number** in Lato Regular 18, color per surface

Both header labels and footer are *conditional*, not mandatory. Cover, Closing, full-bleed editorial slides typically omit one or both.

## Backgrounds

- Default: `color/core/off-white`
- Dark register (Problem): `color/core/teal` full-bleed
- Dramatic dark (Architecture / future closer): `color/core/black`
- Editorial gradient (Cover / Section dividers / Ask): paint style — `gradient/warm`, `gradient/cool`, `gradient/mist`, `gradient/greydient`, `gradient/primary`

## Typography canon

(v4 update — extended from 6 tiers to 9 tiers after Cycle 0 audit added 64 / 48 / 32 pt rows; @ 0.85 / @ 0.6 opacity dropped — body and small text on dark surfaces are solid white.)

| Role | Font | Size | Line-height | Colour |
|---|---|---|---|---|
| Hero divider word + Cover hero + Hero amount + Team initials | PT Serif Regular | **144** | 110% | `color/core/teal` |
| Big slide title | PT Serif Regular | **72** | 115% | `color/core/black` (light) / `color/core/white` (dark) |
| Mid-display heading (large secondary stat — e.g., Slide 14 SAM hero) | PT Serif Regular | **64** | 115% | per role (e.g., teal for SAM-tier stats) |
| Statement / column head / phase head / mid-tier stat hero | PT Serif Regular | **56** | 115% (or 125% for column heads) | `color/core/black` |
| Mid-stat tile value (e.g., Slide 20 Year-N ARR) | PT Serif Regular | **48** | 115% | `color/core/black` |
| Card / callout heads + section sub-titles + use-of-funds heads | PT Serif Regular | **40** | 125% | `color/core/black` |
| Chart card title (above embedded chart) | PT Serif Regular | **32** | 125% | `color/core/black` |
| Body / sub-heading / row values / supporting paragraphs | Lato Regular | **28** | 140% | `color/core/black` (or `color/core/white` solid on dark) |
| Distinctive serif body (Thesis card body, Ask lead-in/round line/milestone, Team name line) | PT Serif Regular | **28** | 130% | `color/core/black` |
| Header labels + page number + phase tags + row labels + source captions + tile labels + legends + roles | Lato Regular | **18** | auto | `color/core/gray-02` (or `color/core/white` solid on dark; or `color/core/teal` *only* for chart annotations inside chart cards) |

**Hard rules:**
- **No font under 18pt anywhere.** 18 is the floor.
- **No Bold / Medium / Italic / SemiBold.** Lato Regular and PT Serif Regular only.
- **Vault Teal is a discipline, not a closed list.** Every teal instance must earn its presence. Typical earning contexts: 144-pt display words, Cover hero, Ask hero amount, Team initials, full-bleed Problem-slide background, dramatic surface blocks (e.g., SOM panel in Slide 14), 64-pt mid-display stats. Big titles stay **black**, never teal. (v4 update — earlier v3 wording named a closed list of 5 places; the discipline-not-list framing is broader and matches the v1.1 chunk.)
- **Chart-card scoped exception** to "no teal below display tier": within a chart card boundary (Traction Hero, Financials Curve), Vault Teal is allowed at 18pt for chart annotations (axis labels, year labels, legend labels, source captions). Outside the chart card, R-COLOR-009 still binds.
- **Body text on dark surfaces is solid `color/core/white`**, not opacity-reduced (v4 update — earlier v3 said `white @ 0.85`).
- **Colour bindings** must use the resolved variable value as the fallback colour (the `{r:0, g:0, b:0}` sentinel doesn't always render — use the variable's mode value instead).

## Auto-layout structure

Every slide is built with auto-layout end-to-end. No absolute positioning. Children stretch via `layoutAlign: "STRETCH"`, fill via `layoutGrow: 1`, with explicit FIXED sizes only where the column system demands it.

## Column system

- **3-col body grid:** 587 × N, gap 40, total 1840 wide
- **2-col body grid:** 900 × N, gap 40, total 1840 wide
- **Cards:** padding `[40, 40, 40, 40]`, item-spacing `22`

## Pastel gradient cards

When a slide needs visual texture, use the brand gradient paint styles (cool / warm / mist) rather than solid teal blocks. They're the editorial register of the deck.

# Slide registry — what's built where

Section: **`Section 1`** (id `97:8611`), nested inside **`Title slides`** (id `97:7729`), on **Presentations** page (id `74:9684`). Mark's draft frames sit in rows 1–3 (Title-9 through Title-20). The 13 finished slide-type prototypes live below them in rows starting at y=3700.

| # | Slide name | Figma id | Deck role |
|---|---|---|---|
| 09 | Slide 09 / Thesis Block | `99:8612` | Slide 2 — Thesis (5 staircase pastel cards, PT Serif body) |
| 10 | Slide 10 / Three-Panel Diagnostic | `99:8638` | Slide 3 — Problem (Vault Teal full-bleed) |
| 11 | Slide 11 / Why-Now Wedge | `99:8656` | Slide 4 — Why Now (3 pastel cards) |
| 12 | Slide 12 / Architecture Diagram | `99:8677` | Slide 6 — Zero Trust (black canvas, 4-layer stack) |
| 13 | Slide 13 / Product Demo | `99:8718` | Slide 7 — Product (title left, device right) |
| 14 | Slide 14 / Market Sizing | `99:8822` | Slide 8 — Market (TAM/SAM/SOM nested) |
| 15 | Slide 15 / Two-Stream Model | `99:8842` | Slide 9 — Business Model (Direct / Advisors gradient cards) |
| 16 | Slide 16 / Traction Hero | `99:8882` | Slide 10 — Traction (chart card + 4 stat tiles) |
| 17 | Slide 17 / Feature Comparison | `99:8915` | Slide 11 — Competition (Harvey Ball table) |
| 18 | Slide 18 / Phase Diagram | `99:8961` | Slide 12 — GTM (two phase bands) |
| 19 | Slide 19 / Team Grid | `99:8991` | Slide 13 — Team (3-up portraits) |
| 20 | Slide 20 / Financials Curve | `99:9014` | Slide 14 — Financials (chart card + ARR tiles) |
| 21 | Slide 21 / Ask · Use of Funds | `99:9060` | Slide 15 — Ask (hero amount + uses) |

Mark's draft frames (Title-9 through Title-20) reference: Cover (Title-9), Thesis (Title-10), Problem (Title-13), Why Now (Title-14), Solution (Title-15), Solution divider (Title-16), Product divider (Title-17), Product Demo (Title-18), Market divider (Title-19), Market chart (Title-20). Use them as ground truth for visual decisions.

# Changelog

| Date | Version | Change | By |
|---|---|---|---|
| 2026-04-28 | v1 | First pass. Hoffman thesis-first arc, 16 slides, 8 reused types + 11 new types defined. All vault-thin numbers flagged. | Mark + Claude |
| 2026-04-28 | v2 | All 13 new slide-type prototypes built in Figma. Slide Templates section expanded to fit. Figma ids registered against each type. | Mark + Claude |
| 2026-04-28 | v3 | Slides moved into Section 1 (97:8611) alongside Mark's drafts. All slide-types rebuilt with auto-layout end-to-end. Typography canon corrected (titles black not teal, body 28pt not mixed). Header strip removed. Min font size enforced at 18pt. Page number bumped to 18pt. Canonical design system documented. | Mark + Claude |
| 2026-04-30 | v4 | **Cycle 0 audit reconciliation.** Reconciled this fixture against the actual Section 1 prototypes via `figma_execute`. Header chrome reframed: text-only deck-name + section-name labels are allowed (no decorative bar) — the v3 "Top header strip — REMOVED" line referred to a chrome bar, not the small wayfinding text labels every prototype carries. Vault Teal reservation broadened from a closed list of 5 places to a discipline (every instance must earn presence; chart-card 18pt annotations carved out as scoped exception). Body color on dark surfaces is solid white (was @ 0.85). Typography ladder extended from 6 to 9 tiers (added 64 / 48 / 32 pt rows). Canonical design system pointer updated — `chunks/presentation.md` v1.1 is now the authoritative source; this fixture mirrors it. | Mark + Claude |
