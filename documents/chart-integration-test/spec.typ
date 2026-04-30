// chart-integration-test — proves the chart asset-type chunk integrates with
// the ebook asset-type chunk: charts authored as JSON fixtures, composed to
// SVG by the Vega-Lite renderer, embedded into the PDF via Typst.
//
// See ../../chunks/chart.md for the chart contract,
//     ../../chunks/ebook.md for the ebook contract,
//     build.sh for the two-step build.

#import "../../renderers/typst/myvault-editorial.typ": *

#show: editorial-doc.with(title: "Chart integration test")

#cover(
  title: "The case for clean filing",
  subtitle: "A short walk through where time goes and how the right system gives it back.",
  author: "MyVault — chart integration test",
  surface: "teal",
  title-size: 64pt,
)

#flow(running-header: "The case for clean filing")[

  #chapter(
    "Where the time goes",
    subtitle: "Most file work isn't filing — it's searching, renaming, restoring.",
  )

  When we asked twelve hundred people how they spend the average week with their digital paperwork, the picture was lopsided. The single biggest activity was searching for things they had already saved. Renaming and refiling came next. Actual *filing* — putting something where it goes the first time — was the smallest slice of the hours.

  #chart("/documents/chart-integration-test/charts/where-time-goes.svg", measure: "wide")

  This is the architecture problem MyVault was built to solve. Not a better folder. Not a smarter naming scheme. A system that does the routing once, correctly, so the searching and the renaming go away.

  #subhead("What the numbers say")

  Eighteen hours a week. That is a full part-time job spent looking for things you've already saved. Even if the survey is generous and the real number is half — nine hours a week is still a meaningful slice of someone's working life. We treat that as the baseline. The goal isn't to make searching faster; it's to make it unnecessary.

  #chapter(
    "What setup looks like with help",
    subtitle: "Onboarding completion changes the shape of the rest of the year.",
  )

  Setup is a load-bearing moment. People who get through it tend to keep using the product. People who stall tend not to. Across our first cohort, the rate of completion changed dramatically with the level of guidance. Without any assistance, just under half of users finished. With prompts and a structured checklist, more than half made it through. With the full guided setup — including a brief walk-through of the privacy and ownership architecture — almost everyone got there.

  #chart("/documents/chart-integration-test/charts/setup-completion.svg", measure: "wide")

  The lesson isn't that more guidance is always better. It's that the architecture of the first half hour is what predicts the next year. Get that right and the rest follows.

]

#back-cover(
  closing: "Built for the way your files actually live.",
  url: "myvault.com",
  imprint: "© MyVault, 2026",
  surface: "black",
)
