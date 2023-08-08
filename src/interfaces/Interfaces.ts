import { colorType, sizeType, variantType } from "../types/Types";

export interface IComponentValue {
  propertyName: string;
  valueName: string | any;
}

export interface IAddComponentData {
  componentName: string;
  name: string | null;
  pageName: string | null;
  values: IComponentValue[];
}
export interface IUpdateComponentData {
  _id: number;
  componentName: string;
  name: string | null;
  pageName: string | null;
  values: IComponentValue[];
}
export interface IFetchComponentData {
  _id: number;
  componentName: string | undefined;
  name: string | null;
  values: IComponentValue[];
  id: string;
  type: string;
  value: string;
}

export interface GridComponentProps {
  row: number;
  cols: number;
  onGridGenerated: (grid: JSX.Element) => void;
  onItemAdded: (item: DroppedItem, rowIndex: number, colIndex: number) => void;
}

export interface GridGeneratorProps {
  onGridGenerated: (grid: JSX.Element[]) => void;
  selectedPage?: string | null;
}
export interface DroppedItem {
  id: number;
  type: "input" | "checkbox" | "select" | "radio";
  placeholder?: string;
  label?: string;
  variant?: variantType;
  color?: colorType;
  size?: sizeType;
  value?: string;
  checked?: boolean;
  options?: string[];
  onRemove?: () => void;
  rowIndex?: number;
  colIndex?: number;
}

interface IComponentProperties {
  name: string;
}

export interface IComponent {
  _id: number;
  name: string;
  properties: IComponentProperties[];
}
