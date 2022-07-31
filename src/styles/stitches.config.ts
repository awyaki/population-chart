import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  media: {
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
  },
  theme: {
    fontSizes: {
      sm: "clamp(1rem, 0.75rem + 1.5vw, 2rem)",
      md: "clamp(1.3rem, 1.05rem + 1.5vw, 2.3rem)",
      lg: "clamp(1.5rem, 1.25rem + 1.5vw, 2.5rem)",
      xl: "clamp(1.7rem, 1.45rem + 1.5vw, 2.7rem)",
    },
  },
});
