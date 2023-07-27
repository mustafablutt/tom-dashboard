import React from "react";

interface RowInputProps {
  rowIndex: number;
  onRowColumnsChange: (rowIndex: number, columnCount: number) => void;
}

export const RowInput: React.FC<RowInputProps> = ({
  rowIndex,
  onRowColumnsChange,
}) => {
  return (
    <div>
      <label>{`Row ${rowIndex + 1}: `}</label>
      <input
        placeholder="Number of column"
        type="number"
        onChange={(e) => onRowColumnsChange(rowIndex, parseInt(e.target.value))}
      />
    </div>
  );
};
