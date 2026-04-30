/**
 * Shared content types for Satori frames.
 *
 * Frames take a `FrameContent` and dispatch on `content.pattern` to render the
 * right component. The pattern union is a discriminated union, so TypeScript
 * narrows the body shape inside each case.
 */

import type { Surface } from "./tokens";

export type StatItem = {
  value: string;
  label: string;
  source?: string;
};

export type StatPanelContent = {
  pattern: "stat-panel";
  /** Optional headline above the panel. Omit for stat-only compositions. */
  headline?: string;
  stats: [StatItem] | [StatItem, StatItem] | [StatItem, StatItem, StatItem];
};

export type QuoteContent = {
  pattern: "quote";
  quote: string;
  /** Optional attribution line below the quote (e.g., name + role). */
  attribution?: string;
};

export type AnnouncementContent = {
  pattern: "announcement";
  /** Optional small label above the headline. Sentence case, never uppercase
   *  letter-spaced — see `feedback_no_uppercase_eyebrows`. */
  eyebrow?: string;
  headline: string;
  /** Optional supporting line below the headline. */
  supporting?: string;
  /** Optional CTA URL or short call-to-action. */
  cta?: string;
};

export type PatternContent =
  | StatPanelContent
  | QuoteContent
  | AnnouncementContent;

/** Top-level content payload that every frame fixture conforms to. */
export type FrameContent = {
  /** Top-level surface. Drives lockup variant and text colors. */
  surface: Surface;
  /** The pattern body to render. */
  content: PatternContent;
  /** Optional footer line at the bottom of the frame. */
  footerLine?: string;
};
