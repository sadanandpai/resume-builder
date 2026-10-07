import { bodySize, spacing } from '@/helpers/resume-style/styles';
import { SpotlightSection } from '../primitives/SpotlightSection';
import { RichText } from '../primitives/RichText';
import { formatDate } from '../primitives/formatDateRange';
import { useSurfacePalette } from '../theme';
import type { AwardItem, ItemsProps } from '../types';

export function SpotlightAwards({ items, title = 'Awards' }: ItemsProps<AwardItem>) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SpotlightSection title={title}>
      {items.map((item, i) => (
        <article key={item.id || i} style={{ marginBottom: spacing('entry', 20) }}>
          <div style={{ fontSize: bodySize(12) }}>
            {[item.title, formatDate(item.date)].filter(Boolean).join(' – ')}
          </div>
          {item.awarder && (
            <div style={{ color: p.muted, fontStyle: 'italic', fontSize: bodySize(10) }}>
              {item.awarder}
            </div>
          )}
          {item.summary && <RichText html={item.summary} p={p} />}
        </article>
      ))}
    </SpotlightSection>
  );
}
