import { useDrag } from "react-dnd";
import Radio from "@mui/joy/Radio/Radio";
import RadioGroup from "@mui/joy/RadioGroup/RadioGroup";
import FormControl from "@mui/joy/FormControl/FormControl";
import { variantType, colorType, sizeType } from "../../../types/Types";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

interface DraggableRadioButtonProps {
  id: number;
  type: string;
  option1?: string;
  option2?: string;
  option3?: string;
  showClearIcon?: boolean;
  placeholder?: string;
  variant?: variantType;
  color?: colorType;
  size?: sizeType;
}

export const DraggableRadioButton: React.FC<
  DraggableRadioButtonProps & { onRemove: (id: number) => void }
> = ({
  id,
  type,
  onRemove,
  showClearIcon,
  option1,
  option2,
  option3,

  placeholder,
  variant,
  size,
  color,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "radio",
    item: {
      id,
      type: "radio",
      placeholder,
      color,
      size,
      variant,
      option1,
      option2,
      option3,
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
            style={{ position: "absolute", right: 0, top: 0, zIndex: 2000 }}
            onClick={() => onRemove(id)}
          >
            <ClearIcon />
          </IconButton>
        )}

        <RadioGroup defaultValue="medium" name="radio-buttons-group">
          <Radio
            value="small"
            label="Mustafa"
            size={size}
            variant={variant}
            color={color}
          />
          <Radio
            value="medium"
            label="Ahmet"
            size={size}
            variant={variant}
            color={color}
          />
          <Radio
            value="large"
            label="Ceyda"
            size={size}
            variant={variant}
            color={color}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
