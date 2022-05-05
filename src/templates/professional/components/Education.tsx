import { EducationIntrf } from 'src/stores/index.interface';

export const Education = ({ education }: { education: EducationIntrf[] }) => {
  return (
    <>
      {education.map((item: EducationIntrf, index: number) => (
        <div key={index} className="mt-3">
          <div>
            <p className="font-normal">
              {item.studyType} - {item.area}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-normal text-[#1AB0B3]">{item.institution}</p>
              <div className="flex gap-3">
                <p className="text-xs">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
