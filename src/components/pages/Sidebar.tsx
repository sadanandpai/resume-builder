import React, { useState } from "react";
import styled from "styled-components";

import { SideDrawer } from "../widgets/SideDrawer";
import { TemplateSettings } from "../core/settings-header/TemplatesSettings";
import { ThemeSettings } from "../core/settings-header/ThemeSettings";
import { SideMenu } from "../widgets/SideMenu";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const sideBarList = [
  {
    key: 0,
    title: "Theme",
    icon: "color",
    component: <ThemeSettings />,
  },
  {
    key: 1,
    title: "Template",
    icon: "template",
    component: <TemplateSettings />,
  },
  {
    key: 2,
    title: "Download",
    icon: "download",
    component: <TemplateSettings />,
  },
];

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(-1);

  function clickHandler(event: any) {
    if (activeTab === event.currentTarget.dataset.id) setActiveTab(-1);
    else setActiveTab(event.currentTarget.dataset.id);
  }

  return (
    <Wrapper>
      <SideDrawer isShown={activeTab !== -1}>{sideBarList[activeTab]?.component}</SideDrawer>
      <SideMenu menuList={sideBarList} onClick={clickHandler} />
    </Wrapper>
  );
};
