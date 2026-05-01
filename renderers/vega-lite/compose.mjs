#!/usr/bin/env node
/**
 * compose.mjs — MyVault chart composer.
 *
 * Reads a chart fixture, renders the inner data plot via Vega-Lite, and wraps it in the brand
 * chart-card chrome (gradient surface | flat off-white | solid teal | greydient; 1px gray-01
 * stroke; 40 padding; PT Serif 40 title; Lato 14 description; 1px top-stroke footer with
 * SPACE_BETWEEN dot + source caption).
 *
 * Per-type composition strategy:
 *   horizontal-bar       — composer renders 120-wide RIGHT-aligned label column + Vega-Lite
 *                          renders bars + value labels in the remaining bar-area width
 *   vertical-bar         — composer renders category labels below + Vega-Lite renders bars
 *                          inside fixed-width tracks
 *   vertical-bar-axes    — Vega-Lite renders the full axis chart (gridlines, zero line,
 *                          negative bars, value labels, axis ticks)
 *   radial-dramatic      — composer renders 3 cells side-by-side; each cell is a Vega-Lite
 *                          arc (track ring + data ring) + center percentage + cell label
 *   radial-light         — same as radial-dramatic; surface-paired colors flip
 *
 * Usage:
 *   node compose.mjs fixtures/horizontal-bar.chart.json
 *   node compose.mjs fixtures/horizontal-bar.chart.json output/horizontal-bar.svg
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vega from "vega";
import * as vl from "vega-lite";
import { phosphorIcon } from "./lib/icons.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS = JSON.parse(fs.readFileSync(path.join(__dirname, "tokens.json"), "utf8"));

// ----- surface recipes ----------------------------------------------------------------------
// Per the BASE Surface Color Recipes table in chunks/chart.md.
const RECIPES = {
  mist:        { fill: "url(#g_mist)",      title: TOKENS.color.black,  desc: TOKENS.color.gray02,  caption: TOKENS.color.gray02,  footerStroke: TOKENS.color.gray01,  footerDot: TOKENS.color.teal,   cardStroke: TOKENS.color.gray01, valueColor: TOKENS.color.black, labelColor: TOKENS.color.black, gridColor: TOKENS.color.gray01 },
  primary:     { fill: "url(#g_primary)",   title: TOKENS.color.black,  desc: TOKENS.color.gray02,  caption: TOKENS.color.gray02,  footerStroke: TOKENS.color.gray01,  footerDot: TOKENS.color.teal,   cardStroke: TOKENS.color.gray01, valueColor: TOKENS.color.black, labelColor: TOKENS.color.black, gridColor: TOKENS.color.gray01 },
  warm:        { fill: "url(#g_warm)",      title: TOKENS.color.black,  desc: TOKENS.color.gray02,  caption: TOKENS.color.gray02,  footerStroke: TOKENS.color.gray01,  footerDot: TOKENS.color.teal,   cardStroke: TOKENS.color.gray01, valueColor: TOKENS.color.black, labelColor: TOKENS.color.black, gridColor: TOKENS.color.gray01 },
  greydient:   { fill: "url(#g_greydient)", title: TOKENS.color.black,  desc: TOKENS.color.gray02,  caption: TOKENS.color.gray02,  footerStroke: TOKENS.color.gray01,  footerDot: TOKENS.color.black,  cardStroke: TOKENS.color.gray01, valueColor: TOKENS.color.black, labelColor: TOKENS.color.black, gridColor: TOKENS.color.gray01 },
  "off-white": { fill: TOKENS.color.offWhite, title: TOKENS.color.black, desc: TOKENS.color.gray02, caption: TOKENS.color.gray02, footerStroke: TOKENS.color.gray01,   footerDot: TOKENS.color.teal,   cardStroke: TOKENS.color.gray01, valueColor: TOKENS.color.black, labelColor: TOKENS.color.gray02, gridColor: TOKENS.color.gray01 },
  teal:        { fill: TOKENS.color.teal,   title: TOKENS.color.white,  desc: TOKENS.color.offWhite, caption: TOKENS.color.offWhite, footerStroke: TOKENS.color.offWhite, footerDot: TOKENS.color.white, cardStroke: TOKENS.color.gray01, valueColor: TOKENS.color.white, labelColor: TOKENS.color.white, gridColor: TOKENS.color.offWhite },
};

// ----- helpers ------------------------------------------------------------------------------
function gradientStops(stops) {
  return stops.map((s) =>
    `<stop offset="${(s.position * 100).toFixed(2)}%" stop-color="${s.color}"/>`
  ).join("");
}

function defs() {
  return `<defs>
    <linearGradient id="g_mist" x1="0" y1="0" x2="0" y2="1">${gradientStops(TOKENS.gradient.mist)}</linearGradient>
    <linearGradient id="g_primary" x1="0" y1="0" x2="0" y2="1">${gradientStops(TOKENS.gradient.primary)}</linearGradient>
    <linearGradient id="g_warm" x1="0" y1="0" x2="0" y2="1">${gradientStops(TOKENS.gradient.warm)}</linearGradient>
    <linearGradient id="g_greydient" x1="0" y1="0" x2="0" y2="1">${gradientStops(TOKENS.gradient.greydient)}</linearGradient>
  </defs>`;
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function renderVegaLiteSvg(plotSpec, plotWidth, plotHeight) {
  const vgSpec = vl.compile({
    ...plotSpec,
    width: plotSpec.width ?? plotWidth,
    height: plotSpec.height ?? plotHeight,
    background: "transparent",
    padding: 0,
    config: {
      ...(plotSpec.config ?? {}),
      background: "transparent",
      padding: 0,
      view: { stroke: null, fill: null },
    },
  }).spec;

  const view = new vega.View(vega.parse(vgSpec), { renderer: "none" });
  const svg = await view.toSVG();
  view.finalize();
  return svg;
}

// Strip the outer <svg> wrapper from Vega's output so we can splice the inner <g> into our template.
// Vega wraps content in transform="translate(L,T)" where L,T are layout-padding offsets — undo them
// so the inner content starts at (0,0) for clean splicing.
function unwrapSvg(svg) {
  let s = svg.replace(/<\?xml[^?]*\?>\s*/, "");
  const match = s.match(/<svg[^>]*>([\s\S]*)<\/svg>\s*$/);
  if (!match) throw new Error("Failed to unwrap inner SVG");
  let inner = match[1];

  // Find the outermost wrapping <g transform="translate(L,T)"> and remove just that translate
  // so content sits at (0,0). Keep the <g> in case it has stroke-miterlimit etc.
  inner = inner.replace(/<g\s+([^>]*?)\s*transform="translate\(([\d.\-]+),([\d.\-]+)\)"\s*>/, '<g $1>');

  return inner;
}

