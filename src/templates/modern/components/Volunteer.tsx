import { IVolunteer } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from 'src/helpers/utils';
import { SectionList } from '../atoms/SectionList';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

export const VolunteerSection = ({ volunteer }: { volunteer: IVolunteer[] }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Volunteering" />

      {volunteer.map((item: IVolunteer, index: number) => {
        return (
          <div key={index} className="py-2">
            <div>
              <SectionTitle label={`${item.organization}`} />
              <div className="flex justify-between items-center">
                <SectionSubtitle label={item.position} />
                <div className="flex gap-3">
                  <p className="text-xs">
                    {dateParser(item.startDate)} -
                    {item.isVolunteeringNow ? 'present' : dateParser(item.endDate)}
                  </p>
                </div>
              </div>
              <SectionList>
                <HTMLRenderer htmlString={item.summary} />
              </SectionList>
            </div>
          </div>
        );
      })}
    </div>
  );
};
