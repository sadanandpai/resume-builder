import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading, SkillBar } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Languages({ items, p }: { items: ISkillItem[]; p: ResumePalette }) {
  return (
    <SectionValidator value={items}>
      <section style={{ marginBottom: 12 }}>
        <SectionHeading title="// languages" p={p} variant="bar" />
        {items.map((s, i) => (
          <SkillBar key={i} name={s.name} level={s.level} p={p} />
        ))}
      </section>
    </SectionValidator>
  );
}
