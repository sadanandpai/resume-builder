import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { ChipList, SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { ISkillItem } from '@/stores/skill.interface';

export function Skills({
  languages,
  frameworks,
  tools,
  p,
}: {
  languages: ISkillItem[];
  frameworks: ISkillItem[];
  tools: ISkillItem[];
  p: ResumePalette;
}) {
  const merged = languages.concat(frameworks, tools);
  return (
    <SectionValidator value={merged}>
      <section>
        <SectionHeading title="Skills" p={p} variant="underline" />
        <ChipList items={merged} p={p} variant="outline" />
      </section>
    </SectionValidator>
  );
}
