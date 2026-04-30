---
type: reference
status: active
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [logo, assets, svg, figma, extraction, visual-system]
summary: "Operator guide for the MyVault logo asset bundle. Documents the 15 SVG variants (3 types × 5 colors) exported from Figma's Logo component set, their token bindings, intended use per color, the re-extraction procedure with embedded snippet, and the drift policy."
---

# Logo assets — MyVault visual-system

15 SVG variants exported from the Figma `Logo` component set (id `1:572`) in file `Pm31BDHj34WjJ7NjBK4Ady` ("MyVault — Brand Design System").

## Files in this folder

| File | What it is |
|---|---|
| `{type}-{color}.svg` × 15 | Each canonical variant. SVG with text outlined to paths (`svgOutlineText: true`). |
| `assets-manifest.json` | Catalog: every variant's dimensions, color-token binding, intended use, Figma round-trip metadata. Companion to `tokens/brand.tokens.json`. |
| `extract.log.json` | Run history with per-asset added/removed/changed log. Every extraction appends a record. |
| `README.md` | This file — operator guide and the embedded extraction snippet. |

## The matrix

The Figma `Logo` component set is a 2-axis variant grid: `Type × Color`.

|  | Primary | Teal | Light | White | Gray |
|---|---|---|---|---|---|
| **Icon** (219×220) | `icon-primary.svg` | `icon-teal.svg` | `icon-light.svg` | `icon-white.svg` | `icon-gray.svg` |
| **Wordmark** (563×167) | `wordmark-primary.svg` | `wordmark-teal.svg` | `wordmark-light.svg` | `wordmark-white.svg` | `wordmark-gray.svg` |
| **Lockup** (814×220) | `lockup-primary.svg` | `lockup-teal.svg` | `lockup-light.svg` | `lockup-white.svg` | `lockup-gray.svg` |

**Type** — what the mark is:
- `Icon` — the symbol only (the geometric mark)
- `Wordmark` — the word "MyVault" only (no symbol)
- `Lockup` — symbol + wordmark together

**Color** — the fill color, bound to one core token each:

| Color | Token | Hex | When to use |
|---|---|---|---|
| Primary | `color.core.black` | `#000000` | Default mark on light backgrounds (off-white, white). |
| Teal | `color.core.teal` | `#094545` | Brand-emphasis on off-white. Use when the mark itself should reinforce Vault Teal (formal documents). |
| Light | `color.core.off-white` | `#FBFAF5` | On dark backgrounds (black, dark-earth, premium-purple, rich-blue). Slightly warmer than pure white. |
| White | `color.core.white` | `#FFFFFF` | Maximum contrast. Use on the darkest or most saturated backgrounds (Vault Teal hero blocks, premium-purple, signal colors). |
| Gray | `color.core.gray-02` | `#696969` | Low-emphasis contexts (footers, attribution, secondary surfaces). Avoid for primary brand presence. |

## Source of truth

The Figma component set is canonical. The vault is the codified record. Sync direction is one-way: **Figma → vault**. Never edit the SVGs by hand and never push from vault back to Figma.

If a new color variant is needed (e.g., a brand-on-purple one-off), add it in Figma first (extend the `Color` variant axis), then re-extract.

## Export settings

Each SVG is exported with:

```js
exportAsync({
  format: 'SVG_STRING',
  svgIdAttribute: false,
  svgSimplifyStroke: true,
  svgOutlineText: true
})
```

`svgOutlineText: true` is the load-bearing setting. It converts the wordmark text to vector paths so SVGs render identically in any consuming renderer (Marp, Satori, Typst, browsers) without needing PT Serif or Lato fonts installed. Cost: ~30% larger files than text-as-`<text>`. Worth it for portability.

## How to re-extract

The extraction runs through the `figma-console` MCP — no Node, no install, no `myvault-tools/`.

### Procedure

1. **Open Figma Desktop** with the file `MyVault — Brand Design System` (key `Pm31BDHj34WjJ7NjBK4Ady`).
2. **Run the Desktop Bridge plugin**: Plugins → Development → Figma Desktop Bridge → Run.
3. **Verify the connection** with `mcp__figma-console__figma_get_status` (probe: true).
4. **Copy the snippet below** and pass it as the `code` parameter to `mcp__figma-console__figma_execute`. The snippet returns `{ componentSet, fileKey, extractedAt, count, exports[] }` where each `exports[i]` has `slug, filename, type, color, width, height, nodeId, key, variantName, svg, svgBytes`.
5. **Heads-up:** the response will exceed the MCP's inline-return budget (15 SVGs × ~5 KB each ≈ 90 KB). The MCP automatically writes the full payload to a `tool-results/` file and notifies you of the path. Use that file as the source.
6. **Write each `exports[i].svg` to `{filename}`** in this folder, overwriting the previous file.
7. **Compute the diff** against the previous `assets-manifest.json`. For each variant slug:
   - In new but not old → add to `added[]`
   - In old but not new → add to `removed[]`
   - In both with byte-different SVG content → add to `changed[]` with `before`/`after` byte counts
