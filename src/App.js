import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import themes from "./theme";
import MainPage from "./Pages/Portfolio";

function App() {
  const [isDarkTheme, setTheme] = React.useState(false);
  const theme = createMuiTheme(
    isDarkTheme ? themes.THEME_DARK : themes.THEME_LIGHT
  );
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        style={{ padding: "0px" }}
      >
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Typography variant="h6">Portfolio Viewer</Typography>
            <Tooltip title="Toggle light/dark theme">
              <IconButton
                onClick={() => setTheme(!isDarkTheme)}
                aria-label="Toggle light/dark theme"
              >
                {isDarkTheme ? <BrightnessHighIcon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>

      <MainPage />
    </MuiThemeProvider>
  );
}

export default App;
