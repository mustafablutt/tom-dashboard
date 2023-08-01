import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { GridGenerator } from "./components2/gridGenerator2";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Box from "@mui/joy/Box";
import SelectGroupedOptions from "./components2/pagesListDropdown2";
import Input from "@mui/joy/Input/Input";
import Checkbox from "@mui/joy/Checkbox/Checkbox";
import { pageData } from "./components2/pageData";  
import  { selectClasses } from "@mui/joy/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useSidebar } from "../../context/SidebarContext";
import { usePageComponent } from "../../context/PageComponentContext";

const componentsMap: Record<string, React.ElementType> = {
    Input: Input,
    Checkbox: Checkbox,
    Dropdown: Select,  // Note that in your code, the Select component is referred to as 'Dropdown'
  };
  

const createPropsFromData = (data: any) => {
  const { values } = data;
  const props: any = {};
  values.forEach((v: any) => {
    props[v.propertyName] = v.valueName;
  });
  return props;
};

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const [generatedGrid, setGeneratedGrid] = React.useState<JSX.Element[]>([]); // State to store generated grid
  const [selectedPage, setSelectedPage] = React.useState<string | null>(null); // Initialize as null
  const { menuData } = useSidebar();
  const { componentsInCurrentPage, fetchComponentsOfCurrentPage } = usePageComponent();

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
  React.useEffect(() => {
   
    if (selectedPage !== null) {
      fetchComponentsOfCurrentPage(selectedPage);
    }
  }, [selectedPage]);

  React.useEffect(() => {
    console.log("bunu seçtim editteyim", componentsInCurrentPage);
  }, [componentsInCurrentPage]);
  
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

  const handleGridGenerated = (grid: JSX.Element[]) => {
    setGeneratedGrid(grid);
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
          </Box>
          <GridGenerator onGridGenerated={handleGridGenerated} />

          {componentsInCurrentPage?.map((data) => {
            const Component = componentsMap[data.componentName!];
            if (!Component) {
              console.warn(`Component ${data.componentName} not found in componentsMap.`);
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
            } else {
              return <Component {...props} />;
            }
          })}
       
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
