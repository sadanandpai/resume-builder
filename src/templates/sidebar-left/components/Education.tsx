import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Education({
  education,
  titlePalette,
}: {
  education: any[];
  titlePalette: ResumePalette;
}) {
  return (
    <SectionValidator value={education}>
      <div>
        <SectionHeading title="Education" p={titlePalette} variant="line" />
        {education.map((e: any) => (
          <div key={e.id} style={{ marginBottom: 8, fontSize: 10.5 }}>
            <div style={{ fontWeight: 600 }}>{e.studyType}</div>
            <div style={{ opacity: 0.85 }}>{e.area}</div>
            <div style={{ opacity: 0.7 }}>{e.institution}</div>
            <div style={{ opacity: 0.6 }}>
              {e.startDate} – {e.endDate}
            </div>
          </div>
        ))}
      </div>
    </SectionValidator>
  );
}
