import Input from "@mui/joy/Input/Input";
import React from "react";
interface RowInputProps {
  rowIndex: number;
  onRowColumnsChange: (rowIndex: number, columnCount: number) => void;
}

export const RowInput: React.FC<RowInputProps> = ({
  rowIndex,
  onRowColumnsChange,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <Input
        type="number"
        onChange={(e) => onRowColumnsChange(rowIndex, parseInt(e.target.value))}
        slotProps={{
          input: {
            ref: inputRef,
            min: 1,
            step: 1,
          },
        }}
      />
    </div>
  );
};
