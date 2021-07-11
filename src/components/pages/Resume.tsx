import React from "react";
import styled from "styled-components";
import { Flex } from "../common/styles";
import { useTemplates } from "../stores/settings.store";

const ResumeContainer = styled(Flex)`
  width: 210mm;
  flex: 0 0 210mm;
  height: 297mm;
  border: 1px solid ${(props) => props.theme.fontColor};
  margin: auto;
  padding: 40px 25px;
  align-items: flex-start;
  column-gap: 10px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Wrapper = styled.div`
  height: 100vh;
  padding: 1.125rem;
  overflow-y: auto;
`;

export function Resume() {
  const Template = useTemplates((state: any) => state.template);

  return (
    <Wrapper>
      <ResumeContainer className="resume">
        <Template />
      </ResumeContainer>
    </Wrapper>
  );
}
