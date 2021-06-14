import React from "react";
import styled from "styled-components";
import { FlexVC } from "../common/styles";
import { Progress } from 'antd';
import { withTheme } from 'styled-components';

const RatedType = styled.div`
  width: 15ch;
  font-weight: 600;
`;

function RatedElementComponent({ itemLabel, itemRating, index, theme }: any) {
  return (
    <FlexVC>
      <RatedType>{itemLabel}</RatedType>
      <Progress percent={itemRating * 20} showInfo={false} strokeColor={theme.secondaryColor} size="small" />
    </FlexVC>
  );
}

export const RatedElement = withTheme(RatedElementComponent);