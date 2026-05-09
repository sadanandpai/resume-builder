import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { JobHeader, RichText, formatDateRange } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

const serif = "'Georgia', serif";

export function Work({ work, p }: { work: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={work}>
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
          Professional Experience
        </h3>
        {work.map((w: any) => (
          <div key={w.id} style={{ marginBottom: 12 }}>
            <JobHeader
              position={w.position}
              company={w.name}
              date={formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
              p={p}
            />
            <RichText html={w.summary} p={p} />
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
