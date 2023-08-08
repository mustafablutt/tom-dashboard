import React from "react";
import { useContext } from "react";

export interface Tab {
  label: string;
  value: string;
}

interface TabContextProps {
  tabs: Tab[];
  currentTab: string;
  addTab: (label: string, value: string) => void;
  removeTab: (tab: Tab) => void;
  changeTab: (tab: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
}

export const useTab = () => {
  return useContext(TabContext);
};

export const TabContext = React.createContext<TabContextProps | undefined>(
  undefined
);
