import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Scrollbars from 'react-custom-scrollbars-2';
import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import DailyReward from './daily';
import LevelReward from './level';
import SponsorshipReward from './sponsorship';

export default function RewardComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="box" centered>
          <Tab label="Récompense journalière" {...a11yProps(0)} />
          <Tab label="Pallier de récompense" {...a11yProps(1)} />
          <Tab label="Parrainage" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <DailyReward />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LevelReward />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SponsorshipReward />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
