---
type: audit
status: active
owner: mark + claude
created: 2026-04-30
tags: [visual-system, ebook, figma-audit, source-of-truth]
summary: "Exact values pulled from Figma `eBooks & Documents` page (70:8798) via figma_execute. The Figma is the visual canon — when chunk doc and Figma disagree, Figma wins until the chunk is updated to match. Each row records: Figma node ID, exact value as measured, what the chunk doc says, what the v1.1 template did, and the delta to fix."
---

# Figma audit baseline — eBooks & Documents page (70:8798)

All values **measured directly from Figma** via `figma_execute` against the live `Pm31BDHj34WjJ7NjBK4Ady` file. This is the audit baseline for v2 of `myvault-ebook.typ`.

## Page geometry — applies to every interior page

| Property | **Figma (truth)** | Chunk doc says | v1 template did | Fix in v2 |
|---|---|---|---|---|
| Page size | 800 × 1200 | 800 × 1200 ✓ | 800 × 1200 ✓ | — |
| Outer padding | **40 / 40 / 40 / 40** | 40 / 80 / 40 / 80 ❌ | 40 / 80 / 40 / 80 ❌ | **change to 40 all sides** |
| Content area | **720 × 1120** | 640 × 1120 ❌ | 640 × 1120 ❌ | **change to 720 wide** |
| Header strip (running header) | y=40, w=720, h=24 | "outer-top" (vague) | rendered as first body element ❌ | **use page header slot at y=40** |
| Footer strip | y=1136, w=720, h=24 | y≈1142 | Typst default footer area | **pin footer at y=1136 explicitly** |
| Footer Icon size | 24 × 24 (lockup variant) | "≈24px" ✓ | 24pt ✓ | — |
| 2-column grid (Stat) | 340 + 40 + 340 | 300 + 40 + 300 ❌ | 300 + 40 + 300 ❌ | **change to 340/40/340** |
| 2-column grid (Lists) | 350 + 20 + 350 | not specified | n/a | **add 350/20/350 for Lists** |
| 2-column grid (Conclusion) | 340 + 40 + 340 | n/a | n/a | new layout |

## Cover Treatment 1 — node 70:8800

| Element | **Figma value** | Chunk doc says | v1 template did | Fix in v2 |
|---|---|---|---|---|
| Top section | (40, 40), 720 × 540 | top 540pt section | 100% × 520pt ❌ | **720 × 540 at (40, 40)** |
| Bottom section (image) | (40, 620), 720 × 540 | bottom 720×540 image | 720 × 520pt asymmetric ❌ | **720 × 540 at (40, 620)** |
| Lockup | (40, 40) inside top, 171 × 48 | "top-left, 171×48 (was)" | 171pt wide ✓ | keep 171×48 |
| Title text | PT Serif Regular **64pt @ 115% LH**, CENTER, **WHITE** | "display/m–l, sized to fit" | 56pt left-aligned, black ❌ | **PT Serif 64pt @ 115% center white** (yes white — confirmed via variable binding to color.core.white) |
| Subtitle | Lato Regular **20pt @ 140% LH**, **LEFT**, BLACK, 540 wide | Lato 20pt 140%, ~540–680 width | 20pt left, no LH ❌ | **Lato 20pt @ 140% left, 540 wide** |

## Body Spread — node 72:9166

| Element | **Figma value** | Chunk doc says | v1 template did | Fix in v2 |
|---|---|---|---|---|
| Running header | Lato Regular **16pt @ 150% LH**, gray-02 | Lato 12pt gray-02 | Lato 12pt ❌ | **Lato 16pt @ 150% gray-02 (in page header slot)** |
| Body header (subhead) | PT Serif Regular **28pt @ 120% LH**, BLACK, LEFT | "Body header" 40pt, "Subhead" 28pt @ 130% | level-1 = 40pt @ 125% ❌ | **PT Serif 28pt @ 120% for body section heads** |
| Body paragraph | Lato Regular **18pt @ 155% LH**, BLACK | Lato 16pt @ 150% | Lato 16pt @ default ❌ | **Lato 18pt @ 155%** |
| Footer page number | Lato Regular **16pt @ 150%**, gray-02, RIGHT | Lato 12pt gray-02 | Lato 12pt ❌ | **Lato 16pt @ 150% gray-02 right** |

