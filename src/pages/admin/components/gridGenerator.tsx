import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { RowInput } from "./rowInput";
import { useDrop } from "react-dnd";
import { DraggableCheckbox } from "./draggableCheckbox";
import { DraggableSelect } from "./draggableSelect";
import { DraggableInput } from "./draggableInput";
import { DraggableRadioButton } from "./draggableRadioButton";
import Input from "@mui/joy/Input/Input";

import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import { useCallback } from "react";
import { Button } from "@material-ui/core";

import { colorType, sizeType, variantType } from "../../../types/Types";

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
  id: number;
  type: "input" | "checkbox" | "select" | "radio";
  placeholder?: string;
  label?: string;
  variant?: variantType;
  color?: colorType;
  size?: sizeType;
  value?: string;
  checked?: boolean;
  options?: string[];
  onRemove?: () => void;
}

const GridCell: React.FC<{
  gridSize: any;
  rowIndex: number;
  colIndex: number;
}> = ({ gridSize, rowIndex, colIndex }) => {
  const classes = useStyles();
  const [content, setContent] = useState<JSX.Element[]>([]);

  const removeItem = (id: number) => {
    setContent((prev) => prev.filter((item) => item.props.id !== id));
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["input", "checkbox", "select", "radio"],
    drop: (item: DroppedItem, monitor) => {
      console.log("Dropped item:", item);
      const uniqueId = Date.now() + Math.random();
      setContent((prev) => [
        ...prev,
        item.type === "checkbox" ? (
          <DraggableCheckbox
            key={uniqueId}
            id={uniqueId}
            checked={item.checked}
            label={item.label}
            color={item.color}
            variant={item.variant}
            size={item.size}
            onRemove={removeItem}
            showClearIcon={true}
          />
        ) : item.type === "select" ? (
          <DraggableSelect
            key={uniqueId}
            id={uniqueId}
            option1="DOG"
            option2="CAT"
            placeholder={item.placeholder}
            color={item.color}
            size={item.size}
            variant={item.variant}
            onRemove={removeItem}
            showClearIcon={true}
          />
        ) : item.type === "radio" ? (
          <DraggableRadioButton
            key={uniqueId}
            id={uniqueId}
            option1="Radio1"
            option2="Radio2"
            option3="Radio3"
            placeholder={item.placeholder}
            color={item.color}
            size={item.size}
            variant={item.variant}
            type={item.type}
            onRemove={removeItem}
            showClearIcon={true}
          />
        ) : (
          <DraggableInput
            key={uniqueId}
            id={uniqueId}
            type={item.type}
            value={item.value || ""}
            placeholder={item.placeholder}
            color={item.color}
            variant={item.variant}
            size={item.size}
            onRemove={removeItem}
            showClearIcon={true}
          />
        ),
      ]);
      console.log(`Dropped ${item} on cell ${rowIndex}-${colIndex}`);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? "#7947ca" : "white";

  return (
    <Grid
      item
      xs={gridSize}
      key={colIndex}
      ref={drop}
      style={{ background: backgroundColor }}
    >
      <Paper>
        <div className={classes.paper}>
          {`Grid ${rowIndex + 1}-${colIndex + 1}`}
        </div>
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
  const [gridCode, setGridCode] = useState<string>("");

  const copyCodeToClipboard = useCallback(() => {
    navigator.clipboard.writeText(gridCode).then(
      () => {
        alert("Kod panoya kopyalandı!");
      },
      (err) => {
        alert("Kopyalama işlemi başarısız oldu!");
      }
    );
  }, [gridCode]);

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
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function generateGridString(rows: number, cols: number[]): string {
    let gridString = "<Grid container spacing={2} sx={{ flexGrow: 1 }}>\n";
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const xsValue = Math.floor(12 / cols[rowIndex]); // Her bir sütunun xs değerini hesapla
      for (let colIndex = 0; colIndex < cols[rowIndex]; colIndex++) {
        gridString += `  <Grid xs={${xsValue}} md={${xsValue}}>\n`;
        gridString += `    <MenuItem>xs=${xsValue} md=${xsValue}</MenuItem>\n`;
        gridString += "  </Grid>\n";
      }
    }
    gridString += "</Grid>";

    return gridString;
  }

  const bodyStart = `
  import { MenuItem } from "@material-ui/core";
  import Grid from "@mui/joy/Grid/Grid";
  import React from "react";

const Test: React.FunctionComponent = () => {
  return (
`;

  const bodyEnd = `
  );
};

export default Test;
`;

  React.useEffect(() => {
    onGridGenerated(gridArray);
  }, [gridArray]);

  React.useEffect(() => {
    if (gridArray.length === rows) {
      const gridString = generateGridString(rows, cols);

      const finalCode = bodyStart + gridString + bodyEnd;
      console.log(finalCode);
      setGridCode(finalCode);
    }
  }, [gridArray]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel
            sx={(theme) => ({
              "--FormLabel-color": "#7947ca",
            })}
          >
            Satır sayısı giriniz
          </FormLabel>
          <Stack spacing={1.5} sx={{ minWidth: 300 }}>
            <Input
              type="number"
              value={rows}
              onChange={handleRowChange}
              placeholder="Number of rows"
              defaultValue={1}
              slotProps={{
                input: {
                  ref: inputRef,
                  min: 1,
                  step: 1,
                },
              }}
            />

            {Array.from({ length: rows }, (_, index) => (
              <FormControl>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "#7947ca",
                  })}
                >
                  Satır {index + 1}'deki sütun sayısını giriniz:
                </FormLabel>

                <RowInput
                  key={index}
                  rowIndex={index}
                  onRowColumnsChange={handleRowColumnsChange}
                />
              </FormControl>
            ))}
          </Stack>
          <FormControl>
            <FormLabel>
              <Button
                variant="contained"
                color="primary"
                onClick={copyCodeToClipboard}
              >
                Kodu Aktar
              </Button>
            </FormLabel>
          </FormControl>
        </FormControl>
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