// ----- per-type plot dimensions -------------------------------------------------------------
// Each chart type has a different inner-plot composition. The composer asks the Vega-Lite plot
// to render at a specific width × height; the rest of the chrome (labels outside the plot,
// chart-card frame, header, footer) is composed in SVG by hand for exact Figma match.
function plotRegion(type, card) {
  const [pT, pR, pB, pL] = card.padding;
  const innerW = card.width - pL - pR;
  // The default plotHeight is whatever the fixture sets; per-type overrides go below.
  const plotH = card.plotHeight ?? 216;
  switch (type) {
    case "horizontal-bar":
      // 120 label column + 12 gap + remaining bars = 880 → bars area 748
      return { width: innerW - 120 - 12, height: plotH };
    case "vertical-bar":
      // bars take inner width minus 16 left/right pad (Figma reference 70:8617)
      return { width: innerW - 32, height: plotH };
    case "vertical-bar-axes":
      // 48 left axis + bars + 0 right
      return { width: innerW - 48, height: plotH };
    default:
      return { width: innerW, height: plotH };
  }
}

// ----- chrome composition ------------------------------------------------------------------
function composeFrame({ width, height, recipe }) {
  return `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="${recipe.fill}" stroke="${recipe.cardStroke}" stroke-width="1"/>`;
}

function composeHeader({ x, y, fixture, recipe }) {
  const titleH = 50; // PT Serif 40 @ 125% LH
  const innerGap = fixture.header.description ? (fixture.header.innerGap ?? 8) : 0;
  const titleLine = `<text x="${x}" y="${y + 40}" font-family="PT Serif" font-size="40" font-weight="400" fill="${recipe.title}">${escapeXml(fixture.header.title)}</text>`;
  const descLine = fixture.header.description
    ? `<text x="${x}" y="${y + titleH + innerGap + 14}" font-family="Lato" font-size="14" font-weight="400" fill="${recipe.desc}">${escapeXml(fixture.header.description)}</text>`
    : "";
  const totalH = titleH + innerGap + (fixture.header.description ? 21 : 0);
  return { svg: titleLine + descLine, height: totalH };
}

function composeFooter({ x, y, width, fixture, recipe }) {
  if (!fixture.footer?.show) return { svg: "", height: 0 };
  const footerH = 34; // 16 padding-top + 18 row
  const stroke = `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y}" stroke="${recipe.footerStroke}" stroke-width="1"/>`;
  const dotR = 3;
  const rowY = y + 16; // padding-top 16
  // Per Figma visual canon (Mark's edit on Diagrams page 70:8479): dot + caption sit together
  // on the LEFT with a 10px gap. The Figma data property says SPACE_BETWEEN but the rendered
  // canon shows together-LEFT — visual wins.
  const dotCx = x + dotR;
  const dot = `<circle cx="${dotCx}" cy="${rowY + 9}" r="${dotR}" fill="${recipe.footerDot}"/>`;
  const captionX = dotCx + dotR + 10;
  const caption = `<text x="${captionX}" y="${rowY + 13}" text-anchor="start" font-family="Lato" font-size="12" font-weight="400" fill="${recipe.caption}">${escapeXml(fixture.footer.source ?? "")}</text>`;
  return { svg: stroke + dot + caption, height: footerH };
}

