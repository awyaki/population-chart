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
      sm: "calc(1rem + .5vw)",
      md: "calc(1.2rem + .5vw)",
      lg: "calc(1.4rem + .5vw)",
      xl: "calc(1.6rem + .5vw)",
    },
  },
});
