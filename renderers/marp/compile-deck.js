#!/usr/bin/env node
/**
 * compile-deck.js — MyVault deck spec compiler.
 *
 * Reads a deck.yaml (author-facing spec, ergonomic — one entry per slide with
 * named fields per slide type) and emits a marp-ready deck.md to stdout (or to a
 * file via --out). The emitted markdown is then rendered by marp CLI using
 * theme.css from this directory.
 *
 * Usage:
 *   node compile-deck.js path/to/deck.yaml [--out path/to/deck.md]
 *
 * Pipeline:
 *   deck.yaml  →  compile-deck.js  →  deck.md  →  marp  →  deck.pdf
 *
 * This script is the MyVault analog of Typst page-functions in
 * renderers/typst/myvault-ebook.typ — author writes content + a few tags;
 * each emitter knows its layout, chrome, and rule citations.
 *
 * Each emitter function below cites:
 *   - The HARD/BASE rule it implements (R-PRES-NNN from chunks/presentation.md v1.2)
 *   - The Pattern Reference register from Figma Section 1 (97:8611) when applicable
 *
 * Adding a new slide type:
 *   1. Add an emitter function below.
 *   2. Register it in EMITTERS.
 *   3. Document the YAML schema in README.md and the chunk's Pattern Reference.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ============================================================
// Helpers — mirror the Typst pipeline's _icon-path-for / _surface-fill / etc.
// ============================================================

/** Pad page number to 2 digits — matches the canonical footer page-number format. */
const pad = (n) => String(n).padStart(2, '0');

/** Escape an HTML attribute value. (Used for any attr-bound content.) */
const attrEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Header labels block — text-only deck-name + section-name SPACE_BETWEEN row.
 * R-PRES-002 part 2: text-only header labels at top of interior content slides.
 * Conditional — Cover and Closing typically omit. If a slide has no `section`, we omit the header.
 */
const headerLabels = (deckMeta, sectionName) => {
  if (!sectionName) return '';
  return `<div class="chrome-top">
<span>${deckMeta || ''}</span>
<span>${sectionName}</span>
</div>
`;
};

/**
 * Footer block — brand-mark icon + page number SPACE_BETWEEN.
 * R-PRES-002 part 3: canonical footer shape when chrome is used.
 * Conditional — Cover and Closing typically omit.
 */
const footer = (pageNum) => {
  if (pageNum == null || pageNum === false) return '';
  return `<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>${pad(pageNum)}</span>
</div>
`;
};

/** Slide separator — Marp uses `---` between slides. */
const slideSep = '\n---\n\n';

// ============================================================
// SLIDE EMITTERS — one per pattern from chunks/presentation.md Pattern Reference.
// Each is the analog of a Typst page-function. Author calls by setting `type:` in YAML;
// emitter consumes named fields and returns marp-ready markdown.
// ============================================================

/**
 * COVER — brand moment. R-PRES-002: no chrome on cover. BASE Surface Palette: gradient/warm.
 * Pattern Reference: Cover is intentionally not in Section 1 — composition is open.
 *
 * YAML:
 *   - type: cover
 *     title: "..."         (required)
 *     subtitle: "..."      (required)
 *     speaker: "..."       (required)
 *     surface: gradient/warm  (optional, defaults to gradient/warm)
 */
const emitCover = (slide) => {
  return `<!-- _class: cover -->

<div class="anchor"></div>

<div class="body">

# ${slide.title}

## ${slide.subtitle}

</div>

<div class="speaker">${slide.speaker}</div>
`;
};

/**
 * STATEMENT — single-statement slide. Big PT Serif headline, centered, white surface.
 * R-PRES-001/002/003. Pattern Reference: Statement (no exact Section-1 prototype; Slide 09 Thesis
 * register is closest in calm tone).
 *
 * YAML:
 *   - type: statement
 *     section: "Opening"   (optional; if present, header labels emit)
 *     page: 02             (optional; if present, footer emits)
 *     text: "..."          (required — the statement, will become an h1 at 96pt)
 */
const emitStatement = (slide, deckMeta) => {
  return `<!-- _class: statement -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.text}

</div>

${footer(slide.page)}`;
};

