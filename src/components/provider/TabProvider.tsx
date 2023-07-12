import React, { useState, ReactNode } from 'react';
import { TabContext, Tab } from '../../context/TabContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface TabProviderProps {
    children: ReactNode;
  }
  
  export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
    const [tabs, setTabs] = useState<Tab[]>([
     
    ]);
    const navigate = useNavigate();
    const location = useLocation();
  
    const [currentTab, setCurrentTab] = useState<string>('1');
  
    const addTab = (label: string, value: string) => {
      const newTab = { label, value };
      setTabs([...tabs, newTab]);
      setCurrentTab(newTab.value);
    };
  
    const removeTab = (tab: Tab) => {
      console.log('Removing tab:', tab);
    
      const newTabs = tabs.filter(t => t.value !== tab.value);
      console.log('New tabs:', newTabs);
    
      setTabs(newTabs);
      
      if (newTabs.length > 0) {
        // There are still tabs remaining, so navigate to the previous one
        const previousTab = newTabs[newTabs.length - 1];
        console.log('Navigating to previous tab:', previousTab);
    
       setCurrentTab(()=>{
        navigate(previousTab.value); 
        return previousTab.value}
       );
       
        
      } else {
        // There are no tabs remaining, so navigate to a default page
        console.log('No tabs remaining. Navigating to default page.');
    
        navigate('/home'); // Or wherever you want to redirect when no tabs are open
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
