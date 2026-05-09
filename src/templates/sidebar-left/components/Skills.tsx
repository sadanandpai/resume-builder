import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading, SkillBar } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Skills({
  items,
  titlePalette,
  skillPalette,
}: {
  items: ISkillItem[];
  titlePalette: ResumePalette;
  skillPalette: ResumePalette;
}) {
  return (
    <SectionValidator value={items}>
      <div>
        <SectionHeading title="Skills" p={titlePalette} variant="line" />
        {items.map((s, i) => (
          <SkillBar key={i} name={s.name} level={s.level} p={skillPalette} />
        ))}
      </div>
    </SectionValidator>
  );
}
