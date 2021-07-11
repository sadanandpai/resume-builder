import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import { getIcon } from "../common/icons";

import { SideDrawer } from "../widgets/SideDrawer";

const Sider = styled.nav`
  height: 100%;
  font-size: 1.4rem;
  padding: 8px;
  background: #eff1f5;
  border-left: 1px solid rgba(0, 0, 0, 0.25);
`;

const IconWrapper = styled.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

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

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Wrapper>
      <SideDrawer activeTab={activeTab} />
      <Sider>
        {sideBarList.map((item) => (
          <IconWrapper key={item.key} onClick={() => setActiveTab(item.key)}>
            <Tooltip placement="left" title={item.title}>
              <IconButton>{getIcon(`${item.icon}`)}</IconButton>
            </Tooltip>
          </IconWrapper>
        ))}
      </Sider>
    </Wrapper>
  );
};
