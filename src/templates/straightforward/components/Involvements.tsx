import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { RichText, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Involvements({ html, p }: { html: string | undefined; p: ResumePalette }) {
  return (
    <SectionValidator value={html ?? ''}>
      <section>
        <SectionHeading title="Academic Projects" p={p} variant="line" />
        <RichText html={html || ''} p={p} />
      </section>
    </SectionValidator>
  );
}
