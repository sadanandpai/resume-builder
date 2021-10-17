import React from 'react';
import Color from 'color';
import styled from 'styled-components';
import { Flex, FlexCol, FlexVC } from 'src/assets/styles/styles';
import { getIcon } from 'src/assets/icons';

const Role = styled.h3`
  color: ${(props) => Color(props.theme.primaryColor).alpha(0.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;

const Contact = ({ icon, value }: any) => (
  <FlexVC jc="flex-end" cGap="8px">
    {icon}
    <span>{value}</span>
  </FlexVC>
);

export function Intro({ intro }: any) {
  return (
    <Flex jc="space-between">
      <FlexCol rGap="5px">
        <Role>{intro.label}</Role>
        <div>
          Frontend experience:&nbsp;
          <strong>{intro.relExp}</strong>
        </div>
        <div>Total experience:&nbsp;{intro.totalExp}</div>
      </FlexCol>

      <FlexCol jc="flex-end" rGap="5px">
        <Contact icon={getIcon('mobile')} value={intro.phone} />
        <Contact icon={getIcon('email')} value={intro.email} />
        <Contact icon={getIcon('location')} value={intro.location} />
      </FlexCol>
    </Flex>
  );
}
