import React, { useState } from 'react';
import TabPanel from './TabsPanel';
import styled from '@emotion/styled';
import TabsHeader from './TabsHeader';

const headers = {
  Contact: ['Name', 'Title', 'Email', 'Phone', 'Location'],
  Links: ['LinkedIn', 'Twitter', 'Github', 'Hackerrank', 'Hackerearth', 'Codechef'],
  About: ['About me', 'Career objective'],
};

const TabsContainer = styled.div`
  background-color: rgb(231 238 250);
`;
const TabsHeaderContainer = styled.div`
  display: flex;
  padding: 0.6rem;
`;

const TabsPanelContainer = styled.div`
  padding: 0 0.6rem 0.6rem 0.6rem;
`;

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContainer>
      <TabsHeaderContainer>
        <TabsHeader
          headers={headers}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        ></TabsHeader>
      </TabsHeaderContainer>

      <TabsPanelContainer>
        {activeTab == 0 && <TabPanel headers={headers.Contact} type="input"></TabPanel>}
        {activeTab == 1 && <TabPanel headers={headers.Links} type="input"></TabPanel>}
        {activeTab == 2 && <TabPanel headers={headers.About} type="textarea"></TabPanel>}
      </TabsPanelContainer>
    </TabsContainer>
  );
};

export default Tabs;
