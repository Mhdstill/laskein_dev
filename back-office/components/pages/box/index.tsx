import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Scrollbars from 'react-custom-scrollbars-2';
import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import _Box from './_';
import Type from './type';

export default function BoxComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="box" centered>
          <Tab label="Box" {...a11yProps(0)} />
          <Tab label="Type de box" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <_Box />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Type />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
