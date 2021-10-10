import React from "react";
import styled from "styled-components";
import { FlexCol, FlexVC } from "../../../common/styles";
import { Progress } from "antd";
import { withTheme } from "styled-components";

const RatedType = styled.div`
  width: 15ch;
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

export function RatedSection({ items }: any) {
  return (
    <FlexCol rGap="8px">
      {items?.map((data: any, index: number) => (
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
