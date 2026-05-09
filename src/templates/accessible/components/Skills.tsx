import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { ChipList, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Skills({ items, p }: { items: ISkillItem[]; p: ResumePalette }) {
  return (
    <SectionValidator value={items}>
      <section>
        <SectionHeading title="Skills" p={p} variant="underline" />
        <ChipList items={items} p={p} variant="outline" />
      </section>
    </SectionValidator>
  );
}
