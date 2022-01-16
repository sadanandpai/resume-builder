import React from 'react';
import { Progress } from 'antd';
import styled, { withTheme } from 'styled-components';
import { FlexCol, FlexVC } from 'src/styles/styles';

const RatedType = styled.div`
  width: 25ch;
  font-weight: 600;
`;

function RatedElementComponent({ itemLabel, itemRating, theme }: any) {
  return (
    <FlexVC>
      <RatedType>{itemLabel}</RatedType>
      <Progress
        percent={itemRating * 20}
        showInfo={false}
        strokeColor={theme.secondaryColor}
        size="small"
      />
    </FlexVC>
  );
}

const RatedElement = withTheme(RatedElementComponent);

export function RatedBars({ items }: any) {
  return (
    <FlexCol rGap="8px">
      {items?.map((data: any, index: number) => (
        <RatedElement itemLabel={data.name} itemRating={data.level} key={index} index={data.name} />
      ))}
    </FlexCol>
  );
}
