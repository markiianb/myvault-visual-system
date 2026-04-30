# Cycle 2 review — real-content render

**Source:** `output.pdf` rendered from `spec.typ` v1.0 (real content).

## What works

| Page | Layout | Notes |
|---|---|---|
| p01 | Cover (T1) | Lockup top-left ✓; gradient placeholder ✓ |
| p03 | Title Page | "The Architecture of Trust" 56pt centered ✓; signal-go rule ✓ |
| p04 | Copyright | Off-white centered ✓ |
| p05 | TOC | "Contents" 40pt left + signal-go rule + numbered rows ✓ |
| p06, p11, p15 | Section Openers | Two-line wrap centered, 72pt PT Serif ✓ |
| p08 | Pull Quote | Curly quote 120pt + 40pt PT Serif quote ✓ |
| p09 | Stat V1 (168) | Big teal hero number + supporting headline + paragraph ✓ |
| p10 | 2-col Body | "What changes" / "What stays" — works ✓ |
| p12 | Stat V3 mirror | 76% / 48% on Vault Teal, Icon-WHITE footer flip ✓ |
| p14 | Callouts | 3 cards with teal / signal-go / signal-stop accent borders ✓ |
| p16 | Lists | Five principles, signal-go bullet markers ✓ |
| p18 | Endnotes | "Notes" header + signal-go numbers ✓ |
| p19 | Back Cover | Black surface, white text, no footer ✓ |

## Issues found (iteration 2 fixes)

### High priority

1. **Phantom page 2** — Empty page between cover and title page, carrying cover's gradient as bleed. Caused by `pagebreak(weak: true)` at end of cover-t1 plus `set page(...)` at start of title-page creating an extra page. **Fix:** remove the trailing pagebreak from cover-t1; let next function's set page create the natural break.

2. **Superscript references render as literal text** — `#super[2]`, `#super[3]`, `#super[4]` appear in body text instead of as small superscript numerals. Caused by passing string literals (`"..."`) instead of content blocks (`[...]`) to the template functions. **Fix:** change supporting-paragraph and stat-copy fields from `"..."` to `[...]` so Typst processes the markup.

3. **Cover title wraps awkwardly** — "The Architecture of Trust" at 64pt wraps to "The Architecture of / Trust" with widow "Trust" alone on second line. **Fix:** reduce default cover title size from 64pt to 56pt (matches Title Page consistency); makes title fit on one line.

### Medium priority

4. **TOC entries hardcoded** — page numbers 5/10/14/17 will be correct once phantom page is removed (currently sections start at 6/11/15/18).

5. **2-col running header verification** — Couldn't see "The Architecture of Trust" running header at top of p10. Either rendered too small to detect at this resolution or not rendering at all. Verify after iteration 2.

### Acceptable / not fixing

- **Body whitespace** — body pages have variable content lengths; trailing whitespace is normal for editorial books and matches the Figma example at `72:9166`.
- **Lists bullet size** — signal-go markers are small but proportionate to 16pt body text.

## Chunk-level findings

These are observations for the chunk doc itself, not template fixes:

- The chunk's BASE typography table doesn't enumerate **cover title size** as a default. Adding "Cover title — PT Serif 56pt typical" would help future Typst/spec authors.
- R-EBOOK-002's footer spec works cleanly across light + dark surfaces. The variant-flip mechanism is well-defined.
- R-EBOOK-001's 2-col grid (300 / 40 / 300) holds up well in real use; column gutter feels right.
- The chunk doesn't specify what happens when body content is shorter than a page — i.e. whether trailing whitespace is acceptable. Editorial answer is yes; might be worth a one-line note in BASE.

## Cycle 2 → Cycle 3

Apply iteration 2 fixes (1, 2, 3 above), re-render, review. If clean, declare the test complete and present to Mark.
