import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Education({ education, p }: { education: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={education}>
      <section style={{ marginBottom: 14 }}>
        <SectionHeading title="Education" p={p} variant="underline" />
        {education.map((e: any) => (
          <div key={e.id} style={{ marginBottom: 6 }}>
            <div style={{ fontWeight: 600 }}>
              {e.studyType} — {e.area}
            </div>
            <div style={{ color: p.muted, fontSize: 10.5 }}>
              {e.institution} · {e.startDate}–{e.endDate}
            </div>
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
