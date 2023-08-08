import React from "react";
import Option from "@mui/joy/Option";

type MenuItem = {
  name: string;
  children?: MenuItem[];
};

export const getMenuOptions: (items: MenuItem[]) => React.ReactNode[] = (
  items
) => {
  let options: any = [];

  const addLeafNodes = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        addLeafNodes(child);
      });
    } else {
      options.push(
        <Option key={item.name} value={item.name}>
          {item.name}
        </Option>
      );
    }
  };

  items.forEach((item) => {
    addLeafNodes(item);
  });

  return options;
};
