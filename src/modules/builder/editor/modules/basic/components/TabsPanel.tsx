import React from 'react';
import styled from '@emotion/styled';

const TabsPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.06);
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  &:hover {
    outline: none;
  }
  font-family: Roboto, Helvetica, Arial, sans-serif;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.06);
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  &:hover {
    outline: none;
  }
  font-family: Roboto, Helvetica, Arial, sans-serif;
`;

const TabsPanel = ({ type, headers }: { type: string; headers: string[] }) => {
  return (
    <TabsPanelContainer>
      {(type == '' || type == 'input') &&
        headers.map((header: string, index: number) => (
          <Input placeholder={header} key={index}></Input>
        ))}
      {type == 'textarea' &&
        headers.map((header: string, index: number) => (
          <Textarea placeholder={header} rows={4} key={index}></Textarea>
        ))}
    </TabsPanelContainer>
  );
};

export default TabsPanel;
