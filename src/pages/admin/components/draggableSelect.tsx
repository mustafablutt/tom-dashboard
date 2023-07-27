import { useDrag } from "react-dnd";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface DraggableSelectProps {
  id: string;
  options?: string[];
}

export const DraggableSelect: React.FC<DraggableSelectProps> = ({
  id,
  options = [],
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "select",
    item: { id, type: "select", options },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Select defaultValue={options[0]}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
