import React, { Fragment } from 'react';
import { useBasicDetails } from 'src/stores/basic';
import BasicHeader from './components/BasicHeader';
import BasicPanel from './components/BasicPanel';

const BasicLayout = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { set: onChangeText, values: basicTabs } = useBasicDetails();

  const changeActiveTab = (event: React.SyntheticEvent, activeTab: number) => {
    setActiveTab(activeTab);
  };

  return (
    <Fragment>
      <BasicHeader
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        basicTabs={basicTabs}
      ></BasicHeader>
      <BasicPanel
        activeTab={activeTab}
        basicTabs={basicTabs}
        onChangeText={onChangeText}
      ></BasicPanel>
    </Fragment>
  );
};

export default BasicLayout;