/**
 * PROBLEM — dramatic register on Vault Teal full-bleed. R-PRES-001/002/003 + R-COLOR full-bleed.
 * Pattern Reference: Slide 10 Three-Panel Diagnostic (`99:8638`) — register inspiration.
 *
 * YAML:
 *   - type: problem
 *     section: "Problem"
 *     page: 03
 *     title: "..."         (required — slide title, 72pt PT Serif white)
 *     rows:                (required — array of {heading, body})
 *       - heading: "..."
 *         body: "..."
 *     closing: "..."       (optional — closing observation at bottom, 32pt PT Serif white)
 */
const emitProblem = (slide, deckMeta) => {
  const rowsHtml = (slide.rows || []).map((r) => `<div class="problem-row">
<div class="label-col">${r.heading}</div>
<div class="body-col">${r.body}</div>
</div>`).join('\n\n');

  const closingHtml = slide.closing ? `\n<div class="closing-line">${slide.closing}</div>\n` : '';

  return `<!-- _class: problem -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.title}

<div class="problem-rows">

${rowsHtml}

</div>
${closingHtml}
</div>

${footer(slide.page)}`;
};

/**
 * THREE-SHIFTS / 3-CARD GRID — data-light register on white. R-PRES-001/002/003.
 * Pattern Reference: Slide 11 Why-Now Wedge (`99:8656`) — 3-card grid + register.
 *
 * YAML:
 *   - type: three-shifts
 *     section: "Why Now"
 *     page: 04
 *     title: "..."
 *     cards:               (required — array of {heading, body}, ideally 3)
 *       - heading: "..."
 *         body: "..."
 *     closing: "..."       (optional)
 */
const emitThreeShifts = (slide, deckMeta) => {
  const cardsHtml = (slide.cards || []).map((c) => `<div class="card">
<div class="heading">${c.heading}</div>
<div class="body-text">${c.body}</div>
</div>`).join('\n\n');

  const closingHtml = slide.closing ? `\n<div class="closing-line">${slide.closing}</div>\n` : '';

  return `<!-- _class: three-shifts -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.title}

<div class="shifts">

${cardsHtml}

</div>
${closingHtml}
</div>

${footer(slide.page)}`;
};

/**
 * ARCHITECTURE — editorial-dark register on black. 4-layer stack with hairline dividers.
 * R-PRES-001/002/003. Pattern Reference: Slide 12 Architecture Diagram (`99:8677`).
 *
 * YAML:
 *   - type: architecture
 *     section: "Architecture"
 *     page: 05
 *     title: "..."
 *     intro: "..."         (body sentence above the stack)
 *     layers:              (required — array of {label, body})
 *       - label: "..."
 *         body: "..."
 *     closing: "..."       (optional)
 */
const emitArchitecture = (slide, deckMeta) => {
  const layersHtml = (slide.layers || []).map((l) => `<div class="layer">
<div class="label-col">${l.label}</div>
<div class="body-col">${l.body}</div>
</div>`).join('\n\n');

  const closingHtml = slide.closing ? `\n<div class="closing-line">${slide.closing}</div>\n` : '';

  const introHtml = slide.intro ? `\n<p>${slide.intro}</p>\n` : '';

  return `<!-- _class: architecture -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.title}
${introHtml}
<div class="arch-stack">

${layersHtml}

</div>
${closingHtml}
</div>

${footer(slide.page)}`;
};

/**
 * STAT-HERO — single hero stat (typically 144–240 pt teal) with supporting hierarchy.
 * R-PRES-001/002/003. Pattern Reference: Slide 14 Market Sizing (`99:8822`) SOM block — register.
 *
 * YAML:
 *   - type: stat-hero
 *     section: "The Number"
 *     page: 06
 *     number: "72+"        (required — the hero stat)
 *     headline: "..."      (required — 56pt PT Serif black)
 *     supporting: "..."    (required — 28pt Lato body)
 *     source: "..."        (optional — 18pt gray-02 source caption)
 */
