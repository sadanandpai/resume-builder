import { Work } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';

export const WorkSection = ({ experience }: { experience: Work[] }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Experience" />

      {experience.map((item: Work, index: number) => (
        <div key={index} className="py-3">
          <SectionTitle label={item.company} />
          <div className="flex justify-between items-center">
            <SectionSubtitle label={item.position} />
            <div>
              <p className="text-xs">
                {item.startDate} - {item.endDate}
              </p>
            </div>
          </div>

          <SectionList>{item.summary}</SectionList>
        </div>
      ))}
    </div>
  );
};
