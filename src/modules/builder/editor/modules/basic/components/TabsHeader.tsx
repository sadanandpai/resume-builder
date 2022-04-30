import React from 'react';
import styled from '@emotion/styled';

const HeaderWithBorder = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  background-color: rgb(231 238 250);
  flex-grow: 1;
  padding: 0.5rem 0 0.5rem 0;
  font-weight: bolder;
  color: rgb(46, 64, 82);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  border-bottom: 2px solid black;
  text-align: center;
`;

const HeaderWithoutBorder = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  background-color: rgb(231 238 250);
  flex-grow: 1;
  padding: 0.5rem 0 0.5rem 0;
  font-weight: bolder;
  color: rgb(46, 64, 82);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  text-align: center;
`;

type Headers = {
  Contact: string[];
  Links: string[];
  About: string[];
};

const TabsHeader = ({
  headers,
  activeTab,
  setActiveTab,
}: {
  headers: Headers;
  activeTab: number;
  setActiveTab: (index: number) => void;
}) => {
  return (
    <>
      {Object.keys(headers).map((header: string, index: number) => {
        return activeTab == index ? (
          <HeaderWithBorder onClick={() => setActiveTab(index)} key={index}>
            {header}
          </HeaderWithBorder>
        ) : (
          <HeaderWithoutBorder onClick={() => setActiveTab(index)} key={index}>
            {header}
          </HeaderWithoutBorder>
        );
      })}
    </>
  );
};

export default TabsHeader;
