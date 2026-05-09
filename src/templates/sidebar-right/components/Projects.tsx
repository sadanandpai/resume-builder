import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { RichText, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Projects({ html, p }: { html: string | undefined; p: ResumePalette }) {
  return (
    <SectionValidator value={html ?? ''}>
      <section>
        <SectionHeading title="Key Projects" p={p} variant="bar" />
        <RichText html={html || ''} p={p} />
      </section>
    </SectionValidator>
  );
}
