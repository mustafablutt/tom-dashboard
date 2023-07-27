import { useDrag } from "react-dnd";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";

interface DraggableRadioButtonProps {
  id: string;
  options?: string[];
}

export const DraggableRadioButton: React.FC<DraggableRadioButtonProps> = ({
  id,
  options = [],
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "radio",
    item: { id, type: "radio", options },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <FormControl component="fieldset">
        <RadioGroup defaultValue={options[0]}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
