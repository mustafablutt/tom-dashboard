import { useDrag } from "react-dnd";
import Select from "@mui/joy/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import { variantType, colorType, sizeType } from "../../../types/Types";
import Option from "@mui/joy/Option/Option";

interface DraggableSelectProps {
  id: string;
  option1?: string;
  option2?: string;
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
      <Select
        placeholder={placeholder}
        size={size}
        color={color}
        variant={variant}
      >
        <Option value="dog">DOG</Option>
        <Option value="cat">CAT</Option>
      </Select>
    </div>
  );
};
