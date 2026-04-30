---
type: reference
status: active
owner: mark
created: 2026-04-29
updated: 2026-04-29
tags: [tokens, dtcg, figma, extraction, visual-system]
summary: "Operator guide for the MyVault token files. Documents what brand.tokens.json contains, how to re-extract from Figma via the figma-console MCP, the drift policy, the schema and extension namespace, and embeds the extraction snippet so it stays synced with the file it produced."
---

# Tokens — MyVault visual-system

Canonical W3C DTCG tokens extracted from Figma `Pm31BDHj34WjJ7NjBK4Ady` ("MyVault — Brand Design System").

## Files in this folder

| File | What it is |
|---|---|
| `brand.tokens.json` | Canonical DTCG output — source of truth for every token value. |
| `extract.log.json` | Run history with per-element added/removed/changed log. Every extraction appends a record. |
| `README.md` | This file — operator guide and the embedded extraction snippet. |

No `extract.figma.js` standalone file. The snippet's only runtime is the `figma_execute` MCP, so committing it as `.js` would be dead code that nothing can `node`-run. Keeping it embedded in this README means the runnable input and the operator guide stay in one place — there's no "what if disk and what-actually-ran diverged" failure mode.

## What's inside `brand.tokens.json`

**54 atoms** across 5 categories, all from one Figma collection (`MyVault Tokens`, 1 mode):

| Category | Count | Paths |
|---|---|---|
| `color.*` | 14 (including 1 alias) | `core/{teal,white,off-white,gray-01,gray-02,black}`, `secondary/{premium-purple,dark-earth,rich-blue}`, `signal/{go,stop,sky,earth}`, `icon/default` (alias → `core.black`) |
| `space.*` | 14 | `0,1,2,3,4,5,6,8,10,12,16,20,24,32` (px) |
| `radius.*` | 9 | `none,xs,sm,md,lg,xl,2xl,3xl,full` (px; `full = 999` is a sentinel for fully rounded) |
| `typography.*` | 12 | `display.{xxl,xl,l,m,s}`, `heading.{l,m}`, `body.{xl,l,default,s}`, `caption` |
| `gradient.*` | 5 | `primary,cool,warm,mist,greydient` (all linear) |

**Effect styles (shadows):** 0 in Figma, 0 in this file. Intentional — the visual-system canon pins "no shadows by default". When shadows arrive, add them in Figma first, re-extract.

## Schema

