import React from 'react';
import styled from '@emotion/styled';
import { FlexCol, FlexVC } from 'src/styles/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)((props: any) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'lightgrey',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: props.theme.colors.primaryColor,
  },
}));

const RatedType = styled.div`
  width: 25ch;
  font-weight: 600;
`;

export function RatedElementComponent({ itemLabel, itemRating }: any) {
  return (
    <FlexVC>
      <RatedType>{itemLabel}</RatedType>
      <BorderLinearProgress
        variant="determinate"
        value={itemRating * 20}
        style={{ width: '100%' }}
      />
    </FlexVC>
  );
}

export function RatedBars({ items }: any) {
  return (
    <FlexCol rGap="8px">
      {items?.map((data: any, index: number) => (
        <RatedElementComponent
          itemLabel={data.name}
          itemRating={data.level}
          key={index}
          index={data.name}
        />
      ))}
    </FlexCol>
  );
}
