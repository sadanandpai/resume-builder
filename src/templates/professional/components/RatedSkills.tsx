import { SkillItemIntf } from 'src/stores/skill.interface';
import styled from '@emotion/styled';

const ProgressBar = styled.div`
  width: ${(props: { level: number }) => props.level}%;
  height: 6px;
  background-color: yellowgreen;
`;

export default function RatedSkills({ items }: { items: SkillItemIntf[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items?.map(({ name, level }) => (
        <div className="flex items-center" key={name}>
          <p className="min-w-[15ch]">{name}</p>
          <div className="w-full bg-gray-100 rounded-md">
            <ProgressBar level={level} className="rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
