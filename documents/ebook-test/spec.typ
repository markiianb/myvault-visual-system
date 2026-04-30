// Real-content spec v2.1 — "A considered approach to private data"
// Each function call emits exactly one page via Typst's page() element.

#import "../../renderers/typst/myvault-ebook.typ": *

#show: ebook-doc.with(title: "A considered approach to private data")

#cover-t1(
  title: "A considered approach to private data",
  subtitle: "A short deck explaining what the document is about and why it matters to the reader right now.",
)

#title-page(
  title: "A considered approach to private data",
  subtitle: "A short book on time, ownership, and the things you choose to keep",
)

#copyright-page(
  book-title: "A considered approach to private data",
  author: "Markos Symeonides",
  year: "2026",
  disclaimer: "First edition, April 2026. No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or by any means, without the prior written permission of the publisher.",
  publisher: "Published by MyVault. myvault.com",
  isbn: "ISBN 978-0-00-000000-0",
)

#table-of-contents(entries: (
  (title: "The case for architecture", page: "04"),
  (title: "What people actually save", page: "12"),
  (title: "The architecture of trust", page: "24"),
  (title: "Trust is not a feature", page: "32"),
  (title: "The compounding effect", page: "52"),
  (title: "What comes next", page: "68"),
))

#section-opener(
  chapter: "Chapter three",
  title: "The architecture of trust",
  intro: "Every product is a set of decisions about what it will ask of the people who use it. This chapter is about the quiet ones — the architectural choices that compound, year after year, into what people call trust.",
)

#body-page(
  running-header: "Private by Design",
  subhead: "The architecture question",
  [
    The compounding effect shows up years later. A person who trusts a tool will give it more. The more it holds, the more it can help. The more it helps, the deeper the trust becomes. This is why the architecture has to be right on the first day — because the last day will be built on top of it.

    When a person saves their first document into MyVault, they are not just saving a file. They are beginning a relationship with a system that has to earn every minute of attention it receives, every quiet moment of dependence, every piece of information it is given to hold.

    The architecture of the product reflects this. Nothing leaves the user's ownership without a clear and visible reason. Nothing is processed without consent. And when the system gets something wrong, the user's trust is the first thing it tries to repair.
  ],
)

#pull-quote(
  quote: "Trust is not won in the features that delight. It is won in the margins — in the quiet decisions nobody notices until they go wrong.",
)

#stat-page-1(
  number: "168",
  supporting-headline: "online accounts per adult, on average",
  supporting-paragraph: [Every account is a fragment of identity. The archive that holds them all together is the only place a digital life is actually whole.],
  source: "Source: composite of NordPass + Dashlane password-manager studies (2024–2026).",
)

#stat-page-3-teal-mirror(
  stat-1-number: "3×",
  stat-1-label: "more documents safely stored",
  stat-1-copy: [Across four years of MyVault usage, active users store on average three times the number of personal documents they held when they signed up — and retrieve them in under twenty seconds when they need to.],
  stat-2-number: "10×",
  stat-2-label: "more documents safely stored",
  stat-2-copy: [Across four years of MyVault usage, active users store on average three times the number of personal documents they held when they signed up — and retrieve them in under twenty seconds when they need to.],
)

#lists-page(
  header: "Three ways to list",
  bulleted: (
    [Ownership sits with the person.],
    [Nothing is processed without consent.],
    [Every action is visible and reversible.],
  ),
  numbered: (
    [Ask the boring questions first.],
    [Build the architecture around the answers.],
    [Let the features arrive as a consequence.],
  ),
  checklist: (
    [Data ownership is explicit.],
    [Consent is asked for, not assumed.],
    [Deletion is honoured, not deferred.],
    [Changes notify the person first.],
  ),
)

#conclusion(
  title: "Conclusion",
  sign-name: "Markos Symeonides",
  sign-role: "Founder, MyVault",
  [
    Across four years, the question shifted — from how do we keep the data safe, to how do we keep the relationship safe. Safe storage is mostly solved. Safe relationships are not. They are earned, quietly, through a hundred decisions nobody notices until one of them goes wrong.

    This book is about those decisions. The unforced ones. The ones that shape whether a person, four years from now, still trusts you to hold the last thing they would want to lose.
  ],
)

#back-cover(
  closing: "A quiet place to hold the pieces of your life — private by design, yours by architecture.",
  url: "myvaultai.com",
  copyright: "© MyVault 2026 · Private by design, zero trust by architecture",
)
