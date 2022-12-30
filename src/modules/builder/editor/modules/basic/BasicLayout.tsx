import React, { Fragment } from 'react';
import { useBasicDetails } from 'src/stores/basic';
import BasicHeader from './components/BasicHeader';
import BasicPanel from './components/BasicPanel';

const tabTitles = ['Contacts', 'Links', 'About'];

const BasicLayout = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const basicTabs = useBasicDetails((state) => state.values);
  const onChangeText = useBasicDetails.getState().reset;

  const changeActiveTab = (event: React.SyntheticEvent, activeTab: number) => {
    setActiveTab(activeTab);
  };

  return (
    <Fragment>
      <BasicHeader
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        tabTitles={tabTitles}
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
