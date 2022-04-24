import { SectionHeading } from '../atoms/SectionHeading';
import { SectionText } from '../atoms/SectionText';

export const Objective = ({ objective }: { objective: string }) => {
  return (
    <>
      <SectionHeading title="Objective" />
      <SectionText>{objective}</SectionText>
    </>
  );
};
