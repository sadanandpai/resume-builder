import { WorkIntrf } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';

export const WorkSection = ({ experience }: { experience: WorkIntrf[] }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Experience" />

      {experience.map((item: WorkIntrf, index: number) => {
        let startDate;
        let endDate;
        if (item.startDate !== null) {
          startDate =
            typeof item.startDate === 'object' ? item.startDate.format('MMM YYYY') : item.startDate;
        }
        if (item.endDate !== null) {
          endDate =
            typeof item.endDate === 'object' ? item.endDate.format('MMM YYYY') : item.endDate;
        }
        return (
          <div key={index} className="py-3">
            <SectionTitle label={item.name} />
            <div className="flex justify-between items-center">
              <SectionSubtitle label={item.position} />
              <div>
                <p className="text-xs">
                  {startDate} - {item.isWorkingHere ? 'present' : endDate}
                </p>
              </div>
            </div>

            <SectionList>{item.summary}</SectionList>
          </div>
        );
      })}
    </div>
  );
};