// ----- composer: horizontal-bar -------------------------------------------------------------
async function composeHorizontalBar(fixture) {
  const card = fixture.card;
  const recipe = RECIPES[card.surface];
  if (!recipe) throw new Error(`Unknown surface: ${card.surface}`);
  const [pT, pR, pB, pL] = card.padding;
  const innerW = card.width - pL - pR;

  // Layout constants from Figma 70:8480
  const LABEL_COL_W = 120;
  const LABEL_BAR_GAP = 12;
  const BAR_HEIGHT = 40;
  const ROW_GAP = 4;
  const data = fixture.plot.data.values;
  const nRows = data.length;
  const plotH = nRows * BAR_HEIGHT + (nRows - 1) * ROW_GAP; // 5×40 + 4×4 = 216
  const plotW = innerW - LABEL_COL_W - LABEL_BAR_GAP;       // 880-120-12 = 748
  const maxValue = fixture.plot.scale?.max ?? 100;

  // ----- header
  const headerY = pT;
  const header = composeHeader({ x: pL, y: headerY, fixture, recipe });
  const headerGap = card.headerGap ?? 20;

  // ----- plot region
  const plotY = headerY + header.height + headerGap;

  // Composer-rendered RIGHT-aligned label column (120 wide)
  const labelsSvg = data.map((d, i) => {
    const rowY = plotY + i * (BAR_HEIGHT + ROW_GAP);
    const cy = rowY + BAR_HEIGHT / 2 + 5; // baseline correction for 14pt Lato
    return `<text x="${pL + LABEL_COL_W}" y="${cy}" text-anchor="end" font-family="Lato" font-size="14" font-weight="400" fill="${recipe.labelColor}">${escapeXml(d.category)}</text>`;
  }).join("");

  // Composer-rendered bars + value labels (vector, no Vega — simpler and pixel-perfect)
  const barsX = pL + LABEL_COL_W + LABEL_BAR_GAP;
  const barsSvg = data.map((d, i) => {
    const rowY = plotY + i * (BAR_HEIGHT + ROW_GAP);
    const w = (d.value / maxValue) * plotW;
    const cornerRadius = (d.cornerRadius ?? 0);
    const rectAttrs = `x="${barsX}" y="${rowY}" width="${w}" height="${BAR_HEIGHT}" fill="${TOKENS.color.teal}"${cornerRadius > 0 ? ` rx="${cornerRadius}" ry="${cornerRadius}"` : ""}`;
    const valueX = barsX + w + 12;
    const valueY = rowY + BAR_HEIGHT / 2 + 5;
    const valueLabel = `<text x="${valueX}" y="${valueY}" text-anchor="start" font-family="Lato" font-size="14" font-weight="400" fill="${recipe.valueColor}">${escapeXml(d.value)}</text>`;
    return `<rect ${rectAttrs}/>${valueLabel}`;
  }).join("");

  // ----- footer
  const footerY = plotY + plotH + (card.footerGap ?? 20);
  const footer = composeFooter({ x: pL, y: footerY, width: innerW, fixture, recipe });

  // ----- card height
  const totalH = footerY + footer.height + pB;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${totalH}" viewBox="0 0 ${card.width} ${totalH}">
${defs()}
${composeFrame({ width: card.width, height: totalH, recipe })}
${header.svg}
${labelsSvg}
${barsSvg}
${footer.svg}
</svg>`;
}

// ----- composer: vertical-bar (no axes) -----------------------------------------------------
async function composeVerticalBar(fixture) {
  const card = fixture.card;
  const recipe = RECIPES[card.surface];
  if (!recipe) throw new Error(`Unknown surface: ${card.surface}`);
  const [pT, pR, pB, pL] = card.padding;
  const innerW = card.width - pL - pR;

  // Layout constants from Figma 70:8617
  const PLOT_PAD_LR = 16;       // plot horizontal padding
  const COL_GAP = 32;           // gap between columns
  const COL_W = 80;             // column width = bar width
  const TRACK_H = 320;          // fixed track height
  const VALUE_TO_TRACK_GAP = 10;
  const TRACK_TO_CAT_GAP = 10;
  const VALUE_LABEL_H = 21;     // 14pt @ 150% = 21
  const CAT_LABEL_H = 21;
  const COL_H = VALUE_LABEL_H + VALUE_TO_TRACK_GAP + TRACK_H + TRACK_TO_CAT_GAP + CAT_LABEL_H;
  const data = fixture.plot.data.values;
  const maxValue = fixture.plot.scale?.max ?? Math.max(...data.map((d) => d.value));

  // ----- header
  const headerY = pT;
  const header = composeHeader({ x: pL, y: headerY, fixture, recipe });
  const headerGap = card.headerGap ?? 20;

  // ----- plot
  const plotY = headerY + header.height + headerGap;
  const nCols = data.length;
  const totalColsW = nCols * COL_W + (nCols - 1) * COL_GAP;
  const plotInnerStart = pL + PLOT_PAD_LR + Math.max(0, (innerW - 2 * PLOT_PAD_LR - totalColsW) / 2);

  const plotSvg = data.map((d, i) => {
    const colX = plotInnerStart + i * (COL_W + COL_GAP);
    const valueY = plotY + VALUE_LABEL_H - 5;
    const trackY = plotY + VALUE_LABEL_H + VALUE_TO_TRACK_GAP;
    const barH = (d.value / maxValue) * TRACK_H;
    const barY = trackY + (TRACK_H - barH);
    const catY = trackY + TRACK_H + TRACK_TO_CAT_GAP + 14;
    const value = `<text x="${colX}" y="${valueY}" font-family="Lato" font-size="14" font-weight="400" fill="${recipe.valueColor}">${escapeXml(d.value)}</text>`;
    const bar = `<rect x="${colX}" y="${barY}" width="${COL_W}" height="${barH}" fill="${TOKENS.color.teal}"/>`;
    const cat = `<text x="${colX + COL_W / 2}" y="${catY}" text-anchor="middle" font-family="Lato" font-size="14" font-weight="400" fill="${recipe.labelColor}">${escapeXml(d.category)}</text>`;
    return value + bar + cat;
  }).join("");

  const plotH = COL_H;

  // ----- footer
  const footerY = plotY + plotH + (card.footerGap ?? 20);
  const footer = composeFooter({ x: pL, y: footerY, width: innerW, fixture, recipe });

  const totalH = footerY + footer.height + pB;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${totalH}" viewBox="0 0 ${card.width} ${totalH}">
${defs()}
${composeFrame({ width: card.width, height: totalH, recipe })}
${header.svg}
${plotSvg}
${footer.svg}
</svg>`;
}

