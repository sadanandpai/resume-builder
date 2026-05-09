import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { ChipList, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Frameworks({ items, p }: { items: ISkillItem[]; p: ResumePalette }) {
  return (
    <SectionValidator value={items}>
      <section style={{ marginBottom: 12 }}>
        <SectionHeading title="// frameworks" p={p} variant="bar" />
        <ChipList items={items} p={p} variant="soft" />
      </section>
    </SectionValidator>
  );
}
