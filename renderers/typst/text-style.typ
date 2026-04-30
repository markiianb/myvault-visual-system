// text-style.typ — typography helpers that enforce family + size + line-height per role.
// Templates call these instead of raw text() — guarantees LH compliance with Figma.

#import "tokens.typ": *

// Convert a typography tuple (family, size, lh-pct) into proper text + leading.
// `align-h` accepts: left, center, right
//
// Centering rule (Mark's principle):
//   When align-h is center or right AND width is explicit (narrower than parent),
//   the BLOCK is also centered/right-aligned in its parent so the text-center
//   aligns with the page-center. Without this, a 540pt centered-text block in a
//   720pt parent sits LEFT-anchored and the text-center is 90pt left of page-center.
//
// Usage: #styled(type-display-m, [Title text], fill: white, align-h: center)
#let styled(style, body, fill: black, align-h: left, width: auto, tracking: 0pt) = {
  let (family, size, lh-pct) = style
  // Typst leading = total_line_height - font_size = (LH% - 100%) * size
  let leading-amt = size * (lh-pct - 100%)
  let inner = block(
    width: width,
    {
      set par(leading: leading-amt, justify: false, spacing: 0pt)
      set text(font: family, size: size, fill: fill, tracking: tracking)
      if align-h == center { align(center)[#body] }
      else if align-h == right { align(right)[#body] }
      else { [#body] }
    }
  )
  // Center/right-align the block in its parent when an explicit width is set.
  if width != auto and align-h == center { align(center, inner) }
  else if width != auto and align-h == right { align(right, inner) }
  else { inner }
}

// Per-role wrappers — short and explicit at call sites.
#let display-l(body, fill: color-core-black, align-h: left, width: auto) = styled(type-display-l, body, fill: fill, align-h: align-h, width: width)
#let display-m(body, fill: color-core-black, align-h: left, width: auto) = styled(type-display-m, body, fill: fill, align-h: align-h, width: width)
#let display-s(body, fill: color-core-black, align-h: left, width: auto) = styled(type-display-s, body, fill: fill, align-h: align-h, width: width)
#let heading-l(body, fill: color-core-black, align-h: left, width: auto) = styled(type-heading-l, body, fill: fill, align-h: align-h, width: width)
#let heading-m(body, fill: color-core-black, align-h: left, width: auto) = styled(type-heading-m, body, fill: fill, align-h: align-h, width: width)
#let body-xl(body, fill: color-core-black, align-h: left, width: auto) = styled(type-body-xl, body, fill: fill, align-h: align-h, width: width)
#let body-l(body, fill: color-core-black, align-h: left, width: auto) = styled(type-body-l, body, fill: fill, align-h: align-h, width: width)
#let body-default(body, fill: color-core-black, align-h: left, width: auto) = styled(type-body-default, body, fill: fill, align-h: align-h, width: width)
#let body-s(body, fill: color-core-black, align-h: left, width: auto) = styled(type-body-s, body, fill: fill, align-h: align-h, width: width)
#let caption(body, fill: color-core-gray-02, align-h: left, width: auto) = styled(type-caption, body, fill: fill, align-h: align-h, width: width)
