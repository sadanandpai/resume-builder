import React, { useState } from "react";
import styled from "styled-components";

import { SideDrawer } from "../widgets/SideDrawer";
import { EditSettings } from "../core/settings-header/EditSettings";
import { SideMenu } from "../widgets/SideMenu";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const sideBarList = [
  {
    key: 0,
    title: "Edit",
    icon: "edit",
    component: <EditSettings />,
  },
];

export const LeftNav = () => {
  const [activeTab, setActiveTab] = useState(-1);

  function clickHandler(event: any) {
    if (activeTab === event.currentTarget.dataset.id) setActiveTab(-1);
    else setActiveTab(event.currentTarget.dataset.id);
  }

  return (
    <Wrapper>
      <SideMenu menuList={sideBarList} onClick={clickHandler} />
      <SideDrawer isShown={activeTab !== -1}>{sideBarList[activeTab]?.component}</SideDrawer>
    </Wrapper>
  );
};
