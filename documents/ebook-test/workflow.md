---
type: workflow
status: active
owner: mark + claude
created: 2026-04-30
updated: 2026-04-30 (editorial-first / primitives-not-templates rethink)
tags: [visual-system, editorial, workflow, lessons-learned, rule-based]
summary: "How to build editorial documents in the MyVault visual system. The system is a rule-based COMPOSITION engine, not a template stamp. Brand provides loose typography/color/spacing rules + flowing primitives. Each document decides what it needs — no mandatory pages, no required chrome on every page, no fixed front matter. Whitespace is a deliberate choice, not a side effect of templates."
---

# Editorial document workflow

## The principle (read this first)

**The brand provides RULES + PRIMITIVES. The document provides INTENT. The system COMPOSES.**

The renderer does not stamp page templates. It accepts content + intent ("this is a chapter break," "this stat earns its own page," "this paragraph flows") and lays it out using brand-correct primitives.

What the brand actually constrains:
- Typography: PT Serif + Lato Regular only (no bold, no italic, no other families)
- Color: Vault Teal as hero color; signal colors for status only; gray scale for body; white default surface; off-white alternate; dark surfaces for drama
- WCAG AA contrast on all text
- Logo placement: variant per surface, foundation rules (clear space, min size)
- Alignment: consistent within a page; never mix center-header with left-text
- Banned: bold weight, italic, eyebrow caps, gradient under body text, signal colors as decoration

