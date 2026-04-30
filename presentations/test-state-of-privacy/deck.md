---
marp: true
theme: myvault-presentation
size: 1920x1080
paginate: false
---

<!-- _class: cover -->

<div class="anchor"></div>

<div class="body">

# The State of Family Privacy in 2026

## What we learned building for the household, not the user.

</div>

<div class="speaker">Markos Symeonides   ·   Founder, MyVault   ·   IAPP Global Privacy Summit</div>

---
<!-- _class: statement -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Opening</span>
</div>

<div class="body">

# Privacy was a product question. It is becoming a household question.

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>02</span>
</div>

---
<!-- _class: problem -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Problem</span>
</div>

<div class="body">

# The household is the new edge.

<div class="problem-rows">

<div class="problem-row">
<div class="label-col">Fragmentation.</div>
<div class="body-col">A typical household manages 72+ online accounts and stores critical documents across 4–6 cloud services. Insurance in email. Wills in a lawyer's drawer. Photos buried across drives.</div>
</div>

<div class="problem-row">
<div class="label-col">Trust collapse.</div>
<div class="body-col">Mainstream AI assistants read private files in order to train on them. The tools designed to help require households to surrender what they own.</div>
</div>

<div class="problem-row">
<div class="label-col">Crisis fragility.</div>
<div class="body-col">When something goes wrong — identity stolen, parent's diagnosis, estate triggered — families spend weeks hunting documents that should be one search away.</div>
</div>

</div>

<div class="closing-line">Three different problems. One missing solution: software that treats the household as the unit, not the user.</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>03</span>
</div>

---
<!-- _class: three-shifts -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Why Now</span>
</div>

<div class="body">

# Three shifts make this the moment.

<div class="shifts">

<div class="card">
<div class="heading">AI is reliable enough to reason over private documents.</div>
<div class="body-text">Foundation-model accuracy on domain-specific document analysis crossed the usable threshold in 2024–25.</div>
</div>

<div class="card">
<div class="heading">Privacy is no longer niche.</div>
<div class="body-text">Twelve US state privacy laws active or scheduled by 2025; post-scandal consumer wariness is mainstream.</div>
</div>

<div class="card">
<div class="heading">Zero Trust is buildable at consumer scale.</div>
<div class="body-text">Per-user customer-managed keys, serverless processing, isolated tenancy — startup-affordable.</div>
</div>

</div>

<div class="closing-line">Each shift on its own would be useful. Together they make this the moment a household-grade system can ship.</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>04</span>
</div>

---
<!-- _class: architecture -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Architecture</span>
</div>

<div class="body">

# Zero Trust is the architecture, not the marketing.

<p>Files are processed in isolation, encrypted at rest with per-user keys customers control, and never used to train any model. If any single layer is breached, every other layer still protects the data.</p>

<div class="arch-stack">

<div class="layer">
<div class="label-col">Device.</div>
<div class="body-col">TLS 1.3 in transit. Customer keys never leave the device unprotected.</div>
</div>

<div class="layer">
<div class="label-col">Processing.</div>
<div class="body-col">Short-lived, scoped, audited. Data is readable only during the work.</div>
</div>

<div class="layer">
<div class="label-col">Keys.</div>
<div class="body-col">AWS KMS, per-user, customer-controlled. Revocable at any time.</div>
</div>

<div class="layer">
<div class="label-col">Storage.</div>
<div class="body-col">Encrypted at rest. Isolated tenancy. Never enters a training pipeline.</div>
</div>

</div>

<div class="closing-line">If the policy can't be verified by the architecture, it isn't a guarantee.</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>05</span>
</div>

---
<!-- _class: stat-hero -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>The Number</span>
</div>

<div class="body">

<div class="hero-number">72+</div>

<div class="headline">online accounts in a typical household.</div>

<div class="supporting">And growing 12% year over year. Each one a credential, a document, a memory, a vulnerability — and an entry point for a system that should hold all of them safely.</div>

<div class="source">Source · MyVault internal data + Pew 2025 household digital footprint study.</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>06</span>
</div>

