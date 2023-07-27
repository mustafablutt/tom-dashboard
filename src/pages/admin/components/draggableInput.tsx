import React from "react";
import { useDrag } from "react-dnd";
import Input from "@mui/joy/Input/Input";

interface DraggableInputProps {
  id: string;
  type: string;
  value: string;
}

export const DraggableInput: React.FC<DraggableInputProps> = ({
  id,
  type,
  value,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id, type, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Input
        type={type}
        defaultValue={value}
        color="primary"
        placeholder="Type Something"
        size="md"
        variant="outlined"
      />
    </div>
  );
};
