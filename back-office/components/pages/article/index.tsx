import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import Arcticles from './articles';
import Categories from './categories';
import Prices from './prices';
import Providers from './providers';

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
          aria-label="article"
          centered
        >
          <Tab label="Articles" {...a11yProps(0)} />
          <Tab label="Fournisseurs" {...a11yProps(1)} />
          <Tab label="Prix" {...a11yProps(2)} />
          <Tab label="Catégories" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <Arcticles />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Providers />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Prices />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Categories />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
