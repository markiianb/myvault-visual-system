// MyVault Editorial Primitives — composable layout primitives.
// Built on the brand rules (typography, color, spacing, alignment).
// NOT a stamp-out-pages template. Author writes content + intent;
// the system flows pages.
//
// See documents/ebook-test/workflow.md for the principle.

#import "tokens.typ": *
#import "text-style.typ": *

// ============================================================
// Geometry — defaults; per-page overrides via params
// ============================================================

#let page-width = 800pt
#let page-height = 1200pt
#let default-margin = 40pt

// ============================================================
// Footer + header helpers
// ============================================================

#let _icon-path-for(variant) = {
  if variant == "white" { "../../assets/logo/icon-white.svg" }
  else if variant == "light" { "../../assets/logo/icon-light.svg" }
  else { "../../assets/logo/icon-primary.svg" }
}

#let _text-color-for-chrome(variant) = {
  if variant == "white" { color-core-white }
  else if variant == "light" { color-core-off-white }
  else { color-core-gray-02 }
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

#let _chrome-variant-for(surface) = {
  if surface == "teal" or surface == "black" { "light" }
  else if surface == "premium-purple" or surface == "dark-earth" or surface == "rich-blue" { "light" }
  else { "primary" }
}

#let _footer(variant: "primary") = block(
  width: 720pt,
  height: 24pt,
  {
    grid(
      columns: (1fr, 1fr),
      rows: 24pt,
      align: (left + horizon, right + horizon),
      image(_icon-path-for(variant), width: 24pt, height: 24pt),
      styled(type-body-default, [#context counter(page).display()], fill: _text-color-for-chrome(variant), align-h: right),
    )
  }
)

#let _header(text-content, variant: "primary") = {
  if text-content == none or text-content == "" {
    none
  } else {
    block(width: 720pt, height: 24pt, {
      set par(leading: 0pt, spacing: 0pt)
      set text(font: "Lato", size: 16pt, fill: _text-color-for-chrome(variant))
      [#text-content]
    })
  }
}

// ============================================================
// editorial-doc — show wrapper. Sets text/par defaults only.
// ============================================================

#let editorial-doc(title: "", body) = {
  set document(title: title, author: "MyVault")
  // Body baseline: Lato 18pt @ 155% — editorial density (not reference density)
  set text(font: "Lato", size: 18pt, fill: color-core-black, lang: "en")
  set par(leading: 18pt * 55%, justify: false, spacing: 18pt * 80%)
  body
}

// ============================================================
// cover — the cover page. The ONLY ceremonial page that's
// nearly always present in branded documents.
// ============================================================

