import { SectionHeading } from '../atoms/SectionHeading';
import { SectionText } from '../atoms/SectionText';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

export const SummarySection = ({ summary }: { summary: string }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Summary" />
      <SectionText>
        <HTMLRenderer htmlString={summary} />
      </SectionText>
    </div>
  );
};
