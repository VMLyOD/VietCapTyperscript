import { createTheme, MantineProvider, Button } from "@mantine/core";

const theme = createTheme({
  primaryColor: "green",
  primaryShade: 5,
  colors: {
    green: [
      "#dff7df",
      "#96eb99",
      "#6ade72",
      "#43d151",
      "#1fc435",
      "#00b71f",
      "#00911d",
      "#006b19",
      "#004512",
      "#001f09",
    ],
    red: [
      "#ffebe9",
      "#fdd7d3",
      "#f4aca7",
      "#ec7f78",
      "#e55950",
      "#e14136",
      "#e03428",
      "#c8261b",
      "#b21f17",
      "#9d1311",
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
  },
  fontSizes: {
    xs: "12px",
    sm: "12px",
    md: "12px",
    lg: "12px",
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
