import { ISkillItem } from 'src/stores/skill.interface';
import styled from '@emotion/styled';

const Badge = styled.span`
  border: 1px solid ${(props) => props.theme.highlighterColor};
`;

export default function UnratedSkills({ items }: { items: ISkillItem[] }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {items.map((value) => (
        <Badge key={value.name} className="p-1 rounded-md border border-solid">
          {value.name}
        </Badge>
      ))}
    </div>
  );
}
