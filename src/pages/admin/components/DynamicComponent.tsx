import React from "react";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Checkbox from "@mui/joy/Checkbox";
import Select from "@mui/joy/Select";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import { colorType, variantType, sizeType } from "../../../types/Types";

interface ComponentMapping {
  [key: string]: React.ElementType;
}

const componentMapping: ComponentMapping = {
  Input: Input,
  Checkbox: Checkbox,
  Dropdown: Select,
  Radiobutton: RadioGroup,
};

interface DynamicComponentProps {
  selectedComponent: string | undefined;
  color: colorType;
  size: sizeType;
  variant: variantType;
  radioOrientation: "vertical" | "horizontal";
  placeholder: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  selectedComponent,
  color,
  size,
  variant,
  radioOrientation,
  placeholder,
}) => {
  const SelectedComponent = componentMapping[selectedComponent!];

  if (!SelectedComponent) {
    return null;
  }

  return (
    <FormControl>
      <FormLabel>{selectedComponent}</FormLabel>
      {selectedComponent === "Radiobutton" && (
        <SelectedComponent
          defaultValue="radio2"
          name="radio-buttons-group"
          orientation={radioOrientation}
        >
          <Radio
            value="radio1"
            label={placeholder}
            size={size}
            color={color}
            variant={variant}
          />
          <Radio
            value="radio2"
            label={placeholder}
            size={size}
            color={color}
            variant={variant}
          />
          <Radio
            value="radio3"
            label={placeholder}
            size={size}
            color={color}
            variant={variant}
          />
        </SelectedComponent>
      )}
      {selectedComponent === "Checkbox" && (
        <SelectedComponent
          color={color}
          size={size}
          variant={variant}
          label={placeholder}
        />
      )}
      {selectedComponent !== "Radiobutton" &&
        selectedComponent !== "Checkbox" && (
          <SelectedComponent
            name="random"
            color={color}
            disabled={false}
            placeholder={placeholder}
            size={size}
            variant={variant}
          />
        )}
    </FormControl>
  );
};

export default DynamicComponent;
