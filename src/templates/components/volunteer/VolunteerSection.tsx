import { SectionFrame } from '../primitives/SectionFrame';
import { JobHeader } from '../primitives/layoutPrimitives';
import { RichText } from '../primitives/RichText';
import { formatDateRange } from '../primitives/formatDateRange';
import { useSurfacePalette } from '../theme';
import type { VolunteerItem, ItemsProps } from '../types';
export function VolunteerSection({
  items,
  title = 'Volunteering',
  density,
}: ItemsProps<VolunteerItem>) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {items.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: 10 }}>
          <JobHeader
            position={item.organization}
            company={item.position}
            date={formatDateRange(item.startDate, item.endDate, item.isVolunteeringNow)}
            p={p}
          />
          <RichText html={item.summary} p={p} />
        </div>
      ))}
    </SectionFrame>
  );
}
