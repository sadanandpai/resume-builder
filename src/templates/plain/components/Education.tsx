import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import type { ResumePalette } from '@/templates/common/resumePalette';

const serif = "'Georgia', serif";

export function Education({ education, p }: { education: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={education}>
      <section style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: serif,
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: '0 0 12px 0',
            borderBottom: `1px solid ${p.divider}`,
            paddingBottom: 4,
          }}
        >
          Education
        </h3>
        {education.map((e: any) => (
          <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
            <strong>{e.studyType}</strong>, {e.area} — {e.institution} ({e.startDate}–{e.endDate})
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
