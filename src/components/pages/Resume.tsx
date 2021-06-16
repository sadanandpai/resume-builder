import React, { useState } from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { Flex, FlexCol } from "../common/styles";
import { ProfessionalTemplate } from "../templates/professional-template/ProfessionalTemplate";

const ResumeContainer = styled(Flex)`
  width: 210mm;
  height: 297mm;
  border: 1px solid ${(props) => props.theme.fontColor};
  margin: auto;
  padding: 40px 25px;
  align-items: flex-start;
  column-gap: 10px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};

  @media print {
    & {
      /* width: 210mm;
      height: 297mm; */
    }
  }
`;

const LeftSection = styled(FlexCol)`
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`;

const RightSection = styled(FlexCol)`
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  justify-content: space-between;
`;

export function Resume() {
  return (
    <ResumeContainer className="resume">
      <ProfessionalTemplate />
    </ResumeContainer>
  );
}
