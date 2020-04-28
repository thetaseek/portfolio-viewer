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

const ApiCredentialForm = ({
  open,
  onChange,
  onSubmit,
  initialValues = {},
}) => {
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
          <Typography gutterBottom>
            These credentials stay in your browser and won't be saved anywhere.
          </Typography>
          <Typography gutterBottom variant="body2">
            The API signature is calculated by the browser so that the API
            secret never needs to be shared.
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              id="apiKey"
              value={apiKey}
              onChange={(e) => setKey(e.currentTarget.value)}
              label="Bitmex API ID"
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
              label="Bitmex API Secret"
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
