import React from "react";
import styled from "styled-components";

import { IconHolder } from "../atoms/Styles";

const IconValueDiv = styled.div`
  margin: 6px 0px 0px 0px;
  height: 30px;
`;

const ValueDiv = styled.span`
  vertical-align: middle;
`;

export default function IconValue({ Icon, value }) {
  return (
    <IconValueDiv>
      <IconHolder>
        <Icon />
      </IconHolder>
      <ValueDiv>{value}</ValueDiv>
    </IconValueDiv>
  );
}
