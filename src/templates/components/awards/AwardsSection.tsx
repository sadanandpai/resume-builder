import { SectionFrame } from '../primitives/SectionFrame';
import { RichText } from '../primitives/RichText';
import { formatDate } from '../primitives/formatDateRange';
import { useSurfacePalette } from '../theme';
import type { AwardItem, ItemsProps } from '../types';
export function AwardsSection({ items, title = 'Awards', density }: ItemsProps<AwardItem>) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {items.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 600 }}>{item.title}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 6,
              color: p.muted,
            }}
          >
            <span>{item.awarder}</span>
            <span>{formatDate(item.date)}</span>
          </div>
          <RichText html={item.summary} p={p} />
        </div>
      ))}
    </SectionFrame>
  );
}
