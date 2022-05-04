import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const BasicHeader = ({
  activeTab,
  changeActiveTab,
  basicTabs,
}: {
  activeTab: number;
  changeActiveTab: (event: React.SyntheticEvent, activeTab: number) => void;
  basicTabs: any;
}) => {
  return (
    <Tabs value={activeTab} onChange={changeActiveTab} variant="fullWidth">
      {basicTabs.map((tab: any, index: number) => (
        <Tab
          key={index}
          label={tab.name}
          sx={{ color: 'rgb(46 64 82)', textTransform: 'none', fontSize: '1rem' }}
        />
      ))}
    </Tabs>
  );
};

export default BasicHeader;
