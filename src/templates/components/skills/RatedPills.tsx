import React from 'react';
import styled from '@emotion/styled';
import { FlexCol, FlexVC } from 'src/styles/styles';

const RatedType = styled.div`
  width: 15ch;
  font-weight: 600;
`;

const RatingTablet: any = styled.span`
  width: 16px;
  height: 8px;
  border-radius: 25%;
  display: inline-block;
  border: 0.5px solid ${(props: any) => props.theme.colors.secondaryColor};
  margin: 0px 4px;
  background-color: ${(props: any) =>
    props.filled ? props.theme.colors.secondaryColor : 'transparent'};
`;

export function RatedPillElement({ itemLabel, itemRating }: any) {
  const tablets: any = [];
  for (let i = 1; i <= 5; i += 1) {
    tablets.push(<RatingTablet data-rating={i} filled={i <= itemRating} key={i} />);
  }

  return (
    <FlexVC>
      <RatedType>{itemLabel}</RatedType>
      {tablets}
    </FlexVC>
  );
}

export function RatedPill({ items }: any) {
  return (
    <FlexCol rGap="8px">
      {items.map((data: any, index: number) => (
        <RatedPillElement
          itemLabel={data.name}
          itemRating={data.level}
          key={data.name}
          index={index}
        />
      ))}
    </FlexCol>
  );
}
