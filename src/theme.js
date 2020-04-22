import mapValues from "lodash/mapValues";
import merge from "lodash/merge";

const base = {
  palette: {
    primary: {
      main: "#fe9526",
    },
    secondary: {
      main: "#ffcc30",
    },
    success: {
      main: "#53d86a",
    },
    error: {
      main: "#fd3d39",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        borderRadius: "1px",
        padding: "8px",
      },
    },
  },
  props: {
    MuiPaper: {
      // elevation: 0,
      square: true,
    },
  },
  typography: {
    htmlFontSize: 14,
    fontFamily: ["Open Sans", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.986rem",
    },
    h2: {
      fontSize: "2.488rem",
    },
    h3: {
      fontSize: "2.074rem",
    },
    h4: {
      fontSize: "1.728rem",
    },
    h5: {
      fontSize: "1.44rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
  },
};

const themes = {};

themes.THEME_LIGHT = {
  palette: {
    type: "light",
  },
};

themes.THEME_DARK = {
  palette: {
    type: "dark",
    background: {
      default: "#0d1c2e",
      paper: "#162a3f",
    },
  },
};

export default mapValues(themes, (theme) => merge(theme, base));
