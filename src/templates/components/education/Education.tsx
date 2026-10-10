import { bodySize, spacing } from '@/helpers/resume-style/styles';
import { SectionFrame } from '../primitives/SectionFrame';
import { formatDateRange } from '../primitives/formatDateRange';
import { useSurfacePalette } from '../theme';
import type { EducationItem, ItemsProps } from '../types';

type Props = ItemsProps<EducationItem>;
export function StandardEducation({ items, title = 'Education', density }: Props) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          style={{
            marginBottom: index === items.length - 1 ? 0 : spacing('entry', 14),
          }}
        >
          <div style={{ fontWeight: 400 }}>
            {[item.studyType, item.area].filter(Boolean).join(' — ')}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 6,
              flexWrap: 'wrap',
              color: p.muted,
              fontSize: bodySize(10.5),
            }}
          >
            <span style={{ fontWeight: 400 }}>{item.institution}</span>
            <span>{formatDateRange(item.startDate, item.endDate, item.isStudyingHere)}</span>
          </div>
        </div>
      ))}
    </SectionFrame>
  );
}
