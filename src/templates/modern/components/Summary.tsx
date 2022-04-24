import { SectionHeading } from '../atoms/SectionHeading';
import { SectionText } from '../atoms/SectionText';

export const SummarySection = ({ summary }: { summary: string }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Summary" />
      <SectionText>{summary}</SectionText>
    </div>
  );
};
