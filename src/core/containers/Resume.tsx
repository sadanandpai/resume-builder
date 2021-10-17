import React from 'react';
import styled from 'styled-components';
import { useTemplates } from 'src/stores/settings.store';

const ResumeContainer = styled.div`
  width: 210mm;
  height: 297mm;
  margin: auto;
  background-color: white;
  border: 1px solid ${(props) => props.theme.fontColor};

  @media print {
    border: none;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  padding: 1.125rem;
  overflow-y: auto;

  @media print {
    padding: 0;
    overflow: inherit;
  }
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
