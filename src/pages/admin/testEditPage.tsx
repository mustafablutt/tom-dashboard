import { MenuItem } from "@material-ui/core";
import Grid from "@mui/joy/Grid/Grid";
import React from "react";

const Test: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={4} md={4}>
        <MenuItem>xs=4 md=4</MenuItem>
      </Grid>
      <Grid xs={4} md={4}>
        <MenuItem>xs=4 md=4</MenuItem>
      </Grid>
      <Grid xs={4} md={4}>
        <MenuItem>xs=4 md=4</MenuItem>
      </Grid>
      <Grid xs={2} md={2}>
        <MenuItem>xs=2 md=2</MenuItem>
      </Grid>
      <Grid xs={2} md={2}>
        <MenuItem>xs=2 md=2</MenuItem>
      </Grid>
      <Grid xs={2} md={2}>
        <MenuItem>xs=2 md=2</MenuItem>
      </Grid>
      <Grid xs={2} md={2}>
        <MenuItem>xs=2 md=2</MenuItem>
      </Grid>
      <Grid xs={2} md={2}>
        <MenuItem>xs=2 md=2</MenuItem>
      </Grid>
      <Grid xs={2} md={2}>
        <MenuItem>xs=2 md=2</MenuItem>
      </Grid>
    </Grid>
  );
};

export default Test;
