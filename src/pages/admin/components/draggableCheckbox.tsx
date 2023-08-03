import { useDrag } from "react-dnd";
import Checkbox from "@mui/joy/Checkbox/Checkbox";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { colorType, sizeType, variantType } from "../../../types/Types";

interface DraggableCheckboxProps {
  id: number;
  checked?: boolean;
  showClearIcon?: boolean;
  color?: colorType;
  variant?: variantType;
  size?: sizeType;
  label?: string;
}

export const DraggableCheckbox: React.FC<
  DraggableCheckboxProps & { onRemove: (id: number) => void }
> = ({
  id,
  checked = false,
  onRemove,
  variant,
  label,
  color,
  size,
  showClearIcon,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "checkbox",
    item: { id, type: "checkbox", checked, color, size, label, variant },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
    ref={drag}
    style={{
      opacity: isDragging ? 0.5 : 1,
      position: "relative",
      width: "95%", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: "8px",
      marginLeft:"8px"
    }}
  >
    <Checkbox
      checked={checked}
      variant={variant}
      color={color}
      size={size}
      label={label}
      style={{ flexGrow: 1 }}
    />

    {showClearIcon && (
      <IconButton
        style={{
          marginLeft: "8px",
        }}
        onClick={() => onRemove(id)}
      >
        <CancelIcon />
      </IconButton>
    )}
  </div>
  );
};

