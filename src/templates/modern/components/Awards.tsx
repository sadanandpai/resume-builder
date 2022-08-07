import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { AwardsIntrf } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';

export const AwardSection = ({ awardsReceived }: { awardsReceived: AwardsIntrf[] }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Awards" />

      {awardsReceived.map((award: AwardsIntrf, index: number) => {
        let awardDate;
        if (award.date !== null) {
          awardDate = typeof award.date === 'object' ? award.date.format('DD-MM-YYYY') : award.date;
        }

        return (
          <div key={index} className="py-3">
            <SectionTitle label={award.title} />
            <div className="flex justify-between awards-center">
              <SectionSubtitle label={award.awarder} />
              <div>
                <p className="text-xs">{awardDate}</p>
              </div>
            </div>
            <SectionList>
              <HTMLRenderer htmlString={award.summary} />
            </SectionList>
          </div>
        );
      })}
    </div>
  );
};
