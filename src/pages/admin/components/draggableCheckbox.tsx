import { useDrag } from "react-dnd";
import Checkbox from "@mui/material/Checkbox";

interface DraggableCheckboxProps {
  id: string;
  checked?: boolean;
}

export const DraggableCheckbox: React.FC<DraggableCheckboxProps> = ({
  id,
  checked = false,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "checkbox",
    item: { id, type: "checkbox", checked },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Checkbox checked={checked} />
    </div>
  );
};
