import { SectionFrame } from '../primitives/SectionFrame';
import { ChipList, SkillBar } from '../primitives/SkillWidgets';
import { useSurfacePalette } from '../theme';
import type { SkillItem, ItemsProps } from '../types';

type Props = ItemsProps<SkillItem> & { chipVariant?: 'outline' | 'filled' | 'soft' | 'neutral' };
function Skills({
  items,
  title = 'Skills',
  density,
  design,
  chipVariant,
}: Props & { design: 'chip' | 'bar' }) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {design === 'chip' ? (
        <ChipList items={[...items]} p={p} variant={chipVariant} />
      ) : (
        items.map((item, i) => <SkillBar key={i} {...item} p={p} />)
      )}
    </SectionFrame>
  );
}
export const ChipSkills = (props: Props) => <Skills {...props} design="chip" />;
export const BarSkills = (props: Props) => <Skills {...props} design="bar" />;
