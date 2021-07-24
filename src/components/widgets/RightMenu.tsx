import React, { useState } from "react";
import styled from "styled-components";

import { SideDrawer } from "./SideDrawer";
import { SideMenu } from "./SideMenu";

import { TemplateSettings } from "../core/settings-header/TemplatesSettings";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const sideBarList = [
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

export const RightMenu = () => {
  return (
    <Wrapper>
      <SideDrawer>
        <TemplateSettings />
      </SideDrawer>
      <SideMenu menuList={sideBarList} />
    </Wrapper>
  );
};
