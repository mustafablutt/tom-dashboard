import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { GridCell } from "./GridCell";
import { GridComponentProps } from "../../../interfaces/Interfaces";

const GridComponent: React.FC<GridComponentProps> = ({
    row,
    cols,
    onGridGenerated,
    onItemAdded,
  }) => {
    const calculateGridSize = () => {
      return Math.floor(12 / cols);
    };
  
    const gridSize = calculateGridSize();
  
    const grid = (
      <Grid container spacing={3} key={row}>
        {Array.from({ length: cols }, (_, colIndex) => (
          <GridCell
            gridSize={gridSize}
            rowIndex={row}
            colIndex={colIndex}
            onItemAdded={onItemAdded}
          />
        ))}
      </Grid>
    );
  
    useEffect(() => {
      onGridGenerated(grid);
    }, [grid]);
  
    return null;
  };
  
export default GridComponent;