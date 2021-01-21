import React from "react";
import styled from "styled-components";

const LabelValueDiv = styled.div`
  margin: 6px 0px 0px 0px;
  height: 30px;
`;

export default function LabelValue({ label, value }) {
  return (
    <LabelValueDiv>
      {label} : <strong>{value}</strong>
    </LabelValueDiv>
  );
}
