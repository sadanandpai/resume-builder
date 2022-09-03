import React, { Fragment } from 'react';
import { useActivity } from 'src/stores/activity';
import BasicHeader from './components/BasicHeader';
import BasicPanel from './components/BasicPanel';

export interface IActivityTab {
  key: string;
  label: string;
}

const activityTabs: IActivityTab[] = [
  { key: 'involvements', label: 'Involvements' },
  { key: 'achievements', label: 'Achievements' },
];

const ActivitiesLayout = () => {
  const [activeTab, setActiveTab] = React.useState(activityTabs[0]);
  const activities = useActivity((state) => state.activities);

  const changeActiveTab = (event: React.SyntheticEvent, key: string) => {
    const selectedTab = activityTabs.find((tab) => tab.key === key);
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  return (
    <Fragment>
      <BasicHeader
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        tabs={activityTabs}
      ></BasicHeader>
      <BasicPanel activeTab={activeTab} activities={activities}></BasicPanel>
    </Fragment>
  );
};

export default ActivitiesLayout;