What the brand does NOT mandate:
- Which pages must exist in a document (cover, title page, copyright, TOC are PATTERNS, not requirements)
- Whether every page has a footer + page number (chrome is conditional — covers usually don't, body pages usually do, special spreads can opt out)
- Padding values per page (40pt is a sensible default; reference content can use tighter; full-bleed moments can use less)
- Body font size as a single value (16-18pt @ 145-155% LH is the editorial range)
- Section openers as separate pages (they're usually inline body transitions, not blank pages)

## The mental model

OLD (template stamp):
- Author calls `body-page(...)` → one page emitted with template's mandatory shape
- 12 page-type functions; each produces a page; each page has the function's predetermined chrome + padding + structure
- Pages run short → empty whitespace at the bottom (not a choice; a side effect)
- Section opener function → blank page with title at vertical mid-point (always)

NEW (composable primitives):
- Author writes content + intent
- System flows content into pages, breaking when columns fill
- Special moments (full-page stat, full-page pull quote, dramatic chapter break) are explicit instructions
- Whitespace happens because the author asks for it (a quiet spread, generous breath around a quote), not because a template ran short on content

## The primitives (myvault-editorial.typ)

The new module exposes editorial primitives, NOT page templates:

| Primitive | What it does | When to use |
|---|---|---|
| `cover(...)` | Branded cover page. The ONLY ceremonial page that's nearly always present. | Every branded document |
| `back-cover(...)` | Closing page with optional imprint footer (no separate copyright page) | Most documents |
| `flow(running-header: ...)[ ... body ... ]` | Continuous content stream. Auto-paginates. Header/footer chrome enabled by default. | The main body of any document |
| `chapter(title, subtitle: none)` | Inline chapter break inside `flow`. Big PT Serif heading; first paragraph follows immediately. NO automatic pagebreak to its own page. | Major section transitions |
| `subhead(text)` | PT Serif 28pt block-level head. Flows with surrounding body. | Sub-section breaks |
| `stat-inline(number, label)` | Hero number that lives inside the body column | When the stat punctuates a paragraph but doesn't earn a full page |
| `stat-page(number, label, paragraph, source)` | Standalone stat page (existing behavior) | When the stat is a moment of pause |
| `dropquote(text)` | Inline larger-format quote within the body column | Editorial emphasis without breaking the page |
| `pull-page(quote)` | Standalone off-white page with the quote, side-by-side mark + text | When the quote earns the breath |
| `data-grid(rows: ...)`, `compare-cols(items: ...)`, `audit-block(steps: ...)` | Semantic content blocks that flow inline; size to their content; don't force pagebreaks unless the block is bigger than the remaining column | Tables, comparisons, structured lists |
| `divider(style: "rule" | "space")` | Deliberate visual break (rule line or generous gap) | Intentional pacing |
| `toc(entries: ...)` | TOC pattern; flows in `flow` (not necessarily on its own page) | When the document needs navigation |

Imprint info (copyright, ISBN, publisher, edition) goes into `back-cover(imprint: ...)` or a small block inside `flow` — NOT a standalone page unless the document explicitly needs one (rare).

## Rules (Mark's principles, captured)

These apply universally:

1. **Editorial design is content-first.** The document brief defines what the document needs to communicate. The brand provides the typography + color + spacing language. The system renders. Don't reverse the order: don't impose a page structure first and then squeeze content into it.

2. **No mandatory pages.** Cover is usually present. TOC, copyright, title page, section openers, back cover — all OPTIONAL. Each document decides.

3. **Chrome is conditional.** Covers usually have no header/footer. Body pages get footer + page number. Pull-quote pages can opt out. Long flowing chapters can have a running header. The "every page has the same chrome" rule produces empty pages and visual monotony.

4. **Whitespace is a CHOICE.** Generous breath around a pull quote = intentional pause. 800pt of empty space below a 3-paragraph body page = template waste. Earn whitespace with intent.

5. **Section openers default to inline, not standalone.** A big PT Serif chapter heading at the top of a body page (followed by the first paragraph) is the right transition for most documents. Standalone chapter pages are reserved for formal book-format publications.

6. **Padding adapts to content.** 40pt all-sides is a sensible default. Tighter (24pt top) for reference tables. Generous (120pt top) for pull quotes. Document the choice; don't make it dogmatic.

7. **Density adapts to content.** A reference guide can use 16pt body @ 145% to pack more content per page. A formal essay can use 18pt @ 155% for more breath. Pick what serves the reader; don't impose a single number.

8. **Alignment is consistent within a page.** Centered title + left-aligned body looks broken. If both centered, spread the body to fill the line. If both left, anchor everything to x=padding.

9. **Imprint is a colophon, not a page.** Copyright, ISBN, publisher, edition belong in a small footer band on the back cover or as a single line at the end of the TOC. Not a standalone "Copyright" page that repeats the title.

10. **Trust the body to fill itself.** Don't force `v(1fr)` above and below body content to "center" it on the page. The body content takes its natural height; the page ends when content ends or the column fills.

## Three load-bearing rules for building the renderer

### Rule 1 — Measure before you build (still applies)

Before any new primitive: pull from Figma if it exists, run `figma_execute` to extract exact text styles, save measurements to `figma-reference.md` with deltas vs. existing patterns. **But treat the Figma example as ONE valid application of the rules, not as the rules themselves.** When the document needs a different application (e.g., a privacy guide vs. a formal book), invent a new layout that follows the rules without copying the example.

### Rule 2 — Read tokens, don't hardcode

Every value the template uses comes from `tokens.typ`. If a value isn't in tokens, extend `build-tokens.sh`. Tokens cover: colors, typography (family + size + line-height), radius, space, gradients.

### Rule 3 — Compare side-by-side after every cycle, AND read every page

After each render: render every page as PNG, build a side-by-side comparison if a Figma reference exists, and **actually look at every page**. Catch:
- Empty pages (template waste)
- Duplicated content across consecutive pages
- Pages that read as broken (centered title + left-aligned body, etc.)
- Pages where the chrome (header/footer) eats more space than the content

The cycle is incomplete until I've reviewed every page.

## What v1 of the privacy guide got wrong (the lessons)

Captured here so the next chunk doesn't repeat them:

1. **Front matter ceremony.** Cover + Title Page + Copyright = three pages of the title repeated three times. For a 47-page reference PDF read on a phone, this is print-book bureaucracy. Fix: cover only, imprint moves to back cover footer.

2. **Standalone section openers.** Each of the 10 chapters got its own dedicated page with title at vertical mid-point and ~800pt of empty space below. Fix: chapters are inline transitions in the body flow (big PT Serif heading + immediate first paragraph), unless the brief explicitly asks for a dramatic standalone moment.

3. **Body pages mostly empty.** Body content ran ~250pt; page extended to the footer at 1136pt; empty 800pt below. Fix: body content flows; pages break when columns fill; don't pad pages with `v(1fr)`.

4. **`stat-page-1` and `pull-quote` always full-page.** Sometimes the stat or quote should be inline punctuation in the body, not a full-page interruption. Fix: offer both `stat-inline / stat-page` and `dropquote / pull-page`; let the spec decide which earns its breath.

5. **Mandatory chrome on every page.** Covers got no chrome (correct). All other pages got the same header + footer. Fix: chrome is conditional; quiet spreads can opt out.

6. **I treated Figma example specifics as brand rules.** The Figma showed an eBook with 40/40/40/40 padding, 18pt @ 155% body, separate section opener pages. I locked those as universal. They were ONE application; the privacy guide needed a different application. Fix: distinguish brand rules (durable) from example specifics (this one document) every time.

## Cycle protocol

### Cycle 0 — Brief

Before touching code:
- What is this document FOR? (brand book → formal; reference guide → flowing; one-pager → minimal; deck → slide-based)
- Who's the reader? Where do they read it? (phone? print? large display?)
- What chrome does it need? (page numbers? running header? Both? Neither?)
- What ceremonial pages does it need? (Cover only? Cover + TOC? Cover + Title + Copyright + TOC?)
- What's the density target? (Dense reference: 16pt @ 145%. Generous editorial: 18pt @ 155%. Hero spreads: dramatic.)

### Cycle 1 — Foundations

If new tokens are needed (e.g., a new type role, a new spacing token), extend `build-tokens.sh` first. Then `text-style.typ` helpers if needed. Don't hardcode values in the template.

### Cycle 2 — Compose with primitives

Write the spec using primitives. Default everything to flowing; only force standalone pages where the editorial moment earns it.

### Cycle 3 — Render and READ EVERY PAGE

Render to PDF + per-page PNG. **Read every single page.** Catch the empty-page-waste problem before declaring done. If a page is mostly empty, ask: did the author intend that breath? If yes, keep. If no, fix the spec or the primitive.

### Cycle N — Iterate

Each cycle closes a measurable issue. Stop when no further issues would meaningfully change reader experience.

## Tools

| Tool | Purpose |
|---|---|
| `build-tokens.sh` | Extracts colors + typography + radius + space + gradient tokens |
| `text-style.typ` | Wrapper functions enforcing LH and family per role |
| `myvault-ebook.typ` | LEGACY template (eBook-style; mandatory pages; full chrome; preserved for the eBook chunk's contract) |
| `myvault-editorial.typ` | NEW primitives module (flow, chapter, stat-inline, pull-page, etc.) |
| `figma-reference.md` | Audit baseline for any chunk |
| `figma_execute` | Extract exact text styles from Figma when a reference exists |

## When this workflow applies

This applies to every editorial document type:
- Ebooks (long-form)
- Guides (reference, how-to)
- Reports (data-led)
- Proposals (formal)
- One-pagers (minimal)
- Whitepapers (technical)
- Brochures (marketing)

It also applies (with adaptations) to:
- Presentations (slides — different canvas, same composition principles)
- Social images (single-shot — composition principles still apply)
- Email designs (constrained canvas — same typography rules)

The editorial primitives are the system; the document is the application.
