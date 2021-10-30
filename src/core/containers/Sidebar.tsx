import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { SideDrawer } from 'src/core/widgets/SideDrawer';
import { Templates } from 'src/core/components/templates/Templates';
import { Themes } from 'src/core/components/themes/Themes';
import { SideMenu } from 'src/core/widgets/SideMenu';
import { PrintSettings } from 'src/core/widgets/PrintSettings';
import { useZoom } from 'src/stores/settings.store';
import { getIcon } from 'src/styles/icons';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  @media print {
    display: none;
  }
`;

const sideBarList = [
  {
    key: 0,
    title: 'Template',
    icon: 'template',
    component: <Templates />,
  },
  {
    key: 1,
    title: 'Theme',
    icon: 'color',
    component: <Themes />,
  },
];

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

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const zoom = useZoom((state: any) => state.zoom);
  const updateZoom = useZoom((state: any) => state.update);

  const clickHandler = useCallback(
    (event: any) => {
      if (activeTab === event.currentTarget.dataset.id) setActiveTab(-1);
      else setActiveTab(event.currentTarget.dataset.id);
    },
    [activeTab, setActiveTab]
  );

  const zoomout = useCallback(() => {
    updateZoom(zoom - 0.1);
  }, [zoom, updateZoom]);

  const zoomin = useCallback(() => {
    updateZoom(zoom + 0.1);
  }, [zoom, updateZoom]);

  return (
    <Wrapper>
      <SideDrawer isShown={activeTab !== -1}>{sideBarList[activeTab]?.component}</SideDrawer>
      <SideMenu menuList={sideBarList} onClick={clickHandler}>
        <PrintSettings />
        <IconWrapper onClick={zoomout}>
          <IconButton>{getIcon('zoomout')}</IconButton>
        </IconWrapper>

        <IconWrapper onClick={zoomin}>
          <IconButton>{getIcon('zoomin')}</IconButton>
        </IconWrapper>
      </SideMenu>
    </Wrapper>
  );
};
