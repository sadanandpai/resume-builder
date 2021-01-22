import React from "react";
import RatingTablet from "../atoms/Tablet";
import styled from "styled-components";

const RatedData = styled.div`
  margin-top: 10px;
`;

const RatedType = styled.div`
  display: inline-block;
  width: 160px;
  font-weight: bold;
`;

const RatedRating = styled.div`
  display: inline-block;
`;

export default function RatingElement({ itemLabel, itemRating }) {
  const tablets = [];
  for (let i = 1; i <= 5; i++) {
    tablets.push(<RatingTablet filled={i <= itemRating} key={i} />);
  }

  return (
    <RatedData>
      <RatedType>{itemLabel}</RatedType>
      <RatedRating>{tablets}</RatedRating>
    </RatedData>
  );
}