## Section Opener — node 72:9225

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Chapter marker | Lato Regular **14pt @ 150% LH**, gray-02, **CENTER**, 640 wide | Lato 14pt gray-02 ✓ | Lato 14pt ✓ | width 640 not 720 |
| Section title | PT Serif Regular **72pt @ 115% LH**, BLACK, CENTER, 720 wide | PT Serif 72pt @ 115% center black ✓ | 72pt no LH ❌ | **explicit 115% LH** |
| Intro paragraph | Lato Regular **18pt @ 155% LH**, BLACK, CENTER, 580 wide | Lato 18pt @ 140% centered | 18pt no LH, 540 wide ❌ | **18pt @ 155% center, 580 wide** |
| Title vertical position | y=302.5 inside 995pt frame (top ~30%) | "centered" | v(1fr) above and below | match Figma vertical balance |

## Pull Quote A — node 72:9232

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Quote mark | PT Serif Regular **120pt @ 100% LH**, **TEAL** (#094545), LEFT — 57pt wide | PT Serif 120pt black | 120pt black ❌ (mark color) AND stacked above text ❌ | **120pt teal, 57pt wide column, side-by-side** |
| Quote text | PT Serif Regular **36pt @ 135% LH**, **TEAL**, LEFT — 643 wide | PT Serif 40pt @ 125% **black** (chunk v1.1 says no teal) | 40pt black stacked below mark ❌ | **PT Serif 36pt @ 135% teal, side-by-side after mark** |
| Block position | (40, 470) inside 1056 frame — vertically centered | "≥80px breathing above and below" | v(1fr) ✓ | match (40, 430+) position |

> **Note:** Figma still uses TEAL for pull quotes. Chunk v1.1 BASE update specified BLACK. **Figma is the visual canon — go with TEAL** until you ratify the chunk update. Flag this discrepancy.

## Stat Page V3 (dual on Vault Teal) — node 89:6938

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Surface | color.core.teal #094545 | Vault Teal ✓ | teal ✓ | — |
| Stat number ("3×", "10×") | PT Serif Regular **120pt @ 100% LH**, **OFF-WHITE** #FBFAF5, CENTER | PT Serif ≥96pt WHITE | 120pt white ⚠ | **change to off-white** (warmer than pure white) |
| Stat label | PT Serif Regular **32pt @ 120% LH**, OFF-WHITE, CENTER, 340 wide | PT Serif ~32pt | 28pt ❌ | **32pt @ 120%** |
| Body intro | Lato Regular **18pt @ 155% LH**, WHITE (#FFFFFF), LEFT, 340 wide | Lato 14–16pt | Lato 16pt ❌ | **Lato 18pt @ 155% white** |
| Top block | (40, 40), 720 × 508 | "centered around upper third" | v(80pt) start ⚠ | **720×508 at (40, 40)** |
| Bottom block | (40, 588), 720 × 508 | "centered around lower third" | v(1fr) gap ⚠ | **720×508 at (40, 588)**, 80pt gap |
| Stat block size | 340 × 216 (number + label) | n/a | varies ❌ | **340 × 216 fixed** |
| Stat-LEFT vs copy-RIGHT (top) | stat at col-1, copy at col-2 ✓ | mirrored ✓ | ✓ | — |
| Bottom mirrored | copy col-1, stat col-2 ✓ | ✓ | ✓ | — |

## Lists Page — node 89:7142

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Layout | **2-column** (350 + 20 + 350) | "three list blocks stacked" ❌ | single bulleted column ❌ | **2-column 350/20/350** |
| Header | PT Serif Regular **40pt @ 125% LH**, BLACK, LEFT — 640 wide | PT Serif 40pt LEFT ✓ | 40pt left ✓ | width 640 |
| Section labels (Bulleted/Numbered/Checklist) | Lato Regular **14pt @ 150%**, gray-02, LEFT | "12pt gray-02 small label" | none ❌ | **add 14pt gray-02 labels** |
| Bullet | **8 × 8 ellipse**, signal-go #69DE49 | "6×6 ellipse" | circle radius 4pt ⚠ | **8×8 ellipse signal-go** |
| Bulleted item text | Lato Regular **18pt @ 155% LH**, BLACK | not pinned | 16pt ❌ | **Lato 18pt @ 155%** |
| Numbered "1." | Lato Regular **18pt @ 155%**, signal-go #69DE49 | "Lato 16pt signal-go" | n/a ❌ | **Lato 18pt signal-go** |
| Numbered item text | Lato Regular **18pt @ 155%**, BLACK | not pinned | n/a ❌ | **Lato 18pt @ 155% black** |
| Checklist square | **16 × 16 rounded rect**, signal-go fill | "16×16 signal-go square radius/xs" ✓ | n/a ❌ | **16×16 signal-go rounded rect** |
| Layout placement | Bulleted top-left + Numbered middle-left + Checklist bottom-right | three stacked | single bulleted ❌ | match Figma |

## Table of Contents — node 72:9300

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| "Contents" header | PT Serif Regular **56pt @ 115% LH**, **GRAY-01** (#DDDCD6 — light!), LEFT, 720 wide | PT Serif 40pt LEFT ❌ | 40pt black ❌ | **PT Serif 56pt @ 115% gray-01 left** |
| Signal-go rule | **NOT PRESENT in Figma** | "signal-go 60×2 rule below" | included ❌ | **remove the signal-go rule** |
| Row number ("01") | Lato Regular **20pt @ 140% LH**, **GRAY-01**, LEFT, 40 wide | Lato 14pt gray-02 ❌ | Lato 14pt ❌ | **Lato 20pt @ 140% gray-01** |
| Row title | **PT Serif Regular** 20pt @ 130% LH, BLACK, LEFT — 460 wide | "Lato 20pt for title" ❌ | Lato 20pt ❌ | **PT Serif Regular 20pt @ 130%** |
| Row page number | Lato Regular **20pt @ 140%**, gray-02, RIGHT, 60 wide | Lato 14pt gray-02 ❌ | Lato 14pt ❌ | **Lato 20pt @ 140% gray-02** |
| Row spacing | 48pt between rows (28pt row + 20pt gap) | "gap 16" | v(16pt) ⚠ | **20pt gap = ~48pt centerline** |

## Conclusion — node 89:7062

This is **completely different** from what the chunk MENU describes.

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Surface | **Vault Teal #094545** | white | white ❌ | **Vault Teal surface** |
| Layout | **2-column** (340 / 40 / 340) — content in **right column only** | single column | single col ❌ | **2-col, content right** |
| Title | PT Serif Regular **56pt @ 115% LH**, OFF-WHITE, LEFT, 340 wide | PT Serif 40pt LEFT | 40pt black ❌ | **56pt @ 115% off-white** |
| Body | Lato Regular **18pt @ 155% LH**, OFF-WHITE | "body paragraphs" | Lato 16pt black ❌ | **Lato 18pt @ 155% off-white** |
| Sign rule | **horizontal line** below body | not in chunk | n/a ❌ | **add 1pt horizontal line, gray-02** |
| Sign name | Lato Regular **14pt @ 150%**, OFF-WHITE | not in chunk | n/a ❌ | **add Lato 14pt off-white** |
| Sign role | Lato Regular **14pt @ 150%**, OFF-WHITE (gray-tinted) | not in chunk | n/a ❌ | **add Lato 14pt off-white-muted** |

Conclusion is on a dramatic-register surface (teal) and uses the off-white text + light-icon footer per the surface-flip rules.

## Back Cover — node 72:9239

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Surface | color.core.teal #094545 (NOT black!) | "black surface" ❌ | black ❌ | **change to Vault Teal** |
| Outer padding | **80 / 80 / 40 / 80** (l/r are 80, not 40) | not specified | 40 all sides | **80pt left/right** |
| Brand Lockup | Center top section, **148 × 40** | not in chunk | none ❌ | **add Lockup-Light 148×40 centered** |
| Closing message | Lato Regular **18pt @ 140% LH**, OFF-WHITE, CENTER, 540 wide | "centered closing message in white" | PT Serif 40pt white ❌ | **Lato 18pt @ 140% off-white** |
| URL | Lato Regular **18pt @ 155%**, WHITE, CENTER, 640 wide | not in chunk | none ❌ | **add Lato 18pt white "myvaultai.com"** |
| Copyright tagline | Lato Regular **12pt @ 150%**, GRAY-01, CENTER, 720 wide | "© / legal at bottom" | Lato 12pt gray-02 ⚠ | **Lato 12pt gray-01** |

## Copyright — node 72:9289

| Element | **Figma value** | Chunk says | v1 did | Fix in v2 |
|---|---|---|---|---|
| Surface | off-white | off-white ✓ | off-white ✓ | — |
| Tagline (book title) | Lato Regular **16pt @ 150% LH**, BLACK, CENTER, 720 wide | "title block" | "Copyright" centered ❌ | **Lato 16pt black center** |
| Author name | Lato Regular **16pt @ 150%**, GRAY-02, CENTER | not in chunk | none ❌ | **add Lato 16pt gray-02** |
| Copyright line | Lato Regular **16pt @ 150%**, GRAY-02, CENTER | "12-14pt gray-02" | 12pt ❌ | **Lato 16pt gray-02** |
| Disclaimer | Lato Regular **12pt @ 150%**, GRAY-02, CENTER, 600 wide | "legal text" | none ❌ | **add Lato 12pt gray-02 disclaimer** |
| Publisher line | Lato Regular **12pt @ 150%**, GRAY-02, CENTER | not in chunk | none ❌ | **add publisher line** |
| Imprint position | Top imprint at (40, 40) 720×640; bottom imprint at (40, 700) 720×416 | not specified | centered v(1fr) ❌ | **two imprint blocks at fixed positions** |

## Foundation rule corrections needed in `chunks/ebook.md` v1.2

These are not template fixes — they are chunk doc fixes. After v2 template ships, the chunk needs to update:

1. **R-EBOOK-001 page geometry:** padding is **40/40/40/40**, content is **720×1120**, NOT 40/80/40/80 with 640.
2. **R-EBOOK-001 2-col grid:** asset-type-specific (Stat 340/40/340; Lists 350/20/350; Conclusion 340/40/340), NOT a single 300/40/300.
3. **R-EBOOK-002 footer typography:** page number is **Lato 16pt** not 12pt; running header is **Lato 16pt** not 12pt.
4. **BASE typography "Body paragraph":** Figma uses **Lato 18pt @ 155%** not 16pt @ 150%.
5. **BASE typography "Body header":** what Figma actually uses in body context is **PT Serif 28pt @ 120%** (closer to "Subhead" than "Body header"). Either Figma is missing the 40pt h1 case, or "Body header" should be reclassified.
6. **MENU pull-quote:** Figma still uses **teal** for both mark and text. Chunk v1.1 said black. **Figma is canonical** — chunk should revert.
7. **MENU stat-page-3 stat number color:** off-white (#FBFAF5) not pure white.
8. **MENU lists-page composition:** **2-column** (Bulleted+Numbered left-stack, Checklist bottom-right), NOT three-block stacked vertically.
9. **MENU TOC composition:** Header is **PT Serif 56pt gray-01** (not 40pt black). NO signal-go rule below. Row title is **PT Serif 20pt** (not Lato).
10. **MENU conclusion:** It's a **2-column on Vault Teal** with Sign rule + Sign name + Sign role at the bottom of the right column. The chunk's "PT Serif 40pt header LEFT, body paragraphs" is wrong.
11. **MENU back-cover:** Surface is **Vault Teal**, not black. Has Brand Lockup centered in top section. Has URL line. Padding is 80pt left/right.

## What the v2 template needs to do differently

1. **Use the page header slot** for running headers (not flowing in body content)
2. **Pin footer** at y=1136 with explicit horizontal flex layout (Icon left, page-number right)
3. **Per-text leading** — every `text(...)` call sets explicit `leading` to match the Figma %
4. **Padding 40 all sides** as the universal page setup; back cover overrides to 80 left/right
5. **2-column grids** vary per asset type (340/40/340 for stat/conclusion; 350/20/350 for lists)
6. **Conclusion is a teal-surface 2-column with sign-off** — completely new function
7. **TOC composition** — gray-01 header at 56pt, no signal-go rule, PT Serif row titles
8. **Pull quote** — teal mark + teal text side-by-side (mark left, text right with 20pt gap)
9. **Cover title white**, not black
10. **Lists page is 2-column** with three list types in their actual Figma positions

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-30 | Initial. Built from figma_execute extraction of all key reference text nodes. 11 layouts measured, ~50 cells with deltas. | Mark + Claude |
