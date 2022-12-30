import { dateParser } from 'src/helpers/utils';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { IWorkIntrf } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';

export const WorkSection = ({ experience }: { experience: IWorkIntrf[] }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Experience" />

      {experience.map((item: IWorkIntrf, index: number) => {
        return (
          <div key={index} className="py-2">
            <SectionTitle label={item.name} />
            <div className="flex justify-between items-center">
              <SectionSubtitle label={item.position} />
              <div>
                <p className="text-xs">
                  {dateParser(item.startDate)} -{' '}
                  {item.isWorkingHere ? 'present' : dateParser(item.endDate)}
                </p>
              </div>
            </div>

            <SectionList>
              <HTMLRenderer htmlString={item.summary} />
            </SectionList>
          </div>
        );
      })}
    </div>
  );
};
