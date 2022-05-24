import { EducationIntrf } from 'src/stores/index.interface';

export const Education = ({ education }: { education: EducationIntrf[] }) => {
  return (
    <>
      {education.map((item: EducationIntrf, index: number) => {
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
          <div key={index} className="mt-3">
            <div>
              <p className="font-normal">
                {item.studyType} - {item.area}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-normal text-[#1AB0B3]">{item.institution}</p>
                <div className="flex gap-3">
                  <p className="text-xs">
                    {startDate} - {endDate}
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
