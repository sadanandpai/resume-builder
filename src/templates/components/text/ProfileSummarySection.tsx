import { RichText } from '../primitives/RichText';
import { SectionFrame } from '../primitives/SectionFrame';
import { hasContent } from '../primitives/content';
import { useSurfacePalette } from '../theme';
import type { TextProps } from '../types';

export function ProfileSummarySection({
  html,
  image,
  title = 'Summary',
  density,
}: TextProps & { image?: string }) {
  const p = useSurfacePalette();
  if (!hasContent(html)) return null;
  return (
    <SectionFrame title={title} density={density}>
      <div style={{ display: 'flow-root' }}>
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
      </div>
    </SectionFrame>
  );
}