// ----- composer: vertical-bar-axes (with negative bars + dashed gridlines + zero line) -----
async function composeVerticalBarAxes(fixture) {
  const card = fixture.card;
  const recipe = RECIPES[card.surface];
  if (!recipe) throw new Error(`Unknown surface: ${card.surface}`);
  const [pT, pR, pB, pL] = card.padding;
  const innerW = card.width - pL - pR;

  // Layout constants from Figma 70:8705 (card 960 × 669, padding 40/48/40/48, gap 28)
  const Y_AXIS_W = 48;            // y-axis label gutter
  const PLOT_W = innerW - Y_AXIS_W;
  const PLOT_H = 420;
  const BAR_W = 110;
  const data = fixture.plot.data.values;
  const ticks = fixture.plot.scale?.ticks ?? [-3, -2, 0, 2, 4, 6, 8];
  const yMin = Math.min(...ticks);
  const yMax = Math.max(...ticks);
  const yToPx = (v) => PLOT_H - ((v - yMin) / (yMax - yMin)) * PLOT_H;
  const zeroY = yToPx(0);
  const nBars = data.length;

  // ----- header
  const headerY = pT;
  const header = composeHeader({ x: pL, y: headerY, fixture, recipe });
  const headerGap = card.headerGap ?? 28;

  // ----- plot
  const plotY = headerY + header.height + headerGap;
  const plotXStart = pL + Y_AXIS_W;

  // Y-axis labels + gridlines
  const yLabelsAndGrids = ticks.map((t) => {
    const py = plotY + yToPx(t);
    const label = `<text x="${plotXStart - 12}" y="${py + 5}" text-anchor="end" font-family="Lato" font-size="14" font-weight="400" fill="${TOKENS.color.gray02}">${t}</text>`;
    const isZero = t === 0;
    const lineColor = isZero ? TOKENS.color.gray02 : TOKENS.color.gray01;
    const dashAttr = isZero ? "" : ` stroke-dasharray="2 5"`;
    const line = `<line x1="${plotXStart}" y1="${py}" x2="${plotXStart + PLOT_W}" y2="${py}" stroke="${lineColor}" stroke-width="1"${dashAttr}/>`;
    return label + line;
  }).join("");

  // Bars + value labels + category labels
  const barSlotW = PLOT_W / nBars;
  const barOffset = (barSlotW - BAR_W) / 2;
  const barsAndLabels = data.map((d, i) => {
    const slotX = plotXStart + i * barSlotW;
    const barX = slotX + barOffset;
    const barTop = yToPx(Math.max(0, d.value));
    const barBottom = yToPx(Math.min(0, d.value));
    const barH = barBottom - barTop;
    const isPositive = d.value >= 0;
    const fill = isPositive ? TOKENS.color.teal : TOKENS.color.gray02;
    const strokeAttr = isPositive ? "" : ` stroke="${TOKENS.color.gray01}" stroke-width="1"`;
    const bar = `<rect x="${barX}" y="${plotY + barTop}" width="${BAR_W}" height="${barH}" fill="${fill}"${strokeAttr}/>`;
    const valueY = isPositive ? plotY + barTop - 8 : plotY + barBottom + 22;
    const value = `<text x="${barX + BAR_W / 2}" y="${valueY}" text-anchor="middle" font-family="Lato" font-size="14" font-weight="400" fill="${TOKENS.color.black}">${escapeXml(d.value)}</text>`;
    const catY = plotY + PLOT_H + 22;
    const cat = `<text x="${barX + BAR_W / 2}" y="${catY}" text-anchor="middle" font-family="Lato" font-size="14" font-weight="400" fill="${TOKENS.color.gray02}">${escapeXml(d.category)}</text>`;
    return bar + value + cat;
  }).join("");

  // ----- footer
  const plotH = PLOT_H + 28; // include space for x-axis category labels
  const footerY = plotY + plotH + (card.footerGap ?? 28);
  const footer = composeFooter({ x: pL, y: footerY, width: innerW, fixture, recipe });

  const totalH = footerY + footer.height + pB;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${totalH}" viewBox="0 0 ${card.width} ${totalH}">
${defs()}
${composeFrame({ width: card.width, height: totalH, recipe })}
${header.svg}
${yLabelsAndGrids}
${barsAndLabels}
${footer.svg}
</svg>`;
}

// ----- composer: radial (dramatic + light share the same composer; surface flips colors) ----
function composeRadialPath({ cx, cy, r, innerR, fromAngle, toAngle, fill }) {
  // Build an SVG path that draws an annular sector from fromAngle to toAngle (radians, 0 = right, increases clockwise)
  // Convert to: 0 = up (12 o'clock), increases clockwise per Figma encoding (arc startAngle = 4.71 rad ≈ 12 o'clock).
  const polar = (cx, cy, r, a) => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  const a0 = fromAngle - Math.PI / 2;
  const a1 = toAngle - Math.PI / 2;
  const sweep = a1 - a0;
  const largeArc = sweep > Math.PI ? 1 : 0;
  const p1 = polar(cx, cy, r, a0);
  const p2 = polar(cx, cy, r, a1);
  const p3 = polar(cx, cy, innerR, a1);
  const p4 = polar(cx, cy, innerR, a0);
  return `<path d="M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z" fill="${fill}"/>`;
}

async function composeRadial(fixture) {
  const card = fixture.card;
  const recipe = RECIPES[card.surface];
  if (!recipe) throw new Error(`Unknown surface: ${card.surface}`);
  const [pT, pR, pB, pL] = card.padding;
  const innerW = card.width - pL - pR;

  // Layout constants from Figma 70:8651 / 70:8678
  const RING_SIZE = 200;
  const RING_INNER_RATIO = 0.88;
  const PLOT_PAD_LR = 40;
  const CELL_GAP = 40;
  const CELL_LABEL_GAP = 16;
  const RING_LABEL_H = 21;

  const data = fixture.plot.data.values;
  const palette = [TOKENS.color.signalStop, TOKENS.color.signalSky, TOKENS.color.signalGo];
  const isDramatic = card.surface === "teal";
  const trackColor = isDramatic ? "rgba(255,255,255,0.25)" : TOKENS.color.gray01;
  const centerColor = isDramatic ? TOKENS.color.white : TOKENS.color.black;
  const labelColor = isDramatic ? TOKENS.color.white : TOKENS.color.black;

  // ----- header
  const headerY = pT;
  const header = composeHeader({ x: pL, y: headerY, fixture, recipe });
  const headerGap = card.headerGap ?? 20;

  // ----- plot
  const plotY = headerY + header.height + headerGap;
  const nCells = data.length;
  const cellW = (innerW - 2 * PLOT_PAD_LR - (nCells - 1) * CELL_GAP) / nCells;
  const plotInnerStart = pL + PLOT_PAD_LR;

  const cellsSvg = data.map((d, i) => {
    const cellX = plotInnerStart + i * (cellW + CELL_GAP);
    const ringCx = cellX + cellW / 2;
    const ringCy = plotY + RING_SIZE / 2;
    const r = RING_SIZE / 2;
    const innerR = r * RING_INNER_RATIO;
    // Track ring (full circle as full annulus drawn as 2 halves to avoid 0-degree path issues)
    const trackTop = `<path d="M ${ringCx - r} ${ringCy} A ${r} ${r} 0 1 1 ${ringCx + r} ${ringCy} L ${ringCx + innerR} ${ringCy} A ${innerR} ${innerR} 0 1 0 ${ringCx - innerR} ${ringCy} Z" fill="${trackColor}"/>`;
    const trackBot = `<path d="M ${ringCx + r} ${ringCy} A ${r} ${r} 0 1 1 ${ringCx - r} ${ringCy} L ${ringCx - innerR} ${ringCy} A ${innerR} ${innerR} 0 1 0 ${ringCx + innerR} ${ringCy} Z" fill="${trackColor}"/>`;
    // Data ring — clockwise from 12 o'clock by percentage
    const pct = d.percentage / 100;
    const dataArc = composeRadialPath({
      cx: ringCx,
      cy: ringCy,
      r,
      innerR,
      fromAngle: 0,
      toAngle: 2 * Math.PI * pct,
      fill: palette[i % palette.length],
    });
    // Center percentage text
    const center = `<text x="${ringCx}" y="${ringCy + 14}" text-anchor="middle" font-family="PT Serif" font-size="40" font-weight="400" fill="${centerColor}">${escapeXml(d.percentage)}%</text>`;
    // Cell label below
    const labelY = plotY + RING_SIZE + CELL_LABEL_GAP + 14;
    const label = `<text x="${ringCx}" y="${labelY}" text-anchor="middle" font-family="Lato" font-size="14" font-weight="400" fill="${labelColor}">${escapeXml(d.label)}</text>`;
    return trackTop + trackBot + dataArc + center + label;
  }).join("");

  const plotH = RING_SIZE + CELL_LABEL_GAP + RING_LABEL_H;

  // ----- footer
  const footerY = plotY + plotH + (card.footerGap ?? 20);
  const footer = composeFooter({ x: pL, y: footerY, width: innerW, fixture, recipe });

  const totalH = footerY + footer.height + pB;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${totalH}" viewBox="0 0 ${card.width} ${totalH}">
${defs()}
${composeFrame({ width: card.width, height: totalH, recipe })}
${header.svg}
${cellsSvg}
${footer.svg}
</svg>`;
}

