// all-assets-integration-test — proves the chart, stat-infographic, and diagram chunks
// all compose with the ebook chunk.
//
// Chart: horizontal-bar (where-time-goes)
// Stat infographic: 3-up (onboarding-stats)
// Flow diagram: agentic memory pipeline

#import "../../renderers/typst/myvault-editorial.typ": *

#show: editorial-doc.with(title: "MyVault — three asset types")

#cover(
  title: "The case for clean filing",
  subtitle: "A short walk through where time goes, what guidance does, and how the system actually works.",
  author: "MyVault — visual system test",
  surface: "teal",
  title-size: 64pt,
)

#flow(running-header: "The case for clean filing")[

  #chapter(
    "Where the time goes",
    subtitle: "Most file work isn't filing — it's searching, renaming, restoring.",
  )

  When we asked twelve hundred people how they spend the average week with their digital paperwork, the picture was lopsided. The biggest activity was searching for things they had already saved. Renaming and refiling came next. Actual *filing* was the smallest slice.

  #chart("/documents/all-assets-integration-test/charts/where-time-goes.svg", measure: "wide")

  This is the architecture problem MyVault was built to solve. Not a better folder. Not a smarter naming scheme. A system that does the routing once, correctly, so the searching and the renaming go away.

  #chapter(
    "What setup looks like",
    subtitle: "Three numbers from the first cohort.",
  )

  Setup is a load-bearing moment. People who get through it tend to keep using the product. People who stall tend not to. Across our first cohort, completion shifted dramatically with the level of guidance. The shape of those numbers:

  #stat-infographic("/documents/all-assets-integration-test/charts/onboarding-stats.svg", measure: "wide")

  The lesson isn't that more guidance is always better. It's that the architecture of the first half hour predicts the next year. Get that right and the rest follows.

  #chapter(
    "How a memory gets written",
    subtitle: "What happens between a task and a saved fact.",
  )

  Behind the simple "save this" action sits a small pipeline. The agent reads the task and the prompt, picks the moments worth remembering, packages them into a structured payload, and hands them to the memory API. The API writes them to the database. The diagram below shows the path.

  #diagram("/documents/all-assets-integration-test/charts/memory-pipeline.svg", measure: "wide")

  The dashed lines mark optional / inferred relationships — the tool call and the iteration are inputs the agent uses to decide what matters, not data on the main write path. The solid green lines mark the data flow itself: task in, memory out.

]

#back-cover(
  closing: "Built for the way your files actually live.",
  url: "myvault.com",
  imprint: "© MyVault, 2026",
  surface: "black",
)
