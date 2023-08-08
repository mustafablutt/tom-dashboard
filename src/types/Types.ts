export type colorType =
  | "primary"
  | "neutral"
  | "danger"
  | "info"
  | "success"
  | "warning"
  | undefined;

export type variantType = "outlined" | "soft" | "solid" | "plain" | undefined;

export type sizeType = "sm" | "md" | "lg" | undefined;

export type MenuItem = {
  _id: number;
  parentId: number;
  path: string;
  name: string;
  fullPath: string;
  children?: MenuItem[];
};
