import React, { useState, useCallback, ReactNode } from 'react';
import { TabContext, Tab } from '../../context/TabContext';
import { useNavigate } from 'react-router-dom';

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>('1');

  const addTab = useCallback((label: string, value: string) => {
    const newTab = { label, value };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setCurrentTab(newTab.value);
  }, []);

  const changeTab = useCallback((tab: string) => {
    setCurrentTab(tab);
  }, []);

  const removeTab = useCallback((tab: Tab) => {
    const newTabs = tabs.filter((t) => t.value !== tab.value);
    setTabs(newTabs);

    if (newTabs.length > 0) {
      const activeTabExists = newTabs.some((t) => t.value === currentTab);
      if (!activeTabExists) {
        const previousTab = newTabs[newTabs.length - 1];
        setCurrentTab(() => {
          navigate(previousTab.value);
          return previousTab.value;
        });
      } else {
        setCurrentTab((currentTab) => {
          navigate(currentTab);
          changeTab(currentTab);
          return currentTab;
        });
      }
    } else {
      navigate('/home');
    }
  }, [currentTab, navigate, tabs, changeTab]); // changeTab bağımlılık listesine eklendi.


  return (
    <TabContext.Provider value={{ tabs, currentTab, addTab, removeTab, changeTab }}>
      {children}
    </TabContext.Provider>
  );
};
