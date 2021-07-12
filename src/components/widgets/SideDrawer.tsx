import React from "react";
import styled from "styled-components";
import { Drawer } from "antd";

import { EditSettings } from "../core/settings-header/EditSettings";
import { TemplateSettings } from "../core/settings-header/TemplatesSettings";

const Container = styled.div`
  background: #eff1f5;
  padding: 1.25rem;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  width: 480px;
`;

const menuContainerList = [
  {
    key: 0,
    component: <EditSettings />,
  },
  {
    key: 1,
    component: <TemplateSettings />,
  },
];

export function SideDrawer({ activeTab }: any) {
  return (
    <Wrapper>
      <Container>
        {menuContainerList.map((item) => (activeTab === item.key ? item.component : null))}
      </Container>
    </Wrapper>
  );
}
