import { useSurfacePalette } from '../theme';
import { bodySize, spacing } from '@/helpers/resume-style/styles';
import { formatDateRange } from '../primitives/formatDateRange';
import { SpotlightSection } from '../primitives/SpotlightSection';
import type { EducationItem, ItemsProps } from '../types';

export function SpotlightEducation({ items, title = 'Education' }: ItemsProps<EducationItem>) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SpotlightSection title={title}>
      {items.map((item, i) => (
        <article key={item.id || i} style={{ marginBottom: spacing('entry', 20) }}>
          <div style={{ fontWeight: 700, fontSize: bodySize(12) }}>
            {[item.studyType, item.area].filter(Boolean).join(', ')}
          </div>
          <div style={{ fontSize: bodySize(11) }}>
            {item.institution}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${item.institution}`}
                style={{ color: p.accent, marginLeft: 6, textDecoration: 'none' }}
              >
                ↗
              </a>
            )}
          </div>
          <div
            style={{ color: p.accent, fontStyle: 'italic', fontSize: bodySize(10.5), marginTop: 3 }}
          >
            {formatDateRange(item.startDate, item.endDate, item.isStudyingHere)}
          </div>
        </article>
      ))}
    </SpotlightSection>
  );
}
