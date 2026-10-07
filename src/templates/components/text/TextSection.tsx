import { RichText } from '../primitives/RichText';
import { SectionFrame } from '../primitives/SectionFrame';
import { hasContent } from '../primitives/content';
import { useSurfacePalette } from '../theme';
import type { TextProps } from '../types';

export function TextSection({ html, title = 'Summary', density }: TextProps) {
  const p = useSurfacePalette();
  if (!hasContent(html)) return null;
  return (
    <SectionFrame title={title} density={density}>
      <RichText html={html!} p={p} />
    </SectionFrame>
  );
}
