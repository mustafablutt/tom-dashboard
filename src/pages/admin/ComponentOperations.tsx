import * as React from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { useSidebar } from "../../context/SidebarContext";

import RadioGroup from "@mui/joy/RadioGroup";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useRef, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option, { optionClasses } from "@mui/joy/Option";

import Checkbox from "@mui/joy/Checkbox";
import Radio from "@mui/joy/Radio";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";

import Grid from "@mui/joy/Grid";
import { usePageComponent } from "../../context/PageComponentContext";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ListDivider from "@mui/joy/ListDivider/ListDivider";
import ListItemDecorator, {
  listItemDecoratorClasses,
} from "@mui/joy/ListItemDecorator";

import Chip from "@mui/joy/Chip";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import {
  IAddComponentData,
  IComponentValue,
  IUpdateComponentData,
} from "../../interfaces/Interfaces";
import { colorType, variantType, sizeType } from "../../types/Types";
import DynamicComponent from "./components/DynamicComponent";
import { AnyARecord } from "dns";
import SelectGroupedOptions from "./components/SelectGroupedOptions";

export default function InputColors() {
  const [isEditing, setIsEditing] = React.useState<boolean>();
  const [selectedPageComponent, setSelectedPageComponent] =
    React.useState<IUpdateComponentData>();

  const colorValueRef = useRef<any>("");
  const placeholderValueRef = useRef<string>("Type Something");
  const sizeValueRef = useRef<sizeType>("lg");
  const variantValueRef = useRef<variantType>("outlined");
  const radioOrientationValueRef = useRef<"vertical" | "horizontal">(
    "vertical"
  );
  const selectedComponentRef = useRef<string>("Input");
  const selectedPageRef = useRef<string | null>("");
  const componentNameTextRef = useRef<string | null>(null);
  const selectedComponentIdRef = useRef<number>(-1);

  useEffect(() => {
    if (isEditing && selectedPageComponent) {
      colorValueRef.current = selectedPageComponent.values.find(
        (value) => value.propertyName === "color"
      )?.valueName;
      placeholderValueRef.current = selectedPageComponent.values.find(
        (value) => value.propertyName === "placeholder"
      )?.valueName;
      sizeValueRef.current = selectedPageComponent.values.find(
        (value) => value.propertyName === "size"
      )?.valueName;
      variantValueRef.current = selectedPageComponent.values.find(
        (value) => value.propertyName === "variant"
      )?.valueName;
      radioOrientationValueRef.current = selectedPageComponent.values.find(
        (value) => value.propertyName === "orientation"
      )?.valueName;
      selectedComponentRef.current = selectedPageComponent.componentName;
      selectedPageRef.current = selectedPageComponent.pageName || "";
      componentNameTextRef.current = selectedPageComponent.name || null;
      selectedComponentIdRef.current = selectedPageComponent._id;
    } else {
      selectedComponentRef.current = "Input";
      selectedPageRef.current = "";
      componentNameTextRef.current = null;
    }
    setSelectedComponentId(selectedComponentIdRef.current || -1);
    setColor(colorValueRef.current || "primary");
    setPlaceholder(placeholderValueRef.current || "Type Something");
    setSize(sizeValueRef.current || "lg");
    setVariant(variantValueRef.current || "outlined");
    setRadioOrientation(radioOrientationValueRef.current || "vertical");
    setSelectedComponent(selectedComponentRef.current);
    setSelectedPage(selectedPageRef.current);
    setComponentNameText(componentNameTextRef.current);
  }, [isEditing, selectedPageComponent]);

  const [color, setColor] = useState<colorType>(
    colorValueRef.current || "primary"
  );
  const [placeholder, setPlaceholder] = useState<string>(
    placeholderValueRef.current || "Type Something"
  );
  const [size, setSize] = useState<sizeType>(sizeValueRef.current || "lg");
  const [variant, setVariant] = useState<variantType>(
    variantValueRef.current || "outlined"
  );
  const [radioOrientation, setRadioOrientation] = useState<
    "vertical" | "horizontal"
  >(radioOrientationValueRef.current || "vertical");
  const [selectedComponent, setSelectedComponent] = useState<string>(
    selectedComponentRef.current
  );
  const [selectedPage, setSelectedPage] = useState<string | null>(
    selectedPageRef.current
  );
  const [componentNameText, setComponentNameText] = useState<string | null>(
    componentNameTextRef.current
  );

  const [isCreating, setIsCreating] = useState(true);
  const [selectedComponentId, setSelectedComponentId] = useState<number>(
    selectedComponentIdRef.current
  );
  const { menuData } = useSidebar();
  const {
    componentsInPage,
    addComponent,
    components,
    loading,
    addMessage,
    setShowAlert,
    showAlert,
    updatePageComponent,
  } = usePageComponent();

  const handleSelectChange = (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element>
      | null,
    value: string | null
  ) => {
    if (value) {
      setSelectedComponent(value);
    }
  };

  type MenuItem = {
    name: string;
    children?: MenuItem[];
  };

  const getMenuOptions: (items: MenuItem[]) => React.ReactNode[] = (items) => {
    let options: any = [];

    const addLeafNodes = (item: MenuItem) => {
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          addLeafNodes(child);
        });
      } else {
        options.push(
          <Option key={item.name} value={item.name}>
            {item.name}
          </Option>
        );
      }
    };

    items.forEach((item) => {
      addLeafNodes(item);
    });

    return options;
  };

  const handleOrientationChange = (orientation: any) => {
    setRadioOrientation(orientation);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComponentNameText(event.target.value);
  };

  const handleEditComponents = () => {
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSelect2Change = (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element>
      | null,
    value: string | null
  ) => {
    if (value) {
      const selectedComponent = componentsInPage?.find(
        (component) => component.name === value
      );
      setSelectedPageComponent(selectedComponent);
    }
  };

  const handleCreateComponents = () => {
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value as colorType);
  };

  const handleVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariant(event.target.value as variantType);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as sizeType);
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

  const handlePlaceholderChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlaceholder(event.target.value);
  };

  const handleAddComponent = async (event: any) => {
    // Gather values from the input fields
    event.preventDefault();
    console.log("bunu önemli:", selectedComponentId);

    const _id = selectedComponentId;
    const componentName = selectedComponent;
    const name = componentNameText;
    const pageName = selectedPage;
    const values: IComponentValue[] = [];
    
    values.push({ propertyName: "color", valueName: color });
    values.push({ propertyName: "size", valueName: size });
    values.push({ propertyName: "variant", valueName: variant });
  
    if (selectedComponent === "Radiobutton") {
      values.push({ propertyName: "orientation", valueName: radioOrientation });
    }
  
    if (selectedComponent === "Checkbox") {
      // Checkbox component doesn't have a placeholder, it has a label
      values.push({ propertyName: "label", valueName: placeholder });
    } else {
      // For other components, use the "placeholder" property
      values.push({ propertyName: "placeholder", valueName: placeholder });
    }

    const componentData: IAddComponentData = {
      componentName,
      name,
      pageName,
      values,
    };
    const componentDataUpdate: IUpdateComponentData = {
      _id,
      componentName,
      name,
      pageName,
      values,
    };

    if (isEditing) {
      await updatePageComponent(componentDataUpdate);
    } else {
      await addComponent(componentData);
      setSelectedComponent("Input");
      setSelectedPage(null);
      setComponentNameText(null);
      setPlaceholder("Type Something");
      setColor("primary");
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setColor("primary");
      setPlaceholder("Type Something");
      setSize("lg");
      setVariant("outlined");
      setRadioOrientation("vertical");
      setSelectedComponent("Input");
      setSelectedPage(null);
      setComponentNameText(null);
    }
  }, [isEditing]);

  useEffect(() => {
    console.log("ceyda", componentsInPage);
    console.log("compoentlerrr", components);
    console.log("compoentlerrr gfhh", selectedPageComponent);
    console.log("hey", selectedPage);
  }, [components, componentsInPage, selectedPage, selectedPageComponent]);

  return (
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ flexGrow: 1, ml: 15, mt: 15 }}
    >
      <Grid xs={8}>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            mt: -15,
            ml: 55,
            width: 300,
          }}
        >
          <FormControl>
            <ButtonGroup
              variant="soft"
              aria-label="outlined primary button group"
              buttonFlex="0 1 200px"
              sx={{ width: "120%" }}
            >
              <Button onClick={handleCreateComponents}>
                Create Components
              </Button>
              <Button onClick={handleEditComponents}>Edit Components</Button>
            </ButtonGroup>
          </FormControl>
        </Box>
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "20px",
            color: "black",
            marginLeft: "2px",
          }}
        >
          {isEditing ? "Edit" : "Create"} Components
        </h2>
        {isEditing ? (
          <Box
            sx={{
              py: 2,
              display: "grid",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
              mt: -2,
              mr: -37.5,
              width: 300,
            }}
          >
            <FormControl>
              <FormLabel>Editlemek İstediğin Component:</FormLabel>
              <SelectGroupedOptions handleSelectChange={handleSelect2Change} />
            </FormControl>
          </Box>
        ) : null}
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            mt: -2,
            mr: -37.5,
            width: 300,
          }}
        >
          <FormControl>
            <FormLabel>Sayfa</FormLabel>
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
          </FormControl>
          <FormControl>
            <FormLabel>Component</FormLabel>
            <Select
              placeholder="Component Seç…"
              defaultValue="input"
              onChange={handleSelectChange}
              indicator={<KeyboardArrowDown />}
              value={selectedComponent}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {components?.map((component) => (
                <Option key={component.name} value={component.name}>
                  {component.name}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            mt: -2,
            mr: -37.5,
            width: 200,
          }}
        >
          <FormControl>
            <FormLabel>Component İsmi</FormLabel>
            <Textarea
              name="Outlined"
              placeholder="name"
              variant="outlined"
              onChange={handleNameChange}
              value={componentNameText as string}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Variants</FormLabel>
            <RadioGroup
              defaultValue="outlined"
              name="radio-buttons-group"
              orientation="horizontal"
              onChange={handleVariantChange}
              value={variant}
            >
              <Radio value="outlined" label="Outlined" variant="outlined" />
              <Radio value="soft" label="Soft" variant="soft" />
              <Radio value="solid" label="Solid" variant="solid" />
              <Radio value="plain" label="Plain" variant="plain" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            mt: -3,
            mr: -37.5,
            width: 300,
          }}
        >
          <FormControl>
            <FormLabel>Colors</FormLabel>
            <RadioGroup
              defaultValue="primary"
              name="radio-buttons-group"
              orientation="horizontal"
              onChange={handleChange}
              value={color}
            >
              <Radio value="primary" label="Primary" color="primary" />
              <Radio value="neutral" label="Neutral" color="neutral" />
              <Radio value="danger" label="Danger" color="danger" />
              <Radio value="info" label="Info" color="info" />
              <Radio value="success" label="Success" color="success" />
              <Radio value="warning" label="Warning" color="warning" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            mt: -3,
            mr: -37.5,
            width: 300,
          }}
        >
          <FormControl>
            <FormLabel>Sizes</FormLabel>
            <RadioGroup
              defaultValue="large"
              name="radio-buttons-group"
              orientation="horizontal"
              onChange={handleSizeChange}
              value={size}
            >
              <Radio value="sm" label="Small" size="sm" />
              <Radio value="md" label="Medium" size="md" />
              <Radio value="lg" label="Large" size="lg" />
            </RadioGroup>
            <FormLabel>Place Holder</FormLabel>
            <Textarea
              name="Outlined"
              placeholder="Type in here…"
              variant="outlined"
              onChange={handlePlaceholderChange}
              value={placeholder}
            />
          </FormControl>

          {/* {selectedComponent === "Radiobutton" ||
            (selectedPageComponent?.componentName === "Radiobutton" && (
              <FormControl>
                <FormLabel>Orientation</FormLabel>
                <ButtonGroup
                  variant="soft"
                  aria-label="outlined primary button group"
                  buttonFlex="0 1 200px"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  <Button onClick={() => handleOrientationChange("vertical")}>
                    Vertical
                  </Button>
                  <Button onClick={() => handleOrientationChange("horizontal")}>
                    Horizontal
                  </Button>
                </ButtonGroup>
              </FormControl>
            ))} */}

          <Button onClick={handleAddComponent}>
            {loading ? (
              <CircularProgress sx={{ color: "#fff" }} />
            ) : isEditing ? (
              "Edit Component"
            ) : (
              "Add Component"
            )}
          </Button>
        </Box>
      </Grid>

      <Grid xs={8}>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            mt: 20,
            ml: 10,
            width: 300,
          }}
        >
          <DynamicComponent
            selectedComponent={selectedComponent}
            color={color}
            size={size}
            variant={variant}
            radioOrientation={radioOrientation}
            placeholder={placeholder}
          />
        </Box>
      </Grid>
      {showAlert && (
        <Alert
          severity="info"
          // severity={addMessage.includes("Error") ? "error" : "success"}
          onClose={() => setShowAlert(false)}
        >
          {addMessage}
        </Alert>
      )}
    </Grid>
  );
}
