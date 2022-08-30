import { EducationIntrf } from 'src/stores/index.interface';
import { dateParser } from 'src/helpers/utils';

export const Education = ({ education }: { education: EducationIntrf[] }) => {
  return (
    <>
      {education.map((item: EducationIntrf, index: number) => {
        return (
          <div key={index} className="mt-3">
            <div>
              <p className="font-normal">
                {item.studyType} - {item.area}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-normal text-[#1AB0B3]">{item.institution}</p>
                <div className="flex gap-3">
                  <p className="text-xs">
                    {dateParser(item.startDate)} -
                    {item.isStudyingHere ? 'present' : dateParser(item.endDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
