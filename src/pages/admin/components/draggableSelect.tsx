import { useDrag } from "react-dnd";
import Select from "@mui/joy/Select/Select";
import { variantType, colorType, sizeType } from "../../../types/Types";
import Option from "@mui/joy/Option/Option";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import FormControl from "@mui/joy/FormControl/FormControl";

interface DraggableSelectProps {
  id: number;
  option1?: string;
  option2?: string;
  showClearIcon?: boolean;
  placeholder?: string;
  variant?: variantType;
  color?: colorType;
  size?: sizeType;
}

export const DraggableSelect: React.FC<
  DraggableSelectProps & { onRemove: (id: number) => void }
> = ({
  id,
  option1,
  option2,
  onRemove,
  showClearIcon,
  placeholder,
  variant,
  color,
  size,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "select",
    item: {
      id,
      type: "select",
      option1,
      option2,
      placeholder,
      size,
      variant,
      color,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <FormControl>
        {showClearIcon && (
          <IconButton
            style={{ position: "absolute", right: -20, top: 5, zIndex: 2000 }}
            onClick={() => onRemove(id)}
          >
            <ClearIcon />
          </IconButton>
        )}
        <Select
          placeholder={placeholder}
          size={size}
          color={color}
          variant={variant}
        >
          <Option value="dog">DOG</Option>
          <Option value="cat">CAT</Option>
        </Select>
      </FormControl>
    </div>
  );
};
