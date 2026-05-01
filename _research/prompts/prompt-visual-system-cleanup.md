---
type: cleanup-prompt
status: ready
owner: mark
created: 2026-04-30
purpose: "Single-session cleanup of /Users/mark_b/Documents/Business/MyVault/10-Brand/visual-system/ to make it presentable to team members. Remove scratch, keep canon."
---

# Cleanup — visual-system/ for team review

## Goal

Make `/Users/mark_b/Documents/Business/MyVault/10-Brand/visual-system/` presentable to team members. A teammate opening any directory should see canon, not scratch. No abandoned drafts, no version-numbered intermediate folders, no superseded prompts.

## Principle

**Keep the canon. Delete the path that got us there.** If a file is the final version of something we shipped, keep it. If it was an intermediate step or experiment that's been superseded, delete it.

When in doubt about a single file, read its first 30 lines. If it's marked "superseded", "draft", "v1", "intermediate", "scratch", or has a date older than another file with the same purpose — delete it.

## Verdicts (start here, then verify against the filesystem)

### `documents/ebook-test/` — heaviest cleanup target

- **Keep**: `privacy-guide.pdf`, `privacy-guide-spec.typ`, `privacy-pages-v4/`, `workflow.md`, `figma-reference.md`, `figma-reference/`, `README.md` (verify it's accurate; rewrite if stale).
- **Delete**: `privacy-pages/`, `privacy-pages-v3/`, `pages/`, `pages-v2/`, `output.pdf`, `output-v2.pdf`, `spec.typ`, `comparison.md`, `cycle2-findings.md`. These are all intermediate.

### `_research/` — consolidate

- **Keep**: `findings-html-vs-typst-quicktest.md`, `prompt-social-asset-build.md` (the Satori one), `research-prompt-html-first-stack.md`, `html-css-test/ebook/`, `html-css-test/social/`, `html-css-test/fonts/`.
- **Delete**: `research-prompt-typst-vs-html-css.md` (superseded by the html-first-stack version), `prompt-visual-system-cleanup.md` (this file — delete after running).
- **Verify and decide**: any `html-first-test/` directory — if empty or duplicate of `html-css-test/`, delete.

### `chunks/`

- **Keep**: `ebook.md` (v1.3), `presentation.md`, `_manifest.yaml`.
- **Verify**: `_research/` subdir under chunks — if it contains scratch from an earlier exploration, delete; if it has reference material still useful, keep.

### `renderers/typst/`

- **Keep**: `myvault-editorial.typ` (active), `text-style.typ`, `tokens.typ`, `build-tokens.sh`, `fonts/`.
- **Decide with the user before deleting**: `myvault-ebook.typ` (legacy page-stamp template; chunk v1.3 lists it as `legacy_template_path`). If user confirms no documents use it, delete; otherwise keep with a header comment marking it deprecated.

### `_plan/`

- **Keep**: all four files (`03-brand-design-vs-ui-system.md`, `04-token-storage-plan.md`, `visual-system-architecture-v2.md`, `visual-system-pipeline-plan.md`, `claude-handoff-prompt.md`).
- **Action**: at the top of `visual-system-pipeline-plan.md` add a 2-line note: "Partially superseded — chunks layer dropped for web-shaped renderers (Satori, future React Email). See `_research/findings-html-vs-typst-quicktest.md`. Typst path (ebook chunk v1.3) is canonical."

### Cross-cutting

1. After deletions, write `README.md` at `visual-system/` root (~30 lines): what this directory is, the canonical pieces (privacy guide PDF, editorial primitives, ebook chunk, brand tokens), and the next-step social build (Satori). Link to `_plan/visual-system-architecture-v2.md` for strategic context.
2. After deletions, run `git status` and report what changed. Don't `git add` or commit anything — leave that to Mark.

## Don't touch

- `tokens/brand.tokens.json` — token source-of-truth
- `assets/` — logo SVGs, icons
- `10-Brand/brand-system/` (parent dir) — separate git repo
- Anything outside `10-Brand/visual-system/`

## Deliverable

A clean `visual-system/` directory + a `git status` report showing exactly what was removed. Stop and ask Mark if you find anything ambiguous before deleting it.

Time budget: under 30 minutes.
