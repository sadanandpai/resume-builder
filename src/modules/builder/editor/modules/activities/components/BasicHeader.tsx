import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IActivityTab } from '../ActivitiesLayout';

const BasicHeader = ({
  activeTab,
  changeActiveTab,
  tabs,
}: {
  activeTab: IActivityTab;
  changeActiveTab: (event: React.SyntheticEvent, key: string) => void;
  tabs: IActivityTab[];
}) => {
  return (
    <Tabs value={activeTab.key} onChange={changeActiveTab} variant="fullWidth">
      {tabs.map((tab: IActivityTab) => (
        <Tab
          key={tab.key}
          label={tab.label}
          value={tab.key}
          sx={{ color: 'rgb(46 64 82)', textTransform: 'none', fontSize: '1rem' }}
        />
      ))}
    </Tabs>
  );
};

export default BasicHeader;
