---
type: review
status: active
owner: mark + claude
created: 2026-04-30
tags: [visual-system, ebook, comparison, three-way]
summary: "Per-page deltas: v2 render vs Figma reference. Updated each iteration cycle."
---

# Three-way comparison — v2 cycle 4 vs Figma reference

## p01 Cover — close

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Lockup | white, top-left | white, top-left ✓ | — |
| Title | "A considered approach to private data" PT Serif 64pt @ 115% white CENTER (wraps to 2 lines) | same ✓ | — |
| Subtitle | Lato 20pt @ 140% off-white-ish LEFT 540 wide | Lato 20pt off-white LEFT ✓ | — |
| Top section bg | Dark photo + gradient | Dark gradient (no photo) | placeholder is OK for test |
| Bottom section | Lily photo 720×540 | Dark gradient placeholder | needs real image asset (deferred) |

**Verdict:** structurally correct, image placeholder is the only delta.

## p02 Title Page — **BROKEN: blank page**

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Surface | off-white | off-white but content not rendering | **page is blank** |

**Root cause:** Cover overflow consuming the title page's content slot, OR `set page` from cover-t1 carrying over and content being sent to wrong page.

## p03 Copyright — close, but header bleed

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Surface | off-white | off-white ✓ | — |
| Top imprint | Book title + author + © line, all Lato 16pt centered | ✓ | — |
| Bottom imprint | Disclaimer + publisher + ISBN, Lato 12pt centered | ✓ | — |
| Footer page number | "4" | "4" ✓ | page count is off-by-one |
| **Running header "Private by Design" at top** | NOT in Figma (navigational pages have no header) | **showing in v2** ❌ | **remove header from copyright** |

## p04 TOC — close, but header bleed

| Element | Figma | v2 | Delta |
|---|---|---|---|
| "Contents" header | PT Serif 56pt @ 115% gray-01 LEFT | ✓ | — |
| Numbers | Lato 20pt @ 140% gray-01 | ✓ | — |
| Titles | PT Serif 20pt @ 130% black | ✓ | — |
| Page numbers | Lato 20pt @ 140% gray-02 RIGHT | ✓ | — |
| Row spacing | 48pt centerline | ✓ approximately | — |
| Signal-go rule | NOT present | NOT present ✓ | — |
| **Running header bleeding** | NOT present | **"Private by Design" overlaps "Contents"** ❌ | **remove header** |

## p05 Section Opener — close, but header bleed

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Chapter marker | "Chapter three" Lato 14pt CENTER gray-02 at top (page header slot) | "Chapter three" rendered in body, AND "Private by Design" in header | ❌ chapter marker should be in page header slot, not body; "Private by Design" should be off |
| Title | PT Serif 72pt @ 115% black CENTER, ~30% from top | PT Serif 72pt centered black ✓ | vertical position close |
| Intro | Lato 18pt @ 155% black CENTER 580 wide | ✓ | — |

## p06 Body — very close

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Running header "Private by Design" | Lato 16pt @ 150% gray-02 top-left | ✓ | — |
| Subhead | PT Serif 28pt @ 120% black LEFT | ✓ | — |
| Body paragraphs | Lato 18pt @ 155% black, 720 wide | ✓ | — |
| Footer | Icon-primary + page number Lato 16pt gray-02 RIGHT | ✓ | — |

**Verdict:** matches Figma reference 72:9166 closely. ✓

## p07 Pull Quote — very close

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Surface | off-white | off-white ✓ | — |
| Mark | PT Serif 120pt @ 100% TEAL LEFT 57pt wide | ✓ | — |
| Text | PT Serif 36pt @ 135% TEAL LEFT 643 wide | ✓ | — |
| Side-by-side | mark left, text right with gap | ✓ | — |

**Verdict:** matches Figma reference 72:9232 closely. ✓

## p08 Stat-1 (single hero "168") — very close

| Element | Figma (no canonical) | v2 | Delta |
|---|---|---|---|
| Stat | PT Serif 220pt teal CENTER | ✓ | — |
| Headline | PT Serif 32pt black CENTER | ✓ | — |
| Paragraph | Lato 18pt gray-02 CENTER 540 wide | ✓ | — |
| Source | Lato 12pt gray-02 CENTER added | ✓ | — |

## p09 Stat-page-3 teal mirror — **BROKEN: surface not applied**

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Surface | Vault Teal #094545 | **white** ❌ | **set page(fill) not applying** |
| Stat numbers | PT Serif 120pt off-white | off-white but visible only because text is barely-readable on white | Surface bug propagates |
| All else | structurally correct | invisible because of surface bug | — |

**Root cause:** same as p02 — `set page` settings not propagating correctly across function boundaries.

## p10 Lists Page — close, but header bleed

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Header "Three ways to list" | PT Serif 40pt @ 125% black LEFT 640 wide | ✓ | — |
| 2-col grid 350/20/350 | ✓ | ✓ | — |
| Bulleted (left top) | Section label + 8×8 ellipse + Lato 18pt | ✓ | — |
| Numbered (left middle) | Section label + "1." signal-go + Lato 18pt | ✓ | — |
| Checklist (right bottom) | Section label + 16×16 rounded sq + Lato 18pt | ✓ | — |
| **Running header** | not in Figma | **showing** ❌ | **remove** |

## p11 Conclusion — not yet looked at

(needs review)

## p12 Back Cover — very close

| Element | Figma | v2 | Delta |
|---|---|---|---|
| Surface | Vault Teal | ✓ | — |
| Lockup-Light center top section | ✓ | ✓ | — |
| Closing message Lato 18pt off-white center | ✓ | ✓ | — |
| URL Lato 18pt white center | ✓ | ✓ | — |
| Copyright Lato 12pt gray-01 center bottom | ✓ | ✓ | — |
| No footer | ✓ | ✓ | — |

**Verdict:** matches Figma reference 72:9239 closely. ✓

## Cycle 5 fixes needed

### Critical (blockers)

1. **`set page` propagation** — fix root cause: refactor each page function to use Typst's `page(...)` element wrapper so each page has explicit, isolated properties. This fixes both "title page is blank" and "stat-page-3 surface not teal".

2. **Header bleed across navigational pages** — remove default header from `ebook-doc`. Each page function explicitly sets its own header (none for navigational, "running-header" text for body, "chapter" text for section-opener).

### Polish (after cycle 5)

3. **Section Opener chapter as header** — chapter marker should be in the page header slot (Lato 14pt center), not in body content
4. **Image placeholder for cover** — eventually wire up a real lily/abstract image
5. **Page count off-by-one** — phantom page somewhere