#let cover(
  title: "",
  subtitle: none,
  author: none,
  surface: "teal",
  title-size: 80pt,
) = {
  let lockup-variant = if surface == "teal" or surface == "black" { "light" }
    else { "primary" }
  let title-fill = if surface == "teal" or surface == "black" { color-core-white } else { color-core-black }
  let support-fill = if surface == "teal" or surface == "black" { color-core-off-white } else { color-core-gray-02 }
  let lockup-path = if lockup-variant == "light" { "../../assets/logo/lockup-light.svg" } else { "../../assets/logo/lockup-primary.svg" }
  page(
    width: page-width,
    height: page-height,
    margin: 0pt,
    fill: _surface-fill(surface),
    header: none,
    footer: none,
    {
      place(top + left, dx: 60pt, dy: 60pt,
        image(lockup-path, width: 171pt, height: 48pt)
      )
      place(bottom + left, dx: 60pt, dy: -60pt,
        block(width: 680pt, {
          styled(("PT Serif", title-size, 110%), [#title], fill: title-fill, align-h: left, width: 680pt)
          if subtitle != none {
            v(24pt)
            styled(("Lato", 22pt, 140%), [#subtitle], fill: support-fill, align-h: left, width: 560pt)
          }
          if author != none {
            v(24pt)
            styled(("Lato", 17pt, 150%), [#author], fill: support-fill, align-h: left, width: 560pt)
          }
        })
      )
    }
  )
}

// ============================================================
// flow — the content stream. Auto-paginates with chrome.
// Body content goes here. Chapter, subhead, stat-inline,
// dropquote, data-grid, etc. all flow inside this.
// ============================================================

#let flow(running-header: none, surface: "white", body) = {
  let var = _chrome-variant-for(surface)
  page(
    width: page-width,
    height: page-height,
    margin: (top: 60pt, bottom: 56pt, left: 40pt, right: 40pt),
    fill: _surface-fill(surface),
    header: _header(running-header, variant: var),
    header-ascent: 24pt,
    footer: _footer(variant: var),
    footer-descent: 16pt,
    body,
  )
}

// ============================================================
// chapter — inline chapter break. Big PT Serif heading.
// First paragraph follows immediately on the same page.
// NO automatic pagebreak.
// ============================================================

#let chapter(title, subtitle: none, number: none) = block(
  above: 72pt,
  below: 40pt,
  breakable: false,  // chapter heading + subtitle stay together
  {
    if number != none {
      styled(type-body-s, [#number], fill: color-core-gray-02, align-h: left, width: 720pt)
      v(8pt)
    }
    styled(("PT Serif", 56pt, 115%), [#title], fill: color-core-black, align-h: left, width: 720pt)
    if subtitle != none {
      v(16pt)
      styled(type-body-l, [#subtitle], fill: color-core-gray-02, align-h: left, width: 720pt)
    }
  }
)

// ============================================================
// subhead — block-level subhead inside body flow.
// PT Serif 28pt, left-aligned, breath above + below.
// ============================================================

#let subhead(text) = block(
  above: 48pt,
  below: 20pt,
  styled(type-heading-m, [#text], fill: color-core-black, align-h: left, width: 720pt)
)

// ============================================================
// stat-inline — hero number that lives inside the body column.
// For when the stat punctuates a paragraph but doesn't earn a full page.
// ============================================================

#let stat-inline(number, label, accent: color-core-teal) = block(
  above: 32pt,
  below: 32pt,
  {
    grid(
      columns: (auto, 1fr),
      column-gutter: 32pt,
      align: (left + horizon, left + horizon),
      styled(("PT Serif", 96pt, 100%), [#number], fill: accent, align-h: left),
      styled(type-body-l, [#label], fill: color-core-black, align-h: left),
    )
  }
)

// ============================================================
// stat-page — standalone full-page stat. Use only when the
// editorial moment earns the breath.
// ============================================================

#let stat-page(number, headline: "", paragraph: none, source: none, accent: color-core-teal) = page(
  width: page-width,
  height: page-height,
  margin: default-margin,
  fill: color-core-white,
  header: none,
  footer: _footer(variant: "primary"),
  footer-descent: 0pt,
  {
    v(1fr)
    align(center, {
      styled(("PT Serif", 220pt, 100%), [#number], fill: accent, align-h: center, width: 100%)
      v(40pt)
      if headline != "" {
        styled(("PT Serif", 32pt, 120%), [#headline], fill: color-core-black, align-h: center, width: 540pt)
      }
      if paragraph != none {
        v(20pt)
        styled(type-body-l, [#paragraph], fill: color-core-gray-02, align-h: center, width: 540pt)
      }
      if source != none {
        v(16pt)
        styled(type-caption, [#source], fill: color-core-gray-02, align-h: center, width: 540pt)
      }
    })
    v(1fr)
  }
)

// ============================================================
// dropquote — inline larger-format quote within the body column.
// Editorial emphasis without breaking the page.
// ============================================================

#let dropquote(text) = block(
  above: 32pt,
  below: 32pt,
  inset: (left: 24pt),
  stroke: (left: 4pt + color-core-teal),
  styled(("PT Serif", 24pt, 135%), [#text], fill: color-core-teal, align-h: left, width: 696pt)
)

// ============================================================
// pull-page — standalone off-white spread with the quote.
// Use only when the quote earns its own page.
// ============================================================

#let pull-page(quote) = page(
  width: page-width,
  height: page-height,
  margin: default-margin,
  fill: color-core-off-white,
  header: none,
  footer: _footer(variant: "primary"),
  footer-descent: 0pt,
  {
    v(1fr)
    grid(
      columns: (57pt, 643pt),
      column-gutter: 20pt,
      align: (left + top, left + top),
      styled(("PT Serif", 120pt, 100%), [\u{201C}], fill: color-core-teal, align-h: left),
      styled(("PT Serif", 36pt, 135%), [#quote], fill: color-core-teal, align-h: left, width: 643pt),
    )
    v(1fr)
  }
)

// ============================================================
// data-grid — table-style block that flows inline.
// rows: array of dicts with `service`, `value`, `notes` keys
// (or pass a `cols` config for custom column structure).
// ============================================================

#let data-grid(header: none, intro: none, rows: ()) = block(
  above: 32pt,
  below: 32pt,
  breakable: false,
  {
    if header != none {
      styled(type-heading-m, [#header], fill: color-core-black, align-h: left, width: 720pt)
      v(12pt)
    }
    if intro != none {
      styled(type-body-default, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
      v(20pt)
    }
    block(width: 720pt, height: 1pt, fill: color-core-gray-02)
    v(8pt)
    grid(
      columns: (200pt, 200pt, 1fr),
      column-gutter: 20pt,
      align: (left + top, left + top, left + top),
      styled(type-body-s, [Service], fill: color-core-gray-02, align-h: left),
      styled(type-body-s, [Retention], fill: color-core-gray-02, align-h: left),
      styled(type-body-s, [Notes], fill: color-core-gray-02, align-h: left),
    )
    v(8pt)
    block(width: 720pt, height: 1pt, fill: color-core-gray-01)
    v(10pt)
    for row in rows {
      grid(
        columns: (200pt, 200pt, 1fr),
        column-gutter: 20pt,
        align: (left + top, left + top, left + top),
        styled(type-body-default, [#row.service], fill: color-core-black, align-h: left, width: 200pt),
        styled(type-body-default, [#row.value], fill: color-core-black, align-h: left, width: 200pt),
        styled(type-body-s, [#row.notes], fill: color-core-gray-02, align-h: left),
      )
      v(8pt)
      block(width: 720pt, height: 1pt, fill: color-core-gray-01)
      v(10pt)
    }
  }
)

// ============================================================
// compare-cols — 3-column comparison that flows inline.
// items: array of dicts with `title` and `body` keys.
// ============================================================

#let compare-cols(header: none, intro: none, items: ()) = block(
  above: 32pt,
  below: 32pt,
  breakable: true,
  {
    if header != none {
      styled(type-heading-m, [#header], fill: color-core-black, align-h: left, width: 720pt)
      v(12pt)
    }
    if intro != none {
      styled(type-body-default, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
      v(24pt)
    }
    let n = items.len()
    let col-w = if n == 2 { 340pt } else if n == 3 { 213pt } else if n == 4 { 165pt } else { 720pt / n - 20pt }
    let cell(c) = block(width: col-w, {
      styled(type-heading-m, [#c.title], fill: color-core-black, align-h: left, width: col-w)
      v(12pt)
      styled(type-body-s, [#c.body], fill: color-core-black, align-h: left, width: col-w)
    })
    grid(
      columns: (col-w,) * n,
      column-gutter: (720pt - col-w * n) / (n - 1),
      ..items.map(cell),
    )
  }
)

// ============================================================
// audit-block — header + time chip + numbered steps.
// Flows inline; doesn't force its own page.
// ============================================================

#let audit-block(number: "", title: "", time-estimate: "", steps: ()) = block(
  above: 40pt,
  below: 32pt,
  breakable: true,
  {
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
    v(12pt)
    styled(type-heading-m, [#title], fill: color-core-black, align-h: left, width: 720pt)
    v(20pt)
    for (i, step) in steps.enumerate() {
      block(below: 12pt, {
        grid(
          columns: (28pt, 1fr),
          column-gutter: 12pt,
          align: (left + top, left + top),
          styled(type-body-default, [#(i + 1).], fill: color-signal-go, align-h: left),
          styled(type-body-default, [#step], fill: color-core-black, align-h: left),
        )
      })
    }
  }
)

// ============================================================
// list-block — inline numbered or bulleted list.
// kind: "numbered" | "bulleted" | "checklist"
// ============================================================

#let list-block(kind: "bulleted", items: ()) = block(
  above: 24pt,
  below: 24pt,
  breakable: true,
  {
    for (i, item) in items.enumerate() {
      block(below: 10pt, {
        grid(
          columns: (28pt, 1fr),
          column-gutter: 12pt,
          align: (left + top, left + top),
          if kind == "numbered" {
            styled(type-body-default, [#(i + 1).], fill: color-signal-go, align-h: left)
          } else if kind == "checklist" {
            box(height: 27pt, align(left + horizon, rect(width: 16pt, height: 16pt, fill: color-signal-go, stroke: none, radius: radius-xs)))
          } else {
            box(height: 27pt, align(left + horizon, ellipse(width: 8pt, height: 8pt, fill: color-signal-go, stroke: none)))
          },
          styled(type-body-default, [#item], fill: color-core-black, align-h: left),
        )
      })
    }
  }
)

// ============================================================
// faq-block — Q&A pairs that flow inline
// ============================================================

#let faq-block(pairs: ()) = block(
  above: 24pt,
  below: 24pt,
  breakable: true,
  {
    for pair in pairs {
      block(below: 24pt, breakable: false, {
        styled(type-heading-m, [#pair.q], fill: color-core-black, align-h: left, width: 720pt)
        v(10pt)
        styled(type-body-default, [#pair.a], fill: color-core-black, align-h: left, width: 720pt)
      })
    }
  }
)

// ============================================================
// sources-block — numbered citations that flow inline
// ============================================================

#let sources-block(header: "Sources", sources: ()) = block(
  above: 32pt,
  below: 32pt,
  breakable: true,
  {
    styled(type-heading-l, [#header], fill: color-core-black, align-h: left, width: 720pt)
    v(20pt)
    for (i, src) in sources.enumerate() {
      block(below: 10pt, breakable: false, {
        grid(
          columns: (28pt, 1fr),
          column-gutter: 12pt,
          align: (right + top, left + top),
          styled(type-body-s, [#(i + 1)], fill: color-core-gray-02, align-h: right),
          styled(type-body-s, [#src], fill: color-core-black, align-h: left),
        )
      })
    }
  }
)

// ============================================================
// toc-block — table of contents that flows inline
// ============================================================

#let toc-block(header: "Contents", entries: ()) = block(
  above: 32pt,
  below: 32pt,
  breakable: true,
  {
    styled(("PT Serif", 56pt, 115%), [#header], fill: color-core-gray-01, align-h: left, width: 720pt)
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
  }
)

// ============================================================
// divider — a deliberate visual break (rule or space)
// ============================================================

#let divider(style: "rule") = {
  if style == "rule" {
    block(above: 24pt, below: 24pt, block(width: 720pt, height: 1pt, fill: color-core-gray-01))
  } else if style == "space-large" {
    v(80pt)
  } else {
    v(40pt)
  }
}

// ============================================================
// back-cover — closing page with optional imprint footer.
// Imprint replaces the standalone copyright page.
// ============================================================

#let back-cover(
  closing: "",
  url: none,
  imprint: none,
  surface: "teal",
) = {
  let lockup-variant = if surface == "teal" or surface == "black" { "light" }
    else { "primary" }
  let lockup-path = if lockup-variant == "light" { "../../assets/logo/lockup-light.svg" } else { "../../assets/logo/lockup-primary.svg" }
  let title-fill = if surface == "teal" or surface == "black" { color-core-off-white } else { color-core-black }
  let muted-fill = if surface == "teal" or surface == "black" { color-core-gray-01 } else { color-core-gray-02 }
  page(
    width: page-width,
    height: page-height,
    margin: 0pt,
    fill: _surface-fill(surface),
    header: none,
    footer: none,
    {
      place(top + left, dx: 60pt, dy: 60pt,
        image(lockup-path, width: 148pt, height: 40pt)
      )
      place(bottom + left, dx: 60pt, dy: -60pt,
        block(width: 680pt, {
          styled(("PT Serif", 32pt, 130%), [#closing], fill: title-fill, align-h: left, width: 680pt)
          if url != none {
            v(20pt)
            styled(("Lato", 18pt, 150%), [#url], fill: title-fill, align-h: left, width: 680pt)
          }
          if imprint != none {
            v(40pt)
            block(width: 680pt, height: 1pt, fill: muted-fill)
            v(16pt)
            styled(type-caption, [#imprint], fill: muted-fill, align-h: left, width: 680pt)
          }
        })
      )
    }
  )
}

// ============================================================
// section-opener — dramatic full-bleed page for major chapter
// transitions. Reserved for editorial moments that earn it.
// number: e.g. "Section one"
// title: chapter title
// epigraph: optional supporting line below title
// surface: "teal" | "black" | "off-white" | "white" | "dark-earth"
// ============================================================

#let section-opener(
  number: "",
  title: "",
  epigraph: none,
  surface: "teal",
) = {
  let title-fill = if surface == "teal" or surface == "black" or surface == "dark-earth" or surface == "premium-purple" or surface == "rich-blue" { color-core-white } else { color-core-black }
  let muted-fill = if surface == "teal" or surface == "black" or surface == "dark-earth" or surface == "premium-purple" or surface == "rich-blue" { color-core-gray-01 } else { color-core-gray-02 }
  let rule-fill = if surface == "teal" or surface == "black" or surface == "dark-earth" or surface == "premium-purple" or surface == "rich-blue" { color-core-gray-01 } else { color-core-gray-01 }
  page(
    width: page-width,
    height: page-height,
    margin: 0pt,
    fill: _surface-fill(surface),
    header: none,
    footer: none,
    {
      place(top + left, dx: 60pt, dy: 60pt,
        block(width: 680pt, {
          styled(("Lato", 16pt, 100%), [#number], fill: muted-fill, align-h: left, width: 680pt)
        })
      )
      place(bottom + left, dx: 60pt, dy: -80pt,
        block(width: 680pt, {
          block(width: 80pt, height: 2pt, fill: rule-fill)
          v(40pt)
          styled(("PT Serif", 80pt, 110%), [#title], fill: title-fill, align-h: left, width: 680pt)
          if epigraph != none {
            v(32pt)
            styled(("PT Serif", 24pt, 140%), [#epigraph], fill: muted-fill, align-h: left, width: 600pt)
          }
        })
      )
    }
  )
}

// ============================================================
// takeaways — boxed panel summarising a section's 2-4 key points.
// Flows inline at end of section. Off-white surface, teal accent.
// ============================================================

#let takeaways(header: "Takeaways", items: ()) = block(
  above: 56pt,
  below: 40pt,
  breakable: false,
  width: 720pt,
  inset: (top: 32pt, right: 32pt, bottom: 32pt, left: 32pt),
  fill: color-core-off-white,
  radius: radius-2xl,
  {
    grid(
      columns: (auto, 1fr),
      column-gutter: 16pt,
      align: (left + horizon, left + horizon),
      block(width: 28pt, height: 2pt, fill: color-core-teal),
      styled(("Lato", 14pt, 100%), [#header], fill: color-core-teal, align-h: left, tracking: 1pt),
    )
    v(20pt)
    for (i, item) in items.enumerate() {
      block(below: 16pt, breakable: false, {
        grid(
          columns: (32pt, 1fr),
          column-gutter: 16pt,
          align: (left + top, left + top),
          styled(("PT Serif", 24pt, 130%), [#(i + 1)], fill: color-core-teal, align-h: left),
          styled(type-body-default, [#item], fill: color-core-black, align-h: left),
        )
      })
    }
  }
)

// ============================================================
// model-grid — 4-up cards for showcasing a parallel set of options.
// Each card is a content block with title + body, on alternating
// surface tints to reinforce the visual rhythm.
// items: array of dicts with `title`, `body`, optional `accent`
// ============================================================

#let model-grid(header: none, intro: none, items: ()) = block(
  above: 40pt,
  below: 40pt,
  breakable: true,
  {
    if header != none {
      styled(type-heading-m, [#header], fill: color-core-black, align-h: left, width: 720pt)
      v(12pt)
    }
    if intro != none {
      styled(type-body-default, [#intro], fill: color-core-gray-02, align-h: left, width: 720pt)
      v(28pt)
    }
    let card(item, idx) = {
      let bg = if calc.rem(idx, 2) == 0 { color-core-off-white } else { color-core-white }
      let stroke-spec = if calc.rem(idx, 2) == 1 { 1pt + color-core-gray-01 } else { none }
      block(
        width: 350pt,
        inset: (top: 28pt, right: 28pt, bottom: 28pt, left: 28pt),
        fill: bg,
        stroke: stroke-spec,
        radius: radius-xl,
        breakable: false,
        {
          if "label" in item and item.label != none {
            styled(("Lato", 14pt, 100%), [#item.label], fill: color-core-teal, align-h: left, tracking: 1pt)
            v(12pt)
          }
          styled(("PT Serif", 28pt, 120%), [#item.title], fill: color-core-black, align-h: left, width: 294pt)
          v(16pt)
          styled(type-body-s, [#item.body], fill: color-core-black, align-h: left, width: 294pt)
        }
      )
    }
    grid(
      columns: (350pt, 350pt),
      column-gutter: 20pt,
      row-gutter: 20pt,
      ..items.enumerate().map(((i, it)) => card(it, i)),
    )
  }
)

// ============================================================
// hero-stats — 2 to 4 stats in a panel, hero treatment.
// items: array of dicts with `value`, `label`, optional `source`
// ============================================================

#let hero-stats(header: none, items: (), surface: "off-white") = block(
  above: 48pt,
  below: 48pt,
  breakable: false,
  width: 720pt,
  inset: (top: 40pt, right: 40pt, bottom: 40pt, left: 40pt),
  fill: _surface-fill(surface),
  radius: radius-2xl,
  {
    let value-fill = color-core-teal
    let label-fill = if surface == "teal" or surface == "black" { color-core-white } else { color-core-black }
    let source-fill = if surface == "teal" or surface == "black" { color-core-gray-01 } else { color-core-gray-02 }
    if header != none {
      styled(("Lato", 14pt, 100%), [#header], fill: source-fill, align-h: left, tracking: 1pt)
      v(20pt)
    }
    let n = items.len()
    let col-w = (640pt - (n - 1) * 32pt) / n
    let cell(it) = block(width: col-w, {
      styled(("PT Serif", 80pt, 100%), [#it.value], fill: value-fill, align-h: left, width: col-w)
      v(16pt)
      styled(type-body-default, [#it.label], fill: label-fill, align-h: left, width: col-w)
      if "source" in it and it.source != none {
        v(8pt)
        styled(type-caption, [#it.source], fill: source-fill, align-h: left, width: col-w)
      }
    })
    grid(
      columns: (col-w,) * n,
      column-gutter: 32pt,
      ..items.map(cell),
    )
  }
)

// ============================================================
// chart — embed a pre-rendered chart SVG/PNG into an ebook page
//
// The chart asset itself is generated by `renderers/vega-lite/compose.mjs`
// from a `*.chart.json` fixture. This primitive wraps the rendered SVG
// at the right page-width measure and optionally adds a figure caption.
//
// Per chunks/chart.md R-CHART-001..007, the chart-card chrome (frame,
// gradient surface, header, footer) is already inside the SVG — this
// primitive only sizes and captions it.
//
// Sizing convention:
//   measure: "1-col" (640pt — default body content width)
//             "2-col" (300pt — for paired charts in a 2-column page)
//             "wide"  (720pt — for charts that earn the breath)
//
// Caption convention:
//   - kind:    "fig" — "Fig. N.M — Title"  (signal-go label, like figure-caption interior page)
//              "none" — no caption (the chart's own header carries it)
//   - When kind is "fig", caption appears above the chart in Lato 12pt signal-go.
//   - When the chart's own header (PT Serif 40 + Lato 14) carries the title,
//     prefer kind: "none" to avoid double-titling. Use kind: "fig" only when
//     the chart-card has no header (e.g., a chart embedded inline that should
//     defer titling to the surrounding page narrative).
// ============================================================

#let chart(
  path,
  measure: "1-col",
  caption: none,
  caption-kind: "none",
  fig-number: none,
) = block(
  breakable: false,
  width: 100%,
  {
    let target-width = if measure == "2-col" { 300pt }
                        else if measure == "wide" { 720pt }
                        else { 640pt }

    if caption-kind == "fig" and caption != none {
      let label-text = if fig-number != none { "Fig. " + fig-number + " — " + caption } else { caption }
      styled(type-caption, [#label-text], fill: color-signal-go, align-h: left, width: target-width)
      v(8pt)
    }

    image(path, width: target-width)

    // Source caption is part of the chart's own SVG footer per R-CHART-003.
    // Optional supplementary caption below (rare — for in-document context).
    if caption-kind == "fig" and caption == none and fig-number != none {
      v(8pt)
      styled(type-caption, ["Fig. " + fig-number], fill: color-signal-go, align-h: left, width: target-width)
    }
  }
)
