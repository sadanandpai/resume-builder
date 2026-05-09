import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { RichText, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Summary({ summary, p }: { summary: string; p: ResumePalette }) {
  return (
    <SectionValidator value={summary}>
      <section style={{ marginTop: 18, marginBottom: 14 }}>
        <SectionHeading title="Summary" p={p} variant="line" />
        <RichText html={summary} p={p} />
      </section>
    </SectionValidator>
  );
}
