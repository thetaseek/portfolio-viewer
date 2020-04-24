import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Grid,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from "@material-ui/core";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import themes from "./theme";
import { Portfolio } from "./Portfolio";

function App() {
  const [isDarkTheme, setTheme] = React.useState(false);
  const theme = createMuiTheme(
    isDarkTheme ? themes.THEME_DARK : themes.THEME_LIGHT
  );

  // const proxy = 'https://cors-anywhere.coincuro.com/';
  // // const proxy = 'https://thingproxy.freeboard.io/fetch/';
  // const req = 'https://www.bitmex.com/api/v1/instrument?count=100&reverse=false';
  //
  // const url = proxy + req;
  // console.log(url)
  // React.useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url,
  //   })
  //     .then(r => console.log(r.data))
  //     .catch(e => {
  //       console.error(e.response.status);
  //       console.error(e.response.data);
  //       console.error(e.response);
  //       console.error(e);
  //       return e;
  //     });
  // })
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        // style={{ padding: "0px", backgroundColor: "#061424" }}
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

      <Portfolio />
    </MuiThemeProvider>
  );
}

export default App;
