import * as React from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import RadioGroup from "@mui/joy/RadioGroup";
import Textarea from "@mui/joy/Textarea";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Checkbox from "@mui/joy/Checkbox";
import Radio from "@mui/joy/Radio";

import Grid from "@mui/joy/Grid";

export default function InputColors() {
  const [selectedComponent, setSelectedComponent] =
    React.useState<string>("input");

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

  const [placeholder, setPlaceholder] =
    React.useState<string>("Type Something");

  type colorType =
    | "primary"
    | "neutral"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | undefined;

  const [color, setColor] = React.useState<colorType>("primary");

  type variantType = "outlined" | "soft" | "solid" | "plain" | undefined;
  const [variant, setVariant] = React.useState<variantType>("outlined");

  type sizeType = "sm" | "md" | "lg" | undefined;
  const [size, setSize] = React.useState<sizeType>("lg");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value as colorType);
  };

  const handleVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariant(event.target.value as variantType);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as sizeType);
  };

  const handlePlaceholderChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlaceholder(event.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ flexGrow: 1, ml: 30, mt: 15 }}
    >
      <Grid xs={8}>
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "20px",
            color: "black",
            marginLeft: "2px",
          }}
        >
          SELECT COMPONENTS
        </h2>
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
          <Select defaultValue="input" onChange={handleSelectChange}>
            <Option value="input">Input</Option>
            <Option value="checkbox">Checkbox</Option>
            <Option value="dropdown">Dropdown</Option>
          </Select>
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
            width: 300,
          }}
        >
          <FormControl>
            <FormLabel>Variants</FormLabel>
            <RadioGroup
              defaultValue="outlined"
              name="radio-buttons-group"
              orientation="horizontal"
              onChange={handleVariantChange}
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
            />
          </FormControl>
          <FormLabel>Select Page</FormLabel>
          <Select defaultValue="page1">
            <Option value="page1">Page1</Option>
          </Select>
        </Box>
      </Grid>

      <Box
        sx={{
          py: 2,
          display: "grid",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          mt: 0,
          ml: 10,
          width: 300,
        }}
      >
        {selectedComponent === "input" && (
          <Input
            color={color}
            disabled={false}
            placeholder={placeholder}
            size={size}
            variant={variant}
          />
        )}
        {selectedComponent === "checkbox" && (
          <Checkbox
            color={color}
            disabled={false}
            label={placeholder}
            size={size}
            variant={variant}
          />
        )}
        {selectedComponent === "dropdown" && (
          <Select
            color={color}
            placeholder={placeholder}
            size={size}
            variant={variant}
          ></Select>
        )}
      </Box>

      <Grid xs={8}></Grid>
    </Grid>
  );
}
