import { font, bodySize, lineHeight } from '@/helpers/resume-style/styles';
import styled from '@emotion/styled';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { usePresentation } from '@/templates/components/theme';
import type { ResumePalette } from '@/templates/components/theme/resumePalette';

const Content = styled.div`
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  &[data-spacious] > div {
    --resume-richtext-line-height: calc(1.1rem * var(--resume-line-factor, 1));
  }
  &[data-spacious] li + li {
    margin-top: 3px;
  }
  & a {
    color: inherit;
  }
  &[data-spacious] > div a {
    text-decoration: none;
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
export const RichText = ({ html, p }: { html: string; p: ResumePalette }) => {
  const presentation = usePresentation();
  return (
    <Content
      data-spacious={presentation === 'ruled' || undefined}
      style={{
        color: p.text,
        fontSize: bodySize(11),
        lineHeight: `var(--resume-section-line-height, ${lineHeight(1.5)})`,
        fontFamily: font(p.bodyFont),
      }}
    >
      <HTMLRenderer htmlString={html} />
    </Content>
  );
};
