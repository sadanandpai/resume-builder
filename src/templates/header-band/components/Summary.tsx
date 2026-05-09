import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { RichText, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Summary({ summary, p }: { summary: string; p: ResumePalette }) {
  return (
    <SectionValidator value={summary}>
      <section style={{ marginBottom: 14 }}>
        <SectionHeading title="About" p={p} variant="bar" />
        <RichText html={summary} p={p} />
      </section>
    </SectionValidator>
  );
}