const emitStatHero = (slide, deckMeta) => {
  const sourceHtml = slide.source ? `\n<div class="source">${slide.source}</div>\n` : '';

  return `<!-- _class: stat-hero -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

<div class="hero-number">${slide.number}</div>

<div class="headline">${slide.headline}</div>

<div class="supporting">${slide.supporting}</div>
${sourceHtml}
</div>

${footer(slide.page)}`;
};

/**
 * COMPARISON — Harvey Ball table on off-white surface (rare alternate per BASE).
 * R-PRES-001/002/003. Pattern Reference: Slide 17 Feature Comparison (`99:8915`).
 * Foundation override: chart-card 18pt Vault Teal exception applies if labels go inside
 * a chart-card; the comparison table itself uses MyVault-column-teal emphasis (display tier).
 *
 * YAML:
 *   - type: comparison
 *     section: "Approaches"
 *     page: 07
 *     title: "..."
 *     columns:             (required — array of column header strings; first is the row-label slot, leave "")
 *       - ""
 *       - "MyVault"
 *       - "Trustworthy"
 *       ...
 *     myvault_col: 1       (required — index of the MyVault column to highlight in teal; 0-indexed)
 *     rows:                (required — array of arrays. First cell = row label; rest = "full"|"partial"|"none")
 *       - ["Family-context AI", "full", "partial", "none", "partial"]
 *       ...
 *     legend_note: "..."   (optional)
 */
const emitComparison = (slide, deckMeta) => {
  const columns = slide.columns || [];
  const myvaultCol = typeof slide.myvault_col === 'number' ? slide.myvault_col : 1;

  const headRow = '<tr>\n' + columns.map((c, i) => {
    if (i === myvaultCol) return `<th class="myvault">${c}</th>`;
    return `<th>${c}</th>`;
  }).join('\n') + '\n</tr>';

  const bodyRows = (slide.rows || []).map((row) => {
    const cells = row.map((cell, i) => {
      if (i === 0) return `<td>${cell}</td>`;
      const klass = i === myvaultCol ? ' class="myvault"' : '';
      return `<td${klass}><span class="ball ${cell}"></span></td>`;
    }).join('\n');
    return `<tr>\n${cells}\n</tr>`;
  }).join('\n');

  const legendNote = slide.legend_note ? `<span> · </span>\n<span>${slide.legend_note}</span>` : '';

  return `<!-- _class: comparison -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.title}

<table>
<thead>
${headRow}
</thead>
<tbody>
${bodyRows}
</tbody>
</table>

<div class="legend">
<span class="ball full"></span><span>full</span>
<span class="ball partial"></span><span>partial</span>
<span class="ball none"></span><span>none</span>
${legendNote}
</div>

</div>

${footer(slide.page)}`;
};

/**
 * THESIS — small headline (40pt per chunk Pattern Reference note) + N pastel cards
 * arranged in a 3+2 staircase (or other counts handled gracefully).
 * R-PRES-001/002/003. Pattern Reference: Slide 09 Thesis Block (`99:8612`) — register + 5-card staircase.
 *
 * YAML:
 *   - type: thesis
 *     section: "Lessons"
 *     page: 08
 *     title: "..."         (will be 40pt — the Thesis-pattern stylistic choice, NOT 72pt)
 *     lessons:             (array of strings — each becomes a card with auto-numbering 01, 02, ...)
 *       - "Lesson 1 text..."
 *       - "Lesson 2 text..."
 *       ...
 *     cards_per_row: 3     (optional, default 3 — first row count; second row gets the remainder, centered)
 */
const emitThesis = (slide, deckMeta) => {
  const lessons = slide.lessons || [];
  const perRow = slide.cards_per_row || 3;
  const row1 = lessons.slice(0, perRow);
  const row2 = lessons.slice(perRow);

  const cardHtml = (text, idx) => `<div class="lesson"><div class="num">${pad(idx + 1)}</div><div class="text">${text}</div></div>`;

  const row1Html = row1.length ? `<div class="row">
${row1.map((l, i) => cardHtml(l, i)).join('\n')}
</div>` : '';

  const row2Html = row2.length ? `\n<div class="row center">
${row2.map((l, i) => cardHtml(l, i + perRow)).join('\n')}
</div>` : '';

  return `<!-- _class: thesis -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.title}

<div class="lessons">

${row1Html}${row2Html}

</div>

</div>

${footer(slide.page)}`;
};

