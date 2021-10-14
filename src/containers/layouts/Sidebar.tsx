import React, { useState } from "react";
import styled from "styled-components";

import { SideDrawer } from "src/core/widgets/SideDrawer";
import { TemplateSettings } from "src/core/settings-header/TemplatesSettings";
import { ThemeSettings } from "src/core/settings-header/ThemeSettings";
import { SideMenu } from "src/core/widgets/SideMenu";
import { PrintSettings } from "src/core/settings-header/PrintSettings";

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
    title: "Theme",
    icon: "color",
    component: <ThemeSettings />,
  },
  {
    key: 1,
    title: "Template",
    icon: "template",
    component: <TemplateSettings />,
  }
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
      <SideMenu menuList={sideBarList} onClick={clickHandler}><PrintSettings/></SideMenu>
    </Wrapper>
  );
};
