import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { RichText, SectionHeading, formatDateRange } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

import { TECHNICAL_MONO } from './technicalMono';

export function Work({ work, p }: { work: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={work}>
      <section style={{ marginBottom: 14 }}>
        <SectionHeading title="// experience" p={p} variant="bar" />
        {work.map((w: any) => (
          <div key={w.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>
                  {w.position} <span style={{ color: p.accent }}>@</span> {w.name}
                </div>
              </div>
              <div style={{ ...TECHNICAL_MONO, color: p.muted, fontSize: 10 }}>
                {formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
              </div>
            </div>
            <RichText html={w.summary} p={p} />
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
