// MyVault Ebook + PDF Document Template — v2.1
// Built against figma-reference.md (Figma is the visual canon).
// Each function cites the Figma node ID it implements.
// v2.1: refactored to use Typst page() element so per-page properties are isolated.

#import "tokens.typ": *
#import "text-style.typ": *

// ============================================================
// R-EBOOK-001 — Page geometry (per Figma, 40/40/40/40)
// ============================================================

#let page-width = 800pt
#let page-height = 1200pt
#let page-margin = 40pt

// ============================================================
// R-EBOOK-002 — Footer + header helpers
// ============================================================

#let _icon-path-for(variant) = {
  if variant == "white" { "../../assets/logo/icon-white.svg" }
  else if variant == "light" { "../../assets/logo/icon-light.svg" }
  else { "../../assets/logo/icon-primary.svg" }
}

#let _text-color-for-footer(variant) = {
  if variant == "white" { color-core-white }
  else if variant == "light" { color-core-off-white }
  else { color-core-gray-02 }
}

#let footer-content(variant: "primary") = {
  block(
    width: 720pt,
    height: 24pt,
    {
      grid(
        columns: (1fr, 1fr),
        rows: 24pt,
        align: (left + horizon, right + horizon),
        image(_icon-path-for(variant), width: 24pt, height: 24pt),
        styled(type-body-default, [#context counter(page).display()], fill: _text-color-for-footer(variant), align-h: right),
      )
    }
  )
}

#let _surface-fill(name) = {
  if name == "teal" { color-core-teal }
  else if name == "black" { color-core-black }
  else if name == "off-white" { color-core-off-white }
  else if name == "premium-purple" { color-secondary-premium-purple }
  else if name == "dark-earth" { color-secondary-dark-earth }
  else if name == "rich-blue" { color-secondary-rich-blue }
  else { color-core-white }
}

#let _footer-variant-for(surface) = {
  if surface == "teal" or surface == "black" { "light" }
  else if surface == "premium-purple" or surface == "dark-earth" or surface == "rich-blue" { "light" }
  else { "primary" }
}

// ============================================================
// _make-page — wraps content in a Typst `page` element with explicit properties.
// This is the ONLY reliable way to control per-page properties.
// ============================================================

