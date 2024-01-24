import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Scrollbars from 'react-custom-scrollbars-2';
import PageTitle from '../../shared/PageTitle';
import { a11yProps } from '../../shared/tabs';
import TabPanel from '../../shared/tabs/TabPanel';
import Banner from './banner';
import BestSellingBox from './box/BestSellingBox';
import BiggestPrizeBox from './box/BiggestPrizeBox';
import NoveltyBox from './box/NoveltyBox';
import RecommendedBox from './box/RecommendedBox';
import HomeProviderList from './provider/HomeProviderList';

export default function AdvertissementComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // formik
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <div className="flex items-center justify-between border-b border-b-gray-100 pr-2.5">
        <PageTitle title1="Gestion des publicités" hideBorder />
      </div>

      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="box"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            className="normal-case"
            label="Box les plus vendus"
            {...a11yProps(0)}
          />
          <Tab
            className="normal-case"
            label="Box récommandés"
            {...a11yProps(1)}
          />
          <Tab
            className="normal-case"
            label="Box nouveautés"
            {...a11yProps(2)}
          />
          <Tab className="normal-case" label="Box gros lot" {...a11yProps(3)} />
          <Tab className="normal-case" label="Fournisseur" {...a11yProps(4)} />
          <Tab className="normal-case" label="Bannière" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TabPanel value={value} index={0}>
            <BestSellingBox />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RecommendedBox />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NoveltyBox />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <BiggestPrizeBox />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <HomeProviderList />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Banner />
          </TabPanel>
        </Scrollbars>
      </div>
    </div>
  );
}
