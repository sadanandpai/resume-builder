import { SkillItemIntf } from 'src/stores/skill.interface';
import styled from '@emotion/styled';

const Badge = styled.span`
  border: 1px solid yellowgreen;
`;

export default function UnratedSkills({ items }: { items: SkillItemIntf[] }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {items.map((value) => (
        <Badge key={value.name} className="p-1 rounded-md border border-solid border-green-600">
          {value.name}
        </Badge>
      ))}
    </div>
  );
}