- **Format:** [W3C Design Tokens Community Group v1.0](https://design-tokens.org/community-group-format/) (Oct 2025 stable).
- **Schema URL:** declared at root `$schema` field.
- **Composite types used:** `color`, `dimension`, `typography`, `gradient`.
- **Aliases:** DTCG curly-brace dot-paths (e.g., `"$value": "{color.core.black}"`).
- **Validation:** manual until myvault-tools picks it up. Eyeball `git diff` after re-runs.

## Extension namespace

Every token preserves Figma round-trip metadata under `$extensions.com.myvault.figma`:

| Field | When | Use |
|---|---|---|
| `id` | every variable | Round-trip + drift detection |
| `key` | every variable + style | Library publish key for cross-file references |
| `scopes` | every variable | Figma's variable-picker filter (e.g., `WIDTH_HEIGHT, GAP` for spacing) |
| `aliasOf` / `aliasOfName` / `resolvedFinal` | aliases only | Preserve alias chain + final resolved value |
| `raw` | dimensions | Numeric form for math-heavy renderers (no "16px" parsing) |
| `rgba` | colors | Full-precision floats from Figma |
| `transform` / `rawStops` | gradients | Exact reproduction in any renderer |
| `fontStyleLiteral` / `lineHeightSource` / `letterSpacingSource` | typography | Preserve Figma's source unit + literal style name (e.g., "Regular") |

The `$extensions.com.myvault.figma` block at the root of the file carries `fileKey`, `fileName`, `collectionId`, `collectionName`, `collectionKey`, `extractedAt`, `extractedBy`, and the `modes` registry.

## How to re-extract

The extraction runs entirely through the `figma-console` MCP — no Node, no install, no `myvault-tools/`.

### Procedure

1. **Open Figma Desktop** with the file `MyVault — Brand Design System` (key `Pm31BDHj34WjJ7NjBK4Ady`).
2. **Run the Desktop Bridge plugin**: Plugins → Development → Figma Desktop Bridge → Run.
3. **Verify the connection** in your Claude Code session:
   ```
   mcp__figma-console__figma_get_status (probe: true)
   ```
   Look for `setup.valid: true` and `connectedFile.fileName: "MyVault - Brand Design System"`.
4. **Copy the snippet below** (the entire `js` code block) and pass it as the `code` parameter to `mcp__figma-console__figma_execute`. The snippet returns `{ json, manifest, summary, totalAtoms, extractedAt }`.
5. **Write the `json` field to `brand.tokens.json`**, overwriting the previous file.
6. **Compute the diff** against the previous canonical JSON (any reasonable diff tool — `git diff`, a deep-equal walk in JS, or `jd` CLI). For each path:
   - In new but not old → add to `added[]`
   - In old but not new → add to `removed[]`
   - In both with different values → add to `changed[]` with `before`/`after`
7. **Append a new run record to `extract.log.json`** with `runIndex = current.runIndex + 1`, the new timestamp, totals, and the `added`/`removed`/`changed` arrays. Update `current.runIndex` and `current.timestamp` at the top of the file.
8. **Inspect `git diff`** on `brand.tokens.json` — if anything looks unexpected (a value drift you didn't intend, a missing token), investigate before committing. The Figma file is canonical, so most drift is the result of an intentional Figma edit; if it isn't, fix it in Figma and re-extract.

### Drift policy

- **Direction is one-way.** Figma → JSON. Never push from vault back to Figma.
- **Figma is canonical for token values.** This file is the codified record.
- **Figma adding a new variable** is normal — re-extract and the snippet picks it up. The new entry shows up under `added[]` in the log.
- **A value changing by hand in this file** is wrong. Always re-extract; never edit `brand.tokens.json` directly.
- **Variable IDs and library keys are load-bearing.** They live in `$extensions` so we can round-trip back to Figma when needed — don't strip them.

## The extraction snippet

Paste this into `mcp__figma-console__figma_execute` as the `code` argument. It runs in Figma's plugin sandbox via the Desktop Bridge plugin. Returns a JSON-serializable object with the canonical token tree, a flat per-element manifest, and counts.

The snippet:
- Reads the `MyVault Tokens` variable collection (37 vars), resolves aliases, classifies by type
- Reads paint styles, filters to gradients (`gradient/*`)
- Reads text styles
- Builds a DTCG-shaped object per the encoding rules in [[04-token-storage-plan]]
- Sorts keys deterministically (custom orders for known groups, numeric for `space.*`, alphabetic elsewhere)
- Returns `JSON.stringify(_, null, 2)` plus a parallel manifest array used for the log

```js
async function buildTokens() {
  const SORT = {
    'color': ['core', 'secondary', 'signal', 'icon'],
    'color.core': ['teal', 'white', 'off-white', 'gray-01', 'gray-02', 'black'],
    'color.secondary': ['premium-purple', 'dark-earth', 'rich-blue'],
    'color.signal': ['go', 'stop', 'sky', 'earth'],
    'color.icon': ['default'],
    'radius': ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    'typography': ['display', 'heading', 'body', 'caption'],
    'typography.display': ['xxl', 'xl', 'l', 'm', 's'],
    'typography.heading': ['l', 'm'],
    'typography.body': ['xl', 'l', 'default', 's'],
    'gradient': ['primary', 'cool', 'warm', 'mist', 'greydient']
  };
  const ROOT_ORDER = ['$schema', '$description', '$extensions', 'color', 'space', 'radius', 'typography', 'gradient'];
  const TOKEN_KEY_ORDER = ['$value', '$type', '$description', '$extensions'];

  const round = (n, p = 4) => Math.round(n * Math.pow(10, p)) / Math.pow(10, p);
  const rgbaToHex = (c) => {
    const toHex = v => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0').toUpperCase();
    const hex = `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
    return (c.a !== undefined && c.a < 1) ? `${hex}${toHex(c.a)}` : hex;
  };
  const figNameToPath = name => name.split('/').join('.');
  const fontWeightMap = {
    'Thin': 100, 'ExtraLight': 200, 'Extra Light': 200, 'Light': 300,
    'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Semi Bold': 600,
    'Bold': 700, 'ExtraBold': 800, 'Extra Bold': 800, 'Black': 900
  };
  const lineHeightUnitless = lh => {
    if (!lh) return 'normal';
    if (lh.unit === 'PERCENT') return round(lh.value / 100, 4);
    if (lh.unit === 'PIXELS') return `${lh.value}px`;
    return 'normal';
  };
  const letterSpacingFmt = ls => {
    if (!ls) return '0%';
    if (ls.unit === 'PERCENT') return `${round(ls.value, 2)}%`;
    if (ls.unit === 'PIXELS') return `${ls.value}px`;
    return '0%';
  };
  const setNested = (target, path, value) => {
    const parts = path.split('.');
    let cur = target;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  };

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const tokensCollection = collections.find(c => c.name === 'MyVault Tokens');
  if (!tokensCollection) throw new Error("Collection 'MyVault Tokens' not found");
  const defaultModeId = tokensCollection.defaultModeId;
  const variables = await Promise.all(
    tokensCollection.variableIds.map(id => figma.variables.getVariableByIdAsync(id))
  );

  const manifest = [];
  const root = {
    "$schema": "https://design-tokens.org/schemas/v1.0.json",
    "$description": "MyVault brand design tokens, extracted from Figma 'MyVault — Brand Design System'. See tokens/README.md for context. Format: W3C Design Tokens Community Group v1.0.",
    "$extensions": {
      "com.myvault.figma": {
        "fileKey": (typeof figma.fileKey !== 'undefined' && figma.fileKey) ? figma.fileKey : "Pm31BDHj34WjJ7NjBK4Ady",
        "fileName": "MyVault — Brand Design System",
        "collectionId": tokensCollection.id,
        "collectionName": tokensCollection.name,
        "collectionKey": tokensCollection.key,
        "extractedAt": new Date().toISOString(),
        "extractedBy": "figma_execute via figma-console MCP",
        "modes": tokensCollection.modes.map(m => ({
          id: m.modeId, name: m.name, isDefault: m.modeId === defaultModeId
        }))
      }
    }
  };

  // --- VARIABLES (color, space, radius, alias) ---
  for (const v of variables) {
    const path = figNameToPath(v.name);
    const valueByMode = v.valuesByMode[defaultModeId];

    if (valueByMode && typeof valueByMode === 'object' && valueByMode.type === 'VARIABLE_ALIAS') {
      const target = await figma.variables.getVariableByIdAsync(valueByMode.id);
      const targetPath = figNameToPath(target.name);
      let resolvedHex = null;
      if (v.resolvedType === 'COLOR') {
        let resolveTarget = target, resolveValue = resolveTarget.valuesByMode[defaultModeId], safety = 0;
        while (resolveValue && typeof resolveValue === 'object' && resolveValue.type === 'VARIABLE_ALIAS' && safety < 10) {
          resolveTarget = await figma.variables.getVariableByIdAsync(resolveValue.id);
          resolveValue = resolveTarget.valuesByMode[defaultModeId];
          safety++;
        }
        if (resolveValue && typeof resolveValue === 'object' && 'r' in resolveValue) resolvedHex = rgbaToHex(resolveValue);
      }
      const token = {
        "$value": `{${targetPath}}`,
        "$type": v.resolvedType === 'COLOR' ? "color" : "dimension",
        "$extensions": {
          "com.myvault.figma": {
            "id": v.id, "key": v.key, "scopes": v.scopes,
            "aliasOf": valueByMode.id, "aliasOfName": target.name, "resolvedFinal": resolvedHex
          }
        }
      };
      setNested(root, path, token);
      manifest.push({
        path, type: token.$type, value: token.$value,
        source: 'variable', figmaId: v.id,
        notes: `alias → ${targetPath} (resolves to ${resolvedHex})`
      });
      continue;
    }

    if (v.resolvedType === 'COLOR') {
      const hex = rgbaToHex(valueByMode);
      setNested(root, path, {
        "$value": hex, "$type": "color",
        "$extensions": {
          "com.myvault.figma": {
            "id": v.id, "key": v.key, "scopes": v.scopes,
            "rgba": {
              r: round(valueByMode.r, 4), g: round(valueByMode.g, 4),
              b: round(valueByMode.b, 4), a: valueByMode.a !== undefined ? valueByMode.a : 1
            }
          }
        }
      });
      manifest.push({ path, type: 'color', value: hex, source: 'variable', figmaId: v.id });
      continue;
    }

    if (v.resolvedType === 'FLOAT') {
      setNested(root, path, {
        "$value": `${valueByMode}px`, "$type": "dimension",
        "$extensions": {
          "com.myvault.figma": { "id": v.id, "key": v.key, "scopes": v.scopes, "raw": valueByMode }
        }
      });
      manifest.push({ path, type: 'dimension', value: `${valueByMode}px`, source: 'variable', figmaId: v.id });
    }
  }

  // --- GRADIENT paint styles ---
  const paintStyles = await figma.getLocalPaintStylesAsync();
  for (const style of paintStyles) {
    if (!style.name.startsWith('gradient/')) continue;
    const tail = style.name.slice('gradient/'.length);
    const path = `gradient.${tail}`;
    const paint = style.paints[0];
    if (!paint || !paint.type.startsWith('GRADIENT')) continue;
    const stops = paint.gradientStops.map(s => ({ color: rgbaToHex(s.color), position: round(s.position, 4) }));
    const rawStops = paint.gradientStops.map(s => ({
      rgba: {
        r: round(s.color.r, 4), g: round(s.color.g, 4),
        b: round(s.color.b, 4), a: s.color.a !== undefined ? s.color.a : 1
      },
      position: round(s.position, 4)
    }));
    const transform = paint.gradientTransform.map(row => row.map(v => round(v, 6)));
    setNested(root, path, {
      "$value": stops, "$type": "gradient",
      "$extensions": {
        "com.myvault.figma": {
          "styleKey": style.key, "type": paint.type,
          "transform": transform, "rawStops": rawStops
        }
      }
    });
    manifest.push({
      path, type: 'gradient',
      value: `${stops.length} stops: ${stops.map(s => s.color).join(' → ')}`,
      source: 'paintStyle', figmaKey: style.key
    });
  }

  // --- TEXT styles ---
  const textStyles = await figma.getLocalTextStylesAsync();
  for (const style of textStyles) {
    let path;
    if (style.name === 'body') path = 'typography.body.default';
    else if (style.name === 'caption') path = 'typography.caption';
    else path = `typography.${style.name.split('/').join('.')}`;
    const weight = fontWeightMap[style.fontName.style] !== undefined ? fontWeightMap[style.fontName.style] : 400;
    setNested(root, path, {
      "$value": {
        "fontFamily": style.fontName.family, "fontWeight": weight,
        "fontSize": `${style.fontSize}px`,
        "lineHeight": lineHeightUnitless(style.lineHeight),
        "letterSpacing": letterSpacingFmt(style.letterSpacing)
      },
      "$type": "typography",
      "$extensions": {
        "com.myvault.figma": {
          "styleKey": style.key, "fontStyleLiteral": style.fontName.style,
          "lineHeightSource": style.lineHeight, "letterSpacingSource": style.letterSpacing,
          "paragraphSpacing": style.paragraphSpacing,
          "textCase": style.textCase, "textDecoration": style.textDecoration
        }
      }
    });
    manifest.push({
      path, type: 'typography',
      value: `${style.fontName.family} ${weight}/${style.fontSize}px @ ${lineHeightUnitless(style.lineHeight)}`,
      source: 'textStyle', figmaKey: style.key
    });
  }

  // --- SORT recursively (idempotent output) ---
  function isToken(o) { return o && typeof o === 'object' && !Array.isArray(o) && ('$value' in o); }
  function sortRecursive(obj, parentPath) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    if (isToken(obj)) {
      const out = {};
      for (const k of TOKEN_KEY_ORDER) if (k in obj) out[k] = sortRecursive(obj[k], `${parentPath}.${k}`);
      for (const k of Object.keys(obj)) if (!TOKEN_KEY_ORDER.includes(k)) out[k] = sortRecursive(obj[k], `${parentPath}.${k}`);
      return out;
    }
    const keys = Object.keys(obj);
    let order;
    if (parentPath === '') {
      const dollarKeys = keys.filter(k => k.startsWith('$'));
      const others = keys.filter(k => !k.startsWith('$'));
      const orderedDollar = ROOT_ORDER.filter(k => k.startsWith('$') && dollarKeys.includes(k));
      const orderedOthers = ROOT_ORDER.filter(k => !k.startsWith('$') && others.includes(k));
      const remaining = [
        ...dollarKeys.filter(k => !orderedDollar.includes(k)).sort(),
        ...others.filter(k => !orderedOthers.includes(k)).sort()
      ];
      order = [...orderedDollar, ...orderedOthers, ...remaining];
    } else if (SORT[parentPath]) {
      const hardOrder = SORT[parentPath];
      order = [...hardOrder.filter(k => keys.includes(k)), ...keys.filter(k => !hardOrder.includes(k)).sort()];
    } else if (parentPath === 'space') {
      order = keys.slice().sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    } else {
      order = [
        ...keys.filter(k => k.startsWith('$')).sort(),
        ...keys.filter(k => !k.startsWith('$')).sort()
      ];
    }
    const out = {};
    for (const k of order) {
      const childPath = parentPath ? `${parentPath}.${k}` : k;
      out[k] = sortRecursive(obj[k], childPath);
    }
    return out;
  }

  const sorted = sortRecursive(root, '');
  return {
    json: JSON.stringify(sorted, null, 2),
    manifest,
    summary: { color: 14, space: 14, radius: 9, typography: 12, gradient: 5, alias: 1 },
    totalAtoms: manifest.length,
    extractedAt: sorted.$extensions['com.myvault.figma'].extractedAt
  };
}
return await buildTokens();
```

## Future token categories — deferred, not forgotten

Token categories that don't exist in Figma today but are candidates to add later. Each lands in `brand.tokens.json` as a new top-level branch alongside `color/space/radius/typography/gradient` once the underlying Figma source exists.

| Category | Figma source | Status | When to add |
|---|---|---|---|
| **Grid styles** (`grid.*`) | Figma layout-grid styles | Recommended; not yet in Figma | Add when formalizing the 8-px baseline + 12/4-column page grids. Three concrete proposals: `grid/8` (square 8px universal baseline), `grid/page-12` (12-col, gutter `space.4`, margin `space.10` — for documents/presentations/web hero), `grid/page-4` (4-col, gutter `space.4`, margin `space.6` — for mobile/social). |
| **Effect styles** (`shadow.*`, `blur.*`) | Figma effect styles | Mostly deferred | Visual canon pins "no shadows by default", so most elevation tokens are deferred to the ui-system phase (hover, focus ring, modal scrim). The one possible early add: `shadow/none` as an explicit sentinel for "no elevation" intent in components. Hold for now. |
| **Border-width** (`stroke.*`) | Variable (FLOAT, scope `STROKE_WEIGHT`) | Worth considering | Card borders, dividers, focus rings currently use literal `1px` / `2px`. Could ship as `stroke/sm` (1px), `stroke/md` (2px), `stroke/lg` (4px) when component patterns get codified. |
| **Opacity** (`opacity.*`) | Variable (FLOAT, scope `OPACITY`) | Worth considering | The Stream B social posts use "low-opacity stat rows" — the value isn't named. Could ship as `opacity/muted` (~10%), `opacity/subtle` (~30%), `opacity/standard` (~50%), `opacity/emphasis` (~80%) when chunk hydration surfaces the canonical values. |
| **Motion** (`duration.*`, `easing.*`) | Variable (FLOAT) + chunk prose | Phase 4 per architecture | Defer with the `motion-and-animation.md` chunk and Remotion. Not a Phase 1/2 concern. |
| **Z-index / elevation tokens** (`z.*`) | Variable (FLOAT) | Probably skip | Visual canon avoids elevation. If ever needed, it's a ui-system concern. |
| **Breakpoints** (`breakpoint.*`) | Variable (FLOAT, scope `WIDTH_HEIGHT`) | Skip — ui-system | Web/responsive concern, lives in the deferred ui-system bundle. |

### Adding a new category — procedure

1. Define the source artifacts in Figma first (variable, paint style, text style, effect style, or layout grid style).
2. Re-run the extraction snippet via `figma_execute`. The snippet's variable/style readers will pick up the new artifacts automatically — but if the new artifacts need a different DTCG `$type` (e.g., `cubicBezier` for easing) or new `$extensions` fields, **edit the snippet first** (in this README, since it lives here) before re-running.
3. Append a new run record to `extract.log.json` with the new entries under `added[]`.
4. Update the "What's inside `brand.tokens.json`" table at the top of this README.

### Audit gap surfaced 2026-04-29

When this snapshot was captured, no Figma frame audit was run to check for *phantom canon* — colors used in actual designs that bypass the variable system. Worth doing once before the chunks land, so any hardcoded hex that's load-bearing in real deliverables either becomes a token or gets fixed.

## Related

- [[04-token-storage-plan]] — the plan this implementation follows
- [[visual-system-architecture-v2]] — overall pipeline architecture
- [[03-brand-design-vs-ui-system]] — locked scope for `visual-system/`

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-29 | Initial extraction. 54 atoms (14 color / 14 space / 9 radius / 12 typography / 5 gradient). 1 alias (`color.icon.default → color.core.black`). Embedded extraction snippet for re-runs. | Claude (Opus 4.7) with Mark |
