import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import InternalTransactionComponent from './intern';
import OuterTransactionComponent from './outer';

export default function ArticleComponent() {
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
          aria-label="transaction"
          centered
        >
          <Tab label="Transaction interne" {...a11yProps(0)} />
          <Tab label="Dépôt - retrait" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <InternalTransactionComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OuterTransactionComponent />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
