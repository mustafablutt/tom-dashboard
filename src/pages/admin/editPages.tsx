import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { GridGenerator } from "./components/gridGenerator";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Box from "@mui/joy/Box";
import SelectGroupedOptions from "./components/pagesListDropdown";

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const [generatedGrid, setGeneratedGrid] = React.useState<JSX.Element[]>([]); // State to store generated grid

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const handleGridGenerated = (grid: JSX.Element[]) => {
    setGeneratedGrid(grid);
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ flexGrow: 1, ml: 10, mt: 5 }}
    >
      <Grid item xs={0}>
        <Paper sx={{ p: 2, border: 1 }}>
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "20px",
              color: "black",
              marginLeft: "2px",
            }}
          >
            EDIT PAGES
          </h2>
          <Box
            sx={{
              py: 2,
              display: "grid",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
              mt: 0,
              mr: -37.5,
              width: 300,
            }}
          >
            <SelectGroupedOptions />

            <h2
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                color: "black",
                marginLeft: "2px",
              }}
            >
              Enter the grid structure you want on the page in row column format
            </h2>
          </Box>
          <GridGenerator onGridGenerated={handleGridGenerated} />{" "}
          {/* Pass the callback function as prop */}
        </Paper>
      </Grid>

      <Grid item xs={8}>
        <Paper sx={{ p: 2, border: 1 }}>
          {generatedGrid} {/* Render the generated grid here */}
        </Paper>
      </Grid>
    </Grid>
  );
}
