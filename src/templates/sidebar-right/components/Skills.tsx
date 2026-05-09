import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading, SkillDots } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Skills({ items, p }: { items: ISkillItem[]; p: ResumePalette }) {
  return (
    <SectionValidator value={items}>
      <div style={{ marginTop: 16 }}>
        <SectionHeading title="Skills" p={p} variant="bar" />
        {items.map((s, i) => (
          <SkillDots key={i} name={s.name} level={s.level} p={p} />
        ))}
      </div>
    </SectionValidator>
  );
}
