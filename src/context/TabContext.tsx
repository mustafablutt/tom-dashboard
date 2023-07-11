import React from 'react';

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
}

export const TabContext = React.createContext<TabContextProps | undefined>(undefined);
