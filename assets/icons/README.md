---
type: reference
status: active
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [icons, phosphor, assets, visual-system]
summary: "Operator guide for MyVault's icon library. Documents the Approach C decision: reference Phosphor Icons as a versioned dependency rather than committing 420 SVGs to the vault. The icons-manifest.json is the canonical record of MyVault's curated 210-icon subset — renderers consume Phosphor directly."
---

# Icons — MyVault visual-system

210 curated icons from [Phosphor Icons](https://phosphoricons.com), in 2 weights (Regular + Fill). The vault holds the manifest and rules; **the SVG files themselves are not committed** — renderers consume Phosphor as a versioned dependency.

## Files in this folder

| File | What |
|---|---|
| `icons-manifest.json` | Canonical record of MyVault's curated 210-icon subset. Each entry has Phosphor metadata (categories, tags, codepoint, version), the weights used, and token bindings. Renderers read this to know which icons are sanctioned. |
| `extract.log.json` | Run history — every sync against Phosphor's published metadata + Figma component set. First run lists all 210 under `added[]`. |
| `README.md` | This file. Approach rationale, integration notes, sync procedure. |

**No `assets/icons/regular/*.svg` or `fill/*.svg` directories** — and that's deliberate. See "Why no local SVGs" below.

## What we use

- **Library:** `@phosphor-icons/core` v2.x ([phosphoricons.com](https://phosphoricons.com), [github](https://github.com/phosphor-icons/core))
- **Curated subset:** 210 icons (out of Phosphor's ~1,500)
- **Weights used:** `regular` and `fill` only. Phosphor offers `thin`, `light`, `bold`, and `duotone` too — we don't use those (aligns with our "Regular weights only" typography canon)
- **Default weight:** `regular`
- **Default size:** 24×24 px (Phosphor's native unit)
- **Default color:** `color.icon.default` (alias to `color.core.black`, see `tokens/brand.tokens.json`)

The full curated list lives in `icons-manifest.json` under `icons.*`.

## Why no local SVGs (Approach C rationale)

Logos are different from icons. We *made* the logo (Mark designed Icon, Wordmark, Lockup) — the vault is the canonical source. We *imported* Phosphor — Phosphor's repo is the canonical source. Storing 420 SVGs of an externally-owned library in our git repo would be:

- **Duplication** of the canonical Phosphor distribution (~1 MB)
- **Drift risk** — if Phosphor publishes a path improvement, our copies go stale
- **Lock-in to Figma export artifacts** — Mark's Figma import has clipPath wrappers, hardcoded `fill="black"`, and broken-up paths. Phosphor's official SVGs use `fill="currentColor"` (color-inheritable), single-path forms, `viewBox="0 0 256 256"` (cleaner). The Phosphor source is technically superior to anything we'd export from Figma.

So we treat Phosphor as a **versioned dependency**, not a fork. The manifest is our curation record (which 210 we use, what categories they cover, what tokens they bind to). Renderers install Phosphor and consume by name.

## Per-renderer integration

| Renderer | Source | How |
|---|---|---|
| **React / JSX** (Satori, React Email, future ui-system) | `@phosphor-icons/react` (npm) | `import { AddressBook } from '@phosphor-icons/react'` then `<AddressBook size={24} weight="regular" color="currentColor" />` — tree-shakable, prop-driven |
| **Vue** | `@phosphor-icons/vue` (npm) | Component import per-icon |
| **Vanilla web / Tailwind v4** | `@phosphor-icons/web` (npm) or CDN | `<i class="ph ph-address-book"></i>` (CSS font icon) |
| **Raw SVG (Marp, Typst, Vega-Lite)** | `@phosphor-icons/core` (npm) — `assets/regular/<name>.svg` and `assets/fill/<name>.svg` | Read the SVG file from `node_modules/@phosphor-icons/core/assets/{weight}/{name}.svg` |
| **Quick prototyping / one-off** | Public CDN | `https://unpkg.com/@phosphor-icons/core@2/assets/{weight}/{name}.svg` |

For any renderer, **always validate against `icons-manifest.json`** first — if the icon isn't in our curated subset, do not use it without a chunk update + Mark approval.

## Adding a new icon

1. **Decide:** is the icon in Phosphor's library at [phosphoricons.com](https://phosphoricons.com)? If not, the answer is no — we use Phosphor exclusively (R-ICON-001 in `foundations/iconography.md`).
2. **Add to Figma:** import the icon into the Icons page (id `10:119`) via the Phosphor Figma plugin. Add both Regular and Fill variants.
3. **Re-sync the manifest:** run the sync procedure below. The new icon appears under `added[]` in the next `extract.log.json` run.
4. **Update `STATUS.md`:** note the addition.

## Re-sync procedure

When Figma's Icons page or our usage shifts:

1. **Open Figma** with `MyVault — Brand Design System` (key `Pm31BDHj34WjJ7NjBK4Ady`).
2. **Run the Desktop Bridge plugin**: Plugins → Development → Figma Desktop Bridge → Run.
3. **Verify** with `mcp__figma-console__figma_get_status` (probe: true).
4. **Run the extraction** — paste the snippet below into `mcp__figma-console__figma_execute`. It returns the list of `icon/<slug>` component sets and their variant IDs from the Figma Icons page.
5. **Cross-reference Phosphor's metadata** — fetch the latest `https://raw.githubusercontent.com/phosphor-icons/core/main/src/icons.ts` and parse for the icons present in our subset (Python parse script lives at history; reproduce with `re.findall` over `name: "<slug>"` blocks).
6. **Diff against existing `icons-manifest.json`** — items in Figma but not in old manifest go to `added[]`; items in old manifest but not in Figma go to `removed[]`; items with changed Phosphor metadata (e.g., new tags, version bump) go to `changed[]`.
7. **Write the new `icons-manifest.json`** with the merged data.
8. **Append a run record to `extract.log.json`** with the timestamp, `added`/`removed`/`changed` arrays, and the Phosphor library version at sync time.
9. **Inspect `git diff`** — drift here matters. If a category mass-changes, investigate.

### The Figma extraction snippet

```js
async function extractIcons() {
  await figma.loadAllPagesAsync();
  const iconsPage = figma.root.children.find(p => p.name === 'Icons');
  if (!iconsPage) throw new Error("Icons page not found");
  await figma.setCurrentPageAsync(iconsPage);

  function walk(n, list = []) {
    list.push(n);
    if ('children' in n && n.children) for (const c of n.children) walk(c, list);
    return list;
  }
  const all = walk(iconsPage);
  const componentSets = all.filter(n =>
    n.type === 'COMPONENT_SET' && (n.name || '').startsWith('icon/')
  );

  const icons = componentSets.map(cs => ({
    slug: cs.name.replace(/^icon\//, ''),
    componentSetId: cs.id,
    variants: (cs.children || []).map(c => ({
      weight: (c.name || '').replace(/^Weight=/, '').toLowerCase(),
      componentId: c.id
    }))
  }));
  icons.sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    totalIcons: icons.length,
    weights: ["regular", "fill"],
    slugs: icons.map(i => i.slug),
    icons
  };
}
return await extractIcons();
```

The snippet returns `slugs[]` — pass that to a Phosphor metadata parser to assemble the next manifest revision.

## Drift policy

- **Phosphor is canonical for icon paths and metadata.** This vault is the codified record of which subset we curate.
- **Direction is one-way:** Figma's Icons page mirrors what we use; the manifest mirrors Figma's curation against Phosphor's published metadata.
- **Phosphor version bumps:** when we upgrade `@phosphor-icons/core` (e.g., 2.1 → 2.2), re-sync to pick up new tags/categories. Major version bumps (2.x → 3.0) require chunk review.
- **Don't paint a custom-color logo for an icon-shaped placeholder** (cross-refs R-LOGO-002). Icons aren't logos — and vice versa.

## Schema

The `icons-manifest.json` follows W3C DTCG conventions where applicable, but the icon entries are MyVault-specific (DTCG doesn't have an icon token type yet). Each entry under `icons.<slug>`:

```jsonc
{
  "weights": ["regular", "fill"],
  "tokens": ["color.icon.default"],
  "phosphor": {
    "name": "address-book",
    "pascal_name": "AddressBook",
    "categories": ["COMMUNICATION"],
    "figma_category": "COMMUNICATION",
    "tags": ["contacts", "directory", "roledex"],
    "codepoint": 59128,
    "published_in": 1.3,
    "updated_in": 1.3
  }
}
```

## Related

- **`foundations/iconography.md`** — agentic chunk with HARD rules (R-ICON-NNN), BASE rules, decision tree
- **`tokens/brand.tokens.json`** — `color.icon.default` token (alias to `color.core.black`)
- **Figma canon:** [Iconography page](https://www.figma.com/design/Pm31BDHj34WjJ7NjBK4Ady/MyVault---Brand-Design-System) (id pending build) — visual guide
- **Phosphor:** [phosphoricons.com](https://phosphoricons.com) (search, browse, copy)

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial. 210 icons curated from Phosphor v2.1+, 2 weights (Regular + Fill). Approach C (no local SVGs, reference as versioned dependency). Manifest + log + README shipped; Figma guide page + foundation chunk follow. | Mark + Claude |
