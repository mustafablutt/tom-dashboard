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
  onItemAdded: (item: DroppedItem, rowIndex: number, colIndex: number) => void;
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
  rowIndex?: number; // Add rowIndex property
  colIndex?: number; // Add colIndex property
}

const GridCell: React.FC<{
  gridSize: any;
  rowIndex: number;
  colIndex: number;
  onItemAdded: (item: DroppedItem, rowIndex: number, colIndex: number) => void;
}> = ({ gridSize, rowIndex, colIndex, onItemAdded }) => {
  const classes = useStyles();
  const [content, setContent] = useState<JSX.Element[]>([]);
  const handleItemAdded = (item: DroppedItem) => {
    onItemAdded(item, rowIndex, colIndex);
  };
  const removeItem = (id: number) => {
    setContent((prev) => prev.filter((item) => item.props.id !== id));
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["input", "checkbox", "select", "radio"],
    drop: (item: DroppedItem, monitor) => {
      console.log("Dropped item:", item);
      handleItemAdded(item);
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
  const [droppedItems, setDroppedItems] = useState<Array<DroppedItem>>([]); // Sürüklenen öğelerin listesini tutmak için state eklendi.

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

  const handleItemAdded = (
    item: DroppedItem,
    rowIndex: number,
    colIndex: number
  ) => {
    const newItem = { ...item, rowIndex, colIndex }; // Sürüklenen öğeye satır ve sütun bilgilerini ekleyerek yeni bir nesne oluşturuyoruz.
    setDroppedItems((prev) => [...prev, newItem]); // Yeni öğeyi listeye ekliyoruz.
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
      const xsValue = Math.floor(12 / cols[rowIndex]);
      for (let colIndex = 0; colIndex < cols[rowIndex]; colIndex++) {
        gridString += `  <Grid xs={${xsValue}} md={${xsValue}}>\n`;
        // Check if there are dropped items for this cell and add their code
        const itemsForCell = droppedItems.filter(
          (item) => item.rowIndex === rowIndex && item.colIndex === colIndex
        );
        itemsForCell.forEach((item) => {
          gridString += `    ${generateCodeForItem(item)}`;
        });
        gridString += "  </Grid>\n";
      }
    }
    gridString += "</Grid>";

    return gridString;
  }

  const bodyStart = `
  import Checkbox from "@mui/joy/Checkbox/Checkbox";
  import Radio from "@mui/joy/Radio/Radio";
  import RadioGroup from "@mui/joy/RadioGroup/RadioGroup";
  import Input from "@mui/joy/Input";
  import Select from "@mui/joy/Select";
  import Grid from "@mui/joy/Grid/Grid";
  import Option from "@mui/joy/Option/Option";

const Test: React.FunctionComponent = () => {
  return (
`;

  const bodyEnd = `
  );
};

export default Test;
`;
  const generateCodeForItem = (item: DroppedItem) => {
    switch (item.type) {
      case "input":
        return `<Input color="${item.color}" placeholder="${item.placeholder}" 
      variant="${item.variant}" size="${item.size}" />\n`;
      case "checkbox":
        return `<Checkbox checked={${item.checked}} color="${item.color}" label="${item.label}" 
      variant="${item.variant}" size="${item.size}" />\n`;
      case "select":
        return `<Select color="${item.color}" placeholder="${item.placeholder}" 
      variant="${item.variant}" size="${item.size}" > <Option value="dog">DOG</Option>
      <Option value="cat">CAT</Option> </Select>\n`;
      case "radio":
        return ` <RadioGroup
      defaultValue="radio1"
      name="radio-buttons-group"
    >
    <Radio
            value="radio1"
            label="${item.placeholder}"
            size="${item.size}"
            color="${item.color}"
            variant="${item.variant}"
          />
          <Radio
            value="radio2"
            label="${item.placeholder}"
            size="${item.size}"
            color="${item.color}"
            variant="${item.variant}"
          />
          <Radio
            value="radio3"
            label="${item.placeholder}"
            size="${item.size}"
            color="${item.color}"
            variant="${item.variant}"
          />
          </RadioGroup>\n`;
      default:
        return "";
    }
  };

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
          onItemAdded={handleItemAdded}
        />
      ))}
    </div>
  );
};
