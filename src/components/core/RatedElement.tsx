import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Flex } from "../common/styles";

const RatingTablet: any = styled.span`
  width: 16px;
  height: 8px;
  border-radius: 20%;
  display: inline-block;
  border: 0.5px solid rgb(165 42 42);
  margin: 0px 4px;
  background-color: ${(props: any) => (props.filled ? "brown" : "transparent")};
`;

const RatedType = styled.div`
  width: 15ch;
  font-weight: 600;
`;

export function RatedElement({ itemLabel, itemRating, index }: any) {
  const tablets = [];
  for (let i = 1; i <= 5; i++) {
    tablets.push(<RatingTablet data-index={index} data-rating={i} filled={i <= itemRating} key={i} />);
  }

  return (
    <Flex>
      <RatedType>{itemLabel}</RatedType>
      <div>{tablets}</div>
    </Flex>
  );
}

