import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


//...

export default function LabTabs({ menuItems }: { menuItems: MenuItem[] }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {menuItems.map((item, index) => (
              <Tab key={index} label={item.name} value={index.toString()} />
            ))}
          </TabList>
        </Box>
        {menuItems.map((item, index) => (
          <TabPanel key={index} value={index.toString()}>
            {item.name}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

//...