// ----- composer: stat-infographic (2-up / 3-up / 4-up) -------------------------------------
// Per chunks/stat-infographic.md R-STAT-001..005.
async function composeStatInfographic(fixture) {
  const card = fixture.card ?? {};
  const colCount = fixture.stats?.length ?? 3;
  const outerWidth = card.width ?? (colCount === 2 ? 960 : colCount === 4 ? 1480 : 1240);
  const surface = card.surface ?? "white";
  const surfaceFill = surface === "off-white" ? TOKENS.color.offWhite : TOKENS.color.white;

  // Body
  const bodyPad = card.padding ?? [48, 56, 48, 56];
  const [pT, pR, pB, pL] = bodyPad;
  const bodyInnerW = outerWidth - pL - pR;
  const colGap = 40;
  const colW = (bodyInnerW - colGap * (colCount - 1)) / colCount;

  const ICON_SIZE = 48;
  const ICON_TO_STAT_GAP = 20;
  const STAT_TO_CAPTION_GAP = 20;
  const STAT_LH = 28 * 1.20; // 33.6
  const CAPTION_LH = 16 * 1.40; // 22.4
  // Estimate caption height by line count (rough: chars / chars-per-line)
  function estimateCaptionLines(text, widthPx) {
    const charsPerLine = Math.floor(widthPx / 7); // ~7px per char at Lato 16 (matches Figma)
    const lines = Math.max(1, Math.ceil((text?.length ?? 0) / charsPerLine));
    return Math.min(lines, 4);
  }

  const captionLines = fixture.stats.map((s) => estimateCaptionLines(s.caption ?? "", colW));
  const colH = ICON_SIZE + ICON_TO_STAT_GAP + STAT_LH + STAT_TO_CAPTION_GAP + Math.max(...captionLines) * CAPTION_LH;
  const bodyH = pT + colH + pB;

  // Footer
  const footerPad = [14, 20, 14, 20];
  const [fpT, fpR, fpB, fpL] = footerPad;
  const FOOTER_ICON_SIZE = 24;
  const FOOTER_TITLE_LH = 18 * 1.20; // 21.6
  const footerInnerH = Math.max(FOOTER_ICON_SIZE, FOOTER_TITLE_LH);
  const footerH = fpT + footerInnerH + fpB;

  // Divider
  const DIVIDER_H = 2;

  // Total
  const totalH = bodyH + DIVIDER_H + footerH;

  // ----- compose body
  const colsSvg = fixture.stats.map((stat, i) => {
    const colX = pL + i * (colW + colGap);
    const iconY = pT;
    const statY = iconY + ICON_SIZE + ICON_TO_STAT_GAP;
    const captionY = statY + STAT_LH + STAT_TO_CAPTION_GAP;
    const icon = phosphorIcon({
      name: stat.icon ?? "check-circle",
      weight: "regular",
      x: colX,
      y: iconY,
      size: ICON_SIZE,
      color: TOKENS.color.signalGo,
    });
    const value = `<text x="${colX}" y="${statY + 28}" font-family="PT Serif" font-size="28" font-weight="400" fill="${TOKENS.color.black}">${escapeXml(stat.value)}</text>`;
    const captionLines = wrapCaption(stat.caption ?? "", colW);
    const caption = captionLines.map((line, idx) =>
      `<text x="${colX}" y="${captionY + 16 + idx * CAPTION_LH}" font-family="Lato" font-size="16" font-weight="400" fill="${TOKENS.color.gray02}">${escapeXml(line)}</text>`
    ).join("");
    return icon + value + caption;
  }).join("");

  // ----- compose divider
  const dividerY = bodyH;
  const divider = `<rect x="0" y="${dividerY}" width="${outerWidth}" height="${DIVIDER_H}" fill="${TOKENS.color.signalGo}"/>`;

  // ----- compose footer
  const footerY = bodyH + DIVIDER_H;
  const footerIconX = fpL;
  const footerIconY = footerY + fpT + (footerInnerH - FOOTER_ICON_SIZE) / 2;
  const footerIcon = phosphorIcon({
    name: fixture.footer?.icon ?? "shield-check",
    weight: "fill",
    x: footerIconX,
    y: footerIconY,
    size: FOOTER_ICON_SIZE,
    color: TOKENS.color.signalGo,
  });
  const footerTextX = footerIconX + FOOTER_ICON_SIZE + 12;
  const footerTextY = footerY + fpT + footerInnerH / 2 + 6;
  const footerTitle = `<text x="${footerTextX}" y="${footerTextY}" font-family="PT Serif" font-size="18" font-weight="400" fill="${TOKENS.color.signalGo}">${escapeXml(fixture.footer?.title ?? "")}</text>`;

  // ----- compose outer frame
  // Border is 2px OUTSIDE — we render the inner card and add a 2px stroke OUTSIDE by inflating viewBox by 2 on all sides.
  const stroke = 2;
  const fullW = outerWidth + 2 * stroke;
  const fullH = totalH + 2 * stroke;
  const innerRect = `<rect x="${stroke}" y="${stroke}" width="${outerWidth}" height="${totalH}" fill="${surfaceFill}" stroke="${TOKENS.color.signalGo}" stroke-width="${stroke}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${fullW}" height="${fullH}" viewBox="0 0 ${fullW} ${fullH}">
${innerRect}
<g transform="translate(${stroke}, ${stroke})">
${colsSvg}
${divider}
${footerIcon}
${footerTitle}
</g>
</svg>`;
}

