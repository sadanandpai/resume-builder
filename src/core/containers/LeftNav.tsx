import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { SideDrawer } from 'src/core/widgets/SideDrawer';
import {
  InfoEditor,
  SocialEditor,
  ExerienceEditor,
  SkillsEditor,
  IntroEditor,
} from 'src/core/components/editor/Editor';
import { SideMenu } from 'src/core/widgets/SideMenu';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;

  @media print {
    display: none;
  }
`;

const sideBarList = [
  {
    key: 0,
    title: 'Edit',
    icon: 'edit',
    component: <IntroEditor />,
  },
  {
    key: 1,
    title: 'Info',
    icon: 'about me',
    component: <InfoEditor />,
  },
  {
    key: 2,
    title: 'Social',
    icon: 'social',
    component: <SocialEditor />,
  },
  {
    key: 3,
    title: 'Skills',
    icon: 'tools',
    component: <SkillsEditor />,
  },
  {
    key: 4,
    title: 'Experience',
    icon: 'experience',
    component: <ExerienceEditor />,
  },
];

export const LeftNav = () => {
  const [activeTab, setActiveTab] = useState(-1);

  const clickHandler = useCallback(
    (event: any) => {
      if (activeTab === event.currentTarget.dataset.id) setActiveTab(-1);
      else setActiveTab(event.currentTarget.dataset.id);
    },
    [activeTab, setActiveTab]
  );

  return (
    <Wrapper>
      <SideMenu menuList={sideBarList} onClick={clickHandler} />
      <SideDrawer isShown={activeTab !== -1}>{sideBarList[activeTab]?.component}</SideDrawer>
    </Wrapper>
  );
};
