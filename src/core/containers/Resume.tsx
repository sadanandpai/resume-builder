import React from 'react';
import styled from 'styled-components';
import { useTemplates, useZoom } from 'src/stores/settings.store';
import { useThemes } from 'src/stores/theme.store';
import { ThemeProvider } from 'styled-components';

const ResumeContainer: any = styled.div`
  width: 210mm;
  height: 296mm;
  margin: auto;
  background-color: white;
  border: 1px solid ${(props) => props.theme.fontColor};
  margin: 6mm;
  transform-origin: top;
  transform: ${({ zoom }: any) => `scale(${1 + zoom})`};
  margin-bottom: ${({ zoom }: any) => {
    if (zoom < 0) return 260 * zoom;
    if (zoom > 0) return 320 * zoom;
    return 6;
  }}mm;

  @media print {
    border: none;
    overflow: inherit;
    margin: 0;
    transform: none;
  }
`;

export function Resume() {
  const Template = useTemplates((state: any) => state.template);
  const zoom = useZoom((state: any) => state.zoom);
  const theme = useThemes((state: any) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <ResumeContainer className="resume" zoom={zoom}>
        <Template />
      </ResumeContainer>
    </ThemeProvider>
  );
}
