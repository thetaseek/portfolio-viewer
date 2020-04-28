import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Container } from "@material-ui/core";

import ApiCredentialForm from "../components/ApiCredentialForm";
import bitmex from "../services/bitmex";
import { Portfolio } from "../components/Portfolio";
// import {position, walletHistory, walletHistoryLarge} from "../data";

const styles = (theme) => ({
  container: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 2),
    },
  },
});

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      isAuthOpen: true,
      error: null,
      credentials: {},
      data: {
        // walletHistory: walletHistory,
        // position: position,
      },
    };
    this.handleAuthPanelChange = this.handleAuthPanelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthPanelChange(newState) {
    this.setState({ isAuthOpen: newState });
  }

  handleSubmit(credentials) {
    const { credentials: prev } = this.state;
    if (
      credentials.apiKey &&
      credentials.apiSecret &&
      (credentials.apiSecret !== prev.apiSecret ||
        credentials.apiKey !== prev.apiKey)
    ) {
      this.setState({
        credentials,
        fetching: true,
      });

      Promise.all([
        bitmex({ url: "/position" }, credentials),
        bitmex({ url: "/user/walletHistory" }, credentials),
      ])
        .then((r) => {
          const [position, walletHistory] = r;
          this.setState({
            isAuthOpen: false,
            fetching: false,
            data: {
              position,
              walletHistory,
            },
          });
        })
        .catch((error) => {
          this.setState({ error, fetching: false });
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { fetching, credentials, data, isAuthOpen, error } = this.state;

    return (
      <Container maxWidth="lg" className={classes.container}>
        <ApiCredentialForm
          open={isAuthOpen}
          onChange={this.handleAuthPanelChange}
          initialValues={credentials}
          onSubmit={(e) => this.handleSubmit(e)}
        />
        <Portfolio
          fetching={fetching}
          walletHistory={data.walletHistory}
          position={data.position}
          error={error}
        />
      </Container>
    );
  }
}
export default withStyles(styles)(MainPage);
