import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { GridGenerator } from "./components/gridGenerator";
import Option, { optionClasses } from "@mui/joy/Option";

import Box from "@mui/joy/Box";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useState,useEffect } from "react";
import { DraggableInput } from "./components/draggableInput";
import { DraggableCheckbox } from "./components/draggableCheckbox";
import { DraggableSelect } from "./components/draggableSelect";
import { DraggableRadioButton } from "./components/draggableRadioButton";
import { usePageComponent } from "../../context/PageComponentContext";
import Select, { selectClasses } from "@mui/joy/Select";
import { useSidebar } from "../../context/SidebarContext";

export default function SpacingGrid() {
  const [spacing, setSpacing] = useState(2);
  const [generatedGrid, setGeneratedGrid] = useState<JSX.Element[]>([]); // State to store generated grid
  const { componentsInCurrentPage, fetchComponentsOfCurrentPage } = usePageComponent();
  const [selectedPage, setSelectedPage] = useState<string | null>(null); // Initialize as null
  const { menuData } = useSidebar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };
  type MenuItem = {
    name: string;
    children?: MenuItem[];
  };


  const getMenuOptions: (items: MenuItem[]) => React.ReactNode[] = (items) => {
    let options: any = [];
    const addChildren = (children: MenuItem[]) => {
      children.forEach((child) => {
        options.push(
          <Option key={child.name} value={child.name}>
            {child.name}
          </Option>
        );
        if (child.children) {
          addChildren(child.children);
        }
      });
    };
    items.forEach((item) => {
      if (item.children) {
        addChildren(item.children);
      }
    });
    return options;
  };

  const handlePageChange = (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element>
      | null,
    value: string|null
  ) => {
    setSelectedPage(value);
  };
  
  useEffect(() => {
   
    if (selectedPage !== null) {
      fetchComponentsOfCurrentPage(selectedPage);
    }
    console.log("bunu seçtim editteyim", componentsInCurrentPage);
  }, [selectedPage]);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  const handleGridGenerated = (grid: JSX.Element[]) => {
    setGeneratedGrid(grid);
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

const handleRemove = (id: string) => {
  // kaldırılan öğenin id'si ile ilgili işlemleri burada yapabilirsiniz.
};

  return (
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ flexGrow: 1, ml: 10, mt: 5 }}
    >
      <Grid item xs={4}>
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
            <Select
              placeholder="Sayfa Seç"
              onChange={handlePageChange}
              indicator={<KeyboardArrowDown />}
              value={selectedPage}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {getMenuOptions(menuData)}
            </Select>
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
            <GridGenerator onGridGenerated={handleGridGenerated} />{" "}
          </Box>

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
            <h2
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                color: "black",
                marginLeft: "2px",
              }}
            >
              Sayfada Bulunan componentleri sürükle bırak yolu ile gridlerin
              üzerine yerleştirin.
            </h2>

             <DraggableInput id="1" type="text" value="Drag me" onRemove={handleRemove} showClearIcon={false} />
            <DraggableCheckbox id="2" checked={false} />
            <DraggableSelect
              id="3"
              options={["Option 1", "Option 2", "Option 3"]}
            />

            <DraggableRadioButton
              id="4"
              options={["Option 1", "Option 2", "Option 3"]}
            />
          </Box>
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
