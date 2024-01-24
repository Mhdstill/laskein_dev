import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Scrollbars from 'react-custom-scrollbars-2';
import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import Offer from './offer';
import Subscriber from './subscriber';

export default function SubscriptionComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="box" centered>
          <Tab label="Offre d'abonnement" {...a11yProps(0)} />
          <Tab label="Les abonnées" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <Offer />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Subscriber />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
