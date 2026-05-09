import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Education({ education, p }: { education: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={education}>
      <section>
        <SectionHeading title="Education" p={p} variant="bar" />
        {education.map((e: any) => (
          <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
            <strong>{e.studyType}</strong> — {e.area}
            <div style={{ color: p.muted }}>{e.institution}</div>
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
