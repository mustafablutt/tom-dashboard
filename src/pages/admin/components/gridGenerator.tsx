import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { RowInput } from "./rowInput";
import { useDrop } from "react-dnd";
import Input from "@mui/joy/Input/Input";
interface GridComponentProps {
  row: number;
  cols: number;
  onGridGenerated: (grid: JSX.Element) => void;
}

interface GridGeneratorProps {
  onGridGenerated: (grid: JSX.Element[]) => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const inputStyle = {
  width: "300px",
};

interface DroppedItem {
  id: string;
  type: string;
  value: string;
}

const GridCell: React.FC<{
  gridSize: any;
  rowIndex: number;
  colIndex: number;
}> = ({ gridSize, rowIndex, colIndex }) => {
  const classes = useStyles();
  const [content, setContent] = useState<JSX.Element[]>([]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "input",
    drop: (item: DroppedItem, monitor) => {
      setContent((prev) => [
        ...prev,
        <Input
          type={item.type}
          defaultValue={item.value}
          readOnly
          color="primary"
          placeholder="Type Something"
          size="lg"
          variant="outlined"
        />,
      ]);
      console.log(`Dropped ${item} on cell ${rowIndex}-${colIndex}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? "lightgreen" : "white";

  return (
    <Grid
      item
      xs={gridSize}
      key={colIndex}
      ref={drop}
      style={{ background: backgroundColor }}
    >
      <Paper className={classes.paper}>
        {`Grid ${rowIndex + 1}-${colIndex + 1}`}
        {content.map((item, index) => (
          <div key={index}>{item}</div>
        ))}{" "}
        {/* Rendering all inputs */}
      </Paper>
    </Grid>
  );
};

const GridComponent: React.FC<GridComponentProps> = ({
  row,
  cols,
  onGridGenerated,
}) => {
  const calculateGridSize = () => {
    return Math.floor(12 / cols);
  };

  const gridSize = calculateGridSize();

  const grid = (
    <Grid container spacing={3} key={row}>
      {Array.from({ length: cols }, (_, colIndex) => (
        <GridCell gridSize={gridSize} rowIndex={row} colIndex={colIndex} />
      ))}
    </Grid>
  );

  React.useEffect(() => {
    onGridGenerated(grid);
  }, [grid]);

  return null;
};

export const GridGenerator: React.FC<GridGeneratorProps> = ({
  onGridGenerated,
}) => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number[]>([]);

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value));
    setCols(new Array(parseInt(event.target.value)).fill(0));
  };

  const handleRowColumnsChange = (rowIndex: number, columnCount: number) => {
    const newCols = [...cols];
    newCols[rowIndex] = columnCount;
    setCols(newCols);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const gridArray: JSX.Element[] = [];
  const handleGridGenerated = (grid: JSX.Element) => {
    gridArray.push(grid);
  };

  React.useEffect(() => {
    onGridGenerated(gridArray);
  }, [gridArray]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={rows}
          onChange={handleRowChange}
          placeholder="Number of rows"
        />
        {Array.from({ length: rows }, (_, index) => (
          <RowInput
            key={index}
            rowIndex={index}
            onRowColumnsChange={handleRowColumnsChange}
          />
        ))}
        <button type="submit">Generate Grid</button>
      </form>
      {cols.map((col, index) => (
        <GridComponent
          key={index}
          row={index}
          cols={col}
          onGridGenerated={handleGridGenerated}
        />
      ))}
    </div>
  );
};
