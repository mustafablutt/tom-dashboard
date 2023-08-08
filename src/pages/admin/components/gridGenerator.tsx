import React, { useEffect, useState } from "react";

import { RowInput } from "./rowInput";
import Input from "@mui/joy/Input/Input";
import DownloadIcon from "@mui/icons-material/Download";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import { useCallback } from "react";
import { Button } from "@material-ui/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";
import { Divider } from "@mui/material";
import {
  DroppedItem,
  GridGeneratorProps,
} from "../../../interfaces/Interfaces";
import GridComponent from "./GridComponent";

export const GridGenerator: React.FC<GridGeneratorProps> = ({
  onGridGenerated,
  selectedPage,
}) => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number[]>([]);
  const [gridCode, setGridCode] = useState<string>("");
  const [droppedItems, setDroppedItems] = useState<Array<DroppedItem>>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

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
    const value = event.target.value ? parseInt(event.target.value) : 0;

    if (value > 12) {
      setOpenSnackbar(true);
      return;
    }

    setRows(value);
    setCols(new Array(value).fill(0));
  };

  useEffect(() => {
    setRows(0);
    setCols([]);
  }, [selectedPage]);

  const handleItemAdded = (
    item: DroppedItem,
    rowIndex: number,
    colIndex: number
  ) => {
    const newItem = { ...item, rowIndex, colIndex };
    setDroppedItems((prev) => [...prev, newItem]);
  };
  const handleRowColumnsChange = (rowIndex: number, columnCount: number) => {
    if (columnCount > 12) {
      setOpenSnackbar(true);
      return;
    }

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
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([gridCode], { type: "text/plain" });

    const fileName = selectedPage
      ? `${selectedPage.replace(/\s+/g, "")}.tsx`
      : "generatedCode.tsx";
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  function generateGridString(rows: number, cols: number[]): string {
    let gridString = "<Grid container spacing={2} sx={{ flexGrow: 1 }}>\n";
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const xsValue = Math.floor(12 / cols[rowIndex]);
      for (let colIndex = 0; colIndex < cols[rowIndex]; colIndex++) {
        gridString += `  <Grid xs={${xsValue}} md={${xsValue}}>\n`;

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

  const bodyStartBase = `
  import Grid from "@mui/joy/Grid/Grid";
  
  const ${
    selectedPage ? selectedPage.replace(/\s+/g, "") : "Test"
  }: React.FunctionComponent = () => {
    return (
`;

  const bodyEnd = `
  );
};

export default ${selectedPage ? selectedPage.replace(/\s+/g, "") : "Test"};
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

  useEffect(() => {
    onGridGenerated(gridArray);
  }, [gridArray]);

  useEffect(() => {
    if (gridArray.length === rows) {
      const gridString = generateGridString(rows, cols);
      let finalBodyStart = bodyStartBase;

      if (gridString.includes("<Input")) {
        finalBodyStart =
          'import Input from "@mui/joy/Input/Input";\n' + finalBodyStart;
      }

      if (gridString.includes("Checkbox")) {
        finalBodyStart =
          'import Checkbox from "@mui/joy/Checkbox/Checkbox";\n ' +
          finalBodyStart;
      }

      if (gridString.includes("Select")) {
        finalBodyStart =
          'import Select from "@mui/joy/Select";\n import Option from "@mui/joy/Option";\n' +
          finalBodyStart;
      }

      if (gridString.includes("Radio")) {
        finalBodyStart =
          'import Radio from "@mui/joy/Radio/Radio";\n import RadioGroup from "@mui/joy/RadioGroup/RadioGroup";\n' +
          finalBodyStart;
      }

      const finalCode = finalBodyStart + gridString + bodyEnd;
      console.log(finalCode);
      setGridCode(finalCode);
    }
  }, [gridArray]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={1.5} sx={{ minWidth: 300 }}>
            {selectedPage && (
              <>
                <Divider> Grid Oluştur</Divider>
                <FormLabel
                  sx={(theme) => ({
                    "--FormLabel-color": "#7947ca",
                  })}
                >
                  Satır sayısı giriniz
                </FormLabel>
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
              </>
            )}

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
          {cols.length !== 0 && rows !== 0 ? (
            <FormControl>
              <FormLabel style={{ marginTop: "25px" }}>
                <Button
                  style={{ marginRight: "25px" }}
                  variant="contained"
                  color="primary"
                  onClick={copyCodeToClipboard}
                >
                  <ContentCopyIcon />
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                >
                  <DownloadIcon />
                </Button>
              </FormLabel>
            </FormControl>
          ) : null}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          12'den büyük değer girilemez!
        </Alert>
      </Snackbar>
    </div>
  );
};
