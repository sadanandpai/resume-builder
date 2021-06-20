import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "../common/styles";
import { ProfessionalTemplate } from "../resume-templates/professional-template/ProfessionalTemplate";
import { LegacyTemplate } from "../resume-templates/legacy-template/LegacyTemplate";

LegacyTemplate;
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
`;

export function Resume() {
  return (
    <ResumeContainer className="resume">
      <ProfessionalTemplate />
      {/* <LegacyTemplate /> */}
    </ResumeContainer>
  );
}
