import styled from '@emotion/styled';
import { RichText } from '@/templates/components/primitives/RichText';
import { SectionFrame } from '@/templates/components/primitives/SectionFrame';
import { hasContent } from '@/templates/components/primitives/content';
import { useSurfacePalette } from '@/templates/components/theme';
import type { TextProps } from '@/templates/components/types';

const SummaryContent = styled.div`
  display: flow-root;

  &[data-indent] p {
    text-indent: 2em;
  }

  &[data-indent] li p {
    text-indent: 0;
  }
`;

export function ProfileSummarySection({
  html,
  image,
  title = 'Summary',
  density,
  indentParagraphs = false,
}: TextProps & { image?: string; indentParagraphs?: boolean }) {
  const p = useSurfacePalette();
  if (!hasContent(html)) return null;
  return (
    <SectionFrame title={title} density={density}>
      <SummaryContent data-indent={indentParagraphs || undefined}>
        {image && (
          <img
            src={image}
            alt="Profile"
            style={{
              float: 'left',
              width: 80,
              maxWidth: '45%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '50%',
              shapeOutside: 'circle(50%)',
              margin: '0 12px 4px 0',
            }}
          />
        )}
        <RichText html={html!} p={p} />
      </SummaryContent>
    </SectionFrame>
  );
}
