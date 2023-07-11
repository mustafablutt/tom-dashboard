import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { TabContext as GlobalTabContext } from '../context/TabContext'; // Import global TabContext

export default function LabTabs() {
  const { tabs, currentTab, addTab, removeTab, changeTab } = useContext(GlobalTabContext)!; // Use global TabContext

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Button onClick={() => addTab('label', 'value')}>Add Tab</Button>

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={(event, newValue) => changeTab(newValue)} aria-label="lab API tabs example">
  {tabs.map((tab, index) => (
    <Tab 
      key={index} 
      label={
        <div>
          {tab.label}
          <IconButton onClick={() => removeTab(tab)} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      }
      value={tab.value} 
    />
  ))}
</TabList>

        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={tab.value}>{tab.label}</TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
