import React from "react";
import styled from "styled-components";
import { FlexCol, FlexVC } from "../../../common/styles";
import { Progress } from "antd";
import { withTheme } from "styled-components";

const RatedType = styled.div`
  width: 15ch;
  font-weight: 600;
`;

const RatingTablet: any = styled.span`
  width: 16px;
  height: 8px;
  border-radius: 25%;
  display: inline-block;
  border: 0.5px solid rgb(165 42 42);
  margin: 0px 4px;
  background-color: ${(props: any) => (props.filled ? props.theme.secondaryColor : "transparent")};
`;

function RatedElement({ itemLabel, itemRating, index }: any) {
  const tablets = [];
  for (let i = 1; i <= 5; i++) {
    tablets.push(
      <RatingTablet
        data-index={index}
        data-rating={i}
        filled={i <= itemRating}
        key={i}
      />
    );
  }

  return (
    <FlexVC>
      <RatedType>{itemLabel}</RatedType>
      {tablets}
    </FlexVC>
  );
}

export function RatingElement({ items }: any) {
  return (
    <FlexCol rGap="8px">
      {items.map((data: any, index: number) => (
        <RatedElement
          itemLabel={data.name}
          itemRating={data.rating}
          key={data.name}
          index={index}
        />
      ))}
    </FlexCol>
  );
}
