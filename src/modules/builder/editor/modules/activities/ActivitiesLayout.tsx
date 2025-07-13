import { Fragment, SyntheticEvent, useState } from 'react';

import Achievements from './components/Achievements';
import BasicHeader from './components/BasicHeader';
import BasicPanel from './components/BasicPanel';
import Involvements from './components/Involvements';
import { ReactNode } from 'react';

export interface IActivityTab {
  key: string;
  label: string;
  component: () => ReactNode;
}

export interface IAllActivityTabs {
  [key: string]: IActivityTab;
}

const allActivityTabs: IAllActivityTabs = {
  involvements: {
    key: 'involvements',
    label: 'Involvements',
    component: Involvements,
  },
  achievements: {
    key: 'achievements',
    label: 'Achievements',
    component: Achievements,
  },
};

const ActivitiesLayout = () => {
  const [activeTab, setActiveTab] = useState(allActivityTabs['involvements']);

  const changeActiveTab = (event: SyntheticEvent, key: string) => {
    const selectedTab = allActivityTabs[key];
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  return (
    <Fragment>
      <BasicHeader
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        tabs={allActivityTabs}
      ></BasicHeader>
      <BasicPanel activeTab={activeTab} />
    </Fragment>
  );
};

export default ActivitiesLayout;