// ----- composer: flow-diagram (agentic / system / pipeline diagrams) -----------------------
// Per chunks/diagram.md R-DIAG-001..006.
//
// Fixture shape:
//   {
//     "id": "memory-pipeline",
//     "type": "flow-diagram",
//     "card": { "width": 1332, "bodyHeight": 640 },
//     "footer": { "icon": "shield-check", "title": "Memory pipeline" },
//     "nodes": [
//       {"id": "task",  "type": "pill",        "x": 60,  "y": 80,  "icon": "file-text", "label": "Task description"},
//       {"id": "agent", "type": "accent-teal", "x": 60,  "y": 220, "icon": "user",      "label": "Agent 1"},
//       {"id": "api",   "type": "accent-go",   "x": 700, "y": 220, "icon": "file-text", "label": "Memory API"},
//       {"id": "code1", "type": "code",        "x": 380, "y": 380, "text": "memory: {\n  subject: ...\n}"}
//     ],
//     "edges": [
//       {"from": "task",  "to": "agent", "kind": "data-flow", "path": [[60, 122], [60, 220]]},
//       {"from": "agent", "to": "api",   "kind": "data-flow", "path": [[260, 285], [700, 285]]},
//       {"from": "task",  "to": "api",   "kind": "logical",   "path": [[225, 102], [780, 102], [780, 220]]}
//     ]
//   }
async function composeFlowDiagram(fixture) {
  const card = fixture.card ?? {};
  const W = card.width ?? 1332;
  const bodyH = card.bodyHeight ?? 640;
  const showFooter = fixture.footer != null;

  // Footer band (TOP)
  const footerH = showFooter ? 60 : 0;
  const footerPad = [16, 12, 16, 12];
  const [fpT, fpR, fpB, fpL] = footerPad;
  const footerY = 0;
  const FOOTER_ICON_SIZE = 28;

  // Body envelope
  const bodyY = footerH;

  // Total
  const totalH = footerH + bodyH;

  // Footer SVG
  let footerSvg = "";
  if (showFooter) {
    const footerRect = `<rect x="0" y="${footerY}" width="${W}" height="${footerH}" fill="${TOKENS.color.offWhite}" stroke="${TOKENS.color.gray01}" stroke-width="1" stroke-dasharray="0" />`;
    // Override stroke per R-DIAG-001 — top + right + left only (no bottom). Achieve via two strokes: outline rect with no fill stroke + 3 separate lines.
    const footerFill = `<rect x="0" y="${footerY}" width="${W}" height="${footerH}" fill="${TOKENS.color.offWhite}"/>`;
    const footerTop = `<line x1="0" y1="${footerY + 0.5}" x2="${W}" y2="${footerY + 0.5}" stroke="${TOKENS.color.gray01}" stroke-width="1"/>`;
    const footerLeft = `<line x1="0.5" y1="${footerY}" x2="0.5" y2="${footerY + footerH}" stroke="${TOKENS.color.gray01}" stroke-width="1"/>`;
    const footerRight = `<line x1="${W - 0.5}" y1="${footerY}" x2="${W - 0.5}" y2="${footerY + footerH}" stroke="${TOKENS.color.gray01}" stroke-width="1"/>`;
    let inner = "";
    let cursorX = fpL;
    if (fixture.footer.icon) {
      const iconY = footerY + fpT + (footerH - fpT - fpB - FOOTER_ICON_SIZE) / 2;
      inner += phosphorIcon({
        name: fixture.footer.icon,
        weight: "regular",
        x: cursorX,
        y: iconY,
        size: FOOTER_ICON_SIZE,
        color: TOKENS.color.black,
      });
      cursorX += FOOTER_ICON_SIZE + 14;
    }
    if (fixture.footer.title) {
      const textY = footerY + footerH / 2 + 7;
      inner += `<text x="${cursorX}" y="${textY}" font-family="PT Serif" font-size="20" font-weight="400" fill="${TOKENS.color.black}">${escapeXml(fixture.footer.title)}</text>`;
    }
    footerSvg = footerFill + footerTop + footerLeft + footerRight + inner;
  }

  // Body envelope
  const bodyRect = `<rect x="0.5" y="${bodyY + 0.5}" width="${W - 1}" height="${bodyH - 1}" fill="${TOKENS.color.offWhite}" stroke="${TOKENS.color.gray01}" stroke-width="1"/>`;

  // Render nodes
  const nodesSvg = (fixture.nodes ?? []).map((node) => renderDiagramNode(node, bodyY)).join("");

  // Render connectors (edges)
  const edgesSvg = (fixture.edges ?? []).map((edge) => renderDiagramEdge(edge, bodyY)).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${totalH}" viewBox="0 0 ${W} ${totalH}">
${footerSvg}
${bodyRect}
${edgesSvg}
${nodesSvg}
</svg>`;
}

function renderDiagramNode(node, bodyY) {
  const x = node.x;
  const y = bodyY + node.y;
  switch (node.type) {
    case "pill":
      return renderPillNode({ ...node, x, y });
    case "accent-teal":
      return renderAccentNode({ ...node, x, y, fill: TOKENS.color.teal, fg: TOKENS.color.white });
    case "accent-go":
      return renderAccentNode({ ...node, x, y, fill: TOKENS.color.signalGo, fg: TOKENS.color.teal });
    case "code":
      return renderCodeNode({ ...node, x, y });
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

function pillNodeWidth(node) {
  const PAD_LR = 20;
  const ICON_W = node.icon ? 18 : 0;
  const GAP = node.icon ? 8 : 0;
  // Estimate label width at Lato 14: ~7.2px per char average
  const labelW = (node.label?.length ?? 0) * 7.2;
  return PAD_LR + ICON_W + GAP + labelW + PAD_LR;
}

function pillNodeHeight() {
  return 42; // 12 + 18(icon)/14(label) + 12, height fits both
}

function renderPillNode(node) {
  const w = pillNodeWidth(node);
  const h = pillNodeHeight();
  const r = 99;
  const rect = `<rect x="${node.x}" y="${node.y}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${TOKENS.color.white}" stroke="${TOKENS.color.gray01}" stroke-width="1"/>`;
  let cursorX = node.x + 20;
  let inner = "";
  if (node.icon) {
    inner += phosphorIcon({
      name: node.icon,
      weight: "regular",
      x: cursorX,
      y: node.y + (h - 18) / 2,
      size: 18,
      color: TOKENS.color.black,
    });
    cursorX += 18 + 8;
  }
  if (node.label) {
    inner += `<text x="${cursorX}" y="${node.y + h / 2 + 5}" font-family="Lato" font-size="14" font-weight="400" fill="${TOKENS.color.black}">${escapeXml(node.label)}</text>`;
  }
  return rect + inner;
}

function renderAccentNode(node) {
  const w = 200;
  const h = 130;
  const rect = `<rect x="${node.x}" y="${node.y}" width="${w}" height="${h}" fill="${node.fill}"/>`;
  const cx = node.x + w / 2;
  const cy = node.y + h / 2;
  let inner = "";
  // Vertically stack icon + label centered
  const ICON_SIZE = 28;
  const GAP = 8;
  const TEXT_H = 16;
  const totalContentH = ICON_SIZE + GAP + TEXT_H;
  const iconTop = cy - totalContentH / 2;
  const textBaseline = iconTop + ICON_SIZE + GAP + 14;
  if (node.icon) {
    inner += phosphorIcon({
      name: node.icon,
      weight: "regular",
      x: cx - ICON_SIZE / 2,
      y: iconTop,
      size: ICON_SIZE,
      color: node.fg,
    });
  }
  if (node.label) {
    inner += `<text x="${cx}" y="${textBaseline}" text-anchor="middle" font-family="Lato" font-size="16" font-weight="400" fill="${node.fg}">${escapeXml(node.label)}</text>`;
  }
  return rect + inner;
}

function renderCodeNode(node) {
  const w = node.width ?? 108;
  const PAD_TB = 16;
  const PAD_LR = 18;
  const lines = (node.text ?? "").split("\n");
  const lineH = 13 * 1.6; // 20.8
  const h = PAD_TB * 2 + lines.length * lineH;
  const rect = `<rect x="${node.x}" y="${node.y}" width="${w}" height="${h}" fill="${TOKENS.color.white}" stroke="${TOKENS.color.gray01}" stroke-width="1"/>`;
  const linesSvg = lines.map((line, i) => {
    const ly = node.y + PAD_TB + (i + 1) * lineH - 5;
    return `<text x="${node.x + PAD_LR}" y="${ly}" font-family="Lato" font-size="13" font-weight="400" fill="${TOKENS.color.black}">${escapeXml(line)}</text>`;
  }).join("");
  return rect + linesSvg;
}

function renderDiagramEdge(edge, bodyY) {
  if (!edge.path || edge.path.length < 2) return "";
  const projected = edge.path.map(([x, y]) => [x, bodyY + y]);
  const points = projected.map(([x, y]) => `${x},${y}`).join(" ");
  const isLogical = edge.kind === "logical";
  const stroke = isLogical ? TOKENS.color.gray02 : TOKENS.color.signalGo;
  const dashAttr = isLogical ? ` stroke-dasharray="4 4"` : "";
  const line = `<polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="2"${dashAttr}/>`;

  // Endpoint markers per R-DIAG-004:
  //   data-flow: small filled circle (signal-go) at source + destination
  //   logical:   small triangular arrowhead (gray-02) at destination only
  const [sx, sy] = projected[0];
  const [tx, ty] = projected[projected.length - 1];
  let markers = "";
  if (!isLogical) {
    markers += `<circle cx="${sx}" cy="${sy}" r="4" fill="${TOKENS.color.signalGo}"/>`;
    markers += `<circle cx="${tx}" cy="${ty}" r="4" fill="${TOKENS.color.signalGo}"/>`;
  } else {
    // Compute arrow direction from the last segment
    const [px, py] = projected[projected.length - 2];
    const dx = tx - px;
    const dy = ty - py;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    // Arrow points: tip at (tx, ty), back-corner-1 + back-corner-2 forming a small triangle
    const sz = 7;
    const wx = -uy * (sz / 2);
    const wy = ux * (sz / 2);
    const bx = tx - ux * sz;
    const by = ty - uy * sz;
    const c1x = bx + wx;
    const c1y = by + wy;
    const c2x = bx - wx;
    const c2y = by - wy;
    markers += `<polygon points="${tx},${ty} ${c1x},${c1y} ${c2x},${c2y}" fill="${TOKENS.color.gray02}"/>`;
  }
  return line + markers;
}

// Greedy word wrap for caption lines
function wrapCaption(text, widthPx) {
  if (!text) return [];
  const charsPerLine = Math.floor(widthPx / 7); // tuned to Lato 16 actual width
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > charsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// ----- main --------------------------------------------------------------------------------
const COMPOSERS = {
  "horizontal-bar": composeHorizontalBar,
  "vertical-bar": composeVerticalBar,
  "vertical-bar-axes": composeVerticalBarAxes,
  "radial-dramatic": composeRadial,
  "radial-light": composeRadial,
  "stat-infographic-2up": composeStatInfographic,
  "stat-infographic-3up": composeStatInfographic,
  "stat-infographic-4up": composeStatInfographic,
  "stat-infographic":     composeStatInfographic, // alias for 3-up default
  "flow-diagram":         composeFlowDiagram,
  "diagram":              composeFlowDiagram,     // alias
};

async function main() {
  const inputArg = process.argv[2];
  const outputArg = process.argv[3];
  if (!inputArg) {
    console.error("Usage: compose.mjs <fixture.chart.json> [output.svg]");
    process.exit(1);
  }
  const fixture = JSON.parse(fs.readFileSync(inputArg, "utf8"));
  const composer = COMPOSERS[fixture.type];
  if (!composer) {
    console.error(`No composer for chart type: ${fixture.type}`);
    console.error(`Implemented types: ${Object.keys(COMPOSERS).join(", ")}`);
    process.exit(1);
  }
  const out = await composer(fixture);
  const outPath = outputArg || `output/${fixture.id}.svg`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out, "utf8");
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
