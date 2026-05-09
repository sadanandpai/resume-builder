import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import type { ResumePalette } from '@/templates/common/resumePalette';

import { STRAIGHTFORWARD_SERIF } from './straightforwardTheme';

export function Awards({ awards, p }: { awards: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={awards}>
      <section>
        <h3
          style={{
            fontFamily: STRAIGHTFORWARD_SERIF,
            fontSize: 12,
            color: p.primary,
            margin: '0 0 8px 0',
          }}
        >
          Certifications
        </h3>
        {awards.map((a: any) => (
          <div key={a.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
            {a.title}
            <div style={{ color: p.muted }}>{a.awarder}</div>
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
