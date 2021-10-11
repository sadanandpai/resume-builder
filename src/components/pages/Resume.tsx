import React from "react";
import styled from "styled-components";
import { AppContext } from "../../App";
import { Flex } from "../common/styles";
import { useTemplates } from "../stores/settings.store";

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
  const Template = useTemplates((state: any) => state.template);

  const appContext = React.useContext(AppContext);
  return (
    <ResumeContainer
      className="resume"
      id="resume-container"
      ref={(r) => appContext?.setPdfRef(r ?? null)}
    >
      <Template />
    </ResumeContainer>
  );
}