---
<!-- _class: comparison -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Approaches</span>
</div>

<div class="body">

# How four approaches handle family data.

<table>
<thead>
<tr>
<th></th>
<th class="myvault">MyVault</th>
<th>Trustworthy</th>
<th>Lumo (Proton)</th>
<th>Generic AI</th>
</tr>
</thead>
<tbody>
<tr>
<td>Family-context AI</td>
<td class="myvault"><span class="ball full"></span></td>
<td><span class="ball partial"></span></td>
<td><span class="ball none"></span></td>
<td><span class="ball partial"></span></td>
</tr>
<tr>
<td>Zero Trust architecture</td>
<td class="myvault"><span class="ball full"></span></td>
<td><span class="ball partial"></span></td>
<td><span class="ball partial"></span></td>
<td><span class="ball none"></span></td>
</tr>
<tr>
<td>Estate / inheritance built-in</td>
<td class="myvault"><span class="ball full"></span></td>
<td><span class="ball full"></span></td>
<td><span class="ball none"></span></td>
<td><span class="ball none"></span></td>
</tr>
<tr>
<td>Multi-cloud ingest</td>
<td class="myvault"><span class="ball full"></span></td>
<td><span class="ball partial"></span></td>
<td><span class="ball none"></span></td>
<td><span class="ball partial"></span></td>
</tr>
<tr>
<td>No-training-data guarantee</td>
<td class="myvault"><span class="ball full"></span></td>
<td><span class="ball full"></span></td>
<td><span class="ball full"></span></td>
<td><span class="ball none"></span></td>
</tr>
</tbody>
</table>

<div class="legend">
<span class="ball full"></span><span>full</span>
<span class="ball partial"></span><span>partial</span>
<span class="ball none"></span><span>none</span>
<span> · </span>
<span>Axes are the four questions families and privacy practitioners ask first.</span>
</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>07</span>
</div>

---
<!-- _class: thesis -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Lessons</span>
</div>

<div class="body">

# Five things we've learned building for the household.

<div class="lessons">

<div class="row">
<div class="lesson"><div class="num">01</div><div class="text">The household is the unit, not the user. Treat shared documents and shared decisions as first-class.</div></div>
<div class="lesson"><div class="num">02</div><div class="text">Crises are when the system has to work. Build for the worst day, not the average day.</div></div>
<div class="lesson"><div class="num">03</div><div class="text">The agent must be domain-aware. Generic AI fails at specialized recall.</div></div>
</div>
<div class="row center">
<div class="lesson"><div class="num">04</div><div class="text">Architecture is the moat. Marketing-layer privacy promises cannot be verified.</div></div>
<div class="lesson"><div class="num">05</div><div class="text">Trust is earned across years, lost in a session. Calm operation is a feature.</div></div>
</div>

</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>08</span>
</div>

---
<!-- _class: action -->

<div class="chrome-top">
<span>Privacy Summit · 2026</span>
<span>Action</span>
</div>

<div class="body">

# If you're building for families, here's where to start.

<div class="actions">

<div class="action-block">
<div class="heading">Treat the household as a tenant.</div>
<div class="body-text">One vault per family. Shared keys, shared access controls. Households are not a row in your users table.</div>
</div>

<div class="action-block">
<div class="heading">Make encryption the contract.</div>
<div class="body-text">Per-user keys customers control should be the default, not the upsell. Architectural privacy survives the next breach; marketing privacy doesn't.</div>
</div>

<div class="action-block">
<div class="heading">Surface the architecture.</div>
<div class="body-text">Show the layers — diagrams, audits, key custody — not just the policy. Privacy decided in the diagram is privacy customers can verify.</div>
</div>

</div>

<div class="closing-line">We'd rather you build it than us alone.</div>

</div>

<div class="chrome-bottom">
<span class="brand-mark"></span>
<span>09</span>
</div>

---
<!-- _class: closing -->

<div class="body">

# Built on calm.<br>Private AI for the things that matter most.

<div class="speaker">Markos Symeonides   ·   markos@myvault.ai   ·   myvaultai.com</div>

<div class="period"></div>

</div>
