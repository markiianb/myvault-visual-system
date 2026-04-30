// AUTO-GENERATED from ../../tokens/brand.tokens.json — do not edit by hand.
// Regenerate with: pnpm build:tokens (or: node scripts/build-tokens.mjs)
//
// Source-of-truth is the W3C DTCG token file in 10-Brand/visual-system/tokens/.
// Components import named exports from this module; never hardcode hex/sizes.

export const colors = {
  "core": {
    "teal": "#094545",
    "white": "#FFFFFF",
    "offWhite": "#FBFAF5",
    "gray01": "#DDDCD6",
    "gray02": "#696969",
    "black": "#000000"
  },
  "secondary": {
    "premiumPurple": "#781C42",
    "darkEarth": "#502C0E",
    "richBlue": "#1C4778"
  },
  "signal": {
    "go": "#69DE49",
    "stop": "#E75247",
    "sky": "#4D80E6",
    "earth": "#928178"
  }
} as const;

export const fonts = {
  "serif": "PT Serif",
  "sans": "Lato"
} as const;

export const space = {
  "s0": 0,
  "s1": 4,
  "s2": 8,
  "s3": 12,
  "s4": 16,
  "s5": 20,
  "s6": 24,
  "s8": 32,
  "s10": 40,
  "s12": 48,
  "s16": 64,
  "s20": 80,
  "s24": 96,
  "s32": 128
} as const;

export const radius = {
  "none": 0,
  "xs": 2,
  "sm": 4,
  "md": 6,
  "lg": 8,
  "xl": 12,
  "2xl": 16,
  "3xl": 24,
  "full": 999
} as const;

export const typography = {
  "display": {
    "xxl": {
      "fontFamily": "PT Serif",
      "fontSize": 160,
      "lineHeight": 1.05
    },
    "xl": {
      "fontFamily": "PT Serif",
      "fontSize": 120,
      "lineHeight": 1.1
    },
    "l": {
      "fontFamily": "PT Serif",
      "fontSize": 96,
      "lineHeight": 1.1
    },
    "m": {
      "fontFamily": "PT Serif",
      "fontSize": 72,
      "lineHeight": 1.15
    },
    "s": {
      "fontFamily": "PT Serif",
      "fontSize": 56,
      "lineHeight": 1.15
    }
  },
  "heading": {
    "l": {
      "fontFamily": "PT Serif",
      "fontSize": 40,
      "lineHeight": 1.25
    },
    "m": {
      "fontFamily": "PT Serif",
      "fontSize": 28,
      "lineHeight": 1.3
    }
  },
  "body": {
    "xl": {
      "fontFamily": "Lato",
      "fontSize": 20,
      "lineHeight": 1.4
    },
    "l": {
      "fontFamily": "Lato",
      "fontSize": 18,
      "lineHeight": 1.55
    },
    "default": {
      "fontFamily": "Lato",
      "fontSize": 16,
      "lineHeight": 1.5
    },
    "s": {
      "fontFamily": "Lato",
      "fontSize": 14,
      "lineHeight": 1.5
    }
  },
  "caption": {
    "fontFamily": "Lato",
    "fontSize": 12,
    "lineHeight": 1.5
  }
} as const;

export const gradients = {
  "primary": [
    {
      "color": "#EFEBF5",
      "position": 0
    },
    {
      "color": "#E0E8E6",
      "position": 0.65
    }
  ],
  "cool": [
    {
      "color": "#FAFAFA",
      "position": 0
    },
    {
      "color": "#EFF0F4",
      "position": 0.65
    },
    {
      "color": "#D0D3DF",
      "position": 1
    }
  ],
  "warm": [
    {
      "color": "#FBF5F5",
      "position": 0
    },
    {
      "color": "#F2F2F0",
      "position": 0.52
    },
    {
      "color": "#E6DDDD",
      "position": 0.78
    },
    {
      "color": "#E7DCD4",
      "position": 1
    }
  ],
  "mist": [
    {
      "color": "#FBF5F5",
      "position": 0
    },
    {
      "color": "#F2F0F0",
      "position": 0.5
    },
    {
      "color": "#E6DDDD",
      "position": 0.75
    },
    {
      "color": "#DAD2DF",
      "position": 1
    }
  ],
  "greydient": [
    {
      "color": "#FBF7F5",
      "position": 0
    },
    {
      "color": "#FAF6F5",
      "position": 0.45
    },
    {
      "color": "#E0D2CE",
      "position": 0.75
    },
    {
      "color": "#9FBCBC",
      "position": 1
    }
  ]
} as const;

export type Surface = "teal" | "white" | "off-white";

/** Map a surface choice to the lockup variant that pairs with it.
 * Dark surfaces (teal) take the light lockup; light surfaces (white, off-white)
 * take the primary lockup. Per memory: the gray variant is deprecated. */
export const lockupForSurface = {
  teal: "light",
  white: "primary",
  "off-white": "primary",
} as const;

/** Map a surface choice to the body text color that pairs with it.
 * Per memory feedback_presentation_design_canon v1.1: body text on dark surfaces
 * is solid white, not opacity-reduced. */
export const onSurface = {
  teal:        { fg: colors.core.white,    fgMuted: colors.core.offWhite, fgDim: "rgba(251,250,245,0.65)" },
  white:       { fg: colors.core.black,    fgMuted: colors.core.gray02,   fgDim: colors.core.gray02 },
  "off-white": { fg: colors.core.black,    fgMuted: colors.core.gray02,   fgDim: colors.core.gray02 },
} as const;
