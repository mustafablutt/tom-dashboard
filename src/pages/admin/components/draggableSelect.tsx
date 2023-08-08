import { useDrag } from "react-dnd";
import Select from "@mui/joy/Select/Select";
import { variantType, colorType, sizeType } from "../../../types/Types";
import Option from "@mui/joy/Option/Option";
import { IconButton } from "@mui/material";
import FormControl from "@mui/joy/FormControl/FormControl";
import CancelIcon from "@mui/icons-material/Cancel";

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
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: "95%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
        marginLeft: "8px",
      }}
    >
      <FormControl>
        {showClearIcon && (
          <IconButton
            style={{
              position: "absolute",
              right: -5,
              top: -5,
              zIndex: 2000,
              color: "white",
            }}
            onClick={() => onRemove(id)}
          >
            <CancelIcon style={{ fontSize: "large" }} />
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
