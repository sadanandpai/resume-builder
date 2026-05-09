import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import type { ResumePalette } from '@/templates/common/resumePalette';

import { STRAIGHTFORWARD_SERIF } from './straightforwardTheme';

export function Education({ education, p }: { education: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={education}>
      <section style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: STRAIGHTFORWARD_SERIF,
            fontSize: 12,
            color: p.primary,
            margin: '0 0 8px 0',
          }}
        >
          Education
        </h3>
        {education.map((e: any) => (
          <div key={e.id} style={{ fontSize: 10.5, marginBottom: 8, lineHeight: 1.45 }}>
            <strong>{e.studyType}</strong>
            <div>{e.area}</div>
            <div style={{ color: p.muted }}>{e.institution}</div>
            <div style={{ color: p.muted }}>
              {e.startDate}–{e.endDate}
            </div>
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
