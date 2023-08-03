import React from "react";
import { useDrag } from "react-dnd";
import Input from "@mui/joy/Input/Input";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { variantType, colorType, sizeType } from "../../../types/Types";

interface DraggableInputProps {
  id: number;
  type: string;
  value: string;
  showClearIcon?: boolean;
  placeholder?: string;
  variant?: variantType;
  color?: colorType;
  size?: sizeType;
}

export const DraggableInput: React.FC<
  DraggableInputProps & { onRemove: (id: number) => void }
> = ({
  id,
  type,
  value,
  onRemove,
  placeholder,
  variant,
  color,
  size,
  showClearIcon,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id, type, value, placeholder, color, size, variant },
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
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: "8px",
      marginLeft:"8px",
    }}
    >
       <Input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        variant={variant}
        color={color}
        size={size}
      />
      {showClearIcon && (
        <IconButton
          style={{ position: "absolute", right: 0, top: 0, zIndex: 1000 }}
          onClick={() => onRemove(id)}
        >
          <CancelIcon />
        </IconButton>
      )}
     
    </div>
  );
};
