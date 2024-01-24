import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Scrollbars from 'react-custom-scrollbars-2';
import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import Rules from './_';
import Models from './model';
import Permissions from './permission';

export default function RulePemissionComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="article"
          centered
        >
          <Tab label="Rôle" {...a11yProps(0)} />
          <Tab label="Permission" {...a11yProps(1)} />
          <Tab label="Model" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <Rules />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Permissions />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Models />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
