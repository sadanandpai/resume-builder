import React, { useState } from "react";
import styled from "styled-components";

import { SideDrawer } from "./SideDrawer";
import { SideMenu } from "./SideMenu";

import { EditSettings } from "../core/settings-header/EditSettings";

const sideBarList = [
  {
    key: 0,
    title: "Edit",
    icon: "edit",
  },
  {
    key: 1,
    title: "Theme",
    icon: "color",
  },
  {
    key: 2,
    title: "Template",
    icon: "template",
  },
  {
    key: 3,
    title: "Download",
    icon: "download",
  },
];

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

export const LeftMenu = () => {
  return (
    <Wrapper>
      <SideMenu menuList={sideBarList} />
      <SideDrawer>
        <EditSettings />
      </SideDrawer>
    </Wrapper>
  );
};
