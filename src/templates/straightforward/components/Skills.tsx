import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

import { STRAIGHTFORWARD_SERIF } from './straightforwardTheme';

export function Skills({ items, p }: { items: ISkillItem[]; p: ResumePalette }) {
  return (
    <SectionValidator value={items}>
      <section style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: STRAIGHTFORWARD_SERIF,
            fontSize: 12,
            color: p.primary,
            margin: '0 0 8px 0',
          }}
        >
          Key Skills
        </h3>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10.5 }}>
          {items.map((s, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              {s.name}
            </li>
          ))}
        </ul>
      </section>
    </SectionValidator>
  );
}
