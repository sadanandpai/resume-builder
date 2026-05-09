import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  JobHeader,
  RichText,
  SectionHeading,
  formatDateRange,
} from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Work({ work, p }: { work: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={work}>
      <section style={{ marginBottom: 14 }}>
        <SectionHeading title="Professional Experience" p={p} variant="line" />
        {work.map((w: any) => (
          <div key={w.id} style={{ marginBottom: 10 }}>
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
