import { createTheme, Button } from "@mantine/core";

const theme = createTheme({
  primaryColor: "green",
  primaryShade: {
    light: 1,
    dark: 9,
  },
  colors: {
    primary: [
      "#ebffee",
      "#00b71f",
      "#a3feb1",
      "#70fe85",
      "#4cfe61",
      "#3bfe4b",
      "#32fe3f",
      "#28e231",
      "#1cc829",
      "rgba(0, 183, 31, 1)",
    ],
    green_BG: [
      "#ebffee",
      "rgba(208, 244, 217, 1)",
      "#a3feb1",
      "#70fe85",
      "#4cfe61",
      "#3bfe4b",
      "#32fe3f",
      "#28e231",
      "#1cc829",
      "rgba(13, 66, 21, 1)",
    ],
    red: [
      "#ffebe9",
      "#ff0000",
      "#f4aca7",
      "#ec7f78",
      "#e55950",
      "#e14136",
      "#e03428",
      "#c8261b",
      "#b21f17",
      "#ff0000",
    ],
    red_BG: [
      "#ffebe9",
      "rgba(255, 216, 214, 1)",
      "#f4aca7",
      "#ec7f78",
      "#e55950",
      "#e14136",
      "#e03428",
      "#c8261b",
      "#b21f17",
      "rgba(94, 5, 0, 1)",
    ],
    purple: [
      "#fceaff",
      "#b744f0",
      "#dca2fa",
      "#c770f5",
      "#b744f0",
      "#ac29ee",
      "#a719ee",
      "#910cd4",
      "#8206be",
      "#b744f0",
    ],
    yellow: [
      "#fffce1",
      "#ffd609",
      "#ffee9b",
      "#ffe564",
      "#ffdd38",
      "#ffd81c",
      "#e3bd00",
      "#c9a800",
      "#ae9000",
      "#ffd609",
    ],
    yellow_BG: [
      "#fffce1",
      "rgba(255, 245, 204, 1)",
      "#ffee9b",
      "#ffe564",
      "#ffdd38",
      "#ffd81c",
      "#e3bd00",
      "#c9a800",
      "#ae9000",
      "rgba(79, 66, 0, 1)",
    ],

    gray: [
      "#f4f4f5",
      "#e6e6e6",
      "#cbcbcb",
      "#afafaf",
      "#979797",
      "#888888",
      "#808081",
      "#6e6e6f",
      "#606065",
      "#53535a",
    ],
    blue: [
      "#e0fbff",
      "#64d2ff",
      "#9ae2ff",
      "#64d2ff",
      "#3cc5fe",
      "#23bcfe",
      "#09b8ff",
      "#00a1e4",
      "#0090cd",
      "#64d2ff",
    ],
    white: [
      "#f5f5f5",
      "#f5f5f5",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#f5f5f5",
    ],
    background: [
      "#f5f5f5",
      "#ffffff",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#000000",
    ],

    gray5: [
      "#f4f4f5",
      "rgba(245, 245, 250, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(39, 39, 42, 1)",
    ],
    gray_0: [
      "#f4f4f5",
      "rgba(255, 255, 255, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(17, 17, 17, 1)",
    ],
    gray_2: [
      "#f4f4f5",
      "#808089",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "#808089",
    ],
    gray_4: [
      "#f4f4f5",
      "#515157",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#515157",
      "#515157",
    ],
    gray_5: [
      "#f4f4f5",
      "rgba(245, 245, 250, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(39, 39, 42, 1)",
    ],
    gray_6: [
      "#f4f4f5",
      "#c4c4ce",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "#c4c4ce",
    ],
    gray_10: [
      "#f4f4f5",
      "rgba(235, 235, 240, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(56, 56, 61, 1)",
    ],
    gray_20: [
      "#f4f4f5",
      "rgba(221, 221, 227, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(81, 81, 87, 1)",
    ],
    gray_40: [
      "#f4f4f5",
      "rgba(166, 166, 176, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(128, 128, 137, 1)",
    ],
    gray_60: [
      "#f4f4f5",
      "rgba(100, 100, 109, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(196, 196, 206, 1)",
    ],
    gray_80: [
      "#f4f4f5",
      "rgba(56, 56, 61, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(235, 235, 240, 1)",
    ],
    gray_90: [
      "#f4f4f5",
      "rgba(39, 39, 42, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(245, 245, 250, 1)",
    ],
    gray_100: [
      "#f4f4f5",
      "rgba(17, 17, 17, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(255, 255, 255, 1)",
    ],
    gray_110: [
      "#f4f4f5",
      "rgba(100, 100, 109, 1)",
      "#cbcbcb",
      "#afafaf",
      "#989898",
      "#888888",
      "#818181",
      "#6e6e6f",
      "#616164",
      "rgba(255, 255, 255, 1)",
    ],

    transparent_10: [
      "#f5f5f51a",
      "rgba(17, 17, 17, 0.1)",
      "#cdcdcd1a",
      "#b2b2b21a",
      "#9a9a9a1a",
      "#8b8b8b1a",
      "#8484841a",
      "#7171711a",
      "#6565651a",
      "rgba(255, 255, 255, 0.1)",
    ],
    transparent_20: [
      "#f5f5f51a",
      "rgba(17, 17, 17, 0.2)",
      "#cdcdcd1a",
      "#b2b2b21a",
      "#9a9a9a1a",
      "#8b8b8b1a",
      "#8484841a",
      "#7171711a",
      "#6565651a",
      "rgba(255, 255, 255, 0.2)",
    ],
  },
  fontSizes: {
    xs: "12px",
    sm: "12px",
    md: "12px",
    lg: "50px",
    xl: "12px",
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "4px",
      },
    }),
  },
});

export default theme;