#let _make-page(
  surface: "white",
  header-text: none,
  header-align: left,
  header-size: 16pt,
  show-footer: true,
  margin-override: none,
  body
) = {
  let var = _footer-variant-for(surface)
  let header-fill = _text-color-for-footer(var)
  let header-block = if header-text == none or header-text == "" {
    none
  } else {
    block(width: 720pt, height: 24pt, {
      set par(leading: 0pt, spacing: 0pt)
      set text(font: "Lato", size: header-size, fill: header-fill)
      if header-align == center { align(center)[#header-text] }
      else if header-align == right { align(right)[#header-text] }
      else { [#header-text] }
    })
  }
  // page() element from inside a function correctly applies fill in PNG export.
  // (set page inside a function gets scope-trapped and doesn't propagate.)
  page(
    width: page-width,
    height: page-height,
    margin: if margin-override != none { margin-override } else { page-margin },
    fill: _surface-fill(surface),
    header: header-block,
    header-ascent: 0pt,
    footer: if show-footer { footer-content(variant: var) } else { none },
    footer-descent: 0pt,
    body,
  )
}

// ============================================================
// Document setup
// ============================================================

#let ebook-doc(title: "", body) = {
  set document(title: title, author: "MyVault")
  set text(font: "Lato", size: 18pt, fill: color-core-black, lang: "en")
  set par(leading: 18pt * 55%, justify: false, spacing: 18pt * 80%)
  body
}

// ============================================================
// Cover Treatment 1 — Figma 70:8800
// ============================================================

#let cover-t1(title: "", subtitle: "", image-asset: none) = page(
  width: page-width,
  height: page-height,
  margin: 0pt,
  fill: gradient.linear(angle: 135deg, rgb("#3a3a3a"), rgb("#1a3030")),
  header: none,
  footer: none,
  {
    // Top section: lockup top-left, title + subtitle ALL LEFT-aligned (consistent w/ lockup)
    place(top + left, dx: 40pt, dy: 40pt,
      block(width: 720pt, height: 540pt, {
        image("../../assets/logo/lockup-white.svg", width: 171pt, height: 48pt)
        v(1fr)
        styled(("PT Serif", 64pt, 115%), [#title], fill: color-core-white, align-h: left, width: 720pt)
        v(20pt)
        styled(type-body-xl, [#subtitle], fill: color-core-off-white, align-h: left, width: 540pt)
      })
    )
    place(top + left, dx: 40pt, dy: 620pt,
      if image-asset != none {
        block(width: 720pt, height: 540pt, image(image-asset, width: 720pt, height: 540pt, fit: "cover"))
      } else {
        block(width: 720pt, height: 540pt, fill: gradient.linear(angle: 180deg, rgb("#2a2a2a"), rgb("#0a1818")))
      }
    )
  }
)

// ============================================================
// Title Page — constructed (no canonical Figma)
// ============================================================

// Title Page — left-aligned, calmer typography, NO signal-go rule (Mark: "we should never use it like this")
#let title-page(title: "", subtitle: "") = _make-page(surface: "off-white", header-text: none, {
  v(1fr)
  // PT Serif heading-l (40pt) is enough for the title — display-s (56pt) was too tall
  styled(type-heading-l, [#title], fill: color-core-black, align-h: left, width: 720pt)
  v(24pt)
  styled(type-body-l, [#subtitle], fill: color-core-black, align-h: left, width: 720pt)
  v(1fr)
})

// ============================================================
// Copyright — Figma 72:9289
// ============================================================

#let copyright-page(book-title: "", author: "", year: "2026", disclaimer: "", publisher: "", isbn: "") = _make-page(surface: "off-white", header-text: none, {
  v(264pt)
  align(center, {
    styled(type-body-default, [#book-title], fill: color-core-black, align-h: center, width: 720pt)
    v(20pt)
    styled(type-body-default, [#author], fill: color-core-gray-02, align-h: center, width: 720pt)
    v(20pt)
    styled(type-body-default, [© #year MyVault. All rights reserved.], fill: color-core-gray-02, align-h: center, width: 720pt)
  })
  v(1fr)
  // Bottom imprint — TIGHT stack, no v() between lines (Mark: "we don't need no spacing between")
  align(center, {
    styled(type-caption, [#disclaimer], fill: color-core-gray-02, align-h: center, width: 600pt)
    styled(type-caption, [#publisher], fill: color-core-gray-02, align-h: center, width: 720pt)
    styled(type-caption, [Typeset in PT Serif and Lato.], fill: color-core-gray-02, align-h: center, width: 720pt)
    styled(type-caption, [#isbn], fill: color-core-gray-02, align-h: center, width: 720pt)
  })
  v(40pt)
})

// ============================================================
// Table of Contents — Figma 72:9300
// ============================================================

#let table-of-contents(entries: ()) = _make-page(surface: "off-white", header-text: none, {
  // No signal-go rule — Mark: "we should never use it like this"
  styled(type-display-s, [Contents], fill: color-core-gray-01, align-h: left, width: 720pt)
  v(40pt)
  for (i, entry) in entries.enumerate() {
    let num-str = if i + 1 < 10 { "0" + str(i + 1) } else { str(i + 1) }
    grid(
      columns: (40pt, 1fr, 60pt),
      column-gutter: 20pt,
      align: (left + top, left + top, right + top),
      styled(type-body-xl, [#num-str], fill: color-core-gray-01, align-h: left),
      styled(("PT Serif", 20pt, 130%), [#entry.title], fill: color-core-black, align-h: left),
      styled(type-body-xl, [#entry.page], fill: color-core-gray-02, align-h: right),
    )
    v(20pt)
  }
})

// ============================================================
// Section Opener — Figma 72:9225
// Chapter marker is the page header (centered Lato 14pt gray-02), per Figma
// ============================================================

#let section-opener(chapter: "", title: "", intro: "") = _make-page(
  surface: "white",
  header-text: chapter,
  header-align: center,
  header-size: 14pt,
  {
    v(280pt)
    styled(type-display-m, [#title], fill: color-core-black, align-h: center, width: 720pt)
    v(40pt)
    // Intro spans FULL 720 width with center alignment — keeps consistent center-alignment
    // with the title, no apparent left-alignment from narrow column wrapping (Mark's rule:
    // never mix center header with left-looking text; spread the text full width if both centered).
    styled(type-body-l, [#intro], fill: color-core-black, align-h: center, width: 720pt)
  }
)

// ============================================================
// Body Page — Figma 72:9166
// ============================================================

#let body-page(running-header: "", subhead: none, body) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)  // gap header → body
    if subhead != none {
      styled(type-heading-m, [#subhead], fill: color-core-black, align-h: left, width: 720pt)
      v(24pt)
    }
    set par(leading: 18pt * 55%, spacing: 18pt * 80%, justify: false)
    set text(font: "Lato", size: 18pt, fill: color-core-black)
    body
  }
)

// ============================================================
// Pull Quote A — Figma 72:9232
// ============================================================

#let pull-quote(quote: "") = _make-page(surface: "off-white", header-text: none, {
  v(1fr)
  grid(
    columns: (57pt, 643pt),
    column-gutter: 20pt,
    align: (left + top, left + top),
    styled(("PT Serif", 120pt, 100%), [\u{201C}], fill: color-core-teal, align-h: left),
    styled(("PT Serif", 36pt, 135%), [#quote], fill: color-core-teal, align-h: left, width: 643pt),
  )
  v(1fr)
})

// ============================================================
// Stat Page V1 — single hero on white
// ============================================================

#let stat-page-1(number: "", supporting-headline: "", supporting-paragraph: "", source: "") = _make-page(surface: "white", header-text: none, {
  v(1fr)
  align(center, {
    styled(("PT Serif", 220pt, 100%), [#number], fill: color-core-teal, align-h: center, width: 100%)
    v(40pt)
    styled(("PT Serif", 32pt, 120%), [#supporting-headline], fill: color-core-black, align-h: center, width: 540pt)
    v(20pt)
    styled(type-body-l, [#supporting-paragraph], fill: color-core-gray-02, align-h: center, width: 540pt)
    if source != "" {
      v(16pt)
      styled(type-caption, [#source], fill: color-core-gray-02, align-h: center, width: 540pt)
    }
  })
  v(1fr)
})

// ============================================================
// Stat Page V3 — dual on Vault Teal mirrored — Figma 89:6938
// ============================================================

#let _stat-block-T3(number: "", label: "") = block(width: 340pt, height: 216pt, {
  styled(("PT Serif", 120pt, 100%), [#number], fill: color-core-off-white, align-h: center, width: 340pt)
  v(20pt)
  styled(("PT Serif", 32pt, 120%), [#label], fill: color-core-off-white, align-h: center, width: 340pt)
})

#let _stat-copy-T3(copy: "") = block(width: 340pt, height: 168pt, styled(type-body-l, [#copy], fill: color-core-white, align-h: left, width: 340pt))

#let stat-page-3-teal-mirror(
  stat-1-number: "",
  stat-1-label: "",
  stat-1-copy: "",
  stat-2-number: "",
  stat-2-label: "",
  stat-2-copy: "",
) = _make-page(surface: "teal", header-text: none, {
  grid(
    columns: (340pt, 340pt),
    column-gutter: 40pt,
    rows: 508pt,
    _stat-block-T3(number: stat-1-number, label: stat-1-label),
    _stat-copy-T3(copy: stat-1-copy),
  )
  v(40pt)
  grid(
    columns: (340pt, 340pt),
    column-gutter: 40pt,
    rows: 508pt,
    _stat-copy-T3(copy: stat-2-copy),
    _stat-block-T3(number: stat-2-number, label: stat-2-label),
  )
})

// ============================================================
// Lists Page — Figma 89:7142
// ============================================================

#let _bulleted-list(items) = {
  for item in items {
    block(below: 10pt, {
      grid(
        columns: (20pt, 1fr),
        column-gutter: 12pt,
        align: (left + top, left + top),
        box(height: 28pt, align(left + horizon, ellipse(width: 8pt, height: 8pt, fill: color-signal-go, stroke: none))),
        styled(type-body-l, [#item], fill: color-core-black, align-h: left),
      )
    })
  }
}

#let _numbered-list(items) = {
  for (i, item) in items.enumerate() {
    block(below: 10pt, {
      grid(
        columns: (20pt, 1fr),
        column-gutter: 12pt,
        align: (left + top, left + top),
        styled(type-body-l, [#(i + 1).], fill: color-signal-go, align-h: left),
        styled(type-body-l, [#item], fill: color-core-black, align-h: left),
      )
    })
  }
}

#let _checklist(items) = {
  for item in items {
    block(below: 10pt, {
      grid(
        columns: (28pt, 1fr),
        column-gutter: 12pt,
        align: (left + top, left + top),
        box(height: 28pt, align(left + horizon, rect(width: 16pt, height: 16pt, fill: color-signal-go, stroke: none, radius: radius-xs))),
        styled(type-body-l, [#item], fill: color-core-black, align-h: left),
      )
    })
  }
}

#let lists-page(header: "", bulleted: (), numbered: (), checklist: ()) = _make-page(surface: "white", header-text: none, {
  styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 640pt)
  v(40pt)
  grid(
    columns: (350pt, 350pt),
    column-gutter: 20pt,
    align: (left + top, left + top),
    {
      if bulleted.len() > 0 {
        styled(type-body-s, [Bulleted], fill: color-core-gray-02, align-h: left, width: 350pt)
        v(20pt)
        _bulleted-list(bulleted)
        v(40pt)
      }
      if numbered.len() > 0 {
        styled(type-body-s, [Numbered], fill: color-core-gray-02, align-h: left, width: 350pt)
        v(20pt)
        _numbered-list(numbered)
      }
    },
    {
      v(1fr)
      if checklist.len() > 0 {
        styled(type-body-s, [Checklist], fill: color-core-gray-02, align-h: left, width: 350pt)
        v(20pt)
        _checklist(checklist)
      }
    },
  )
})

// ============================================================
// Conclusion — Figma 89:7062
// ============================================================

#let conclusion(title: "", sign-name: "", sign-role: "", body) = _make-page(surface: "teal", header-text: none, {
  grid(
    columns: (340pt, 340pt),
    column-gutter: 40pt,
    align: (left + top, left + top),
    {},
    {
      v(237pt)
      styled(type-display-s, [#title], fill: color-core-off-white, align-h: left, width: 340pt)
      v(40pt)
      set text(font: "Lato", size: 18pt, fill: color-core-off-white)
      set par(leading: 18pt * 55%, spacing: 18pt * 80%, justify: false)
      body
      v(40pt)
      block(width: 340pt, height: 1pt, fill: color-core-gray-02)
      v(40pt)
      styled(type-body-s, [#sign-name], fill: color-core-off-white, align-h: left, width: 340pt)
      styled(type-body-s, [#sign-role], fill: color-core-off-white, align-h: left, width: 340pt)
    },
  )
})

// ============================================================
// Back Cover — Figma 72:9239
// ============================================================

#let back-cover(closing: "", url: "myvaultai.com", copyright: "") = page(
  width: page-width,
  height: page-height,
  margin: (top: 40pt, right: 80pt, bottom: 40pt, left: 80pt),
  fill: color-core-teal,
  header: none,
  footer: none,
  {
    block(width: 640pt, height: 531pt, align(center + horizon,
      image("../../assets/logo/lockup-light.svg", width: 148pt, height: 40pt)
    ))
    block(width: 640pt, height: 531pt, {
      v(1fr)
      styled(("Lato", 18pt, 140%), [#closing], fill: color-core-off-white, align-h: center, width: 540pt)
      v(40pt)
      styled(type-body-l, [#url], fill: color-core-white, align-h: center, width: 640pt)
      v(1fr)
    })
    align(center, styled(type-caption, [#copyright], fill: color-core-gray-01, align-h: center, width: 720pt))
  }
)

// ============================================================
// EDITORIAL PATTERNS — built on the same rules as the core templates.
// These are additional layouts for richer editorial content.
// ============================================================

// Audit Page — header + time chip + numbered steps
// Used for: 6 audits in the Privacy Guide
#let audit-page(running-header: "", number: "", title: "", time-estimate: "", steps: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    // Top row: audit number + time chip
    grid(
      columns: (1fr, auto),
      align: (left + horizon, right + horizon),
      styled(type-body-s, [Audit #number], fill: color-core-gray-02, align-h: left),
      box(
        inset: (top: 6pt, right: 14pt, bottom: 6pt, left: 14pt),
        radius: radius-full,
        fill: color-signal-go,
        styled(type-body-s, [#time-estimate], fill: color-core-black, align-h: left),
      ),
    )
    v(20pt)
    // Title
    styled(type-heading-l, [#title], fill: color-core-black, align-h: left, width: 720pt)
    v(40pt)
    // Numbered steps
    for (i, step) in steps.enumerate() {
      block(below: 16pt, {
        grid(
          columns: (32pt, 1fr),
          column-gutter: 16pt,
          align: (left + top, left + top),
          styled(type-body-l, [#(i + 1).], fill: color-signal-go, align-h: left),
          styled(type-body-l, [#step], fill: color-core-black, align-h: left),
        )
      })
    }
  }
)

// 4-up Grid Page — 2x2 cells with title + body
// Used for: data processing models, etc.
#let grid-4up-page(running-header: "", header: "", intro: none, cells: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    if intro != none {
      v(16pt)
      styled(type-body-l, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
    }
    v(32pt)
    // 2x2 grid
    let cell-content(c) = block(width: 340pt, {
      styled(type-body-s, [#c.tag], fill: color-signal-go, align-h: left, width: 340pt)
      v(8pt)
      styled(type-heading-m, [#c.title], fill: color-core-black, align-h: left, width: 340pt)
      v(12pt)
      styled(type-body-s, [#c.body], fill: color-core-black, align-h: left, width: 340pt)
    })
    grid(
      columns: (340pt, 340pt),
      column-gutter: 40pt,
      row-gutter: 32pt,
      ..cells.map(cell-content),
    )
  }
)

// 3-column Comparison Page — for platform comparisons
// Each column: header (PT Serif) + sub-points (Lato bullets)
#let three-col-comparison(running-header: "", header: "", intro: none, columns: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    if intro != none {
      v(16pt)
      styled(type-body-l, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
    }
    v(32pt)
    let col-content(c) = block(width: 213pt, {
      styled(type-heading-m, [#c.title], fill: color-core-black, align-h: left, width: 213pt)
      v(16pt)
      styled(type-body-s, [#c.body], fill: color-core-black, align-h: left, width: 213pt)
    })
    // 3 cols of 213pt + 2 gaps of 40pt = 719 ≈ 720
    grid(
      columns: (213pt, 213pt, 213pt),
      column-gutter: 40pt,
      ..columns.map(col-content),
    )
  }
)

// Data Retention Table — service / retention / notes
#let data-table(running-header: "", header: "", intro: none, rows: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    if intro != none {
      v(16pt)
      styled(type-body-l, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
    }
    v(32pt)
    // Table header
    grid(
      columns: (200pt, 200pt, 1fr),
      column-gutter: 20pt,
      align: (left + top, left + top, left + top),
      styled(type-body-s, [Service], fill: color-core-gray-02, align-h: left),
      styled(type-body-s, [Retention], fill: color-core-gray-02, align-h: left),
      styled(type-body-s, [Notes], fill: color-core-gray-02, align-h: left),
    )
    v(8pt)
    // Top border
    block(width: 720pt, height: 1pt, fill: color-core-gray-01)
    v(12pt)
    // Rows
    for row in rows {
      grid(
        columns: (200pt, 200pt, 1fr),
        column-gutter: 20pt,
        align: (left + top, left + top, left + top),
        styled(type-body-s, [#row.service], fill: color-core-black, align-h: left, width: 200pt),
        styled(type-body-s, [#row.retention], fill: color-core-black, align-h: left, width: 200pt),
        styled(type-body-s, [#row.notes], fill: color-core-gray-02, align-h: left),
      )
      v(10pt)
      block(width: 720pt, height: 1pt, fill: color-core-gray-01)
      v(10pt)
    }
  }
)

// Jurisdiction Page — multiple jurisdiction blocks stacked
#let jurisdiction-page(running-header: "", header: "", intro: none, jurisdictions: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    if intro != none {
      v(16pt)
      styled(type-body-l, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
    }
    v(32pt)
    for j in jurisdictions {
      block(below: 24pt, {
        styled(type-body-s, [#j.region], fill: color-signal-go, align-h: left, width: 720pt)
        v(4pt)
        styled(type-heading-m, [#j.law], fill: color-core-black, align-h: left, width: 720pt)
        v(12pt)
        styled(type-body-s, [#j.summary], fill: color-core-black, align-h: left, width: 720pt)
      })
    }
  }
)

// FAQ Page — Q&A pairs
#let faq-page(running-header: "", header: none, qa-pairs: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    if header != none {
      styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
      v(32pt)
    }
    for pair in qa-pairs {
      block(below: 28pt, {
        styled(type-heading-m, [#pair.q], fill: color-core-black, align-h: left, width: 720pt)
        v(12pt)
        styled(type-body-s, [#pair.a], fill: color-core-black, align-h: left, width: 720pt)
      })
    }
  }
)

// Sources Page — numbered citations with signal-go numbers
#let sources-page(running-header: "", header: "Sources", sources: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    v(32pt)
    for (i, src) in sources.enumerate() {
      block(below: 14pt, {
        grid(
          columns: (28pt, 1fr),
          column-gutter: 12pt,
          align: (right + top, left + top),
          styled(type-body-s, [#(i + 1)], fill: color-signal-go, align-h: right),
          styled(type-body-s, [#src], fill: color-core-black, align-h: left),
        )
      })
    }
  }
)

// Levels Stack Page — 3 levels with title + time + body
#let levels-stack(running-header: "", header: "", intro: none, levels: ()) = _make-page(
  surface: "white",
  header-text: running-header,
  header-align: left,
  header-size: 16pt,
  {
    v(40pt)
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    if intro != none {
      v(16pt)
      styled(type-body-l, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
    }
    v(32pt)
    for (i, lvl) in levels.enumerate() {
      block(below: 32pt, {
        grid(
          columns: (auto, 1fr, auto),
          column-gutter: 16pt,
          align: (left + horizon, left + horizon, right + horizon),
          // Level number badge
          box(
            inset: (top: 6pt, right: 14pt, bottom: 6pt, left: 14pt),
            radius: radius-full,
            fill: color-signal-go,
            styled(type-body-s, [Level #(i + 1)], fill: color-core-black, align-h: left),
          ),
          styled(type-heading-m, [#lvl.title], fill: color-core-black, align-h: left),
          styled(type-body-s, [#lvl.time], fill: color-core-gray-02, align-h: right),
        )
        v(16pt)
        styled(type-body-s, [#lvl.body], fill: color-core-black, align-h: left, width: 720pt)
      })
    }
  }
)
