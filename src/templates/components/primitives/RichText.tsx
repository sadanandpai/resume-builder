import styled from '@emotion/styled';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import type { ResumePalette } from '../theme/resumePalette';

const Content = styled.div`
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  & a {
    color: inherit;
  }
  & img,
  & video,
  & svg {
    max-width: 100%;
    height: auto;
  }
  & table {
    max-width: 100%;
    width: 100%;
    table-layout: fixed;
  }
  & pre {
    white-space: pre-wrap;
  }
`;
export const RichText = ({ html, p }: { html: string; p: ResumePalette }) => (
  <Content style={{ color: p.text, fontSize: 11, lineHeight: 1.5, fontFamily: p.bodyFont }}>
    <HTMLRenderer htmlString={html} />
  </Content>
);
