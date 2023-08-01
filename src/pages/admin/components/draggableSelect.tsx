import { useDrag } from "react-dnd";
import Select from "@mui/joy/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import { variantType, colorType, sizeType } from "../../../types/Types";

interface DraggableSelectProps {
  id: string;
  options?: string[];
  showClearIcon?: boolean;
  placeholder?: string;
  variant?: variantType;
  color?: colorType;
  size?: sizeType;
}

export const DraggableSelect: React.FC<
  DraggableSelectProps & { onRemove: (id: string) => void }
> = ({
  id,
  options = [],
  onRemove,
  showClearIcon,
  placeholder,
  variant,
  color,
  size,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "select",
    item: { id, type: "select", options, placeholder, size, variant, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Select
        placeholder={placeholder}
        size={size}
        color={color}
        variant={variant}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
