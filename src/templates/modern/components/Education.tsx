import { IEducation } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from 'src/helpers/utils';
import { useRef } from 'react';
import { useEducations } from '../../../stores/education';
import { scrollToElement } from '../../../helpers/utils/index';

export const EducationSection = ({ education }: { education: IEducation[] }) => {
  const educationRef = useRef<null | HTMLDivElement>(null);
  useEducations.subscribe(() => {
    scrollToElement(educationRef);
  });

  return (
    <div className="mb-3" ref={educationRef}>
      <SectionHeading title="Education" />

      {education.map((item: IEducation, index: number) => {
        return (
          <div key={index} className="py-2">
            <div>
              <SectionTitle label={`${item.studyType} - ${item.area}`} />
              <div className="flex justify-between items-center">
                <SectionSubtitle label={item.institution} />
                <div className="flex gap-3">
                  <p className="text-xs">
                    {dateParser(item.startDate)} -
                    {item.isStudyingHere ? 'present' : dateParser(item.endDate)}
                  </p>
                  {/* <p className="text-xs">60%</p> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
