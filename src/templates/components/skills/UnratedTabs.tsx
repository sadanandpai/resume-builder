import React from 'react';
import styled from 'styled-components';
import { Flex } from 'src/styles/styles';

const Badge = styled.span`
  padding: 4px;
  font-size: 98%;
  font-weight: 500;
  border: 1px solid ${(props: any) => props.theme.secondaryColor};
  border-radius: 4px;
`;

export function UnratedTabs({ items }: any) {
  return (
    <Flex cGap="10px" rGap="10px" style={{ flexWrap: 'wrap' }}>
      {items.map((value: any) => (
        <Badge key={value.name}>{value.name}</Badge>
      ))}
    </Flex>
  );
}
