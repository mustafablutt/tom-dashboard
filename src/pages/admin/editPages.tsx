import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { GridGenerator } from "./components/gridGenerator";
import Option, { optionClasses } from "@mui/joy/Option";
import Input from "@mui/joy/Input/Input";
import Checkbox from "@mui/joy/Checkbox/Checkbox";
import Box from "@mui/joy/Box";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import { DraggableInput } from "./components/draggableInput";
import { DraggableCheckbox } from "./components/draggableCheckbox";
import { DraggableSelect } from "./components/draggableSelect";
import { DraggableRadioButton } from "./components/draggableRadioButton";
import { usePageComponent } from "../../context/PageComponentContext";
import Select, { selectClasses } from "@mui/joy/Select";
import { useSidebar } from "../../context/SidebarContext";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";

export default function SpacingGrid() {
  const [spacing, setSpacing] = useState(2);
  const [generatedGrid, setGeneratedGrid] = useState<JSX.Element[]>([]); // State to store generated grid
  const { componentsInCurrentPage, fetchComponentsOfCurrentPage } =
    usePageComponent();
  const [selectedPage, setSelectedPage] = useState<string | null>(null); // Initialize as null
  const { menuData } = useSidebar();

  const componentsMap: Record<string, React.ElementType> = {
    Input: Input,
    Checkbox: Checkbox,
    Dropdown: Select,
    Radiobutton: RadioGroup,
  };

  const createPropsFromData = (data: any) => {
    const { values } = data;
    const props: any = {};
    values.forEach((v: any) => {
      props[v.propertyName] = v.valueName;
    });
    return props;
  };
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
    value: string | null
  ) => {
    setSelectedPage(value);
  };

  useEffect(() => {
    if (selectedPage !== null) {
      fetchComponentsOfCurrentPage(selectedPage);
    }
  }, [selectedPage]);

  useEffect(() => {
    console.log("bunu seçtim editteyim", componentsInCurrentPage);
  }, [componentsInCurrentPage]);

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

            {componentsInCurrentPage?.map((data) => {
              const Component = componentsMap[data.componentName!];
              if (!Component) {
                console.warn(
                  `Component ${data.componentName} not found in componentsMap.`
                );
                return null;
              }
              const props = createPropsFromData(data);
              if (data.componentName === "Dropdown") {
                return (
                  <Component {...props}>
                    <Option value="dog">Dog</Option>
                    <Option value="cat">Cat</Option>
                  </Component>
                );
              }
              if (data.componentName === "Radiobutton") {
                return (
                  <Component {...props}>
                    <Radio
                      value="radio1"
                      label={props.placeholder}
                      size={props.size}
                      color={props.color}
                      variant={props.ariant}
                    />
                    <Radio
                      value="radio2"
                      label={props.placeholder}
                      size={props.size}
                      color={props.color}
                      variant={props.ariant}
                    />
                    <Radio
                      value="radio3"
                      label={props.placeholder}
                      size={props.size}
                      color={props.color}
                      variant={props.ariant}
                    />
                  </Component>
                );
              } else if (data.componentName === "Input") {
                return (
                  <DraggableInput
                    id={data.id}
                    type={props.type || "text"}
                    value={props.value || ""}
                    placeholder={props.placeholder}
                    variant={props.variant}
                    color={props.color}
                    size={props.size}
                    onRemove={handleRemove}
                    showClearIcon={true}
                  />
                );
              } else if (data.componentName === "Checkbox") {
                return (
                  <DraggableCheckbox
                    id={data.id}
                    checked={props.checked || true}
                    color={props.color}
                    variant={props.variant}
                    label={props.label}
                    size={props.size}
                    onRemove={handleRemove}
                    showClearIcon={true}
                  />
                );
              } else {
                return <Component {...props} />;
              }
            })}
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
