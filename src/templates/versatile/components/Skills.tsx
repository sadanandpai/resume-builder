import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading, SkillStars } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Skills({ items, p }: { items: ISkillItem[]; p: ResumePalette }) {
  return (
    <SectionValidator value={items}>
      <section style={{ marginBottom: 14 }}>
        <SectionHeading title="Key Skills" p={p} variant="underline" />
        {items.map((s, i) => (
          <SkillStars key={i} name={s.name} level={s.level} p={p} />
        ))}
      </section>
    </SectionValidator>
  );
}
