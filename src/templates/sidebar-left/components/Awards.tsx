import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { RichText, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Awards({ html, p }: { html: string | undefined; p: ResumePalette }) {
  return (
    <SectionValidator value={html ?? ''}>
      <section>
        <SectionHeading title="Awards" p={p} variant="bar" />
        <RichText html={html || ''} p={p} />
      </section>
    </SectionValidator>
  );
}
