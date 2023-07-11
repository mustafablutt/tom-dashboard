import React, { useState, ReactNode } from 'react';
import { TabContext, Tab } from '../../context/TabContext';


interface TabProviderProps {
    children: ReactNode;
  }
  
  export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
    const [tabs, setTabs] = useState<Tab[]>([
     
    ]);
  
    const [currentTab, setCurrentTab] = useState<string>('1');
  
    const addTab = (label: string, value: string) => {
      const newTab = { label, value };
      setTabs([...tabs, newTab]);
      setCurrentTab(newTab.value);
    };
  
    const removeTab = (tab: Tab) => {
      const newTabs = tabs.filter(t => t.value !== tab.value);
      setTabs(newTabs);
      if (newTabs.length > 0) {
        setCurrentTab(newTabs[0].value);
      }
    };
  
    const changeTab = (tab: string) => {
      setCurrentTab(tab);
    };
  
    return (
      <TabContext.Provider value={{ tabs, currentTab, addTab, removeTab, changeTab }}>
        {children}
      </TabContext.Provider>
    );
  };