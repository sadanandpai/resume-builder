import { useSurfacePalette } from '../theme';
import { bodySize } from '@/helpers/resume-style/styles';
import { SpotlightSection } from '../primitives/SpotlightSection';
import type { ItemsProps, SkillItem } from '../types';

export function SpotlightSkills({ items, title = 'Skills' }: ItemsProps<SkillItem>) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SpotlightSection title={title}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 6px' }}>
        {items.map((item, i) => (
          <span
            key={`${item.name}-${i}`}
            style={{
              background: p.primary,
              color: p.sidebarText,
              borderRadius: 3,
              padding: '5px 9px',
              fontSize: bodySize(10.5),
              lineHeight: 1.1,
            }}
          >
            {item.name}
          </span>
        ))}
      </div>
    </SpotlightSection>
  );
}
