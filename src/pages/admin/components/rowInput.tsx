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
      <label>{`Number of columns in Row ${rowIndex + 1}: `}</label>
      <input
        type="number"
        onChange={(e) => onRowColumnsChange(rowIndex, parseInt(e.target.value))}
      />
    </div>
  );
};