8. **Append a new run record to `extract.log.json`** with `runIndex = current.runIndex + 1`, the new timestamp, totals, and the `added`/`removed`/`changed` arrays. Update `current` at the top of the log.
9. **Inspect `git diff`** on the SVGs and the manifest. SVG path data may shift slightly even when nothing visible changed (Figma sometimes re-orders exported paths) — eyeball the rendered output if in doubt.

### Drift policy

- **Direction:** Figma → vault. One way.
- **Figma is canonical.** Don't edit SVGs by hand.
- **New variant in Figma** (e.g., a sixth color) → re-extract; new entry shows up under `added[]`.
- **A variant disappearing** (someone deleted it in Figma) → `removed[]` records it. Consumer chunks must drop the reference before merge.
- **Component IDs** are preserved in `$extensions` for round-trip; don't strip.

## The extraction snippet

Paste this into `mcp__figma-console__figma_execute`. It enumerates every variant of the `Logo` component set and exports each as an SVG string.

```js
async function exportLogos() {
  const set = await figma.getNodeByIdAsync('1:572');
  if (!set || set.type !== 'COMPONENT_SET') {
    throw new Error('Logo component set 1:572 not found');
  }

  const slugify = name => {
    const m = {};
    name.split(',').forEach(part => {
      const [k, v] = part.split('=').map(s => s.trim());
      if (k && v) m[k] = v.toLowerCase();
    });
    return `${m['Type'] || 'unknown'}-${m['Color'] || 'unknown'}`;
  };

  const exports = [];
  for (const variant of set.children) {
    const slug = slugify(variant.name);
    const svgString = await variant.exportAsync({
      format: 'SVG_STRING',
      svgIdAttribute: false,
      svgSimplifyStroke: true,
      svgOutlineText: true
    });
    const variantProps = {};
    variant.name.split(',').forEach(p => {
      const [k, v] = p.split('=').map(s => s.trim());
      variantProps[k] = v;
    });
    exports.push({
      slug,
      filename: `${slug}.svg`,
      type: variantProps['Type'],
      color: variantProps['Color'],
      width: Math.round(variant.width),
      height: Math.round(variant.height),
      nodeId: variant.id,
      key: variant.key,
      variantName: variant.name,
      svg: svgString,
      svgBytes: svgString.length
    });
  }

  return {
    componentSet: {
      id: set.id,
      name: set.name,
      key: set.key,
      properties: set.componentPropertyDefinitions || null
    },
    fileKey: (typeof figma.fileKey !== 'undefined' && figma.fileKey)
      ? figma.fileKey
      : "Pm31BDHj34WjJ7NjBK4Ady",
    extractedAt: new Date().toISOString(),
    count: exports.length,
    exports
  };
}
return await exportLogos();
```

## Migration note — old `10-Brand/Logo/`

Prior to this bundle, the vault stored three masters at `10-Brand/Logo/{SVG,PNG}/` using the `Logomark / Logotype / Lockup` vocabulary:

| Old path | New equivalent | Note |
|---|---|---|
| `10-Brand/Logo/SVG/MyVault Logo - Logomark.svg` | `assets/logo/icon-primary.svg` | Renamed Logomark → Icon (Figma vocabulary) |
| `10-Brand/Logo/SVG/MyVault Logo - Logotype.svg` | `assets/logo/wordmark-primary.svg` | Renamed Logotype → Wordmark |
| `10-Brand/Logo/SVG/MyVault Logo - Lockup.svg` | `assets/logo/lockup-primary.svg` | Same name, system file |
| `10-Brand/Logo/PNG/*.png` × 3 | (none) | PNGs deferred to renderer phase; SVG is canonical |

The old folder is **superseded but not yet deleted**. Cleanup happens when the visual-system chunks land and the references in other docs are updated. Until then both exist.

## Companion bindings

- **`color.*` tokens** the SVGs consume → see each manifest entry's `tokenDependencies` field
- **Future `foundations/logo-usage.md` chunk** will reference assets by path: e.g., `assets/logo/lockup-white.svg` for "logo on Vault Teal hero block"

## Related

- [[brand.tokens.json]] (sibling) — token values referenced by `tokenDependencies`
- [[04-token-storage-plan]] — overall storage discipline this folder follows
- [[03-brand-design-vs-ui-system]] — locked scope for `visual-system/`

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial export. 15 variants (3 type × 5 color). Standardized on Figma's Icon/Wordmark/Lockup vocabulary. Embedded extraction snippet for re-runs. Old `10-Brand/Logo/` masters superseded but not yet archived. | Claude (Opus 4.7) with Mark |
