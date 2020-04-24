import React from "react";

import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
  Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0, 0, 4),
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
}));

const ApiCredentialForm = ({
  open,
  onChange,
  onSubmit,
  initialValues = {},
}) => {
  const classes = useStyles();
  const [apiKey, setKey] = React.useState(initialValues.apiKey || "");
  const [apiSecret, setSecret] = React.useState(initialValues.apiSecret || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ apiKey, apiSecret });
  };
  return (
    <ExpansionPanel expanded={open} onChange={(e, b) => onChange(b)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h4">API Credentials</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{ width: "100%" }}>
          <Typography gutterBottom>These won't be shared anywhere</Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              id="apiKey"
              value={apiKey}
              onChange={(e) => setKey(e.currentTarget.value)}
              label="Bitmex Api ID"
              variant="outlined"
              fullWidth
              size="small"
            />
            <br />
            <br />
            <TextField
              id="apiSecret"
              value={apiSecret}
              onChange={(e) => setSecret(e.currentTarget.value)}
              label="Bitmex Api Secret"
              variant="outlined"
              fullWidth
              size="small"
            />
            <br />
            <br />
            <div style={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </div>
          </form>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ApiCredentialForm;
