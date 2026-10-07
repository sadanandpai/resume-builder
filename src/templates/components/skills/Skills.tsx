import { spacing } from '@/helpers/resume-style/styles';
import { SectionFrame } from '../primitives/SectionFrame';
import { ChipList, SkillBar, SkillDots } from '../primitives/SkillWidgets';
import { useSurfacePalette } from '../theme';
import type { SkillItem, ItemsProps } from '../types';

type Props = ItemsProps<SkillItem>;
function Skills({
  items,
  title = 'Skills',
  density,
  design,
}: Props & { design: 'list' | 'chip' | 'bar' | 'dot' }) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {design === 'chip' ? (
        <ChipList items={[...items]} p={p} />
      ) : design === 'list' ? (
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          {items.map((item, i) => (
            <li key={i} style={{ marginBottom: i === items.length - 1 ? 0 : spacing('entry', 0) }}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        items.map((item, i) =>
          design === 'bar' ? (
            <SkillBar key={i} {...item} p={p} />
          ) : (
            <SkillDots key={i} {...item} p={p} />
          )
        )
      )}
    </SectionFrame>
  );
}
export const ListSkills = (props: Props) => <Skills {...props} design="list" />;
export const ChipSkills = (props: Props) => <Skills {...props} design="chip" />;
export const BarSkills = (props: Props) => <Skills {...props} design="bar" />;
export const DotSkills = (props: Props) => <Skills {...props} design="dot" />;
