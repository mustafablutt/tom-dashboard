import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

interface GridProps {
  rows: number;
  cols: number;
}

const MyCheckboxComponent: React.FC = () => <input type="checkbox" />;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const GridComponent: React.FC<GridProps> = ({ rows, cols }) => {
  const classes = useStyles();

  const calculateGridSize = () => {
    return Math.floor(12 / cols);
  };

  const gridSize = calculateGridSize();

  const grid = Array.from({ length: rows }, (_, rowIndex) => (
    <Grid container spacing={3} key={rowIndex}>
      {Array.from({ length: cols }, (_, colIndex) => (
        <Grid item xs={gridSize as any} key={colIndex}>
          <Paper className={classes.paper}>
            {`Grid ${rowIndex + 1}-${colIndex + 1}`}
          </Paper>
        </Grid>
      ))}
    </Grid>
  ));

  return <div>{grid}</div>;
};

const GridGenerator: React.FC = () => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [generated, setGenerated] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGenerated(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          placeholder="Number of rows"
        />
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
          placeholder="Number of columns"
        />
        <button type="submit">Generate Grid</button>
      </form>

      {generated && <GridComponent rows={rows} cols={cols} />}
    </div>
  );
};

export default GridGenerator;
