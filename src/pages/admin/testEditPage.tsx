import { MenuItem } from "@material-ui/core";
import Grid from "@mui/joy/Grid/Grid";

import React from "react";
import styled from "styled-components";

const Test: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={6} md={6}>
        <MenuItem>xs=6 md=6</MenuItem>
      </Grid>
      <Grid xs={6} md={6}>
        <MenuItem>xs=6 md=6</MenuItem>
      </Grid>
      <Grid xs={3} md={3}>
        <MenuItem>xs=3 md=3</MenuItem>
      </Grid>
      <Grid xs={3} md={3}>
        <MenuItem>xs=3 md=3</MenuItem>
      </Grid>
      <Grid xs={3} md={3}>
        <MenuItem>xs=3 md=3</MenuItem>
      </Grid>
      <Grid xs={3} md={3}>
        <MenuItem>xs=3 md=3</MenuItem>
      </Grid>
      <Grid xs={12} md={12}>
        <MenuItem>xs=12 md=12</MenuItem>
      </Grid>
    </Grid>
  );
};

export default Test;