/**
 * ACTION — 3 use-of-funds blocks with signal-go top hairline + optional centered closing line.
 * R-PRES-001/002/003. Pattern Reference: Slide 21 Ask · Use of Funds (`99:9060`) — 3-block rhythm.
 *
 * YAML:
 *   - type: action
 *     section: "Action"
 *     page: 09
 *     title: "..."         (56pt PT Serif)
 *     blocks:              (array of {heading, body})
 *       - heading: "..."
 *         body: "..."
 *     closing: "..."       (optional — 32pt centered closing line below blocks)
 */
const emitAction = (slide, deckMeta) => {
  const blocksHtml = (slide.blocks || []).map((b) => `<div class="action-block">
<div class="heading">${b.heading}</div>
<div class="body-text">${b.body}</div>
</div>`).join('\n\n');

  const closingHtml = slide.closing ? `\n<div class="closing-line">${slide.closing}</div>\n` : '';

  return `<!-- _class: action -->

${headerLabels(deckMeta, slide.section)}
<div class="body">

# ${slide.title}

<div class="actions">

${blocksHtml}

</div>
${closingHtml}
</div>

${footer(slide.page)}`;
};

/**
 * CLOSING — sign-off slide. R-PRES-002: no chrome (Closing is a default opt-out).
 * BASE Surface Palette: gradient/cool. Pattern Reference: no exact Section-1 prototype.
 *
 * YAML:
 *   - type: closing
 *     headline: "..."      (required — supports <br> for line breaks; 120pt PT Serif)
 *     speaker: "..."       (required)
 *     period: true         (optional, default true — adds the signal-go period mark below speaker)
 */
const emitClosing = (slide) => {
  const periodHtml = slide.period === false ? '' : `\n<div class="period"></div>`;

  return `<!-- _class: closing -->

<div class="body">

# ${slide.headline}

<div class="speaker">${slide.speaker}</div>
${periodHtml}

</div>
`;
};

// ============================================================
// EMITTERS registry — slide.type → emitter function.
// Add new patterns here.
// ============================================================

const EMITTERS = {
  cover:        (slide, _meta) => emitCover(slide),
  statement:    emitStatement,
  problem:      emitProblem,
  'three-shifts': emitThreeShifts,
  architecture: emitArchitecture,
  'stat-hero':  emitStatHero,
  comparison:   emitComparison,
  thesis:       emitThesis,
  action:       emitAction,
  closing:      (slide, _meta) => emitClosing(slide),
};

// ============================================================
// Frontmatter — Marp directives at the top of the deck.
// ============================================================

const frontmatter = (deck) => `---
marp: true
theme: ${deck.theme || 'myvault-presentation'}
size: ${deck.size || '1920x1080'}
paginate: false
---
`;

// ============================================================
// Main
// ============================================================

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node compile-deck.js <deck.yaml> [--out deck.md]');
    process.exit(1);
  }

  const inPath = args[0];
  const outIdx = args.indexOf('--out');
  const outPath = outIdx >= 0 && args[outIdx + 1] ? args[outIdx + 1] : null;

  const raw = fs.readFileSync(inPath, 'utf8');
  const spec = yaml.load(raw);
  if (!spec || !spec.deck) {
    console.error('ERROR: missing top-level "deck" key in spec');
    process.exit(1);
  }

  const deck = spec.deck;
  const slides = deck.slides || [];

  const out = [frontmatter(deck)];

  slides.forEach((slide, i) => {
    const fn = EMITTERS[slide.type];
    if (!fn) {
      console.error(`ERROR: unknown slide type "${slide.type}" at index ${i}`);
      console.error(`Known types: ${Object.keys(EMITTERS).join(', ')}`);
      process.exit(1);
    }
    out.push(fn(slide, deck.meta));
    if (i < slides.length - 1) out.push('---');
  });

  const md = out.join('\n');

  if (outPath) {
    fs.writeFileSync(outPath, md);
    console.error(`✓ Compiled ${slides.length} slide(s) → ${outPath}`);
  } else {
    process.stdout.write(md);
  }
};

main();
