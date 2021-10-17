import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { SideDrawer } from 'src/core/widgets/SideDrawer';
import {
  SocialEditor,
  EduEditor,
  ExerienceEditor,
  SkillsEditor,
  IntroEditor,
  AwardsEditor,
  LabelsEditor,
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
    title: 'Intro',
    icon: 'identity',
    component: <IntroEditor />,
  },
  {
    key: 1,
    title: 'Social',
    icon: 'social',
    component: <SocialEditor />,
  },
  {
    key: 2,
    title: 'Skills',
    icon: 'tool',
    component: <SkillsEditor />,
  },
  {
    key: 3,
    title: 'Experience',
    icon: 'work',
    component: <ExerienceEditor />,
  },
  {
    key: 4,
    title: 'Experience',
    icon: 'education',
    component: <EduEditor />,
  },
  {
    key: 5,
    title: 'Projects & Awards',
    icon: 'certificate',
    component: <AwardsEditor />,
  },
  {
    key: 6,
    title: 'Label',
    icon: 'label',
    component: <LabelsEditor />,
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
