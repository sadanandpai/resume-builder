import { useSurfacePalette } from '../theme';
import { bodySize, spacing } from '@/helpers/resume-style/styles';
import { RichText } from '../primitives/RichText';
import { formatDateRange } from '../primitives/formatDateRange';
import { SpotlightSection } from '../primitives/SpotlightSection';
import type { ExperienceItem, ItemsProps } from '../types';

export function SpotlightExperience({ items, title = 'Experience' }: ItemsProps<ExperienceItem>) {
  const p = useSurfacePalette();
  const visible = items.filter(Boolean);
  if (!visible.length) return null;
  return (
    <SpotlightSection title={title}>
      {visible.map((item, index) => (
        <article key={item.id || index} style={{ marginBottom: spacing('entry', 22) }}>
          <div style={{ fontWeight: 700, fontSize: bodySize(13) }}>{item.position}</div>
          <div style={{ fontSize: bodySize(12), margin: '2px 0 5px' }}>
            {item.name}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${item.name}`}
                style={{ color: p.accent, marginLeft: 6, textDecoration: 'none' }}
              >
                ↗
              </a>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 10,
              color: p.accent,
              fontStyle: 'italic',
              fontSize: bodySize(10.5),
            }}
          >
            <span>{formatDateRange(item.startDate, item.endDate, item.isWorkingHere)}</span>
          </div>
          {(item.summary || item.highlights?.length > 0) && (
            <div style={{ marginTop: 5 }}>
              <RichText html={item.summary} p={p} />
              {item.highlights?.length > 0 && (
                <ul style={{ paddingLeft: 12, margin: '5px 0 0' }}>
                  {item.highlights.map((text, i) => (
                    <li key={i} style={{ marginBottom: 5 }}>
                      {text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </article>
      ))}
    </SpotlightSection>
  );
}
